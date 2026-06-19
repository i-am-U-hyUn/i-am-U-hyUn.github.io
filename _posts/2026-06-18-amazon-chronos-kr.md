---
title: "Amazon Chronos 완전 분석: 시계열의 언어를 배우는 파운데이션 모델"
date: 2026-06-18 12:00:00 +0900
categories: [데이터, AI/ML]
tags: [Chronos, Amazon, 시계열예측, T5, Transformer, ZeroShot, 파운데이션모델, 확률적예측, KernelSynth, ChronosBolt]
description: "Amazon이 공개한 오픈소스 시계열 파운데이션 모델 Chronos의 아키텍처, 토큰화 방식, 합성 데이터 전략, 벤치마크 결과를 깊게 파헤칩니다."
math: true
---

## 들어가며

2024년 3월, Amazon Science 팀이 논문 한 편을 arXiv에 공개했습니다. 제목은 *"Chronos: Learning the Language of Time Series"*. 제목에서 핵심이 드러납니다 — 시계열을 **언어(language)**로 다룬다는 발상입니다.

TimeGPT가 API 기반의 클로즈드 모델로 출발한 것과 달리, Chronos는 **전체 가중치를 HuggingFace에 공개**했습니다. 8M 파라미터의 Tiny 버전부터 710M의 Large 버전까지 — 노트북에서도, 대형 GPU 서버에서도 자유롭게 실행할 수 있습니다.

이 글은 Chronos가 왜 흥미로운지, 어떻게 작동하는지, 그리고 실무에서 어떻게 활용할 수 있는지를 아키텍처 수준에서 분해합니다.

---

## 1. 핵심 아이디어: 시계열을 언어처럼 다루기

### 시계열과 언어의 유사성

자연어와 시계열은 표면적으로 전혀 달라 보입니다. 하지만 구조적으로 보면 공통점이 있습니다.

| 특성 | 자연어 | 시계열 |
|------|--------|--------|
| 데이터 형태 | 이산 토큰의 시퀀스 | 연속 값의 시퀀스 |
| 순서 의존성 | 앞뒤 문맥이 의미를 결정 | 앞뒤 값이 다음 값을 결정 |
| 반복 패턴 | 문법, 관용구 | 계절성, 추세 |
| 장기 의존성 | 문단 간 주제 연결 | 연간 계절성 반복 |

Chronos의 핵심 통찰: **시계열 값을 토큰으로 변환하면, 수십 년간 NLP 분야에서 축적된 Transformer 기술을 그대로 가져다 쓸 수 있다.**

기존 시계열 전용 딥러닝 모델들은 아키텍처 자체를 새로 설계해야 했습니다. Chronos는 이미 검증된 **T5(Text-to-Text Transfer Transformer)** 아키텍처를 재사용합니다.

---

## 2. 아키텍처: T5 기반 인코더-디코더

### T5란?

T5는 Google이 2020년 공개한 텍스트-투-텍스트 프레임워크입니다. 모든 NLP 태스크(번역, 요약, 질의응답 등)를 "입력 텍스트 → 출력 텍스트" 형식으로 통일해 단일 모델로 처리합니다.

Chronos는 T5의 **인코더-디코더 구조**를 그대로 채택합니다.

```
역사 시계열 (컨텍스트 윈도우)
        ↓ 토큰화
   [token_1, token_2, ..., token_n]
        ↓
  T5 인코더 (Self-Attention + FFN)
        ↓ 컨텍스트 벡터
  T5 디코더 (Cross-Attention)
        ↓ 자기회귀(autoregressive) 생성
  [forecast_token_1, forecast_token_2, ..., forecast_token_h]
        ↓ 역토큰화
   미래 예측값 분포
```

### 어휘(Vocabulary) 크기 조정

표준 T5 모델은 32,128개의 어휘 토큰을 사용합니다. 시계열에는 훨씬 적은 토큰으로 충분하므로, Chronos는 **4,096개 토큰**으로 어휘를 축소합니다.

이 변경만으로도 파라미터 수가 크게 줄어 효율적인 시계열 특화 모델이 됩니다.

### 모델 패밀리

| 모델 | 파라미터 | 적합 환경 |
|------|---------|-----------|
| **Tiny** | 8M | CPU, 엣지 디바이스 |
| **Mini** | 20M | 노트북 |
| **Small** | 46M | 일반 GPU |
| **Base** | 200M | 프로덕션 서버 |
| **Large** | 710M | 고성능 GPU 서버 |

