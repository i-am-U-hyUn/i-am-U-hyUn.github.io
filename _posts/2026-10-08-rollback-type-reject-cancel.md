---
title: "같은 빨간 선, 다른 의미 — 반려와 계약 취소를 백엔드에서 구분하기"
date: 2026-10-08 10:00:00 +0900
categories: [프로젝트, 백엔드]
tags: [TypeScript, React, ReactFlow, 그래프시각화, 데이터모델링, 포트폴리오]
toc: true
---

[2편](/posts/flowchart-swimlane-edge-routing/)에서 반려(rollback) 선은 빨간 점선으로 그리고 배치 계산에서 뺀다고 정리했다. 그런데 계약 검토 단계에서 "되돌아가는 흐름"이 한 종류가 아니라는 요구가 들어왔다. 반려는 계약 작성 단계로 돌아가고, 계약 취소는 사업성 검토부터 다시 시작한다. 화면에서는 둘 다 빨간 선이면 되지만, 데이터로는 둘을 구분할 수 있어야 했다.

> 이 글도 1·2편과 같은 마스킹 기준을 따른다. 회사명·조직·담당자 정보는 담지 않았고, 프로세스 이름은 역할 기반으로 일반화했다. 계약 취소로 분류되는 구체적인 재무 조건은 사내 기준이라 생략했다.
{: .prompt-warning }

---

## 1. 업무 기준: 반려와 계약 취소

계약 검토 중 문제가 생기면 두 경로로 나뉜다.

| 경로 | 돌아가는 곳 | 의미 |
| --- | --- | --- |
| 반려 | C1. 계약 작성 | 사업성 승인은 유지하고 계약 정보만 고쳐 재상신 |
| 계약 취소 | D1. 사업성 검토 | 사업성 검토부터 완전히 다시 받음 |

계약 취소는 재무 리스크로 분류되는 몇 가지 조건 중 하나라도 해당할 때만 쓰고, 나머지 변경은 모두 반려로 처리한다.

이 기준을 반영한 뒤 C2(내부 검토), C3(고객 검토)에서 나가는 선은 이렇게 된다.

| 선 | kind | rollback_type | 화면 표시 |
| --- | --- | --- | --- |
| C2 → C1 | rollback | reject | 빨간 점선, "반려" |
| C2 → D1 | branch | cancel | 빨간 점선, "계약 취소" |
| C3 → C2 | rollback | reject | 빨간 점선, "반려" |
| C3 → C1 | branch | reject | 빨간 점선, "반려" |
| C3 → D1 | branch | cancel | 빨간 점선, "계약 취소" |
| C2 → C3 | branch | 없음 | 회색 실선(일반 순차선) |
| C3 → C5 | branch | 없음 | 회색 실선(일반 순차선) |

같은 빨간 점선인데 `kind`가 `rollback`인 것도 있고 `branch`인 것도 있다. 이 표가 이번 작업의 핵심이다. 선을 두 값으로 나눠서 본다.

---

## 2. 1단계: 선 종류(kind)는 기존 규칙 그대로

선 종류(`kind`)는 기존에 정해 둔 엣지 분기 규칙을 그대로 따르고, 이번에 바꾼 것은 없다.

프로세스 레벨(`parser.ts`의 `buildEdgesFromContext`, Word의 Process Context 표만 본다):

| 조건 | kind |
| --- | --- |
| Next Process가 이 문서의 Previous Process와 같은 ID | `rollback` |
| 그 외 Next Process가 2개 이상 | 모두 `branch`, ①②③ 번호 라벨 |
| 그 외 Next Process가 1개 | `sequence` (hierarchy 관계면 `summary`) |

스텝 레벨(`flow.ts`의 `buildStepGraph`, 단계 표 Description의 괄호 표기):

| 표기 | kind |
| --- | --- |
| `(조건 → N)`, N이 현재 단계보다 작음 | `rollback` |
| `(N)으로 복귀` | `rollback`, 라벨 "복귀" |
| `(조건 → N)`, N이 현재 단계보다 큼 | `branch` 또는 `sequence` |
| `(조건 → 프로세스ID)` | `cross_exit` (보라색 점선) |

