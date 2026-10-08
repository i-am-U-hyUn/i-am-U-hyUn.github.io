---
title: "에뮬레이터를 끄면 데이터가 사라진다 — 종료 직전 seed 자동 저장"
date: 2026-10-08 14:00:00 +0900
categories: [프로젝트, 백엔드]
tags: [Firestore, 에뮬레이터, Makefile, TypeScript, 개발환경, 포트폴리오]
toc: true
---

로컬 개발에서는 Firestore 에뮬레이터를 컨테이너로 띄워 쓴다. 그런데 에뮬레이터를 끄고 다시 켜면 그동안 업로드한 정의서가 모두 사라지고, 초기 데이터(seed)의 맨 처음 버전으로 돌아가는 문제가 있었다. 이 글은 에뮬레이터를 끄기 직전에 현재 데이터를 seed로 저장하도록 바꾼 내용이다.

> 이전 글들과 같은 마스킹 기준을 따른다. 회사명·조직·담당자 정보와 내부 저장소 커밋 정보는 담지 않았다.
{: .prompt-warning }

---

## 1. 왜 데이터가 사라지는가

원인은 두 가지가 겹친 것이다.

1. 에뮬레이터는 데이터를 메모리에만 보관한다. 컨테이너를 지우면 데이터도 함께 사라진다.
2. 앱은 기동할 때 DB가 비어 있으면 `backend/seed`의 JSON을 자동으로 적재한다.

그래서 다시 켤 때마다 빈 DB가 되고, 앱이 seed를 넣으면서 "처음 버전"으로 돌아간다. seed 파일이 최신이면 이 문제는 사라진다. 그래서 끄기 직전의 데이터로 seed를 갱신하는 방향을 택했다.

---

## 2. 변경 내용

`make emulator-down`으로 에뮬레이터를 끄면, 끄기 전에 현재 데이터가 `backend/seed`에 자동으로 저장된다. 다시 켜면 마지막으로 끄기 전 데이터로 올라온다.

| 명령어 | 동작 |
| --- | --- |
| `make emulator-down` | 현재 데이터를 seed에 저장한 뒤 에뮬레이터 종료 |
| `make emulator-down SKIP_DUMP=1` | 저장하지 않고 종료 |
| `make dump-emulator` | 종료하지 않고 seed 저장만 실행 |
| `npm run seed:dump` | 현재 연결된 저장소의 데이터를 seed에 저장. MongoDB, lowdb 환경에서도 사용 가능 |

저장되는 항목은 프로세스, 단계, Pain Point, 경로, 계층, 데이터 품질 플래그, 버전 이력, 부문 정보다. 대시보드 버전 이력과 화면 배치는 원래 seed 대상이 아니어서 저장되지 않는다.

---

## 3. 구현: seed 적재의 반대 방향

기존 `seed.ts`에는 seed JSON을 DB에 넣는 `loadSeed`가 있었다. 여기에 반대 방향인 `dumpSeed`를 추가하고, `--dump` 인자로 갈라지게 했다.

```json
"seed": "tsx src/seed.ts",
"seed:dump": "tsx src/seed.ts --dump",
```

