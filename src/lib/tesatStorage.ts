import { useEffect, useState } from 'react';
import { emptyLearning, type LearningState } from './tesat';

export const TESAT_STORAGE_KEY = 'ncq.tesat.learning.v1';
const EVENT = 'tesat-learning-changed';
let memory: LearningState = emptyLearning();
let storageFailed = false;

export function readLearning(): LearningState {
  if (storageFailed) return memory;
  try {
    const raw = localStorage.getItem(TESAT_STORAGE_KEY);
    if (!raw) return memory;
    const parsed = JSON.parse(raw);
    if (parsed.version !== 1 || !parsed.progress || typeof parsed.progress !== 'object' || !parsed.terms || typeof parsed.terms !== 'object' || !Array.isArray(parsed.history)) return memory;
    if (parsed.session && (!Array.isArray(parsed.session.ids) || !parsed.session.ids.every((id: unknown) => typeof id === 'string') || !Number.isInteger(parsed.session.cursor) || parsed.session.cursor < 0 || parsed.session.cursor >= parsed.session.ids.length || !parsed.session.selections || !parsed.session.graded)) return memory;
    memory = parsed;
  } catch { /* A corrupt or unavailable store must not crash study. */ }
  return memory;
}
export function changeLearning(update: (old: LearningState) => LearningState): void {
  memory = update(readLearning());
  try { localStorage.setItem(TESAT_STORAGE_KEY, JSON.stringify(memory)); storageFailed = false; }
  catch { storageFailed = true; }
  window.dispatchEvent(new Event(EVENT));
}
export function useLearning() {
  const [state, setState] = useState(readLearning);
  const [failed, setFailed] = useState(storageFailed);
  useEffect(() => {
    const refresh = () => { setState(readLearning()); setFailed(storageFailed); };
    const onStorage = (e: StorageEvent) => { if (e.key === TESAT_STORAGE_KEY || e.key === null) { memory=emptyLearning(); refresh(); } };
    window.addEventListener(EVENT, refresh);
    window.addEventListener('storage', onStorage);
    window.addEventListener('focus', refresh);
    return () => { window.removeEventListener(EVENT, refresh); window.removeEventListener('storage', onStorage); window.removeEventListener('focus', refresh); };
  }, []);
  return { state, failed };
}
