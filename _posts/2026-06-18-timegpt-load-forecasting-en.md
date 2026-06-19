---
title: "TimeGPT and the Evolution of Time Series Forecasting: From Load Prediction to Foundation Models"
date: 2026-06-18 09:00:00 +0900
categories: [Data, AI/ML]
tags: [TimeGPT, TimeSeries, DeepLearning, Forecasting, LoadForecasting, Transformer, LLM, ZeroShot, PatchTST, LSTM]
description: "A comprehensive guide to time series forecasting — from classical statistics to Transformer-based foundation models — grounded in the Applied Energy 2025 paper on TimeGPT for load forecasting."
math: true
---

## Introduction

Electricity demand prediction, stock price forecasting, weather prediction, inventory management — all of these reduce to a single class of problems: **Time Series Forecasting**. For decades, statistical models dominated this space. Then TimeGPT arrived, bringing the paradigm of massive pre-trained foundation models — the same idea that powered ChatGPT — directly into the time series world.

This post traces the full arc of time series forecasting: from ARIMA to LSTM to Transformers to foundation models. We ground the discussion in the experimental findings from *"TimeGPT in load forecasting: A large time series model perspective"* (Liao et al., *Applied Energy*, 2025), which is the most rigorous empirical evaluation of TimeGPT on real-world power system data to date.

---

## 1. What Is Time Series Forecasting?

A time series is a **sequence of observations indexed in time order** — hourly electricity consumption, daily stock prices, monthly sales figures. The goal of forecasting is to estimate future values from past patterns by decomposing the signal into three components:

| Component | Description | Example |
|-----------|-------------|---------|
| **Trend** | Long-term direction | Annual increase in power demand |
| **Seasonality** | Repeating periodic patterns | Summer cooling spikes |
| **Residual** | Remainder after removing trend & seasonality | Sudden anomalous consumption |

---

## 2. The Statistical Era

### ARIMA / SARIMA

**ARIMA** (AutoRegressive Integrated Moving Average) was the undisputed standard for decades:

$$\text{ARIMA}(p, d, q): \quad \phi(B)(1-B)^d y_t = \theta(B)\epsilon_t$$

- $p$: autoregressive order (influence of past values)
- $d$: differencing order (to achieve stationarity)
- $q$: moving-average order (influence of past errors)

For seasonal data, **SARIMA** adds a `(P, D, Q)s` seasonal block.

**Strengths**: High interpretability, works with small datasets  
**Weaknesses**: Only captures linear relationships, manual parameter selection (ACF/PACF analysis), poor at long look-ahead times

### ETS / Exponential Smoothing

Assigns **exponentially decaying weights** to past observations. The Holt-Winters model extends this to handle both trend and seasonality. Strong for clean seasonal patterns, but struggles with nonlinear dynamics.

### Prophet (Meta, 2017)

An open-source library that decomposes a signal into **trend + seasonality + holiday effects** and fits each component separately. Designed for analysts who need quick, robust results without deep ML expertise.

---

## 3. The Machine Learning Era

Classical ML models overcome the linearity constraint of statistical methods.

### XGBoost / LightGBM

Gradient boosting tree models that require manual **feature engineering** to encode temporal structure:

```python
df['lag_1']    = df['load'].shift(1)
df['lag_24']   = df['load'].shift(24)    # 24 hours ago
df['lag_168']  = df['load'].shift(168)   # 1 week ago
df['roll_7d']  = df['load'].rolling(168).mean()
```

**Strengths**: Captures nonlinearity, easy integration of exogenous variables (weather, holidays), fast training  
**Weaknesses**: Performance heavily dependent on feature engineering quality

### Global vs. Local Model Strategy

| Strategy | Description |
|----------|-------------|
| **Local** | Fit a separate model per time series |
| **Global** | Fit one model across all time series — exploits cross-series transfer |

Global models are a precursor to the foundation model idea: shared representations across many series.

---

## 4. The Deep Learning Era

