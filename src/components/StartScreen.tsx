import { SUBJECTS, TOTAL_QUESTIONS } from "../lib/types";
import { getHistory, getWrongBook } from "../lib/storage";

interface Props {
  bankSize: number;
  onStart: () => void;
  onOpenWrongBook: () => void;
}

export default function StartScreen({ bankSize, onStart, onOpenWrongBook }: Props) {
  const history = getHistory();
  const last = history[0];
  const wrongCount = getWrongBook().length;

  return (
    <div className="screen start">
      <header className="hero">
        <h1>네트워크관리사 2급</h1>
        <p className="sub">모바일 모의고사 · 매회 랜덤 출제</p>
      </header>

      <section className="card">
        <h2>출제 구성 ({TOTAL_QUESTIONS}문항)</h2>
        <ul className="subject-list">
          {SUBJECTS.map((s) => (
            <li key={s.key}>
              <span>{s.label}</span>
              <span className="count">{s.count}문항</span>
            </li>
          ))}
        </ul>
        <p className="muted">문제은행 {bankSize}문항에서 무작위 출제 · 보기 순서도 매번 섞임</p>
      </section>

      {last && (
        <section className="card">
          <h2>최근 기록</h2>
          <p className="last-record">
            <strong className={last.passed ? "pass" : "fail"}>
              {last.score}점 {last.passed ? "합격" : "불합격"}
            </strong>
            <span className="muted"> · {last.correctCount}/{last.total} 정답</span>
          </p>
        </section>
      )}

      <div className="actions sticky">
        <button className="btn primary" onClick={onStart}>
          시험 시작
        </button>
        <button className="btn ghost" onClick={onOpenWrongBook}>
          오답노트 {wrongCount > 0 ? `(${wrongCount})` : ""}
        </button>
      </div>
    </div>
  );
}
