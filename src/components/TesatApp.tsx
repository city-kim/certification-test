import { useEffect, useMemo, useState } from 'react';
import { TESAT_ARCHIVE_BANK, TESAT_ARTICLES, TESAT_BANK, TESAT_COLLECTED_AT, TESAT_RANGES, TESAT_TERMS } from '../data/tesat';
import { changeLearning, useLearning } from '../lib/tesatStorage';
import { displayedSelection, emptyFilter, filterQuestions, focusStudySession, newSession, presentQuestion, reconcileLearning, selectPractice, SOURCE_LABELS, SUBJECT_LABELS, submitLearning, updateSelection } from '../lib/tesat';
import type { SourceId, StudyFilter, StudyMode, StudySession, TesatQuestion, Term, WrongStatus } from '../lib/tesat';
import { fakeMeta } from '../secret/meta';
import ReviewItem from './ReviewItem';
import QuestionContent from './QuestionContent';
import QuestionImage from './QuestionImage';
import './TesatApp.css';

type View = 'home' | 'library' | 'session' | 'wrong' | 'terms' | 'current' | 'sources';
const MARKERS = '①②③④⑤';
const STATUS_LABELS = { unreviewed: '미복습', again: '다시 틀림', done: '복습 완료' };
const learningBank = [...TESAT_BANK, ...TESAT_ARCHIVE_BANK];
const lookup = new Map(learningBank.map(q => [q.id, q]));
const restoreLearning = (state: Parameters<typeof reconcileLearning>[0]) => reconcileLearning(state, state.session?.mode === 'review' ? learningBank : TESAT_BANK);
const termMap = new Map(TESAT_TERMS.map(t => [t.id, t]));
const VIEW_LABELS: Record<View, string> = {
  home: 'TESAT', library: '정답·해설 모아보기', session: '개념 학습',
  wrong: '오답노트', terms: '용어장·암기카드', current: '시사 경제용어 따라잡기', sources: '자료 목록',
};

