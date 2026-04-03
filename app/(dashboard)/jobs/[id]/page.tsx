"use client";

import { useState, use } from "react";
import { toast } from "sonner";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScoreBadge } from "@/components/shared/score-badge";
import { StageBadge } from "@/components/shared/stage-badge";
import { mockJobs, mockCandidates, screeningRules } from "@/lib/mock-data";
import { PIPELINE_STAGES } from "@/lib/constants";
import type { ScreeningRule, CandidateStage } from "@/lib/types";
import {
  Edit,
  Pause,
  Play,
  Copy,
  Users,
  Clock,
  Activity,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  UserPlus,
  FileText,
  Mail,
  Star,
  Check,
  AlertTriangle,
  Calendar,
  MessageSquare,
  Filter,
  Zap,
  Eye,
  Send,
  ThumbsUp,
  Plus,
  Trash2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// -- Mock activity data for the Activity tab --
const mockActivityEvents = [
  { id: "1", icon: "UserPlus", description: "Priya Mehta applied to this position", timestamp: "2026-03-10T09:00:00Z", color: "var(--brand-600)" },
  { id: "2", icon: "Zap", description: "AI screening completed — 5 shortlisted, 12 archived", timestamp: "2026-03-10T10:30:00Z", color: "var(--success-600)" },
  { id: "3", icon: "Star", description: "Priya Mehta scored 91/100 — highest in pipeline", timestamp: "2026-03-10T10:35:00Z", color: "var(--warning-500)" },
  { id: "4", icon: "Mail", description: "Shortlist notification sent to Amaan Shahana", timestamp: "2026-03-10T11:00:00Z", color: "var(--brand-500)" },
  { id: "5", icon: "Eye", description: "Amaan Shahana reviewed Priya Mehta's profile", timestamp: "2026-03-11T09:15:00Z", color: "var(--gray-500)" },
  { id: "6", icon: "ThumbsUp", description: "Sarah Mitchell commented: 'Strong portfolio. Let's fast-track.'", timestamp: "2026-03-11T11:45:00Z", color: "var(--success-500)" },
  { id: "7", icon: "Send", description: "Assessment invitation sent to Emma Wilson", timestamp: "2026-03-11T14:00:00Z", color: "var(--brand-600)" },
  { id: "8", icon: "UserPlus", description: "Riya Sharma applied to this position", timestamp: "2026-03-12T09:30:00Z", color: "var(--brand-600)" },
  { id: "9", icon: "AlertTriangle", description: "Riya Sharma flagged for high AI content (72%)", timestamp: "2026-03-12T10:00:00Z", color: "var(--error-500)" },
  { id: "10", icon: "Calendar", description: "Interview scheduled with Priya Mehta — Mar 18 at 2:00 PM", timestamp: "2026-03-13T10:00:00Z", color: "var(--brand-600)" },
  { id: "11", icon: "FileText", description: "Interview guide generated for Priya Mehta", timestamp: "2026-03-13T10:05:00Z", color: "var(--gray-600)" },
  { id: "12", icon: "Check", description: "Neha Gupta completed design assessment", timestamp: "2026-03-14T16:00:00Z", color: "var(--success-600)" },
  { id: "13", icon: "MessageSquare", description: "Amaan rated Priya Mehta 5/5 stars", timestamp: "2026-03-15T14:00:00Z", color: "var(--warning-500)" },
  { id: "14", icon: "Filter", description: "Screening rules updated — new AI content threshold", timestamp: "2026-03-15T16:00:00Z", color: "var(--gray-500)" },
  { id: "15", icon: "Zap", description: "Auto-screening processed 3 new applicants", timestamp: "2026-03-16T08:00:00Z", color: "var(--success-600)" },
];

// -- Mock source data for the Sources tab --
const mockSourceData = [
  { source: "LinkedIn", applications: 45, avgScore: 62, shortlistedPct: 24, cost: 12000 },
  { source: "Naukri", applications: 28, avgScore: 55, shortlistedPct: 18, cost: 8500 },
  { source: "Indeed", applications: 15, avgScore: 48, shortlistedPct: 13, cost: 6000 },
  { source: "Referral", applications: 8, avgScore: 74, shortlistedPct: 50, cost: 2000 },
  { source: "Career Page", applications: 4, avgScore: 58, shortlistedPct: 25, cost: 0 },
];

const barColors = [
  "var(--brand-600)",
  "var(--brand-500)",
  "var(--brand-400)",
  "var(--success-500)",
  "var(--gray-400)",
];

const iconComponents: Record<string, React.ElementType> = {
  UserPlus,
  Zap,
  Star,
  Mail,
  Eye,
  ThumbsUp,
  Send,
  AlertTriangle,
  Calendar,
  FileText,
  Check,
  MessageSquare,
  Filter,
};

export default function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const job = mockJobs.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-xl font-semibold text-[var(--gray-900)] mb-2">Job not found</h2>
        <p className="text-sm text-[var(--gray-500)] mb-4">The job you are looking for doesn&apos;t exist or has been removed.</p>
        <a href="/jobs" className="text-sm font-medium text-[var(--brand-600)] hover:underline">&larr; Back to Jobs</a>
      </div>
    );
  }

  const candidates = mockCandidates.filter((c) => c.jobId === job.id);

  const [rules, setRules] = useState<ScreeningRule[]>(screeningRules);
  const [editMode, setEditMode] = useState(false);
  const [expandedStages, setExpandedStages] = useState<Set<string>>(
    new Set(["applied", "ai_screened", "shortlisted", "assessment", "interview_scheduled"])
  );

  // Edit dialog state
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(job.title);
  const [editDepartment, setEditDepartment] = useState(job.department);
  const [editLocation, setEditLocation] = useState(job.location);
  const [editSummary, setEditSummary] = useState(job.description?.summary ?? "");

  // Pause / reactivate state
  const [jobStatus, setJobStatus] = useState(job.status);

  const statusConfig: Record<string, { label: string; bg: string; text: string }> = {
    active: { label: "Active", bg: "var(--success-50)", text: "var(--success-700)" },
    draft: { label: "Draft", bg: "var(--gray-100)", text: "var(--gray-700)" },
    closed: { label: "Closed", bg: "var(--gray-200)", text: "var(--gray-800)" },
  };

  const status = statusConfig[jobStatus] ?? statusConfig.active;
  const tthPercent = job.tthBenchmark > 0
    ? Math.min(100, Math.round((job.tthDays / job.tthBenchmark) * 100))
    : 0;

  // Group candidates by stage
  const candidatesByStage: Record<string, typeof candidates> = {};
  for (const c of candidates) {
    if (!candidatesByStage[c.stage]) candidatesByStage[c.stage] = [];
    candidatesByStage[c.stage].push(c);
  }

  // Pipeline mini funnel data
  const pipelineData = PIPELINE_STAGES.filter((s) => s.key !== "rejected").map((stage) => ({
    name: stage.name,
    count: candidatesByStage[stage.key]?.length ?? 0,
  }));

  function toggleStage(stageKey: string) {
    setExpandedStages((prev) => {
      const next = new Set(prev);
      if (next.has(stageKey)) next.delete(stageKey);
      else next.add(stageKey);
      return next;
    });
  }

  function toggleRule(ruleId: string) {
    setRules((prev) =>
      prev.map((r) => (r.id === ruleId ? { ...r, enabled: !r.enabled } : r))
    );
  }

  function handleSaveRules() {
    setEditMode(false);
    toast.success("Screening rules saved");
  }

  function deleteRule(ruleId: string) {
    setRules((prev) => prev.filter((r) => r.id !== ruleId));
    toast.success("Rule deleted");
  }

  function addRule() {
    const newRule: ScreeningRule = {
      id: `rule-${Date.now()}`,
      type: "hard_filter",
      condition: "New condition",
      action: "New action",
      enabled: true,
    };
    setRules((prev) => [...prev, newRule]);
    toast.success("Rule added");
  }

  const ruleTypeBadgeConfig: Record<string, { bg: string; text: string }> = {
    hard_filter: { bg: "var(--error-50)", text: "var(--error-700)" },
    auto_shortlist: { bg: "var(--success-50)", text: "var(--success-700)" },
    auto_assessment: { bg: "var(--brand-50)", text: "var(--brand-700)" },
    ai_content_flag: { bg: "var(--warning-50)", text: "var(--warning-700)" },
    sla_alert: { bg: "var(--gray-100)", text: "var(--gray-700)" },
  };

  return (
    <div className="p-8">
      <Header
        title={job.title}
        breadcrumbs={[
          { label: "Jobs", href: "/jobs" },
          { label: job.title },
        ]}
      />

      <div className="mt-6 space-y-6">
        {/* Title bar with status + actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-[var(--gray-900)]">
              {job.title}
            </h2>
            <span
              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
              style={{ backgroundColor: status.bg, color: status.text }}
            >
              {status.label}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1" onClick={() => setEditDialogOpen(true)}>
              <Edit size={14} />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => {
                if (jobStatus === "active") {
                  setJobStatus("draft");
                  toast.success("Job paused");
                } else {
                  setJobStatus("active");
                  toast.success("Job reactivated");
                }
              }}
            >
              {jobStatus === "active" ? <Pause size={14} /> : <Play size={14} />}
              {jobStatus === "active" ? "Pause" : "Reactivate"}
            </Button>
            <Button variant="outline" size="sm" className="gap-1" onClick={() => toast.success("Job cloned successfully")}>
              <Copy size={14} />
              Clone
            </Button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            className="rounded-xl p-5 bg-white"
            style={{ boxShadow: "var(--shadow-xs)" }}
          >
            <div className="flex items-center gap-2 text-sm text-[var(--gray-500)] mb-1">
              <Users size={14} />
              Applicants
            </div>
            <p className="text-xl font-semibold text-[var(--gray-900)]">
              {job.applicantsCount}
            </p>
          </div>
          <div
            className="rounded-xl p-5 bg-white"
            style={{ boxShadow: "var(--shadow-xs)" }}
          >
            <div className="flex items-center gap-2 text-sm text-[var(--gray-500)] mb-1">
              <Clock size={14} />
              Days Open
            </div>
            <p className="text-xl font-semibold text-[var(--gray-900)]">
              {job.daysOpen}
            </p>
          </div>
          <div
            className="rounded-xl p-5 bg-white"
            style={{ boxShadow: "var(--shadow-xs)" }}
          >
            <div className="flex items-center gap-2 text-sm text-[var(--gray-500)] mb-1">
              <Activity size={14} />
              TTH Progress
            </div>
            <p className="text-xl font-semibold text-[var(--gray-900)] mb-1">
              {job.tthDays}d
            </p>
            <Progress value={tthPercent} className="h-2 bg-[var(--gray-100)]" />
          </div>
          <div
            className="rounded-xl p-5 bg-white"
            style={{ boxShadow: "var(--shadow-xs)" }}
          >
            <div className="flex items-center gap-2 text-sm text-[var(--gray-500)] mb-1">
              <ShieldCheck size={14} />
              Screening
            </div>
            <Badge
              variant="secondary"
              className="mt-1"
              style={{
                backgroundColor: "var(--success-50)",
                color: "var(--success-700)",
              }}
            >
              Active
            </Badge>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pipeline">
          <TabsList>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="screening">Screening Rules</TabsTrigger>
            <TabsTrigger value="sources">Sources</TabsTrigger>
          </TabsList>

          {/* Pipeline Tab */}
          <TabsContent value="pipeline" className="space-y-6 mt-4">
            {/* Mini funnel chart */}
            <div
              className="rounded-xl p-5 bg-white"
              style={{ boxShadow: "var(--shadow-xs)" }}
            >
              <h3 className="text-sm font-semibold text-[var(--gray-900)] mb-3">
                Pipeline Funnel
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={pipelineData} layout="vertical" margin={{ left: 80 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tick={{ fontSize: 12 }}
                    width={80}
                  />
                  <RechartsTooltip />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {pipelineData.map((_, index) => (
                      <Cell
                        key={index}
                        fill={
                          index < 3
                            ? "var(--brand-600)"
                            : index < 5
                              ? "var(--brand-400)"
                              : "var(--brand-300)"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Candidates grouped by stage */}
            <div className="space-y-3">
              {PIPELINE_STAGES.map((stage) => {
                const stageCandidates = candidatesByStage[stage.key] ?? [];
                if (stageCandidates.length === 0) return null;
                const isExpanded = expandedStages.has(stage.key);

                return (
                  <div
                    key={stage.key}
                    className="rounded-xl bg-white"
                    style={{ boxShadow: "var(--shadow-xs)" }}
                  >
                    <button
                      type="button"
                      className="w-full flex items-center justify-between p-4 text-left"
                      onClick={() => toggleStage(stage.key)}
                    >
                      <div className="flex items-center gap-3">
                        {isExpanded ? (
                          <ChevronDown size={16} className="text-[var(--gray-400)]" />
                        ) : (
                          <ChevronRight size={16} className="text-[var(--gray-400)]" />
                        )}
                        <span className="text-sm font-semibold text-[var(--gray-900)]">
                          {stage.name}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {stageCandidates.length}
                        </Badge>
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="border-t border-[var(--gray-100)] divide-y divide-[var(--gray-100)]">
                        {stageCandidates.map((candidate) => (
                          <div
                            key={candidate.id}
                            className="flex items-center justify-between px-4 py-3 hover:bg-[var(--gray-50)] transition-colors"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                                style={{
                                  backgroundColor: "var(--brand-100)",
                                  color: "var(--brand-700)",
                                }}
                              >
                                {candidate.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-[var(--gray-900)] truncate">
                                  {candidate.name}
                                </p>
                                <p className="text-xs text-[var(--gray-500)] truncate">
                                  {candidate.currentRole} at{" "}
                                  {candidate.currentCompany}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <ScoreBadge
                                score={candidate.aiScore}
                                size="sm"
                                showLabel={false}
                              />
                              <StageBadge stage={candidate.stage} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="mt-4">
            <div
              className="rounded-xl p-6 bg-white"
              style={{ boxShadow: "var(--shadow-xs)" }}
            >
              <h3 className="text-sm font-semibold text-[var(--gray-900)] mb-6">
                Recent Activity
              </h3>
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-[var(--gray-200)]" />

                <div className="space-y-6">
                  {mockActivityEvents.slice().reverse().map((event) => {
                    const IconComp = iconComponents[event.icon] ?? Activity;
                    const eventDate = new Date(event.timestamp);
                    const dateStr = eventDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                    const timeStr = eventDate.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    });

                    return (
                      <div key={event.id} className="flex items-start gap-4 relative">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10"
                          style={{
                            backgroundColor: event.color,
                          }}
                        >
                          <IconComp size={12} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0 pb-1">
                          <p className="text-sm text-[var(--gray-700)]">
                            {event.description}
                          </p>
                          <p className="text-xs text-[var(--gray-400)] mt-0.5">
                            {dateStr} at {timeStr}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Screening Rules Tab */}
          <TabsContent value="screening" className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[var(--gray-900)]">
                Screening Rules
              </h3>
              {editMode ? (
                <Button size="sm" onClick={handleSaveRules}>
                  Save
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditMode(true)}
                >
                  Edit Rules
                </Button>
              )}
            </div>

            <div className="space-y-3">
              {rules.map((rule) => {
                const typeConfig = ruleTypeBadgeConfig[rule.type] ?? {
                  bg: "var(--gray-100)",
                  text: "var(--gray-700)",
                };
                const typeLabel = rule.type
                  .split("_")
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(" ");

                return (
                  <div
                    key={rule.id}
                    className="rounded-xl p-5 bg-white flex items-start justify-between gap-4"
                    style={{ boxShadow: "var(--shadow-xs)" }}
                  >
                    <div className="space-y-2 min-w-0">
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                        style={{
                          backgroundColor: typeConfig.bg,
                          color: typeConfig.text,
                        }}
                      >
                        {typeLabel}
                      </span>
                      <p className="text-sm text-[var(--gray-700)]">
                        <span className="font-medium">If:</span>{" "}
                        {rule.condition}
                      </p>
                      <p className="text-sm text-[var(--gray-700)]">
                        <span className="font-medium">Then:</span>{" "}
                        {rule.action}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Switch
                        checked={rule.enabled}
                        onCheckedChange={() => editMode && toggleRule(rule.id)}
                        disabled={!editMode}
                      />
                      {editMode && (
                        <button
                          type="button"
                          onClick={() => deleteRule(rule.id)}
                          className="p-1 rounded-md text-[var(--gray-400)] hover:text-[var(--error-600)] hover:bg-[var(--error-50)] transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Add Rule button */}
              {editMode && (
                <button
                  type="button"
                  onClick={addRule}
                  className="w-full rounded-xl border-2 border-dashed border-[var(--gray-300)] p-5 flex items-center justify-center gap-2 text-sm font-medium text-[var(--gray-500)] hover:border-[var(--brand-400)] hover:text-[var(--brand-600)] transition-colors"
                >
                  <Plus size={16} />
                  Add Rule
                </button>
              )}
            </div>
          </TabsContent>

          {/* Sources Tab */}
          <TabsContent value="sources" className="space-y-6 mt-4">
            {/* Bar chart */}
            <div
              className="rounded-xl p-5 bg-white"
              style={{ boxShadow: "var(--shadow-xs)" }}
            >
              <h3 className="text-sm font-semibold text-[var(--gray-900)] mb-3">
                Applications by Source
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={mockSourceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="source" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <RechartsTooltip />
                  <Bar dataKey="applications" radius={[4, 4, 0, 0]}>
                    {mockSourceData.map((_, index) => (
                      <Cell key={index} fill={barColors[index % barColors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Source table */}
            <div
              className="rounded-xl bg-white overflow-hidden"
              style={{ boxShadow: "var(--shadow-xs)" }}
            >
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--gray-200)] bg-[var(--gray-50)]">
                    <th className="text-left px-4 py-3 font-medium text-[var(--gray-700)]">
                      Source
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-[var(--gray-700)]">
                      Applications
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-[var(--gray-700)]">
                      Avg Score
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-[var(--gray-700)]">
                      Shortlisted %
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-[var(--gray-700)]">
                      Cost
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockSourceData.map((row) => (
                    <tr
                      key={row.source}
                      className="border-b border-[var(--gray-100)] last:border-b-0"
                    >
                      <td className="px-4 py-3 text-[var(--gray-900)] font-medium">
                        {row.source}
                      </td>
                      <td className="px-4 py-3 text-right text-[var(--gray-700)]">
                        {row.applications}
                      </td>
                      <td className="px-4 py-3 text-right text-[var(--gray-700)]">
                        {row.avgScore}
                      </td>
                      <td className="px-4 py-3 text-right text-[var(--gray-700)]">
                        {row.shortlistedPct}%
                      </td>
                      <td className="px-4 py-3 text-right text-[var(--gray-700)]">
                        {row.cost > 0
                          ? `$${row.cost.toLocaleString()}`
                          : "Free"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Job Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Job &mdash; {job.title}</DialogTitle>
            <DialogDescription>Update the job details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[var(--gray-700)]">Title</Label>
              <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[var(--gray-700)]">Department</Label>
              <Input value={editDepartment} onChange={(e) => setEditDepartment(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[var(--gray-700)]">Location</Label>
              <Input value={editLocation} onChange={(e) => setEditLocation(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[var(--gray-700)]">Description Summary</Label>
              <Textarea
                rows={4}
                value={editSummary}
                onChange={(e) => setEditSummary(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[var(--brand-600)] hover:bg-[var(--brand-600)]/90 text-white"
              onClick={() => {
                toast.success("Job updated");
                setEditDialogOpen(false);
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
