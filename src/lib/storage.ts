import type { ExamResult } from "./quiz";

const HISTORY_KEY = "ncq.history.v1";
const WRONG_KEY = "ncq.wrongbook.v1";
const MAX_HISTORY = 30;

export interface HistoryEntry {
  date: number; // epoch ms
  score: number;
  correctCount: number;
  total: number;
  passed: boolean;
}

/** 오답노트 항목: 문항 + 사용자가 골랐던(섞인 기준) 보기 텍스트 */
export interface WrongEntry {
  date: number;
  id: string;
  exam: string;
  subject: string;
  question: string;
  figure?: string;
  options: string[];
  correctText: string;
  selectedText: string | null;
  explanation: string;
}

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* 저장 실패는 무시(시크릿 모드 등) */
  }
}

export function getHistory(): HistoryEntry[] {
  return read<HistoryEntry[]>(HISTORY_KEY, []);
}

export function getWrongBook(): WrongEntry[] {
  return read<WrongEntry[]>(WRONG_KEY, []);
}

export function clearWrongBook(): void {
  write(WRONG_KEY, []);
}

/** 시험 결과를 기록과 오답노트에 누적 저장한다. */
export function saveResult(result: ExamResult, date: number): void {
  const history = getHistory();
  history.unshift({
    date,
    score: result.score,
    correctCount: result.correctCount,
    total: result.total,
    passed: result.passed,
  });
  write(HISTORY_KEY, history.slice(0, MAX_HISTORY));

  const book = getWrongBook();
  const existing = new Set(book.map((w) => w.id));
  for (const it of result.wrong) {
    if (existing.has(it.question.id)) continue; // 같은 문항 중복 저장 방지
    existing.add(it.question.id);
    book.unshift({
      date,
      id: it.question.id,
      exam: it.question.exam,
      subject: it.question.subject,
      question: it.question.question,
      figure: it.question.figure,
      options: it.options,
      correctText: it.options[it.answerIndex],
      selectedText: it.selected === null ? null : it.options[it.selected],
      explanation: it.question.explanation,
    });
  }
  write(WRONG_KEY, book);
}
