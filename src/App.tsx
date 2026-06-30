import { useMemo, useState } from "react";
import { QUESTIONS } from "./data/questions";
import { buildExam, grade } from "./lib/quiz";
import type { ExamResult } from "./lib/quiz";
import type { ExamItem } from "./lib/types";
import { saveResult } from "./lib/storage";
import StartScreen from "./components/StartScreen";
import QuizScreen from "./components/QuizScreen";
import ResultScreen from "./components/ResultScreen";
import WrongBookScreen from "./components/WrongBookScreen";

type Screen = "start" | "quiz" | "result" | "wrongbook";

export default function App() {
  const [screen, setScreen] = useState<Screen>("start");
  const [items, setItems] = useState<ExamItem[]>([]);
  const [result, setResult] = useState<ExamResult | null>(null);

  const bank = useMemo(() => QUESTIONS, []);

  function startExam() {
    setItems(buildExam(bank));
    setResult(null);
    setScreen("quiz");
  }

  function submitExam(answered: ExamItem[]) {
    const r = grade(answered);
    setResult(r);
    saveResult(r, Date.now());
    setScreen("result");
    window.scrollTo(0, 0);
  }

  return (
    <div className="app">
      {screen === "start" && (
        <StartScreen
          bankSize={bank.length}
          onStart={startExam}
          onOpenWrongBook={() => setScreen("wrongbook")}
        />
      )}
      {screen === "quiz" && (
        <QuizScreen
          items={items}
          onSubmit={submitExam}
          onQuit={() => setScreen("start")}
        />
      )}
      {screen === "result" && result && (
        <ResultScreen
          result={result}
          onRetry={startExam}
          onHome={() => setScreen("start")}
        />
      )}
      {screen === "wrongbook" && (
        <WrongBookScreen onBack={() => setScreen("start")} />
      )}
    </div>
  );
}