```ts
/** seed 문서 식별 키. _id 가 없는 컬렉션(edges, hierarchy, data_quality_flags)은 내용 필드로 만든다. */
function docKey(d: Record<string, unknown>): string {
  if (typeof d._id === "string") return d._id;
  return [d.from, d.to, d.kind, d.macro_process_id, d.process_id, d.flag].join("|");
}

/**
 * 현재 DB 내용을 seed JSON 으로 덤프한다 (loadSeed의 반대 방향).
 * 에뮬레이터/로컬 DB를 내리기 전에 실행해 두면, 다음 기동 때 업로드한 최신 상태로 seed 된다.
 * Mongo가 자동 부여한 ObjectId _id 는 seed 원본처럼 빼고, 문자열 _id 는 유지한다.
 * urls·divisions 는 서버 시작 시 syncProcessUrls 가 다시 만드는 파생 값이라 저장하지 않는다.
 * 저장소가 돌려주는 순서(Firestore 는 문서 ID 순)는 기존 seed 파일 순서로 되돌려 git diff 에 실제 변경만 남긴다.
 */
export async function dumpSeed(store: Store): Promise<void> {
  // 막 띄운 빈 DB를 덤프하면 seed가 빈 배열로 덮여 원본을 잃으므로, 프로세스가 하나도 없으면 건너뛴다.
  if ((await store.count("processes")) === 0) {
    console.log("[seed:dump] DB에 프로세스가 없어 seed를 덮어쓰지 않고 건너뜀");
    return;
  }
  for (const [collection, file] of Object.entries(SEED_FILES)) {
    const docs = ((await store.find(collection as CollectionName)) as unknown as Record<string, unknown>[]).map(
      ({ urls, divisions, ...doc }) => {
        if (typeof doc._id !== "string") delete doc._id;
        return doc;
      }
    );
    // 기존 seed 에 있던 문서는 그 자리, 새 문서는 뒤로 (Array.sort 는 안정 정렬이라 새 문서끼리는 원래 순서 유지)
    const prev = fs.existsSync(path.join(SEED_DIR, file)) ? readJson<Record<string, unknown>[]>(file) : [];
    const pos = new Map(prev.map((d, i) => [docKey(d), i]));
    const at = (d: Record<string, unknown>) => pos.get(docKey(d)) ?? prev.length;
    docs.sort((a, b) => at(a) - at(b));
    fs.writeFileSync(path.join(SEED_DIR, file), JSON.stringify(docs, null, 2));
    console.log(`[seed:dump] ${file} ← ${collection} ${docs.length}건`);
  }
}
```

네 가지를 신경 썼다.

- **저장소에 독립적**: `Store` 인터페이스의 `count`, `find`만 쓰기 때문에 Firestore 에뮬레이터뿐 아니라 MongoDB, lowdb에 연결된 상태에서도 같은 명령으로 저장된다. 어떤 저장소에 붙을지는 기존처럼 환경 변수(`STORE_DRIVER`)가 정한다.
- **`_id` 처리**: MongoDB가 자동으로 붙인 ObjectId는 seed 원본에 없던 값이라 뺀다. 문자열 `_id`는 원래 seed에 있던 값이라 유지한다. 이렇게 해야 저장한 seed가 원본 seed와 같은 모양이 된다.
- **파생 필드 제외**: 프로세스·단계의 `urls`, `divisions`(Slack 출처 링크용 Path URL)는 서버가 켜질 때 부문 소속 정보로 다시 계산하는 값이라 저장하지 않는다. 다시 켜도 같은 URL이 만들어진다.
- **순서 유지**: 저장소가 돌려주는 순서를 기존 seed 파일 순서로 되돌린다. 새로 생긴 문서만 뒤에 붙는다. 마지막 두 가지는 실제 에뮬레이터 시험에서 문제를 발견하고 추가했다(7장).

---

## 4. 구현: 끄기 전에 저장, 실패하면 끄지 않기

Makefile의 `emulator-down`은 컨테이너를 지우기 전에 `dump-emulator`를 먼저 부른다.

