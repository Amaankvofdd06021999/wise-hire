import { TrendingUp, TrendingDown } from "lucide-react";

interface TrendIndicatorProps {
  value: number;
  suffix?: string;
  positive?: boolean;
}

export function TrendIndicator({ value, suffix, positive }: TrendIndicatorProps) {
  const isPositive = positive ?? value > 0;
  const Icon = value >= 0 ? TrendingUp : TrendingDown;
  const color = isPositive ? "var(--success-600)" : "var(--error-600)";

  const displayValue = value >= 0 ? `+${value}` : `${value}`;

  return (
    <span className="inline-flex items-center gap-1 text-sm font-medium" style={{ color }}>
      <Icon size={14} />
      {displayValue}{suffix}
    </span>
  );
}
