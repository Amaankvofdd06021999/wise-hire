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
    <div className="rounded-xl bg-[var(--brand-50)] border border-[var(--brand-200,#C6D4FF)] p-6 lg:p-8">
      {/* Top row: icon + text + badge */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 min-w-0">
          {/* Icon circle */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--brand-100)] text-[var(--brand-600)]">
            {icon}
          </div>

          {/* Title + description */}
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-[var(--gray-900)] leading-tight lg:text-base">
              {title}
            </h3>
            <p className="mt-1.5 text-sm text-[var(--gray-600)] leading-relaxed">
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
        <div className="mt-6 flex flex-wrap items-center gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="text-xs font-medium text-[var(--gray-500)] leading-none">
                {stat.label}
              </span>
              <span
                className="text-xl font-bold leading-tight"
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
