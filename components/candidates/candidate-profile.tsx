"use client";

import type { Candidate } from "@/lib/types";
import { ScoreRing } from "@/components/shared/score-ring";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { OverviewTab } from "./tabs/overview-tab";
import { ResumeTab } from "./tabs/resume-tab";
import { AiContentTab } from "./tabs/ai-content-tab";
import { PortfolioTab } from "./tabs/portfolio-tab";
import { TechnicalTab } from "./tabs/technical-tab";
import { FitTab } from "./tabs/fit-tab";
import { formatRelativeDate } from "@/lib/utils";
import { MapPin, Calendar, Star, Check, AlertTriangle, X } from "lucide-react";
import { toast } from "sonner";

interface CandidateProfileProps {
  candidate: Candidate;
}

function getInitials(name: string): string {
  const parts = name.split(" ");
  return ((parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "")).toUpperCase();
}

const verdictConfig: Record<string, { icon: React.ReactNode; label: string; bg: string; text: string }> = {
  strong: { icon: <Star size={14} />, label: "Strong Fit", bg: "var(--success-50)", text: "var(--success-700)" },
  good: { icon: <Check size={14} />, label: "Good Fit", bg: "var(--brand-50)", text: "var(--brand-700)" },
  review: { icon: <AlertTriangle size={14} />, label: "Needs Review", bg: "var(--warning-50)", text: "var(--warning-700)" },
  not_fit: { icon: <X size={14} />, label: "Not Fit", bg: "var(--error-50)", text: "var(--error-700)" },
};

export function CandidateProfile({ candidate }: CandidateProfileProps) {
  const verdict = verdictConfig[candidate.scoreTier] ?? verdictConfig.review;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start gap-4">
        {/* Avatar */}
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-lg font-semibold"
          style={{
            backgroundColor: "var(--brand-100)",
            color: "var(--brand-700)",
          }}
        >
          {getInitials(candidate.name)}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-semibold" style={{ color: "var(--gray-900)" }}>
            {candidate.name}
          </h2>
          <p className="text-base" style={{ color: "var(--gray-500)" }}>
            {candidate.currentRole} at {candidate.currentCompany}
          </p>
          <div className="flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1 text-sm" style={{ color: "var(--gray-400)" }}>
              <MapPin size={14} />
              {candidate.location}
            </span>
            <span className="flex items-center gap-1 text-sm" style={{ color: "var(--gray-400)" }}>
              <Calendar size={14} />
              Applied {formatRelativeDate(candidate.appliedDate)}
            </span>
          </div>
        </div>

        {/* Score + verdict */}
        <div className="flex items-center gap-3 shrink-0">
          <ScoreRing score={candidate.aiScore} size={80} tierType="candidate" />
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium"
            style={{ backgroundColor: verdict.bg, color: verdict.text }}
          >
            {verdict.icon}
            {verdict.label}
          </span>
        </div>
      </div>

      {/* Quick action bar */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => toast.success("Stage change dialog would open")}>
          Move Stage
        </Button>
        <Button variant="outline" size="sm" onClick={() => toast.success("Assessment sent")}>
          Send Assessment
        </Button>
        <Button variant="outline" size="sm" onClick={() => toast.success("Interview scheduling started")}>
          Schedule Interview
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-[var(--error-600)] border-[var(--error-300)] hover:bg-[var(--error-50)]"
          onClick={() => toast.error("Candidate rejected")}
        >
          Reject
        </Button>
        <Button variant="ghost" size="sm" onClick={() => toast.success("Added to talent pool")}>
          Add to Pool
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="resume">Resume</TabsTrigger>
          <TabsTrigger value="ai-content">AI Content</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="fit">Fit Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab candidate={candidate} />
        </TabsContent>
        <TabsContent value="resume">
          <ResumeTab candidate={candidate} />
        </TabsContent>
        <TabsContent value="ai-content">
          <AiContentTab candidate={candidate} />
        </TabsContent>
        <TabsContent value="portfolio">
          <PortfolioTab candidate={candidate} />
        </TabsContent>
        <TabsContent value="technical">
          <TechnicalTab candidate={candidate} />
        </TabsContent>
        <TabsContent value="fit">
          <FitTab candidate={candidate} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