### LSTM (Long Short-Term Memory)

Solves the vanishing gradient problem of vanilla RNNs through gating:

$$C_t = f_t \cdot C_{t-1} + i_t \cdot \tilde{C}_t$$

- **Forget gate** ($f_t$): decides what to discard from memory
- **Input gate** ($i_t$): decides what new information to store
- **Output gate** ($o_t$): decides what to expose as output

In practice, **CNN-LSTM hybrids** are popular: the CNN extracts short-range local patterns, and the LSTM captures long-range sequential dependencies.

### Transformers for Time Series

Self-attention computes pairwise relationships across all time steps simultaneously:

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$

Key time series Transformer variants:

| Model | Year | Key Contribution |
|-------|------|------------------|
| **Informer** | 2021 | ProbSparse Attention for efficient long-horizon forecasting |
| **Autoformer** | 2021 | Auto-Correlation decomposition built into the architecture |
| **PatchTST** | 2023 | Treats time series as patches — like Vision Transformer |
| **iTransformer** | 2024 | Applies attention across the channel (variate) dimension |

### Temporal Fusion Transformer (TFT)

A multi-horizon forecasting model from Google DeepMind that jointly handles:
- Static metadata (location, equipment type)
- Historical observations
- Future-known inputs (holiday schedules, price signals)

Gated Residual Networks and Variable Selection Networks automatically weight feature importance.

### N-BEATS / N-HiTS

**N-BEATS**: Stacks of basis-expansion blocks that explicitly decompose forecasts into trend and seasonality components — no domain-specific assumptions, yet strong empirical performance.

**N-HiTS**: Extends N-BEATS hierarchically, aggregating predictions at multiple temporal resolutions.

---

## 5. TimeGPT: The Foundation Model Paradigm

### Motivation

Every deep learning model above must be **retrained from scratch** for each new domain. In NLP, GPT pre-trained on billions of text tokens can be applied zero-shot or fine-tuned with minimal data. Can the same paradigm work for time series? TimeGPT's answer is: *yes, under the right conditions.*

### Architecture (Liao et al., 2025)

TimeGPT is a Transformer encoder-decoder with four key building blocks:

#### ① Positional Encoding

$$PE_{(pos, 2i)} = \sin\!\left(\frac{pos}{10000^{2i/d_{model}}}\right), \quad PE_{(pos, 2i+1)} = \cos\!\left(\frac{pos}{10000^{2i/d_{model}}}\right)$$

Injects order information into the otherwise permutation-invariant Transformer.

#### ② Multi-Head Attention

$$\text{MultiHead}(X) = \text{Concat}(head_1, \ldots, head_h)W^O$$
$$head_i = \text{Attention}(XW_i^Q,\, XW_i^K,\, XW_i^V)$$

$h$ parallel attention heads capture different temporal dependencies simultaneously.

#### ③ CNN Feed-Forward Block

Replaces the standard feed-forward network with convolutional + pooling layers to extract local latent features at each position:

$$X_{conv,out} = \sigma(W_{conv} * X_{conv,in} + B_{conv})$$

#### ④ Residual Connections + Layer Normalization

$$X_{out} = LN(X_{in} + F(X_{in}))$$

Prevents gradient vanishing and stabilizes training in deep networks.

### Bridging Continuous Time Series and Discrete Tokens

LLMs operate on discrete tokens; time series are continuous. TimeGPT discretizes the input in two steps:

1. **Min-Max Normalization**:  
   $$\hat{X} = \frac{X - X_{min}}{X_{max} - X_{min}}$$

2. **Equal-Width Binning** (quantization):  
   $$\text{bin}(x) = \left\lfloor \frac{\hat{X}}{\Delta d} \right\rfloor, \quad \Delta d = \frac{X_{max} - X_{min}}{m}$$

The model output is then reverse-transformed back into a continuous forecast.

### Pre-Training at Scale

