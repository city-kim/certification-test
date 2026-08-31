import { useMemo, useState } from "react";
import type { CertConfig } from "../lib/certs";
import { getPracticalBank, PRACTICAL_CATEGORIES, practicalCategoryLabel } from "../data/practical";

interface Props {
  cert: CertConfig;
  onBack: () => void;
}

/**
 * 실기 학습 화면: 문항 전체를 정답·해설과 함께 리스트로 나열한다.
 * "정답 가리기"를 켜면 항목별로 눌러서 정답을 확인하는 셀프 테스트로 쓸 수 있다.
 */
export default function PracticalStudyScreen({ cert, onBack }: Props) {
  const bank = getPracticalBank(cert.id);
  const categories = PRACTICAL_CATEGORIES[cert.id] ?? [];

  const [category, setCategory] = useState<string | null>(null);
  const [hideAnswers, setHideAnswers] = useState(false);
  /** 정답 가리기 모드에서 사용자가 열어본 문항 id */
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const items = useMemo(
    () => (category ? bank.filter((it) => it.category === category) : bank),
    [bank, category]
  );

  function toggleHide() {
    setHideAnswers((h) => !h);
    setRevealed(new Set());
  }

  function reveal(id: string) {
    setRevealed((prev) => new Set(prev).add(id));
  }

  return (
    <div className="screen practical">
      <header className="page-head">
        <button className="link" onClick={onBack}>
          ← 홈
        </button>
        <h1>실기 학습</h1>
        <button className="link" onClick={toggleHide}>
          {hideAnswers ? "정답 보이기" : "정답 가리기"}
        </button>
      </header>

      <div className="chip-row">
        <button
          className={`chip ${category === null ? "on" : ""}`}
          onClick={() => setCategory(null)}
        >
          전체 {bank.length}
        </button>
        {categories.map((c) => (
          <button
            key={c.key}
            className={`chip ${category === c.key ? "on" : ""}`}
            onClick={() => setCategory(c.key)}
          >
            {c.label} {bank.filter((it) => it.category === c.key).length}
          </button>
        ))}
      </div>

      <p className="muted small">
        {category ? practicalCategoryLabel(cert.id, category) : "전체"} {items.length}문항
        {hideAnswers && " · 문항을 눌러 정답을 확인하세요"}
      </p>

      {items.map((it, i) => {
        const showAnswer = !hideAnswers || revealed.has(it.id);
        return (
          <article key={it.id} className="card study-item">
            <div className="review-head">
              <span className="review-num">{i + 1}</span>
              <span className="subject-tag small">
                {practicalCategoryLabel(cert.id, it.category)}
              </span>
            </div>
            <p className="q-text">{it.question}</p>
            {showAnswer ? (
              <div className="explanation">
                <strong>정답</strong>
                <p className="study-answer">{it.answer}</p>
                <strong>해설</strong>
                <p>{it.explanation}</p>
              </div>
            ) : (
              <button className="btn ghost small-btn" onClick={() => reveal(it.id)}>
                정답 확인
              </button>
            )}
          </article>
        );
      })}
    </div>
  );
}
