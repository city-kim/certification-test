import { useMemo, useState } from "react";
import { ADSP_INTRO_LESSONS } from "../data/adsp/intro";
import type { AdspSubject } from "../data/adsp/guide";
import AdspIntroReading from "../components/AdspIntroReading";

const SUBJECTS: Array<{ key: AdspSubject; label: string }> = [
  { key: "understanding", label: "데이터 이해" },
  { key: "planning", label: "데이터 분석 기획" },
  { key: "analysis", label: "데이터 분석" },
];

/** 상세 ADsP 입문서를 뉴스 기사 목록처럼 보여주는 시크릿 화면. */
export default function NewsAdspIntro() {
  const [subject, setSubject] = useState<AdspSubject | null>(null);
  const [openId, setOpenId] = useState<string | null>(ADSP_INTRO_LESSONS[0]?.id ?? null);
  const lessons = useMemo(
    () => subject ? ADSP_INTRO_LESSONS.filter((lesson) => lesson.subject === subject) : ADSP_INTRO_LESSONS,
    [subject],
  );

  return (
    <section className="gn-list-wrap gn-intro">
      <div className="gn-list-head">
        <h1 className="gn-page-title">ADsP Beginner's Guide</h1>
        <span className="gn-progress">{ADSP_INTRO_LESSONS.length} explainers · easy read</span>
      </div>
      <p className="gn-intro-lead">핵심요약의 개념을 왜 필요한지부터 생활 예시와 계산 과정까지 풀어 쓴 입문서입니다. 소제목을 따라 한 장씩 읽고, 시험 포인트와 확인 질문으로 되짚어 보세요.</p>

      <div className="gn-channels">
        <a className={`gn-channel ${subject === null ? "on" : ""}`} onClick={() => setSubject(null)}>all ({ADSP_INTRO_LESSONS.length})</a>
        {SUBJECTS.map((item) => (
          <a key={item.key} className={`gn-channel ${subject === item.key ? "on" : ""}`} onClick={() => setSubject(item.key)}>
            {item.label} ({ADSP_INTRO_LESSONS.filter((lesson) => lesson.subject === item.key).length})
          </a>
        ))}
      </div>

      <ol className="gn-list">
        {lessons.map((lesson, index) => {
          const open = openId === lesson.id;
          const label = SUBJECTS.find((item) => item.key === lesson.subject)?.label;
          return (
            <li key={lesson.id} className={`gn-item ${open ? "open" : ""}`}>
              <div className="gn-row" onClick={() => setOpenId(open ? null : lesson.id)}>
                <span className="gn-rank">{index + 1}.</span>
                <div className="gn-row-body">
                  <div className="gn-row-title-line"><span className="gn-title">{lesson.title}</span><span className="gn-domain">(learn.adsp)</span></div>
                  <div className="gn-meta"><span className="gn-points">easy explainer</span><span className="gn-tag">{label}</span><span>{lesson.lead}</span></div>
                </div>
              </div>
              {open && (
                <div className="gn-row-detail gn-intro-detail">
                  <AdspIntroReading lesson={lesson} news />
                  <div className="gn-intro-examples">
                    {lesson.examples.map((example) => <p key={example.title}><b>{example.title}:</b> {example.body}</p>)}
                  </div>
                  <div className="gn-intro-tip"><b>시험 포인트</b><ul>{lesson.examTips.map((tip) => <li key={tip}>{tip}</li>)}</ul></div>
                  {[{ check: lesson.check, answer: lesson.answer }, ...(lesson.extraChecks ?? [])].map((item) => (
                    <details className="gn-accordion gn-intro-check" key={item.check}><summary>확인 질문: {item.check}</summary><div className="gn-accordion-body">{item.answer}</div></details>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
