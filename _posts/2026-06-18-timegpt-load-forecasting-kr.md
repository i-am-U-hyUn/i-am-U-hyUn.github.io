---
title: "TimeGPT와 시계열 예측의 진화: 전력 부하 예측에서 파운데이션 모델까지"
date: 2026-06-18 09:00:00 +0900
categories: [데이터, AI/ML]
tags: [TimeGPT, 시계열예측, 딥러닝, Forecasting, 부하예측, Transformer, LLM, Zero-shot, PatchTST, LSTM]
description: "TimeGPT를 중심으로 시계열 예측의 역사와 기술 흐름을 정리하고, Applied Energy 2025 논문의 실험 결과를 바탕으로 파운데이션 모델이 부하 예측에서 언제 유효한지 살펴봅니다."
math: true
---

## 들어가며

전력 수요 예측, 주식 가격 예측, 날씨 예측, 재고 수요 예측 — 이 모두는 **시계열 예측(Time Series Forecasting)**이라는 하나의 문제로 귀결됩니다. 오랫동안 통계 모델이 지배하던 이 영역에, GPT 계열 대형 언어 모델의 아이디어를 시계열에 접목한 **TimeGPT**가 등장하면서 패러다임이 흔들리고 있습니다.

이 글에서는 시계열 예측의 역사적 흐름, TimeGPT의 아키텍처 원리, 그리고 *Applied Energy*(2025)에 게재된 "TimeGPT in load forecasting" 논문(Liao et al.)의 실험 결과를 상세히 정리합니다. 마지막으로 앞으로 공부해볼 만한 고급 주제들도 함께 소개합니다.

---

## 1. 시계열 예측이란?

시계열 데이터는 **시간 순서대로 기록된 데이터의 수열**입니다. 예를 들어 매 시간 측정한 전력 소비량, 일별 주가, 월별 판매량이 여기에 해당합니다.

핵심 목표는 과거 패턴을 학습해 **미래 값을 추정**하는 것이며, 이를 위해 다음 세 가지 구성 요소를 분해·분석합니다.

| 구성 요소 | 설명 | 예시 |
|-----------|------|------|
| **추세(Trend)** | 장기적인 증가/감소 방향 | 연간 전력 소비 증가 |
| **계절성(Seasonality)** | 반복되는 주기적 패턴 | 여름철 냉방 수요 급증 |
| **잔차(Residual)** | 추세·계절성 제거 후 노이즈 | 갑작스러운 이상 소비 |

---

## 2. 통계 기반 접근법의 시대

### ARIMA / SARIMA

**ARIMA(AutoRegressive Integrated Moving Average)**는 수십 년간 시계열 예측의 표준으로 군림했습니다.

$$\text{ARIMA}(p, d, q): \quad \phi(B)(1-B)^d y_t = \theta(B)\epsilon_t$$

- $p$: 자기회귀(AR) 항의 차수
- $d$: 정상성 확보를 위한 차분 횟수
- $q$: 이동평균(MA) 항의 차수

계절성이 강한 데이터에는 `(P, D, Q)s` 파라미터가 추가된 **SARIMA**로 확장됩니다.

**장점**: 높은 해석 가능성, 소규모 데이터에서도 동작  
**단점**: 선형 관계만 포착, 비선형 패턴 학습 불가

### Exponential Smoothing / ETS

과거 값에 지수적으로 감소하는 가중치를 부여하는 Holt-Winters 계열 모델입니다. 계절 분해에 강점이 있으나 복잡한 비선형 패턴 앞에서는 한계가 드러납니다.

### Prophet (Meta, 2017)

**추세 + 계절성 + 공휴일 효과**를 분해해 예측하는 오픈소스 라이브러리입니다. 비전문가도 손쉽게 사용할 수 있는 자동 파라미터 튜닝이 특징입니다.

---

## 3. 머신러닝 기반 접근법

통계 모델의 선형성 한계를 극복하기 위해 ML 모델이 도입되었습니다.

### XGBoost / LightGBM

그래디언트 부스팅 트리 계열 모델로, 시계열 문제에 적용하려면 **lag feature** 및 **rolling statistics** 등을 수동으로 설계해야 합니다.

```python
df['lag_1']    = df['load'].shift(1)
df['lag_24']   = df['load'].shift(24)    # 24시간 전
df['lag_168']  = df['load'].shift(168)   # 1주일 전
df['roll_7d']  = df['load'].rolling(168).mean()
```

**장점**: 비선형 관계 포착, 외생변수 통합 용이  
**단점**: 피처 엔지니어링 의존도 높음

