export type AdspSubject = "understanding" | "planning" | "analysis";

export interface AdspConcept {
  term: string;
  explanation: string;
  memory?: string;
}

export interface AdspModule {
  id: string;
  subject: AdspSubject;
  title: string;
  goal: string;
  concepts: AdspConcept[];
}

export const ADSP_PLAN = [
  ["1일", "데이터·지식·DB", "DIKW와 지식변환, DB 특징"],
  ["2일", "기업 시스템·빅데이터", "OLTP/OLAP, 4V와 위기"],
  ["3일", "1과목 복습", "비식별 기술까지 카드 회상"],
  ["4일", "분석 기획·방법론", "4분면, KDD/CRISP-DM"],
  ["5일", "접근법·프로젝트", "하향식/상향식과 타당성"],
  ["6일", "거버넌스", "준비도·성숙도·조직구조"],
  ["7일", "1·2과목 복습", "틀린 카드만 다시 보기"],
  ["8일", "R·전처리", "벡터, 결측값, 이상값"],
  ["9일", "통계 기초", "척도, 추정, 가설검정"],
  ["10일", "상관·회귀", "회귀가정과 변수선택"],
  ["11일", "시계열·다변량", "정상성, MDS, PCA"],
  ["12일", "분류·평가지표", "혼동행렬 공식 재현"],
  ["13일", "나무·앙상블·신경망", "알고리즘별 차이"],
  ["14일", "군집·연관 + 총복습", "거리, SOM, 연관규칙"],
] as const;