- **Data**: 100 billion data points spanning finance, transportation, banking, web traffic, weather, energy, healthcare, etc.
- **Hardware**: NVIDIA A10G GPU cluster
- **Optimizer**: Adam (small learning rate, large batch size)
- **Framework**: PyTorch

### Zero-Shot vs. Fine-Tuning

| Mode | Description | When to Use |
|------|-------------|-------------|
| **Zero-shot** | Direct inference, no parameter update | Rapid prototyping |
| **Fine-tuning** | Adapt weights with a small domain dataset | Scarce-data scenarios |

Fine-tuning protocol:
1. Start from pre-trained TimeGPT weights
2. Update all layers with scarce load data at a **low learning rate**
3. Minimize MSE loss with Adam optimizer
4. Apply **early stopping** on a validation set to prevent overfitting

---

## 6. Experiments: TimeGPT on Real Load Forecasting Data

### Why Load Forecasting?

Accurate power demand prediction is critical for smart grid operations:

- **Under-forecasting** → power shortages, blackout risk
- **Over-forecasting** → unnecessary generation costs, excess carbon emissions
- Growing **renewable energy** (solar, wind) variability makes precision even more essential

ML models excel when data is abundant. But in **scarce-data scenarios** — new communities, emerging markets, privacy-constrained metering — they fail. This paper tests whether TimeGPT fills that gap.

### Experimental Setup

