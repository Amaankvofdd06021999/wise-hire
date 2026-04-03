import { getScoreTier } from "@/lib/utils";

interface ScoreBadgeProps {
  score: number;
  showLabel?: boolean;
  size?: "sm" | "md";
}

export function ScoreBadge({
  score,
  showLabel = true,
  size = "md",
}: ScoreBadgeProps) {
  const tier = getScoreTier(score);

  const sizeClasses = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-2.5 py-0.5";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${sizeClasses}`}
      style={{ backgroundColor: tier.bg, color: tier.textColor }}
      aria-label={`Score ${score} — ${tier.label}`}
    >
      {score}
      {showLabel && (
        <span className="hidden sm:inline">
          {tier.label}
        </span>
      )}
    </span>
  );
}
