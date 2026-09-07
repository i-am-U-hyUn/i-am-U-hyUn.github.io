---
title: "정의서 업로드만으로 플로우차트가 그려지게 — 프로세스 시각화 도구의 ELT 아키텍처"
date: 2026-09-04 09:00:00 +0900
categories: [프로젝트, 백엔드]
tags: [Node.js, Express, TypeScript, MongoDB, lowdb, mammoth, Multer, ELT, ReactFlow, 플로우차트, 포트폴리오]
toc: true
mermaid: true
---

[BPMN 정리 글](/posts/bpmn-concepts-ko/)에서 "업무 프로세스를 그림으로 그려서 공유해야 할 일이 생겼다"고 썼는데, 그 요청의 실제 결과물이 이 글에서 다루는 프로세스 시각화 도구다. Word로 작성된 프로세스 정의서를 업로드하면 자동으로 표준 플로우차트 도형으로 그려주는 웹 대시보드를 직접 설계·구현했다.

> 이 글에는 실제 회사명, 시스템 로고, 사내 조직/문서 식별자는 담지 않았다. 예시로 드는 프로세스 이름(계약서 작성, 고객 피드백 등)은 실제 문서명이 아니라 역할을 알 수 있게 일반화한 이름이다. 승인율/소요시간/마진율 시리즈에서 다룬 DMS(Deal Management System)와 같은 계열의 영업 프로세스를 대상으로 한다.
{: .prompt-warning }

---

## 1. 문제: 정의서는 있는데, 그림은 매번 사람이 그려야 했다

사내에는 이미 프로세스별로 Word 정의서(총 20개 문서)가 있었다. 크게 두 레이어로 나뉜다.

- **macro(전체 흐름)**: 리드/기회 발생부터 계약 체결·청구·마감까지 이어지는 7단계 큰 흐름
- **detail(하위 상세)**: macro 중 특정 단계 아래에 딸린 세부 프로세스 그룹 — 계약검토 그룹(6개 문서), 사업성검토 그룹(8개 문서)

각 정의서에는 목적·범위·종료조건·담당자·단계(steps)·Pain Point 같은 항목이 표/문단으로 정리돼 있었다. 문제는 정의 이후였다. 프로세스는 한 번 정리하고 끝나는 게 아니라 계속 바뀌었고, 바뀔 때마다 draw.io 같은 드로잉 툴을 열어 아키텍처/흐름도를 처음부터 다시 그려야 했다. 이게 번거롭다는 의견이 실제로 있었고, 그림을 다시 그리는 사이 원본 문서와 그림이 서로 다른 버전을 가리키는 상태도 자주 생겼다.

더 큰 이유는 따로 있었다. 이 프로세스 흐름을 신입사원 교육에 슬랙봇과 연계해서 활용하려는 계획이 있었는데, 그러려면 "지금 그려놓은 그림"이 아니라 "지금 실제 프로세스 상태를 실시간으로 반영하는" 데이터가 필요했다. 정적인 이미지 파일로는 이 요구를 채울 수 없었다.

목표는 명확했다: **정의서를 업로드하면 사람이 다시 그리지 않아도 표준 플로우차트 도형(시작/끝·처리·판단·입출력)으로 자동 렌더링**되게 하고, 전체(Overview) → 그룹(Detail) → 개별 단계(Step) 순으로 드릴다운할 수 있게 만들어서, 이후 슬랙봇 등 다른 채널에서도 같은 데이터를 실시간으로 가져다 쓸 수 있는 기반을 만드는 것.

---

## 2. 왜 ETL이 아니라 ELT로 설계했나

파이프라인은 Extract → Load → Transform 순서인데, 무거운 변환(그래프 조립, 도형 판별)을 적재 전이 아니라 **조회 시점**에 수행하도록 설계했다.

```mermaid
flowchart LR
    A[".docx 정의서"] -->|"Extract\n(mammoth)"| B["파싱/정규화\n(JSON 문서)"]
    B -->|"Load\n(Store 추상화)"| C[("Document DB\nMongo / lowdb")]
    C -->|"Transform\n(조회 시점)"| D["Flow Chart\n(도형 + 엣지)"]
```

