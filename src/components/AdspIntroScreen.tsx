import { useMemo, useState } from "react";
import { ADSP_INTRO_LESSONS } from "../data/adsp/intro";
import type { AdspSubject } from "../data/adsp/guide";

interface Props {
  onBack: () => void;
  onOpenGuide: () => void;
}

const SUBJECTS: Array<{ key: AdspSubject; label: string }> = [
  { key: "understanding", label: "데이터 이해" },
  { key: "planning", label: "데이터 분석 기획" },
  { key: "analysis", label: "데이터 분석" },
];

export default function AdspIntroScreen({ onBack, onOpenGuide }: Props) {
  const [subject, setSubject] = useState<AdspSubject | null>(null);
  const lessons = useMemo(
    () => subject ? ADSP_INTRO_LESSONS.filter((lesson) => lesson.subject === subject) : ADSP_INTRO_LESSONS,
    [subject],
  );

  return (
    <div className="screen adsp-intro">
      <header className="page-head">
        <button className="link" onClick={onBack}>← 홈</button>
        <h1>adsp-intro</h1>
        <span className="page-head-spacer" />
      </header>

      <section className="intro-hero">
        <p className="eyebrow">처음 배우는 ADsP</p>
        <h2>외우기 전에, 먼저 그림을 잡아요</h2>
        <p>핵심요약의 12개 주제를 쉬운 말과 생활 예시로 풀었습니다. 한 번에 다 외우지 말고 한 장씩 이해해 보세요.</p>
        <div className="intro-route"><b>입문서</b><i>→</i><span>핵심요약</span><i>→</i><span>기출문제</span></div>
      </section>

      <div className="chip-row adsp-filter intro-filter">
        <button className={`chip ${subject === null ? "on" : ""}`} onClick={() => setSubject(null)}>전체 12</button>
        {SUBJECTS.map((item) => (
          <button key={item.key} className={`chip ${subject === item.key ? "on" : ""}`} onClick={() => setSubject(item.key)}>
            {item.label} {ADSP_INTRO_LESSONS.filter((lesson) => lesson.subject === item.key).length}
          </button>
        ))}
      </div>

      <div className="intro-lessons">
        {lessons.map((lesson, index) => (
          <details className="card intro-lesson" key={lesson.id} open={index === 0}>
            <summary>
              <span className="intro-index">{String(ADSP_INTRO_LESSONS.indexOf(lesson) + 1).padStart(2, "0")}</span>
              <span><b>{lesson.title.replace(/^\d+\.\s*/, "")}</b><small>{lesson.lead}</small></span>
              <span className="module-chevron">⌄</span>
            </summary>
            <div className="intro-body">
              <div className="intro-story">
                {lesson.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <h3>예시로 연결하기</h3>
              <div className="intro-examples">
                {lesson.examples.map((example) => (
                  <article key={example.title}><b>{example.title}</b><p>{example.body}</p></article>
                ))}
              </div>
              <div className="intro-exam-tip">
                <strong>시험에서는 이렇게 구분</strong>
                <ul>{lesson.examTips.map((tip) => <li key={tip}>{tip}</li>)}</ul>
              </div>
              <details className="intro-check">
                <summary>30초 확인 질문 · {lesson.check}</summary>
                <p>{lesson.answer}</p>
              </details>
            </div>
          </details>
        ))}
      </div>

      <section className="card adsp-next center intro-next">
        <span>✍️</span><h2>이제 짧은 문장으로 압축해 볼까요?</h2>
        <p className="muted small">입문서의 흐름을 이해했다면 기존 핵심요약에서 암기 문장을 확인하세요.</p>
        <button className="btn primary" onClick={onOpenGuide}>ADsP 핵심요약 보기 →</button>
      </section>
    </div>
  );
}