### 전역 vs 지역 모델 전략

| 전략 | 설명 |
|------|------|
| **지역(Local)** | 각 시계열마다 개별 모델 학습 |
| **전역(Global)** | 여러 시계열을 하나의 모델로 학습 — 전이 효과 기대 |

---

## 4. 딥러닝 기반 접근법

### LSTM (Long Short-Term Memory)

RNN의 장기 의존성 문제를 게이트 메커니즘으로 해결한 모델입니다.

$$C_t = f_t \cdot C_{t-1} + i_t \cdot \tilde{C}_t$$

- **Forget gate** ($f_t$): 이전 상태 중 버릴 정보
- **Input gate** ($i_t$): 새로 추가할 정보
- **Output gate** ($o_t$): 출력할 정보

실무에서는 **CNN-LSTM** 하이브리드가 많이 쓰이는데, CNN으로 단기 지역 패턴을 추출하고 LSTM으로 장기 의존성을 학습합니다.

### Transformer for Time Series

2017년 NLP 혁명을 이끈 Transformer가 시계열에도 적용되었습니다.

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$

주요 시계열 Transformer 모델:

| 모델 | 연도 | 핵심 기여 |
|------|------|-----------|
| **Informer** | 2021 | ProbSparse Attention, 장기 예측 효율화 |
| **Autoformer** | 2021 | Auto-Correlation 기반 시계열 분해 |
| **PatchTST** | 2023 | 시계열을 패치(patch) 단위로 처리 |
| **iTransformer** | 2024 | 채널 차원에 Attention 적용 |

### Temporal Fusion Transformer (TFT)

정적 메타데이터, 과거 관측값, 미래에 알 수 있는 외생변수를 통합하는 **다변량 다단계 예측 특화 모델**입니다. Gated Residual Network와 Variable Selection Network로 중요 피처를 자동 선택합니다.

### N-BEATS / N-HiTS

**N-BEATS**: 기본 블록을 반복 쌓아 추세·계절성을 명시적으로 분리 예측하는 순수 신경망 모델.  
**N-HiTS**: 계층적(Hierarchical) 보간으로 다양한 해상도의 예측을 합산합니다.

---

## 5. TimeGPT: 파운데이션 모델의 등장

### 동기

기존 딥러닝 모델은 새 도메인마다 처음부터 재학습이 필요합니다. NLP에서 GPT가 수십억 개의 텍스트로 사전학습 후 Zero-shot으로 다양한 태스크에 적용되듯이, **시계열에서도 같은 방식이 가능할까?** 라는 질문에서 TimeGPT가 출발합니다.

### 아키텍처 (Liao et al., 2025)

TimeGPT는 **Transformer 인코더-디코더 구조**에 다음 네 가지 핵심 블록을 포함합니다.

#### ① 위치 인코딩 (Positional Encoding)

$$PE_{(pos, 2i)} = \sin\left(\frac{pos}{10000^{2i/d_{model}}}\right), \quad PE_{(pos, 2i+1)} = \cos\left(\frac{pos}{10000^{2i/d_{model}}}\right)$$

시퀀스 내 각 시점의 위치 정보를 사인·코사인 함수로 인코딩합니다.

#### ② 멀티헤드 어텐션 (Multi-Head Attention)

$$\text{MultiHead}(X) = \text{Concat}(head_1, \ldots, head_h)W^O$$
$$head_i = \text{Attention}(XW_i^Q,\, XW_i^K,\, XW_i^V)$$

$h$개의 어텐션 헤드를 병렬 연산해 서로 다른 시간 의존성을 동시에 학습합니다.

#### ③ CNN (Feed-Forward 대체)

각 위치에 합성곱 + 풀링 레이어를 적용해 잠재 피처를 추출합니다.

$$X_{conv,out} = \sigma(W_{conv} * X_{conv,in} + B_{conv})$$

#### ④ 잔차 연결 + 레이어 정규화

$$X_{out} = LN(X_{in} + F(X_{in}))$$

기울기 소실 방지와 학습 안정성을 확보합니다.

### 연속 → 이산 변환

LLM은 이산(discrete) 토큰을 처리하는 반면 시계열은 연속(continuous) 값입니다. TimeGPT는 다음 두 단계로 변환합니다.

1. **정규화(Min-Max)**:  
   $$\hat{X} = \frac{X - X_{min}}{X_{max} - X_{min}}$$

2. **등폭 구간화(Equal-Width Binning)**:  
   $$\text{bin}(x) = \left\lfloor \frac{\hat{X}}{\Delta d} \right\rfloor, \quad \Delta d = \frac{X_{max} - X_{min}}{m}$$