export default function TesatApp({ secret = false }: { secret?: boolean }) {
  const { state, failed } = useLearning();
  const restoredSession = focusStudySession(restoreLearning(state).session);
  const [view, setView] = useState<View>(secret ? restoredSession ? 'session' : 'library' : 'home');
  const [filter, setFilter] = useState<StudyFilter>(emptyFilter);
  const [wrongFilter, setWrongFilter] = useState<WrongStatus | ''>('');
  const [termSearch, setTermSearch] = useState('');
  const [termStatus, setTermStatus] = useState('');
  const [termSubject, setTermSubject] = useState('');
  const [termFocus, setTermFocus] = useState<string | null>(null);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [cardMode, setCardMode] = useState(false);
  const [hideAnswers, setHideAnswers] = useState(false);
  const [showAllResults, setShowAllResults] = useState(false);
  const [openResultId, setOpenResultId] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(secret && restoredSession ? restoredSession.ids[restoredSession.cursor] : null);
  const [articleId, setArticleId] = useState('');
  const [limit, setLimit] = useState(secret && restoredSession ? Math.max(30, restoredSession.cursor + 1) : 30);

  useEffect(() => { changeLearning(restoreLearning); }, []);
  const session = state.session;
  const questions = useMemo(() => filterQuestions(TESAT_BANK, filter, state.progress)
    .filter(q => !articleId || q.sourceRefs.some(r => r.articleId === articleId))
    .map(q => {
      const ref = articleId ? q.sourceRefs.find(r => r.articleId === articleId)! : null;
      return ref ? { ...q, publishedAt: ref.publishedAt, number: ref.questionNumber ?? q.number } : q;
    }).sort((a,b) => articleId ? a.number-b.number : 0),
  [filter, state.progress, articleId]);
  const wrong = learningBank.filter(q => state.progress[q.id]?.wrongCount > 0 && (!wrongFilter || state.progress[q.id].wrongStatus === wrongFilter))
    .sort((a, b) => state.progress[b.id].lastAttempt - state.progress[a.id].lastAttempt);
  const activeWrong = learningBank.filter(q => state.progress[q.id]?.wrongStatus && state.progress[q.id].wrongStatus !== 'done');
  const terms = TESAT_TERMS.filter(t => (!termFocus || t.id === termFocus)
    && (!termSearch || [t.name, t.definition, t.explanation, ...(t.aliases ?? [])].join(' ').toLowerCase().includes(termSearch.toLowerCase()))
    && (secret ? !termSubject || t.subject === termSubject : !termStatus || (termStatus === 'new' ? !state.terms[t.id] : state.terms[t.id] === termStatus)));
  const currentArticles = TESAT_ARTICLES.filter(a => a.kind === 'terms' && a.included);
  const months = [...new Set(TESAT_BANK.flatMap(q => q.sourceRefs.map(r => r.publishedAt.slice(0, 7))))].sort().reverse();
  const learned = TESAT_BANK.filter(q => state.progress[q.id]).length;
  const button = secret ? 'gn-submit' : 'btn ghost small-btn';
  const primary = secret ? 'gn-submit' : 'btn primary';
  const card = secret ? 'tesat-news-section' : 'card';

  function go(next: View) {
    setView(next);
    setLimit(30);
    window.scrollTo(0, 0);
  }
  function showSession(next: StudySession) {
    setOpenId(next.ids[next.cursor]);
    go('session');
    setLimit(Math.max(30, next.cursor + 1));
  }
  function start(ids: string[], mode: StudyMode, focusId = ids[0]) {
    if (!ids.length) return;
    if (session && !session.completed && !window.confirm('진행 중인 풀이를 새 세트로 바꿀까요? 이미 채점한 학습 기록은 유지됩니다.')) return;
    const next = newSession(ids, mode, crypto.randomUUID(), learningBank);
    next.cursor = Math.max(0, next.ids.indexOf(focusId));
    setShowAllResults(false);
    setOpenResultId(null);
    changeLearning(old => ({ ...old, session: next }));
    showSession(next);
  }
  function resume() {
    if (!session) return;
    showSession(session);
  }
  function openStory(questionId: string) {
    const existing = focusStudySession(session, questionId);
    if (existing) {
      changeLearning(old => ({ ...old, session: focusStudySession(old.session, questionId) ?? old.session }));
      showSession(existing);
    } else {
      start(questions.map(q => q.id), 'learn', questionId);
    }
  }
  function move(delta: number) {
    changeLearning(old => ({ ...old, session: old.session ? {
      ...old.session, cursor: Math.min(Math.max(0, old.session.cursor + delta), old.session.ids.length - 1),
    } : null }));
    window.scrollTo(0, 0);
  }
  function submitAll() {
    if (!session) return;
    const missing = session.ids.filter(id => session.selections[id] == null).length;
    if (missing && !window.confirm(`미응답 ${missing}문항도 오답으로 채점할까요?`)) return;
    changeLearning(old => submitLearning(old, learningBank, Date.now(), true));
    setOpenResultId(null);
    window.scrollTo(0, 0);
  }
  function gradeOne(index: number) {
    changeLearning(old => submitLearning({ ...old, session: old.session ? { ...old.session, cursor: index } : null }, learningBank, Date.now()));
  }
  function openSource(source: SourceId) {
    if (!TESAT_BANK.some(q => q.sourceRefs.some(r => r.source === source))) { go('sources'); return; }
    setFilter({ ...emptyFilter, source }); setArticleId(''); go('library');
  }
  function openTerm(id: string) {
    setTermFocus(id); setTermSearch(''); setTermStatus(''); setTermSubject(''); setCardMode(false); go('terms');
  }
  function related(id: string) {
    start(TESAT_BANK.filter(q => q.termIds.includes(id)).map(q => q.id), 'learn');
  }
  function termLinks(ids: string[]) {
    return <div className={secret ? 'tesat-news-links' : 'chip-row tesat-term-links'}>{ids.map(id =>
      <button className={secret ? 'gn-back' : 'chip'} key={id} onClick={() => openTerm(id)}>{termMap.get(id)?.name ?? id}</button>,
    )}</div>;
  }
  function refs(q: TesatQuestion) {
    return <details className={secret ? 'gn-accordion small' : 'tesat-refs'}>
      <summary>관련 원문 {q.sourceRefs.length}편 · 게시 당시 기준</summary>
      <div>{q.sourceRefs.map(r => <a key={r.articleId+':'+r.questionNumber} href={r.url} target="_blank" rel="noreferrer">
        {SOURCE_LABELS[r.source as SourceId]} · {r.publishedAt} · {r.title}{r.questionNumber ? ` · ${r.questionNumber}번` : ''} ↗
      </a>)}</div>
    </details>;
  }
  function notes(q: TesatQuestion, includeExplanation = true) {
    const body = <>
      {includeExplanation && <><strong>{q.explanationKind === 'original' ? '원문 해설' : q.explanationKind === 'concept' ? '정답표·관련 개념 해설' : q.explanationKind === 'answer-key' ? '원문 정답표' : '해설'}</strong><p>{q.explanation}</p></>}
      {!!q.keyPoints.length && <><strong>핵심 요점</strong><ul>{q.keyPoints.map((p, i) => <li key={i}>{p}</li>)}</ul></>}
      {!!q.optionExplanations.length && <details className="tesat-option-notes"><summary>보기별 설명 · 오답의 함정</summary>
        <ol>{q.optionExplanations.map((text, i) => <li key={i}><b>{MARKERS[i]} {q.options[i]}</b><p>{text}</p></li>)}</ol>
      </details>}
    </>;
    return <>
      {secret ? <details className="gn-accordion"><summary>💬 정리 코멘트 펼치기 (spoiler)</summary><div className="gn-accordion-body tesat-notes">{body}</div></details>
        : <div className="explanation tesat-notes">{body}</div>}
      {termLinks(q.termIds)}{refs(q)}
    </>;
  }
  function questionBody(q: TesatQuestion, selected: number | null, graded: boolean, onSelect?: (index: number) => void, index?: number) {
    const original = lookup.get(q.id);
    const shuffledImageChoices = q.imageContainsChoices && original && q.options.some((option, i) => option !== original.options[i]);
    return <>
      <div className={secret ? 'gn-lead tesat-question' : 'q-text'}>{q.content ? <QuestionContent key={q.id} content={q.content} hideImages={secret} prefix={index != null && !secret ? <span className="q-num">{index + 1}.</span> : undefined} /> : <>{index != null && !secret && <span className="q-num">{index + 1}.</span>}{q.question}</>}</div>
      {q.figure && !q.content && <QuestionImage key={q.id} className={secret ? 'gn-figure' : 'q-figure'} src={q.figure} alt="문제 그림" collapsible={secret} />}
      {shuffledImageChoices && <p className={secret ? 'gn-progress' : 'muted small'}>그림 속 보기 번호는 원문 기준입니다. 답은 아래 선택지의 번호로 고르세요.</p>}
      <ul className={secret ? 'gn-poll' : `options ${graded ? 'review' : ''}`}>
        {q.options.map((opt, i) => {
          const cls = secret ? `gn-choice ${selected === i ? 'voted' : ''}`
            : `option ${graded || !onSelect ? 'static' : ''} ${selected === i ? 'selected' : ''} ${graded && i === q.answerIndex ? 'correct' : graded && selected === i ? 'wrong' : ''}`;
          const content = <><span className={secret ? 'gn-choice-mark' : 'opt-marker'}>{MARKERS[i]}</span>
            <span className={secret ? 'gn-choice-text' : 'opt-text'}>{opt}</span>
            {graded && i === q.answerIndex && <span className={secret ? 'gn-voted-badge' : 'badge ok'}>정답</span>}
            {selected === i && (secret ? !graded || i !== q.answerIndex : graded && i !== q.answerIndex) && <span className={secret ? 'gn-voted-badge' : 'badge no'}>{secret ? '▲ voted' : '내 선택'}</span>}</>;
          return <li key={i}>{onSelect ? <button className={cls} disabled={graded} aria-pressed={selected === i} onClick={() => onSelect(i)}>{content}</button>
            : <div className={cls}>{content}</div>}</li>;
        })}
      </ul>
      {q.originalIssues?.map((issue, i) => <p className={secret ? 'gn-progress' : 'muted small'} key={i}>원문 확인사항: {issue}</p>)}
      {graded && <>{onSelect && <p className={secret ? 'gn-lead' : 'muted small'} role="status">{selected === null ? '미응답' : selected === q.answerIndex ? '정답입니다' : '오답입니다'} · 정답 {MARKERS[q.answerIndex]}</p>}{notes(q)}</>}
    </>;
  }
  function newsRow(q: TesatQuestion, index: number, open: boolean, onToggle: () => void, children?: React.ReactNode, resultCorrect = false) {
    const meta = fakeMeta(q.id);
    const domain = new URL(q.sourceRefs[0].url).hostname;
    return <li key={q.id} className={`gn-item ${open ? 'open' : ''}`}>
      <button className={`gn-row tesat-news-row ${state.progress[q.id] ? 'read' : ''}`} onClick={onToggle} aria-expanded={open}>
        <span className="gn-rank">{index + 1}.</span><span className="gn-row-body">
          <span className="gn-row-title-line">{resultCorrect ? <strong className="gn-title">{q.title}</strong> : <span className="gn-title">{q.title}</span>}<span className="gn-domain">({domain})</span></span>
          <span className="gn-meta"><span className="gn-points">{meta.points} points</span><span className="gn-tag">{SUBJECT_LABELS[q.subject]}</span><span>{q.publishedAt}</span>{q.delivery === 'authored' && <span>이전 개념 연습</span>}<span className="gn-comments">{state.progress[q.id] ? '읽음' : `댓글 ${meta.comments}`}</span></span>
        </span>
      </button>
      {open && <div className="gn-row-detail">{children}</div>}
    </li>;
  }
  function review(original: TesatQuestion, index: number, originalSelected: number | null, order?: number[]) {
    const q = presentQuestion(original, order);
    const selected = displayedSelection(original, originalSelected, order);
    return <div key={q.id} className="tesat-review">
      <ReviewItem data={{ index: index + 1, subjectLabel: SUBJECT_LABELS[q.subject], question: q.question,
        content: q.content, figure: q.figure, hideFigures: secret, options: q.options, correctText: q.options[q.answerIndex],
        correctIndex: q.answerIndex, selectedIndex: selected,
        selectedText: selected == null ? null : q.options[selected], explanation: q.explanation }} />
      {q.imageContainsChoices && q !== original && <p className="muted small">그림 속 보기 번호는 원문 기준입니다. 아래 선택지의 번호를 확인하세요.</p>}
      <details className="tesat-review-notes"><summary>요점·관련 용어 보기</summary>{notes(q, false)}</details>
    </div>;
  }
  function result() {
    if (!session) return null;
    const correct = session.ids.filter(id => session.selections[id] === lookup.get(id)?.answerIndex).length;
    const ratio = Math.round(correct / session.ids.length * 100);
    const missed = session.ids.filter(id => session.selections[id] !== lookup.get(id)?.answerIndex);
    const resultIds = showAllResults ? session.ids : missed;
    return <>
      {secret ? <><h1 className="gn-article-title">Weekly Reading Digest</h1><div className="gn-score-card"><div className="gn-score">{ratio}<span className="gn-score-unit">%</span></div><div className="gn-score-side">{correct} / {session.ids.length} correct</div></div></>
        : <section className="score-card tesat-score"><div className="score-big">{ratio}%</div><div className="verdict">실력 점검 결과</div><div className="muted">{correct} / {session.ids.length} 정답</div></section>}
      <section className={card}><h2 className={secret ? 'gn-wrong-title' : ''}>주제별 결과</h2>
        <table className={secret ? 'tesat-news-table' : 'subject-table'}><thead><tr><th>주제</th><th>정답</th><th>정답률</th></tr></thead><tbody>
          {Object.entries(SUBJECT_LABELS).map(([subject, label]) => {
            const qs = session.ids.map(id => lookup.get(id)!).filter(q => q?.subject === subject);
            const count = qs.filter(q => session.selections[q.id] === q.answerIndex).length;
            return qs.length ? <tr key={subject}><td>{label}</td><td>{count}/{qs.length}</td><td>{Math.round(count / qs.length * 100)}%</td></tr> : null;
          })}
        </tbody></table><p className={secret ? 'gn-lead' : 'muted small'}>TESAT 공식 점수·등급으로 환산하지 않습니다.</p>
      </section>
      <section className={card}><div className="tesat-result-head">
        <h2 className={secret ? 'gn-wrong-title' : ''}>{showAllResults ? secret ? '전체 코멘트' : '전체 문제' : secret ? '틀린 코멘트' : '틀린 문제'} ({resultIds.length})</h2>
        <button className={button} aria-pressed={showAllResults} aria-controls="tesat-result-list" onClick={() => setShowAllResults(!showAllResults)}>{showAllResults ? '오답만 보기' : '전체보기'}</button>
      </div>
        {!showAllResults && !missed.length && <p className={secret ? 'gn-empty' : 'muted'}>틀린 문제가 없습니다.</p>}
        {secret ? <ol id="tesat-result-list" className="gn-list">{resultIds.map(id => {
          const q = lookup.get(id)!;
          const order = session.optionOrders?.[id];
          return newsRow(q, session.ids.indexOf(id), openResultId === id, () => setOpenResultId(openResultId === id ? null : id), questionBody(presentQuestion(q, order), displayedSelection(q, session.selections[id], order), true), session.selections[id] === q.answerIndex);
        })}</ol> : <div id="tesat-result-list">{resultIds.map(id => {
          const q = lookup.get(id)!;
          const index = session.ids.indexOf(id);
          const isCorrect = session.selections[id] === q.answerIndex;
          return <details key={id} className="tesat-result-item" open={!isCorrect}>
            <summary><span className="tesat-result-number">문제 {index + 1}</span>{isCorrect ? <strong>{q.title}</strong> : <span>{q.title}</span>}</summary>
            {review(q, index, session.selections[id] ?? null, session.optionOrders?.[id])}
          </details>;
        })}</div>}
        {!!missed.length && <button className={button} onClick={() => start(missed, 'review')}>이번 오답 다시 풀기</button>}
      </section>
      <div className={secret ? 'gn-article-nav' : 'actions sticky two'}><button className={secret ? 'gn-navbtn' : 'btn ghost'} onClick={() => go(secret ? 'library' : 'home')}>{secret ? '목록으로' : '홈으로'}</button><button className={secret ? 'gn-navbtn primary' : 'btn primary'} onClick={() => start(selectPractice(questions), 'test')}>{secret ? 'Load new stories' : '새 실력 점검'}</button></div>
    </>;
  }

  const filterControls = <div className="tesat-filters">
    <label>출처<select value={filter.source} onChange={e => { setArticleId(''); setFilter({ ...filter, source: e.target.value }); setLimit(30); }}><option value="">전체 출처</option>{Object.entries(SOURCE_LABELS).filter(([key]) => TESAT_BANK.some(q => q.sourceRefs.some(r => r.source === key))).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></label>
    <label>게시월<select value={filter.month} onChange={e => { setFilter({ ...filter, month: e.target.value }); setLimit(30); }}><option value="">전체 기간</option>{months.map(m => <option key={m}>{m}</option>)}</select></label>
    <label>주제<select value={filter.subject} onChange={e => { setFilter({ ...filter, subject: e.target.value }); setLimit(30); }}><option value="">전체 주제</option>{Object.entries(SUBJECT_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></label>
    <label>학습 상태<select value={filter.status} onChange={e => { setFilter({ ...filter, status: e.target.value }); setLimit(30); }}><option value="">전체 상태</option><option value="new">미학습</option><option value="correct">최근 정답</option><option value="wrong">복습할 오답</option></select></label>
    <input aria-label="문제 검색" placeholder="주제·문제·원문 제목 검색" value={filter.search} onChange={e => { setFilter({ ...filter, search: e.target.value }); setLimit(30); }} />
  </div>;
  const sessionAnswered = session?.ids.filter(id => session.selections[id] != null).length ?? 0;
  const testResult = view === 'session' && session?.mode === 'test' && session.completed;
  const currentOriginal = session ? lookup.get(session.ids[session.cursor]) : undefined;
  const currentOrder = currentOriginal ? session?.optionOrders?.[currentOriginal.id] : undefined;
  const currentQuestion = currentOriginal ? presentQuestion(currentOriginal, currentOrder) : undefined;
  const currentSelected = currentOriginal ? displayedSelection(currentOriginal, session?.selections[currentOriginal.id], currentOrder) : null;

  return <div className={`tesat-study ${secret ? 'tesat-news' : `screen ${view === 'home' ? 'start' : view === 'session' ? 'quiz' : 'study'}`}`}>
    {secret ? <>
      <nav className="tesat-news-tools" aria-label="테셋 메뉴">{([
        ['library', 'Top Stories'], ['wrong', 'Saved'], ['terms', 'Keywords'], ['current', 'Briefing'], ['sources', 'Sources'], ['home', 'Overview'],
      ] as [View, string][]).map(([key, label]) => <button key={key} className={`gn-back ${view === key || key === 'library' && view === 'session' ? 'active' : ''}`} onClick={() => { if (key === 'library') setArticleId(''); if (key === 'terms') setTermFocus(null); go(key); }}>{label}</button>)}</nav>
    </> : view === 'home' ? <header className="hero"><a className="link back" href="#/">← 자격증 선택</a><h1>TESAT</h1><p className="sub">경제이해력검증시험 · 개념 학습과 실력 점검</p></header>
      : view === 'session' && session && !testResult ? <header className="quiz-top"><button className="link" onClick={() => go('home')}>나가기</button><div className="progress-wrap"><div className="progress-bar"><div className="progress-fill" style={{ width: `${(session.cursor + 1) / session.ids.length * 100}%` }} /></div><span className="progress-text">{session.cursor + 1} / {session.ids.length}</span></div></header>
        : <header className="page-head"><button className="link" onClick={() => go('home')}>← 홈</button><h1>{testResult ? '실력 점검 결과' : VIEW_LABELS[view]}</h1>{view === 'library' ? <button className="link" onClick={() => setHideAnswers(!hideAnswers)}>{hideAnswers ? '정답 보이기' : '정답 가리기'}</button> : <span className="page-head-spacer" />}</header>}
    {failed && <p className={secret ? 'gn-lead' : 'muted small'} role="alert">브라우저 저장 공간에 기록하지 못했습니다. 현재 화면에서는 공부할 수 있지만 닫기 전에 저장 공간을 확인해 주세요.</p>}
    {session && !session.completed && view !== 'home' && view !== 'session' && <p className="tesat-resume"><button className={secret ? 'gn-back' : 'link'} onClick={resume}>{secret ? 'Continue reading' : '진행 중인 풀이 이어가기'} ({Object.keys(session.graded).length}/{session.ids.length}) →</button></p>}

    {view === 'home' && <>
      {secret && <h1 className="gn-page-title">Channel overview</h1>}
      <section className={card}><h2 className={secret ? 'gn-wrong-title' : ''}>학습 범위 ({TESAT_BANK.length}문항)</h2>
        <ul className={secret ? 'tesat-news-subjects' : 'subject-list'}>{Object.entries(SUBJECT_LABELS).map(([key, label]) => <li key={key}><span>{label}</span><span className="count">{TESAT_BANK.filter(q => q.subject === key).length}문항</span></li>)}</ul>
        <p className={secret ? 'gn-lead' : 'muted small'}>실력 점검은 최대 20문항 · 문제와 선택지 순서 무작위</p>
      </section>
      {(state.history[0] || session) && <section className={card}><h2 className={secret ? 'gn-wrong-title' : ''}>최근 기록</h2>
        {state.history[0] && <p className="last-record"><strong>{Math.round(state.history[0].correct / state.history[0].total * 100)}%</strong><span className={secret ? 'gn-progress' : 'muted'}> · {state.history[0].correct}/{state.history[0].total} 정답</span></p>}
        {session && <button className={button} onClick={resume}>{session.completed ? '최근 풀이 결과 보기' : '이어서 학습하기'}</button>}
      </section>}
      <section className={card}><h2 className={secret ? 'gn-wrong-title' : ''}>출처별 학습</h2><ul className={secret ? 'tesat-news-subjects' : 'subject-list'}>{(['quiz', 'taste', 'today'] as SourceId[]).map(source => {
        const pool = TESAT_BANK.filter(q => q.sourceRefs.some(r => r.source === source));
        return <li key={source}><button className={secret ? 'gn-back' : 'link'} onClick={() => openSource(source)}>{SOURCE_LABELS[source]}</button><span className="count">{pool.length ? `${pool.filter(q => state.progress[q.id]).length}/${pool.length}` : '원문 링크'}</span></li>;
      })}</ul><p className={secret ? 'gn-progress' : 'muted small'}>학습한 문제 {learned}개 · 복습할 오답 {activeWrong.length}개</p></section>
      <section className={card}><h2 className={secret ? 'gn-wrong-title' : ''}>{secret ? 'Keywords' : '용어장·암기카드'} ({TESAT_TERMS.length}개)</h2><p className={secret ? 'gn-progress' : 'muted small'}>{secret ? '용어의 뜻·예시·혼동하기 쉬운 개념을 모았습니다.' : '뜻·예시·혼동하기 쉬운 개념을 연결하고 알아요 / 다시 보기로 복습합니다.'}</p><button className={button} onClick={() => { setTermFocus(null); setTermSearch(''); setTermStatus(''); setTermSubject(''); setCardMode(!secret); setRevealed(new Set()); go('terms'); }}>{secret ? 'View keywords' : '🗂️ 암기카드 시작'}</button></section>
      <section className={card}><h2 className={secret ? 'gn-wrong-title' : ''}>시사 경제용어 따라잡기 ({currentArticles.length}편)</h2><p className={secret ? 'gn-progress' : 'muted small'}>최근 반년치 게시글의 요약과 관련 용어를 확인합니다.</p><button className={button} onClick={() => go('current')}>📘 시사용어 보기</button></section>
      <section className={card}><h2 className={secret ? 'gn-wrong-title' : ''}>자료 목록</h2><p className={secret ? 'gn-progress' : 'muted small'}>제공하신 HTML의 문제·보기·정답을 보존해 등록했습니다. 원문 해설과 별도로 보강한 개념 설명을 구분해서 읽을 수 있습니다.</p><button className={button} onClick={() => go('sources')}>📚 출처와 학습 기간 보기</button></section>
      <div className={secret ? 'gn-article-nav' : 'actions sticky'}><button className={primary} onClick={() => start(selectPractice(TESAT_BANK), 'test')}>실력 점검 시작</button><button className={secret ? 'gn-navbtn' : 'btn ghost'} onClick={() => go('wrong')}>오답노트 {activeWrong.length ? `(${activeWrong.length})` : ''}</button><button className={secret ? 'gn-navbtn' : 'btn ghost'} onClick={() => { setFilter(emptyFilter); setArticleId(''); go('library'); }}>정답·해설 ({TESAT_BANK.length}문항)</button></div>
    </>}

    {view === 'library' && <>
      {secret && <div className="gn-list-head"><h1 className="gn-page-title">Top Stories</h1><span className="gn-progress">{questions.filter(q => state.progress[q.id]).length} / {questions.length} read</span></div>}
      {secret ? <details className="gn-accordion small tesat-filter-disclosure"><summary>Filter stories · 출처 / 기간 / 주제</summary>{filterControls}</details> : <section className="card">{filterControls}</section>}
      {articleId && <p className={secret ? 'gn-lead' : 'muted small'}>{TESAT_ARTICLES.find(a => a.id === articleId)?.title} <button className={secret ? 'gn-back' : 'link'} onClick={() => setArticleId('')}>게시글 선택 해제</button></p>}
      <div className={secret ? 'gn-article-nav tesat-library-actions' : 'tesat-library-actions'}><button className={button} disabled={!questions.length} onClick={() => start(questions.map(q => q.id), 'learn')}>{secret ? 'Read selected stories' : '선택 범위 학습'}</button><button className={button} disabled={!questions.length} onClick={() => start(selectPractice(questions), 'test')}>{secret ? 'New set' : '실력 점검'} ({Math.min(20, questions.length)})</button></div>
      {!secret && <p className="muted small">총 {questions.length}문항 · {hideAnswers ? '정답을 가리고 확인해 보세요' : '정답·해설과 함께 읽기'}</p>}
      {!questions.length && <p className={secret ? 'gn-empty' : 'muted center'}>조건에 맞는 문제가 없습니다.</p>}
      {secret ? <ol className="gn-list">{questions.slice(0, limit).map((q, i) => newsRow(q, i, false, () => openStory(q.id)))}</ol>
        : questions.slice(0, limit).map((q, i) => <article className="card study-item" key={q.id}><div className="review-head"><span className="review-num">{i + 1}</span><span className="subject-tag small">{SUBJECT_LABELS[q.subject]}</span><span className="muted small">{q.publishedAt}</span></div>{questionBody(q, null, !hideAnswers)}<button className={button} onClick={() => start([q.id], 'learn')}>이 문제 풀기</button></article>)}
      {questions.length > limit && <div className={secret ? 'gn-list-foot' : ''}><button className={secret ? 'gn-more tesat-text-button' : 'btn ghost'} onClick={() => setLimit(limit + 30)}>{secret ? 'More ▾' : '30문항 더 보기'}</button></div>}
    </>}

    {view === 'session' && session && (testResult ? result() : <>
      {secret ? <div className="gn-list-head"><h1 className="gn-page-title">Top Stories</h1><span className="gn-progress">{sessionAnswered} / {session.ids.length} read</span></div>
        : currentQuestion && <div className="q-meta"><span className="subject-tag">{SUBJECT_LABELS[currentQuestion.subject]}</span><span className="type-tag mcq">선택형</span><span className="answered-text">응답 {sessionAnswered}/{session.ids.length}</span></div>}
      {session.completed && <p className={secret ? 'gn-lead' : 'muted small'} role="status">학습 완료 · {session.ids.filter(id => session.selections[id] === lookup.get(id)?.answerIndex).length}/{session.ids.length} 정답 <button className={secret ? 'gn-back' : 'link'} onClick={() => go('wrong')}>오답노트</button></p>}
      {!secret && session.mode !== 'test' && <label className="tesat-jump">문항 이동<select value={session.cursor} onChange={e => changeLearning(old => ({ ...old, session: old.session ? { ...old.session, cursor: Number(e.target.value) } : null }))}>{session.ids.map((id, i) => <option key={id} value={i}>{i + 1}. {session.graded[id] ? '✓ ' : ''}{lookup.get(id)?.title}</option>)}</select></label>}
      {secret ? <ol className="gn-list">{session.ids.slice(0, limit).map((id, index) => {
        const original = lookup.get(id); if (!original) return null;
        const order = session.optionOrders?.[id];
        const q = presentQuestion(original, order);
        const selected = displayedSelection(original, session.selections[id], order);
        return newsRow(q, index, openId === id, () => { setOpenId(openId === id ? null : id); changeLearning(old => ({ ...old, session: old.session ? { ...old.session, cursor: index } : null })); }, <>
          <p className="gn-lead">아래 코멘트 중 이 주제를 가장 정확히 설명한 항목에 투표하세요.</p>
          {questionBody(q, selected, !!session.graded[id], choice => changeLearning(old => updateSelection(old, id, choice)))}
          {session.mode !== 'test' && !session.graded[id] && <button className="gn-submit" disabled={selected == null} onClick={() => gradeOne(index)}>Save comment · 정리 보기</button>}
        </>);
      })}</ol> : currentQuestion && <div className="q-body">
        {questionBody(currentQuestion, currentSelected, !!session.graded[currentQuestion.id], choice => changeLearning(old => updateSelection(old, currentQuestion.id, choice)), session.cursor)}
        {session.mode !== 'test' && !session.graded[currentQuestion.id] && <div className="hint-zone"><button className="btn hint" disabled={session.selections[currentQuestion.id] == null} onClick={() => gradeOne(session.cursor)}>답 제출 · 해설 보기</button>{session.selections[currentQuestion.id] == null && <p className="muted small">보기를 먼저 선택하면 해설을 볼 수 있습니다.</p>}</div>}
      </div>}
      {secret ? <div className="gn-list-foot"><button className="gn-more tesat-text-button" onClick={() => session.ids.length > limit ? setLimit(limit + 30) : start(selectPractice(questions), 'test')}>More ▾</button>{session.mode === 'test' && !session.completed && <button className="gn-submit" onClick={submitAll}>Archive ({sessionAnswered}/{session.ids.length})</button>}</div>
        : <div className="actions sticky two"><button className="btn ghost" disabled={session.cursor === 0} onClick={() => move(-1)}>이전</button>{session.cursor === session.ids.length - 1 ? session.mode === 'test' ? <button className="btn primary" onClick={submitAll}>제출하기</button> : <button className="btn primary" onClick={() => go('home')}>홈으로</button> : <button className="btn primary" onClick={() => move(1)}>다음</button>}</div>}
    </>)}
    {view === 'session' && !session && <p className={secret ? 'gn-empty' : 'muted center'}>문제은행에서 학습할 범위를 선택해 주세요.</p>}

    {view === 'wrong' && <>
      {secret && <div className="gn-list-head"><h1 className="gn-page-title">Saved Stories</h1><span className="gn-progress">{wrong.length} saved</span></div>}
      <div className={secret ? 'tesat-news-tools' : 'chip-row'}><button className={secret ? 'gn-back' : `chip ${!wrongFilter ? 'on' : ''}`} onClick={() => setWrongFilter('')}>전체</button>{Object.entries(STATUS_LABELS).map(([k, label]) => <button key={k} className={secret ? 'gn-back' : `chip ${wrongFilter === k ? 'on' : ''}`} onClick={() => setWrongFilter(k as WrongStatus)}>{label}</button>)}</div>
      <p className={secret ? 'gn-progress' : 'muted small'}>총 {wrong.length}문항</p><button className={button} disabled={!wrong.length} onClick={() => start(wrong.map(q => q.id), 'review')}>이 목록 다시 풀기</button>
      {!wrong.length && <p className={secret ? 'gn-empty' : 'muted center'}>해당 상태의 오답이 없습니다.</p>}
      {secret ? <ol className="gn-list">{wrong.slice(0, limit).map((q, i) => newsRow(q, i, openId === q.id, () => setOpenId(openId === q.id ? null : q.id), <>
        <p className="gn-progress">{STATUS_LABELS[state.progress[q.id].wrongStatus!]} · 오답 {state.progress[q.id].wrongCount}회</p>{questionBody(presentQuestion(q, state.progress[q.id].lastOptionOrder), displayedSelection(q, state.progress[q.id].lastSelected, state.progress[q.id].lastOptionOrder), true)}<button className="gn-submit" onClick={() => start([q.id], 'review')}>Read again</button>
      </>))}</ol> : wrong.slice(0, limit).map((q, i) => <div key={q.id}><p className="muted small">{STATUS_LABELS[state.progress[q.id].wrongStatus!]} · 오답 {state.progress[q.id].wrongCount}회 · {new Date(state.progress[q.id].lastAttempt).toLocaleDateString('ko-KR')}</p>{review(q, i, state.progress[q.id].lastSelected, state.progress[q.id].lastOptionOrder)}<button className={button} onClick={() => start([q.id], 'review')}>다시 풀고 복습 상태 갱신</button></div>)}
      {wrong.length > limit && <button className={button} onClick={() => setLimit(limit + 30)}>더 보기</button>}
    </>}

    {view === 'terms' && <>
      {secret && <div className="gn-list-head"><h1 className="gn-page-title">Keywords</h1><span className="gn-progress">{terms.length} notes</span></div>}
      {termFocus && <button className={button} onClick={() => setTermFocus(null)}>전체 용어 보기</button>}
      {secret ? <>
        <details className="gn-accordion small tesat-filter-disclosure"><summary>Search keywords · 검색</summary>
          <div className="tesat-filters tesat-keyword-search">
            <select aria-label="용어 주제" value={termSubject} onChange={e => { setTermSubject(e.target.value); setLimit(30); }}><option value="">전체 주제</option>{Object.entries(SUBJECT_LABELS).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select>
            <input aria-label="용어 검색" placeholder="용어·약어·뜻 검색" value={termSearch} onChange={e => { setTermSearch(e.target.value); setLimit(30); }} />
          </div>
        </details>
        <ol className="gn-list tesat-keyword-list">{terms.slice(0, limit).map((term, index) => <KeywordRow key={term.id} term={term} index={index} />)}</ol>
      </> : <>
        <div className={card}><div className="tesat-filters"><input aria-label="용어 검색" placeholder="용어·약어·뜻 검색" value={termSearch} onChange={e => { setTermSearch(e.target.value); setLimit(30); }} /><select aria-label="용어 학습 상태" value={termStatus} onChange={e => { setTermStatus(e.target.value); setLimit(30); }}><option value="">모든 용어</option><option value="new">아직 안 본 용어</option><option value="again">다시 보기</option><option value="known">알아요</option></select></div><button className={button} onClick={() => { setCardMode(!cardMode); setRevealed(new Set()); }}>{cardMode ? '용어장으로 보기' : '암기카드로 보기'}</button></div>
        {terms.slice(0, limit).map(term => <TermCard key={term.id} term={term} secret={false} hidden={cardMode && !revealed.has(term.id)} state={state.terms[term.id]} onReveal={() => setRevealed(new Set(revealed).add(term.id))} onMark={status => changeLearning(old => ({ ...old, terms: { ...old.terms, [term.id]: status } }))} onRelated={() => related(term.id)} />)}
      </>}
      {!terms.length && <p className={secret ? 'gn-empty' : 'muted center'}>조건에 맞는 용어가 없습니다.</p>}
      {terms.length > limit && <div className={secret ? 'gn-list-foot tesat-more-center' : ''}><button className={button} onClick={() => setLimit(limit + 30)}>30개 더 보기</button></div>}
    </>}

    {view === 'current' && <>
      {secret && <h1 className="gn-page-title">Briefing</h1>}
      <p className={secret ? 'gn-progress' : 'muted small'}>{TESAT_RANGES.find(r => r.source === 'current-terms')?.start} ~ {TESAT_RANGES.find(r => r.source === 'current-terms')?.end} · {currentArticles.length}편</p>
      {secret ? <ol className="gn-list tesat-briefing-list">{currentArticles.map((a, index) => <li className="gn-item" key={a.id}>
        <article className="gn-row tesat-reading-row"><span className="gn-rank">{index + 1}.</span><div className="gn-row-body">
          <div className="gn-meta"><time dateTime={a.publishedAt}>{a.publishedAt}</time><a className="gn-back" href={a.url} target="_blank" rel="noreferrer">공식 원문 ↗</a></div>
          <ul className="tesat-summary">{a.summary?.map((text, i) => <li key={i}>{text}</li>)}</ul>
        </div></article>
      </li>)}</ol> : currentArticles.map(a => <article className={card} key={a.id}><p className="muted small">{a.publishedAt}</p><h2>{a.title}</h2><ul className="tesat-summary">{a.summary?.map((text, i) => <li key={i}>{text}</li>)}</ul>{termLinks(a.termIds ?? [])}<a className="link" href={a.url} target="_blank" rel="noreferrer">공식 원문 읽기 ↗</a></article>)}
    </>}

    {view === 'sources' && <>
      {secret && <h1 className="gn-page-title">Sources</h1>}
      <section className={card}><p className={secret ? 'gn-progress' : 'muted small'}>최초 게시일 기준 · 원문 확인일 {TESAT_COLLECTED_AT.replace(/-/g, '.')}<br />현재 학습 기간에 해당하는 제공 원문 {TESAT_ARTICLES.filter(a => a.provided && a.included).length}편에서 {TESAT_BANK.reduce((sum, q) => sum + q.sourceRefs.length, 0)}문항을 읽었습니다. 동일 문항은 출처를 함께 연결해 {TESAT_BANK.length}문항으로 등록했습니다.<br />기간에서 제외한 문제의 기존 오답은 오답노트에서 복습할 수 있습니다.<br />원문 파일이 없는 {TESAT_ARTICLES.filter(a => a.kind === 'questions' && a.included && !a.provided).length}편은 링크 자료로 확인합니다.</p>{TESAT_RANGES.map(r => <p key={r.source} className={secret ? 'gn-progress' : 'muted small'}><b>{r.source === 'current-terms' ? '시사 경제용어' : SOURCE_LABELS[r.source as SourceId]}</b><br />{r.start} ~ {r.end}</p>)}</section>
      {TESAT_ARTICLES.map(a => {
        const linked = TESAT_BANK.filter(q => q.sourceRefs.some(r => r.articleId === a.id));
        return <article className={card} key={a.id}><p className={secret ? 'gn-progress' : 'muted small'}>{SOURCE_LABELS[a.source]} · {a.publishedAt} · {!a.included ? a.provided ? '기간 제외 · 이전 오답 복습용 보존' : '대상 제외' : a.provided ? '제공 원문 등록' : '링크 자료'}</p><h2 className={secret ? 'gn-page-title' : ''}><a href={a.url} target="_blank" rel="noreferrer">{a.title} ↗</a></h2><p className={secret ? 'gn-progress' : 'muted small'}>{a.kind === 'terms' ? '용어 자료' : `원문 ${a.questionCount ?? '미확인'}문항`}{a.provided && a.included ? ` · 등록 ${linked.length}문항` : ''}{a.imageCount ? ` · 원문 그림 ${a.imageCount}개` : ''}</p>{a.note && <p className={secret ? 'gn-progress' : 'muted small'}>{a.note}</p>}{a.included && linked.length > 0 && <button className={button} onClick={() => { setFilter(emptyFilter); setArticleId(a.id); go('library'); }}>이 게시글 풀기</button>}</article>;
      })}
    </>}
  </div>;
}

function KeywordRow({ term, index }: { term: Term; index: number }) {
  return <li className="gn-item"><article className="gn-row tesat-reading-row">
    <span className="gn-rank">{index + 1}.</span><div className="gn-row-body">
      <div className="gn-row-title-line"><strong className="gn-title">{term.name}</strong><span className="gn-meta">{SUBJECT_LABELS[term.subject]}</span></div>
      <p className="tesat-keyword-definition">{term.definition}</p>
      <TermExplanation term={term} secret />
      <p className="tesat-keyword-detail"><b>예시</b> {term.example}</p>
      <p className="tesat-keyword-detail"><b>혼동 주의</b> {term.contrast}</p>
    </div>
  </article></li>;
}

function TermExplanation({ term, secret = false }: { term: Term; secret?: boolean }) {
  const study = term.caseStudy;
  return <>
    <p className={secret ? 'tesat-keyword-explanation' : 'tesat-term-explanation'}>{term.explanation}</p>
    {study && <details className="tesat-keyword-case">
      <summary>계산·사례로 이해하기</summary>
      <div className={secret ? 'tesat-keyword-case-body' : 'explanation'}>
        <p>{study.question}</p>
        {study.figure && <QuestionImage key={study.figure} className={secret ? 'gn-figure' : 'q-figure'} src={study.figure} alt="사례 참고 그림" collapsible={secret} />}
        <ul className="tesat-case-options">{study.options.map((option, index) => <li key={index}>{MARKERS[index]} {option}</li>)}</ul>
        <p><strong>답: {study.answer}</strong></p><p>{study.explanation}</p>
      </div>
    </details>}
  </>;
}

function TermCard({ term, secret, hidden, state, onReveal, onMark, onRelated }: {
  term: Term; secret: boolean; hidden: boolean; state?: string; onReveal: () => void;
  onMark: (state: 'known' | 'again') => void; onRelated: () => void;
}) {
  const button = secret ? 'gn-submit' : 'btn ghost small-btn';
  return <article className={secret ? 'tesat-news-section' : 'card'}>
    <p className={secret ? 'gn-progress' : 'muted small'}>{SUBJECT_LABELS[term.subject]}{state ? ` · ${state === 'known' ? '알아요' : '다시 보기'}` : ''}</p>
    <h2 className={secret ? 'gn-article-title' : ''}>{term.name}</h2>
    {hidden ? <button className={button} onClick={onReveal}>뜻 떠올린 뒤 확인하기</button> : <><p className="tesat-definition">{term.definition}</p><TermExplanation term={term} /><div className={secret ? 'gn-accordion-body tesat-term-example' : 'explanation tesat-term-example'}><strong>예시</strong><p>{term.example}</p><strong>혼동 주의</strong><p>{term.contrast}</p></div><div className="tesat-term-actions"><button className={button} aria-pressed={state === 'known'} onClick={() => onMark('known')}>알아요</button><button className={button} aria-pressed={state === 'again'} onClick={() => onMark('again')}>다시 보기</button><button className={button} onClick={onRelated}>관련 문제</button></div></>}
  </article>;
}
