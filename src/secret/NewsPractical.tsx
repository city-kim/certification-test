import { useMemo, useState } from "react";
import type { CertConfig } from "../lib/certs";
import {
  getPracticalBank,
  PRACTICAL_CATEGORIES,
  practicalCategoryLabel,
} from "../data/practical";
import { fakeMeta } from "./meta";

/**
 * 실기 학습(정답·해설 리스트)을 "Ask" 채널의 질문 스레드처럼 위장해 보여준다.
 * 행을 펼치면 정답이 베스트 댓글로, 해설이 그에 달린 답글로 나타난다.
 * 상단 "모두 펼치기"로 전체를 한 번에 훑어보고, 접은 상태에서는 셀프 테스트로 쓴다.
 */
export default function NewsPractical({ cert }: { cert: CertConfig }) {
  const bank = getPracticalBank(cert.id);
  const categories = PRACTICAL_CATEGORIES[cert.id] ?? [];

  const [category, setCategory] = useState<string | null>(null);
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const items = useMemo(
    () => (category ? bank.filter((it) => it.category === category) : bank),
    [bank, category],
  );

  const allOpen = items.length > 0 && items.every((it) => openIds.has(it.id));

  function toggleAll() {
    setOpenIds((prev) => {
      const next = new Set(prev);
      for (const it of items) {
        if (allOpen) next.delete(it.id);
        else next.add(it.id);
      }
      return next;
    });
  }

  function toggleOne(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <section className="gn-list-wrap">
      <div className="gn-list-head">
        <h1 className="gn-page-title">Ask GN: 실무 Q&amp;A</h1>
        {items.length > 0 && (
          <a className="gn-progress gn-toggle-all" onClick={toggleAll}>
            {allOpen ? "댓글 모두 접기" : "댓글 모두 펼치기"}
          </a>
        )}
      </div>

      {bank.length === 0 ? (
        <p className="gn-empty">No threads in this channel yet. Check back later.</p>
      ) : (
        <>
          <div className="gn-channels">
            <a
              className={`gn-channel ${category === null ? "on" : ""}`}
              onClick={() => setCategory(null)}
            >
              all ({bank.length})
            </a>
            {categories.map((c) => (
              <a
                key={c.key}
                className={`gn-channel ${category === c.key ? "on" : ""}`}
                onClick={() => setCategory(c.key)}
              >
                {c.label} ({bank.filter((it) => it.category === c.key).length})
              </a>
            ))}
          </div>

          <ol className="gn-list">
            {items.map((it, i) => {
              const m = fakeMeta(it.id);
              const open = openIds.has(it.id);
              return (
                <li key={it.id} className={`gn-item ${open ? "open" : ""}`}>
                  <div className="gn-row" onClick={() => toggleOne(it.id)}>
                    <span className="gn-rank">{i + 1}.</span>
                    <div className="gn-row-body">
                      <div className="gn-row-title-line">
                        <span className="gn-title">{it.question}</span>
                        <span className="gn-domain">(ask.geeknews)</span>
                      </div>
                      <div className="gn-meta">
                        <span className="gn-points">{m.points} points</span>
                        <span className="gn-tag">
                          {practicalCategoryLabel(cert.id, it.category)}
                        </span>
                        <span>{m.ago}</span>
                        <span className="gn-comments">
                          {open ? "댓글 접기" : "답변 2개"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {open && (
                    <div className="gn-row-detail">
                      <div className="gn-comment">
                        <div className="gn-comment-byline">
                          {m.user} · {m.points} points · {m.ago}
                          <span className="gn-best">best</span>
                        </div>
                        <p className="gn-comment-body answer">{it.answer}</p>
                      </div>
                      <div className="gn-comment reply">
                        <div className="gn-comment-byline">
                          {m.user}_bot · {m.ago}
                        </div>
                        <p className="gn-comment-body">{it.explanation}</p>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>

          <div className="gn-list-foot">
            <span className="gn-more">
              {items.length} threads · sorted by relevance
            </span>
          </div>
        </>
      )}
    </section>
  );
}