---

## 3. 시계열 토큰화: 연속값 → 이산 토큰

Chronos의 가장 독창적인 부분은 **연속 시계열을 이산 토큰으로 변환**하는 파이프라인입니다.

### 3단계 토큰화 프로세스

#### 1단계: 스케일링 (Scaling)

시계열의 절댓값 평균($\bar{|x|}$)으로 나눠 스케일을 정규화합니다.

$$\tilde{x}_t = \frac{x_t}{\bar{|x|}}, \quad \bar{|x|} = \frac{1}{T}\sum_{t=1}^T |x_t|$$

이 방식은 Min-Max 정규화와 달리 **이상치에 덜 민감**하며, 다양한 스케일의 시계열을 동일한 토큰 공간으로 매핑할 수 있게 합니다.

#### 2단계: 양자화 (Quantization)

정규화된 값을 **등간격 빈(bin)**으로 나눠 이산화합니다.

$$\text{token}(x) = \left\lfloor \frac{\tilde{x} - \tilde{x}_{min}}{\Delta} \right\rfloor, \quad \Delta = \frac{\tilde{x}_{max} - \tilde{x}_{min}}{B}$$

- $B$: 빈 개수 (Chronos에서 4,096)
- 각 빈은 하나의 토큰 ID에 대응

#### 3단계: 특수 토큰 추가

- `PAD` 토큰: 결측값 위치 표시
- `EOS` 토큰: 시퀀스 끝 표시

시계열 데이터에서 결측값 처리가 자연스럽게 NLP의 패딩 개념으로 흡수됩니다.

### 역토큰화 (Detokenization)

예측 시 모델은 각 미래 시점에서 **토큰 분포(categorical distribution)**를 출력합니다. 이를 역매핑해 연속 값의 확률 분포를 복원합니다.

$$p(\hat{x}_{T+h} | x_{1:T}) = \text{softmax}(\text{logits}_{T+h})$$

이렇게 하면 단일 점 예측이 아닌 **전체 예측 분포**를 얻을 수 있습니다 — Chronos가 태생적으로 확률적 예측 모델인 이유입니다.

---

## 4. 사전학습 데이터 전략

### 공개 데이터셋 수집

Chronos는 다음과 같은 공개 시계열 데이터셋을 학습에 활용합니다.

- M-Competitions (M1, M3, M4, M5) — 경제, 금융, 소매 수요
- ETT (Electricity Transformer Temperature) — 전력 변압기 온도
- Traffic, Weather, Exchange-Rate 데이터셋
- Wikipedia 웹 트래픽, 금융 시계열 등

하지만 공개 데이터셋만으로는 다양한 시계열 패턴을 충분히 커버하기 어렵습니다. 여기서 Chronos의 핵심 혁신인 **합성 데이터 전략**이 등장합니다.

### TSMix: 시계열 혼합 증강

실제 데이터셋에서 무작위로 샘플링한 시계열을 혼합해 새로운 합성 시계열을 생성합니다. 기존 패턴을 보존하면서 데이터 다양성을 높입니다.

### KernelSynth: 가우시안 프로세스 기반 합성 데이터

Chronos의 핵심 데이터 전략입니다. **가우시안 프로세스(Gaussian Process, GP)**의 커널 함수를 조합해 무한히 다양한 합성 시계열을 생성합니다.

$$f \sim \mathcal{GP}(0, k(t, t'))$$

다양한 커널을 무작위로 조합합니다:

| 커널 | 생성 패턴 | 수식 |
|------|-----------|------|
| **RBF (Squared Exponential)** | 부드러운 추세 | $k(t,t') = \exp\!\left(-\frac{(t-t')^2}{2l^2}\right)$ |
| **Periodic** | 계절성 | $k(t,t') = \exp\!\left(-\frac{2\sin^2(\pi\|t-t'\|/p)}{l^2}\right)$ |
| **Linear** | 선형 추세 | $k(t,t') = \sigma_b^2 + \sigma_v^2(t-c)(t'-c)$ |
| **White Noise** | 무작위 노이즈 | $k(t,t') = \sigma^2 \delta(t,t')$ |

커널을 더하거나 곱해 복잡한 패턴 조합을 생성합니다.

