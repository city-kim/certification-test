import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync,existsSync } from 'node:fs';
import { loadTS } from './load-ts.mjs';
const engine=await loadTS('src/lib/tesat.ts');
const quiz=await loadTS('src/lib/quiz.ts');
const {emptyLearning,newSession,focusStudySession,submitLearning,updateSelection,reconcileLearning,filterQuestions,emptyFilter,selectPractice}=engine;
const read=p=>JSON.parse(readFileSync(new URL('../'+p,import.meta.url),'utf8'));
const bank=read('src/data/tesat/questions.json');
const authored=read('src/data/tesat/authored-questions.json');
const archivedOriginals=read('src/data/tesat/archived-original-questions.json');
const archive=[...authored,...archivedOriginals];
const terms=read('src/data/tesat/terms.json');
const manifest=read('src/data/tesat/manifest.json');
const four=bank.find(q=>q.options.length===4),five=bank.find(q=>q.options.length===5);
const begin=(q,mode='learn',old=emptyLearning(),id='session')=>({...old,session:newSession([q.id],mode,id)});
const answer=(s,q,selected,time=100)=>submitLearning(updateSelection(s,q.id,selected),bank,time);

test('4/5지선다 정답 판정 및 완료 기록',()=>{
  for(const q of [four,five]) {
    const state=answer(begin(q),q,q.answerIndex);
    assert.equal(state.progress[q.id].lastCorrect,true);
    assert.equal(state.progress[q.id].wrongStatus,undefined);
    assert.equal(state.session.completed,true);
    assert.equal(state.history[0].correct,1);
  }
});
test('오답 → 재오답 → 복습 완료 → 재오답 상태와 횟수',()=>{
  const wrong=(five.answerIndex+1)%5;
  let state=answer(begin(five),five,wrong);
  assert.equal(state.progress[five.id].wrongStatus,'unreviewed');
  assert.equal(submitLearning(state,bank,101),state);
  state=answer(begin(five,'review',state,'second'),five,wrong,200);
  assert.equal(state.progress[five.id].wrongStatus,'again');
  state=answer(begin(five,'review',state,'third'),five,five.answerIndex,300);
  assert.equal(state.progress[five.id].wrongStatus,'done');
  assert.equal(state.progress[five.id].wrongCount,2);
  state=answer(begin(five,'review',state,'fourth'),five,wrong,400);
  assert.equal(state.progress[five.id].wrongStatus,'again');
  assert.equal(state.progress[five.id].attempts,4);
  assert.equal(state.progress[five.id].wrongCount,3);
});
test('학습에서 미응답은 제출되지 않고 실력 점검에서는 오답 처리',()=>{
  const state=begin(four);
  const notSubmitted=submitLearning(state,bank,100);
  assert.deepEqual(notSubmitted.progress,{});
  const result=submitLearning(begin(four,'test'),bank,200,true);
  assert.equal(result.progress[four.id].lastSelected,null);
  assert.equal(result.progress[four.id].wrongStatus,'unreviewed');
  assert.equal(result.history[0].correct,0);
});
test('부분 학습을 여러 번 채점해도 기존 제출은 중복 누적되지 않는다',()=>{
  let state={...emptyLearning(),session:newSession([four.id,five.id],'learn','mixed')};
  state=answer(state,four,four.answerIndex);
  state=submitLearning(state,bank,200);
  assert.equal(state.progress[four.id].attempts,1);
  state={...state,session:{...state.session,cursor:1}};
  state=answer(state,five,five.answerIndex);
  assert.equal(state.history.length,1);
  assert.equal(state.history[0].correct,2);
});
test('완료된 답은 수정되지 않는다',()=>{
  const state=answer(begin(four),four,four.answerIndex);
  assert.equal(updateSelection(state,four.id,(four.answerIndex+1)%4),state);
});
test('새로고침 뒤 같은 문제를 열면 세트·선택 답·채점 기록을 보존한다',()=>{
  let state={...emptyLearning(),session:newSession([four.id,five.id],'learn','ongoing')};
  state=answer(state,four,four.answerIndex);
  state=updateSelection(state,five.id,(five.answerIndex+1)%5);
  state.session.cursor=1;
  const saved=JSON.parse(JSON.stringify(state));
  const restored=focusStudySession(saved.session);
  assert.equal(restored.id,'ongoing');
  assert.equal(restored.cursor,1);
  assert.equal(restored.selections[five.id],(five.answerIndex+1)%5);
  assert.equal(restored.graded[four.id],true);
  assert.equal(restored.graded[five.id],undefined);
  const reopened=focusStudySession(restored,four.id);
  assert.equal(reopened.id,'ongoing');
  assert.equal(reopened.cursor,0);
  assert.deepEqual(reopened.ids,saved.session.ids);
  assert.deepEqual(reopened.selections,saved.session.selections);
  assert.deepEqual(reopened.graded,saved.session.graded);
  const resumed={...saved,session:reopened};
  assert.deepEqual(submitLearning(resumed,bank,300).progress,saved.progress);
  assert.equal(saved.progress[four.id].attempts,1);
});
test('진행 중인 실력 점검은 학습 모드로 바꾸거나 미리 채점하지 않는다',()=>{
  const state=updateSelection({...emptyLearning(),session:newSession([four.id,five.id],'test','test-set')},five.id,five.answerIndex);
  const resumed=focusStudySession(state.session,five.id);
  assert.equal(resumed.id,'test-set');
  assert.equal(resumed.mode,'test');
  assert.equal(resumed.selections[five.id],five.answerIndex);
  assert.deepEqual(resumed.graded,{});
  assert.deepEqual(state.progress,{});
});
test('다른 세트의 문제나 완료된 세트는 이어풀기로 잘못 열지 않는다',()=>{
  const active=newSession([four.id],'learn','active');
  assert.equal(focusStudySession(active,five.id),null);
  assert.equal(active.cursor,0);
  assert.equal(focusStudySession({...active,completed:true},four.id),null);
  assert.equal(focusStudySession(null),null);
});
test('출처와 게시월은 동일한 원문 참조에서 동시에 일치해야 한다',()=>{
  const q={...four,sourceRefs:[{source:'quiz',publishedAt:'2026-03-01',questionNumber:8},{source:'taste',publishedAt:'2026-04-01',questionNumber:2}]};
  assert.equal(filterQuestions([q],{...emptyFilter,source:'quiz',month:'2026-04'},{}).length,0);
  assert.equal(filterQuestions([q],{...emptyFilter,source:'taste',month:'2026-04'},{}).length,1);
  assert.equal(filterQuestions([q],{...emptyFilter,source:'quiz'},{} )[0].publishedAt,'2026-03-01');
  assert.equal(filterQuestions([q],{...emptyFilter,source:'quiz'},{} )[0].number,8);
  assert.equal(filterQuestions([q],{...emptyFilter,month:'2026-04'},{} )[0].number,2);
});
test('미학습과 오답 필터 및 복습 완료 제외',()=>{
  let state=answer(begin(four),four,(four.answerIndex+1)%4);
  assert.equal(filterQuestions([four,five],{...emptyFilter,status:'new'},state.progress).length,1);
  assert.equal(filterQuestions([four,five],{...emptyFilter,status:'wrong'},state.progress).length,1);
  state=answer(begin(four,'review',state,'review'),four,four.answerIndex);
  assert.equal(filterQuestions([four,five],{...emptyFilter,status:'wrong'},state.progress).length,0);
});
test('실력 점검은 중복 없이 최대 20개, 작은 풀은 있는 만큼',()=>{
  const selected=selectPractice(bank);
  assert.equal(selected.length,20);assert.equal(new Set(selected).size,20);
  assert.deepEqual(selectPractice([four,four]),[four.id]);
  assert.deepEqual(selectPractice([]),[]);
});
test('자료 갱신 시 사라진 문항을 제외하고 커서를 보정',()=>{
  const state={...emptyLearning(),session:{...newSession([four.id,'removed',five.id],'learn','resume'),cursor:2}};
  const result=reconcileLearning(state,bank);
  assert.deepEqual(result.session.ids,[four.id,five.id]);assert.equal(result.session.cursor,1);
  assert.equal(reconcileLearning({...state,session:newSession(['removed'],'learn','empty')},bank).session,null);
});
test('공통 출제 엔진은 보기 고정 문항과 5지선다를 보존',()=>{
  const cfg={id:'tesat',passScore:0,subjectPassRatio:0,subjects:[{key:five.subject,label:'연습',count:1}]};
  const items=quiz.buildExam([five],cfg);
  assert.deepEqual(items[0].options,five.options);
  assert.equal(items[0].answerIndex,five.answerIndex);
  items[0].selected=five.answerIndex;
  assert.equal(quiz.grade(items,cfg).correctCount,1);
});
test('기존 네트워크관리사 과목 정원 및 채점 회귀',()=>{
  const cfg=read('src/data/certs.config.json').certs.find(c=>c.id==='network_2');
  const old=read('src/data/network_2/questions.json');
  const items=quiz.buildExam(old,cfg);
  assert.equal(items.length,50);
  for(const subject of cfg.subjects)assert.equal(items.filter(i=>i.question.subject===subject.key).length,subject.count);
  items.forEach(it=>it.selected=it.answerIndex);
  const result=quiz.grade(items,cfg);assert.equal(result.score,100);assert.equal(result.passed,true);
});
test('기존 주관식 채점의 공백 및 대소문자 규칙 유지',()=>{
  const q={type:'short',answers:['show ip route'],caseSensitive:true};
  assert.equal(quiz.checkShortAnswer(q,' show  ip route '),true);
  assert.equal(quiz.checkShortAnswer(q,'SHOW IP ROUTE'),false);
});
test('전체 문항·출처·기간·용어·그림 연결 무결성',()=>{
  const ids=new Set(bank.map(q=>q.id));assert.equal(ids.size,bank.length);
  const tids=new Set(terms.map(t=>t.id));const articles=new Map(manifest.articles.map(a=>[a.id,a]));
  for(const q of bank) {
    assert.ok([4,5].includes(q.options.length));assert.ok(q.answerIndex>=0&&q.answerIndex<q.options.length);
    assert.equal(q.delivery,'original');
    assert.ok(q.explanation&&q.content.length);
    q.termIds.forEach(id=>assert.ok(tids.has(id)));
    q.sourceRefs.forEach(r=>{assert.ok(articles.get(r.articleId).included);const range=manifest.ranges.find(x=>x.source===r.source);assert.ok(range.start<=r.publishedAt&&r.publishedAt<=range.end);});
    if(q.figure)assert.ok(existsSync(new URL('../public/'+q.figure,import.meta.url)));
  }
  for(const a of manifest.articles.filter(a=>a.included&&a.kind==='terms'))assert.ok(a.termIds.length,a.id);
  const current=manifest.articles.filter(a=>a.kind==='terms'&&a.included);
  assert.equal(current.length,4);
  const range=manifest.ranges.find(r=>r.source==='current-terms');
  current.forEach(a=>assert.ok(range.start<=a.publishedAt&&a.publishedAt<=range.end));
  assert.ok(manifest.articles.filter(a=>a.title.includes('스도쿠')).every(a=>!a.included));
});
test('제공한 830문항의 지문·보기 순서·정답·원문 해설을 변형하지 않는다',()=>{
  const parsed=read('src/data/tesat/imports/parsed-questions.json');
  const occurrences=read('src/data/tesat/imports/occurrences.json');
  const byId=new Map([...bank,...archivedOriginals].map(q=>[q.id,q]));
  const articles=new Map(manifest.articles.map(a=>[a.source+':'+a.captureIndex,a]));
  assert.equal(parsed.length,830);assert.equal(byId.size,819);
  assert.equal(occurrences.length,parsed.length);
  const compact=s=>s.replace(/\s+/g,'');
  for(const original of parsed){
    const entry=occurrences.find(q=>q.source===original.source&&q.captureIndex===original.captureIndex&&q.number===original.originalNumber);
    const q=byId.get(entry.id);
    assert.equal(compact(q.question),compact(original.question));
    assert.deepEqual(q.options.map(compact),original.options.map(compact));
    assert.equal(q.answerIndex,original.answerIndex);
    assert.equal(q.shuffleOptions,false);
    const article=articles.get(original.source+':'+original.captureIndex);
    assert.ok(article);
    if(article.included||!bank.some(active=>active.id===q.id))assert.ok(q.sourceRefs.some(r=>r.source===original.source&&r.captureIndex===original.captureIndex&&r.questionNumber===original.originalNumber));
    if(original.officialExplanation)assert.equal(q.explanation,original.officialExplanation);
  }
  assert.equal([...byId.values()].filter(q=>q.figure).length,21);
});
test('기본 은행은 2025년 10월부터 확보된 최신 글까지만 포함한다',()=>{
  assert.equal(bank.length,362);
  assert.equal(archivedOriginals.length,457);
  const articles=manifest.articles.filter(a=>a.provided&&a.included);
  assert.equal(articles.length,106);
  for(const source of ['quiz','taste']){
    const selected=articles.filter(a=>a.source===source);
    const range=manifest.ranges.find(r=>r.source===source);
    assert.equal(range.start,'2025-10-01');
    assert.equal(range.end,source==='quiz'?'2026-04-06':'2026-10-14');
    assert.equal(selected.length,source==='quiz'?24:44);
    assert.equal(bank.filter(q=>q.sourceRefs.some(r=>r.source===source)).length,source==='quiz'?192:132);
  }
  assert.ok(bank.every(q=>q.sourceRefs.every(r=>r.publishedAt>='2025-10-01')));
  assert.ok(archivedOriginals.every(q=>q.sourceRefs.every(r=>r.publishedAt<'2025-10-01')));
  const ids=new Set(bank.map(q=>q.id));
  assert.ok(archive.every(q=>!ids.has(q.id)));
  const months=new Set(bank.flatMap(q=>q.sourceRefs.map(r=>r.publishedAt.slice(0,7))));
  assert.ok([...months].every(m=>m>='2025-10'));
});
test('오늘의 TESAT의 원문·그림 선택지·그림 문제·공식 정답을 연결한다',()=>{
  const questions=bank.filter(q=>q.sourceRefs.some(r=>r.source==='today'));
  assert.equal(questions.length,38);
  assert.equal(questions.at(-1).publishedAt,'2025-11-21');
  assert.equal(questions[0].publishedAt,'2026-10-27');
  assert.ok(questions.every(q=>q.options.length===5&&q.explanationKind==='original'));
  assert.equal(questions[0].options[questions[0].answerIndex],'님비(NIMBY)');
  assert.ok(questions[0].originalIssues.some(note=>note.includes('공식 게시글')));
  const table=questions.find(q=>q.sourceRefs.some(r=>r.captureIndex===11));
  assert.deepEqual(table.options,['(A) 가격탄력성 · (B) 대체재','(A) 가격탄력성 · (B) 보완재','(A) 가격탄력성 · (B) 정상재','(A) 교차탄력성 · (B) 대체재','(A) 교차탄력성 · (B) 보완재']);
  const graph=questions.find(q=>q.sourceRefs.some(r=>r.captureIndex===18));
  assert.equal(graph.answerIndex,4);
  assert.ok(graph.figure&&graph.explanation.includes('E+F'));
  const termArticle=manifest.articles.find(a=>a.source==='today'&&a.captureIndex===32);
  assert.equal(termArticle.kind,'terms');assert.equal(termArticle.included,false);
  assert.ok(!questions.some(q=>q.sourceRefs.some(r=>r.captureIndex===32)));
  assert.equal(manifest.articles.filter(a=>a.kind==='questions'&&a.included&&!a.provided).length,3);
  const wrong=answer(begin(table),table,0);
  assert.equal(wrong.progress[table.id].wrongStatus,'unreviewed');
  const done=answer(begin(table,'review',wrong,'today-review'),table,table.answerIndex);
  assert.equal(done.progress[table.id].wrongStatus,'done');
});
test('기간에서 제외한 원문의 오답은 유지하고 다시 채점할 수 있다',()=>{
  const q=archivedOriginals[0];
  const fullBank=[...bank,...archive];
  let state={...emptyLearning(),session:newSession([q.id],'learn','before-cutoff')};
  state=submitLearning(updateSelection(state,q.id,(q.answerIndex+1)%q.options.length),fullBank,100);
  state={...state,session:newSession([q.id,four.id],'learn','old-mixed')};
  const migrated=reconcileLearning(state,bank);
  assert.deepEqual(migrated.session.ids,[four.id]);
  assert.deepEqual(migrated.progress,state.progress);
  assert.deepEqual(migrated.history,state.history);
  const review={...migrated,session:newSession([q.id],'review','old-original-review')};
  assert.deepEqual(reconcileLearning(review,fullBank).session.ids,[q.id]);
  const graded=submitLearning(updateSelection(review,q.id,q.answerIndex),fullBank,200);
  assert.equal(graded.progress[q.id].wrongStatus,'done');
  assert.equal(graded.progress[q.id].wrongCount,1);
});
test('원문에 중복된 오답 보기는 그대로 보존하되 정답 번호대로 채점한다',()=>{
  const q=[...bank,...archivedOriginals].find(q=>q.originalIssues?.length&&q.options[0]===q.options[3]);
  const grade=selected=>submitLearning(updateSelection(begin(q),q.id,selected),[...bank,...archive],100);
  assert.equal(q.options[0],q.options[3]);assert.equal(q.answerIndex,2);
  assert.equal(grade(0).progress[q.id].lastCorrect,false);
  assert.equal(grade(3).progress[q.id].lastCorrect,false);
  assert.equal(grade(2).progress[q.id].lastCorrect,true);
});
test('기존 자체 연습의 진도는 원문에 전용하지 않고 이전 오답은 복습할 수 있다',()=>{
  const old=archive[0];
  let state={...emptyLearning(),session:newSession([old.id],'learn','old')};
  state=submitLearning(updateSelection(state,old.id,(old.answerIndex+1)%old.options.length),archive,100);
  state={...state,session:newSession([old.id],'learn','unfinished')};
  const migrated=reconcileLearning(state,bank);
  assert.equal(migrated.session,null);
  assert.deepEqual(migrated.progress,state.progress);
  assert.ok(!bank.some(q=>q.id===old.id));
  const reviewState={...migrated,session:newSession([old.id],'review','old-review')};
  const reviewed=submitLearning(updateSelection(reviewState,old.id,old.answerIndex),[...bank,...archive],200);
  assert.equal(reviewed.progress[old.id].wrongStatus,'done');
  assert.equal(reviewed.progress[old.id].wrongCount,1);
});
test('브라우저 저장·복원·저장 실패 시 메모리 보존 및 자격증 격리',async()=>{
  const values=new Map([['ncq.network_2.wrongbook.v1','existing']]);
  let fail=false;
  globalThis.localStorage={getItem:k=>values.get(k)??null,setItem:(k,v)=>{if(fail)throw Error('quota');values.set(k,v);}};
  globalThis.window=new EventTarget();
  const storage=await loadTS('src/lib/tesatStorage.ts');
  storage.changeLearning(()=>answer(begin(four),four,0));
  const restored=JSON.parse(values.get(storage.TESAT_STORAGE_KEY));
  assert.equal(restored.progress[four.id].attempts,1);
  assert.equal(values.get('ncq.network_2.wrongbook.v1'),'existing');
  fail=true;
  storage.changeLearning(old=>({...old,terms:{[terms[0].id]:'again'}}));
  storage.changeLearning(old=>({...old,terms:{...old.terms,[terms[1].id]:'known'}}));
  assert.equal(storage.readLearning().terms[terms[0].id],'again');
  fail=false;
  storage.changeLearning(old=>old);
  assert.equal(JSON.parse(values.get(storage.TESAT_STORAGE_KEY)).terms[terms[1].id],'known');
  values.set(storage.TESAT_STORAGE_KEY,'not-json');assert.doesNotThrow(()=>storage.readLearning());
});
