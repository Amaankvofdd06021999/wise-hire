import { TrendingUp, TrendingDown } from "lucide-react";

interface TrendIndicatorProps {
  value: number;
  suffix?: string;
  positive?: boolean;
}

export function TrendIndicator({ value, suffix, positive }: TrendIndicatorProps) {
  const isPositive = positive ?? value > 0;
  const color = isPositive ? "var(--success-600)" : "var(--error-600)";
  const bg = isPositive ? "var(--success-50)" : "var(--error-50)";

  const displayValue = value >= 0 ? `+${value}` : `${value}`;

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold"
      style={{ color, backgroundColor: bg }}
    >
      {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
      {displayValue}{suffix}
    </span>
  );
}