**Dataset**: Hourly load data from 16 campus buildings at the University of Texas at Austin (July–October 2011). A private dataset chosen specifically to avoid data leakage (public benchmark datasets may overlap with TimeGPT's pre-training corpus).

**Training/Test Splits**:

| Case | Training Data | Test Data |
|------|--------------|-----------|
| Case 1 | 3 days | Remainder |
| Case 2 | 5 days | Remainder |
| Case 3 | 7 days | Remainder |
| Case 4 | 15 days | Remainder |
| Case 5 | 30 days | Remainder |

**Baselines**: PM, LR, RT, XGBoost, MLP, LSTM, PatchTST, TimeLLM  
*(TimeLLM = LLM pre-trained on text data, re-programmed for time series)*

**Metrics**:

$$\text{MAE} = \frac{1}{n}\sum|y_i - \hat{y}_i|, \quad \text{RMSE} = \sqrt{\frac{1}{n}\sum(y_i - \hat{y}_i)^2}, \quad \text{MAPE} = \frac{100\%}{n}\sum\left|\frac{y_i - \hat{y}_i}{y_i}\right|$$

Each model was run 30 times; results are averaged to avoid statistical flukes.

### Finding 1: Fine-Tuning Is Non-Negotiable

> **Zero-shot TimeGPT performs poorly on load forecasting.**

Without fine-tuning, TimeGPT's pre-trained knowledge doesn't align well with load-specific distributions. **After fine-tuning, all metrics drop substantially** across every case and look-ahead time.

Lesson: if you want TimeGPT on load data, fine-tune it. Always.

### Finding 2: Dominant Performance Under Data Scarcity

**Case 1 (3 days training), 1-hour look-ahead — RMSE comparison:**

| Model | RMSE | Reduction vs. TimeGPT |
|-------|------|----------------------|
| **TimeGPT (fine-tuned)** | **0.033** | — |
| MLP | 0.051 | −35% |
| LSTM | 0.043 | −23% |
| LR | 0.037 | −11% |
| XGBoost | 0.052 | −36% |
| RT | 0.063 | −48% |
| PM | 0.039 | −15% |
| PatchTST | 0.091 | −64% |
| TimeLLM | 0.137 | −76% |

When training is limited to 3–7 days, TimeGPT outperforms all baselines — especially at short look-ahead times (1–6 hours). The rich temporal priors from pre-training compensate for the lack of local training data.

### Finding 3: Traditional ML Rebounds with More Data

When training data grows to 15–30 days (Cases 4–5), **LSTM, LR, and XGBoost outperform TimeGPT**.

| Model | Case 5, 1h-ahead RMSE |
|-------|----------------------|
| **LR** | **0.012** |
| LSTM | 0.016 |
| XGBoost | 0.020 |
| PatchTST | 0.017 |
| TimeGPT | 0.028 |

Domain-specific supervised learning overtakes general pre-trained knowledge when sufficient data is available.

### Finding 4: Long Look-Ahead Times Are a Weakness

As the forecast horizon extends to 12–24 hours, TimeGPT's advantage shrinks or reverses. Visualization reveals **over-smoothed predictions** that fail to capture demand peaks and valleys. The model's pre-training appears to emphasize short-range temporal patterns.

### Finding 5: Distribution Gap Is the Key Variable

Results across 5 datasets (3 days training, 1h look-ahead):

| Dataset | TimeGPT Best? |
|---------|--------------|
| UT Austin (Texas) | ✅ All horizons |
| Nongfu Spring (China) | ✅ All horizons |
| Midea Group (China) | ✅ 1h only |
| Joho City (Malaysia) | ✅ 1h, 4h only |
| Arizona State University | ❌ None |

The Arizona State dataset shows no advantage for TimeGPT. The authors attribute this to a **large distributional gap between the pre-training source domain and the load target domain** — analogous to using a model trained on animal images for medical imaging tasks.

### Practical Decision Rule

```
Step 1: Split scarce historical data → training set + validation set
Step 2: Fine-tune TimeGPT on training set
Step 3: Evaluate TimeGPT and ML baselines on validation set
Step 4: If TimeGPT achieves lowest validation loss → use TimeGPT
        Otherwise → use the best-performing ML baseline
```

---

## 7. Other Time Series Foundation Models

The landscape has expanded rapidly since TimeGPT:

| Model | Organization | Key Feature |
|-------|-------------|-------------|
| **Chronos** | Amazon | T5-based; quantizes time series as tokens for LM pre-training |
| **Moirai** | Salesforce | Multi-patch-size attention; fully open-source weights |
| **Lag-Llama** | Meta Research | Llama-based; probabilistic forecasting via normalizing flows |
| **TimesFM** | Google DeepMind | 200B-token pre-training; strong univariate performance |
| **MOMENT** | CMU | Masked autoencoder pre-training; multi-task |
| **TimeLLM** | — | Reprograms a text LLM for time series — underperforms in load tests |

---

## 8. Advanced Topics Worth Studying

### Probabilistic Forecasting

Instead of a single point estimate, output a **predictive distribution**:

- **Quantile Regression**: predict the 10th, 50th, 90th percentiles (useful for risk-aware planning)
- **Normalizing Flows**: learn complex distributions through invertible transformations
- **Conformal Prediction**: distribution-free statistical coverage guarantees — used in TimeGPT's anomaly detection via prediction intervals (99% confidence)

### Hierarchical Forecasting

Forecast at multiple aggregation levels simultaneously while enforcing **coherence** (bottom-up sums equal top-down totals):

- **Bottom-Up**: aggregate from the lowest level
- **Top-Down**: disaggregate from totals using historical proportions
- **MinT (Minimum Trace)**: optimal linear reconciliation that minimizes total variance

### Graph Neural Network (GNN) Forecasting

Models **spatial dependencies** between multiple time series using graph structure:

- **DCRNN**: traffic speed forecasting using road network graph
- **MTGNN**: automatically learns inter-series graph structure
- **Crossformer**: cross-dimension attention between variates in the Transformer

### Domain Adaptation for Foundation Models

TimeGPT's core limitation — source/target distribution mismatch — motivates active research:

- **Adversarial Training**: learn domain-invariant representations
- **Hybrid Models**: combine TimeGPT's general priors with domain-specific models
- **Data Augmentation**: synthetically expand the fine-tuning corpus
- **Energy-Domain LTSM**: a foundation model pre-trained exclusively on energy data — could maintain generalization while reducing distributional gap

### Online Learning & Concept Drift

Real-world distributions shift over time (grid topology changes, new large consumers, climate change). **Online learning** methods update the model continuously:

- **ADWIN, Page-Hinkley**: statistical change-point detection algorithms
- **Continual Learning**: learn new patterns without catastrophic forgetting of old ones

### Causal Inference in Forecasting

Beyond pattern extrapolation, estimate the **effect of interventions** (e.g., "what would demand have been without this policy?"). Methods: synthetic control, causal impact (Bayesian structural time series), difference-in-differences.

---

## 9. Study Roadmap

```
Stage 1 — Statistical Foundations
  ├─ Implement ARIMA/SARIMA with statsmodels
  ├─ Use Prophet on public datasets (electricity, weather)
  └─ Master ACF/PACF interpretation, ADF stationarity test

Stage 2 — Machine Learning
  ├─ XGBoost + lag feature engineering
  ├─ LightGBM multivariate forecasting
  └─ TimeSeriesSplit cross-validation (avoid data leakage!)

Stage 3 — Deep Learning
  ├─ Build LSTM from scratch in PyTorch
  ├─ Experiment with TFT, N-BEATS using the Darts library
  └─ Benchmark on ETTh1, Weather, Traffic datasets

Stage 4 — Foundation Models
  ├─ TimeGPT zero-shot → fine-tuned comparison via Nixtla API
  ├─ Run Chronos locally (HuggingFace)
  ├─ Fine-tune Moirai on your own dataset
  └─ Use GluonTS for standardized benchmarking

Stage 5 — Research Depth
  ├─ Probabilistic forecasting: Quantile Loss, Conformal Prediction
  ├─ Hierarchical forecasting: HierarchicalForecast library
  ├─ Graph-based: implement MTGNN
  └─ Reproduce papers: PatchTST, iTransformer
```

---

## Conclusion

TimeGPT's core lesson is clear: **foundation models shine brightest when labeled data is scarce.**

Key takeaways from the Liao et al. (2025) study:

1. **Zero-shot fails for load forecasting** — fine-tuning is mandatory.
2. **3–7 days of data**: TimeGPT dominates all baselines at short horizons (1–6h).
3. **15–30 days of data**: traditional ML (LSTM, LR, XGBoost) catches up and often wins.
4. **Long horizons (12–24h)**: TimeGPT over-smooths and loses its edge.
5. **Distribution gap is decisive**: if target load data is statistically distant from the pre-training corpus, TimeGPT's generalization breaks down.
6. **Decision protocol**: always compare on a held-out validation set before committing to TimeGPT.

The broader trajectory is clear: statistical methods gave us interpretability, ML gave us nonlinearity, deep learning gave us sequence modeling, and foundation models are now giving us *generalization across domains without retraining*. Understanding where each tool excels — and where it breaks — is the defining skill for a modern data scientist working with time series.

---

## References

- [TimeGPT Paper Review (Tistory, Korean)](https://qorskawls12.tistory.com/m/81)
- Liao, W. et al. (2025). *TimeGPT in load forecasting: A large time series model perspective.* **Applied Energy**, 124973. [DOI: 10.1016/j.apenergy.2024.124973](https://doi.org/10.1016/j.apenergy.2024.124973)
- Garza, A. et al. (2024). *TimeGPT-1.* arXiv:2310.03589
- Das, A. et al. (2024). *A decoder-only foundation model for time-series forecasting (TimesFM).* ICML 2024.
- Ansari, A.F. et al. (2024). *Chronos: Learning the language of time series.* arXiv:2403.07815
- Liu, Y. et al. (2024). *Moirai: Unified training of universal time series forecasting transformers.* ICML 2024.
- [Nixtla Documentation](https://docs.nixtla.io/)
- [Darts Library](https://unit8co.github.io/darts/)
- [GluonTS Benchmarking](https://ts.gluon.ai/)
- [Chronos on HuggingFace](https://huggingface.co/amazon/chronos-t5-large)
