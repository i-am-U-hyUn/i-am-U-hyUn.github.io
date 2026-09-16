---
title: "Store 추상화 계층 딥다이브 — Firestore 어댑터는 어떻게 구현됐나"
date: 2026-09-16 16:00:00 +0900
categories: [프로젝트, 백엔드]
tags: [TypeScript, "Google Cloud", Firestore, Node.js, 포트폴리오]
toc: true
---

[4편](/posts/cloud-run-firestore-iam-permission-data-loss/)에서 Cloud Run + Firestore 배포 장애를 다루면서, 저장소가 `Store` 인터페이스로 추상화되어 있고 그 밑에 Mongo/lowdb/Firestore 세 구현체가 갈아끼워진다는 구조만 요약해서 짚었다. 이 글은 그 구조를 코드 레벨에서 한 단계 더 들어가, 특히 Firestore 구현체(`store.firestore.ts`)가 실제로 어떻게 짜여 있는지를 다룬다.

> 이 글도 이전 편들과 동일한 마스킹 기준을 따른다 — 실제 프로젝트 ID, 서비스 계정 등 사내 식별자는 예시 값으로 대체했다.
{: .prompt-warning }

---

## 1. `store.ts` — 인터페이스는 계약서다

`store.ts`엔 실제 로직이 없다. "저장소가 지켜야 할 규칙"만 정의한다.

```ts
export interface Store {
  readonly kind: "mongo" | "lowdb" | "firestore";
  connect(): Promise<void>;
  find<T extends AnyDoc>(collection: CollectionName, query?: Partial<Record<string, unknown>>): Promise<T[]>;
  findOne<T extends AnyDoc>(collection: CollectionName, query: Partial<Record<string, unknown>>): Promise<T | null>;
  count(collection: CollectionName): Promise<number>;
  replaceAll<T extends AnyDoc>(collection: CollectionName, docs: T[]): Promise<void>;
  replaceForProcess<T extends AnyDoc>(collection: CollectionName, query: Partial<Record<string, unknown>>, docs: T[]): Promise<void>;
  upsertProcess(doc: ProcessDoc): Promise<{ replaced: boolean }>;
  deleteProcess(processId: string): Promise<boolean>;
  appendVersionSnapshot(entry: ProcessVersionDoc): Promise<void>;
  appendDashboardVersion(entry: DashboardVersionDoc): Promise<void>;
  getLayout(): Promise<Record<string, unknown>>;
  setLayout(layout: Record<string, unknown>): Promise<void>;
  getLayoutHistory(): Promise<LayoutHistoryEntry[]>;
  pushLayoutHistory(entry: LayoutHistoryEntry): Promise<void>;
  close(): Promise<void>;
}
```

`appendVersionSnapshot`/`appendDashboardVersion`처럼 이름에 "append"가 붙은 메서드는 절대 교체하지 않고 계속 쌓기만 한다는 의도를 이름으로 드러낸 것이고, `replaceForProcess`는 "이 프로세스가 소유한 범위만" 교체한다는 뜻을 담았다(업로드 시 다른 프로세스 데이터를 안 건드리기 위한 장치 — [5편](/posts/process-versioning-realtime-sync/)에서 이 메서드가 실제로 어떻게 쓰이는지 다뤘다).

이 인터페이스 덕분에 나머지 코드(`index.ts`의 라우트들)는 지금 저장소가 Mongo인지 Firestore인지 lowdb인지 전혀 몰라도 된다 — 전형적인 Strategy 패턴이다.

---

## 2. `store.firestore.ts` — Firestore SDK를 어댑터로 감싸기

Firestore는 컬렉션(collection) → 문서(document) 구조다. 폴더 안에 파일이 있는 것과 비슷하게, `processes`라는 컬렉션 안에 개별 프로세스 문서들이 들어있다.

### 초기화

```ts
constructor(opts: { projectId?: string; databaseId?: string } = {}) {
  const config: ConstructorParameters<typeof Firestore>[0] = {
    ignoreUndefinedProperties: true,
  };
  if (opts.projectId) config.projectId = opts.projectId;
  if (opts.databaseId && opts.databaseId !== "(default)") {
    config.databaseId = opts.databaseId;
  }
  this.db = new Firestore(config);
}
```

