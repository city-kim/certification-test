import type { AdspIntroChartData } from "../data/adsp/intro";

/** 같은 학습 예시의 누적 이득과 향상도를 각각의 축으로 그린다. */
export default function AdspIntroChart({ chart, id }: { chart: AdspIntroChartData; id: string }) {
  const x = (value: number) => 48 + value / chart.xMax * 290;
  const y = (value: number) => 175 - value / chart.yMax * 150;
  const points = (values: Array<[number, number]>) => values.map(([vx, vy]) => `${x(vx)},${y(vy)}`).join(" ");
  const ticks = [0, 0.25, 0.5, 0.75, 1];

  return (
    <figure className="adsp-intro-chart">
      <figcaption id={`${id}-caption`}>{chart.caption}</figcaption>
      <svg viewBox="0 0 360 220" role="img" aria-labelledby={`${id}-caption`}>
        {ticks.map((tick) => (
          <g key={tick}>
            <line x1={48} x2={338} y1={y(tick * chart.yMax)} y2={y(tick * chart.yMax)} className="chart-grid" />
            <text x={40} y={y(tick * chart.yMax) + 4} textAnchor="end">{tick * chart.yMax}</text>
            <text x={x(tick * chart.xMax)} y={192} textAnchor="middle">{tick * chart.xMax}</text>
          </g>
        ))}
        <path d="M48 25V175H338" className="chart-axis" />
        <polyline points={points(chart.baseline)} className="chart-baseline" />
        <polyline points={points(chart.points)} className="chart-model" />
        {chart.points.map(([vx, vy]) => <circle key={vx} cx={x(vx)} cy={y(vy)} r={3} className="chart-point" />)}
        <text x={193} y={214} textAnchor="middle">{chart.xLabel}</text>
        <text transform="translate(13 100) rotate(-90)" textAnchor="middle">{chart.yLabel}</text>
      </svg>
      <p className="chart-legend"><span>실선: 모형</span><span>점선: 무작위 선택</span></p>
    </figure>
  );
}
