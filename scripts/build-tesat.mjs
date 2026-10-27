import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import applications from '../src/data/tesat/applications.mjs';
import { loadOriginals } from './build-tesat-originals.mjs';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const data=resolve(root,'src/data/tesat');
const read=name=>JSON.parse(readFileSync(resolve(data,name),'utf8'));
const save=(name,value)=>writeFileSync(resolve(data,name),JSON.stringify(value,null,2)+'\n');
const manifest=read('sources.json'), overrides=read('editorial.json'), mapping=read('article-concepts.json');
const explanationEntries=readFileSync(resolve(data,'term-explanations.psv'),'utf8').split('\n')
  .filter(line=>line.trim()&&!line.startsWith('#')).map(line=>{
    const fields=line.split('|');
    if(fields.length!==2||fields.some(field=>!field.trim()))throw Error('Invalid term explanation: '+line);
    return fields;
  });
const explanations=new Map(explanationEntries);
if(explanations.size!==explanationEntries.length)throw Error('Duplicate term explanation ID');
const articleMap=new Map(manifest.articles.map(a=>[a.id,{...a,...Object.fromEntries(Object.entries(overrides[a.id]??{}).filter(([k])=>k!=='conceptIds'))}]));
const supplied=JSON.parse(readFileSync(resolve(data,'imports/article-metadata.json'),'utf8'));
for(const a of supplied)articleMap.set(a.id,{...articleMap.get(a.id),...a,provided:true,included:true});
const articles=[...articleMap.values()].sort((a,b)=>a.source.localeCompare(b.source)||b.publishedAt.localeCompare(a.publishedAt));
const ranges=manifest.ranges.map(r=>{
  const dates=supplied.filter(a=>a.source===r.source).map(a=>a.publishedAt).sort();
  return dates.length?{...r,start:dates[0],end:dates[dates.length-1],basis:'user-provided-files'}:r;
});
const included=articles.filter(a=>a.included);
const concepts=readFileSync(resolve(data,'concepts.psv'),'utf8').split('\n').filter(l=>l.trim()&&!l.startsWith('#')).map(line=>{
  const fields=line.split('|');if(fields.length!==7)throw Error('Invalid concept: '+line);
  const [id,subject,name,definition,example,contrast,aliases]=fields;
  return {id,subject,name,definition,example,contrast,aliases:aliases.split(';'),articleIds:included.filter(a=>mapping[a.id]?.includes(id)).map(a=>a.id)};
});
const terms=concepts.filter(t=>t.articleIds.length).map(t=>{
  const explanation=explanations.get(t.id);
  if(!explanation)throw Error(t.id+': missing detailed explanation');
  const app=applications.find(q=>q.termIds[0]===t.id)??applications.find(q=>q.termIds.includes(t.id));
  return {...t,explanation,...(app?{caseStudy:{question:app.question,options:app.options,answer:app.options[app.answerIndex],explanation:app.explanation,...(app.figure?{figure:app.figure}:{})}}:{})};
});
for(const id of explanations.keys())if(!concepts.some(t=>t.id===id))throw Error(id+': unknown term explanation ID');
const termsById=new Map(terms.map(t=>[t.id,t]));
const labels={micro:'미시경제',macro:'거시경제',finance:'금융',international:'국제경제',business:'기업·경영',current:'시사경제'};
const refsFor=ids=>included.filter(a=>ids.includes(a.id)).map(a=>({articleId:a.id,source:a.source,title:a.title,publishedAt:a.publishedAt,url:a.url})).sort((a,b)=>b.publishedAt.localeCompare(a.publishedAt));
const authored=terms.map((t,index)=>{
  const candidates=terms.filter(x=>x.id!==t.id&&x.subject===t.subject);
  const optionCount=index%3===0?4:5;
  const offset=(index*7)%candidates.length;
  const others=Array.from({length:optionCount-1},(_,i)=>candidates[(offset+i)%candidates.length]);
  const answerIndex=index%optionCount;
  const options=[...others];options.splice(answerIndex,0,t);
  const sourceRefs=refsFor(t.articleIds);
  return {id:`tesat-concept-${t.id}`,exam:'concepts',number:index+1,type:'mcq',subject:t.subject,title:`${t.definition.slice(0,44)}${t.definition.length>44?'…':''}`,
    question:`다음 설명에 해당하는 개념을 고르세요.\n\n${t.definition}`,options:options.map(x=>x.name),answerIndex,
    explanation:`${t.name}: ${t.definition}\n${t.example}`,keyPoints:[t.definition,t.contrast],termIds:[t.id],
    optionExplanations:options.map(x=>x.id===t.id?`정답. ${t.example}`:`${x.name}: ${x.definition}`),
    publishedAt:sourceRefs[0].publishedAt,sourceRefs,delivery:'authored',shuffleOptions:false};
});
for(const app of applications) {
  const sourceRefs=refsFor(included.filter(a=>app.termIds.some(id=>mapping[a.id]?.includes(id))).map(a=>a.id));
  if(!sourceRefs.length)throw Error(`${app.id}: no sources`);
  authored.push({...app,exam:'applications',number:authored.length+1,type:'mcq',publishedAt:sourceRefs[0].publishedAt,sourceRefs,delivery:'authored',shuffleOptions:false});
}
const originals=loadOriginals(root,terms);
const questions=originals.questions;
for(const t of terms)t.articleIds=[...new Set([...t.articleIds,...questions.filter(q=>q.termIds.includes(t.id)).flatMap(q=>q.sourceRefs.map(r=>r.articleId))])];
for(const a of articles) {
  a.termIds=[...new Set([...(mapping[a.id]??[]).filter(id=>termsById.has(id)),...questions.filter(q=>q.sourceRefs.some(r=>r.articleId===a.id)).flatMap(q=>q.termIds)])];
  if(a.kind==='terms'&&a.included&&!a.summary) a.summary=[
    `${a.termIds.length}개 개념을 분야별로 연결했습니다. 아래 용어를 누르면 뜻·예시·혼동 포인트와 암기카드를 볼 수 있습니다.`,
    ...Object.entries(labels).map(([key,label])=>{const names=a.termIds.map(id=>termsById.get(id)).filter(t=>t.subject===key).map(t=>t.name);return names.length?`${label}: ${names.join(' · ')}`:null;}).filter(Boolean),
  ];
}
const errors=[];
const ids=new Set();
for(const q of [...questions,...authored]) {
  if(ids.has(q.id))errors.push(q.id+': duplicate id');ids.add(q.id);
  if(![4,5].includes(q.options.length)||(new Set(q.options).size!==q.options.length&&!(q.delivery==='original'&&q.originalIssues?.length)))errors.push(q.id+': invalid choices');
  if(!Number.isInteger(q.answerIndex)||q.answerIndex<0||q.answerIndex>=q.options.length)errors.push(q.id+': invalid answer');
  if(q.delivery!=='original'&&(q.optionExplanations.length!==q.options.length||q.optionExplanations.some(x=>!x.trim())))errors.push(q.id+': missing choice explanation');
  if(!q.explanation||q.termIds.some(id=>!termsById.has(id)))errors.push(q.id+': missing study material');
  if(q.delivery!=='original'&&(!q.keyPoints.length||!q.termIds.length))errors.push(q.id+': missing authored study material');
  if(q.figure&&!existsSync(resolve(root,'public',q.figure)))errors.push(q.id+': missing figure');
}
for(const a of included) {
  if(a.kind==='terms'&&!a.termIds.length)errors.push(a.id+': no concept coverage');
  if(a.kind==='questions'&&!(a.questionCount>0))errors.push(a.id+': original question count requires review');
}
if(errors.length)throw Error(errors.join('\n'));
save('questions.json',questions);save('authored-questions.json',authored);save('terms.json',terms);save('manifest.json',{...manifest,ranges,articles});
save('imports/occurrences.json',originals.occurrences);
const stats={sourceArticles:included.filter(a=>a.kind==='questions').length,currentArticles:included.filter(a=>a.kind==='terms').length,sourceQuestions:included.filter(a=>a.kind==='questions').reduce((s,a)=>s+a.questionCount,0),practiceQuestions:questions.length,terms:terms.length,...originals.stats,authoredQuestions:authored.length,referenceOnlyArticles:included.filter(a=>a.kind==='questions'&&!a.provided).length};
save('coverage.json',stats);
mkdirSync(resolve(root,'docs'),{recursive:true});
writeFileSync(resolve(root,'docs/tesat-sources.md'),`# TESAT 자료 목록\n\n확인일: ${manifest.collectedAt}. 사용자가 제공한 HTML JSON의 지문·보기·정답·해설을 보존해 등록했습니다.\n\n`+
  ranges.map(r=>`- ${r.source}: ${r.start} ~ ${r.end}${r.basis==='user-provided-files'?' (제공 파일 전체)':''}`).join('\n')+
  `\n\n제공 원문 ${stats.providedArticles}편, ${stats.originalOccurrences}문항. 동일 문항 ${stats.repeatedOccurrences}건을 출처와 함께 연결해 실제 문제은행은 ${stats.originalQuestions}문항입니다. 시사용어 ${stats.currentArticles}편, 용어 ${stats.terms}개.\n`+
  `\n오늘의 TESAT ${stats.referenceOnlyArticles}편은 원문 파일이 제공되지 않아 자료 링크로만 제공합니다. 기존 자체 연습 ${stats.authoredQuestions}문항은 Top Stories에서 제외하며 이전 오답 복습용으로 보존합니다.\n`+
  `\n테샛 맛보기의 해설은 제공 원문을 유지합니다. 해설이 없는 경제상식 퀴즈는 원문 정답표와 관련 개념 해설을 구분합니다. 그림 ${stats.originalImages}개와 보기 박스, 조합형 보기도 보존했습니다. 원문 확인사항이 있는 ${stats.originalIssueQuestions}문항은 임의 수정 없이 표시합니다.\n\n`+
  '| 출처 | 게시일 | 제목 | 원문 문항 | 연결 개념 | 상태 |\n|---|---|---|---:|---:|---|\n'+articles.map(a=>`| ${a.source} | ${a.publishedAt} | [${a.title.replaceAll('|','/').trim()}](${a.url}) | ${a.questionCount??'확인 필요'} | ${a.termIds.length} | ${a.included?a.provided?'제공 원문 등록':a.status:'제외'}${a.note?' · '+a.note:''} |`).join('\n')+'\n');
console.log(stats);
