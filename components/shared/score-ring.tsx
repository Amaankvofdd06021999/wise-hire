import { cn } from "@/lib/utils";
import { getScoreTier, getHealthScoreTier } from "@/lib/utils";

interface ScoreRingProps {
  score: number;
  size?: number;
  tierType?: "candidate" | "health";
  label?: string;
  className?: string;
}

export function ScoreRing({
  score,
  size = 120,
  tierType = "candidate",
  label,
  className,
}: ScoreRingProps) {
  const tier =
    tierType === "health" ? getHealthScoreTier(score) : getScoreTier(score);

  const strokeWidth = size * 0.08;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div
      className={cn("inline-flex flex-col items-center gap-1", className)}
      role="meter"
      aria-valuenow={score}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? `Score: ${score}`}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--gray-100)"
            strokeWidth={strokeWidth}
          />
          {/* Progress arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={tier.color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
        </svg>

        {/* Centered score */}
        <span
          className="absolute inset-0 flex items-center justify-center font-semibold"
          style={{
            fontSize: size * 0.28,
            color: tier.color,
          }}
        >
          {score}
        </span>
      </div>

      {label && (
        <span
          className="text-xs font-medium"
          style={{ color: "var(--gray-500)" }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