이렇게 나눈 이유는 화면에 필요한 그래프 구조·도형 판별 로직이 서비스 초기에 가장 자주 바뀌는 부분이었기 때문이다. 변환을 적재 시점에 미리 해두면 로직이 바뀔 때마다 전체 데이터를 다시 적재해야 하지만, 원본을 원본 그대로 저장해두고 조회 시점에만 그래프로 변환하면 로직 수정은 코드만 고치면 끝난다.

### Store 추상화 — 인프라 없이도 항상 돌아가게

저장 계층은 인터페이스로 추상화해서 `MONGODB_URI`가 설정되면 MongoDB를, 없으면 lowdb(JSON 파일)를 쓰게 했다. 여기서 한 걸음 더 나아가 **Mongo 연결 자체가 실패해도 자동으로 lowdb로 폴백**하도록 만들었다.

```ts
// db.ts의 initStore 개념 — 실패해도 데모가 죽지 않게
try {
  const mongoStore = await connectMongo(uri);
  return mongoStore;
} catch {
  console.warn("[db] Mongo 연결 실패 → lowdb로 폴백");
  return new LowdbStore();
}
```

데모/시연 환경에서는 MongoDB Atlas 계정을 준비하지 못했거나 네트워크가 막혀 있을 수 있는데, 이 폴백 덕분에 인프라 준비 여부와 무관하게 항상 시연이 가능하다. 컬렉션 스키마는 Mongo와 lowdb 양쪽 모두 동일하게 유지했고, Mongo로 전환하면 `process_id` 인덱스와 `$lookup`으로 DB 레벨 조인이 가능하도록 스키마를 미리 맞춰뒀다.

7개 컬렉션은 전부 `process_id`를 연결 키로 두고 분리해서 저장한다(합쳐서 하나의 문서로 뭉치지 않는다).

| 컬렉션 | 건수 | 연결 키 |
|---|---|---|
| processes | 20 | `process_id` (PK) |
| steps | 76 | `process_id` → processes |
| pain_points | 37 | `process_id` → processes |
| edges | 22 | `from`/`to` → process_id |
| hierarchy | 2 | `macro_process_id`, `detail_process_ids[]` |
| priority_score_scale | 1 | (공통) |
| data_quality_flags | 5 | `process_id` (nullable) |

lowdb는 조인 기능이 없어서 앱 코드에서 `filter`로 수동 매칭하는데, 이렇게 컬렉션을 미리 분리해두면 나중에 Mongo로 전환했을 때 `$lookup` aggregation으로 그대로 갈아탈 수 있다 — 저장소를 바꾸자고 스키마까지 다시 설계할 필요가 없다.

---

## 3. Word 문서 파싱 — 자유 형식 문서를 구조화하기

`.docx` 업로드 처리는 `mammoth`로 서식을 걷어내고 평문 텍스트를 뽑는 것부터 시작한다.

```ts
const { value: rawText } = await mammoth.extractRawText({ buffer });
```

여기서부터가 실제로 신경 쓴 부분이다.

**1) 파일명에서 프로세스 ID/이름 추론.** 정의서 파일명이 `..._C1. 계약서 작성.docx`처럼 `{프로세스ID}. {프로세스명}` 규칙을 따르길래, 정규식으로 이를 파싱해 `process_id`와 `process_name`을 자동으로 채운다.

```ts
const m = base.match(/_([SCD]\d+)[.\s]+(.+)$/);
// => { id: "C1", name: "계약서 작성" }
```

**2) 라벨 기반 필드 매핑.** "목적/Scope/종료 조건/작성자/버전" 같은 라벨 뒤에 오는 텍스트를 한 줄 단위로 찾아 필드에 매핑한다. 정의서가 자유 형식이라 100% 자동 매핑은 불가능하다는 걸 인정하고, 추출 가능한 필드는 채우고 나머지는 `null`로 남기는 **원문 보존 원칙**을 세웠다 — 값이 없다고 임의로 채우거나 추측하지 않는다.

**3) 한글 파일명 mojibake 복원.** 업로드 클라이언트가 한글 파일명을 기본 latin1로 디코딩하면서 깨지는 경우가 있어서, mojibake 특성 문자가 섞여 있으면 latin1 → UTF-8로 재해석을 시도하고 복원 결과에 한글이 포함되면 그걸 채택하는 방어 로직을 넣었다.

```ts
if (/[À-ÿ]/.test(filename)) {
  const restored = Buffer.from(filename, "latin1").toString("utf-8");
  if (/[가-힣]/.test(restored)) return restored;
}
```

