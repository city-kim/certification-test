import type { ExamResult } from "../lib/quiz";
import type { CertConfig } from "../lib/certs";
import { subjectLabel } from "../lib/certs";
import ReviewItem from "./ReviewItem";
import type { ReviewData } from "./ReviewItem";

interface Props {
  cert: CertConfig;
  result: ExamResult;
  onRetry: () => void;
  onHome: () => void;
}

export default function ResultScreen({ cert, result, onRetry, onHome }: Props) {
  const hasFail = cert.subjectPassRatio > 0;
  const criteria = hasFail
    ? `합격 기준: 총점 ${cert.passScore}점 이상 · 과목별 ${Math.round(
        cert.subjectPassRatio * 100,
      )}% 이상(과락)`
    : `합격 기준: 총점 ${cert.passScore}점 이상 (과락 없음)`;

  const reviews: ReviewData[] = result.wrong.map((it) => ({
    subjectLabel: subjectLabel(cert, it.question.subject),
    question: it.question.question,
    figure: it.question.figure,
    options: it.options,
    correctText: it.options[it.answerIndex],
    selectedText: it.selected === null ? null : it.options[it.selected],
    explanation: it.question.explanation,
    hintUsed: it.hintUsed,
  }));

  const hintCount = result.items.filter((it) => it.hintUsed).length;

  return (
    <div className="screen result">
      <section className={`score-card ${result.passed ? "pass" : "fail"}`}>
        <div className="score-big">{result.score}점</div>
        <div className="verdict">{result.passed ? "합격" : "불합격"}</div>
        <div className="muted">
          {result.correctCount} / {result.total} 정답
        </div>
        {hintCount > 0 && (
          <div className="muted small">💡 힌트 사용 {hintCount}문항 (점수에는 반영되지 않음)</div>
        )}
      </section>

      <section className="card">
        <h2>과목별 결과</h2>
        <table className="subject-table">
          <thead>
            <tr>
              <th>과목</th>
              <th>정답</th>
              <th>정답률</th>
              {hasFail && <th>과락</th>}
            </tr>
          </thead>
          <tbody>
            {result.subjects.map((s) => {
              const ratio = s.total ? Math.round((s.correct / s.total) * 100) : 0;
              return (
                <tr key={s.key}>
                  <td>{s.label}</td>
                  <td>
                    {s.correct}/{s.total}
                  </td>
                  <td>{ratio}%</td>
                  {hasFail && (
                    <td className={s.passed ? "pass" : "fail"}>
                      {s.passed ? "통과" : "과락"}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="muted small">{criteria}</p>
      </section>

      <section className="card">
        <h2>틀린 문제 ({result.wrong.length})</h2>
        {reviews.length === 0 ? (
          <p className="muted">틀린 문제가 없습니다. 완벽합니다! 🎉</p>
        ) : (
          reviews.map((r, i) => <ReviewItem key={i} data={{ ...r, index: i + 1 }} />)
        )}
      </section>

      <div className="actions sticky two">
        <button className="btn ghost" onClick={onHome}>
          홈으로
        </button>
        <button className="btn primary" onClick={onRetry}>
          새 시험 시작
        </button>
      </div>
    </div>
  );
}