예측 후 역변환으로 연속 값을 복원합니다.

### 사전학습

- **데이터**: 금융, 교통, 금융, 웹 트래픽, 기상, 에너지, 의료 등 다양한 도메인의 **1,000억(100B) 데이터 포인트**
- **인프라**: NVIDIA A10G GPU 클러스터
- **옵티마이저**: Adam (소규모 학습률 + 대규모 배치 크기)
- **프레임워크**: PyTorch

### Zero-shot vs Fine-tuning

| 방식 | 설명 | 적합 상황 |
|------|------|-----------|
| **Zero-shot** | 추가 학습 없이 즉시 예측 | 빠른 프로토타이핑 |
| **Fine-tuning** | 소량 도메인 데이터로 가중치 조정 | 데이터 희소 시나리오 |

파인튜닝 4단계:
1. 사전학습된 TimeGPT 가중치를 출발점으로 사용
2. 소량의 부하 데이터로 **낮은 학습률**로 전체 레이어 업데이트
3. MSE 손실 최소화, Adam 옵티마이저
4. 검증 세트 Early Stopping으로 과적합 방지

---

## 6. 실험: 전력 부하 예측에서의 TimeGPT (Liao et al., 2025)

### 왜 부하 예측인가?

전력망 운영에서 수요 예측의 정확도는 직접적인 경제적 가치와 연결됩니다.

- 과소 예측 → 전력 부족, 블랙아웃 위험
- 과다 예측 → 불필요한 발전 비용, 탄소 배출 증가
- 재생에너지(태양광, 풍력)의 변동성 증가로 정밀 예측 필요성 급증

머신러닝 모델은 데이터가 충분할 때 강력하지만, **데이터가 희소한 환경**에서는 성능이 급격히 저하됩니다. 이 논문은 바로 이 취약점을 TimeGPT가 어떻게 극복하는지 검증합니다.

### 실험 설계

**데이터셋**: 텍사스 오스틴대 캠퍼스 빌딩 16개의 시간 단위 부하 데이터 (2011년 7월–10월). 공개 데이터셋 사용 시 TimeGPT 학습 데이터와 겹칠 수 있어 **비공개 사적 데이터셋**을 사용해 공정성 확보.

**훈련 데이터 분할 (Case 1~5)**:

| Case | 훈련 데이터 | 테스트 데이터 |
|------|------------|--------------|
| Case 1 | 3일 | 이후 전체 |
| Case 2 | 5일 | 이후 전체 |
| Case 3 | 7일 | 이후 전체 |
| Case 4 | 15일 | 이후 전체 |
| Case 5 | 30일 | 이후 전체 |

**비교 모델**: PM, LR, RT, XGBoost, MLP, LSTM, **PatchTST**, **TimeLLM**  
(※ TimeLLM은 텍스트 데이터로 학습된 LLM 기반 모델)

**평가 지표**:

$$\text{MAE} = \frac{1}{n}\sum|y_i - \hat{y}_i|, \quad \text{RMSE} = \sqrt{\frac{1}{n}\sum(y_i - \hat{y}_i)^2}, \quad \text{MAPE} = \frac{100\%}{n}\sum\left|\frac{y_i - \hat{y}_i}{y_i}\right|$$

### 핵심 결과 ①: Fine-tuning의 필수성

> **Zero-shot TimeGPT는 부하 예측에 직접 적용 시 성능이 낮습니다.**

사전학습 데이터가 부하 데이터의 분포를 충분히 대표하지 못하기 때문입니다. **Fine-tuning 후에는 모든 케이스에서 MAE, RMSE, MAPE가 현저하게 감소**합니다.

→ 부하 예측에 TimeGPT를 쓰려면 소량 데이터를 이용한 파인튜닝이 필수입니다.

### 핵심 결과 ②: 데이터 희소 시나리오에서의 강점

**Case 1 (훈련 3일), 예측 1시간 후 기준 RMSE 비교:**

| 모델 | RMSE |
|------|------|
| **TimeGPT (fine-tuned)** | **0.033** |
| MLP | 0.051 (-35%) |
| LSTM | 0.043 (-23%) |
| LR | 0.037 (-11%) |
| XGBoost | 0.052 (-36%) |
| RT | 0.063 (-48%) |
| PM | 0.039 (-15%) |
| PatchTST | 0.091 (-64%) |
| TimeLLM | 0.137 (-76%) |

