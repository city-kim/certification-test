import { useMemo, useState } from "react";
import type { CertConfig } from "../lib/certs";
import { subjectLabel } from "../lib/certs";
import { questionAnswer } from "../lib/quiz";
import { getBank } from "../data/questions";
import { fakeMeta } from "./meta";

/**
 * 문제은행 전체를 정답·해설과 함께 "Ask" 채널의 질문 스레드처럼 위장해 보여준다.
 * 행을 펼치면 정답이 베스트 댓글로, 해설이 그에 달린 답글로 나타난다.
 * 상단 "댓글 모두 펼치기"로 전체를 훑고, 접은 상태에서는 셀프 테스트로 쓴다.
 */
export default function NewsPractical({ cert }: { cert: CertConfig }) {
  const bank = getBank(cert.id);

  const [subject, setSubject] = useState<string | null>(null);
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const items = useMemo(() => {
    const list = subject ? bank.filter((q) => q.subject === subject) : bank;
    return [...list].sort(
      (a, b) => a.exam.localeCompare(b.exam) || a.number - b.number,
    );
  }, [bank, subject]);

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
              className={`gn-channel ${subject === null ? "on" : ""}`}
              onClick={() => setSubject(null)}
            >
              all ({bank.length})
            </a>
            {cert.subjects.map((s) => (
              <a
                key={s.key}
                className={`gn-channel ${subject === s.key ? "on" : ""}`}
                onClick={() => setSubject(s.key)}
              >
                {s.label} ({bank.filter((q) => q.subject === s.key).length})
              </a>
            ))}
          </div>

          <ol className="gn-list">
            {items.map((q, i) => {
              const m = fakeMeta(q.id);
              const open = openIds.has(q.id);
              return (
                <li key={q.id} className={`gn-item ${open ? "open" : ""}`}>
                  <div className="gn-row" onClick={() => toggleOne(q.id)}>
                    <span className="gn-rank">{i + 1}.</span>
                    <div className="gn-row-body">
                      <div className="gn-row-title-line">
                        <span className="gn-title">{q.question}</span>
                        <span className="gn-domain">(ask.geeknews)</span>
                      </div>
                      <div className="gn-meta">
                        <span className="gn-points">{m.points} points</span>
                        <span className="gn-tag">{subjectLabel(cert, q.subject)}</span>
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
                        <p className="gn-comment-body answer">{questionAnswer(q)}</p>
                      </div>
                      <div className="gn-comment reply">
                        <div className="gn-comment-byline">
                          {m.user}_bot · {m.ago}
                        </div>
                        <p className="gn-comment-body">{q.explanation}</p>
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
