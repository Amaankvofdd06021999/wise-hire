import { ScoreRing } from "@/components/shared/score-ring";

interface HealthScoreProps {
  score: number;
}

export function HealthScore({ score }: HealthScoreProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 rounded-xl bg-white p-6 card-hover"
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      <ScoreRing score={score} size={120} tierType="health" />
      <span
        className="text-sm font-medium"
        style={{ color: "var(--gray-700)" }}
      >
        Hiring Health
      </span>
    </div>
  );
}
