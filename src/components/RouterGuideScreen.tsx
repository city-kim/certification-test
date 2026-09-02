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
        <p>조회 문제는 <code>Router#</code>에서 바로 입력하고, 설정 문제는 전역설정모드로 들어간 뒤 마지막에 저장합니다.</p>
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
  return (
    <article className="card router-item">
      <div className="router-item-head"><span>{number}</span><h3>{item.title}</h3></div>
      <p className="router-question"><b>문제</b>{item.question}</p>
      <CommandBlock commands={item.commands} />
      <p className="router-explanation">{item.explanation}</p>
      {item.caution && <p className="router-caution">주의 · {item.caution}</p>}
    </article>
  );
}

function CommandBlock({ commands }: { commands: string[] }) {
  return <pre className="router-code"><code>{commands.join("\n")}</code></pre>;
}
