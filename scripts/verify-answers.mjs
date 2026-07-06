// 정밀 검증: raw 텍스트에서 각 문항의 ①②③④ 보기 블록을 직접 추출해
// JSON 보기와 순서·내용을 1:1 비교한다. (opt1~3 완전일치, opt4는 다음 문항 지문이
// 뒤따르므로 prefix 일치로 본다.)
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
// 네트워크관리사(network_2) 전용 정밀 검증 도구.
const EXAMS = join(ROOT, "src", "data", "exams", "network_2");
const RAW = join(ROOT, "scripts", "raw", "network_2");

const MARKERS = "①②③④";
const norm = (s) => s.replace(/[\s'"`′ʼ‘’“”·]/g, "").toLowerCase();

function cleanRaw(text) {
  // 정답키 영역 제거
  const cut = text.indexOf("12345678910");
  let t = cut > 0 ? text.slice(0, cut) : text;
  // 머리말/꼬리말/페이지 구분/과목 라인 제거
  return t
    .replace(/===PAGE===/g, " ")
    .replace(/네트워크관리사 2급[^\n]*/g, " ")
    .replace(/최강 자격증[^\n]*/g, " ")
    .replace(/전자문제집 CBT[^\n]*/g, " ")
    .replace(/[1-4]과목\s*:[^\n]*/g, " ");
}

// raw에서 ①②③④ 그룹들을 순서대로 추출 → 각 그룹 [opt1,opt2,opt3,opt4(+꼬리)]
function extractGroups(text) {
  const marks = [];
  for (let i = 0; i < text.length; i++) {
    const m = MARKERS.indexOf(text[i]);
    if (m >= 0) marks.push({ i, m });
  }
  const groups = [];
  let cur = null;
  for (let k = 0; k < marks.length; k++) {
    const { i, m } = marks[k];
    const end = k + 1 < marks.length ? marks[k + 1].i : text.length;
    const seg = text.slice(i + 1, end).trim();
    if (m === 0) {
      // 새 문항 시작
      if (cur && cur.opts.length === 4) groups.push(cur.opts);
      cur = { opts: [seg] };
    } else if (cur && cur.opts.length === m) {
      cur.opts.push(seg);
    } else {
      // 순서가 깨진 마커(답안키 잔재 등) → 현재 그룹 폐기
      if (cur && cur.opts.length === 4) groups.push(cur.opts);
      cur = null;
    }
  }
  if (cur && cur.opts.length === 4) groups.push(cur.opts);
  return groups;
}

let issues = [];
let okCount = 0;
let totalQ = 0;

for (const f of readdirSync(EXAMS).filter((x) => x.endsWith(".json")).sort()) {
  const exam = f.replace(/\.json$/, "");
  const arr = JSON.parse(readFileSync(join(EXAMS, f), "utf8"));
  const keys = JSON.parse(readFileSync(join(RAW, `${exam}.answers.json`), "utf8"));
  const groups = extractGroups(cleanRaw(readFileSync(join(RAW, `${exam}.txt`), "utf8")));

  if (groups.length < 50) {
    issues.push(`${exam}: ①②③④ 그룹 ${groups.length}개 추출(50 미만) — 자동대조 불가, 수동확인 필요`);
  }

  for (const q of arr) {
    totalQ++;
    const g = groups[q.number - 1];
    if (!g) {
      issues.push(`${q.id}: 원문 보기그룹 매칭 실패`);
      continue;
    }
    const j = q.options.map(norm);
    const r = g.map(norm);
    let ok = true;
    const detail = [];
    for (let i = 0; i < 4; i++) {
      const match = i < 3 ? j[i] === r[i] : r[i].startsWith(j[i]) || j[i].startsWith(r[i]);
      if (!match) {
        ok = false;
        detail.push(`opt${i + 1}: JSON="${q.options[i]}" RAW="${g[i].slice(0, 40)}"`);
      }
    }
    // answerIndex == 정답키 재확인
    if (q.answerIndex !== keys[q.number - 1]) {
      ok = false;
      detail.push(`answerIndex JSON=${q.answerIndex} KEY=${keys[q.number - 1]}`);
    }
    if (ok) okCount++;
    else issues.push(`${q.id}\n      ` + detail.join("\n      "));
  }
}

console.log(`총 문항: ${totalQ}`);
console.log(`보기 순서·내용 + 정답키 완전일치: ${okCount}`);
console.log(`불일치/확인필요: ${issues.length}`);
if (issues.length) {
  console.log("\n## 상세");
  for (const x of issues) console.log("  - " + x);
}
