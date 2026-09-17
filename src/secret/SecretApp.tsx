import { useMemo, useState } from "react";
import { CERTS, getCert } from "../lib/certs";
import type { CertConfig } from "../lib/certs";
import { getBank } from "../data/questions";
import { buildExam, grade } from "../lib/quiz";
import type { ExamResult } from "../lib/quiz";
import type { ExamItem } from "../lib/types";
import { saveResult } from "../lib/storage";
import NewsList from "./NewsList";
import NewsResult from "./NewsResult";
import NewsPractical from "./NewsPractical";
import NewsAdspStudy from "./NewsAdspStudy";
import NewsAdspIntro from "./NewsAdspIntro";

type View = "list" | "result" | "practical" | "adsp-study" | "adsp-intro";

/**
 * 시크릿(뉴스 게시판 위장) 모드. 겉모습만 IT 뉴스 애그리게이터일 뿐,
 * 내부적으로는 기존 모바일 앱과 동일하게 buildExam/grade 로 한 회차 시험을 처리한다.
 * 상세는 별도 화면 없이 목록 행의 인라인 아코디언으로 다루고(목록에서 모두 처리),
 * 채점 결과만 별도 화면으로 전환한다.
 */
export default function SecretApp() {
  const [certId, setCertId] = useState<string>(CERTS[0]?.id ?? "network_2");
  const cert = getCert(certId)!;
  return <Feed key={certId} cert={cert} onSwitchCert={setCertId} />;
}

function Feed({
  cert,
  onSwitchCert,
}: {
  cert: CertConfig;
  onSwitchCert: (id: string) => void;
}) {
  const bank = useMemo(() => getBank(cert.id), [cert.id]);
  const [items, setItems] = useState<ExamItem[]>(() => buildExam(bank, cert));
  const [view, setView] = useState<View>(cert.id === "adsp" ? "adsp-study" : "list");
  const [result, setResult] = useState<ExamResult | null>(null);

  function backToList() {
    setView("list");
    window.scrollTo(0, 0);
  }

  function openAdspStudy() {
    setView("adsp-study");
    window.scrollTo(0, 0);
  }

  function openAdspIntro() {
    setView("adsp-intro");
    window.scrollTo(0, 0);
  }

  function openExam() {
    setView("list");
    window.scrollTo(0, 0);
  }

  function openPractical() {
    setView("practical");
    window.scrollTo(0, 0);
  }

  function select(index: number, optionIdx: number) {
    setItems((prev) =>
      prev.map((it, i) => (i === index ? { ...it, selected: optionIdx } : it)),
    );
  }

  function input(index: number, value: string) {
    setItems((prev) =>
      prev.map((it, i) => (i === index ? { ...it, input: value } : it)),
    );
  }

  function refresh() {
    setItems(buildExam(bank, cert));
    setResult(null);
    setView("list");
    window.scrollTo(0, 0);
  }

  function submit() {
    const r = grade(items, cert);
    setResult(r);
    saveResult(cert.id, r, Date.now());
    setView("result");
    window.scrollTo(0, 0);
  }

  return (
    <div className="gn">
      <header className="gn-top">
        <div className="gn-top-inner">
          <a className="gn-logo" onClick={cert.id === "adsp" ? openAdspStudy : backToList}>
            <span className="gn-mark">GN</span> GeekNews
          </a>
          <nav className="gn-nav">
            {CERTS.map((c) => (
              <a
                key={c.id}
                className={
                  c.id === cert.id &&
                  (c.id === "adsp" ? view === "adsp-study" : view !== "practical")
                    ? "active"
                    : ""
                }
                onClick={() => {
                  if (c.id === cert.id && c.id === "adsp") openAdspStudy();
                  else onSwitchCert(c.id);
                }}
              >
                {navLabel(c)}
              </a>
            ))}
            {cert.id === "adsp" && (
              <a className={view === "adsp-intro" ? "active" : "gn-nav-extra"} onClick={openAdspIntro}>
                adsp-intro
              </a>
            )}
            <a
              className={
                cert.id === "adsp"
                  ? view === "list" || view === "result" ? "active" : "gn-nav-extra"
                  : view === "practical" ? "active" : "gn-nav-extra"
              }
              onClick={cert.id === "adsp" ? openExam : openPractical}
            >
              {cert.id === "adsp" ? "adsp-test" : "Ask"}
            </a>
            <a className="gn-nav-extra">Show</a>
          </nav>
        </div>
      </header>

      <main className="gn-main">
        {view === "adsp-intro" && <NewsAdspIntro />}
        {view === "adsp-study" && <NewsAdspStudy />}
        {view === "list" && (
          <NewsList
            cert={cert}
            items={items}
            onSelect={select}
            onInput={input}
            onSubmit={submit}
            onRefresh={refresh}
          />
        )}
        {view === "result" && result && (
          <NewsResult
            cert={cert}
            result={result}
            onRetry={refresh}
            onReview={openExam}
          />
        )}
        {view === "practical" && <NewsPractical cert={cert} />}
      </main>

      <footer className="gn-foot">
        Guidelines | FAQ | API | Contact — Search stories by keyword
      </footer>
    </div>
  );
}

/** 자격증 라벨을 뉴스 카테고리처럼 짧게 위장 */
function navLabel(c: CertConfig): string {
  const map: Record<string, string> = {
    network_2: "Network",
    network_2_practical: "Ops",
    adsp: "adsp",
  };
  return map[c.id] ?? c.label;
}
