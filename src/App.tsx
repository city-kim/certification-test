import { Navigate, Route, Routes } from "react-router-dom";
import CertSelectScreen from "./components/CertSelectScreen";
import CertApp from "./CertApp";

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<CertSelectScreen />} />
        <Route path="/:certId" element={<CertApp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
