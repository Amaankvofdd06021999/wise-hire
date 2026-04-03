import { ScoreRing } from "@/components/shared/score-ring";

interface HealthScoreProps {
  score: number;
}

export function HealthScore({ score }: HealthScoreProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl bg-white border border-[var(--gray-200)] p-5 transition-shadow hover:shadow-md">
      <ScoreRing score={score} size={100} tierType="health" />
      <span
        className="text-sm font-medium"
        style={{ color: "var(--gray-600)" }}
      >
        Hiring Health
      </span>
    </div>
  );
}
