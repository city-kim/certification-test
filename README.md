# 자격증 모바일 모의고사

### 🔗 바로 풀기 → <a href="https://city-kim.github.io/certification-test/" target="_blank" rel="noopener noreferrer">city-kim.github.io/certification-test</a>

여러 자격증을 **과목별 정원에 맞춰 매번 랜덤 출제**하는 모바일 웹 모의고사입니다.
React + Vite + React Router로 만든 정적 사이트라 GitHub Pages에서 서버 없이 동작합니다.

시작 화면에서 자격증을 고르면 해당 시험으로 분기합니다(HashRouter 기반, `/#/<certId>`).

| 자격증 | certId | 출제 구성 | 합격 기준 | 상태 |
| --- | --- | --- | --- | --- |
| 네트워크관리사 2급 | `network_2` | 50문항 — TCP/IP 17 · 네트워크 일반 10 · NOS 18 · 네트워크 운용기기 5 | 총점 60점 이상(과락 없음) | 문제은행 250 |
| 네트워크관리사 2급 **실기** | `network_2_practical` | 20문항 — 단답형·용어 10 · IP·서브넷 3 · 리눅스 4 · 라우터 3 | 총점 60점 이상(과락 없음) | 문제은행 80 (주관식 70) |
| 데이터분석 준전문가(ADsP) | `adsp` | 50문항 — 데이터 이해 10 · 데이터 분석 기획 10 · 데이터 분석 30 | 총점 60점 이상 · 과목별 40% 이상(과락) | 개념학습 12모듈 · 암기카드 145장 |

- 매 시험마다 무작위 출제 + **보기 순서도 셔플**
- 결과: 총점/100·합격 판정, **과목별 점수·과락 표시**
- **기출 자료 화면** — 문제로 내지 않은 유형을 분야별 링크로 정리, 제목 검색 지원
- **주관식(단답형) 입력 채점** — 실기처럼 답을 직접 타이핑, 허용 표기 여러 개 인정, 리눅스 명령어는 대소문자까지 채점
- **실기 암기카드** — 과목 구분 없이 전체 카드를 랜덤 출제하고, 아는 카드와 다시 볼 카드를 나눠 반복 학습
- **실기 핵심 요약** — 필수 프로토콜·포트·OSI 계층·리눅스 명령을 표로 훑고 암기카드로 바로 이동
- **라우터 기출** — 반복 출제된 Cisco IOS 문제를 문제·명령 블록·설명으로 유형별 정리
- **ADsP 선행 학습** — 기출문제 등록 전 14일 학습 순서, 12개 핵심 모듈, 진도 저장, 과목별 암기카드 제공
- **틀린 문제 해설**(이미지 지문 포함) + **오답노트 localStorage 저장**(자격증별 분리)

