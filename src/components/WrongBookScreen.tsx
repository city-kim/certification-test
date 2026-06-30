import { useState } from "react";
import { clearWrongBook, getWrongBook } from "../lib/storage";
import { SUBJECTS } from "../lib/types";
import ReviewItem from "./ReviewItem";
import type { ReviewData } from "./ReviewItem";

const subjectLabel = (key: string) =>
  SUBJECTS.find((s) => s.key === key)?.label ?? key;

export default function WrongBookScreen({ onBack }: { onBack: () => void }) {
  const [book, setBook] = useState(() => getWrongBook());

  function handleClear() {
    if (window.confirm("오답노트를 모두 비울까요?")) {
      clearWrongBook();
      setBook([]);
    }
  }

  const reviews: ReviewData[] = book.map((w) => ({
    subjectLabel: subjectLabel(w.subject),
    question: w.question,
    figure: w.figure,
    options: w.options,
    correctText: w.correctText,
    selectedText: w.selectedText,
    explanation: w.explanation,
  }));

  return (
    <div className="screen wrongbook">
      <header className="page-head">
        <button className="link" onClick={onBack}>
          ← 홈
        </button>
        <h1>오답노트</h1>
        {book.length > 0 && (
          <button className="link danger" onClick={handleClear}>
            비우기
          </button>
        )}
      </header>

      {reviews.length === 0 ? (
        <p className="muted center">저장된 오답이 없습니다.</p>
      ) : (
        <>
          <p className="muted small">총 {reviews.length}문항</p>
          {reviews.map((r, i) => (
            <ReviewItem key={i} data={{ ...r, index: i + 1 }} />
          ))}
        </>
      )}
    </div>
  );
}
