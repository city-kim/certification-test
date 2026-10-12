# ADsP 입문서 보강 근거

입문서는 `src/data/adsp/guide.ts`의 12개 주제와 기존 암기카드에 맞춰 별도로 작성한 설명이다. 캡처 문구를 그대로 옮기지 않고, 개념의 이유와 예시·계산 과정으로 풀었다. 시험 포인트는 개념 구분을 위한 안내이며 실제 출제 빈도를 집계한 결과는 아니다.

## 제공된 캡처에서 확인한 보강 내용

자료 폴더: `/Users/kct/Desktop/example/adsp/`. 아래 쪽수는 이미지에 인쇄된 책의 쪽수다. 중요 표시와 TIP은 학습 내용의 우선순위를 참고하는 자료로 사용했다.

| 캡처 파일 | 책 쪽수 | 확인 내용 | 반영 장 |
| --- | --- | --- | --- |
| `ebook_screenshot_20260914_120414_41.png` | 192 | 결측값 대치 방법의 중요 표시, 완전 사례 분석의 정보 손실 | 07 |
| `ebook_screenshot_20260914_120551_106.png` | 256 | 다중공선성의 중요 표시와 진단 TIP, VIF | 09 |
| `ebook_screenshot_20260914_120702_154.png` | 304 | 부트스트랩 미선택 확률, 층화 교차검증의 중요 표시, 오버·언더샘플링 | 10 |
| `ebook_screenshot_20260914_120715_163.png` | 313 | 의사결정나무 분석 과정의 중요 표시, 불순도·정지규칙 | 11 |
| `ebook_screenshot_20260914_120749_186.png` | 336 | 성능지표 계산 연습의 중요 표시, F1·FPR 및 혼동행렬 | 10 |
| `ebook_screenshot_20260914_120813_202.png` | 352 | k-means의 중요 표시, 초기 중심과 배정 단계 | 12 |
| `ebook_screenshot_20260914_120824_210.png` | 360 | SOM 구성의 중요 표시, 입력·경쟁층과 BMU | 12 |

### 전체 캡처 재점검 후 추가 보강

264장 전체의 텍스트에서 별표·TIP·중요 표현을 검색하고, 설명할 내용을 원문과 대조했다. 기존 12장에 아래 항목을 추가했다. 긴 장에는 소주제 이동 목차를 붙였고, 비교표·학습용 결과표·누적 이득 및 향상도 곡선과 추가 확인 질문을 제공한다. 계산 자료와 그래프는 이해를 위해 직접 구성한 예시다.

| 캡처 파일(끝 번호) | 책 쪽수 | 추가 반영 내용 | 반영 장 |
| --- | --- | --- | --- |
| `_33.png`, `_35.png`, `_37.png` | 184, 186, 188 | reshape·sqldf·plyr·data.table의 역할 | 07 |
| `_45.png` | 196 | IQR과 평균±3s 기준 비교, ESD 용어의 범위 | 07 |
| `_57.png`, `_60.png`, `_64.png` | 208, 210, 214 | 이산·연속분포 비교, 기댓값·분산 계산 | 08 |
| `_77.png`, `_79.png`, `_81.png` | 227, 229, 231 | 독립·대응표본 t검정, ANOVA의 가설·자유도·해석 | 08 |
| `_84.png`, `_85.png` | 234, 235 | 카이제곱 적합도·독립성·동질성 검정 | 08 |
| `_99.png`, `_110.png`, `_111.png`, `_120.png` | 249, 260, 261, 270 | 회귀 결과표, 수정 R²·AIC/BIC·예측 오차 지표 | 09 |
| `_118.png` | 268 | 릿지·라쏘·엘라스틱넷 비교 | 09 |
| `_127.png`, `_128.png` | 277, 278 | PCA 고유값·설명분산·스크리 그림 해석 | 09 |
| `_136.png`, `_137.png`, `_139.png`, `_140.png` | 286, 287, 289, 290 | ACF/PACF, 평활, AR·MA·ARMA·ARIMA | 09 |
| `_188.png`, `_190.png` | 338, 340 | 누적 이익도표와 향상도 곡선·계산 | 10 |
| `_174.png`, `_175.png`, `_182.png` | 324, 325, 332 | 활성함수의 식·범위, k-NN 원리·k 선택 | 11 |
| `_223.png`, `_224.png` | 373, 374 | Apriori 후보 생성·가지치기, FP-Growth와 연관분석 한계 | 12 |

