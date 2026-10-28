import questions from './tesat/questions.json';
import authored from './tesat/authored-questions.json';
import archivedOriginals from './tesat/archived-original-questions.json';
import terms from './tesat/terms.json';
import manifest from './tesat/manifest.json';
import type { Article, TesatQuestion, Term } from '../lib/tesat';

export const TESAT_BANK = questions as TesatQuestion[];
export const TESAT_ARCHIVE_BANK = [...authored, ...archivedOriginals] as TesatQuestion[];
export const TESAT_TERMS = terms as Term[];
export const TESAT_ARTICLES = manifest.articles as Article[];
export const TESAT_RANGES = manifest.ranges;
export const TESAT_COLLECTED_AT = manifest.collectedAt;