export const ADSP_MODULES: AdspModule[] = [
  {
    id: "data-map",
    subject: "understanding",
    title: "데이터와 지식의 큰 지도",
    goal: "데이터 유형, 지식변환, DIKW를 한 흐름으로 설명한다.",
    concepts: [
      { term: "정성 vs 정량", explanation: "정성은 언어·문자로 성질을, 정량은 수치·기호로 양을 표현한다.", memory: "어떤 느낌? vs 얼마나?" },
      { term: "정형·반정형·비정형", explanation: "정형은 표 구조, 반정형은 태그·메타데이터 구조, 비정형은 미리 정한 구조가 없다.", memory: "반정형도 구조 정보는 있다." },
      { term: "SECI", explanation: "공통화(암→암) → 표출화(암→형) → 연결화(형→형) → 내면화(형→암).", memory: "공표연내" },
      { term: "DIKW", explanation: "Data 사실 → Information 의미 → Knowledge 행동 판단 → Wisdom 확장된 통찰.", memory: "사실-의미-행동-통찰" },
    ],
  },
  {
    id: "database",
    subject: "understanding",
    title: "데이터베이스와 기업 시스템",
    goal: "비슷해 보이는 시스템을 핵심 동사로 구분한다.",
    concepts: [
      { term: "DB 4특징", explanation: "통합·저장·공용·변화되는 데이터. 변해도 현재의 정확성을 유지해야 한다.", memory: "통저공변" },
      { term: "DB 설계", explanation: "요구사항 분석 → 개념적 → 논리적 → 물리적 설계.", memory: "요개논물" },
      { term: "OLTP vs OLAP", explanation: "OLTP는 실시간 거래 처리·갱신, OLAP는 축적 데이터의 다차원 분석·조회.", memory: "T=Transaction 처리, A=Analysis 분석" },
      { term: "CRM·SCM·ERP", explanation: "CRM은 고객관계, SCM은 공급망 최적화, ERP는 전사 자원 통합관리." },
      { term: "DW vs 데이터 마트", explanation: "DW는 전사 통합·시계열·비휘발 저장소, 데이터 마트는 특정 부서·주제용 소규모 저장소." },
    ],
  },
  {
    id: "big-data",
    subject: "understanding",
    title: "빅데이터와 데이터 사이언스",
    goal: "4V, 활용기법, 위기와 대응을 연결해 기억한다.",
    concepts: [
      { term: "4V", explanation: "Volume·Variety·Velocity는 투자 난이도, Value는 비즈니스 효과와 연결한다.", memory: "3V는 비용, Value는 효과" },
      { term: "관점 변화", explanation: "사전→사후처리, 표본→전수, 질→양, 인과→상관의 활용이 확대됐다." },
      { term: "기법 구별", explanation: "함께 사면 연관규칙, 영향은 회귀, 리뷰는 감정분석, 최적해는 유전자 알고리즘." },
      { term: "3대 위기", explanation: "사생활 침해·책임 원칙 훼손·데이터 오용. 분석 결과를 절대적 진실로 취급하지 않는다." },
      { term: "비식별", explanation: "마스킹은 가리기, 가명은 바꾸기, 총계는 합치기, 범주화는 구간으로 묶기." },
      { term: "데이터 사이언스", explanation: "분석·통계 + IT·프로그래밍 + 비즈니스·커뮤니케이션의 결합." },
    ],
  },
  {
    id: "planning-map",
    subject: "planning",
    title: "분석 기획의 4분면과 접근법",
    goal: "대상과 방법의 Known/Unknown 조합을 바로 판단한다.",
    concepts: [
      { term: "대상·방법 모두 Known", explanation: "최적화(Optimization): 이미 아는 문제와 방법을 더 잘 만든다." },
      { term: "방법 Known·대상 Unknown", explanation: "통찰(Insight): 아는 분석법으로 무엇을 볼지 알아낸다." },
      { term: "대상 Known·방법 Unknown", explanation: "솔루션(Solution): 정해진 문제의 해결법을 찾는다." },
      { term: "모두 Unknown", explanation: "발견(Discovery): 데이터에서 문제와 방법을 함께 탐색한다." },
      { term: "하향식 vs 상향식", explanation: "하향식은 정의된 문제의 해법을 찾고, 상향식은 데이터에서 패턴과 문제를 발견한다.", memory: "Why vs What" },
      { term: "디자인 사고", explanation: "상향식 발산과 하향식 수렴을 반복해 복잡한 문제를 탐색·검증한다." },
    ],
  },
  {
    id: "methodology",
    subject: "planning",
    title: "분석 방법론",
    goal: "KDD, CRISP-DM, 빅데이터 방법론의 순서를 구분한다.",
    concepts: [
      { term: "KDD", explanation: "데이터셋 선택 → 전처리 → 변환 → 데이터 마이닝 → 결과 평가.", memory: "선전변마평" },
      { term: "CRISP-DM", explanation: "업무 이해 → 데이터 이해 → 데이터 준비 → 모델링 → 평가 → 전개." },
      { term: "빅데이터 방법론", explanation: "분석 기획 → 데이터 준비 → 데이터 분석 → 시스템 구현 → 평가·전개." },
      { term: "위험 대응", explanation: "회피·전이·완화·수용.", memory: "회전완수" },
      { term: "폭포수·나선형·프로토타입", explanation: "폭포수는 순차, 나선형은 반복 개발, 프로토타입은 일부를 먼저 만들어 확인한다." },
    ],
  },
  {
    id: "governance",
    subject: "planning",
    title: "마스터플랜과 거버넌스",
    goal: "우선순위, 성숙도, 조직구조를 한 번에 정리한다.",
    concepts: [
      { term: "우선순위", explanation: "전략적 중요도, 비즈니스 성과·ROI, 실행 용이성을 함께 본다." },
      { term: "분석 거버넌스", explanation: "조직·프로세스·시스템·데이터·교육/인력." },
      { term: "데이터 거버넌스", explanation: "전사 데이터를 표준화해 관리하는 체계. 원칙·조직·프로세스로 구성." },
      { term: "주요 관리대상", explanation: "마스터 데이터·메타데이터·데이터 사전." },
      { term: "성숙도", explanation: "도입 → 활용 → 확산 → 최적화." },
      { term: "조직구조", explanation: "집중은 전담조직, 기능은 현업 자체 분석, 분산은 분석인력을 현업에 배치." },
    ],
  },
  {
    id: "r-preprocess",
    subject: "analysis",
    title: "R 기초와 데이터 전처리",
    goal: "R의 기본 동작과 결측·이상값 처리를 설명한다.",
    concepts: [
      { term: "R 벡터", explanation: "문자와 숫자를 섞으면 전체가 문자형. 길이가 다르면 짧은 벡터를 재활용한다." },
      { term: "apply 계열", explanation: "apply의 1은 행, 2는 열. sapply는 단순화, lapply는 리스트 반환." },
      { term: "결측값", explanation: "완전 사례 삭제, 평균·확률 대치, 다중 대치가 있다. 다중 대치는 대치→분석→결합." },
      { term: "이상값", explanation: "IQR 기준은 Q1-1.5×IQR 밖 또는 Q3+1.5×IQR 밖. 원인을 확인하고 처리한다." },
      { term: "요약 vs 파생변수", explanation: "요약변수는 정보를 종합하고, 파생변수는 조건·함수로 새 의미를 만든다." },
    ],
  },
  {
    id: "statistics",
    subject: "analysis",
    title: "통계 기초와 가설검정",
    goal: "척도, 추정, 오류와 p값을 정확히 해석한다.",
    concepts: [
      { term: "척도", explanation: "명목=분류, 순서=서열, 등간=간격, 비율=절대 0과 배수." },
      { term: "표본추출", explanation: "단순랜덤은 동일 기회, 계통은 일정 간격, 집락은 군집 선택, 층화는 각 층에서 추출." },
      { term: "신뢰구간", explanation: "같은 절차를 반복할 때 생성된 구간의 일정 비율이 참 모수를 포함한다." },
      { term: "p값", explanation: "H0가 참일 때 관측값 이상으로 극단적인 결과가 나올 확률. H0가 참일 확률이 아니다." },
      { term: "1·2종 오류", explanation: "1종은 참인 H0를 기각, 2종은 거짓인 H0를 기각하지 못하는 오류." },
      { term: "비모수", explanation: "분포 가정이 약하고 순위·부호를 활용. 윌콕슨, 맨-휘트니, 크루스칼-왈리스 등이 있다." },
    ],
  },
  {
    id: "regression",
    subject: "analysis",
    title: "상관·회귀·시계열",
    goal: "모형의 목적과 가정을 비교해 설명한다.",
    concepts: [
      { term: "피어슨 vs 스피어만", explanation: "피어슨은 연속형 선형관계, 스피어만은 순위 기반 단조관계." },
      { term: "선형 vs 로지스틱", explanation: "선형회귀는 연속형 결과·최소제곱, 로지스틱은 범주형 결과·최대우도." },
      { term: "회귀가정", explanation: "선형성·등분산성·독립/비상관성·오차 정규성." },
      { term: "변수선택", explanation: "전진은 추가, 후진은 제거, 단계는 추가와 제거를 함께 검토." },
      { term: "다중공선성", explanation: "독립변수끼리 높은 상관으로 회귀계수가 불안정해지는 현상." },
      { term: "정상 시계열", explanation: "평균·분산이 일정하고 자기공분산은 시점이 아닌 시차에만 의존한다." },
    ],
  },
  {
    id: "mining-metrics",
    subject: "analysis",
    title: "데이터마이닝과 분류 성능",
    goal: "지도·비지도 학습과 혼동행렬 공식을 재현한다.",
    concepts: [
      { term: "지도 vs 비지도", explanation: "지도학습은 정답 레이블이 있고, 비지도학습은 레이블 없이 구조를 찾는다." },
      { term: "Precision", explanation: "TP/(TP+FP). 예측 양성 중 실제 양성.", memory: "분모는 예측 양성" },
      { term: "Recall", explanation: "TP/(TP+FN). 실제 양성 중 찾아낸 양성.", memory: "분모는 실제 양성" },
      { term: "Specificity", explanation: "TN/(FP+TN). 실제 음성 중 맞힌 음성." },
      { term: "F1", explanation: "2×Precision×Recall/(Precision+Recall). 불균형 데이터에서 함께 본다." },
      { term: "ROC", explanation: "x축 FPR(1-특이도), y축 TPR(민감도). AUC가 1에 가까울수록 좋다." },
    ],
  },
  {
    id: "models",
    subject: "analysis",
    title: "나무·앙상블·신경망",
    goal: "대표 모델의 장단점과 알고리즘을 비교한다.",
    concepts: [
      { term: "의사결정나무", explanation: "성장 → 가지치기 → 타당성 평가 → 해석·예측. 해석은 쉽지만 과대적합 가능." },
      { term: "CART·C4.5·CHAID", explanation: "CART는 지니·이진분리, C4.5는 엔트로피, CHAID는 카이제곱." },
      { term: "배깅", explanation: "부트스트랩 표본별 모델을 병렬로 학습해 결합한다." },
      { term: "부스팅", explanation: "이전 모델이 틀린 관측치에 가중치를 높여 순차 학습한다." },
      { term: "랜덤포레스트", explanation: "배깅에 분할 후보 변수의 무작위 선택을 더한 다수의 나무." },
      { term: "신경망", explanation: "입력·은닉·출력층과 역전파로 구성. 시그모이드는 이진, 소프트맥스는 다범주 출력." },
    ],
  },
  {
    id: "cluster-association",
    subject: "analysis",
    title: "군집·SOM·연관분석",
    goal: "거리와 군집법, 연관규칙 공식을 구분한다.",
    concepts: [
      { term: "실루엣", explanation: "-1~1이며 1에 가까울수록 군집 내 응집과 군집 간 분리가 좋다." },
      { term: "거리", explanation: "유클리드는 직선, 맨해튼은 좌표차 절댓값 합, 마할라노비스는 분산·상관까지 고려." },
      { term: "연결법", explanation: "최단=가까운 쌍, 최장=먼 쌍, 평균=모든 쌍 평균, 와드=오차제곱합 증가 최소." },
      { term: "k-means", explanation: "k와 초기 중심을 정해야 하며 빠르지만 이상값과 비구형 군집에 약하다." },
      { term: "SOM", explanation: "비지도 경쟁학습으로 저차원 격자에 배치하며 가장 가까운 승자 뉴런은 BMU." },
      { term: "연관규칙", explanation: "지지도=P(A∩B), 신뢰도=P(B|A), 향상도=P(B|A)/P(B). 향상도 1이면 독립." },
    ],
  },
];

export const ADSP_PITFALLS = [
  "독립사건과 배반사건은 다르다. 독립은 확률에 영향이 없고, 배반은 동시에 발생할 수 없다.",
  "p값은 귀무가설이 참일 확률도, 내가 틀릴 확률도 아니다.",
  "p값이 크면 귀무가설을 채택·증명하는 것이 아니라 기각하지 못한다.",
  "95% 신뢰구간은 반복해서 만든 구간의 장기 포함률 개념이다.",
  "Accuracy는 정확도, Precision은 정밀도다. Precision의 분모는 예측 양성이다.",
  "R은 대소문자를 구분하므로 논리 상수는 TRUE/FALSE로 쓴다.",
  "상관관계는 인과관계를 증명하지 않는다.",
  "이상값은 중요한 신호일 수 있으므로 무조건 삭제하지 않는다.",
];
