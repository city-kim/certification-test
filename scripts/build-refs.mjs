// docs/<certId>-links.md (사람이 읽고 고치는 원본) 을 파싱해
// 앱이 화면에 렌더링할 src/data/refs/<certId>.json 을 생성한다.
// 실행: node scripts/build-refs.mjs
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const DOCS = join(ROOT, "docs");
const OUT_DIR = join(ROOT, "src", "data", "refs");

/** "- [제목](URL) `날짜`" 한 줄 */
const ITEM = /^- \[(.+?)\]\((https?:\/\/[^\s)]+)\)\s*(?:`([^`]+)`)?\s*$/;
/** "### 소분류 (12편)" — 편수는 items 로 다시 세므로 제목에서 떼어낸다 */
const GROUP = /^### (.+?)(?:\s*\(\d+편\))?\s*$/;
// 카테고리 URL 에 괄호가 그대로 들어있어(…2%EA%B8%89%20(…)) 마지막 ")" 까지 탐욕적으로 잡는다.
const SOURCE = /^출처:\s*\[(.+?)\]\((https?:\/\/.+)\)\s*$/;

function parse(md) {
  const doc = { title: "", source: null, intro: "", sections: [] };
  let section = null;
  let group = null;

  for (const raw of md.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line === "---" || line.startsWith("|")) continue;

    if (line.startsWith("# ")) {
      doc.title = line.slice(2).trim();
      continue;
    }
    if (SOURCE.test(line)) {
      const [, label, url] = line.match(SOURCE);
      doc.source = { label, url };
      continue;
    }
    if (line.startsWith("## ")) {
      section = { title: line.slice(3).trim(), note: "", groups: [] };
      group = null;
      doc.sections.push(section);
      continue;
    }
    if (line.startsWith("### ")) {
      if (!section) throw new Error(`섹션(##) 없이 소분류가 나왔다: ${line}`);
      group = { title: line.match(GROUP)[1].trim(), items: [] };
      section.groups.push(group);
      continue;
    }
    const item = line.match(ITEM);
    if (item) {
      if (!group) throw new Error(`소분류(###) 없이 항목이 나왔다: ${line}`);
      group.items.push({ title: item[1], url: item[2], date: item[3] ?? "" });
      continue;
    }
    // 그 밖의 본문은 설명 문단으로 본다(마크다운 강조·코드 표기는 벗겨서 저장).
    const text = line.replace(/\*\*(.+?)\*\*/g, "$1").replace(/`(.+?)`/g, "$1");
    if (section && !group) section.note = section.note ? `${section.note} ${text}` : text;
    else if (!section) doc.intro = doc.intro ? `${doc.intro} ${text}` : text;
  }
  return doc;
}

const files = readdirSync(DOCS).filter((f) => f.endsWith("-links.md"));
if (files.length === 0) {
  console.log("docs/*-links.md 가 없습니다.");
  process.exit(0);
}

mkdirSync(OUT_DIR, { recursive: true });
for (const file of files) {
  const certId = file.replace(/-links\.md$/, "");
  const doc = parse(readFileSync(join(DOCS, file), "utf8"));
  const groups = doc.sections.reduce((n, s) => n + s.groups.length, 0);
  const items = doc.sections.reduce(
    (n, s) => n + s.groups.reduce((m, g) => m + g.items.length, 0),
    0,
  );
  if (items === 0) {
    console.error(`❌ ${file}: 항목을 하나도 찾지 못했습니다.`);
    process.exitCode = 1;
    continue;
  }
  writeFileSync(join(OUT_DIR, `${certId}.json`), JSON.stringify(doc));
  console.log(`✅ ${file} → src/data/refs/${certId}.json (섹션 ${doc.sections.length} · 소분류 ${groups} · 링크 ${items})`);
}
