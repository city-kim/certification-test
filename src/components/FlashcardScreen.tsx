import { useState } from "react";
import { getFlashcards } from "../data/flashcards";
import type { CertConfig } from "../lib/certs";
import { subjectLabel } from "../lib/certs";
import type { Flashcard } from "../lib/types";

interface Props {
  cert: CertConfig;
  onBack: () => void;
}

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function FlashcardScreen({ cert, onBack }: Props) {
  const allCards = getFlashcards(cert.id);
  const [deck, setDeck] = useState<Flashcard[]>(() => shuffle(allCards));
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [retryCards, setRetryCards] = useState<Flashcard[]>([]);
  const [knownCount, setKnownCount] = useState(0);

  const card = deck[index];
  const finished = deck.length > 0 && index >= deck.length;

  function restart(cards: Flashcard[]) {
    setDeck(shuffle(cards));
    setIndex(0);
    setRevealed(false);
    setRetryCards([]);
    setKnownCount(0);
    window.scrollTo(0, 0);
  }

  function rate(known: boolean) {
    if (!card) return;
    if (known) setKnownCount((count) => count + 1);
    else setRetryCards((cards) => [...cards, card]);
    setIndex((current) => current + 1);
    setRevealed(false);
    window.scrollTo(0, 0);
  }

  if (allCards.length === 0) {
    return (
      <div className="screen flashcards">
        <PageHeader onBack={onBack} />
        <section className="card center">
          <p>등록된 암기카드가 없습니다.</p>
        </section>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="screen flashcards">
        <PageHeader onBack={onBack} />
        <section className="card flashcard-finish center">
          <span className="finish-icon">🎉</span>
          <h2>한 바퀴 완료!</h2>
          <p>
            <strong>{knownCount}장</strong>을 알고 있었고, <strong>{retryCards.length}장</strong>을 다시 보기로 했어요.
          </p>
        </section>
        <div className="flashcard-finish-actions">
          {retryCards.length > 0 && (
            <button className="btn primary" onClick={() => restart(retryCards)}>
              헷갈린 카드만 다시 보기
            </button>
          )}
          <button className="btn ghost" onClick={() => restart(allCards)}>
            전체 카드 다시 섞기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen flashcards">
      <PageHeader onBack={onBack} />

      <div className="flashcard-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((index + 1) / deck.length) * 100}%` }} />
        </div>
        <span className="progress-text">{index + 1} / {deck.length}</span>
      </div>

      <article
        className={`flashcard ${revealed ? "revealed" : ""}`}
        onClick={() => !revealed && setRevealed(true)}
      >
        <div className="flashcard-meta">
          <span className="subject-tag">{subjectLabel(cert, card.subject)}</span>
          <span className="muted small">{revealed ? "정답" : "질문"}</span>
        </div>
        <p className="flashcard-prompt">{card.prompt}</p>

        {revealed ? (
          <div className="flashcard-answer">
            <strong>{card.answers[0]}</strong>
            {card.answers.length > 1 && (
              <p className="muted small">함께 기억하기: {card.answers.slice(1).join(" · ")}</p>
            )}
            <div className="explanation">
              <span>설명</span>
              <p>{card.explanation}</p>
            </div>
          </div>
        ) : (
          <p className="flashcard-tap">카드를 눌러 정답 확인</p>
        )}
      </article>

      {revealed ? (
        <div className="actions two flashcard-actions">
          <button className="btn ghost" onClick={() => rate(false)}>다시 볼래요</button>
          <button className="btn primary" onClick={() => rate(true)}>알고 있어요</button>
        </div>
      ) : (
        <button className="btn primary flashcard-actions" onClick={() => setRevealed(true)}>
          정답 확인
        </button>
      )}
    </div>
  );
}

function PageHeader({ onBack }: { onBack: () => void }) {
  return (
    <header className="page-head">
      <button className="link" onClick={onBack}>← 홈</button>
      <h1>실기 암기카드</h1>
      <span className="page-head-spacer" />
    </header>
  );
}
