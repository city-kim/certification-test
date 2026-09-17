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
  onOpenGuide: () => void;
  onOpenIntro: () => void;
  onOpenRouterGuide: () => void;
}

export default function StartScreen({
  cert,
  bankSize,
  onStart,
  onOpenWrongBook,
  onOpenStudy,
  onOpenRefs,
  onOpenFlashcards,
  onOpenGuide,
  onOpenIntro,
  onOpenRouterGuide,
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
        <h2>{ready ? `출제 구성 (${totalQuestions(cert)}문항)` : cert.id === "adsp" ? "시험 과목 구성" : `출제 구성 (${totalQuestions(cert)}문항)`}</h2>
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
          <p className="muted">
            {cert.id === "adsp"
              ? "기출문제는 아직 등록하지 않았습니다. 지금은 요약 학습과 암기카드로 개념을 먼저 익혀 보세요."
              : "문제은행 준비중입니다."}
          </p>
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
        cert.id === "adsp" && (
          <section className="card intro-entry">
            <p className="eyebrow">추천 시작점</p>
            <h2>adsp-intro · 쉬운 개념서</h2>
            <p className="muted small">
              핵심 개념을 바로 외우기 어렵다면 생활 예시와 비유, 시험 포인트로 먼저 이해해 보세요.
            </p>
            <button className="btn ghost" onClick={onOpenIntro}>🌱 입문서 읽기</button>
          </section>
        )
      )}

      {flashcards.length > 0 && (
        <section className="card guide-entry">
          <h2>{cert.id === "adsp" ? "ADsP 개념 학습" : "실기 핵심 요약"}</h2>
          <p className="muted small">
            {cert.id === "adsp"
              ? "모의고사 전후에 14일 순서로 핵심 개념을 이해하고 학습 진도를 체크합니다."
              : "필수 프로토콜·포트·OSI 계층·리눅스 명령어를 표로 한 번에 훑어봅니다."}
          </p>
          <button className="btn ghost" onClick={onOpenGuide}>
            {cert.id === "adsp" ? "📘 개념 학습 시작" : "📋 핵심 요약 보기"}
          </button>
        </section>
      )}

      {flashcards.length > 0 && (
        <section className="card flashcard-entry">
          <h2>암기카드 ({flashcards.length}장)</h2>
          <p className="muted small">
            {cert.id === "adsp"
              ? "데이터 이해·분석 기획·데이터 분석 중 과목을 골라 핵심 개념을 회상합니다."
              : "과목 구분 없이 전체 카드를 무작위로 섞어 핵심 개념을 빠르게 복습합니다."}
          </p>
          <button className="btn ghost" onClick={onOpenFlashcards}>
            🗂️ 암기카드 시작
          </button>
        </section>
      )}

      {cert.id === "network_2_practical" && flashcards.length > 0 && (
        <section className="card router-entry">
          <h2>라우터 기출</h2>
          <p className="muted small">
            반복 출제된 라우터 문제와 실제 입력 명령어를 유형별로 훑어봅니다.
          </p>
          <button className="btn ghost" onClick={onOpenRouterGuide}>
            ⌨️ 라우터 기출 보기
          </button>
        </section>
      )}

      <div className="actions sticky">
        {ready ? (
          <>
            <button className="btn primary" onClick={onStart}>시험 시작</button>
            <button className="btn ghost" onClick={onOpenWrongBook}>
              오답노트 {wrongCount > 0 ? `(${wrongCount})` : ""}
            </button>
            <button className="btn ghost" onClick={onOpenStudy}>정답·해설 ({bankSize}문항)</button>
          </>
        ) : flashcards.length > 0 ? (
          <>
            <button className="btn primary" onClick={onOpenGuide}>개념 학습 시작</button>
            <button className="btn ghost" onClick={onOpenFlashcards}>암기카드</button>
          </>
        ) : (
          <button className="btn primary" disabled>준비중</button>
        )}
      </div>
    </div>
  );
}
