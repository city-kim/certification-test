import type { AdspIntroLesson } from "../data/adsp/intro";
import AdspIntroChart from "./AdspIntroChart";
import "./AdspIntroReading.css";

/** 두 입문 화면에서 동일한 목차·설명·비교표·결과 예시를 읽는다. */
export default function AdspIntroReading({ lesson, news = false }: { lesson: AdspIntroLesson; news?: boolean }) {
  const prefix = news ? "gn-intro" : "intro";
  const Heading = news ? "h2" : "h3";
  const sectionId = (index: number) => `${prefix}-${lesson.id}-section-${index + 1}`;

  return (
    <>
      <details className={`${prefix}-outline`}>
        <summary>이 장의 소주제 목록 · {lesson.sections.length}개</summary>
        <nav aria-label={`${lesson.title} 소주제`}>
          <ol>
            {lesson.sections.map((section, index) => (
              <li key={section.title}>
                <button type="button" onClick={() => document.getElementById(sectionId(index))?.scrollIntoView({ block: "start" })}>
                  {section.title}
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </details>
      {lesson.sections.map((section, index) => (
        <section className={`${prefix}-section`} id={sectionId(index)} key={section.title}>
          <Heading><span>{index + 1}.</span> {section.title}</Heading>
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.chart && <AdspIntroChart chart={section.chart} id={`${sectionId(index)}-chart`} />}
          {section.table && (
            <div className={`${prefix}-table-scroll`} role="region" aria-label={section.table.caption} tabIndex={0}>
              <table>
                <caption>{section.table.caption}<span className="adsp-intro-table-hint">표가 잘리면 좌우로 밀어 보세요.</span></caption>
                <thead><tr>{section.table.columns.map((column) => <th scope="col" key={column}>{column}</th>)}</tr></thead>
                <tbody>{section.table.rows.map((row) => <tr key={row[0]}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
          )}
          {section.output && (
            <figure className={`${prefix}-output`}>
              <figcaption>{section.output.label}</figcaption>
              <pre tabIndex={0}>{section.output.text}</pre>
            </figure>
          )}
        </section>
      ))}
    </>
  );
}
