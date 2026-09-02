# 자격증 모바일 모의고사

### 🔗 바로 풀기 → <a href="https://city-kim.github.io/certification-test/" target="_blank" rel="noopener noreferrer">city-kim.github.io/certification-test</a>

여러 자격증을 **과목별 정원에 맞춰 매번 랜덤 출제**하는 모바일 웹 모의고사입니다.
React + Vite + React Router로 만든 정적 사이트라 GitHub Pages에서 서버 없이 동작합니다.

시작 화면에서 자격증을 고르면 해당 시험으로 분기합니다(HashRouter 기반, `/#/<certId>`).

| 자격증 | certId | 출제 구성 | 합격 기준 | 상태 |
| --- | --- | --- | --- | --- |
| 네트워크관리사 2급 | `network_2` | 50문항 — TCP/IP 17 · 네트워크 일반 10 · NOS 18 · 네트워크 운용기기 5 | 총점 60점 이상(과락 없음) | 문제은행 250 |
| 네트워크관리사 2급 **실기** | `network_2_practical` | 20문항 — 단답형·용어 10 · IP·서브넷 3 · 리눅스 4 · 라우터 3 | 총점 60점 이상(과락 없음) | 문제은행 80 (주관식 70) |
| 데이터분석 준전문가(ADsP) | `adsp` | 50문항 — 데이터 이해 10 · 데이터 분석 기획 10 · 데이터 분석 30 | 총점 60점 이상 · 과목별 40% 이상(과락) | 준비중(PDF 대기) |

- 매 시험마다 무작위 출제 + **보기 순서도 셔플**
- 결과: 총점/100·합격 판정, **과목별 점수·과락 표시**
- **기출 자료 화면** — 문제로 내지 않은 유형을 분야별 링크로 정리, 제목 검색 지원
- **주관식(단답형) 입력 채점** — 실기처럼 답을 직접 타이핑, 허용 표기 여러 개 인정, 리눅스 명령어는 대소문자까지 채점
- **실기 암기카드** — 과목 구분 없이 전체 카드를 랜덤 출제하고, 아는 카드와 다시 볼 카드를 나눠 반복 학습
- **틀린 문제 해설**(이미지 지문 포함) + **오답노트 localStorage 저장**(자격증별 분리)

> 실기(`network_2_practical`)는 [우진아빠의 네트워크 실무](https://tech-network.tistory.com/) 블로그의 실기 복원 포스팅을
> 근거로 만들었습니다. 실기가 원래 단답형이므로 **70문항은 답을 직접 입력하는 주관식**이고, 원문이 '옳지 않은 것을 고르시오'
> 형태였던 10문항만 4지선다로 두었습니다. 케이블 제작·NOS 서버 설정·라우터 실습·서브넷 계산처럼 직접 조작하거나 손으로
> 풀어야 하는 유형은 문제로 만들지 않고 [`docs/network_2_practical-links.md`](docs/network_2_practical-links.md) 에
> 분야별 링크(260편)로 정리해, 시작 화면의 **기출 자료** 버튼에서 바로 볼 수 있게 했습니다.

자격증 정의(과목·정원·합격/과락 기준)는 `src/data/certs.config.json` 한 곳에서 관리하며,
앱과 문제은행 빌드 스크립트가 이 파일을 공유합니다. 자격증을 추가하려면 여기에 항목을 넣으면 됩니다.

## 개발

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
