'use client';

export const ATTENDANCE_WARNING_THRESHOLD = 75;

export function getAttendanceColor(percentage: number) {
  if (percentage >= 85) return '#16a34a'; // green-600
  if (percentage >= ATTENDANCE_WARNING_THRESHOLD) return '#ca8a04'; // yellow-600
  return '#dc2626'; // red-600
}

export function getAttendanceStatus(percentage: number): 'good' | 'warning' | 'critical' {
  if (percentage >= 85) return 'good';
  if (percentage >= ATTENDANCE_WARNING_THRESHOLD) return 'warning';
  return 'critical';
}

interface AttendanceRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export default function AttendanceRing({ percentage, size = 140, strokeWidth = 12, label }: AttendanceRingProps) {
  const clamped = Math.min(100, Math.max(0, percentage));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;
  const color = getAttendanceColor(clamped);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e5e7eb" strokeWidth={strokeWidth} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-navy-900">{Math.round(clamped)}%</span>
        {label && <span className="mt-0.5 text-xs text-gray-500">{label}</span>}
      </div>
    </div>
  );
}
