---
title: "챗봇 답변에 출처 링크 달기 — 프로세스·단계마다 Path URL 부여하기"
date: 2026-10-08 18:00:00 +0900
categories: [프로젝트, 백엔드]
tags: [TypeScript, React, URL설계, 딥링크, 데이터모델링, 포트폴리오]
toc: true
---

Slack 챗봇이 영업 프로세스 관련 질문에 답할 때, 답변 끝에 "이 내용은 어느 프로세스의 몇 번 단계에서 왔는지"를 링크로 달고 싶다는 요청이 들어왔다. 링크를 누르면 플로우차트 대시보드의 해당 화면이 바로 열려야 한다. 이 글은 그러려고 프로세스와 단계 데이터에 화면 주소를 저장하고, 그 주소로 들어오면 해당 화면을 여는 딥링크를 만든 과정이다.

> 이전 글들과 같은 마스킹 기준을 따른다. 회사명·조직·담당자 정보, 내부 회의와 커밋 정보, 실제 서비스 도메인은 담지 않았다. 부문 이름은 `division-1`처럼 일반화했다.
{: .prompt-warning }

---

## 1. 요구사항: 부문마다 프로세스가 다를 수 있다

단순히 "프로세스 하나에 주소 하나"면 쉬웠겠지만, 조건이 하나 붙었다. 부문마다 프로세스가 다를 수 있어서, 같은 프로세스라도 어느 부문 화면으로 보여 줄지에 따라 링크가 달라져야 했다.

그래서 정한 원칙은 이렇다.

- 프로세스가 속한 부문마다 주소를 하나씩 만든다.
- 어느 부문에도 속하지 않은 공통 프로세스는 `common` 주소 하나만 둔다. 모든 부문에 같은 링크를 중복해서 만들지 않기 위해서다.
- 주소는 사람이 입력하지 않고, 부문 소속 정보로 자동 계산한다.

---

## 2. URL 구조: 서브도메인 대신 Path

부문을 `division-1.example.com`처럼 서브도메인으로 나누는 방법도 있었지만, Path 방식을 택했다. 도메인 하나에 경로만 붙이면 되니 부문이 늘어나도 DNS 작업이 필요 없다.

| 화면 | 형식 | 예시 |
| --- | --- | --- |
| 전체보기 | `{주소}/` | `/` |
| 부문 전체 맵 | `{주소}/d/{부문}` | `/d/division-1` |
| 상위 프로세스 상세 | `{주소}/d/{부문}/g/{상위 프로세스 ID}` | `/d/division-1/g/S4` |
| 프로세스 단계 흐름 | `{주소}/d/{부문}/p/{프로세스 ID}` | `/d/division-1/p/C2` |
| 단계 | `{주소}/d/{부문}/p/{프로세스 ID}/s/{단계 번호}` | `/d/division-1/p/C2/s/3` |
| 공통 | 부문 자리에 `common` | `/d/common/p/C2` |

- 데이터에 저장하는 출처 URL은 "프로세스 단계 흐름"과 "단계" 두 가지다. 나머지는 화면 이동과 링크 공유용이다.
- 프로세스 ID는 가장 아래 단계의 상세 프로세스 기준이다(예: C1, D3).
- 단계 번호는 정의서 단계 표의 번호(`seq`)다.
- 앞부분 주소는 환경변수 `APP_BASE_URL`로 받는다. 로컬과 배포 환경의 주소가 다르기 때문이다. 비워 두면 로컬 주소 `http://localhost:5173`을 쓴다.

```
http://localhost:5173/d/common/p/C2/s/3
└──── APP_BASE_URL ───┘└ 코드가 자동으로 붙임 ┘
```

---

## 3. 데이터 구조: 배열이 아니라 부문 키 맵

processes와 steps 문서에 `urls`와 `divisions` 두 필드를 추가했다.

| 필드 | 내용 | 용도 |
| --- | --- | --- |
| `urls` | 부문 키별 `url`과 `title` | 답변 출처 링크와 링크 텍스트 |
| `divisions` | 소속 부문 목록. `urls`의 키와 같음 | 검색 대상 부문 필터 |

`urls`는 배열이 아니라 부문을 키로 하는 맵이라, 원하는 부문의 링크를 키 하나로 바로 꺼낼 수 있다.

예를 들어 C2가 1부문과 2부문에만 속하면 이렇게 저장된다. 소속되지 않은 3부문 URL은 만들지 않는다.

```json
"urls": {
  "division-1": { "url": "{주소}/d/division-1/p/C2", "title": "부문 1 · C2. 내부 검토" },
  "division-2": { "url": "{주소}/d/division-2/p/C2", "title": "부문 2 · C2. 내부 검토" }
},
"divisions": ["division-1", "division-2"]
```

단계는 프로세스 URL 뒤에 단계 번호를 붙인다.

```json
"urls": {
  "division-1": { "url": "{주소}/d/division-1/p/C2/s/1", "title": "부문 1 · C2. 내부 검토 > 1. 검토 정보 확인" }
}
```

