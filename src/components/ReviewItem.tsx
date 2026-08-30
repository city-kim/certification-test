import { figureUrl } from "../data/questions";

export interface ReviewData {
  index?: number;
  subjectLabel: string;
  question: string;
  figure?: string;
  /** 4지선다의 보기 목록. 주관식이면 빈 배열 */
  options: string[];
  correctText: string;
  selectedText: string | null;
  explanation: string;
  /** 주관식에서 정답으로 인정되는 다른 표기 */
  altAnswers?: string[];
  /** 풀이 중 힌트를 열어본 문항 (오답노트에는 기록되지 않음) */
  hintUsed?: boolean;
}

/** 오답 한 건을 보여주는 카드: 내 답(빨강)·정답(초록)·해설 */
export default function ReviewItem({ data }: { data: ReviewData }) {
  const short = data.options.length === 0;

  return (
    <div className="review-item">
      <div className="review-head">
        <span className="subject-tag small">{data.subjectLabel}</span>
        {data.index != null && <span className="review-num">문제 {data.index}</span>}
        {short && <span className="type-tag short">단답형</span>}
        {data.hintUsed && <span className="badge hint">힌트 사용</span>}
      </div>
      <p className="q-text">{data.question}</p>
      {data.figure && (
        <img className="q-figure" src={figureUrl(data.figure)} alt="문제 그림" />
      )}

      {short ? (
        <div className="short-review">
          <div className="short-row wrong">
            <span className="short-label">내 답</span>
            <span className="short-value">{data.selectedText ?? "미응답"}</span>
          </div>
          <div className="short-row correct">
            <span className="short-label">정답</span>
            <span className="short-value">{data.correctText}</span>
          </div>
          {data.altAnswers && data.altAnswers.length > 0 && (
            <p className="muted small">허용 표기: {data.altAnswers.join(" · ")}</p>
          )}
        </div>
      ) : (
        <>
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
          {data.selectedText === null && <p className="muted small">미응답</p>}
        </>
      )}

      <div className="explanation">
        <strong>해설</strong>
        <p>{data.explanation}</p>
      </div>
    </div>
  );
}
