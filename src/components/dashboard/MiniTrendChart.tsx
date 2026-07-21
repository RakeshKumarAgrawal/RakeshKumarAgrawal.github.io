type MiniTrendChartProps = {
  values: readonly number[];
};

export default function MiniTrendChart({ values }: MiniTrendChartProps) {
  if (!values.length) {
    return (
      <div className="h-14 rounded-xl border border-border/70 bg-white/5" aria-hidden="true" />
    );
  }

  const width = 120;
  const height = 48;
  const padding = 6;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(max - min, 1);

  const points = values.map((value, index) => {
    const x =
      padding +
      (index * (width - padding * 2)) /
        Math.max(values.length - 1, 1);
    const y =
      height -
      padding -
      ((value - min) / range) * (height - padding * 2);

    return `${x},${y}`;
  });

  const areaPoints = [`${padding},${height - padding}`, ...points, `${width - padding},${height - padding}`].join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-14 w-full"
      role="img"
      aria-label="Metric trend chart"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="dashboard-trend-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(56,189,248,0.32)" />
          <stop offset="100%" stopColor="rgba(56,189,248,0)" />
        </linearGradient>
      </defs>
      <polyline fill="url(#dashboard-trend-gradient)" points={areaPoints} />
      <polyline
        fill="none"
        stroke="rgb(56 189 248)"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={points.join(" ")}
      />
    </svg>
  );
}