이 규칙대로면 C2 → D1은 직전 프로세스가 아니라서 `branch`가 된다. 계약 취소가 빨간 선으로 보이는 건 다음 단계의 구분값 때문이다.

---

## 3. 2단계: 되돌아가는 흐름의 구분값(rollback_type)

`kind`와 별도로 `rollback_type` 필드를 두고 네 가지 값 중 하나를 저장한다.

```ts
export type RollbackType = "review" | "reject" | "cancel" | "return";

export const ROLLBACK_LABEL: Record<RollbackType, string> = {
  review: "재검토",
  reject: "반려",
  cancel: "계약 취소",
  return: "복귀",
};

/** 라벨 키워드로 되돌아가는 흐름의 종류를 찾는다. 키워드가 없으면 null. */
export function rollbackTypeFromLabel(label?: string | null): RollbackType | null {
  const l = label ?? "";
  if (/취소|재시작|재승인/.test(l)) return "cancel";
  if (/재검토/.test(l)) return "review";
  if (/복귀/.test(l)) return "return";
  if (/반려|롤백|roll\s*back/i.test(l)) return "reject";
  return null;
}

/** 이미 rollback으로 판정된 엣지의 종류. 키워드가 없으면 반려. */
export function classifyRollback(label?: string | null): RollbackType {
  return rollbackTypeFromLabel(label) ?? "reject";
}
```

키워드는 위에서부터 먼저 판정한다. 그래서 라벨에 여러 키워드가 섞여 있으면 `cancel`이 가장 먼저 잡힌다.

언제 붙는지는 `kind`에 따라 다르다.

- `kind`가 `rollback`인 선: 항상 붙는다. 키워드가 없으면 `reject`다(`classifyRollback`).
- `kind`가 `branch`나 `sequence`인 선: Next Process 괄호 라벨에 키워드가 있을 때만 붙는다(`rollbackTypeFromLabel`). 없으면 보통 선이다.

파서에서는 `kind`를 정하는 코드는 그대로 두고, 라벨에서 찾은 값만 덧붙인다.

```ts
for (const { ref, id } of resolvedNext) {
  if (isRollbackRef(id)) {
    const label = ref.branch_label ?? "반려 시 롤백";
    edges.push({ from: processId, to: id, kind: "rollback", label, rollback_type: classifyRollback(label) });
    continue;
  }
  // 선 종류(kind)는 문서 규칙 그대로 두고, "(반려)"·"(계약 취소)" 같은 라벨이면 rollback_type만 덧붙인다.
  const rt = rollbackTypeFromLabel(ref.branch_label);
  if (isBranch) {
    const label = `${circled[forwardIdx] ?? `(${forwardIdx + 1})`}${ref.branch_label ? ` ${ref.branch_label}` : ""}`;
    edges.push({ from: processId, to: id, kind: "branch", label, order: forwardIdx + 1, ...(rt && { rollback_type: rt }) });
  } else {
    edges.push({ from: processId, to: id, kind: forwardEdgeKind(processId, id, hierarchyMacroIds, childToMacro), ...(rt && { label: ref.branch_label!, rollback_type: rt }) });
  }
  forwardIdx += 1;
}
```

이미 DB에 있는 예전 데이터에는 `rollback_type`이 없다. 그래서 화면으로 보낼 때(`flow.ts`의 `toFlowEdge`) 저장된 값이 있으면 그 값을 쓰고, 없으면 라벨로 다시 판정한다. 마이그레이션 스크립트를 따로 돌리지 않아도 예전 선이 깨지지 않는다.

```ts
? { rollback_type: e.rollback_type ?? classifyRollback(e.label) }
```

선 라벨 원문(예: "② 계약 취소: …")은 `label`에 그대로 남겨서 화면 툴팁에 쓴다.

---

## 4. 프론트: rollback_type이 있으면 무조건 빨간 선

