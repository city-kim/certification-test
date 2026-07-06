import { Link } from "react-router-dom";
import { CERTS, totalQuestions } from "../lib/certs";
import { getBank } from "../data/questions";

export default function CertSelectScreen() {
  return (
    <div className="screen start">
      <header className="hero">
        <h1>자격증 모의고사</h1>
        <p className="sub">응시할 자격증을 선택하세요</p>
      </header>

      <section className="cert-list">
        {CERTS.map((cert) => {
          const bankSize = getBank(cert.id).length;
          const ready = bankSize > 0;
          const card = (
            <>
              <div className="cert-card-main">
                <h2>{cert.label}</h2>
                <p className="muted small">
                  출제 {totalQuestions(cert)}문항 · {cert.subjects.map((s) => s.label).join(" · ")}
                </p>
              </div>
              <span className={`cert-badge ${ready ? "ready" : "soon"}`}>
                {ready ? `문제은행 ${bankSize}` : "준비중"}
              </span>
            </>
          );

          return ready ? (
            <Link key={cert.id} to={`/${cert.id}`} className="cert-card">
              {card}
            </Link>
          ) : (
            <div key={cert.id} className="cert-card disabled" aria-disabled="true">
              {card}
            </div>
          );
        })}
      </section>
    </div>
  );
}
