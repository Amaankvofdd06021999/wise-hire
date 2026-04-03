"use client";

import type { Candidate } from "@/lib/types";
import { ScoreBadge } from "@/components/shared/score-badge";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

interface PortfolioTabProps {
  candidate: Candidate;
}

export function PortfolioTab({ candidate }: PortfolioTabProps) {
  const { portfolioAnalysis } = candidate;

  if (!portfolioAnalysis) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm" style={{ color: "var(--gray-500)" }}>
          No portfolio data available
        </p>
      </div>
    );
  }

  const radarData = [
    { dimension: "Visual Design", value: portfolioAnalysis.dimensions.visualDesign },
    { dimension: "UX Thinking", value: portfolioAnalysis.dimensions.uxThinking },
    { dimension: "Case Study Clarity", value: portfolioAnalysis.dimensions.caseStudyClarity },
    { dimension: "Business Impact", value: portfolioAnalysis.dimensions.businessImpact },
    { dimension: "Process Docs", value: portfolioAnalysis.dimensions.processDocumentation },
  ];

  const tierStyles: Record<string, { bg: string; text: string }> = {
    exceptional: { bg: "var(--success-50)", text: "var(--success-700)" },
    strong: { bg: "var(--success-50)", text: "var(--success-700)" },
    moderate: { bg: "var(--warning-50)", text: "var(--warning-700)" },
    weak: { bg: "var(--error-50)", text: "var(--error-700)" },
  };

  const tier = tierStyles[portfolioAnalysis.tier] ?? tierStyles.moderate;

  return (
    <div className="space-y-6">
      {/* Mini stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-[var(--gray-200)] p-3 text-center">
          <p className="text-lg font-semibold" style={{ color: "var(--gray-900)" }}>
            {portfolioAnalysis.websiteMetrics.loadSpeed}/100
          </p>
          <p className="text-xs" style={{ color: "var(--gray-500)" }}>Load Speed</p>
        </div>
        <div className="rounded-xl border border-[var(--gray-200)] p-3 text-center">
          <p className="text-lg font-semibold" style={{ color: "var(--gray-900)" }}>
            {portfolioAnalysis.websiteMetrics.mobileResponsive ? "Yes" : "No"}
          </p>
          <p className="text-xs" style={{ color: "var(--gray-500)" }}>Mobile Responsive</p>
        </div>
        <div className="rounded-xl border border-[var(--gray-200)] p-3 text-center">
          <p className="text-lg font-semibold" style={{ color: "var(--gray-900)" }}>
            {portfolioAnalysis.websiteMetrics.brokenLinks}
          </p>
          <p className="text-xs" style={{ color: "var(--gray-500)" }}>Broken Links</p>
        </div>
        <div className="rounded-xl border border-[var(--gray-200)] p-3 text-center">
          <p className="text-lg font-semibold" style={{ color: "var(--gray-900)" }}>
            {portfolioAnalysis.websiteMetrics.accessibilityScore}/100
          </p>
          <p className="text-xs" style={{ color: "var(--gray-500)" }}>Accessibility Score</p>
        </div>
      </div>

      {/* Radar chart */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold" style={{ color: "var(--gray-900)" }}>
          Portfolio Dimensions
        </h3>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
              <PolarGrid />
              <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fontSize: 10 }} />
              <Radar
                name="Score"
                dataKey="value"
                stroke="var(--brand-600)"
                fill="var(--brand-600)"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Aggregate score */}
      <div className="flex items-center gap-4">
        <span className="text-3xl font-bold" style={{ color: "var(--gray-900)" }}>
          {portfolioAnalysis.overallScore}
        </span>
        <span
          className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize"
          style={{ backgroundColor: tier.bg, color: tier.text }}
        >
          {portfolioAnalysis.tier}
        </span>
      </div>

      {/* Project cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold" style={{ color: "var(--gray-900)" }}>
          Projects
        </h3>
        <div className="space-y-3">
          {portfolioAnalysis.projects.map((project, i) => (
            <div key={i} className="rounded-xl border border-[var(--gray-200)] p-4 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-semibold" style={{ color: "var(--gray-900)" }}>
                  {project.title}
                </h4>
                <ScoreBadge score={project.score} size="sm" />
              </div>
              <p className="text-sm" style={{ color: "var(--success-600)" }}>
                Strength: {project.strength}
              </p>
              <p className="text-sm" style={{ color: "var(--warning-600)" }}>
                Gap: {project.gap}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tools detected */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold" style={{ color: "var(--gray-900)" }}>
          Tools Detected
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {portfolioAnalysis.toolsDetected.map((tool) => (
            <span
              key={tool}
              className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium"
              style={{ backgroundColor: "var(--gray-100)", color: "var(--gray-700)" }}
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Comparative rank */}
      <p className="text-sm" style={{ color: "var(--gray-600)" }}>
        Ranked{" "}
        <span className="font-semibold" style={{ color: "var(--gray-900)" }}>
          {portfolioAnalysis.comparativeRank.rank}
        </span>{" "}
        of{" "}
        <span className="font-semibold" style={{ color: "var(--gray-900)" }}>
          {portfolioAnalysis.comparativeRank.total}
        </span>{" "}
        candidates
      </p>
    </div>
  );
}
