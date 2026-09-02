import {
  ROUTER_COMMON_FLOW,
  ROUTER_GUIDE_SECTIONS,
  ROUTER_GUIDE_SOURCE,
  type RouterGuideItem,
} from "../data/network_2_practical/routerGuide";

interface Props {
  onBack: () => void;
}

export default function RouterGuideScreen({ onBack }: Props) {
  const itemCount = ROUTER_GUIDE_SECTIONS.reduce((sum, section) => sum + section.items.length, 0);

  return (
    <div className="screen router-guide">
      <header className="page-head">
        <button className="link" onClick={onBack}>← 홈</button>
        <h1>라우터 기출</h1>
        <span className="page-head-spacer" />
      </header>

      <p className="router-intro">
        반복 출제된 {itemCount}개 명령 유형입니다. 문제의 숫자·이름은 달라져도 입력 위치와 명령 구조는 같습니다.
      </p>

      <section className="card router-common">
        <div className="router-section-title"><span>0</span><h2>공통 진입·저장 순서</h2></div>
        <CommandBlock commands={ROUTER_COMMON_FLOW} />
        <p>
          조회 문제는 <code>Router#</code>에서 바로 입력하고, 설정 문제는 전역설정모드로 들어간 뒤 마지막에 저장합니다.<br />
          원형 · <code>en = enable</code> · <code>conf t = configure terminal</code> · <code>copy run start = copy running-config startup-config</code>
        </p>
      </section>

      {ROUTER_GUIDE_SECTIONS.map((section, sectionIndex) => (
        <section className="router-section" key={section.key}>
          <div className="router-section-title">
            <span>{sectionIndex + 1}</span><h2>{section.label}</h2><small>{section.items.length}개</small>
          </div>
          <div className="router-item-list">
            {section.items.map((item, index) => (
              <RouterItem key={item.id} item={item} number={index + 1} />
            ))}
          </div>
        </section>
      ))}

      <a className="router-source" href={ROUTER_GUIDE_SOURCE} target="_blank" rel="noreferrer">
        원문 카테고리 보기 ↗
      </a>
    </div>
  );
}

function RouterItem({ item, number }: { item: RouterGuideItem; number: number }) {
  const commandFlow = buildCommandFlow(item.commands);
  const originals = abbreviatedOriginals(item.commands);

  return (
    <article className="card router-item">
      <div className="router-item-head"><span>{number}</span><h3>{item.title}</h3></div>
      <p className="router-question"><b>문제</b>{item.question}</p>
      <CommandBlock commands={commandFlow} />
      <p className="router-explanation">{item.explanation}</p>
      {originals.length > 0 && (
        <p className="router-original">
          <b>원형</b>{originals.map((command) => <code key={command}>{command}</code>)}
        </p>
      )}
      {item.caution && <p className="router-caution">주의 · {item.caution}</p>}
    </article>
  );
}

function CommandBlock({ commands }: { commands: string[] }) {
  return <pre className="router-code"><code>{commands.join("\n")}</code></pre>;
}

const ABBREVIATIONS: Array<[string, string]> = [
  ["show interfaces", "sh int"],
  ["show users", "sh user"],
  ["show ip route", "sh ip route"],
  ["show flash", "sh flash"],
  ["show processes cpu", "sh proc cpu"],
  ["show version", "sh ver"],
  ["show hosts", "sh host"],
  ["interface fastethernet", "int fa"],
  ["interface serial", "int se"],
  ["no shutdown", "no shut"],
  ["description", "desc"],
  ["encapsulation", "encap"],
  ["transport input", "trans in"],
];

function abbreviateLine(line: string): string {
  return ABBREVIATIONS.reduce(
    (result, [original, short]) => result.replace(original, short),
    line,
  );
}

/** 각 설정 카드 안에 시험장에서 실제로 입력할 진입·종료·저장 흐름을 붙인다. */
function buildCommandFlow(commands: string[]): string[] {
  const abbreviated = commands.map(abbreviateLine);
  const isConfig = commands.some((line) => line.includes("(config"));

  if (!isConfig) return ["Router> en", ...abbreviated];

  const lastPrompt = commands[commands.length - 1]?.match(/^(Router\([^)]*\)#)/)?.[1];
  const leaveSubmode = lastPrompt && lastPrompt !== "Router(config)#"
    ? [`${lastPrompt} exit`]
    : [];

  return [
    "Router> en",
    "Router# conf t",
    ...abbreviated,
    ...leaveSubmode,
    "Router(config)# exit",
    "Router# copy run start",
  ];
}

/** 실제로 축약한 명령에 대해서만 프롬프트와 인자를 뺀 원형을 표시한다. */
function abbreviatedOriginals(commands: string[]): string[] {
  const used = ABBREVIATIONS
    .filter(([original]) => commands.some((line) => line.includes(original)))
    .map(([original]) => original);
  return [...new Set(used)];
}
