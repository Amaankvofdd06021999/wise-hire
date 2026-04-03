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
    <div className="p-8 space-y-8">
      <Header title="Dashboard" />

      {/* AI Insights Banner */}
      <AiInsightsBanner
        icon={<LayoutDashboard size={20} />}
        title="Hiring Overview"
        badge="ARIA Powered"
        description="Pipeline velocity increased 15% this week. 3 candidates ready for final interviews. ARIA recommends fast-tracking Sarah Chen for the PM role."
      />

      {/* Row 1: Health Score + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6">
        <HealthScore score={dashboardStats.healthScore} />
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard eyebrow="Active Jobs" value="12" delta={3} deltaSuffix=" this week" />
          <StatCard eyebrow="Pipeline" value="847" delta={47} deltaSuffix=" today" />
          <StatCard eyebrow="Avg. Time to Hire" value="32 days" delta={-8} deltaSuffix="%" positive />
          <StatCard eyebrow="Avg. Cost per Hire" value="$21.4k" delta={-12} deltaSuffix="%" positive />
        </div>
      </div>

      {/* Row 2: Funnel + Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        <PipelineFunnel />
        <AriaFeed />
      </div>

      {/* Row 3: Top Candidates + Urgent */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        <TopCandidates />
        <UrgentActions />
      </div>
    </div>
  );
}