`ignoreUndefinedProperties: true`가 없으면 JS 객체에 `undefined` 필드가 하나라도 있을 때 Firestore가 에러를 던진다. 이 옵션으로 그런 필드는 조용히 제외하고 저장하게 했다.

### `connect()` — Firestore엔 "연결"이라는 개념이 없다

```ts
async connect(): Promise<void> {
  await this.db.collection("processes").limit(1).get();
}
```

Firestore SDK는 매 요청이 독립적인 HTTP/gRPC 호출이라 별도의 연결 단계가 없다. 그래서 가장 가벼운 실제 쿼리 하나(`limit(1).get()`)를 날려서, 그 시점에 인증/프로젝트/권한 문제를 강제로 드러나게 만든다. 4편에서 겪은 `PERMISSION_DENIED`가 터진 지점이 바로 여기다.

### 문서 ID 전략

```ts
function docId(collection: CollectionName, doc: Record<string, unknown>): string | null {
  if (collection === "processes") return String(doc.process_id);
  if (typeof doc._id === "string" && doc._id.length > 0) return doc._id;
  return null; // Firestore 자동 ID
}
```

- `processes`: `process_id`를 그대로 Firestore 문서 ID로 재사용 → 같은 ID로 다시 저장하면 자동으로 덮어써져 upsert가 자연스럽게 성립한다.
- `_id` 필드가 있는 컬렉션(`process_versions`, `dashboard_versions`): 코드가 미리 만든 고유 ID(타임스탬프 조합)를 그대로 사용.
- 그 외(`edges` 등 자연키가 없는 컬렉션): `null`을 반환해 Firestore가 랜덤 ID를 자동 생성하게 둔다.

### 조회 — `find`/`findOne`

```ts
async find<T extends AnyDoc>(collection: CollectionName, query: Record<string, unknown> = {}): Promise<T[]> {
  let ref: FirebaseFirestore.Query = this.col(collection);
  for (const [k, v] of Object.entries(query)) {
    ref = ref.where(k, "==", v);
  }
  const snap = await ref.get();
  return snap.docs.map((d) => stripInternal(d.data())) as unknown as T[];
}
```

`{ process_id: "P2" }` 같은 query 객체를 받으면 각 key-value를 `.where(key, "==", value)`로 체이닝한다. `findOne`은 같은 구조에 `.limit(1)`만 추가한 버전이다.

### 컬렉션 통째 교체 — `replaceAll`/`replaceForProcess`

Firestore SDK엔 "컬렉션 내용을 통째로 바꿔라"라는 명령이 없다. 그래서 **삭제 후 재삽입**으로 구현했다.

```ts
async replaceAll<T extends AnyDoc>(collection: CollectionName, docs: T[]): Promise<void> {
  await this.deleteAll(ref);
  await this.batchWrite(collection, docs);
}

private async deleteAll(ref: FirebaseFirestore.Query): Promise<void> {
  const CHUNK = 400;
  while (true) {
    const snap = await ref.limit(CHUNK).get();
    if (snap.empty) break;
    const batch = this.db.batch();
    snap.docs.forEach((d) => batch.delete(d.ref));
    await batch.commit();
    if (snap.size < CHUNK) break;
  }
}
```

`db.batch()`는 여러 쓰기 작업을 하나로 묶어 한 번의 요청으로 보내는 Firestore 기능인데, 배치 하나에 최대 500개 작업까지만 담을 수 있다는 자체 제한이 있어 안전하게 400개씩(`CHUNK`) 나눠 반복 처리했다. `replaceForProcess`는 같은 패턴에서 삭제 범위만 `query`로 좁힌 버전이다.

이 구현엔 트레이드오프가 하나 있다 — 삭제와 재삽입 사이가 **원자적이지 않다.** 그 찰나에 다른 요청이 같은 컬렉션을 조회하면 잠깐 빈 상태를 볼 수 있다. 지금 트래픽 규모에선 문제되지 않지만, 알아두면 좋은 특성이다.

