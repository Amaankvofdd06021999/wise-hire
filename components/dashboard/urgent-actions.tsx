import Link from "next/link";
import type { LucideProps } from "lucide-react";
import {
  Clock,
  AlertTriangle,
  FileWarning,
  MessageCircle,
  Star,
} from "lucide-react";
import { urgentActions } from "@/lib/mock-data";
import type { UrgencyLevel } from "@/lib/types";

const urgencyBorder: Record<UrgencyLevel, string> = {
  critical: "var(--error-500)",
  warning: "var(--warning-500)",
  info: "var(--brand-500)",
};

const urgencyBg: Record<UrgencyLevel, string> = {
  critical: "var(--error-50, #FEF3F2)",
  warning: "var(--warning-50, #FFFAEB)",
  info: "var(--brand-25)",
};

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Clock,
  AlertTriangle,
  FileWarning,
  MessageCircle,
  Star,
};

export function UrgentActions() {
  return (
    <div className="rounded-xl bg-white border border-[var(--gray-200)] p-6 lg:p-8 transition-shadow hover:shadow-md">
      <h2
        className="text-base font-semibold lg:text-lg"
        style={{ color: "var(--gray-900)" }}
      >
        Needs Attention
      </h2>

      <div className="mt-6 space-y-3">
        {urgentActions.map((action) => {
          const IconComponent = iconMap[action.icon] ?? Clock;
          const borderColor = urgencyBorder[action.urgency];
          const bgColor = urgencyBg[action.urgency];

          return (
            <div
              key={action.id}
              className="flex items-start gap-3 rounded-lg py-4 px-4"
              style={{
                borderLeft: `3px solid ${borderColor}`,
                backgroundColor: bgColor,
              }}
            >
              <IconComponent
                size={18}
                className="shrink-0 mt-0.5"
                style={{ color: borderColor }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-relaxed" style={{ color: "var(--gray-700)" }}>
                  {action.description}
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-xs font-medium" style={{ color: "var(--gray-400)" }}>
                    {action.timeAgo}
                  </span>
                  <Link
                    href={action.actionUrl}
                    className="text-sm font-semibold"
                    style={{ color: "var(--brand-600)" }}
                  >
                    {action.actionLabel}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