TimeGPT는 훈련 데이터가 3~7일 수준의 **극도로 희소한 상황**에서 특히 단기 예측(1~6시간 후)에서 모든 벤치마크를 압도합니다.

**이유**: 사전학습에서 얻은 풍부한 시간적 사전 지식(temporal prior)이 데이터 부족을 보완합니다.

### 핵심 결과 ③: 데이터가 풍부하면 ML이 우세

훈련 데이터가 15~30일(Case 4~5)로 늘어나면 **LSTM, LR, XGBoost 등 전통적 ML 모델이 TimeGPT를 역전**합니다.

| 모델 | Case 5, 1h-ahead RMSE |
|------|----------------------|
| **LSTM** | **0.016** |
| LR | 0.012 |
| XGBoost | 0.020 |
| PatchTST | 0.017 |
| TimeGPT | 0.028 |

**이유**: 도메인 특화 학습은 더 충분한 데이터가 있을 때 TimeGPT의 사전학습 가중치 편향을 능가합니다.

### 핵심 결과 ④: 장기 예측에서의 한계

예측 시간이 12h~24h로 길어질수록 TimeGPT의 성능 우위가 줄어들거나 역전됩니다. 시각화 분석에 따르면 **TimeGPT의 예측 값이 평탄화(smoothing)되어 부하의 피크와 골짜기를 잡지 못하는** 현상이 관찰됩니다.

### 핵심 결과 ⑤: 5개 데이터셋 종합 요약

| 데이터셋 | 1h 우위 | 4h 우위 | 6h 우위 | 12h 우위 |
|---------|---------|---------|---------|---------|
| 텍사스 오스틴대 | ✅ | ✅ | ✅ | ✅ |
| Nongfu Spring | ✅ | ✅ | ✅ | ✅ |
| Midea Group | ✅ | ❌ | ❌ | ❌ |
| Joho City | ✅ | ✅ | ❌ | ❌ |
| Arizona State | ❌ | ❌ | ❌ | ❌ |

Arizona State 데이터셋에서 TimeGPT가 우위를 보이지 못한 이유: **소스 도메인(사전학습 데이터)과 타겟 도메인(부하 데이터) 간의 분포 차이**가 큽니다. 이는 마치 동물 이미지로 학습한 모델을 의료 영상 진단에 쓰는 것과 유사합니다.

### 실무 적용 전략

논문이 제안하는 의사결정 방법:

```
1. 전체 희소 데이터를 훈련 세트 + 검증 세트로 분할
2. 훈련 세트로 TimeGPT fine-tuning
3. 검증 세트로 TimeGPT와 ML 모델 성능 비교
4. 검증 손실이 TimeGPT가 최소 → TimeGPT 선택
   그렇지 않으면 → 최고 성능 ML 모델 선택
```

---

## 7. 다른 시계열 파운데이션 모델들

TimeGPT 이후 다양한 경쟁 모델들이 등장했습니다.

| 모델 | 개발사 | 특징 |
|------|--------|------|
| **Chronos** | Amazon | T5 기반, 시계열을 양자화해 언어 모델처럼 학습 |
| **Moirai** | Salesforce | 다중 패치 크기 Attention, 완전 오픈소스 |
| **Lag-Llama** | Meta | Llama 기반, 확률적 예측 특화 |
| **TimesFM** | Google DeepMind | 200B 토큰 사전학습, 단변량 예측 강세 |
| **MOMENT** | CMU | Masked autoencoder 사전학습 방식 |
| **TimeLLM** | — | 텍스트 데이터로 학습된 LLM 재활용 (부하 예측에서 성능 저조) |

---

## 8. 앞으로 공부할 만한 고급 주제

### 확률적 예측 (Probabilistic Forecasting)

단일 점 예측이 아닌 **예측 분포**를 출력합니다.

- **Quantile Regression**: 분위수별 예측 (10%, 50%, 90%)
- **Normalizing Flow**: 복잡한 분포를 생성 모델로 학습
- **Conformal Prediction**: 분포 가정 없이 통계적 커버리지 보장

### 계층적 예측 (Hierarchical Forecasting)

국가 → 지역 → 도시 → 개별 설비처럼 트리 구조의 합산 일관성을 보장하며 예측합니다.

- **Bottom-Up**: 최소 단위 합산
- **Top-Down**: 총량을 비율로 분배
- **MinT**: 최적 선형 조정으로 일관성 확보

### 그래프 신경망 (GNN) 기반 예측

여러 시계열 간의 **공간적 상관관계**를 그래프로 모델링합니다.

