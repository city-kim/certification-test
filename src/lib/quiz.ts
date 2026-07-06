import type { ExamItem, Question } from "./types";
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

/** 한 문항의 보기 순서를 섞어 ExamItem 으로 변환 (정답 위치 재계산) */
function toExamItem(q: Question): ExamItem {
  const order = shuffle(q.options.map((_, i) => i)); // 원래 인덱스의 셔플 순서
  const options = order.map((i) => q.options[i]);
  const answerIndex = order.indexOf(q.answerIndex);
  return { question: q, options, answerIndex, selected: null };
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
  const isCorrect = (it: ExamItem) => it.selected === it.answerIndex;
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
