#!/usr/bin/env python3
"""ADsP 복원 PDF(정답 파란색 표기)에서 검증 가능한 4지선다만 추출한다."""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

import pdfplumber


CIRCLED = "①②③④"
QUESTION_RE = re.compile(r"^(\d+)\.\s*(.*)$")
ITEM_RE = re.compile(r"^([가-마])\.\s*(.*)$")

# 표·그래프가 본문 텍스트로 온전히 복원되지 않았거나 같은 문항이 중복된 경우.
# 화면에서 단서 없이 출제되는 것보다 제외하는 편이 안전하다.
MANUAL_EXCLUDE = {
    ("44", 25), ("44", 28), ("44", 31), ("44", 33), ("44", 43), ("44", 46),
    ("45", 44),
    ("46", 24),
    ("47", 23), ("47", 26), ("47", 27), ("47", 46),
    ("48", 29),
    ("49", 26), ("49", 41), ("49", 44), ("49", 48),
}


def is_blue(color: object) -> bool:
    if not isinstance(color, tuple) or len(color) < 3:
        return False
    r, g, b = (float(color[0]), float(color[1]), float(color[2]))
    return b > 0.6 and b > r + 0.3


def page_lines(page, x_min: float, x_max: float) -> list[dict]:
    words = [
        w
        for w in page.extract_words(extra_attrs=["non_stroking_color"])
        if x_min <= (w["x0"] + w["x1"]) / 2 < x_max
    ]
    grouped: list[list] = []
    for word in sorted(words, key=lambda w: (w["top"], w["x0"])):
        if not grouped or abs(grouped[-1][0]["top"] - word["top"]) > 2.2:
            grouped.append([word])
        else:
            grouped[-1].append(word)

    lines = []
    for group in grouped:
        group.sort(key=lambda w: w["x0"])
        text = " ".join(w["text"] for w in group).strip()
        lines.append({"text": text, "words": group})
    return lines


def useful(text: str) -> bool:
    if not text or text in {"-", "1 -", "2 -", "3 -", "4 -", "5 -"}:
        return False
    lowered = text.lower()
    return not (
        lowered.startswith("adsp ")
        or lowered.startswith("기출 복원")
        or "꿈꾸는라이언" in text
        or re.match(r"^[123]과목\.", text)
    )


def blocks(path: Path) -> list[dict]:
    result: list[dict] = []
    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages, start=1):
            for column, (x0, x1) in enumerate(((0, page.width / 2), (page.width / 2, page.width))):
                current = None
                for line in page_lines(page, x0, x1):
                    text = line["text"]
                    if not useful(text):
                        continue
                    match = QUESTION_RE.match(text)
                    if match:
                        if current:
                            result.append(current)
                        current = {
                            "printed": int(match.group(1)),
                            "stem": [match.group(2)],
                            "lines": [],
                            "page": page_index,
                            "column": column,
                        }
                    elif current:
                        current["lines"].append(line)
                if current:
                    result.append(current)
    return result


def option_segments(line: dict) -> list[tuple[int, str, bool]]:
    segments: list[tuple[int, list[str], bool]] = []
    for word in line["words"]:
        text = word["text"]
        positions = [(i, CIRCLED.index(ch)) for i, ch in enumerate(text) if ch in CIRCLED]
        if positions:
            for pos_index, (start, option_index) in enumerate(positions):
                end = positions[pos_index + 1][0] if pos_index + 1 < len(positions) else len(text)
                piece = text[start + 1 : end].strip()
                segments.append((option_index, [piece] if piece else [], is_blue(word["non_stroking_color"])))
        elif segments:
            segments[-1][1].append(text)
            segments[-1] = (segments[-1][0], segments[-1][1], segments[-1][2] or is_blue(word["non_stroking_color"]))
    return [(idx, " ".join(parts).strip(), blue) for idx, parts, blue in segments]


def clean(text: str) -> str:
    text = re.sub(r"\s+", " ", text).strip()
    text = text.replace(" ,", ",").replace(" .", ".").replace(" :", ":")
    return text


def clean_option(text: str) -> str:
    # 일부 복원본은 마지막 보기 뒤에 별표/※로 계산 해설을 붙여 두었다.
    # 보기와 정답 단서를 분리해 시험 화면에 해설이 새지 않게 한다.
    return clean(re.split(r"\s*(?:※|★|\*\s*(?=[A-Za-z가-힣]))", text, maxsplit=1)[0])