프론트는 `kind`를 보지 않고 `rollback_type`만 본다. 값이 있으면 렌더링 직전에 `kind`를 `rollback`으로 바꿔 끼운다.

```ts
// 백엔드는 선 종류(kind)를 문서 규칙대로 주고, 반려·계약 취소 같은 되돌아가는 흐름은
// rollback_type으로 따로 표시한다. 화면에서는 rollback_type이 있으면 kind와 상관없이
// 빨간 역행선으로 그리고 배치 계산에서도 뺀다(분기선으로 그리면 레인을 가로지른다).
const edges = props.graph.edges.map((e) =>
  e.rollback_type && e.kind !== "rollback" ? { ...e, kind: "rollback" as const } : e
);
```

이렇게 하면 2편에서 만든 역행선 처리(빨간 `#ef4444` 점선, 노드 위아래로 우회, 배치 계산 제외)를 그대로 재사용한다.

화면 규칙은 이렇게 정리했다.

1. 선 위 글자는 재검토, 반려, 계약 취소, 복귀 중 하나만 짧게 표시한다.
2. 글자에 마우스를 올리면 `label` 원문을 보여 준다. 앞의 ①② 번호는 뺀다.
3. 되돌아가는 선을 빼고 같은 출발점의 분기가 하나만 남으면, ① 번호를 없애고 일반 순차선으로 보여 준다. C2 → C3, C3 → C5가 여기에 해당한다.

3번이 필요한 이유는 표에서 보인다. C2의 Next Process는 C3, C1, D1 세 개라서 파서는 셋 다 `branch`에 ①②③을 붙인다. 그런데 C1, D1이 빨간 선으로 빠지면 C2 → C3 하나만 남는데, 여기에 "①"이 붙어 있으면 분기가 있는 것처럼 보인다.

---

## 5. 겪었던 문제들

### 계약 취소를 분기선으로 그리면 배치가 깨진다

처음에는 `kind`만 보고 그렸기 때문에 계약 취소(→ D1)가 일반 분기선으로 그려졌다. D1은 C2, C3보다 앞 단계라 이 선을 배치 계산에 넣으면 흐름이 순환한다. 결과적으로 선이 레인을 가로지르고 보드 배치가 깨졌다. 4장의 "`rollback_type`이 있으면 `kind`를 바꿔 끼운다"는 처리가 이 문제를 고친 것이다.

### 계약 취소 선 두 개가 한 줄로 포개진다

C2 → D1, C3 → D1 계약 취소 선은 둘 다 레인 경계를 넘어 같은 노드로 들어간다. 꺾이는 높이를 레인 사이 여백의 정중앙에 고정해 두었기 때문에 두 선이 정확히 겹쳐 하나처럼 보였다. 같은 노드로 들어가는 세로 이동선이 여럿이면 꺾이는 높이를 8px씩 벌렸다.

```ts
// 같은 target으로 들어오는 세로 이동선이 여럿이면(예: C2·C3 → D1 계약 취소) 꺾임 높이를
// 8px씩 벌려 한 줄로 포개지지 않게 한다.
const n = inVertSeq.get(e.target) ?? 1;
centerY += (vertIdx - (n - 1) / 2) * 8;
```

### 툴팁이 안 뜬다

라벨에 마우스를 올리면 전체 조건이 보여야 하는데 툴팁이 뜨지 않았다. 엣지의 클릭 영역이 라벨 위를 덮고 있어서 마우스 이벤트가 라벨까지 가지 않았던 것이 원인이었다.

### 상세 화면에서 외부 노드가 카드를 관통한다

사업성 검토 상세 화면에는 다른 그룹(C2·C3)에서 계약 취소로 들어오는 선 때문에 C2, C3 노드가 외부 노드로 함께 그려졌다. 이 노드들이 같은 열에 쌓이면서 선이 카드를 관통했다. 상세·단계 화면에서는 역행선으로 들어오기만 하는 외부 노드를 빼고, 전체 맵과 출발 그룹 상세에서만 보이게 했다.

---

## 6. Word 정의서 작성 규칙