**현재 자동 추출의 한계.** 지금은 파일명과 라벨 텍스트로 프로세스 기본 필드까지만 자동 매핑한다. 정의서 안의 표(단계별 담당자·소요시간·Pain Point 등)까지 파싱해서 `steps`/`pain_points`/`edges`를 자동으로 채우는 건 아직 손대지 않은 영역이다 — 표 구조가 문서마다 제각각이라 우선순위를 낮췄고, 지금은 시드 데이터로 채워둔 뒤 업로드는 신규 프로세스를 등록하는 용도로 쓰는 선에서 타협했다.

---

## 4. 핵심 로직: 표준 도형을 "판별"하는 알고리즘

이 프로젝트에서 가장 신경 쓴 로직은 **그래프 위상 + 텍스트 키워드만으로 각 노드의 플로우차트 표준 도형을 자동 판별**하는 부분이다. 사람이 일일이 "이 단계는 마름모, 저 단계는 사각형"이라고 지정하지 않아도 된다.

| 도형 | 조건 |
|---|---|
| **terminator** (타원, 시작/끝) | 진입 엣지 0개 또는 진출 엣지 0개 |
| **decision** (마름모, 판단) | 분기(branch) 엣지 2개 이상, 또는 판단 키워드(확인/검토/여부/승인/분류) 포함 |
| **io** (평행사변형, 입출력) | 입출력 키워드(업로드/제출/회신/조회/등록/동기화 등) 포함 |
| **process** (직사각형, 처리) | 그 외 일반 작업 |

```ts
function decideShape(opts: { indeg: number; outdeg: number; branchOut: number; ioHint: boolean }) {
  if (opts.indeg === 0) return { shape: "terminator", terminal: "start" };
  if (opts.outdeg === 0) return { shape: "terminator", terminal: "end" };
  if (opts.branchOut >= 2) return { shape: "decision" };
  if (opts.ioHint) return { shape: "io" };
  return { shape: "process" };
}
```

여기서 놓치기 쉬운 디테일 하나: **반려(rollback) 엣지는 차수 계산에서 제외**한다. 반려로 되돌아가는 역방향 엣지까지 진출 차수에 포함시키면, 실제로는 정상 종료 지점인 노드도 "진출 엣지가 있다"는 이유로 terminator가 아닌 것으로 잘못 판별되기 때문이다. 반려 흐름은 도형 판별과는 별개로 화면에 빨간 점선으로 표시한다.

이 로직 하나로, 예를 들어 "딜 유형을 Fast Track/Standard/Complex 세 갈래로 분류하는" 단계는 branch 엣지가 3개 나가므로 자동으로 마름모(decision)가 되고, "계약서 업로드" 같은 단계는 키워드 매칭으로 자동으로 평행사변형(io)이 된다 — 정의서를 새로 업로드해도 도형을 다시 지정할 필요가 없다.

---

## 5. 드릴다운 뷰 + 전체 통합 맵

같은 원본 데이터를 조회 시점에 네 가지 다른 그래프로 조립한다. 전부 `backend/src/flow.ts`에 있다.

| 뷰 | API | 내용 |
|---|---|---|
| Broad | `/api/flow/macro` | 전체 macro 흐름 |
| Detail | `/api/flow/detail/:macroId` | 특정 macro 하위의 상세 프로세스 그룹 흐름 |
| Step | `/api/flow/steps/:processId` | 개별 프로세스의 단계 흐름 |
| Full | `/api/flow/full` | 전체 프로세스를 하나의 스윔레인 통합 맵으로 |

Detail 뷰는 그룹 내부 노드만 보여주지 않고, 그룹 경계를 넘나드는 엣지(다른 그룹으로 빠지는 분기, 다음 단계로 넘어가는 연결)까지 포함해서 그룹 밖 노드를 "외부 노드"로 함께 표시한다. 그래야 실제 프로세스 흐름이 잘려 보이지 않는다.

Full 뷰(`buildFullGraph`)는 나머지 셋과 성격이 다르다. macro/detail/step은 그래프를 그대로 노드+엣지로 내려주지만, Full은 프로세스마다 `LANES`(부서/시스템별 4개 구획: 영업기회 / 사업성검토 / 계약검토 / 청구·마감)에 소속을 미리 배정하고, branch·rollback·hierarchy 엣지는 화면에 선으로 안 그릴 걸 감안해서 아예 **출발 노드에 붙는 뱃지 데이터**(`branches`, `crossNexts`)로 변환해 내려준다.

