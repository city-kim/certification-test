import { useState } from "react";
import type { CertConfig } from "../lib/certs";
import { subjectLabel } from "../lib/certs";
import type { ExamItem } from "../lib/types";
import { figureUrl } from "../data/questions";
import { fakeMeta } from "./meta";

interface Props {
  cert: CertConfig;
  items: ExamItem[];
  onSelect: (index: number, optionIdx: number) => void;
  onSubmit: () => void;
  onRefresh: () => void;
}

/**
 * 한 회차 시험을 뉴스 애그리게이터의 스토리 목록처럼 렌더링한다.
 * 행을 클릭하면 그 자리에서 인라인 아코디언으로 펼쳐져(별도 상세 화면 없이)
 * 보기 투표와 해설 확인까지 목록 안에서 끝낸다.
 */
export default function NewsList({ cert, items, onSelect, onSubmit, onRefresh }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
  const answered = items.filter((it) => it.selected !== null).length;

  return (
    <section className="gn-list-wrap">
      <div className="gn-list-head">
        <h1 className="gn-page-title">Top Stories</h1>
        <span className="gn-progress">
          {answered} / {items.length} read
        </span>
      </div>

      {items.length === 0 && (
        <p className="gn-empty">No stories in this channel yet. Check back later.</p>
      )}

      <ol className="gn-list">
        {items.map((it, i) => {
          const m = fakeMeta(it.question.id);
          const read = it.selected !== null;
          const open = openId === it.question.id;
          return (
            <li key={it.question.id} className={`gn-item ${open ? "open" : ""}`}>
              <div
                className={`gn-row ${read ? "read" : ""}`}
                onClick={() => setOpenId(open ? null : it.question.id)}
              >
                <span className="gn-rank">{i + 1}.</span>
                <div className="gn-row-body">
                  <div className="gn-row-title-line">
                    <span className="gn-title">{it.question.question}</span>
                    <span className="gn-domain">({m.domain})</span>
                  </div>
                  <div className="gn-meta">
                    <span className="gn-points">{m.points} points</span>
                    <span className="gn-tag">{subjectLabel(cert, it.question.subject)}</span>
                    <span>{m.ago}</span>
                    <span className="gn-comments">
                      {read ? "읽음" : `댓글 ${m.comments}`}
                    </span>
                  </div>
                </div>
              </div>

              {open && (
                <div className="gn-row-detail">
                  <p className="gn-lead">
                    아래 코멘트 중 이 주제를 가장 정확히 설명한 항목에 투표하세요.
                  </p>
                  {it.question.figure && (
                    <img className="gn-figure" src={figureUrl(it.question.figure)} alt="" />
                  )}
                  <ul className="gn-poll">
                    {it.options.map((opt, oi) => (
                      <li key={oi}>
                        <button
                          className={`gn-choice ${it.selected === oi ? "voted" : ""}`}
                          onClick={() => onSelect(i, oi)}
                        >
                          <span className="gn-choice-mark">{"①②③④⑤"[oi]}</span>
                          <span className="gn-choice-text">{opt}</span>
                          {it.selected === oi && (
                            <span className="gn-voted-badge">▲ voted</span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <details className="gn-accordion">
                    <summary>💬 정리 코멘트 펼치기 (spoiler)</summary>
                    <div className="gn-accordion-body">{it.question.explanation}</div>
                  </details>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <div className="gn-list-foot">
        <a className="gn-more" onClick={onRefresh}>
          More ▾
        </a>
        {items.length > 0 && (
          <button className="gn-submit" onClick={onSubmit}>
            Archive ({answered}/{items.length})
          </button>
        )}
      </div>
    </section>
  );
}
