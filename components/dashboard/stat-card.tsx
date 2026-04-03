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
    <div
      className="rounded-xl bg-white p-6 card-hover"
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      <p
        className="text-xs font-medium uppercase tracking-wide"
        style={{ color: "var(--gray-500)" }}
      >
        {eyebrow}
      </p>
      <p
        className="mt-1 text-2xl font-semibold"
        style={{ color: "var(--gray-900)" }}
      >
        {value}
      </p>
      <div className="mt-2">
        <TrendIndicator value={delta} suffix={deltaSuffix} positive={positive} />
      </div>
      {subtitle && (
        <p className="mt-1 text-xs" style={{ color: "var(--gray-400)" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