표의 끝 번호는 자료 폴더에서 `ebook_screenshot_20260914_..._<번호>.png`를 찾기 위한 식별자다. 별표 수를 실제 출제 빈도로 바꾸어 해석하지 않았다.

캡처의 간략한 표현만으로 오해할 수 있는 부분은 설명을 보완했다. 특히 회귀 오차의 독립성과 입력변수의 공선성을 구분하고, 부스팅의 가중치 설명은 AdaBoost의 예로 한정했다. C4.5는 엔트로피 기반 이득비율로 구체화했다.

추가 보강에서는 3σ 규칙과 엄밀한 일반화 ESD 검정을 구분하고, k-NN을 지도학습으로 설명했다. k를 √n으로 확정하거나 ACF/PACF의 첫 신뢰한계 진입만으로 차수를 확정하지 않도록 했다. MA 모형과 이동평균 평활을 구분하고, Apriori의 빈발 집합 선별과 규칙 생성을 나누어 설명했다. ReLU의 범위에 0을 포함하며, 고유값 1 기준은 표준화 PCA의 맥락에서 설명했다.

## 추가로 확인한 공식 문서

- [R 입문 매뉴얼](https://stat.ethz.ch/CRAN/doc/manuals/R-intro.html): 자료구조, 형 변환과 재활용 규칙.
- [R의 Wilcoxon 검정 문서](https://www.stat.math.ethz.ch/R-manual/R-devel/library/stats/html/wilcox.test.html): 짝지은 표본의 부호순위 검정과 독립 표본의 순위합 검정 구분.
- [IBM CRISP-DM 개요](https://www.ibm.com/docs/en/spss-modeler/saas?topic=dm-crisp-help-overview): 여섯 단계와 단계 간 반복 가능성.
- [IBM CRISP-DM 가이드](https://public.dhe.ibm.com/software/analytics/spss/documentation/modeler/18.0/en/ModelerCRISPDM.pdf): 평가 단계의 업무 성공 기준.
- [NIST 평균의 신뢰구간](https://www.itl.nist.gov/div898/handbook/eda/section3/eda352.htm): 신뢰수준의 반복 표본 해석과 구간 폭의 변화.
- [Quinlan, Improved Use of Continuous Attributes in C4.5](https://www.cs.cmu.edu/afs/cs/project/jair/pub/volume4/quinlan96a.pdf): C4.5의 이득비율 기준.
- [NIST 일반화 ESD 검정](https://www.itl.nist.gov/div898/handbook/eda/section3/eda35h3.htm): 단순 3σ 규칙과 별도의 검정 절차 구분.
- [NIST 대응표본 검정](https://www.itl.nist.gov/div898/handbook/prc/section3/prc311.htm): 짝별 차이에 대한 t검정.
- [scikit-learn 선형모형](https://scikit-learn.org/stable/modules/linear_model.html): 릿지·라쏘·엘라스틱넷의 벌점 차이.
- [scikit-learn 최근접이웃](https://scikit-learn.org/stable/modules/neighbors.html): 분류·회귀와 이웃 수·거리 선택.
- [scikit-learn 신경망](https://scikit-learn.org/stable/modules/neural_networks_supervised.html): 활성함수와 학습 특성.
- [Hyndman·Athanasopoulos, ARIMA models](https://otexts.com/fpp3/arima.html): AR·MA·ARIMA와 ACF/PACF의 해석.
- [IBM 누적 이득·향상도](https://www.ibm.com/docs/en/spss-statistics/30.0.0?topic=customers-cumulative-gains-lift-charts): 누적 이득과 무작위 기준 대비 향상도.
