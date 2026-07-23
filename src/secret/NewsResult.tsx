import type { CertConfig } from "../lib/certs";
import type { ExamResult } from "../lib/quiz";

interface Props {
  cert: CertConfig;
  result: ExamResult;
  onRetry: () => void;
  onReview: () => void;
}

/** 채점 결과를 "이번 주 읽기 통계(digest)"처럼 위장해 보여준다. */
export default function NewsResult({ cert, result, onRetry, onReview }: Props) {
  return (
    <section className="gn-result">
      <a className="gn-back" onClick={onReview}>
        ‹ back to list
      </a>

      <h1 className="gn-article-title">Weekly Reading Digest</h1>
      <div className="gn-score-card">
        <div className={`gn-score ${result.passed ? "pass" : "fail"}`}>
          {result.score}
          <span className="gn-score-unit">pts</span>
        </div>
        <div className="gn-score-side">
          <div className={`gn-badge ${result.passed ? "pass" : "fail"}`}>
            {result.passed ? "PASS" : "FAIL"}
          </div>
          <div className="gn-score-sub">
            {result.correctCount} / {result.total} correct · pass ≥ {cert.passScore}
          </div>
        </div>
      </div>

      <ul className="gn-subject-stats">
        {result.subjects.map((s) => (
          <li key={s.key} className={s.passed ? "" : "sub-fail"}>
            <span className="gn-sub-name">{s.label}</span>
            <span className="gn-sub-bar">
              <span
                className="gn-sub-fill"
                style={{ width: `${s.total ? (s.correct / s.total) * 100 : 0}%` }}
              />
            </span>
            <span className="gn-sub-num">
              {s.correct}/{s.total}
            </span>
          </li>
        ))}
      </ul>

      {result.wrong.length > 0 && (
        <div className="gn-wrong">
          <h2 className="gn-wrong-title">틀린 코멘트 {result.wrong.length}건</h2>
          <ol className="gn-wrong-list">
            {result.wrong.map((it) => (
              <li key={it.question.id}>
                <p className="gn-wrong-q">{it.question.question}</p>
                <p className="gn-wrong-line ok">
                  정답 · {it.options[it.answerIndex]}
                </p>
                <p className="gn-wrong-line no">
                  내 선택 · {it.selected === null ? "미투표" : it.options[it.selected]}
                </p>
                <details className="gn-accordion small">
                  <summary>해설</summary>
                  <div className="gn-accordion-body">{it.question.explanation}</div>
                </details>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="gn-article-nav">
        <button className="gn-navbtn primary" onClick={onRetry}>
          Load new stories
        </button>
        <button className="gn-navbtn" onClick={onReview}>
          목록으로
        </button>
      </div>
    </section>
  );
}
