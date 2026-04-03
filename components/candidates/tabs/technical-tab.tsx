"use client";

import type { Candidate } from "@/lib/types";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts";

interface TechnicalTabProps {
  candidate: Candidate;
}

function getHeatmapColor(count: number): string {
  if (count === 0) return "var(--gray-100)";
  if (count <= 2) return "#9be9a8";
  if (count <= 5) return "#40c463";
  if (count <= 8) return "#30a14e";
  return "#216e39";
}

export function TechnicalTab({ candidate }: TechnicalTabProps) {
  const { technicalProfile } = candidate;

  if (!technicalProfile) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm" style={{ color: "var(--gray-500)" }}>
          No technical profile available
        </p>
      </div>
    );
  }

  // Build heatmap grid: 52 columns x 7 rows
  const heatmapCells: number[] = [];
  for (let week = 0; week < 52; week++) {
    for (let day = 0; day < 7; day++) {
      const count = (technicalProfile.contributionData[week] || 0) * ((day + week) % 3 === 0 ? 0.3 : (day + week) % 3 === 1 ? 0.7 : 1);
      heatmapCells.push(Math.round(count));
    }
  }

  return (
    <div className="space-y-8">
      {/* GitHub contribution heatmap */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold" style={{ color: "var(--gray-900)" }}>
          GitHub Contributions
        </h3>
        <div className="overflow-x-auto">
          <div
            className="grid gap-[2px]"
            style={{
              gridTemplateColumns: "repeat(52, 12px)",
              gridTemplateRows: "repeat(7, 12px)",
            }}
          >
            {heatmapCells.map((count, i) => (
              <div
                key={i}
                className="rounded-[2px]"
                style={{
                  backgroundColor: getHeatmapColor(count),
                  width: 12,
                  height: 12,
                }}
                title={`${count} contributions`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Language breakdown */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold" style={{ color: "var(--gray-900)" }}>
          Language Breakdown
        </h3>
        <div className="h-[60px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={[{ name: "Languages", ...Object.fromEntries(technicalProfile.languages.map((l) => [l.name, l.percent])) }]}
              stackOffset="expand"
            >
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" hide />
              <Tooltip formatter={(value) => `${(Number(value) * 100).toFixed(0)}%`} />
              {technicalProfile.languages.map((lang) => (
                <Bar key={lang.name} dataKey={lang.name} stackId="stack" fill={lang.color} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-3">
          {technicalProfile.languages.map((lang) => (
            <div key={lang.name} className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: lang.color }} />
              <span className="text-xs" style={{ color: "var(--gray-700)" }}>
                {lang.name} ({lang.percent}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Top repos */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold" style={{ color: "var(--gray-900)" }}>
          Top Repositories
        </h3>
        <div className="space-y-3">
          {technicalProfile.topRepos.map((repo) => (
            <div key={repo.name} className="rounded-xl border border-[var(--gray-200)] p-4">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-semibold" style={{ color: "var(--gray-900)" }}>
                  {repo.name}
                </h4>
                <div className="flex items-center gap-1 shrink-0">
                  <Star size={14} style={{ color: "var(--warning-500)" }} />
                  <span className="text-xs font-medium" style={{ color: "var(--gray-700)" }}>
                    {repo.stars}
                  </span>
                </div>
              </div>
              <p className="mt-1 text-sm" style={{ color: "var(--gray-600)" }}>
                {repo.description}
              </p>
              <span
                className="mt-2 inline-flex rounded-full px-2 py-0.5 text-xs font-medium"
                style={{ backgroundColor: "var(--gray-100)", color: "var(--gray-700)" }}
              >
                {repo.language}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Code quality */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold" style={{ color: "var(--gray-900)" }}>
          Code Quality
        </h3>
        <div className="space-y-3">
          {(["readme", "commenting", "structure"] as const).map((key) => (
            <div key={key} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm capitalize" style={{ color: "var(--gray-700)" }}>
                  {key === "readme" ? "README" : key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
                <span className="text-sm font-medium" style={{ color: "var(--gray-900)" }}>
                  {technicalProfile.codeQuality[key]}/100
                </span>
              </div>
              <Progress value={technicalProfile.codeQuality[key]} className="h-2" />
            </div>
          ))}
        </div>
      </div>

      {/* Tech stack */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold" style={{ color: "var(--gray-900)" }}>
          Tech Stack
        </h3>
        <div className="space-y-2">
          <div>
            <p className="text-xs font-medium mb-1.5" style={{ color: "var(--gray-500)" }}>
              Primary
            </p>
            <div className="flex flex-wrap gap-1.5">
              {technicalProfile.techStack.primary.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium"
                  style={{ backgroundColor: "var(--brand-50)", color: "var(--brand-700)" }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium mb-1.5" style={{ color: "var(--gray-500)" }}>
              Secondary
            </p>
            <div className="flex flex-wrap gap-1.5">
              {technicalProfile.techStack.secondary.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium"
                  style={{ backgroundColor: "var(--gray-100)", color: "var(--gray-700)" }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