$$k_{combined} = k_{RBF} \times k_{Periodic} + k_{Linear} + k_{noise}$$

이 접근법의 장점:
- **무한한 다양성**: 커널 조합만으로 사실상 무한한 시계열 유형 생성 가능
- **분포 외 일반화(OOD)**: 실제 데이터에서 보지 못한 패턴에도 대응 가능
- **데이터 프라이버시**: 실제 데이터 없이도 학습 가능

---

## 5. 학습 목적 함수

Chronos는 **다음 토큰 예측(next-token prediction)**으로 훈련됩니다 — 정확히 LLM의 언어 모델링과 동일합니다.

$$\mathcal{L} = -\sum_{h=1}^{H} \log p(\text{token}_{T+h} \mid \text{token}_{1:T+h-1})$$

이 교차엔트로피 손실은:
1. 각 미래 시점에서 올바른 토큰을 예측할 확률을 최대화
2. 자기회귀(autoregressive) 방식으로 예측 수평선까지 반복

기존 시계열 딥러닝 모델들이 MSE/MAE 같은 회귀 손실을 쓰는 것과 달리, 분류 손실(cross-entropy)을 쓰기 때문에 **자연스럽게 분포 예측**이 가능합니다.

---

## 6. 확률적 예측 출력

### 예측 샘플 생성

학습 후 Chronos는 미래 시퀀스를 **샘플링**으로 생성합니다.

```python
import torch
from chronos import ChronosPipeline

pipeline = ChronosPipeline.from_pretrained(
    "amazon/chronos-t5-large",
    device_map="cuda",
    torch_dtype=torch.bfloat16,
)

# 컨텍스트 시계열
context = torch.tensor(load_data)  # shape: (T,)

# num_samples개의 미래 궤적 생성
forecast = pipeline.predict(
    context,
    prediction_length=24,   # 예측 시간 수
    num_samples=100,         # 샘플 수 → 분포 추정
    temperature=1.0,         # 샘플링 온도
    top_k=50,                # Top-k 샘플링
    top_p=1.0,               # Nucleus 샘플링
)
# forecast.shape: (num_series, num_samples, prediction_length)
```

### 분위수 예측 추출

100개의 샘플로부터 원하는 분위수를 계산합니다.

```python
import numpy as np

low   = np.quantile(forecast[0].numpy(), 0.1, axis=0)  # 10th percentile
median = np.quantile(forecast[0].numpy(), 0.5, axis=0)  # 중앙값
high  = np.quantile(forecast[0].numpy(), 0.9, axis=0)  # 90th percentile
```

이로써 단일 점 예측이 아닌 **예측 불확실성까지 포함한 구간 예측**이 가능합니다.

---

## 7. Chronos-Bolt: 더 빠르고 더 정확한 후속 모델

2024년 말 Amazon은 **Chronos-Bolt**를 공개했습니다.

### 개선 사항

| 항목 | Chronos | Chronos-Bolt |
|------|---------|--------------|
| 예측 속도 | 기준 | **250배 빠름** |
| 예측 오차 | 기준 | **5% 낮음** |
| 추론 방식 | 자기회귀(token by token) | 패치 기반 병렬 디코딩 |

### 핵심 변경: 패치 기반 디코딩

기존 Chronos는 미래 토큰을 **하나씩 순차적으로** 생성합니다 (자기회귀). Chronos-Bolt는 **패치(patch) 단위**로 묶어 한 번에 예측합니다.

```
Chronos (자기회귀):
token_1 → token_2 → token_3 → ... → token_H   (H번 디코딩)

Chronos-Bolt (패치 기반):
[patch_1] → [patch_2] → [patch_3]              (H/patch_size번 디코딩)
```

PatchTST에서 영감을 받은 이 방식으로 추론 속도가 극적으로 향상됩니다.

---

## 8. 벤치마크 성능

Chronos 논문은 **42개 데이터셋**에서 평가를 진행했습니다.

### 비교 대상

| 범주 | 모델 |
|------|------|
| 통계 | ETS, ARIMA, Theta |
| ML | LightGBM with lag features |
| 딥러닝 | N-HiTS, PatchTST, TimesNet |
| 파운데이션 | TimeGPT (API), Lag-Llama |

### 주요 결과

