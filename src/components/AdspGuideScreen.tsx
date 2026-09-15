import { useMemo, useState } from "react";
import type { CertConfig } from "../lib/certs";
import { ADSP_MODULES, ADSP_PITFALLS, ADSP_PLAN } from "../data/adsp/guide";

interface Props {
  cert: CertConfig;
  onBack: () => void;
  onOpenFlashcards: () => void;
}

const STORAGE_KEY = "ncq.adsp.study-progress.v1";

function loadCompleted(): Set<string> {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as string[];
    return new Set(value);
  } catch {
    return new Set();
  }
}

export default function AdspGuideScreen({ cert, onBack, onOpenFlashcards }: Props) {
  const [subject, setSubject] = useState<string | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(loadCompleted);
  const modules = useMemo(
    () => subject ? ADSP_MODULES.filter((module) => module.subject === subject) : ADSP_MODULES,
    [subject],
  );
  const progress = Math.round((completed.size / ADSP_MODULES.length) * 100);

  function toggleModule(id: string) {
    setCompleted((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        // 저장할 수 없는 환경에서도 현재 화면의 체크 상태는 유지한다.
      }
      return next;
    });
  }

  return (
    <div className="screen adsp-guide">
      <header className="page-head">
        <button className="link" onClick={onBack}>← 홈</button>
        <h1>ADsP 개념 학습</h1>
        <span className="page-head-spacer" />
      </header>

      <section className="adsp-study-hero">
        <p className="eyebrow">기출문제 전 개념 1회독</p>
        <h2>먼저 이해하고, 카드로 꺼내 보세요</h2>
        <p>{cert.label} 요약자료를 12개 학습 모듈과 14일 순서로 다시 구성했습니다.</p>
        <div className="study-progress-row">
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
          <strong>{completed.size}/{ADSP_MODULES.length} 완료</strong>
        </div>
      </section>

      <section className="card adsp-routine">
        <h2>하루 40~60분 루틴</h2>
        <div className="routine-steps">
          <span><b>1</b>개념 25분</span><i>→</i><span><b>2</b>카드 15분</span><i>→</i><span><b>3</b>빈 종이 10분</span>
        </div>
      </section>

      <section className="card adsp-plan">
        <div className="section-title-row"><h2>14일 학습 순서</h2><span>옆으로 넘겨 보기</span></div>
        <div className="plan-strip">
          {ADSP_PLAN.map(([day, title, goal]) => (
            <article key={day}>
              <strong>{day}</strong><h3>{title}</h3><p>{goal}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="chip-row adsp-filter">
        <button className={`chip ${subject === null ? "on" : ""}`} onClick={() => setSubject(null)}>전체 12</button>
        {cert.subjects.map((item) => (
          <button key={item.key} className={`chip ${subject === item.key ? "on" : ""}`} onClick={() => setSubject(item.key)}>
            {item.label} {ADSP_MODULES.filter((module) => module.subject === item.key).length}
          </button>
        ))}
      </div>

      <div className="adsp-module-list">
        {modules.map((module, index) => {
          const done = completed.has(module.id);
          return (
            <details className={`card adsp-module ${done ? "done" : ""}`} key={module.id} open={index === 0 && subject !== null}>
              <summary>
                <span className="module-number">{String(ADSP_MODULES.indexOf(module) + 1).padStart(2, "0")}</span>
                <span><b>{module.title}</b><small>{module.goal}</small></span>
                <span className="module-chevron">⌄</span>
              </summary>
              <div className="module-body">
                {module.concepts.map((concept) => (
                  <article className="concept-row" key={concept.term}>
                    <h3>{concept.term}</h3>
                    <p>{concept.explanation}</p>
                    {concept.memory && <em>기억: {concept.memory}</em>}
                  </article>
                ))}
                <button className={`module-complete ${done ? "checked" : ""}`} onClick={() => toggleModule(module.id)}>
                  {done ? "✓ 학습 완료" : "학습 완료로 표시"}
                </button>
              </div>
            </details>
          );
        })}
      </div>

      <section className="card adsp-pitfalls">
        <p className="eyebrow">그대로 외우면 틀리기 쉬운 표현</p>
        <h2>시험 함정 바로잡기</h2>
        <ol>{ADSP_PITFALLS.map((item) => <li key={item}>{item}</li>)}</ol>
      </section>

      <section className="card adsp-next center">
        <span>🧠</span><h2>읽었다면 이제 꺼내 볼 차례</h2>
        <p className="muted small">과목을 골라 145장 중 필요한 카드만 반복할 수 있습니다.</p>
        <button className="btn primary" onClick={onOpenFlashcards}>암기카드로 확인 →</button>
      </section>
    </div>
  );
}
