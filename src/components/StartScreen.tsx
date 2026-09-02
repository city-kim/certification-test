import { Link } from "react-router-dom";
import type { CertConfig } from "../lib/certs";
import { totalQuestions } from "../lib/certs";
import { getHistory, getWrongBook } from "../lib/storage";
import { countRefItems, getRefs } from "../data/refs";
import { getFlashcards } from "../data/flashcards";

interface Props {
  cert: CertConfig;
  bankSize: number;
  onStart: () => void;
  onOpenWrongBook: () => void;
  onOpenStudy: () => void;
  onOpenRefs: () => void;
  onOpenFlashcards: () => void;
}

export default function StartScreen({
  cert,
  bankSize,
  onStart,
  onOpenWrongBook,
  onOpenStudy,
  onOpenRefs,
  onOpenFlashcards,
}: Props) {
  const history = getHistory(cert.id);
  const last = history[0];
  const wrongCount = getWrongBook(cert.id).length;
  const ready = bankSize > 0;
  const refs = getRefs(cert.id);
  const flashcards = getFlashcards(cert.id);

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

      {refs && (
        <section className="card refs-entry">
          <h2>기출 자료 ({countRefItems(refs)}편)</h2>
          <p className="muted small">
            케이블 제작·NOS 서버 설정·라우터 실습처럼 문제로 내지 않은 유형을 분야별 링크로 정리했습니다.
          </p>
          <button className="btn ghost" onClick={onOpenRefs}>
            📚 분야별로 보기
          </button>
        </section>
      )}

      {flashcards.length > 0 && (
        <section className="card flashcard-entry">
          <h2>암기카드 ({flashcards.length}장)</h2>
          <p className="muted small">
            과목 구분 없이 전체 카드를 무작위로 섞어 핵심 개념을 빠르게 복습합니다.
          </p>
          <button className="btn ghost" onClick={onOpenFlashcards}>
            🗂️ 암기카드 시작
          </button>
        </section>
      )}

      <div className="actions sticky">
        <button className="btn primary" onClick={onStart} disabled={!ready}>
          {ready ? "시험 시작" : "준비중"}
        </button>
        <button className="btn ghost" onClick={onOpenWrongBook}>
          오답노트 {wrongCount > 0 ? `(${wrongCount})` : ""}
        </button>
        {ready && (
          <button className="btn ghost" onClick={onOpenStudy}>
            정답·해설 ({bankSize}문항)
          </button>
        )}
      </div>
    </div>
  );
}
