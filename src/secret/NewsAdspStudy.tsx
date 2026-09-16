import { useMemo, useState } from "react";
import { ADSP_MODULES, ADSP_PLAN } from "../data/adsp/guide";
import type { AdspSubject } from "../data/adsp/guide";

const SUBJECTS: Array<{ key: AdspSubject; label: string }> = [
  { key: "understanding", label: "데이터 이해" },
  { key: "planning", label: "데이터 분석 기획" },
  { key: "analysis", label: "데이터 분석" },
];

/** ADsP 개념 요약을 뉴스 기사 목록처럼 보여주는 시크릿 학습 화면. */
export default function NewsAdspStudy() {
  const [subject, setSubject] = useState<AdspSubject | null>(null);
  const [openId, setOpenId] = useState<string | null>(ADSP_MODULES[0]?.id ?? null);

  const modules = useMemo(
    () => (subject ? ADSP_MODULES.filter((module) => module.subject === subject) : ADSP_MODULES),
    [subject],
  );

  return (
    <section className="gn-list-wrap gn-study">
      <div className="gn-list-head">
        <h1 className="gn-page-title">ADsP Concept Briefing</h1>
        <span className="gn-progress">{ADSP_MODULES.length} guides · 14 day plan</span>
      </div>

      <div className="gn-channels">
        <a className={`gn-channel ${subject === null ? "on" : ""}`} onClick={() => setSubject(null)}>
          all ({ADSP_MODULES.length})
        </a>
        {SUBJECTS.map((item) => (
          <a
            key={item.key}
            className={`gn-channel ${subject === item.key ? "on" : ""}`}
            onClick={() => setSubject(item.key)}
          >
            {item.label} ({ADSP_MODULES.filter((module) => module.subject === item.key).length})
          </a>
        ))}
      </div>

      <ol className="gn-list">
        {modules.map((module, index) => {
          const open = openId === module.id;
          const label = SUBJECTS.find((item) => item.key === module.subject)?.label ?? module.subject;
          return (
            <li key={module.id} className={`gn-item ${open ? "open" : ""}`}>
              <div className="gn-row" onClick={() => setOpenId(open ? null : module.id)}>
                <span className="gn-rank">{index + 1}.</span>
                <div className="gn-row-body">
                  <div className="gn-row-title-line">
                    <span className="gn-title">{module.title}</span>
                    <span className="gn-domain">(concept.adsp)</span>
                  </div>
                  <div className="gn-meta">
                    <span className="gn-points">{module.concepts.length} key points</span>
                    <span className="gn-tag">{label}</span>
                    <span>{module.goal}</span>
                  </div>
                </div>
              </div>

              {open && (
                <div className="gn-row-detail gn-study-detail">
                  {module.concepts.map((concept) => (
                    <article key={concept.term} className="gn-study-concept">
                      <h2>{concept.term}</h2>
                      <p>{concept.explanation}</p>
                      {concept.memory && <p className="gn-memory">memory: {concept.memory}</p>}
                    </article>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <details className="gn-accordion gn-plan">
        <summary>14일 학습 순서 펼치기</summary>
        <div className="gn-accordion-body">
          <ol>
            {ADSP_PLAN.map(([day, title, detail]) => (
              <li key={day}>
                <strong>{day} · {title}</strong>
                <span>{detail}</span>
              </li>
            ))}
          </ol>
        </div>
      </details>
    </section>
  );
}