### `upsertProcess` — `merge: false`의 의미

```ts
async upsertProcess(doc: ProcessDoc): Promise<{ replaced: boolean }> {
  const ref = this.col("processes").doc(doc.process_id);
  const existing = await ref.get();
  await ref.set({ ...doc }, { merge: false });
  return { replaced: existing.exists };
}
```

`merge: false`라서 기존 필드를 **완전히 덮어쓴다**(부분 병합이 아니다). 업로드된 문서가 항상 전체 필드를 채워준다는 전제가 있어야 안전한 선택이다.

### 레이아웃 이력 정리 — offset 기반 트리밍

```ts
async pushLayoutHistory(entry: LayoutHistoryEntry): Promise<void> {
  const col = this.db.collection("layout_history");
  await col.add({ ...entry });
  const snap = await col.orderBy("savedAt", "desc").offset(LAYOUT_HISTORY_MAX).get();
  if (!snap.empty) {
    const batch = this.db.batch();
    snap.docs.forEach((d) => batch.delete(d.ref));
    await batch.commit();
  }
}
```

새 항목을 추가한 뒤, `savedAt` 내림차순으로 `LAYOUT_HISTORY_MAX`(20)번째 이후 항목들을 `offset`으로 잘라내 삭제한다 — lowdb 구현의 `hist.slice(0, MAX)`와 동일한 효과를 Firestore 쿼리로 구현한 것이다.

`layout`/`layout_history`는 `DbSchema`에 정의된 7개 컬렉션 밖의 전용 컬렉션을 쓴다. lowdb처럼 로컬 파일이 아니라 진짜 Firestore 문서라서, [4편](/posts/cloud-run-firestore-iam-permission-data-loss/)에서 겪은 것처럼 컨테이너가 재시작돼도 사라지지 않는다(권한만 정상이라면).

---

## 3. `db.ts` — 드라이버는 어떻게 선택되나

```ts
function resolveDriver(): Driver {
  const explicit = process.env.STORE_DRIVER?.trim().toLowerCase();
  if (explicit === "firestore" || explicit === "mongo" || explicit === "lowdb") {
    return explicit;
  }
  if (process.env.MONGODB_URI?.trim()) return "mongo";
  return "lowdb";
}
```

`STORE_DRIVER` 환경변수를 우선 보고, 없으면 `MONGODB_URI` 유무로 자동 결정한다(기존 동작과의 하위호환).

```ts
export async function initStore(): Promise<Store> {
  let store = getStore();
  try {
    await store.connect();
  } catch (err) {
    if (store.kind === "mongo" || store.kind === "firestore") {
      console.warn(`[store] ⚠ ${store.kind} 연결 실패 → lowdb 로 폴백합니다.`);
      _store = new LowdbStore();
      store = _store;
      await store.connect();
    } else {
      throw err;
    }
  }
  return store;
}
```

연결 실패 시 자동으로 `LowdbStore`로 폴백한다 — "데모가 죽지 않도록" 만든 안전장치다. 이 폴백 로직 자체는 문제가 없었다. 문제는 [4편](/posts/cloud-run-firestore-iam-permission-data-loss/)에서 다뤘듯, 이 폴백이 발생했다는 사실이 API 응답이나 화면 어디에도 드러나지 않아 "정상 동작처럼 보이는 장애"를 만들었다는 점이다.

---

## 마치며

세 파일의 역할을 한 줄씩으로 요약하면 이렇다.

- `store.ts` — 저장소가 지켜야 할 규칙(인터페이스)
- `db.ts` — 그 규칙을 만족하는 구현체 중 뭘 쓸지 결정(+ 실패 시 폴백)
- `store.firestore.ts` — Firestore SDK 저수준 API를 그 규칙에 맞게 감싼 어댑터

이 구조 덕분에 저장소를 세 번(Mongo → lowdb 폴백 → Firestore) 갈아끼우는 동안 `index.ts`의 라우트 코드는 단 한 줄도 바뀌지 않았다. 인터페이스로 추상화하는 비용(코드 한 겹 더)은, 나중에 저장소를 바꿔야 할 때 그 비용을 몇 배로 돌려받았다.
