"use client";

import type { Candidate } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Brain,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

interface AiAnalysisModalProps {
  candidate: Candidate;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function generateAnalysis(candidate: Candidate) {
  const score = candidate.aiScore;
  const matchedSkills = candidate.skills.filter((s) => s.matched === "full");
  const partialSkills = candidate.skills.filter((s) => s.matched === "partial");
  const missingSkills = candidate.skills.filter((s) => s.matched === "missing");

  const strengths = [
    `${candidate.yearsExperience}+ years of relevant industry experience at ${candidate.currentCompany}`,
    matchedSkills.length > 0
      ? `Strong proficiency in ${matchedSkills.map((s) => s.name).join(", ")}`
      : "Demonstrates solid foundational skills across key areas",
    score >= 75
      ? "Excellent portfolio quality with measurable business impact"
      : "Solid portfolio showing growth and design thinking",
    "Strong communication skills demonstrated in application materials",
  ];

  const concerns = [
    missingSkills.length > 0
      ? `Missing required skills: ${missingSkills.map((s) => s.name).join(", ")}`
      : "Limited experience with some emerging tools in the stack",
    partialSkills.length > 0
      ? `Partial match on: ${partialSkills.map((s) => s.name).join(", ")} — may need upskilling`
      : "Some gaps in cross-functional collaboration experience",
    candidate.hasAiContentFlag
      ? "AI-generated content detected in application — requires manual review"
      : "Limited evidence of leadership or mentoring experience",
  ];

  const skillBars = [
    {
      label: "Technical Skills",
      percent: Math.min(100, Math.round(score * 1.02)),
    },
    {
      label: "Experience Fit",
      percent: Math.min(100, Math.round(score * 0.95)),
    },
    {
      label: "Cultural Alignment",
      percent: Math.min(100, Math.round(score * 0.88 + 10)),
    },
  ];

  const recommendations = [
    score >= 75
      ? "Advance to technical interview — strong alignment with role requirements"
      : "Consider a phone screen to assess depth of experience",
    missingSkills.length > 0
      ? `Probe deeper on ${missingSkills[0]?.name ?? "missing skill areas"} during interview`
      : "Validate portfolio claims with a live design exercise",
    "Request references from recent direct managers to verify collaboration style",
  ];

  return { strengths, concerns, skillBars, recommendations };
}

export function AiAnalysisModal({
  candidate,
  open,
  onOpenChange,
}: AiAnalysisModalProps) {
  const analysis = generateAnalysis(candidate);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
              style={{
                backgroundColor: "var(--brand-50)",
                color: "var(--brand-600)",
              }}
            >
              <Brain size={20} />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold text-[var(--gray-900)]">
                AI Candidate Analysis
              </DialogTitle>
              <DialogDescription className="text-sm text-[var(--gray-500)]">
                ARIA&apos;s comprehensive analysis of {candidate.name}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-2">
          {/* Overall Match Score */}
          <div className="rounded-xl border border-[var(--gray-200)] p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-[var(--gray-700)]">
                Overall Match Score
              </span>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  backgroundColor: "var(--brand-50)",
                  color: "var(--brand-700)",
                }}
              >
                <Sparkles size={12} />
                AI Scored
              </span>
            </div>
            <div className="flex items-end gap-3">
              <span
                className="text-4xl font-semibold"
                style={{ color: "var(--brand-600)" }}
              >
                {candidate.aiScore}%
              </span>
            </div>
            <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-[var(--gray-100)]">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${candidate.aiScore}%`,
                  backgroundColor: "var(--brand-600)",
                }}
              />
            </div>
          </div>

          {/* Key Strengths */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--gray-900)] mb-3">
              Key Strengths
            </h4>
            <div className="space-y-2.5">
              {analysis.strengths.map((strength, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle
                    size={16}
                    className="mt-0.5 shrink-0"
                    style={{ color: "var(--success-600)" }}
                  />
                  <span className="text-sm text-[var(--gray-700)] leading-relaxed">
                    {strength}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Concerns */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--gray-900)] mb-3">
              Key Concerns
            </h4>
            <div className="space-y-2.5">
              {analysis.concerns.map((concern, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <AlertCircle
                    size={16}
                    className="mt-0.5 shrink-0"
                    style={{ color: "var(--warning-600)" }}
                  />
                  <span className="text-sm text-[var(--gray-700)] leading-relaxed">
                    {concern}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Match Analysis */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--gray-900)] mb-3">
              Skill Match Analysis
            </h4>
            <div className="space-y-3">
              {analysis.skillBars.map((skill) => (
                <div key={skill.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-[var(--gray-600)]">
                      {skill.label}
                    </span>
                    <span className="text-sm font-semibold text-[var(--gray-900)]">
                      {skill.percent}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--gray-100)]">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${skill.percent}%`,
                        backgroundColor: "var(--brand-600)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div
            className="rounded-xl p-5"
            style={{
              backgroundColor: "var(--warning-50)",
              border: "1px solid var(--warning-200)",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} style={{ color: "var(--warning-600)" }} />
              <h4 className="text-sm font-semibold text-[var(--gray-900)]">
                AI Recommendations
              </h4>
            </div>
            <ul className="space-y-2">
              {analysis.recommendations.map((rec, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-[var(--gray-700)] leading-relaxed"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--warning-500)]" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="mt-4 gap-2 sm:gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="text-[var(--gray-700)]"
          >
            Close
          </Button>
          <Button
            className="text-white"
            style={{ backgroundColor: "var(--brand-600)" }}
            onClick={() => {
              toast.success(candidate.name + " advanced to next stage");
              onOpenChange(false);
            }}
          >
            <CheckCircle size={16} className="mr-2" />
            Advance to Next Stage
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
