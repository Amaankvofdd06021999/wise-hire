import type { Candidate } from "@/lib/types";
import { AiContentZone } from "@/components/shared/ai-content-zone";
import { AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ResumeTabProps {
  candidate: Candidate;
}

const matchColors: Record<string, { bg: string; fill: string }> = {
  full: { bg: "var(--gray-200)", fill: "var(--success-500)" },
  partial: { bg: "var(--gray-200)", fill: "var(--warning-500)" },
  missing: { bg: "var(--gray-200)", fill: "var(--gray-300)" },
};

const recommendationStyles: Record<string, { bg: string; text: string; label: string }> = {
  shortlist: { bg: "var(--success-50)", text: "var(--success-700)", label: "Shortlist" },
  consider: { bg: "var(--warning-50)", text: "var(--warning-700)", label: "Consider" },
  skip: { bg: "var(--error-50)", text: "var(--error-700)", label: "Skip" },
};

export function ResumeTab({ candidate }: ResumeTabProps) {
  const { resumeAnalysis, careerTimeline, skills } = candidate;

  return (
    <div className="space-y-8">
      {/* Career timeline */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold" style={{ color: "var(--gray-900)" }}>
          Career Timeline
        </h3>
        <div className="relative pl-6">
          {/* Connecting line */}
          <div
            className="absolute left-[7px] top-2 bottom-2 w-0.5"
            style={{ backgroundColor: "var(--gray-200)" }}
          />
          <div className="space-y-5">
            {careerTimeline.map((entry, i) => (
              <div key={i} className="relative">
                {/* Circle dot */}
                <div
                  className="absolute -left-6 top-1 h-3.5 w-3.5 rounded-full border-2 border-white"
                  style={{
                    backgroundColor: entry.current ? "var(--brand-600)" : "var(--gray-300)",
                  }}
                />
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--gray-900)" }}>
                    {entry.company}
                  </p>
                  <p className="text-sm" style={{ color: "var(--gray-600)" }}>
                    {entry.role}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs" style={{ color: "var(--gray-400)" }}>
                      {entry.startDate} &ndash; {entry.endDate ?? "Present"}
                    </span>
                    {entry.current && (
                      <span
                        className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium"
                        style={{ backgroundColor: "var(--brand-50)", color: "var(--brand-700)" }}
                      >
                        Current
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills match */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold" style={{ color: "var(--gray-900)" }}>
          Skills Match
        </h3>
        <div className="space-y-2">
          {skills.map((skill) => {
            const colors = matchColors[skill.matched];
            const width = skill.matched === "full" ? 100 : skill.matched === "partial" ? 60 : 10;
            return (
              <div key={skill.name} className="flex items-center gap-3">
                <span className="w-28 text-sm shrink-0" style={{ color: "var(--gray-700)" }}>
                  {skill.name}
                </span>
                <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: colors.bg }}>
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{ width: `${width}%`, backgroundColor: colors.fill }}
                  />
                </div>
                <span className="text-xs w-14 text-right capitalize" style={{ color: "var(--gray-500)" }}>
                  {skill.matched}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI analysis */}
      <AiContentZone>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold mb-1" style={{ color: "var(--gray-900)" }}>
              Career Trajectory Analysis
            </h4>
            <p className="text-sm" style={{ color: "var(--gray-700)" }}>
              {resumeAnalysis.trajectoryAnalysis}
            </p>
          </div>

          {resumeAnalysis.redFlags.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold" style={{ color: "var(--gray-900)" }}>
                Red Flags
              </h4>
              {resumeAnalysis.redFlags.map((flag, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 rounded-md border p-3"
                  style={{ borderColor: "var(--error-200)", backgroundColor: "var(--error-50)" }}
                >
                  <AlertTriangle size={16} className="shrink-0 mt-0.5" style={{ color: "var(--error-500)" }} />
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--error-700)" }}>
                      {flag.text}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--error-600)" }}>
                      {flag.context}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </AiContentZone>

      {/* Resume quality */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium" style={{ color: "var(--gray-700)" }}>
            Resume Quality
          </span>
          <span className="text-sm font-semibold" style={{ color: "var(--gray-900)" }}>
            {resumeAnalysis.qualityScore}/100
          </span>
        </div>
        <Progress value={resumeAnalysis.qualityScore} className="h-2" />
      </div>

      {/* AI Recommendation */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold" style={{ color: "var(--gray-900)" }}>
          AI Recommendation
        </h3>
        <div className="flex items-start gap-3">
          {(() => {
            const rec = recommendationStyles[resumeAnalysis.recommendation];
            return (
              <span
                className="inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium"
                style={{ backgroundColor: rec.bg, color: rec.text }}
              >
                {rec.label}
              </span>
            );
          })()}
          <p className="text-sm" style={{ color: "var(--gray-700)" }}>
            {resumeAnalysis.recommendationReasoning}
          </p>
        </div>
      </div>
    </div>
  );
}
