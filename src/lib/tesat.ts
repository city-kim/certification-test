import type { McqQuestion } from './types.ts';

export type SourceId = 'quiz' | 'taste' | 'today';
export type WrongStatus = 'unreviewed' | 'again' | 'done';
export type StudyMode = 'learn' | 'test' | 'review';
export interface TesatQuestion extends McqQuestion {
  title: string;
  delivery: 'authored' | 'reference';
  keyPoints: string[];
  termIds: string[];
  sourceRefs: NonNullable<McqQuestion['sourceRefs']>;
  publishedAt: string;
  optionExplanations: string[];
}
export interface Term {
  id: string;
  name: string;
  subject: string;
  definition: string;
  explanation: string;
  example: string;
  contrast: string;
  caseStudy?: { question: string; options: string[]; answer: string; explanation: string; figure?: string };
  aliases?: string[];
  articleIds: string[];
}
export interface Article {
  id: string;
  source: SourceId;
  kind: 'questions' | 'terms';
  title: string;
  url: string;
  publishedAt: string;
  status: string;
  questionCount: number | null;
  imageCount: number | null;
  included: boolean;
  note?: string;
  summary?: string[];
  termIds?: string[];
}
export interface QuestionProgress {
  attempts: number;
  wrongCount: number;
  lastSelected: number | null;
  lastCorrect: boolean;
  lastAttempt: number;
  wrongStatus?: WrongStatus;
}
export interface StudySession {
  id: string;
  mode: StudyMode;
  ids: string[];
  cursor: number;
  selections: Record<string, number | null>;
  graded: Record<string, boolean>;
  completed: boolean;
}
export interface StudyResult {
  id: string;
  date: number;
  correct: number;
  total: number;
  ids: string[];
}
export interface LearningState {
  version: 1;
  progress: Record<string, QuestionProgress>;
  terms: Record<string, 'known' | 'again'>;
  session: StudySession | null;
  history: StudyResult[];
}
export const SOURCE_LABELS: Record<SourceId, string> = {
  quiz: '경제·금융 상식 퀴즈', taste: '테샛 맛보기', today: '오늘의 TESAT',
};
export const SUBJECT_LABELS: Record<string, string> = {
  micro: '미시경제', macro: '거시경제', finance: '금융', international: '국제경제', business: '기업·경영', current: '시사경제',
};
export const emptyLearning = (): LearningState => ({ version: 1, progress: {}, terms: {}, session: null, history: [] });

export function newSession(ids: string[], mode: StudyMode, id: string): StudySession {
  return { id, mode, ids: [...new Set(ids)], cursor: 0, selections: {}, graded: {}, completed: false };
}

/** Reopen an ongoing question without creating a set or changing any answers. */
export function focusStudySession(session: StudySession | null, questionId?: string): StudySession | null {
  if (!session || session.completed) return null;
  const cursor = questionId === undefined ? session.cursor : session.ids.indexOf(questionId);
  if (cursor < 0 || cursor >= session.ids.length) return null;
  return cursor === session.cursor ? session : { ...session, cursor };
}

/** One immutable transaction per submission. Repeated submit does not double-count. */
export function submitLearning(state: LearningState, bank: TesatQuestion[], now: number, all = false): LearningState {
  const session = state.session;
  if (!session || session.completed || !session.ids.length) return state;
  const lookup = new Map(bank.map(q => [q.id, q]));
  const ids = all ? session.ids : [session.ids[session.cursor]];
  const progress = { ...state.progress };
  const graded = { ...session.graded };
  for (const id of ids) {
    const q = lookup.get(id);
    if (!q || graded[id]) continue;
    const selected = session.selections[id] ?? null;
    if (!all && selected === null) continue;
    const correct = selected === q.answerIndex;
    const old = progress[id];
    const wrongCount = (old?.wrongCount ?? 0) + Number(!correct);
    progress[id] = {
      attempts: (old?.attempts ?? 0) + 1, wrongCount,
      lastSelected: selected, lastCorrect: correct, lastAttempt: now,
      wrongStatus: correct ? (wrongCount ? 'done' : undefined) : (wrongCount > 1 ? 'again' : 'unreviewed'),
    };
    graded[id] = true;
  }
  const completed = session.ids.every(id => graded[id]);
  const result: StudyResult = { id: session.id, date: now, ids: session.ids,
    total: session.ids.length, correct: session.ids.filter(id => session.selections[id] === lookup.get(id)?.answerIndex).length };
  return { ...state, progress, session: { ...session, graded, completed },
    history: completed ? [result, ...state.history.filter(h => h.id !== result.id)].slice(0, 30) : state.history };
}

export function updateSelection(state: LearningState, id: string, selected: number): LearningState {
  const s = state.session;
  if (!s || !s.ids.includes(id) || s.graded[id] || s.completed) return state;
  return { ...state, session: { ...s, selections: { ...s.selections, [id]: selected } } };
}

/** Remove obsolete question IDs on data updates without touching other certificates. */
export function reconcileLearning(state: LearningState, bank: TesatQuestion[]): LearningState {
  const s = state.session;
  if (!s) return state;
  const valid = new Set(bank.map(q => q.id));
  const ids = s.ids.filter(id => valid.has(id));
  if (ids.length === s.ids.length) return state;
  return { ...state, session: ids.length ? { ...s, ids, cursor: Math.min(s.cursor, ids.length - 1), completed: ids.every(id=>s.graded[id]) } : null };
}

export interface StudyFilter { source: string; month: string; subject: string; status: string; search: string }
export const emptyFilter: StudyFilter = { source: '', month: '', subject: '', status: '', search: '' };
export function filterQuestions(bank: TesatQuestion[], filter: StudyFilter, progress: LearningState['progress']): TesatQuestion[] {
  const query = filter.search.trim().toLowerCase();
  return bank.filter(q => {
    const p = progress[q.id];
    // Source and date must match the same reference for cross-posted questions.
    return q.sourceRefs.some(r => (!filter.source || r.source === filter.source) && (!filter.month || r.publishedAt.startsWith(filter.month)))
      && (!filter.subject || q.subject === filter.subject)
      && (!filter.status || (filter.status === 'new' ? !p : filter.status === 'correct' ? p?.lastCorrect : p?.wrongStatus && p.wrongStatus !== 'done'))
      && (!query || [q.title, q.question, ...q.keyPoints, ...q.sourceRefs.map(r=>r.title)].join(' ').toLowerCase().includes(query));
  }).map(q => ({ ...q, publishedAt: q.sourceRefs
    .filter(r => (!filter.source || r.source === filter.source) && (!filter.month || r.publishedAt.startsWith(filter.month)))
    .map(r => r.publishedAt).sort().slice(-1)[0] }))
    .sort((a,b)=>b.publishedAt.localeCompare(a.publishedAt)||a.number-b.number||a.id.localeCompare(b.id));
}

export function selectPractice(bank: TesatQuestion[], count = 20, random = Math.random): string[] {
  const ids = [...new Set(bank.map(q=>q.id))];
  for (let i=ids.length-1;i>0;i--) { const j=Math.floor(random()*(i+1)); [ids[i],ids[j]]=[ids[j],ids[i]]; }
  return ids.slice(0,count);
}
