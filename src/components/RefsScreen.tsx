import { useMemo, useState } from "react";
import type { CertConfig } from "../lib/certs";
import { countRefItems, getRefs } from "../data/refs";
import type { RefDoc, RefSection } from "../data/refs";

/**
 * 문제로 내지 않은(직접 봐야 하는) 기출 자료를 분야별로 보여주는 화면.
 * 원본은 docs/<certId>-links.md 이고 build-refs.mjs 가 만든 JSON 을 렌더링한다.
 */
export default function RefsScreen({ cert, onBack }: { cert: CertConfig; onBack: () => void }) {
  const doc = getRefs(cert.id);
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const sections = useMemo(() => (doc ? filterSections(doc, q) : []), [doc, q]);

  if (!doc) {
    return (
      <div className="screen refs">
        <header className="page-head">
          <button className="link" onClick={onBack}>
            ← 홈
          </button>
          <h1>기출 자료</h1>
        </header>
        <p className="muted center">이 자격증은 정리된 참고자료가 없습니다.</p>
      </div>
    );
  }

  const total = countRefItems(doc);
  const hits = sections.reduce(
    (n, s) => n + s.groups.reduce((m, g) => m + g.items.length, 0),
    0,
  );

  return (
    <div className="screen refs">
      <header className="page-head">
        <button className="link" onClick={onBack}>
          ← 홈
        </button>
        <h1>기출 자료</h1>
      </header>

      <section className="card">
        <p className="muted small">{doc.intro}</p>
        {doc.source && (
          <p className="muted small">
            출처:{" "}
            <a href={doc.source.url} target="_blank" rel="noopener noreferrer">
              {doc.source.label}
            </a>
          </p>
        )}
      </section>

      <input
        className="refs-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={`제목 검색 (전체 ${total}편)`}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
      />

      {q && (
        <p className="muted small refs-hits">
          {hits > 0 ? `${hits}편 찾음` : "검색 결과가 없습니다."}
        </p>
      )}

      {sections.map((section) => (
        <section className="card refs-section" key={section.title}>
          <h2>{section.title}</h2>
          {section.note && !q && <p className="muted small">{section.note}</p>}
          {section.groups.map((group) => (
            <details className="refs-group" key={group.title} open={q !== ""}>
              <summary>
                {group.title}
                <span className="refs-count">{group.items.length}</span>
              </summary>
              <ul className="refs-list">
                {group.items.map((item) => (
                  <li key={item.url}>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <span className="refs-title">{item.title}</span>
                      {item.date && <span className="refs-date">{item.date}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </section>
      ))}
    </div>
  );
}

/** 검색어가 있으면 제목이 일치하는 항목만 남기고, 빈 소분류·대분류는 지운다. */
function filterSections(doc: RefDoc, q: string): RefSection[] {
  if (!q) return doc.sections;
  return doc.sections
    .map((s) => ({
      ...s,
      groups: s.groups
        .map((g) => ({ ...g, items: g.items.filter((i) => i.title.toLowerCase().includes(q)) }))
        .filter((g) => g.items.length > 0),
    }))
    .filter((s) => s.groups.length > 0);
}
