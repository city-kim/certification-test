import { figureUrl } from "../data/questions";

export interface ReviewData {
  index?: number;
  subjectLabel: string;
  question: string;
  figure?: string;
  options: string[];
  correctText: string;
  selectedText: string | null;
  explanation: string;
}

/** 오답 한 건을 보여주는 카드: 내 답(빨강)·정답(초록)·해설 */
export default function ReviewItem({ data }: { data: ReviewData }) {
  return (
    <div className="review-item">
      <div className="review-head">
        <span className="subject-tag small">{data.subjectLabel}</span>
        {data.index != null && <span className="review-num">문제 {data.index}</span>}
      </div>
      <p className="q-text">{data.question}</p>
      {data.figure && (
        <img className="q-figure" src={figureUrl(data.figure)} alt="문제 그림" loading="lazy" />
      )}
      <ul className="options review">
        {data.options.map((opt, i) => {
          const isCorrect = opt === data.correctText;
          const isSelected = data.selectedText !== null && opt === data.selectedText;
          const cls = isCorrect ? "correct" : isSelected ? "wrong" : "";
          return (
            <li key={i}>
              <div className={`option static ${cls}`}>
                <span className="opt-marker">{"①②③④"[i]}</span>
                <span className="opt-text">{opt}</span>
                {isCorrect && <span className="badge ok">정답</span>}
                {isSelected && !isCorrect && <span className="badge no">내 선택</span>}
              </div>
            </li>
          );
        })}
      </ul>
      {data.selectedText === null && (
        <p className="muted small">미응답</p>
      )}
      <div className="explanation">
        <strong>해설</strong>
        <p>{data.explanation}</p>
      </div>
    </div>
  );
}
