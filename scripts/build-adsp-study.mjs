import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "src/data/adsp/flashcards.tsv");
const destination = path.join(root, "src/data/flashcards/adsp.json");

const rows = fs.readFileSync(source, "utf8").trim().split("\n").slice(1);
const cards = rows.map((row, index) => {
  const [prompt, answer, tag] = row.split("\t");
  const subject = tag.startsWith("1과목")
    ? "understanding"
    : tag.startsWith("2과목")
      ? "planning"
      : "analysis";

  return {
    id: `adsp-card-${String(index + 1).padStart(3, "0")}`,
    subject,
    prompt,
    answers: [answer],
    explanation: `${tag.replace(/^\d과목\s*/, "")} 핵심 개념입니다. 정답 문장 전체보다 굵직한 핵심어를 먼저 회상하세요.`,
  };
});

fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.writeFileSync(destination, `${JSON.stringify(cards, null, 2)}\n`);
console.log(`${cards.length} cards -> ${path.relative(root, destination)}`);
