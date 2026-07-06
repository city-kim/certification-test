#!/usr/bin/env python3
"""PDF에서 회차별 텍스트 / 정답키 / 삽입 이미지를 추출한다.

자격증별로 디렉토리가 분기되어 있다. 대상 자격증은 인자로 지정한다(기본 network_2).
  사용: python3 scripts/extract.py [certId]

산출물(<cert> = 자격증 id):
  scripts/raw/<cert>/<exam>.txt            전체 텍스트(페이지 구분 포함)
  scripts/raw/<cert>/<exam>.answers.json   [정답인덱스 50개]  (① -> 0 ... ④ -> 3)
  scripts/raw/<cert>/<exam>.images.json    [{file, page, idx}]
  public/figures/<cert>/<exam>/imgNN.png   삽입 이미지(페이지 읽기 순서)

요구: pypdf[image] (pillow 포함). 격리 venv에서 실행.
"""
import glob
import json
import os
import re
import sys

import pypdf

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CERT = sys.argv[1] if len(sys.argv) > 1 else "network_2"
PDF_DIR = os.path.join(ROOT, "pdf", CERT)
RAW_DIR = os.path.join(ROOT, "scripts", "raw", CERT)
FIG_DIR = os.path.join(ROOT, "public", "figures", CERT)

CIRCLED = {"①": 0, "②": 1, "③": 2, "④": 3}


def parse_answer_key(full_text):
    """문서 말미의 정답키 영역에서 원문자 50개를 순서대로 추출."""
    # 마지막 안내문구 이후를 정답키 영역으로 본다.
    markers = ["확인하세요", "확인 하세요", "CBT 에서 확인", "CBT에서 확인"]
    start = -1
    for m in markers:
        i = full_text.rfind(m)
        if i > start:
            start = i
    tail = full_text[start:] if start >= 0 else full_text
    answers = [CIRCLED[c] for c in tail if c in CIRCLED]
    return answers


def main():
    os.makedirs(RAW_DIR, exist_ok=True)
    summary = []
    for pdf in sorted(glob.glob(os.path.join(PDF_DIR, "*.pdf"))):
        exam = os.path.splitext(os.path.basename(pdf))[0]
        reader = pypdf.PdfReader(pdf)

        # 1) 텍스트
        pages = [p.extract_text() for p in reader.pages]
        full_text = "\n\n===PAGE===\n\n".join(pages)
        with open(os.path.join(RAW_DIR, f"{exam}.txt"), "w") as f:
            f.write(full_text)

        # 2) 정답키
        answers = parse_answer_key(full_text)
        with open(os.path.join(RAW_DIR, f"{exam}.answers.json"), "w") as f:
            json.dump(answers, f, ensure_ascii=False)

        # 3) 이미지 (페이지 읽기 순서)
        out_dir = os.path.join(FIG_DIR, exam)
        os.makedirs(out_dir, exist_ok=True)
        images = []
        idx = 0
        for pi, page in enumerate(reader.pages):
            for im in page.images:
                idx += 1
                fname = f"img{idx:02d}.png"
                im.image.save(os.path.join(out_dir, fname))
                images.append({"file": f"figures/{CERT}/{exam}/{fname}", "page": pi, "idx": idx})
        with open(os.path.join(RAW_DIR, f"{exam}.images.json"), "w") as f:
            json.dump(images, f, ensure_ascii=False, indent=2)

        ok = len(answers) == 50
        summary.append((exam, len(reader.pages), len(answers), len(images), ok))
        print(f"{exam}: pages={len(reader.pages)} answers={len(answers)} "
              f"images={len(images)} answers_ok={ok}")

    bad = [s[0] for s in summary if not s[4]]
    if bad:
        print("WARNING 정답키 50개 아님:", bad)


if __name__ == "__main__":
    main()
