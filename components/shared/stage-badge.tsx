import type { CandidateStage } from "@/lib/types";
import { PIPELINE_STAGES } from "@/lib/constants";

interface StageBadgeProps {
  stage: CandidateStage;
}

const stageColors: Record<string, { bg: string; text: string }> = {
  hired: { bg: "var(--success-50)", text: "var(--success-700)" },
  rejected: { bg: "var(--error-50)", text: "var(--error-700)" },
  offer: { bg: "var(--brand-50)", text: "var(--brand-700)" },
};

const defaultColor = { bg: "var(--gray-100)", text: "var(--gray-700)" };

export function StageBadge({ stage }: StageBadgeProps) {
  const stageInfo = PIPELINE_STAGES.find((s) => s.key === stage);
  const label = stageInfo?.name ?? stage;
  const colors = stageColors[stage] ?? defaultColor;

  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {label}
    </span>
  );
}
