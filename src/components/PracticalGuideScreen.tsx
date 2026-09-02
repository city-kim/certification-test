import type { CertConfig } from "../lib/certs";
import {
  LINUX_COMMAND_GROUPS,
  NETWORK_COMMANDS,
  OSI_ROWS,
  PERMISSION_ROWS,
  PRACTICAL_PROTOCOLS,
  TAR_ROWS,
  TCP_UDP_ROWS,
  type GuideRow,
} from "../data/network_2_practical/guide";

interface Props {
  cert: CertConfig;
  onBack: () => void;
  onOpenFlashcards: () => void;
}

export default function PracticalGuideScreen({ cert, onBack, onOpenFlashcards }: Props) {
  return (
    <div className="screen practical-guide">
      <header className="page-head">
        <button className="link" onClick={onBack}>← 홈</button>
        <h1>실기 핵심 요약</h1>
        <span className="page-head-spacer" />
      </header>

      <p className="guide-intro">
        {cert.label} 시험 전에 반드시 구분해야 할 항목만 모았습니다. 위에서 아래로 한 번 훑은 뒤 암기카드로 확인하세요.
      </p>

      <GuideSection number="1" title="필수 프로토콜·포트">
        <div className="guide-table-wrap">
          <table className="guide-table protocol-table">
            <thead><tr><th>프로토콜</th><th>방식·포트</th><th>핵심 역할</th></tr></thead>
            <tbody>
              {PRACTICAL_PROTOCOLS.map((item) => (
                <tr key={item.name}>
                  <td><strong>{item.name}</strong></td>
                  <td>{item.port === "—" ? item.transport : `${item.transport} ${item.port}`}</td>
                  <td>{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="guide-note">ARP·RARP·ICMP·IGMP와 OSPF는 TCP/UDP 포트 번호를 사용하지 않습니다.</p>
      </GuideSection>

      <GuideSection number="2" title="TCP와 UDP 비교">
        <div className="guide-table-wrap">
          <table className="guide-table compare-table">
            <thead><tr><th>구분</th><th>TCP</th><th>UDP</th></tr></thead>
            <tbody>
              {TCP_UDP_ROWS.map((row) => (
                <tr key={row.label}><td>{row.label}</td><td>{row.tcp}</td><td>{row.udp}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="guide-note"><strong>TCP 연결:</strong> SYN → SYN/ACK → ACK</p>
        <p className="guide-note"><strong>DHCP 순서:</strong> Discover → Offer → Request → ACK</p>
      </GuideSection>

      <GuideSection number="3" title="OSI 7계층">
        <p className="guide-keyline">응용 → 표현 → 세션 → 전송 → 네트워크 → 데이터링크 → 물리</p>
        <div className="osi-compact">
          {OSI_ROWS.map((row) => (
            <div key={row.layer}>
              <b>{row.layer}</b>
              <p><strong>{row.name}</strong><span>{row.role} · {row.examples}</span></p>
              <em>{row.pdu}</em>
            </div>
          ))}
        </div>
        <div className="guide-facts">
          <p><strong>PDU:</strong> 데이터 → 세그먼트·데이터그램 → 패킷 → 프레임 → 비트</p>
          <p><strong>주소:</strong> MAC 2계층 · IP 3계층 · 포트 4계층</p>
          <p><strong>장비:</strong> 허브·리피터 1계층 · 스위치·브리지 2계층 · 라우터 3계층</p>
        </div>
      </GuideSection>

      <GuideSection number="4" title="리눅스 네트워크 명령어">
        <SimpleRows rows={NETWORK_COMMANDS} />
        <p className="guide-note"><strong>ss -tulnp:</strong> TCP · UDP · Listen · 숫자 표시 · 프로세스 표시</p>
      </GuideSection>

      <GuideSection number="5" title="리눅스 기본 명령어">
        {LINUX_COMMAND_GROUPS.map((group) => (
          <div className="guide-subsection" key={group.title}>
            <h3>{group.title}</h3>
            <SimpleRows rows={group.rows} />
          </div>
        ))}
      </GuideSection>

      <GuideSection number="6" title="권한과 압축">
        <div className="guide-subsection">
          <h3>chmod 권한</h3>
          <SimpleRows rows={PERMISSION_ROWS} />
        </div>
        <div className="guide-subsection">
          <h3>tar</h3>
          <SimpleRows rows={TAR_ROWS} />
        </div>
      </GuideSection>

      <section className="card guide-next center">
        <h2>핵심 요약을 모두 확인했나요?</h2>
        <p className="muted small">이제 전체 과목에서 무작위로 나오는 암기카드로 확인해 보세요.</p>
        <button className="btn primary" onClick={onOpenFlashcards}>암기카드 시작 →</button>
      </section>
    </div>
  );
}

function GuideSection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section className="card guide-section">
      <h2><span>{number}</span>{title}</h2>
      {children}
    </section>
  );
}

function SimpleRows({ rows }: { rows: GuideRow[] }) {
  return (
    <dl className="guide-rows">
      {rows.map((row) => (
        <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>
      ))}
    </dl>
  );
}