> 실기(`network_2_practical`)는 [우진아빠의 네트워크 실무](https://tech-network.tistory.com/) 블로그의 실기 복원 포스팅을
> 근거로 만들었습니다. 실기가 원래 단답형이므로 **70문항은 답을 직접 입력하는 주관식**이고, 원문이 '옳지 않은 것을 고르시오'
> 형태였던 10문항만 4지선다로 두었습니다. 케이블 제작·NOS 서버 설정·라우터 실습·서브넷 계산처럼 직접 조작하거나 손으로
> 풀어야 하는 유형은 문제로 만들지 않고 [`docs/network_2_practical-links.md`](docs/network_2_practical-links.md) 에
> 분야별 링크(260편)로 정리해, 시작 화면의 **기출 자료** 버튼에서 바로 볼 수 있게 했습니다.

자격증 정의(과목·정원·합격/과락 기준)는 `src/data/certs.config.json` 한 곳에서 관리하며,
앱과 문제은행 빌드 스크립트가 이 파일을 공유합니다. 자격증을 추가하려면 여기에 항목을 넣으면 됩니다.

## TESAT 학습실

일반 화면 `/#/tesat`, 뉴스형 시크릿 화면 `/certification-test-secret/?channel=tesat`에서 사용합니다.

사용자가 제공한 세 JSON 배열을 원문 그대로 보존하며, 2025년 10월 1일부터 현재 확보된 최신 게시일까지 문제은행에 등록합니다.

- 경제·금융 상식 퀴즈: 2025.10.13~2026.04.06, 24편·192문항
- 테샛 맛보기: 2025.10.13~2026.10.14, 44편·132문항
- 오늘의 TESAT 문제: 2025.11.21~2026.10.27, 38편·38문항
- 총 106편·**362문항** 등록 (기간 내 중복 없음)
- 오늘의 TESAT 중 원문 파일이 없는 이전 게시글 3편은 출처 링크 제공
- 시사 경제용어 따라잡기: 2026.04.15~2026.10.15, 4편 유지

지문·사례·수치·보기 순서·제공 정답을 유지합니다. 보기 박스, 조합형 선택지와 문제 그림도 보존합니다.
문제의 이미지와 이미지로 된 표는 기본으로 숨기며 `[보이기]`를 누르면 펼칩니다. `[숨기기]`로 다시 접을 수 있고 일반·시크릿 화면과 오답노트에 공통 적용합니다. 이미지는 내려받은 정적 파일로 제공합니다.
테샛 맛보기 132문항과 오늘의 TESAT 38문항의 원문 해설을 사용하고, 별도 해설이 없는 경제상식 퀴즈는 원문 정답표와 관련 개념 설명을 구분합니다.
오늘의 TESAT에서 그림으로 된 선택지 표와 문제·해설을 직접 확인해 전사하고 원문 문제 그림도 유지합니다.
최신 글(혐오시설 유치 반대)은 첨부 HTML에 정답 번호가 없어 공식 게시글의 정답 ②를 확인했습니다. 제공된 해설 본문은 그대로 보존합니다.
검토한 예외는 `src/data/tesat/imports/reviewed-imports.json`에 원본 해시와 근거를 기록하며 원본이 바뀌면 다시 검토하도록 빌드를 중단합니다.

원본 파일은 `src/data/tesat/imports/raw/`에 보존합니다. HTML은 실행하지 않고 텍스트·보기 박스·강조·그림만 구조화해 렌더링합니다.
총 183편의 원본을 보존하며 `article-metadata.json`에 게시일·출처 대응을 기록합니다. 오늘의 TESAT 파일에 섞인 시사용어 글 1편(2025.12.24)은 Briefing 기간 이전이므로 원본과 자료 목록에만 보관합니다.
전체 830문항의 추출 자료를 유지하며 학습 시작일은 `src/data/tesat/imports/selection.json`에서 관리합니다.
기간 이전의 원문 457문항과 이전 자체 연습 295문항은 Top Stories·일반 학습·실력 점검에서 제외하고 기존 오답 복습을 위해 별도 보존합니다.
용어장과 Briefing은 기존 자료를 유지합니다.
문항 ID를 원문 내용으로 분리해 기존 연습의 정답 기록이 새 원문 문제에 잘못 적용되지 않게 합니다.
회원 인증 정보는 저장하지 않습니다.

출처·게시월·주제·학습 상태 필터, 즉시 채점 학습, 최대 20문항 실력 점검, 문항 이동과 이어풀기,
미복습/다시 틀림/복습 완료 오답노트, 검색형 용어장과 암기카드를 제공합니다.
실력 점검은 정답률만 표시하고 TESAT 공식 점수·등급으로 환산하지 않습니다.
새 실력 점검은 문제와 선택지 순서를 함께 섞으며, 시작할 때 저장한 순서를 새로고침·이어풀기에서도 유지합니다. 기존에 진행 중이던 시험의 순서는 바꾸지 않습니다.
결과와 오답노트는 당시 선택지 순서를 보여주고 해설 안의 보기 번호도 그 순서에 맞춥니다. 원문 문제은행과 일반 학습·복습의 보기 순서는 유지합니다.
선택지가 그림에 포함된 두 문항은 원문 그림을 유지하며, 그림 속 번호와 답을 고르는 선택지 번호가 다를 수 있음을 표시합니다.
일반·시크릿 화면은 같은 출처(origin)의 `ncq.tesat.learning.v1` 기록을 공유합니다.
다른 기기나 서로 다른 주소(localhost/127.0.0.1, 공개 사이트 등) 사이에는 동기화되지 않습니다.

자료 목록과 확인 상태: [docs/tesat-sources.md](docs/tesat-sources.md).

```bash
npm run build-tesat # 제공 HTML의 다중 문항 분리 → 원문 은행·용어·자료 목록 생성 및 검증
npm test           # 채점, 오답, 저장, 출처 연결, 기존 시험 회귀 검사
```

용어 257개에 정의와 별도로 작동 원리를 설명하는 해설을 제공하며, 연결되는 계산·사례가 있으면 용어 안에서 풀이를 펼칠 수 있습니다.
원문 수입은 Python 3 표준 라이브러리만 사용하며 `scripts/import-tesat-html.py`가 담당합니다. 문항 수와 정답표가 맞지 않으면 빌드를 중단합니다.
용어·보강 설명의 편집 원본은 `src/data/tesat/concepts.psv`, `term-explanations.psv`, `applications.mjs`, `editorial.json`, `article-concepts.json`입니다.
`collect-tesat.py`는 공개 목록의 메타데이터를 수집하며 원문 검토용 임시 캐시는 `/tmp/tesat-editorial`에만 둡니다.
`map-tesat-concepts.py`는 이 임시 자료로 개념 연결 후보를 생성합니다. 다시 수집할 때에는 기간·제외 대상·연결을 검토해야 합니다.
회원 인증이 필요한 본문은 자동으로 우회하지 않고, 브라우저에서 확인한 메타데이터·개념만 `editorial.json`에 반영합니다.
정기 자동 수집·새 글 자동 반영·기기 간 동기화·실제 기출 2~3회 확보는 포함하지 않습니다.

## 개발 명령

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # 타입체크 + 프로덕션 빌드(dist/)
```

## 문제은행 데이터 파이프라인

문제은행은 자격증별로 디렉토리가 분기됩니다(`<cert>` = certId).
`pdf/<cert>/*.pdf` 에서 추출·구성합니다.

1. `python3 scripts/extract.py <cert>` — PDF에서 회차별 텍스트·정답키·삽입 이미지를 추출
   (`scripts/raw/<cert>/`, `public/figures/<cert>/<회차>/`). pypdf[image] 필요. `<cert>` 생략 시 `network_2`.
2. 회차별 문항을 `src/data/exams/<cert>/<회차>.json` 으로 구성(문제·보기·정답·해설·이미지 매핑).
3. `npm run build-bank` — 모든 자격증의 회차 JSON을 병합·검증해 `src/data/<cert>/questions.json` 생성
   (문항 수·과목별 개수·보기 4개·정답 인덱스·이미지 파일 존재 검증). 회차가 없는 자격증은 빈 문제은행을 만듭니다.

`network_2_practical` 은 PDF가 아니라 블로그 복원 포스팅을 근거로 직접 작성한 회차 JSON(`blog01~04.json`)이므로
`extract.py` 단계 없이 2~3단계만 거칩니다.

### 문항 JSON 형식

4지선다와 주관식 두 가지를 한 회차 파일에 섞어 쓸 수 있습니다(`type` 생략 시 4지선다).

```jsonc
// 4지선다
{ "id": "...", "exam": "...", "subject": "...", "number": 1,
  "question": "...", "options": ["보기1","보기2","보기3","보기4"], "answerIndex": 2,
  "explanation": "..." }

// 주관식(단답형)
{ "id": "...", "exam": "...", "subject": "...", "number": 2, "type": "short",
  "question": "...",
  "answers": ["df"],          // 허용 정답. 첫 번째가 대표 정답으로 표시된다
  "caseSensitive": true,      // 생략 시 false. 리눅스 명령어처럼 대소문자를 따질 때만 true
  "placeholder": "명령어만 입력",
  "explanation": "..." }
```

채점은 앞뒤 공백을 없애고 내부 공백을 한 칸으로 줄인 뒤 `answers` 중 하나와 일치하면 정답입니다
(`caseSensitive` 가 아니면 대소문자 무시).

### 암기카드 JSON 형식

실기 암기카드는 `src/data/flashcards/network_2_practical.json` 배열에 추가합니다. `subject`는
`certs.config.json`의 과목 key를 사용하지만, 출제할 때는 과목별 정원이나 필터 없이 전체 카드를 섞습니다.

```jsonc
{
  "id": "practical-card-001", // 덱 안에서 중복되지 않는 고유값
  "subject": "term",          // term | ip | linux | router
  "prompt": "앞면에 표시할 질문",
  "answers": ["대표 정답", "다른 표기"], // 첫 항목을 크게 표시
  "explanation": "정답과 함께 볼 설명"
}
```

새 자격증(예: adsp) 추가 절차: `src/data/certs.config.json` 에 정의 추가 → `pdf/<cert>/` 에 PDF 넣고
`extract.py <cert>` → `src/data/exams/<cert>/*.json` 작성 → `build-bank` 로 검증.

> 정답은 각 PDF 하단 정답키 기준이며, 해설은 별도로 작성된 것입니다.
> `scripts/verify-answers.mjs` 는 네트워크관리사(network_2) PDF 원문 대조 전용 검증 도구입니다.

### ADsP 요약 학습 데이터

ADsP는 기출문제 대신 요약자료 기반 선행 학습을 먼저 제공합니다.

- `src/data/adsp/guide.ts`: 14일 일정, 12개 개념 모듈, 시험 함정 교정
- `src/data/adsp/intro.ts`: 핵심요약과 대응하는 12장 입문서. 소주제 목차, 설명·생활 예시·계산 과정, 비교표·결과표·성능 곡선, 시험 포인트, 확인 질문·해설을 일반 화면과 뉴스형 화면에서 공유
- `docs/adsp-intro-sources.md`: 입문서 보강 시 확인한 캡처 자료와 개념 검증 출처
- `src/data/adsp/flashcards.tsv`: 암기카드 원본 145장
- `src/data/flashcards/adsp.json`: 웹앱에서 사용하는 생성본
- `npm run build-adsp-study`: TSV 원본에서 카드 JSON 재생성

## 기출 자료(분야별 링크) 파이프라인

문제로 내기 어려운 유형(케이블 제작·NOS 서버 설정·라우터 실습 등)은 원문 링크로만 정리하고
앱의 **기출 자료** 화면에서 검색·열람합니다.

1. `docs/<certId>-links.md` 를 사람이 직접 작성·수정합니다(원본이자 GitHub 에서 바로 읽히는 문서).
2. `npm run build-refs` — 이 마크다운을 파싱해 `src/data/refs/<certId>.json` 생성.
   `src/data/refs.ts` 에 import 를 추가하면 해당 자격증 시작 화면에 버튼이 자동으로 노출됩니다.

마크다운 형식은 아래 구조만 지키면 됩니다.

```md
# 문서 제목
출처: [블로그 이름](https://...)
문서 설명 문단

## 1. 대분류
대분류 설명 문단

### 소분류 (12편)
- [글 제목](https://...) `2026.7.7`
```

## GitHub Pages 배포

1. 이 디렉터리를 GitHub 레포로 푸시합니다(레포명은 자유).
2. 레포 **Settings → Pages → Build and deployment → Source** 를 **GitHub Actions** 로 설정.
3. `main` 브랜치에 푸시하면 `.github/workflows/deploy.yml` 이 빌드 후 Pages에 배포합니다.
   - 워크플로가 레포명을 읽어 `base` 경로(`/<repo>/`)를 자동 주입하므로 별도 설정이 필요 없습니다.
   - 사용자/조직 페이지(`<id>.github.io`)로 배포하려면 워크플로의 `BASE_PATH` 를 `/` 로 두세요.
   - 라우팅은 HashRouter라 하위 경로/새로고침에서도 404 없이 동작합니다.

배포 후 주소: <a href="https://city-kim.github.io/certification-test/" target="_blank" rel="noopener noreferrer">https://city-kim.github.io/certification-test/</a>