- **DCRNN**: 도로 네트워크 그래프를 활용한 교통 속도 예측
- **MTGNN**: 다변량 시계열 간 그래프 자동 학습
- **Crossformer**: Transformer + 채널 간 Cross-Dimension Attention

### 도메인 적응 (Domain Adaptation)

TimeGPT의 주요 한계를 해결하기 위한 연구 방향입니다. 소스 도메인(대규모 사전학습 데이터)과 타겟 도메인(특정 부하 데이터) 간의 분포 차이를 줄이는 기법들:

- **Adversarial Training**: 도메인 불변 표현 학습
- **Hybrid Model**: TimeGPT + 도메인 특화 모델 결합
- **Data Augmentation**: 파인튜닝 데이터 증강으로 분포 차이 완화

### 온라인 학습 & 개념 드리프트 (Concept Drift)

실시간 스트리밍 환경에서 데이터 분포 변화에 적응합니다.

- **ADWIN, Page-Hinkley**: 통계적 변화점 탐지
- **Continual Learning**: 과거 지식을 잊지 않으며 새 패턴 학습

### 에너지 도메인 특화 파운데이션 모델

논문이 제안하는 미래 방향: **에너지 대규모 시계열만으로 사전학습한 특화 LTSM**은 일반 파운데이션 모델의 분포 불일치 문제를 줄이면서 few-shot 능력도 유지할 수 있습니다.

---

## 9. 실습 로드맵

```
1단계: 기초 다지기
  ├─ statsmodels로 ARIMA/SARIMA 구현
  ├─ Prophet 설치 및 공공 데이터 예측
  └─ ACF/PACF 해석, 시계열 분해

2단계: ML 확장
  ├─ XGBoost + lag feature 엔지니어링
  ├─ LightGBM 다변량 예측
  └─ TimeSeriesSplit 교차 검증

3단계: 딥러닝
  ├─ PyTorch로 LSTM 직접 구현
  ├─ Darts 라이브러리로 TFT, N-BEATS 실험
  └─ 공개 벤치마크: ETTh1, Weather, Traffic

4단계: 파운데이션 모델
  ├─ Nixtla API로 TimeGPT zero-shot → fine-tuning 비교
  ├─ Chronos (HuggingFace) 로컬 실행
  ├─ Moirai fine-tuning 실험
  └─ GluonTS 벤치마킹 프레임워크 활용

5단계: 연구 심화
  ├─ 확률적 예측: Quantile Loss, Conformal Prediction
  ├─ 계층적 예측: HierarchicalForecast 라이브러리
  ├─ 그래프 기반: MTGNN 구현
  └─ 논문 구현: PatchTST, iTransformer
```

---

## 마치며

TimeGPT는 **"데이터가 희소할 때 파운데이션 모델이 가장 빛난다"** 는 교훈을 실험적으로 확인해준 중요한 연구입니다.

주요 takeaway를 정리하면:

1. **Zero-shot만으로는 부족** — 부하 예측에는 반드시 fine-tuning이 필요합니다.
2. **희소 데이터 환경에서 강력** — 훈련 데이터가 3~7일 수준일 때 ML/딥러닝 모델을 압도합니다.
3. **데이터가 충분하면 전통 ML이 우세** — 30일 이상의 데이터가 있다면 LSTM, XGBoost가 더 나을 수 있습니다.
4. **도메인 분포 차이가 핵심 변수** — 소스/타겟 분포가 크게 다르면 TimeGPT의 일반화 능력이 제한됩니다.
5. **실무 전략**: 검증 세트를 통해 TimeGPT vs ML 모델을 비교한 후 선택하세요.

통계 → ML → 딥러닝 → 파운데이션 모델로 이어지는 시계열 예측의 흐름을 이해하고, 각 방법의 강점과 한계를 알고 상황에 맞게 선택하는 것이 실무 데이터 과학자의 핵심 역량입니다.

---

## 참고 자료

- [TimeGPT 논문 리뷰 (티스토리)](https://qorskawls12.tistory.com/m/81)
- Liao, W. et al. (2025). *TimeGPT in load forecasting: A large time series model perspective*. **Applied Energy**, 124973. [DOI](https://doi.org/10.1016/j.apenergy.2024.124973)
- Garza, A. et al. (2024). *TimeGPT-1*. arXiv:2310.03589
- [Nixtla 공식 문서](https://docs.nixtla.io/)
- [Darts 라이브러리](https://unit8co.github.io/darts/)
- [GluonTS 벤치마킹](https://ts.gluon.ai/)
- [Chronos (HuggingFace)](https://huggingface.co/amazon/chronos-t5-large)
