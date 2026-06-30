// 회차별 src/data/exams/*.json 을 병합해 src/data/questions.json 생성 + 무결성 검증.
// 실행: node scripts/build-bank.mjs
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const EXAMS_DIR = join(ROOT, "src", "data", "exams");
const OUT = join(ROOT, "src", "data", "questions.json");
const PUBLIC = join(ROOT, "public");

const SUBJECT_COUNT = { tcpip: 17, general: 10, nos: 18, device: 5 };
const VALID_SUBJECTS = new Set(Object.keys(SUBJECT_COUNT));

const files = readdirSync(EXAMS_DIR).filter((f) => f.endsWith(".json")).sort();
let all = [];
const errors = [];

for (const f of files) {
  const exam = f.replace(/\.json$/, "");
  const arr = JSON.parse(readFileSync(join(EXAMS_DIR, f), "utf8"));
  if (arr.length !== 50) errors.push(`${f}: 문항 ${arr.length}개 (50 아님)`);

  const perSubject = { tcpip: 0, general: 0, nos: 0, device: 0 };
  for (const q of arr) {
    if (!VALID_SUBJECTS.has(q.subject)) errors.push(`${q.id}: subject 무효 (${q.subject})`);
    else perSubject[q.subject]++;
    if (!Array.isArray(q.options) || q.options.length !== 4)
      errors.push(`${q.id}: 보기 개수 ${q.options?.length}`);
    if (typeof q.answerIndex !== "number" || q.answerIndex < 0 || q.answerIndex > 3)
      errors.push(`${q.id}: answerIndex 무효 (${q.answerIndex})`);
    if (!q.question?.trim()) errors.push(`${q.id}: question 비어있음`);
    if (!q.explanation?.trim()) errors.push(`${q.id}: explanation 비어있음`);
    if (q.figure && !existsSync(join(PUBLIC, q.figure)))
      errors.push(`${q.id}: figure 파일 없음 (${q.figure})`);
  }
  for (const [k, v] of Object.entries(SUBJECT_COUNT)) {
    if (perSubject[k] !== v)
      errors.push(`${exam}: ${k} ${perSubject[k]}개 (기대 ${v})`);
  }
  all = all.concat(arr);
}

// 과목별 총 풀 크기
const pool = { tcpip: 0, general: 0, nos: 0, device: 0 };
for (const q of all) pool[q.subject]++;

console.log(`회차 파일: ${files.length}개, 총 문항: ${all.length}`);
console.log("과목별 풀:", pool);
const withFig = all.filter((q) => q.figure).length;
console.log(`이미지 문항: ${withFig}`);

if (errors.length) {
  console.error(`\n❌ 검증 오류 ${errors.length}건:`);
  for (const e of errors.slice(0, 50)) console.error("  - " + e);
  process.exit(1);
}

writeFileSync(OUT, JSON.stringify(all));
console.log(`\n✅ 검증 통과. ${OUT} 작성 완료 (${all.length}문항).`);
