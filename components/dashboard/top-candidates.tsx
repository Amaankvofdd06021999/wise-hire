import Link from "next/link";
import { mockCandidates } from "@/lib/mock-data";
import { ScoreBadge } from "@/components/shared/score-badge";
import { SkillTag } from "@/components/shared/skill-tag";

export function TopCandidates() {
  const topThree = [...mockCandidates]
    .sort((a, b) => b.aiScore - a.aiScore)
    .slice(0, 3);

  return (
    <div className="rounded-xl bg-white border border-[var(--gray-200)] p-6 lg:p-8 transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        <h2
          className="text-base font-semibold lg:text-lg"
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

      <div className="mt-6 space-y-4">
        {topThree.map((candidate) => {
          const initials = candidate.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();

          return (
            <div
              key={candidate.id}
              className="flex items-start gap-4 rounded-xl border border-[var(--gray-200)] p-4 lg:p-5 transition-colors hover:bg-[var(--gray-25)]"
            >
              {/* Avatar */}
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
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
                      className="truncate text-xs mt-0.5"
                      style={{ color: "var(--gray-500)" }}
                    >
                      {candidate.currentRole}
                    </p>
                  </div>
                  <ScoreBadge score={candidate.aiScore} size="sm" />
                </div>

                {/* Skills */}
                <div className="mt-3 flex flex-wrap gap-1.5">
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
                  className="mt-3 inline-block text-sm font-semibold"
                  style={{ color: "var(--brand-600)" }}
                >
                  View Profile
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