부문에 속하지 않은 프로세스는 `common` 키 하나만 가진다.

---

## 4. 자동 계산: syncProcessUrls

`urls`와 `divisions`는 파생 값이다. `division.ts`의 `syncProcessUrls`가 부문 소속 정보를 읽어 모든 프로세스와 단계에 다시 써 넣는다.

부문 소속 목록(`division_roots`)에는 상위 프로세스 ID와 상세 프로세스 ID가 섞여 있을 수 있다. 상위 프로세스가 등록돼 있으면 계층 정보(`hierarchy`)를 따라 하위 프로세스까지 펼친다.

```ts
export function resolveDivisionProcessIds(
  divisionId: string,
  divisionRoots: DivisionRootDoc[],
  hierarchy: HierarchyDoc[]
): Set<string> {
  const root = divisionRoots.find((d) => d.division_id === divisionId);
  if (!root) return new Set();

  const detailsByMacro = new Map(
    hierarchy.map((h) => [h.macro_process_id, h.detail_process_ids] as const)
  );

  const resolved = new Set<string>();
  const visited = new Set<string>(); // 순환 참조 방어

  function expand(id: string): void {
    if (visited.has(id)) return;
    visited.add(id);
    resolved.add(id);
    const details = detailsByMacro.get(id);
    if (details) {
      for (const detailId of details) expand(detailId);
    }
  }

  for (const id of root.process_ids) expand(id);
  return resolved;
}
```

그다음 프로세스마다 소속 부문을 찾아 URL과 제목을 만들고, 같은 프로세스의 모든 단계에 `/s/{단계 번호}`를 붙인다.

```ts
// 로컬(Vite)과 Cloud Run 주소가 달라 환경변수로 받는다. 끝의 / 는 떼어 낸다.
const APP_BASE_URL = (process.env.APP_BASE_URL || "http://localhost:5173").replace(/\/+$/, "");
export const COMMON_DIVISION = "common";

export async function syncProcessUrls(store: Store): Promise<void> {
  const [processes, steps, roots, hierarchy] = await Promise.all([
    store.find<ProcessDoc>("processes"),
    store.find<StepDoc>("steps"),
    store.find<DivisionRootDoc>("division_roots"),
    store.find<HierarchyDoc>("hierarchy"),
  ]);
  const sorted = [...roots].sort((a, b) => a.division_id.localeCompare(b.division_id));
  const members = sorted.map((r) => ({ root: r, ids: resolveDivisionProcessIds(r.division_id, roots, hierarchy) }));

  for (const p of processes) {
    const owners = members.filter((m) => m.ids.has(p.process_id)).map((m) => m.root);
    const keys = owners.length > 0 ? owners : [{ division_id: COMMON_DIVISION, division_name: "공통" }];
    const urls: SourceUrls = {};
    for (const d of keys) {
      urls[d.division_id] = {
        url: `${APP_BASE_URL}/d/${d.division_id}/p/${encodeURIComponent(p.process_id)}`,
        title: `${d.division_name} · ${p.process_id}. ${p.process_name}`,
      };
    }
    const divisions = Object.keys(urls);
    await store.upsertProcess({ ...p, urls, divisions });

    const own = steps.filter((s) => s.process_id === p.process_id);
    if (own.length === 0) continue;
    const stepDocs = own.map((s) => {
      const su: SourceUrls = {};
      for (const [k, v] of Object.entries(urls)) {
        su[k] = { url: `${v.url}/s/${s.seq}`, title: `${v.title} > ${s.seq}. ${s.step_name}` };
      }
      return { ...s, urls: su, divisions };
    });
    await store.replaceForProcess<StepDoc>("steps", { process_id: p.process_id }, stepDocs);
  }
}
```

다시 계산하는 시점은 부문 소속이나 단계 번호가 바뀔 수 있는 세 경우다.

| 시점 | 이유 |
| --- | --- |
| 정의서 업로드 직후 | 단계가 다시 만들어지고, 업로드한 부문에 자동 소속됨 |
| 부문 수정 API 호출 시 (`PUT /api/divisions/:id`) | 부문 소속 목록이 바뀜 |
| 서버 시작 시 | 기존 데이터에 한 번에 채워 넣기 |

업로드할 때마다 단계 URL도 함께 다시 만들기 때문에, 정의서를 다시 올려 단계 번호가 바뀌어도 링크가 낡지 않는다. 서버 시작 시 계산 덕분에 기존 DB에도 별도 마이그레이션 없이 채워졌다. 로컬 MongoDB에서 확인했을 때 프로세스 20건 모두에 URL이 생겼고, 기존 업로드 데이터는 하나도 바뀌지 않았다.

---

## 5. 프론트: 주소로 들어오면 그 화면을 연다

저장된 URL로 접속하면 해당 화면이 바로 열려야 한다. 별도 라우터 라이브러리 없이, 첫 진입 때 `pathname`을 정규식 하나로 해석했다.

