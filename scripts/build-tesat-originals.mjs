import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';

const MARKERS = '①②③④⑤';
const compact = text => text.replace(/\s+/g, '');
const normalize = text => text.normalize('NFKC').replace(/[^\p{L}\p{N}]/gu, '').toLowerCase();
const hash = text => createHash('sha256').update(text).digest('hex');
const SUBJECT_PATTERNS = {
  international: /환율|수출|수입품|무역|관세|외환|국제수지|엔화|해외직접투자/,
  macro: /총수요|총공급|물가|인플레이션|실업|고용률|경제성장|국내총생산|정부지출|재정|통화량|중앙은행/,
  micro: /수요|공급|잉여|효용|경쟁시장|독점|외부효과|기회비용|가격상한|가격하한|보완\s*관계|대체\s*관계/,
  finance: /주식|주가|채권|금리|펀드|대출|예금|금융|증권|배당|투자자|신용|암호화폐/,
  business: /기업|경영|회계|매출|인수합병|생산성|재무|임원|특허|산업|브랜드/,
};

export function loadOriginals(root, terms) {
  const folder = resolve(root, 'src/data/tesat/imports');
  const read = name => JSON.parse(readFileSync(resolve(folder, name), 'utf8'));
  const parsed = read('parsed-questions.json');
  const report = read('import-report.json');
  const articles = read('article-metadata.json');
  const assets = read('asset-map.json');
  if (report.errors.length) throw Error('Resolve HTML import errors first');
  const metadata = new Map(articles.map(a => [a.source+':'+a.captureIndex, a]));
  if (metadata.size !== report.articles.length) throw Error('Missing or duplicate imported article metadata');
  for (const source of new Set(report.articles.map(a=>a.source))) {
    const raw = read('raw/'+source+'.json');
    const expected = report.articles.filter(a => a.source === source);
    if (raw.length !== expected.length) throw Error(source+': stale import report');
    for (const a of expected) {
      if (hash(raw[a.captureIndex-1]) !== a.sha256) throw Error(source+': re-import edited HTML before building');
    }
  }
  function content(nodes) {
    return nodes.map(node => {
      if (typeof node === 'string') return node;
      if (!['box','p','strong','em','sub','sup','br','img'].includes(node.tag)) throw Error('Unsupported original markup');
      if (node.tag === 'img') {
        const src = assets[node.src];
        if (!src || !existsSync(resolve(root, 'public', src))) throw Error('Missing supplied problem image: '+node.src);
        return {tag:'img',src,alt:node.alt};
      }
      return {tag:node.tag,...(node.children ? {children:content(node.children)} : {})};
    });
  }
  const forms = terms.map(t => ({term:t,forms:[t.name,t.name.replace(/\([^)]*\)/g,''),...(t.aliases??[])]
    .filter(Boolean).map(text => ({text, normalized:normalize(text)})).filter(x=>x.normalized.length>=2)}));
  function links(q) {
    const answer = normalize(q.options[q.answerIndex]);
    const exact = forms.find(item => item.forms.some(form => form.normalized === answer));
    const body = q.question+' '+(q.officialExplanation??'');
    const normalized = normalize(body);
    const related = forms.filter(item => item.forms.some(form => {
      if (form.normalized.length < 3) return false;
      if (item.term.id==='private-banking' && /자체\s*브랜드/.test(body)) return false;
      if (item.term.id==='disclosure' && /공시지가/.test(body)) return false;
      return normalized.includes(form.normalized);
    })).map(item=>item.term);
    return {exact:exact?.term, related:[...new Map([...(exact?[exact.term]:[]),...related].map(t=>[t.id,t])).values()].slice(0,6)};
  }
  const questions = new Map();
  const answerKeys = new Map();
  const occurrences = [];
  const ordered=[...parsed].sort((a,b)=>metadata.get(b.source+':'+b.captureIndex).publishedAt.localeCompare(metadata.get(a.source+':'+a.captureIndex).publishedAt)||a.originalNumber-b.originalNumber);
  for (const q of ordered) {
    const article = metadata.get(q.source+':'+q.captureIndex);
    if (!article) throw Error('Unmapped original article');
    const base = JSON.stringify([compact(q.question),q.options.map(compact),q.images]);
    if (answerKeys.has(base) && answerKeys.get(base)!==q.answerIndex) throw Error('Conflicting supplied answer keys');
    answerKeys.set(base,q.answerIndex);
    const id = 'tesat-original-'+hash(base+':'+q.answerIndex).slice(0,20);
    const ref = {articleId:article.id,source:q.source,title:article.title,publishedAt:article.publishedAt,
      url:article.url,questionNumber:q.originalNumber,captureIndex:q.captureIndex};
    occurrences.push({source:q.source,captureIndex:q.captureIndex,number:q.originalNumber,id});
    const previous = questions.get(id);
    if (previous) {
      previous.sourceRefs.push(ref);
      continue;
    }
    const {exact,related} = links(q);
    let subject = /총수요|총공급/.test(q.question) ? 'macro'
      : /시장경제|완전경쟁|보완\s*관계|대체\s*관계/.test(q.question) ? 'micro' : exact?.subject;
    if (!subject) subject = Object.entries(SUBJECT_PATTERNS).find(([,pattern])=>pattern.test(q.question))?.[0]??related[0]?.subject??'current';
    const answerLine = `제공 원문 정답표: ${MARKERS[q.answerIndex]} ${q.options[q.answerIndex]}`;
    const explanation = q.officialExplanation || (exact
      ? `${answerLine}\n\n관련 개념: ${exact.name}\n${exact.definition}\n${exact.explanation}`
      : `${answerLine}\n\n원문에는 별도 해설이 없습니다. 이 문항은 ${article.publishedAt} 게시 당시의 조건과 정답표를 기준으로 채점합니다.`);
    const stem = content(q.content);
    questions.set(id, {id,exam:'original-'+q.source,number:q.originalNumber,type:'mcq',subject,
      title:q.question.split('\n')[0].slice(0,90),question:q.question,content:stem,
      ...(q.images.length?{figure:assets[q.images[0]]}:{}), options:q.options,answerIndex:q.answerIndex,
      explanation,explanationKind:q.officialExplanation?'original':exact?'concept':'answer-key',
      ...(q.issues?.length?{originalIssues:q.issues}:{}),
      ...(q.imageContainsChoices?{imageContainsChoices:true}:{}),
      keyPoints:exact?[exact.definition,exact.contrast]:[],termIds:related.map(t=>t.id),optionExplanations:[],
      publishedAt:article.publishedAt,sourceRefs:[ref],delivery:'original',shuffleOptions:false});
  }
  for (const q of questions.values()) {
    q.sourceRefs.sort((a,b)=>b.publishedAt.localeCompare(a.publishedAt)||a.questionNumber-b.questionNumber);
    q.publishedAt=q.sourceRefs[0].publishedAt;
    q.number=q.sourceRefs[0].questionNumber;
  }
  const bank=[...questions.values()].sort((a,b)=>b.publishedAt.localeCompare(a.publishedAt)||a.number-b.number||a.id.localeCompare(b.id));
  if (occurrences.length!==report.questionCount) throw Error('HTML import coverage mismatch');
  for (const article of articles) {
    const count=occurrences.filter(q=>q.source===article.source&&q.captureIndex===article.captureIndex).length;
    if (count!==article.questionCount) throw Error(article.id+': original article count mismatch');
  }
  return {questions:bank,articles:articles.map(a=>({...a,provided:true})),occurrences,
    stats:{providedArticles:articles.length,originalOccurrences:occurrences.length,originalQuestions:bank.length,
      repeatedOccurrences:occurrences.length-bank.length,originalExplanations:bank.filter(q=>q.explanationKind==='original').length,
      conceptExplanations:bank.filter(q=>q.explanationKind==='concept').length,answerKeyOnly:bank.filter(q=>q.explanationKind==='answer-key').length,
      originalImages:new Set(parsed.flatMap(q=>q.images)).size,originalIssueQuestions:bank.filter(q=>q.originalIssues?.length).length}};
}
