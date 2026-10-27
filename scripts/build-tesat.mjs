import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import applications from '../src/data/tesat/applications.mjs';

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
const articles=manifest.articles.map(a=>({...a,...Object.fromEntries(Object.entries(overrides[a.id]??{}).filter(([k])=>k!=='conceptIds'))}));
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
const questions=terms.map((t,index)=>{
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
  questions.push({...app,exam:'applications',number:questions.length+1,type:'mcq',publishedAt:sourceRefs[0].publishedAt,sourceRefs,delivery:'authored',shuffleOptions:false});
}
for(const a of articles) {
  a.termIds=(mapping[a.id]??[]).filter(id=>termsById.has(id));
  if(a.kind==='terms'&&a.included&&!a.summary) a.summary=[
    `${a.termIds.length}개 개념을 분야별로 연결했습니다. 아래 용어를 누르면 뜻·예시·혼동 포인트와 암기카드를 볼 수 있습니다.`,
    ...Object.entries(labels).map(([key,label])=>{const names=a.termIds.map(id=>termsById.get(id)).filter(t=>t.subject===key).map(t=>t.name);return names.length?`${label}: ${names.join(' · ')}`:null;}).filter(Boolean),
  ];
}
const errors=[];
const ids=new Set();
for(const q of questions) {
  if(ids.has(q.id))errors.push(q.id+': duplicate id');ids.add(q.id);
  if(![4,5].includes(q.options.length)||new Set(q.options).size!==q.options.length)errors.push(q.id+': invalid choices');
  if(!Number.isInteger(q.answerIndex)||q.answerIndex<0||q.answerIndex>=q.options.length)errors.push(q.id+': invalid answer');
  if(q.optionExplanations.length!==q.options.length||q.optionExplanations.some(x=>!x.trim()))errors.push(q.id+': missing choice explanation');
  if(!q.keyPoints.length||!q.explanation||!q.termIds.length||q.termIds.some(id=>!termsById.has(id)))errors.push(q.id+': missing study material');
  if(q.figure&&!existsSync(resolve(root,'public',q.figure)))errors.push(q.id+': missing figure');
}
for(const a of included) {
  if(!a.termIds.length)errors.push(a.id+': no concept coverage');
  if(a.kind==='questions'&&!(a.questionCount>0))errors.push(a.id+': original question count requires review');
}
if(errors.length)throw Error(errors.join('\n'));
save('questions.json',questions);save('terms.json',terms);save('manifest.json',{...manifest,articles});
const stats={sourceArticles:included.filter(a=>a.kind==='questions').length,currentArticles:included.filter(a=>a.kind==='terms').length,sourceQuestions:included.filter(a=>a.kind==='questions').reduce((s,a)=>s+a.questionCount,0),practiceQuestions:questions.length,terms:terms.length};
save('coverage.json',stats);
mkdirSync(resolve(root,'docs'),{recursive:true});
writeFileSync(resolve(root,'docs/tesat-sources.md'),`# TESAT 자료 목록\n\n확인일: ${manifest.collectedAt}. 원문은 출처에서 제공하며 앱 문제·해설은 별도 작성한 개념 연습입니다.\n\n`+
  manifest.ranges.map(r=>`- ${r.source}: ${r.start} ~ ${r.end}`).join('\n')+`\n\n문제 원문 ${stats.sourceArticles}편(${stats.sourceQuestions}문항), 시사용어 ${stats.currentArticles}편. 자체 연습 ${stats.practiceQuestions}문항, 용어 ${stats.terms}개.\n\n`+
  '| 출처 | 게시일 | 제목 | 원문 문항 | 연결 개념 | 상태 |\n|---|---|---|---:|---:|---|\n'+articles.map(a=>`| ${a.source} | ${a.publishedAt} | [${a.title.replaceAll('|','/').trim()}](${a.url}) | ${a.questionCount??'확인 필요'} | ${a.termIds.length} | ${a.included?a.status:'제외'}${a.note?' · '+a.note:''} |`).join('\n')+'\n');
console.log(stats);