정의서를 쓰는 쪽에서 새로 배울 표기법은 없게 했다. C2, C3 정의서의 Process Context 표에서 Next Process 이름 뒤에 괄호 라벨만 붙이면 된다.

```
Process Name:
C3. 고객 검토
C1. 계약 작성 (반려)
D1. 사업성 검토 (계약 취소: <재무 조건>)
```

- 괄호 안에 키워드(반려, 계약 취소, 재검토 등)가 있어야 빨간 선이 된다. 없으면 보통 분기선이다.
- 콜론 뒤 문구는 마우스를 올렸을 때 보이는 조건이다. 괄호 안에 또 괄호를 쓰면 인식되지 않는다.
- 직전 프로세스로 돌아가는 선(예: C3의 C2)은 괄호가 없어도 빨간 "반려"다. 재검토로 보이려면 `(재검토)`를 붙인다.

정의서에서 표기하는 곳은 기존과 같은 두 군데다.

| 적는 곳 | 표기 예시 | 용도 |
| --- | --- | --- |
| Detailed Process Steps의 Description 끝 | `(정상 → 5, 문제 → 3)`, `(1)으로 복귀` | 같은 프로세스 안의 단계 간 분기·반려 |
| Process Context의 Next Process | `C1. 계약 작성 (반려)`, `D1. 사업성 검토 (계약 취소: 조건)` | 다른 프로세스로의 반려·계약 취소 |

---

## 7. 코드는 공유되는데 데이터는 공유되지 않는다

반려·계약 취소 경로는 develop의 초기 데이터(seed)에 들어 있다. 하지만 화면은 seed가 아니라 각 환경의 DB를 읽어서 그리기 때문에, 코드를 받는다고 바로 빨간 선이 보이지는 않는다.

| 구분 | 내용 | 공유 방식 |
| --- | --- | --- |
| 코드 | 경로 구분 로직, 화면 표시 방식 | `git pull` |
| 초기 데이터(seed) | C2·C3의 반려·계약 취소 경로 포함 (`backend/seed/edges.json`, `processes.json`) | `git pull` |
| 각 환경 DB | 실제 화면 데이터, 업로드한 정의서 포함 | 공유 안 됨 |

seed는 DB가 비어 있을 때만 자동으로 적재된다. 이미 데이터가 있는 DB에는 `git pull`만으로 경로가 들어가지 않는다.

다른 환경에 반영하는 방법은 두 가지였다.

| 방법 | 바뀌는 범위 | 다른 업로드 내용 |
| --- | --- | --- |
| C2·C3 정의서 업로드 | C2·C3의 내용과 경로만 갱신 | 유지됨 |
| seed 재적재(`npm run seed`) | DB 전체를 seed로 교체 | 삭제됨 |

정의서 업로드 쪽을 권장했다. 다만 여기에도 함정이 있다. 업로드는 해당 프로세스에서 나가는 경로를 모두 지우고 정의서의 Next Process 내용으로 다시 만든다(`index.ts`의 `replaceForProcess`). 기존에 올라가 있던 C2·C3 정의서에는 반려·계약 취소가 적혀 있지 않아서, 그 파일을 다시 올리면 빨간 선이 사라진다. 그래서 업로드할 정의서에는 6장 규칙대로 반려·계약 취소를 반드시 적어야 한다.

내 로컬 환경에서는 화면을 먼저 확인하려고, 정의서를 거치지 않고 C2·C3에서 나가는 선만 스크립트로 DB에 직접 교체했다. 교체 전 선은 JSON으로 백업해 두고 되돌리는 스크립트도 같이 만들었다. 정식 경로는 결국 정의서 업로드다.

---

## 8. 남은 일

- 업무 담당자에게 계약 취소가 가능한 단계와 반려 대상 단계를 최종 확인
- 반려·계약 취소가 적힌 C2·C3 정의서를 받아 각 환경에 업로드
- C5(최종 제출)의 "반려 후 재날인"을 경로로 표시할지 결정
- 기존 엣지 분기 규칙 문서에 `rollback_type` 항목 추가