```makefile
dump-emulator: ## Firestore 에뮬레이터의 현재 데이터를 backend/seed 로 저장
	@echo "==> Firestore 에뮬레이터 데이터를 seed 로 저장 ($(EMULATOR_HOST))"
	STORE_DRIVER=firestore \
	FIRESTORE_PROJECT_ID=demo-local \
	FIRESTORE_EMULATOR_HOST=$(EMULATOR_HOST) \
	npm run seed:dump
	@echo "✓ seed 저장 완료 — git diff backend/seed 로 변경 확인"

emulator-down: check-engine ## 현재 데이터를 seed 로 저장한 뒤 에뮬레이터 정지/삭제 (저장 생략: SKIP_DUMP=1)
	@# 컨테이너를 지우면 업로드한 데이터가 사라지므로, 실행 중이면 먼저 seed 로 저장한다.
	@# 저장에 실패하면 데이터 보호를 위해 정지하지 않는다.
	@if [ -z "$(SKIP_DUMP)" ] && $(ENGINE) inspect firestore-emulator >/dev/null 2>&1; then \
		"$(MAKE)" --no-print-directory -f $(firstword $(MAKEFILE_LIST)) dump-emulator || { \
			echo "✗ seed 저장 실패 — 에뮬레이터를 정지하지 않았습니다. 저장 없이 끄려면: make emulator-down SKIP_DUMP=1"; \
			exit 1; \
		}; \
	fi
	-$(ENGINE) rm -f firestore-emulator
	@echo "✓ Firestore 에뮬레이터 정지"
```

`FIRESTORE_PROJECT_ID=demo-local`은 에뮬레이터 전용 가짜 프로젝트 ID다. 실제 GCP 프로젝트와 연결되지 않는다.

분기는 세 갈래다.

| 상황 | 동작 |
| --- | --- |
| 에뮬레이터 컨테이너가 있음, `SKIP_DUMP` 없음 | 저장 후 종료. 저장이 실패하면 종료하지 않고 멈춤 |
| `SKIP_DUMP=1` | 저장 없이 종료 |
| 에뮬레이터 컨테이너가 없음 | 저장할 데이터가 없으니 저장 없이 정상 종료 |

저장이 실패했는데 컨테이너를 지워 버리면, 메모리에 있던 데이터를 되살릴 방법이 없다. 그래서 실패하면 `exit 1`로 멈추고, 저장 없이 끄고 싶을 때만 `SKIP_DUMP=1`을 명시하게 했다. `$(firstword $(MAKEFILE_LIST))`로 자기 자신을 다시 부르기 때문에, 다른 Makefile을 `-f`로 지정해 실행해도 같은 파일 안의 `dump-emulator`가 불린다.

---

## 5. 사용 방법

1. 최신 코드를 받는다.
2. 평소처럼 에뮬레이터를 켠다. 예: `make emulator-dev`
3. 필요한 정의서를 업로드한다.
4. `make emulator-dev`로 실행 중이면 Ctrl+C로 앱을 끈 뒤 `make emulator-down`을 실행한다.
5. 터미널에 "seed 저장 완료"가 표시되는지 확인한다.
6. `git diff backend/seed`로 저장된 내용을 확인한다.
7. 다시 에뮬레이터를 켜서 업로드한 데이터가 남아 있는지 확인한다.

팀원과 같은 데이터를 공유하려면 바뀐 `backend/seed` 파일을 커밋해서 올린다.

---

## 6. 유의사항: seed를 통째로 덮어쓴다

이 기능의 가장 큰 함정은 저장할 때 seed 파일을 현재 데이터로 통째로 덮어쓴다는 점이다. 합치는(merge) 방식이 아니다.

