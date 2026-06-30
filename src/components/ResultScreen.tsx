import type { ExamResult } from "../lib/quiz";
import { SUBJECTS } from "../lib/types";
import ReviewItem from "./ReviewItem";
import type { ReviewData } from "./ReviewItem";

interface Props {
  result: ExamResult;
  onRetry: () => void;
  onHome: () => void;
}

const subjectLabel = (key: string) =>
  SUBJECTS.find((s) => s.key === key)?.label ?? key;

export default function ResultScreen({ result, onRetry, onHome }: Props) {
  const reviews: ReviewData[] = result.wrong.map((it) => ({
    subjectLabel: subjectLabel(it.question.subject),
    question: it.question.question,
    figure: it.question.figure,
    options: it.options,
    correctText: it.options[it.answerIndex],
    selectedText: it.selected === null ? null : it.options[it.selected],
    explanation: it.question.explanation,
  }));

  return (
    <div className="screen result">
      <section className={`score-card ${result.passed ? "pass" : "fail"}`}>
        <div className="score-big">{result.score}점</div>
        <div className="verdict">{result.passed ? "합격" : "불합격"}</div>
        <div className="muted">
          {result.correctCount} / {result.total} 정답
        </div>
      </section>

      <section className="card">
        <h2>과목별 결과</h2>
        <table className="subject-table">
          <thead>
            <tr>
              <th>과목</th>
              <th>정답</th>
              <th>정답률</th>
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
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="muted small">합격 기준: 총점 60점 이상 (과락 없음)</p>
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
