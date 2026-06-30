# 네트워크관리사 2급 모바일 모의고사

기출 PDF 5개 회차(250문항)에서 **과목별 정원에 맞춰 매번 랜덤 출제**하는 모바일 웹 모의고사입니다.
React + Vite로 만든 정적 사이트라 GitHub Pages에서 서버 없이 동작합니다.

- 출제 구성(50문항): **TCP/IP 17 · 네트워크 일반 10 · NOS 18 · 네트워크 운용기기 5**
- 매 시험마다 무작위 출제 + **보기 순서도 셔플**
- 결과: 총점/100·합격 판정, **과목별 점수·과락 표시**
- **틀린 문제 해설**(이미지 지문 포함) + **오답노트 localStorage 저장**
- 합격 기준: 총점 60점 이상이며 모든 과목 40% 이상(과락 없음)

## 개발

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # 타입체크 + 프로덕션 빌드(dist/)
```

## 문제은행 데이터 파이프라인

문제은행은 `pdf/network/*.pdf` 에서 추출·구성합니다.

1. `python3 scripts/extract.py` — PDF에서 회차별 텍스트·정답키·삽입 이미지를 추출
   (`scripts/raw/`, `public/figures/<회차>/`). pypdf[image] 필요.
2. 회차별 문항을 `src/data/exams/<회차>.json` 으로 구성(문제·보기·정답·해설·이미지 매핑).
3. `npm run build-bank` — 회차 JSON을 병합·검증해 `src/data/questions.json` 생성
   (문항 수·과목별 개수·보기 4개·정답 인덱스·이미지 파일 존재 검증).

> 정답은 각 PDF 하단 정답키 기준이며, 해설은 별도로 작성된 것입니다.

## GitHub Pages 배포

1. 이 디렉터리를 GitHub 레포로 푸시합니다(레포명은 자유).
2. 레포 **Settings → Pages → Build and deployment → Source** 를 **GitHub Actions** 로 설정.
3. `main` 브랜치에 푸시하면 `.github/workflows/deploy.yml` 이 빌드 후 Pages에 배포합니다.
   - 워크플로가 레포명을 읽어 `base` 경로(`/<repo>/`)를 자동 주입하므로 별도 설정이 필요 없습니다.
   - 사용자/조직 페이지(`<id>.github.io`)로 배포하려면 워크플로의 `BASE_PATH` 를 `/` 로 두세요.

배포 후 주소: `https://<사용자>.github.io/<repo>/`
