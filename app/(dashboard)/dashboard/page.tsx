"use client";

import { Header } from "@/components/layout/header";
import { HealthScore } from "@/components/dashboard/health-score";
import { StatCard } from "@/components/dashboard/stat-card";
import { PipelineFunnel } from "@/components/dashboard/pipeline-funnel";
import { AriaFeed } from "@/components/dashboard/aria-feed";
import { TopCandidates } from "@/components/dashboard/top-candidates";
import { UrgentActions } from "@/components/dashboard/urgent-actions";
import { AiInsightsBanner } from "@/components/shared/ai-insights-banner";
import { dashboardStats } from "@/lib/mock-data";
import { LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  return (
    <div>
      <Header
        title="Dashboard"
        subtitle="Monitor your hiring pipeline and AI screening activity."
      />

      <div className="px-6 py-8 space-y-8 lg:px-10 lg:py-10 lg:space-y-10">
        {/* AI Insights Banner */}
        <AiInsightsBanner
          icon={<LayoutDashboard size={20} />}
          title="Hiring Overview"
          badge="ARIA Powered"
          description="Pipeline velocity increased 15% this week. 3 candidates ready for final interviews. ARIA recommends fast-tracking Sarah Chen for the PM role."
        />

        {/* Row 1: Health Score + Stats — equal height cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          <HealthScore score={dashboardStats.healthScore} />
          <StatCard eyebrow="Active Jobs" value="12" delta={3} deltaSuffix=" this week" subtitle="from last month" />
          <StatCard eyebrow="Pipeline" value="847" delta={47} deltaSuffix=" today" subtitle="from last month" />
          <StatCard eyebrow="Avg. Time to Hire" value="32 days" delta={-8} deltaSuffix="%" positive subtitle="from last month" />
          <StatCard eyebrow="Avg. Cost per Hire" value="$21.4k" delta={-12} deltaSuffix="%" positive subtitle="from last month" />
        </div>

        {/* Row 2: Funnel + Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-5">
          <PipelineFunnel />
          <AriaFeed />
        </div>

        {/* Row 3: Top Candidates + Urgent */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-5">
          <TopCandidates />
          <UrgentActions />
        </div>
      </div>
    </div>
  );
}