```ts
// /d/{division}                  부문 전체 맵
// /d/{division}/g/{macroId}      상위 프로세스 상세(하위 흐름)
// /d/{division}/p/{processId}    단계 흐름 (+ /s/{seq} 단계 강조)
const m = window.location.pathname.match(/^\/d\/([^/]+)(?:\/(g|p)\/([^/]+)(?:\/s\/(\d+))?)?\/?$/);
if (!m) return;
const [, division, kind, rawId, seq] = m;
if (division !== "common") setActiveDivision(division);
if (!kind) return;
const id = decodeURIComponent(rawId);
if (kind === "g") {
  setView({ mode: "detail", macroId: id });
  setSelected(id);
  return;
}
deepLinkSeq.current = seq ? Number(seq) : null;
openProcessFlow(id);
```

- 프로세스 URL: 그 프로세스의 단계 흐름 화면과 오른쪽 상세 패널이 열린다.
- 단계 URL: 단계 흐름이 다 불러와진 뒤 해당 단계 카드를 강조한다. 그래서 단계 번호는 `deepLinkSeq`에 잠시 들고 있다가, 그래프가 준비되면 꺼내 쓴다.
- 부문: `common`이 아니면 해당 부문이 선택된 상태로 열린다.

배포용 nginx에는 원래 모든 경로를 메인 화면으로 넘기는 설정(`try_files $uri $uri/ /index.html`)이 있었다. 그래서 `/d/...` 같은 경로로 바로 들어와도 404가 나지 않고, 서버 쪽 추가 작업이 필요 없었다.

### 반대 방향: 화면을 옮기면 주소창도 바뀐다

처음에는 "링크로 들어오면 열린다"까지만 만들었다. 그러다 앱 안에서 화면을 옮겨도 주소창이 그대로라 보고 있는 화면을 공유할 수 없다는 점이 걸려서, 반대 방향도 맞췄다.

```ts
// 반대 방향: 앱 안에서 화면을 옮기면 주소창도 같은 형식으로 바꿔, 보고 있는 화면 링크를 바로 공유할 수 있게 한다.
// 기록을 쌓지 않는 replaceState라 뒤로 가기 동작은 기존과 같다.
useEffect(() => {
  if (deepLinkSeq.current != null) return; // 딥링크로 들어와 단계 강조 전이면 원래 주소를 유지
  const div = activeDivision ?? "common";
  let path = activeDivision ? `/d/${div}` : "/";
  if (view.mode === "detail") {
    path = `/d/${div}/g/${encodeURIComponent(view.macroId)}`;
  } else if (view.mode === "steps") {
    path = `/d/${div}/p/${encodeURIComponent(view.processId)}`;
    const seq = graph?.nodes.find((n) => n.id === highlightStepId)?.seq;
    if (seq != null) path += `/s/${seq}`;
  }
  if (window.location.pathname !== path) window.history.replaceState(null, "", path);
}, [view, activeDivision, highlightStepId, graph]);
```

`pushState`가 아니라 `replaceState`를 쓴 이유는 코드 주석 그대로다. 화면을 옮길 때마다 브라우저 기록이 쌓이면 뒤로 가기 동작이 기존과 달라지기 때문이다. 단계를 선택하면 `/s/{단계 번호}`까지 붙고, 전체 맵으로 돌아가면 `/`가 된다.

맨 위 `deepLinkSeq` 확인은 순서 문제를 막는다. 단계 링크로 들어온 직후에는 아직 단계 강조 전이라, 이 effect가 먼저 돌면 주소창의 `/s/3`이 지워진다.

---

## 6. 파생 값은 seed에 넣지 않는다

이 필드를 넣은 뒤, [에뮬레이터 seed 자동 저장 글](/posts/firestore-emulator-seed-dump/)에서 다룬 덤프 기능을 실제로 시험하다 문제가 하나 드러났다. 현재 DB를 seed 파일로 저장하면 모든 프로세스와 단계에 `urls`, `divisions`가 함께 저장됐다. 정의서 한 건만 올렸는데 seed 변경이 수천 줄로 불어났고, 그 안에는 `http://localhost:5173` 같은 환경별 주소도 섞여 있었다.

`urls`는 서버가 켜질 때마다 부문 소속으로 다시 계산하는 값이다. 원본인 부문 소속, 계층, 프로세스, 단계만 seed에 있으면 같은 URL이 다시 만들어진다. 그래서 seed로 저장할 때는 두 필드를 빼도록 고쳤다. 다시 켠 뒤에도 URL이 그대로 생기는 것을 확인했다.

---

## 7. 남은 일

현재는 모든 부문의 소속 프로세스가 비어 있어서, 모든 프로세스가 `common` URL만 가진다. 부문 소속을 정하면 부문별 URL은 자동으로 만들어진다. 배포 전에 정해야 할 것들이 남아 있다.

- 부문을 어떤 기준으로 나눌지, 부문별로 어떤 프로세스가 속하는지
- 모든 부문에 속하는 프로세스에 부문별 URL을 모두 둘지, `common` 하나로 합칠지
- 링크 제목 형식("부문 1 · C2. 내부 검토")이 괜찮은지
- `APP_BASE_URL`에 넣을 최종 서비스 주소
