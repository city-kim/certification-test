# 자격증 모바일 모의고사

### 🔗 바로 풀기 → <a href="https://city-kim.github.io/certification-test/" target="_blank" rel="noopener noreferrer">city-kim.github.io/certification-test</a>

여러 자격증을 **과목별 정원에 맞춰 매번 랜덤 출제**하는 모바일 웹 모의고사입니다.
React + Vite + React Router로 만든 정적 사이트라 GitHub Pages에서 서버 없이 동작합니다.

시작 화면에서 자격증을 고르면 해당 시험으로 분기합니다(HashRouter 기반, `/#/<certId>`).

| 자격증 | certId | 출제 구성(50문항) | 합격 기준 | 상태 |
| --- | --- | --- | --- | --- |
| 네트워크관리사 2급 | `network_2` | TCP/IP 17 · 네트워크 일반 10 · NOS 18 · 네트워크 운용기기 5 | 총점 60점 이상(과락 없음) | 문제은행 250 |
| 데이터분석 준전문가(ADsP) | `adsp` | 데이터 이해 10 · 데이터 분석 기획 10 · 데이터 분석 30 | 총점 60점 이상 · 과목별 40% 이상(과락) | 준비중(PDF 대기) |

- 매 시험마다 무작위 출제 + **보기 순서도 셔플**
- 결과: 총점/100·합격 판정, **과목별 점수·과락 표시**
- **틀린 문제 해설**(이미지 지문 포함) + **오답노트 localStorage 저장**(자격증별 분리)

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

새 자격증(예: adsp) 추가 절차: `src/data/certs.config.json` 에 정의 추가 → `pdf/<cert>/` 에 PDF 넣고
`extract.py <cert>` → `src/data/exams/<cert>/*.json` 작성 → `build-bank` 로 검증.

> 정답은 각 PDF 하단 정답키 기준이며, 해설은 별도로 작성된 것입니다.
> `scripts/verify-answers.mjs` 는 네트워크관리사(network_2) PDF 원문 대조 전용 검증 도구입니다.

## GitHub Pages 배포

1. 이 디렉터리를 GitHub 레포로 푸시합니다(레포명은 자유).
2. 레포 **Settings → Pages → Build and deployment → Source** 를 **GitHub Actions** 로 설정.
3. `main` 브랜치에 푸시하면 `.github/workflows/deploy.yml` 이 빌드 후 Pages에 배포합니다.
   - 워크플로가 레포명을 읽어 `base` 경로(`/<repo>/`)를 자동 주입하므로 별도 설정이 필요 없습니다.
   - 사용자/조직 페이지(`<id>.github.io`)로 배포하려면 워크플로의 `BASE_PATH` 를 `/` 로 두세요.
   - 라우팅은 HashRouter라 하위 경로/새로고침에서도 404 없이 동작합니다.

배포 후 주소: <a href="https://city-kim.github.io/certification-test/" target="_blank" rel="noopener noreferrer">https://city-kim.github.io/certification-test/</a>
