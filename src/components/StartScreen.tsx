import { Link } from "react-router-dom";
import type { CertConfig } from "../lib/certs";
import { totalQuestions } from "../lib/certs";
import { getHistory, getWrongBook } from "../lib/storage";

interface Props {
  cert: CertConfig;
  bankSize: number;
  onStart: () => void;
  onOpenWrongBook: () => void;
}

export default function StartScreen({ cert, bankSize, onStart, onOpenWrongBook }: Props) {
  const history = getHistory(cert.id);
  const last = history[0];
  const wrongCount = getWrongBook(cert.id).length;
  const ready = bankSize > 0;

  return (
    <div className="screen start">
      <header className="hero">
        <Link to="/" className="link back">← 자격증 선택</Link>
        <h1>{cert.label}</h1>
        <p className="sub">{cert.sub}</p>
      </header>

      <section className="card">
        <h2>출제 구성 ({totalQuestions(cert)}문항)</h2>
        <ul className="subject-list">
          {cert.subjects.map((s) => (
            <li key={s.key}>
              <span>{s.label}</span>
              <span className="count">{s.count}문항</span>
            </li>
          ))}
        </ul>
        {ready ? (
          <p className="muted">문제은행 {bankSize}문항에서 무작위 출제 · 보기 순서도 매번 섞임</p>
        ) : (
          <p className="muted">문제은행 준비중입니다.</p>
        )}
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
        <button className="btn primary" onClick={onStart} disabled={!ready}>
          {ready ? "시험 시작" : "준비중"}
        </button>
        <button className="btn ghost" onClick={onOpenWrongBook}>
          오답노트 {wrongCount > 0 ? `(${wrongCount})` : ""}
        </button>
      </div>
    </div>
  );
}
