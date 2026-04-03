import type { Candidate } from "@/lib/types";
import { ScoreBadge } from "@/components/shared/score-badge";
import { SkillTag } from "@/components/shared/skill-tag";

interface CompareViewProps {
  candidates: Candidate[];
}

function getInitials(name: string): string {
  const parts = name.split(" ");
  return ((parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "")).toUpperCase();
}

function getBestIdx(values: (number | null)[], higher = true): number {
  let bestIdx = -1;
  let bestVal = higher ? -Infinity : Infinity;
  for (let i = 0; i < values.length; i++) {
    const v = values[i];
    if (v == null) continue;
    if (higher ? v > bestVal : v < bestVal) {
      bestVal = v;
      bestIdx = i;
    }
  }
  return bestIdx;
}

const recommendationStyles: Record<string, { bg: string; text: string }> = {
  shortlist: { bg: "var(--success-50)", text: "var(--success-700)" },
  consider: { bg: "var(--warning-50)", text: "var(--warning-700)" },
  skip: { bg: "var(--error-50)", text: "var(--error-700)" },
};

export function CompareView({ candidates }: CompareViewProps) {
  const scores = candidates.map((c) => c.aiScore);
  const bestScore = getBestIdx(scores);

  const portfolios = candidates.map((c) => c.portfolioScore);
  const bestPortfolio = getBestIdx(portfolios);

  const experience = candidates.map((c) => c.yearsExperience);
  const bestExp = getBestIdx(experience);

  const skillMatch = candidates.map((c) => c.skillMatchPercent);
  const bestSkill = getBestIdx(skillMatch);

  const aiContent = candidates.map((c) => c.aiContentPercent);
  const bestAiContent = getBestIdx(aiContent, false);

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--gray-200)]">
            <th className="p-3 text-left font-medium" style={{ color: "var(--gray-500)", minWidth: 140 }}>
              Metric
            </th>
            {candidates.map((c) => (
              <th key={c.id} className="p-3 text-center" style={{ minWidth: 160 }}>
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold"
                    style={{ backgroundColor: "var(--brand-100)", color: "var(--brand-700)" }}
                  >
                    {getInitials(c.name)}
                  </div>
                  <span className="font-semibold" style={{ color: "var(--gray-900)" }}>
                    {c.name}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* AI Fit Score */}
          <tr className="border-b border-[var(--gray-100)]">
            <td className="p-3 font-medium" style={{ color: "var(--gray-700)" }}>AI Fit Score</td>
            {candidates.map((c, i) => (
              <td
                key={c.id}
                className="p-3 text-center"
                style={i === bestScore ? { backgroundColor: "var(--success-50)" } : undefined}
              >
                <ScoreBadge score={c.aiScore} size="sm" />
              </td>
            ))}
          </tr>

          {/* Portfolio Score */}
          <tr className="border-b border-[var(--gray-100)]">
            <td className="p-3 font-medium" style={{ color: "var(--gray-700)" }}>Portfolio Score</td>
            {candidates.map((c, i) => (
              <td
                key={c.id}
                className="p-3 text-center"
                style={i === bestPortfolio ? { backgroundColor: "var(--success-50)" } : undefined}
              >
                {c.portfolioScore ?? "N/A"}
              </td>
            ))}
          </tr>

          {/* Assessment Score */}
          <tr className="border-b border-[var(--gray-100)]">
            <td className="p-3 font-medium" style={{ color: "var(--gray-700)" }}>Assessment Score</td>
            {candidates.map((c) => (
              <td key={c.id} className="p-3 text-center" style={{ color: "var(--gray-500)" }}>
                Pending
              </td>
            ))}
          </tr>

          {/* Years Exp */}
          <tr className="border-b border-[var(--gray-100)]">
            <td className="p-3 font-medium" style={{ color: "var(--gray-700)" }}>Years Exp</td>
            {candidates.map((c, i) => (
              <td
                key={c.id}
                className="p-3 text-center"
                style={i === bestExp ? { backgroundColor: "var(--success-50)" } : undefined}
              >
                {c.yearsExperience}
              </td>
            ))}
          </tr>

          {/* Skills Match % */}
          <tr className="border-b border-[var(--gray-100)]">
            <td className="p-3 font-medium" style={{ color: "var(--gray-700)" }}>Skills Match %</td>
            {candidates.map((c, i) => (
              <td
                key={c.id}
                className="p-3 text-center"
                style={i === bestSkill ? { backgroundColor: "var(--success-50)" } : undefined}
              >
                {c.skillMatchPercent}%
              </td>
            ))}
          </tr>

          {/* Key Skills */}
          <tr className="border-b border-[var(--gray-100)]">
            <td className="p-3 font-medium" style={{ color: "var(--gray-700)" }}>Key Skills</td>
            {candidates.map((c) => (
              <td key={c.id} className="p-3">
                <div className="flex flex-wrap gap-1 justify-center">
                  {c.skills.slice(0, 3).map((s) => (
                    <SkillTag key={s.name} name={s.name} matched={s.matched} />
                  ))}
                </div>
              </td>
            ))}
          </tr>

          {/* AI Content % */}
          <tr className="border-b border-[var(--gray-100)]">
            <td className="p-3 font-medium" style={{ color: "var(--gray-700)" }}>AI Content %</td>
            {candidates.map((c, i) => (
              <td
                key={c.id}
                className="p-3 text-center"
                style={i === bestAiContent ? { backgroundColor: "var(--success-50)" } : undefined}
              >
                {c.aiContentPercent}%
              </td>
            ))}
          </tr>

          {/* Recommendation */}
          <tr>
            <td className="p-3 font-medium" style={{ color: "var(--gray-700)" }}>Recommendation</td>
            {candidates.map((c) => {
              const rec = recommendationStyles[c.resumeAnalysis.recommendation] ?? recommendationStyles.consider;
              return (
                <td key={c.id} className="p-3 text-center">
                  <span
                    className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize"
                    style={{ backgroundColor: rec.bg, color: rec.text }}
                  >
                    {c.resumeAnalysis.recommendation}
                  </span>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
