import type { ExamResult } from "./quiz";

const MAX_HISTORY = 30;

const historyKey = (certId: string) => `ncq.${certId}.history.v1`;
const wrongKey = (certId: string) => `ncq.${certId}.wrongbook.v1`;

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

/**
 * 자격증 분기 이전(단일 자격증 시절) 전역 키를 network_2 네임스페이스로 1회 이관.
 * 기존 사용자의 기록/오답노트를 보존한다.
 */
function migrateLegacy(certId: string): void {
  if (certId !== "network_2") return;
  try {
    const oldH = localStorage.getItem("ncq.history.v1");
    if (oldH && !localStorage.getItem(historyKey(certId))) {
      localStorage.setItem(historyKey(certId), oldH);
      localStorage.removeItem("ncq.history.v1");
    }
    const oldW = localStorage.getItem("ncq.wrongbook.v1");
    if (oldW && !localStorage.getItem(wrongKey(certId))) {
      localStorage.setItem(wrongKey(certId), oldW);
      localStorage.removeItem("ncq.wrongbook.v1");
    }
  } catch {
    /* 무시 */
  }
}

export function getHistory(certId: string): HistoryEntry[] {
  migrateLegacy(certId);
  return read<HistoryEntry[]>(historyKey(certId), []);
}

export function getWrongBook(certId: string): WrongEntry[] {
  migrateLegacy(certId);
  return read<WrongEntry[]>(wrongKey(certId), []);
}

export function clearWrongBook(certId: string): void {
  write(wrongKey(certId), []);
}

/** 시험 결과를 해당 자격증의 기록과 오답노트에 누적 저장한다. */
export function saveResult(certId: string, result: ExamResult, date: number): void {
  const history = getHistory(certId);
  history.unshift({
    date,
    score: result.score,
    correctCount: result.correctCount,
    total: result.total,
    passed: result.passed,
  });
  write(historyKey(certId), history.slice(0, MAX_HISTORY));

  const book = getWrongBook(certId);
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
  write(wrongKey(certId), book);
}
