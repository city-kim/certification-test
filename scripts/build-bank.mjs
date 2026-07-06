// 자격증별 회차 JSON(src/data/exams/<certId>/*.json)을 병합해
// src/data/<certId>/questions.json 을 생성하고 무결성을 검증한다.
// 자격증 정의는 src/data/certs.config.json 을 앱과 공유한다.
// 실행: node scripts/build-bank.mjs
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const PUBLIC = join(ROOT, "public");
const CFG = JSON.parse(readFileSync(join(ROOT, "src", "data", "certs.config.json"), "utf8"));

let hadError = false;

for (const cert of CFG.certs) {
  const examsDir = join(ROOT, "src", "data", "exams", cert.id);
  const outDir = join(ROOT, "src", "data", cert.id);
  const out = join(outDir, "questions.json");
  mkdirSync(outDir, { recursive: true });

  const counts = Object.fromEntries(cert.subjects.map((s) => [s.key, s.count]));
  const validSubjects = new Set(Object.keys(counts));
  const total = cert.subjects.reduce((s, x) => s + x.count, 0);

  const files = existsSync(examsDir)
    ? readdirSync(examsDir).filter((f) => f.endsWith(".json")).sort()
    : [];

  console.log(`\n[${cert.id}] ${cert.label} — 회차 ${files.length}개, 문항/회 ${total}`);

  if (files.length === 0) {
    // 아직 문제 데이터가 없는 자격증(스캐폴딩): 빈 문제은행을 생성한다.
    writeFileSync(out, "[]");
    console.log(`  ⚠ 회차 JSON 없음 → 빈 문제은행 생성 (${out})`);
    continue;
  }

  let all = [];
  const errors = [];

  for (const f of files) {
    const exam = f.replace(/\.json$/, "");
    const arr = JSON.parse(readFileSync(join(examsDir, f), "utf8"));
    if (arr.length !== total) errors.push(`${f}: 문항 ${arr.length}개 (${total} 아님)`);

    const perSubject = Object.fromEntries(cert.subjects.map((s) => [s.key, 0]));
    for (const q of arr) {
      if (!validSubjects.has(q.subject)) errors.push(`${q.id}: subject 무효 (${q.subject})`);
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
    for (const [k, v] of Object.entries(counts)) {
      if (perSubject[k] !== v) errors.push(`${exam}: ${k} ${perSubject[k]}개 (기대 ${v})`);
    }
    all = all.concat(arr);
  }

  const pool = Object.fromEntries(cert.subjects.map((s) => [s.key, 0]));
  for (const q of all) if (pool[q.subject] != null) pool[q.subject]++;
  console.log(`  총 문항: ${all.length}, 과목별 풀:`, pool);
  console.log(`  이미지 문항: ${all.filter((q) => q.figure).length}`);

  if (errors.length) {
    hadError = true;
    console.error(`  ❌ 검증 오류 ${errors.length}건:`);
    for (const e of errors.slice(0, 50)) console.error("    - " + e);
    continue;
  }

  writeFileSync(out, JSON.stringify(all));
  console.log(`  ✅ 검증 통과 → ${out} (${all.length}문항)`);
}

if (hadError) process.exit(1);
console.log("\n완료.");
