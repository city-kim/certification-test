import { useState } from "react";
import type { ExamItem } from "../lib/types";
import { figureUrl } from "../data/questions";
import type { CertConfig } from "../lib/certs";
import { subjectLabel } from "../lib/certs";

interface Props {
  cert: CertConfig;
  items: ExamItem[];
  onSubmit: (items: ExamItem[]) => void;
  onQuit: () => void;
}

export default function QuizScreen({ cert, items, onSubmit, onQuit }: Props) {
  const [list, setList] = useState<ExamItem[]>(items);
  const [idx, setIdx] = useState(0);

  const current = list[idx];
  const total = list.length;
  const answeredCount = list.filter((it) => it.selected !== null).length;
  const isLast = idx === total - 1;

  function select(optionIdx: number) {
    setList((prev) =>
      prev.map((it, i) => (i === idx ? { ...it, selected: optionIdx } : it)),
    );
  }

  function go(delta: number) {
    setIdx((i) => Math.min(Math.max(i + delta, 0), total - 1));
    window.scrollTo(0, 0);
  }

  function handleSubmit() {
    const unanswered = total - answeredCount;
    if (unanswered > 0) {
      const ok = window.confirm(
        `아직 ${unanswered}문항이 미응답입니다. 제출할까요?`,
      );
      if (!ok) return;
    }
    onSubmit(list);
  }

  return (
    <div className="screen quiz">
      <header className="quiz-top">
        <button className="link" onClick={onQuit}>
          나가기
        </button>
        <div className="progress-wrap">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((idx + 1) / total) * 100}%` }}
            />
          </div>
          <span className="progress-text">
            {idx + 1} / {total}
          </span>
        </div>
      </header>

      <div className="q-meta">
        <span className="subject-tag">{subjectLabel(cert, current.question.subject)}</span>
        <span className="answered-text">응답 {answeredCount}/{total}</span>
      </div>

      <div className="q-body">
        <p className="q-text">
          <span className="q-num">{idx + 1}.</span> {current.question.question}
        </p>
        {current.question.figure && (
          <img
            className="q-figure"
            src={figureUrl(current.question.figure)}
            alt="문제 그림"
          />
        )}
        <ul className="options">
          {current.options.map((opt, i) => (
            <li key={i}>
              <button
                className={`option ${current.selected === i ? "selected" : ""}`}
                onClick={() => select(i)}
              >
                <span className="opt-marker">{"①②③④"[i]}</span>
                <span className="opt-text">{opt}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="actions sticky two">
        <button className="btn ghost" onClick={() => go(-1)} disabled={idx === 0}>
          이전
        </button>
        {isLast ? (
          <button className="btn primary" onClick={handleSubmit}>
            제출하기
          </button>
        ) : (
          <button className="btn primary" onClick={() => go(1)}>
            다음
          </button>
        )}
      </div>
    </div>
  );
}