**In-domain (학습 데이터 포함 데이터셋)**:
- Chronos-Large가 통계 방법과 특화 딥러닝 모델을 **현저히 능가**
- 특히 복잡한 계절성과 장기 추세를 가진 데이터셋에서 강점

**Zero-shot (미학습 데이터셋)**:
- Chronos의 zero-shot 성능이 해당 데이터셋에서 **직접 학습한 전통 모델과 동등하거나 우수**
- TimeLLM 등 텍스트 기반 LLM 재활용 모델보다 현저히 우수

### WQL (Weighted Quantile Loss)

확률적 예측 모델의 표준 평가 지표:

$$\text{WQL} = \frac{2}{H \cdot |\mathcal{Q}|} \sum_{h=1}^{H} \sum_{q \in \mathcal{Q}} \rho_q(\hat{F}_q^{(h)} - x_{T+h})$$

$$\rho_q(u) = \begin{cases} q \cdot u & u \geq 0 \\ (q-1) \cdot u & u < 0 \end{cases}$$

---

## 9. TimeGPT vs Chronos: 심층 비교

| 항목 | TimeGPT | Chronos |
|------|---------|---------|
| **공개 여부** | API 전용 (클로즈드) | 완전 오픈소스 (HuggingFace) |
| **기반 아키텍처** | Transformer (인코더-디코더 + CNN) | T5 (NLP 기반) |
| **사전학습 데이터** | 100B 데이터 포인트 (출처 미공개) | 공개 데이터셋 + KernelSynth 합성 데이터 |
| **토큰화** | Min-max + 등폭 구간화 | 절댓값 평균 스케일링 + 등폭 구간화 |
| **출력 형태** | 점 예측 + 예측 구간 (등각 예측) | 완전한 샘플 분포 (태생적 확률적 출력) |
| **Zero-shot** | 부하 예측에서 파인튜닝 전 성능 저조 | 42개 데이터셋 zero-shot 강건성 확인 |
| **Fine-tuning** | API로 지원 | 로컬에서 직접 가능 |
| **비용** | API 사용료 | 무료 (GPU 비용만 발생) |
| **재현성** | 낮음 (데이터 미공개) | 높음 (KernelSynth 재현 가능) |
| **속도 (Bolt)** | — | 250배 빠른 Bolt 버전 |

**선택 가이드**:
- 빠른 프로토타이핑, 클라우드 환경 → **TimeGPT**
- 오픈소스, 로컬 배포, 연구 목적 → **Chronos**
- 확률적 예측이 필수 → **Chronos** (태생적 지원)
- 비용 최소화 → **Chronos**

---

## 10. 실전 코드 예제

### 설치

```bash
pip install chronos-forecasting
```

### 기본 예측

```python
import torch
import pandas as pd
import numpy as np
from chronos import ChronosPipeline

# 모델 로드 (처음 실행 시 자동 다운로드)
pipeline = ChronosPipeline.from_pretrained(
    "amazon/chronos-t5-small",   # tiny/mini/small/base/large
    device_map="cpu",             # GPU: "cuda"
    torch_dtype=torch.float32,
)

# 임의 시계열 데이터 (실제 데이터로 교체)
context = torch.randn(100)       # 100개의 과거 관측값

# 예측
forecast = pipeline.predict(
    context,
    prediction_length=12,
    num_samples=100,
)

# 분위수 추출
low    = np.quantile(forecast[0].numpy(), 0.1, axis=0)
median = np.quantile(forecast[0].numpy(), 0.5, axis=0)
high   = np.quantile(forecast[0].numpy(), 0.9, axis=0)

print(f"중앙값 예측: {median}")
print(f"90% 신뢰 구간: [{low}, {high}]")
```

### GluonTS와 통합 (다변량/배치 예측)

```python
from gluonts.dataset.pandas import PandasDataset
from gluonts.dataset.split import split

# GluonTS 데이터셋 생성
df = pd.read_csv("load_data.csv", index_col=0, parse_dates=True)
dataset = PandasDataset(df, target="load")

# 학습/테스트 분할
_, test_template = split(dataset, offset=-24)
test_data = test_template.generate_instances(prediction_length=24)

# 배치 예측
from gluonts.evaluation import make_evaluation_predictions

forecast_it, ts_it = make_evaluation_predictions(
    dataset=test_data.input,
    predictor=pipeline,
)
```

### Fine-tuning