1. **반드시 `make emulator-down`으로 종료**: PC 재부팅, Podman 종료처럼 이 명령을 거치지 않고 꺼지면 저장할 기회가 없다. 메모리에 있던 데이터는 되살릴 수 없다.
2. **seed 덮어쓰기**: `git pull`로 받은 최신 seed 내용이라도 에뮬레이터에 없으면 저장할 때 사라진다.
3. **작업 순서**: 다른 팀원이 seed에 추가한 내용을 받은 뒤에는, 기존 에뮬레이터를 `make emulator-down SKIP_DUMP=1`로 끄고 새로 켜서 최신 seed를 적재한 뒤 작업한다. 그렇지 않으면 이전 데이터로 seed가 되돌아간다.
4. **seed에만 있는 경로**: [이전 글](/posts/rollback-type-reject-cancel/)의 반려·계약 취소 경로는 seed에 들어 있다. 에뮬레이터에 이 경로가 없는 상태에서 끄면 seed에서도 사라진다. 끄기 전에 해당 정의서를 업로드하거나, 화면에 경로가 있는지 확인해야 한다.
5. **커밋 전 확인**: 올리기 전에 `git diff backend/seed`로 의도하지 않은 삭제가 없는지 본다. seed는 팀 전체가 공유하는 파일이라 한 명이 대표로 올리는 것을 권장했다.
6. **저장 실패 시**: 에뮬레이터가 꺼지지 않는다. 원인을 확인한 뒤 다시 시도하고, 저장 없이 끄려면 `SKIP_DUMP=1`을 쓴다. 컨테이너가 이미 멈춘 상태라면 연결 재시도 때문에 약 80초 뒤에 실패한다.
7. **빈 데이터**: 에뮬레이터에 프로세스가 하나도 없으면 seed를 덮어쓰지 않고 건너뛴다. 막 띄운 빈 에뮬레이터를 바로 끄는 경우를 막기 위한 장치다.
8. **저장되지 않는 항목**: 대시보드 버전 이력과 화면 배치(노드 위치, 경로 모양)는 에뮬레이터를 끄면 사라진다.
9. **`npm run seed`는 별개**: 이름이 비슷하지만 seed를 DB에 다시 적재하는 명령이다. 실행하면 현재 DB의 업로드 내용이 모두 seed로 바뀐다.

---

## 7. 실제 에뮬레이터로 시험하기

처음에는 로컬 파일 DB로만 확인했다. 저장 후 원본 seed와 비교해 동일함, 데이터가 비어 있을 때 저장 건너뛰기, 에뮬레이터가 꺼져 있을 때 저장 없이 정상 종료까지였다. 그 뒤 Podman을 켜고 실제 Firestore 에뮬레이터로 같은 흐름을 돌려 봤다. 앱 백엔드는 에뮬레이터에 붙여 따로 띄웠다(`STORE_DRIVER=firestore`).

| 시험 | 결과 |
| --- | --- |
| 에뮬레이터 기동 후 seed 자동 적재 | 정상 |
| 정의서 1건 업로드 후 `make emulator-down` | seed 저장 후 종료, 약 16초 |
| 재기동 후 데이터 | 저장 직전과 동일 (단계 79→83건, Pain Point 37→39건, 버전 이력 0→1건) |
| 재기동 후 Path URL | 서버가 자동으로 다시 생성 |
| 멈춘 컨테이너에서 `make emulator-down` | 약 80초 재시도 후 저장 실패, 컨테이너와 seed는 그대로 |
| 이어서 `SKIP_DUMP=1` | 정상 정리 |

### git diff가 수천 줄로 나왔다

데이터는 잘 살아남았는데, 정의서 한 건을 올렸을 뿐인데 `git diff backend/seed`가 약 5,400줄이었다. 사람이 diff를 보고 "의도하지 않은 삭제가 없는지" 확인하라는 6장 5번 안내가 사실상 불가능한 상태였다.

seed 원본과 저장본을 순서와 키 순서를 무시하고 문서 단위로 비교해 보니, 원인은 두 가지였다.

1. Firestore는 문서를 문서 ID 순으로 돌려준다. 원래 seed 순서와 달라서 모든 문서가 자리를 옮긴 것처럼 보였다.
2. 서버가 켜질 때 모든 프로세스·단계에 `urls`, `divisions`를 채워 넣는다. 저장할 때 이 파생 값까지 seed에 들어갔다. 여기에는 `http://localhost:5173` 같은 환경별 주소도 섞여 있었다.

실제로 바뀐 내용은 업로드한 프로세스뿐이었다. 그래서 3장 코드처럼 파생 필드를 빼고 기존 seed 순서를 유지하도록 고쳤다. 같은 시험을 다시 돌리니 diff는 약 480줄로 줄었고, 남은 변경은 모두 업로드한 프로세스의 것이었다.
