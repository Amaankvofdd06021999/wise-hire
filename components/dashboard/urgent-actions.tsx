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

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Clock,
  AlertTriangle,
  FileWarning,
  MessageCircle,
  Star,
};

export function UrgentActions() {
  return (
    <div
      className="rounded-xl bg-white p-6"
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      <h2
        className="text-base font-semibold"
        style={{ color: "var(--gray-900)" }}
      >
        Needs Attention
      </h2>

      <div className="mt-4 space-y-3">
        {urgentActions.map((action) => {
          const IconComponent = iconMap[action.icon] ?? Clock;
          const borderColor = urgencyBorder[action.urgency];

          return (
            <div
              key={action.id}
              className="flex items-start gap-3 rounded-md py-3 px-3"
              style={{ borderLeft: `3px solid ${borderColor}` }}
            >
              <IconComponent
                size={18}
                className="shrink-0 mt-0.5"
                style={{ color: borderColor }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm" style={{ color: "var(--gray-700)" }}>
                  {action.description}
                </p>
                <div className="mt-1 flex items-center gap-3">
                  <span className="text-xs" style={{ color: "var(--gray-400)" }}>
                    {action.timeAgo}
                  </span>
                  <Link
                    href={action.actionUrl}
                    className="text-sm font-medium"
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