def parse_question(block: dict, exam: str, sequence: int) -> tuple[dict | None, str | None]:
    stem = list(block["stem"])
    supplements: list[str] = []
    options: dict[int, str] = {}
    answers: set[int] = set()
    active_option: int | None = None
    active_supplement: int | None = None

    for line in block["lines"]:
        segments = option_segments(line)
        if segments:
            active_supplement = None
            for idx, text, blue in segments:
                options[idx] = clean((options.get(idx, "") + " " + text).strip())
                active_option = idx
                if blue:
                    answers.add(idx)
            continue

        text = clean(line["text"])
        item_match = ITEM_RE.match(text)
        if item_match:
            supplements.append(text)
            active_supplement = len(supplements) - 1
            active_option = None
        elif active_supplement is not None:
            supplements[active_supplement] = clean(supplements[active_supplement] + " " + text)
        elif active_option is not None:
            options[active_option] = clean(options[active_option] + " " + text)
            if any(is_blue(w["non_stroking_color"]) for w in line["words"]):
                answers.add(active_option)
        else:
            stem.append(text)

    question = clean(" ".join(stem + supplements))
    option_list = [clean_option(options.get(i, "")) for i in range(4)]
    combined = " ".join([question] + option_list)

    if "미복원" in combined:
        return None, "미복원 표기"
    if set(options) != {0, 1, 2, 3}:
        return None, f"보기 부족({sorted(options)})"
    if len(answers) != 1:
        return None, f"정답 식별 실패({sorted(answers)})"
    if any(not option for option in option_list) or len(set(option_list)) != 4:
        return None, "빈 보기 또는 중복 보기"

    normalized_stem = re.sub(r"\W", "", question)
    for option in option_list:
        normalized_option = re.sub(r"\W", "", option)
        if len(normalized_stem) >= 16 and normalized_option.startswith(normalized_stem[:16]):
            return None, "문제 문장이 보기로 중복"

    answer = next(iter(answers))
    if sequence <= 10:
        subject = "understanding"
    elif sequence <= 20:
        subject = "planning"
    else:
        subject = "analysis"

    wrong_word = any(word in question for word in ("옳지 않은", "틀린", "아닌 것은", "적절하지 않은", "잘못"))
    if wrong_word:
        explanation = f"정답은 {CIRCLED[answer]}입니다. ‘{option_list[answer]}’이(가) 문제에서 요구한 잘못된 설명 또는 예외에 해당합니다."
    else:
        explanation = f"정답은 {CIRCLED[answer]}입니다. ‘{option_list[answer]}’이(가) 문제의 조건과 핵심 개념에 부합합니다."

    return {
        "id": f"adsp-{exam}-{sequence:02d}",
        "exam": exam,
        "subject": subject,
        "number": sequence,
        "question": question,
        "options": option_list,
        "answerIndex": answer,
        "explanation": explanation,
    }, None


def apply_manual_fix(question: dict) -> None:
    if question["exam"] == "49" and question["number"] == 15:
        question["question"] = "위험을 최소화하기 위해 단계마다 위험 분석 과정을 포함하며, 위험 부담이 큰 대규모 프로젝트에 적합한 소프트웨어 개발 모델은?"
        question["options"] = [
            "폭포수 모형(Waterfall Model)",
            "프로토타이핑 모형(Prototyping Model)",
            "나선형 모형(Spiral Model)",
            "KDD 모형",
        ]
        question["explanation"] = "정답은 ③입니다. 나선형 모형은 반복 단계마다 위험을 분석하므로 위험 부담이 큰 대규모 프로젝트에 적합합니다."


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("pdfs", type=Path, nargs="+")
    args = parser.parse_args()
    args.output.mkdir(parents=True, exist_ok=True)

    for path in args.pdfs:
        match = re.search(r"ADsP\s+(\d+)회", path.name)
        if not match:
            raise SystemExit(f"회차를 파일명에서 찾지 못했습니다: {path}")
        exam = match.group(1)
        parsed_blocks = blocks(path)
        questions = []
        skipped = []
        expected = 1
        for block in parsed_blocks:
            printed = block["printed"]
            number = printed if printed >= expected else expected
            question, reason = parse_question(block, exam, number)
            if question and (exam, number) in MANUAL_EXCLUDE:
                question, reason = None, "표·그래프 단서 불완전 또는 중복"
            if question:
                apply_manual_fix(question)
                questions.append(question)
                expected = number + 1
            else:
                skipped.append((number, printed, reason))
                # 실제 미복원 문항은 번호를 소비하지만, 보기 속 숫자를 문항으로
                # 잘못 잡은 블록은 다음 문항 번호에 영향을 주지 않는다.
                if printed >= expected:
                    expected = printed + 1

        target = args.output / f"{exam}.json"
        target.write_text(json.dumps(questions, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        counts = {key: sum(q["subject"] == key for q in questions) for key in ("understanding", "planning", "analysis")}
        print(f"{exam}회: 블록 {len(parsed_blocks)}, 채택 {len(questions)}, 과목별 {counts}")
        if skipped:
            print("  제외:", ", ".join(f"{seq}(원문 {printed}: {reason})" for seq, printed, reason in skipped))


if __name__ == "__main__":
    main()
