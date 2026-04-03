import Link from "next/link";
import { mockCandidates } from "@/lib/mock-data";
import { ScoreBadge } from "@/components/shared/score-badge";
import { SkillTag } from "@/components/shared/skill-tag";

export function TopCandidates() {
  const topThree = [...mockCandidates]
    .sort((a, b) => b.aiScore - a.aiScore)
    .slice(0, 3);

  return (
    <div
      className="rounded-xl bg-white p-6"
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      <div className="flex items-center justify-between">
        <h2
          className="text-base font-semibold"
          style={{ color: "var(--gray-900)" }}
        >
          Top Candidates
        </h2>
        <Link
          href="/candidates"
          className="text-sm font-medium"
          style={{ color: "var(--brand-600)" }}
        >
          View All
        </Link>
      </div>

      <div className="mt-4 space-y-4">
        {topThree.map((candidate) => {
          const initials = candidate.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();

          return (
            <div
              key={candidate.id}
              className="flex items-start gap-3 rounded-lg border p-4"
              style={{ borderColor: "var(--gray-200)" }}
            >
              {/* Avatar */}
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
                style={{
                  backgroundColor: "var(--brand-100)",
                  color: "var(--brand-700)",
                }}
              >
                {initials}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p
                      className="truncate text-sm font-semibold"
                      style={{ color: "var(--gray-900)" }}
                    >
                      {candidate.name}
                    </p>
                    <p
                      className="truncate text-xs"
                      style={{ color: "var(--gray-500)" }}
                    >
                      {candidate.currentRole}
                    </p>
                  </div>
                  <ScoreBadge score={candidate.aiScore} size="sm" />
                </div>

                {/* Skills */}
                <div className="mt-2 flex flex-wrap gap-1">
                  {candidate.skills.slice(0, 3).map((skill) => (
                    <SkillTag
                      key={skill.name}
                      name={skill.name}
                      matched={skill.matched}
                    />
                  ))}
                </div>

                {/* View link */}
                <Link
                  href={`/candidates/${candidate.id}`}
                  className="mt-2 inline-block text-sm font-medium"
                  style={{ color: "var(--brand-600)" }}
                >
                  View
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
