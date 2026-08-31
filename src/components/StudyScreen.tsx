import { useMemo, useState } from "react";
import type { CertConfig } from "../lib/certs";
import { subjectLabel } from "../lib/certs";
import { questionAnswer } from "../lib/quiz";
import type { Question } from "../lib/types";
import { isShort } from "../lib/types";
import { figureUrl, getBank } from "../data/questions";

interface Props {
  cert: CertConfig;
  onBack: () => void;
}

/**
 * 시험을 치르지 않고 문제은행 전체를 정답·해설과 함께 훑어보는 학습 화면.
 * "정답 가리기"를 켜면 문항별로 눌러서 확인하는 셀프 테스트가 된다.
 */
export default function StudyScreen({ cert, onBack }: Props) {
  const bank = getBank(cert.id);

  const [subject, setSubject] = useState<string | null>(null);
  const [hideAnswers, setHideAnswers] = useState(false);
  /** 정답 가리기 모드에서 사용자가 열어본 문항 id */
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  /** 회차·번호 순으로 정렬해 원본 시험지와 같은 흐름으로 읽히게 한다. */
  const items = useMemo(() => {
    const list = subject ? bank.filter((q) => q.subject === subject) : bank;
    return [...list].sort(
      (a, b) => a.exam.localeCompare(b.exam) || a.number - b.number,
    );
  }, [bank, subject]);

  function toggleHide() {
    setHideAnswers((h) => !h);
    setRevealed(new Set());
  }

  return (
    <div className="screen study">
      <header className="page-head">
        <button className="link" onClick={onBack}>
          ← 홈
        </button>
        <h1>정답·해설 모아보기</h1>
        <button className="link" onClick={toggleHide}>
          {hideAnswers ? "정답 보이기" : "정답 가리기"}
        </button>
      </header>

      <div className="chip-row">
        <button
          className={`chip ${subject === null ? "on" : ""}`}
          onClick={() => setSubject(null)}
        >
          전체 {bank.length}
        </button>
        {cert.subjects.map((s) => (
          <button
            key={s.key}
            className={`chip ${subject === s.key ? "on" : ""}`}
            onClick={() => setSubject(s.key)}
          >
            {s.label} {bank.filter((q) => q.subject === s.key).length}
          </button>
        ))}
      </div>

      <p className="muted small">
        {subject ? subjectLabel(cert, subject) : "전체"} {items.length}문항
        {hideAnswers && " · 문항을 눌러 정답을 확인하세요"}
      </p>

      {items.map((q, i) => (
        <StudyItem
          key={q.id}
          cert={cert}
          question={q}
          index={i + 1}
          showAnswer={!hideAnswers || revealed.has(q.id)}
          onReveal={() => setRevealed((prev) => new Set(prev).add(q.id))}
        />
      ))}
    </div>
  );
}

function StudyItem({
  cert,
  question,
  index,
  showAnswer,
  onReveal,
}: {
  cert: CertConfig;
  question: Question;
  index: number;
  showAnswer: boolean;
  onReveal: () => void;
}) {
  const short = isShort(question);
  const answer = questionAnswer(question);

  return (
    <article className="card study-item">
      <div className="review-head">
        <span className="review-num">{index}</span>
        <span className="subject-tag small">
          {subjectLabel(cert, question.subject)}
        </span>
        {short && <span className="type-tag short">단답형</span>}
      </div>
      <p className="q-text">{question.question}</p>
      {question.figure && (
        <img className="q-figure" src={figureUrl(question.figure)} alt="문제 그림" />
      )}

      {/* 4지선다는 보기를 함께 보여줘야 문제가 성립한다. 정답 가리기 중에는 표시만 뺀다. */}
      {!short && (
        <ul className="options review">
          {question.options.map((opt, oi) => (
            <li key={oi}>
              <div
                className={`option static ${showAnswer && oi === question.answerIndex ? "correct" : ""}`}
              >
                <span className="opt-marker">{"①②③④⑤"[oi]}</span>
                <span className="opt-text">{opt}</span>
                {showAnswer && oi === question.answerIndex && (
                  <span className="badge ok">정답</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {showAnswer ? (
        <div className="explanation">
          {/* 4지선다는 위 보기에 정답이 이미 표시되므로 단답형에만 정답 줄을 둔다. */}
          {short && (
            <>
              <strong>정답</strong>
              <p className="study-answer">{answer}</p>
              {question.answers.length > 1 && (
                <p className="muted small">
                  허용 표기: {question.answers.slice(1).join(" · ")}
                </p>
              )}
            </>
          )}
          <strong>해설</strong>
          <p>{question.explanation}</p>
        </div>
      ) : (
        <button className="btn ghost small-btn" onClick={onReveal}>
          정답 확인
        </button>
      )}
    </article>
  );
}
