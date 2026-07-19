'use client';

const MUTED = '#cbd5e1'; // slate-300 (de-emphasis hue)
const ACCENT = '#173b66'; // navy-600 (current period)

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
}

export default function Sparkline({ data, width = 140, height = 36 }: SparklineProps) {
  if (data.length < 2) return null;

  const stepX = width / (data.length - 1);
  const points = data.map((v, i) => {
    const x = i * stepX;
    const y = height - (Math.min(100, Math.max(0, v)) / 100) * height;
    return [x, y] as const;
  });

  const path = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const [prevX, prevY] = points[points.length - 2];
  const [lastX, lastY] = points[points.length - 1];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <path d={path} fill="none" stroke={MUTED} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <path
        d={`M${prevX.toFixed(1)},${prevY.toFixed(1)} L${lastX.toFixed(1)},${lastY.toFixed(1)}`}
        fill="none"
        stroke={ACCENT}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <circle cx={lastX} cy={lastY} r={4} fill={ACCENT} stroke="#ffffff" strokeWidth={2} />
    </svg>
  );
}
