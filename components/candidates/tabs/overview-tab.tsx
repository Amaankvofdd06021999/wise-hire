import type { Candidate } from "@/lib/types";
import { ScoreRing } from "@/components/shared/score-ring";
import { AiContentZone } from "@/components/shared/ai-content-zone";
import { Star, Check, AlertTriangle, X } from "lucide-react";
import { formatRelativeDate } from "@/lib/utils";

interface OverviewTabProps {
  candidate: Candidate;
}

const verdictConfig: Record<string, { icon: React.ReactNode; label: string; bg: string; text: string }> = {
  strong: { icon: <Star size={14} />, label: "Strong Fit", bg: "var(--success-50)", text: "var(--success-700)" },
  good: { icon: <Check size={14} />, label: "Good Fit", bg: "var(--brand-50)", text: "var(--brand-700)" },
  review: { icon: <AlertTriangle size={14} />, label: "Needs Review", bg: "var(--warning-50)", text: "var(--warning-700)" },
  not_fit: { icon: <X size={14} />, label: "Not Fit", bg: "var(--error-50)", text: "var(--error-700)" },
};

function getInitials(name: string): string {
  const parts = name.split(" ");
  return ((parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "")).toUpperCase();
}

export function OverviewTab({ candidate }: OverviewTabProps) {
  const verdict = verdictConfig[candidate.scoreTier] ?? verdictConfig.review;

  return (
    <div className="space-y-6">
      {/* Score + Verdict */}
      <div className="flex items-center gap-6">
        <ScoreRing score={candidate.aiScore} size={80} tierType="candidate" />
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium"
          style={{ backgroundColor: verdict.bg, color: verdict.text }}
        >
          {verdict.icon}
          {verdict.label}
        </span>
      </div>

      {/* AI Summary */}
      <AiContentZone>
        <p className="text-sm" style={{ color: "var(--gray-700)" }}>
          {candidate.aiSummary}
        </p>
      </AiContentZone>

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-[var(--gray-200)] p-4 text-center">
          <p className="text-2xl font-semibold" style={{ color: "var(--gray-900)" }}>
            {candidate.yearsExperience}
          </p>
          <p className="text-xs" style={{ color: "var(--gray-500)" }}>
            Years Experience
          </p>
        </div>
        <div className="rounded-xl border border-[var(--gray-200)] p-4 text-center">
          <p className="text-2xl font-semibold" style={{ color: "var(--gray-900)" }}>
            {candidate.portfolioScore ?? "N/A"}
          </p>
          <p className="text-xs" style={{ color: "var(--gray-500)" }}>
            Portfolio Score
          </p>
        </div>
        <div className="rounded-xl border border-[var(--gray-200)] p-4 text-center">
          <p className="text-2xl font-semibold" style={{ color: "var(--gray-900)" }}>
            Pending
          </p>
          <p className="text-xs" style={{ color: "var(--gray-500)" }}>
            Assessment Score
          </p>
        </div>
      </div>

      {/* Skill match */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium" style={{ color: "var(--gray-700)" }}>
            Skill Match
          </span>
          <span className="text-sm font-semibold" style={{ color: "var(--brand-600)" }}>
            {candidate.skillMatchPercent}% match
          </span>
        </div>
        <div className="h-2 w-full rounded-full" style={{ backgroundColor: "var(--gray-200)" }}>
          <div
            className="h-2 rounded-full transition-all"
            style={{
              width: `${candidate.skillMatchPercent}%`,
              backgroundColor: "var(--brand-600)",
            }}
          />
        </div>
      </div>

      {/* Team activity */}
      {candidate.teamActivity.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold" style={{ color: "var(--gray-900)" }}>
            Team Activity
          </h3>
          <div className="space-y-3">
            {candidate.teamActivity.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: "var(--brand-100)",
                    color: "var(--brand-700)",
                  }}
                >
                  {getInitials(activity.userName)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm" style={{ color: "var(--gray-700)" }}>
                    <span className="font-medium">{activity.userName}</span>{" "}
                    {activity.action === "viewed" && "viewed this profile"}
                    {activity.action === "commented" && "left a comment"}
                    {activity.action === "rated" && `rated ${activity.rating}/5`}
                  </p>
                  {activity.comment && (
                    <blockquote
                      className="mt-1 border-l-2 pl-3 text-sm italic"
                      style={{
                        borderColor: "var(--gray-300)",
                        color: "var(--gray-600)",
                      }}
                    >
                      {activity.comment}
                    </blockquote>
                  )}
                  <p className="mt-0.5 text-xs" style={{ color: "var(--gray-400)" }}>
                    {formatRelativeDate(activity.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
