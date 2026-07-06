import { useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getBank } from "./data/questions";
import { getCert } from "./lib/certs";
import type { CertConfig } from "./lib/certs";
import { buildExam, grade } from "./lib/quiz";
import type { ExamResult } from "./lib/quiz";
import type { ExamItem } from "./lib/types";
import { saveResult } from "./lib/storage";
import StartScreen from "./components/StartScreen";
import QuizScreen from "./components/QuizScreen";
import ResultScreen from "./components/ResultScreen";
import WrongBookScreen from "./components/WrongBookScreen";

type Screen = "start" | "quiz" | "result" | "wrongbook";

/**
 * 라우트 진입점. certId 를 key 로 넘겨 자격증이 바뀌면 CertScreen 이 리마운트되어
 * 내부 진행 상태(화면/출제 문항)가 초기화되도록 한다.
 */
export default function CertApp() {
  const { certId } = useParams();
  const cert = getCert(certId);
  if (!cert) return <Navigate to="/" replace />;
  return <CertScreen key={cert.id} cert={cert} />;
}

function CertScreen({ cert }: { cert: CertConfig }) {
  const [screen, setScreen] = useState<Screen>("start");
  const [items, setItems] = useState<ExamItem[]>([]);
  const [result, setResult] = useState<ExamResult | null>(null);

  const bank = useMemo(() => getBank(cert.id), [cert.id]);

  function startExam() {
    setItems(buildExam(bank, cert));
    setResult(null);
    setScreen("quiz");
    window.scrollTo(0, 0);
  }

  function submitExam(answered: ExamItem[]) {
    const r = grade(answered, cert);
    setResult(r);
    saveResult(cert.id, r, Date.now());
    setScreen("result");
    window.scrollTo(0, 0);
  }

  return (
    <>
      {screen === "start" && (
        <StartScreen
          cert={cert}
          bankSize={bank.length}
          onStart={startExam}
          onOpenWrongBook={() => setScreen("wrongbook")}
        />
      )}
      {screen === "quiz" && (
        <QuizScreen
          cert={cert}
          items={items}
          onSubmit={submitExam}
          onQuit={() => setScreen("start")}
        />
      )}
      {screen === "result" && result && (
        <ResultScreen
          cert={cert}
          result={result}
          onRetry={startExam}
          onHome={() => setScreen("start")}
        />
      )}
      {screen === "wrongbook" && (
        <WrongBookScreen cert={cert} onBack={() => setScreen("start")} />
      )}
    </>
  );
}
