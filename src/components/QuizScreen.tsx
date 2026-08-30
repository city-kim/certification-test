import { useState } from "react";
import type { ExamItem } from "../lib/types";
import { isShort } from "../lib/types";
import { isAnswered } from "../lib/quiz";
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
  const answeredCount = list.filter(isAnswered).length;
  const isLast = idx === total - 1;
  // 주관식이면 좁혀진 문항, 아니면 null (TS 내로잉을 렌더 트리 전체에서 유지하기 위함)
  const shortQ = isShort(current.question) ? current.question : null;
  const answered = isAnswered(current);

  function patch(changes: Partial<ExamItem>) {
    setList((prev) => prev.map((it, i) => (i === idx ? { ...it, ...changes } : it)));
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
        <span className={`type-tag ${shortQ ? "short" : "mcq"}`}>
          {shortQ ? "단답형" : "선택형"}
        </span>
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

        {shortQ ? (
          <div className="short-zone">
            <input
              key={current.question.id}
              className="short-input"
              type="text"
              value={current.input}
              onChange={(e) => patch({ input: e.target.value })}
              placeholder={shortQ.placeholder ?? "답을 입력하세요"}
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint={isLast ? "done" : "next"}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isLast) go(1);
              }}
            />
            <p className="muted small">
              {shortQ.caseSensitive
                ? "대소문자를 구분합니다. 실제 시험처럼 정확히 입력하세요."
                : "대소문자는 구분하지 않습니다."}
            </p>
          </div>
        ) : (
          <ul className="options">
            {current.options.map((opt, i) => (
              <li key={i}>
                <button
                  className={`option ${current.selected === i ? "selected" : ""}`}
                  onClick={() => patch({ selected: i })}
                >
                  <span className="opt-marker">{"①②③④"[i]}</span>
                  <span className="opt-text">{opt}</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="hint-zone">
          {current.hintUsed ? (
            <div className="explanation">
              <strong>해설</strong>
              {shortQ ? (
                <>
                  <p className="hint-answer">정답: {shortQ.answers[0]}</p>
                  {shortQ.answers.length > 1 && (
                    <p className="muted small">
                      허용 표기: {shortQ.answers.join(" · ")}
                    </p>
                  )}
                </>
              ) : (
                <p className="hint-answer">
                  정답: {"①②③④"[current.answerIndex]} {current.options[current.answerIndex]}
                </p>
              )}
              <p>{current.question.explanation}</p>
            </div>
          ) : (
            <>
              <button className="btn hint" onClick={() => patch({ hintUsed: true })} disabled={!answered}>
                💡 힌트 보기
              </button>
              {!answered && (
                <p className="muted small">
                  {shortQ
                    ? "답을 먼저 입력하면 해설을 볼 수 있습니다."
                    : "보기를 먼저 선택하면 해설을 볼 수 있습니다."}
                </p>
              )}
            </>
          )}
        </div>
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
