import React from "react";
import { Sparkles } from "lucide-react";

interface AiInsightsStat {
  label: string;
  value: string;
  color?: string;
}

interface AiInsightsBannerProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  stats?: AiInsightsStat[];
  badge?: string;
}

export function AiInsightsBanner({
  icon,
  title,
  description,
  stats,
  badge,
}: AiInsightsBannerProps) {
  return (
    <div className="rounded-xl bg-[var(--brand-50)] p-6">
      {/* Top row: icon + text + badge */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          {/* Icon circle */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--brand-100)] text-[var(--brand-600)]">
            {icon}
          </div>

          {/* Title + description */}
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-[var(--gray-900)] leading-tight">
              {title}
            </h3>
            <p className="mt-1 text-sm text-[var(--gray-600)] leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Badge */}
        {badge && (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--brand-100)] px-3 py-1 text-xs font-semibold text-[var(--brand-700)]">
            <Sparkles size={12} />
            {badge}
          </span>
        )}
      </div>

      {/* Stats row */}
      {stats && stats.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-0.5">
              <span className="text-xs text-[var(--gray-500)] leading-none">
                {stat.label}
              </span>
              <span
                className="text-xl font-semibold leading-tight"
                style={{ color: stat.color ?? "var(--brand-600)" }}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
