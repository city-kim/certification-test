import type { ExamItem, Question, ShortQuestion } from "./types";
import { isShort } from "./types";
import type { CertConfig } from "./certs";
import { totalQuestions } from "./certs";

/** Fisher–Yates 셔플 (원본 불변, 새 배열 반환) */
export function shuffle<T>(arr: readonly T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** 주관식 채점용 정규화: 앞뒤 공백 제거 + 내부 공백 1칸으로 축약 */
function normalize(text: string, caseSensitive: boolean): string {
  const t = text.trim().replace(/\s+/g, " ");
  return caseSensitive ? t : t.toLowerCase();
}

/**
 * 주관식 정답 판정. answers 중 하나와 일치하면 정답.
 * caseSensitive 문항(리눅스 명령어 등)은 대소문자까지 맞아야 한다.
 */
export function checkShortAnswer(q: ShortQuestion, input: string): boolean {
  const cs = q.caseSensitive === true;
  const value = normalize(input, cs);
  if (!value) return false;
  return q.answers.some((a) => normalize(a, cs) === value);
}

/** 문항 유형과 무관하게 응답했는지 여부 */
export function isAnswered(item: ExamItem): boolean {
  return isShort(item.question) ? item.input.trim() !== "" : item.selected !== null;
}

/** 문항 유형과 무관하게 정답인지 여부 */
export function isCorrect(item: ExamItem): boolean {
  return isShort(item.question)
    ? checkShortAnswer(item.question, item.input)
    : item.selected === item.answerIndex;
}

/** 채점·복습 화면에 표시할 대표 정답 텍스트 */
export function correctText(item: ExamItem): string {
  return isShort(item.question) ? item.question.answers[0] : item.options[item.answerIndex];
}

/** 출제 전 원본 문항의 대표 정답 텍스트 (학습 화면처럼 ExamItem 이 없을 때 쓴다) */
export function questionAnswer(q: Question): string {
  return isShort(q) ? q.answers[0] : q.options[q.answerIndex];
}

/** 사용자가 낸 답 (미응답이면 null) */
export function answerText(item: ExamItem): string | null {
  if (isShort(item.question)) {
    const v = item.input.trim();
    return v === "" ? null : v;
  }
  return item.selected === null ? null : item.options[item.selected];
}

/** 한 문항을 ExamItem 으로 변환. 4지선다는 보기 순서를 섞는다(정답 위치 재계산). */
function toExamItem(q: Question): ExamItem {
  if (isShort(q)) {
    return { question: q, options: [], answerIndex: -1, selected: null, input: "", hintUsed: false };
  }
  const order = shuffle(q.options.map((_, i) => i)); // 원래 인덱스의 셔플 순서
  const options = order.map((i) => q.options[i]);
  const answerIndex = order.indexOf(q.answerIndex);
  return { question: q, options, answerIndex, selected: null, input: "", hintUsed: false };
}

/**
 * 자격증 과목별 정원에 맞춰 무작위 출제. 보기 순서도 섞는다.
 * 풀이 부족 시 가능한 만큼만 뽑는다(정상 데이터에선 항상 충분).
 */
export function buildExam(bank: Question[], cert: CertConfig): ExamItem[] {
  const items: ExamItem[] = [];
  for (const { key, count } of cert.subjects) {
    const pool = bank.filter((q) => q.subject === key);
    const picked = shuffle(pool).slice(0, count);
    for (const q of picked) items.push(toExamItem(q));
  }
  return items;
}

export interface SubjectResult {
  key: string;
  label: string;
  total: number;
  correct: number;
  /** 과락 통과 여부(자격증에 과락이 없으면 항상 true) */
  passed: boolean;
}

export interface ExamResult {
  items: ExamItem[];
  wrong: ExamItem[];
  correctCount: number;
  total: number;
  /** 100점 만점 환산 점수 */
  score: number;
  subjects: SubjectResult[];
  /** 합격: 총점 기준 이상 + 모든 과목 과락 통과 */
  passed: boolean;
}

export function grade(items: ExamItem[], cert: CertConfig): ExamResult {
  const ratio = cert.subjectPassRatio;

  const subjects: SubjectResult[] = cert.subjects.map(({ key, label }) => {
    const subItems = items.filter((it) => it.question.subject === key);
    const correct = subItems.filter(isCorrect).length;
    const passed =
      ratio <= 0 || subItems.length === 0 || correct / subItems.length >= ratio;
    return { key, label, total: subItems.length, correct, passed };
  });

  const correctCount = items.filter(isCorrect).length;
  const total = items.length || totalQuestions(cert);
  const score = Math.round((correctCount / total) * 100);
  const passed = score >= cert.passScore && subjects.every((s) => s.passed);
  const wrong = items.filter((it) => !isCorrect(it));

  return { items, wrong, correctCount, total, score, subjects, passed };
}