```ts
// backend/src/flow.ts — buildFullGraph
// 레인을 넘어가는 순차(sequence) 연결은 선 대신 "다음 →" 뱃지로
for (const e of edges) {
  if (e.kind !== "sequence") continue;
  const src = nodeById.get(e.from), tgt = nodeById.get(e.to);
  if (!src || !tgt || src.lane === tgt.lane) continue; // 같은 레인은 나란히 배치라 생략
  src.crossNexts ??= [];
  src.crossNexts.push({ target: tgt.label, targetId: e.to, laneLabel: laneLabelOf(tgt.lane) });
}
```

즉 "선을 그릴지 뱃지로 뭉갤지"는 프론트 렌더링 단계의 판단이 아니라, **API 응답을 만드는 시점에 백엔드가 이미 결정**해서 내려준다. 프론트는 그 결과를 그대로 그리기만 하면 된다 — 이 뷰를 화면에 실제로 그리면서 부딪힌 문제(왜 이런 변환이 필요했는지, 레이아웃은 어떻게 잡았는지)는 [2편](/posts/flowchart-swimlane-edge-routing/)에서 이어진다.

---

## 6. 문서 관리 — 시드는 보호하고, 업로드는 자유롭게

요구사항은 단순했다. 데모/베이스라인으로 쓰는 시드 데이터(20개 프로세스)는 실수로도 지워지면 안 되고, 반대로 사용자가 새로 업로드한 문서는 언제든 자유롭게 등록·삭제할 수 있어야 한다는 것. 그래서 `ProcessDoc`에 `uploaded` 플래그 하나를 두고, 삭제 요청을 서버에서부터 걸렀다.

```ts
app.delete("/api/process/:id", async (req, res) => {
  const doc = await store.findOne<ProcessDoc>("processes", { process_id: req.params.id });
  if (!doc.uploaded) {
    return res.status(400).json({ error: "시드(기본) 프로세스는 삭제할 수 없습니다. 업로드 문서만 삭제 가능합니다." });
  }
  ...
});
```

업로드 입구에도 방어를 걸었다 — `multer`를 메모리 스토리지로 붙이고 파일 크기 20MB 제한, `.docx` 확장자 검사를 파싱을 시도하기도 전에 먼저 처리한다. `/api/documents`는 시드/업로드를 구분해 업로드본은 최신순으로, 시드는 프로세스 ID순으로 정렬해 내려주고, 이 목록이 프론트의 "문서 관리" 서랍(UI)에서 필터링과 삭제 버튼의 근거가 된다. 서버가 최종 방어선이지만, 프론트에서도 `deletable` 플래그로 시드 문서는 삭제 버튼 자체를 비활성화해 — 서버 검증 하나만 믿지 않고 UI 단에서도 한 번 더 막는 이중 방어를 택했다.

---

## 7. 비즈니스 임팩트

- **문서와 그림의 정합성 문제 해결**: 정의서가 바뀌어도 재업로드만 하면 그림이 자동으로 갱신된다. 더 이상 "문서는 고쳤는데 그림은 옛날 버전"인 상태가 생기지 않는다.
- **드릴다운으로 청중에 맞는 해상도 제공**: 경영진 보고에는 Overview(전체 흐름), 실무 교육/인수인계에는 Step 단위까지 내려가는 상세 흐름을 같은 도구, 같은 데이터로 제공한다.
- **인프라 요구사항을 낮춘 데모 설계**: MongoDB 없이도 lowdb 폴백으로 바로 시연 가능해서, 도구 자체를 제안/공유하는 초기 단계의 진입장벽을 낮췄다.
- **다음 단계로의 확장 기반**: API로 실시간 상태를 조회할 수 있는 구조라, 이후 신입사원 교육용 슬랙봇 연계 같은 다른 채널에서도 같은 데이터를 그대로 가져다 쓸 수 있다(연계 자체는 다음 단계 과제).

---

다음 편에서는 이 그래프(노드 20개, 엣지 22개 규모)를 실제 화면에 그리면서 부딪힌 문제 — 분기·반려 엣지가 뒤섞이며 화면을 뒤덮던 문제와, 이를 스윔레인 레이아웃과 엣지 라우팅으로 풀어간 과정을 다룬다.