```python
from chronos import ChronosConfig, ChronosTokenizer
from transformers import T5Config, Trainer, TrainingArguments

# 사전학습 모델 로드 후 파인튜닝
config = ChronosConfig(
    prediction_length=24,
    context_length=512,
    n_tokens=4096,
    n_special_tokens=2,
    pad_token_id=0,
    eos_token_id=1,
)

training_args = TrainingArguments(
    output_dir="./chronos-finetuned",
    num_train_epochs=10,
    per_device_train_batch_size=32,
    learning_rate=1e-4,          # 파인튜닝은 낮은 LR 사용
    warmup_steps=100,
    save_steps=500,
)
```

---

## 11. Chronos의 한계점

1. **다변량 예측 미지원**: 단변량(univariate) 시계열만 처리. 여러 시계열 간의 공간적 상관관계를 학습하지 못합니다.

2. **외생변수 미지원**: 날씨, 요일, 공휴일 같은 외생변수(exogenous variables)를 입력으로 받지 않습니다.

3. **장기 예측 한계**: 자기회귀 방식의 특성상 긴 예측 수평선에서 오류가 누적됩니다 (Chronos-Bolt의 패치 방식이 이를 일부 완화).

4. **계산 비용**: Large 모델(710M)은 실시간 예측에 다소 무거울 수 있습니다.

5. **합성 데이터 의존**: KernelSynth 기반 합성 데이터가 모든 실제 데이터 분포를 커버하지는 못합니다.

---

## 12. 심화 학습 로드맵

### Chronos를 제대로 이해하기 위한 전제 지식

```
기초 이론
  ├─ 가우시안 프로세스 (GP) — 커널 함수, 사후 예측
  ├─ 변분 추론 (Variational Inference)
  └─ 확률적 예측: Quantile Loss, WQL, CRPS

NLP → 시계열 전이
  ├─ T5 논문 (Raffel et al., 2020) 읽기
  ├─ 토큰화 전략 비교 (BPE vs 등폭 구간화)
  └─ 교차엔트로피 손실의 확률적 의미

Chronos 심화
  ├─ KernelSynth 구현 및 커널 조합 실험
  ├─ 다양한 모델 크기 성능 비교 (Tiny vs Large)
  └─ Chronos-Bolt 패치 디코딩 메커니즘

연구 확장
  ├─ UniTS: 다변량 지원 파운데이션 모델
  ├─ Moirai: Salesforce의 오픈소스 대안
  ├─ MOMENT: Masked Autoencoder 기반 사전학습
  └─ 에너지 도메인 특화 파인튜닝 실험
```

---

## 마치며

Chronos는 두 가지 의미에서 중요합니다.

첫째, **기술적 기여**: 시계열을 언어로 다루는 아이디어가 실제로 작동함을 42개 벤치마크로 검증했습니다. LLM 커뮤니티의 거대한 기술 자산(T5, 토크나이저, 분산 학습 인프라)을 시계열에 그대로 가져올 수 있음을 보였습니다.

둘째, **생태계 기여**: 전체 가중치를 오픈소스로 공개함으로써 연구자와 실무자 누구나 무료로 실험하고, 파인튜닝하고, 개선할 수 있습니다. TimeGPT의 클로즈드 전략과 대비됩니다.

물론 다변량 미지원, 외생변수 미지원 같은 한계는 여전합니다. 하지만 Chronos-Bolt가 보여주듯이 이 모델 패밀리는 계속 진화하고 있습니다. 시계열 파운데이션 모델의 오픈소스 생태계를 주도하는 핵심 프로젝트로서, Chronos는 앞으로도 주목할 만한 연구입니다.

---

## 참고 자료

- Ansari, A.F. et al. (2024). *Chronos: Learning the Language of Time Series*. arXiv:2403.07815
- [HuggingFace — amazon/chronos-t5-large](https://huggingface.co/amazon/chronos-t5-large)
- [Amazon Science Blog — Chronos](https://www.amazon.science/blog/adapting-language-model-architectures-for-time-series-forecasting)
- [GitHub — amazon-science/chronos-forecasting](https://github.com/amazon-science/chronos-forecasting)
- Raffel, C. et al. (2020). *Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer (T5)*. JMLR.
- Liao, W. et al. (2025). *TimeGPT in load forecasting*. Applied Energy, 124973.
