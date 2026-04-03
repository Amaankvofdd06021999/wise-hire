import { TrendIndicator } from "@/components/shared/trend-indicator";

interface StatCardProps {
  eyebrow: string;
  value: string;
  delta: number;
  deltaSuffix?: string;
  subtitle?: string;
  positive?: boolean;
}

export function StatCard({
  eyebrow,
  value,
  delta,
  deltaSuffix,
  subtitle,
  positive,
}: StatCardProps) {
  return (
    <div className="rounded-xl bg-white border border-[var(--gray-200)] p-5 flex flex-col justify-between gap-3 transition-shadow hover:shadow-md">
      {/* Eyebrow label */}
      <p
        className="text-sm font-medium"
        style={{ color: "var(--gray-500)" }}
      >
        {eyebrow}
      </p>

      {/* Large value */}
      <p
        className="text-2xl font-bold tracking-tight lg:text-3xl"
        style={{ color: "var(--gray-900)" }}
      >
        {value}
      </p>

      {/* Delta + subtitle row */}
      <div className="flex items-center gap-2">
        <TrendIndicator value={delta} suffix={deltaSuffix} positive={positive} />
        {subtitle && (
          <span className="text-xs" style={{ color: "var(--gray-400)" }}>
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}
