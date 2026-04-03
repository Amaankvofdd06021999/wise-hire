"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { CandidateCard } from "@/components/candidates/candidate-card";
import { CandidateTable } from "@/components/candidates/candidate-table";
import { AiAnalysisModal } from "@/components/candidates/ai-analysis-modal";
import { BulkScreeningModal } from "@/components/candidates/bulk-screening-modal";
import { AiInsightsBanner } from "@/components/shared/ai-insights-banner";
import {
  FilterSidebar,
  defaultFilters,
  type FilterState,
} from "@/components/shared/filter-sidebar";
import { mockCandidates } from "@/lib/mock-data";
import type { Candidate } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List, Search, X, Sparkles, GitCompare, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import type { FilterState as FS } from "@/components/shared/filter-sidebar";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PIPELINE_STAGES } from "@/lib/constants";
import type { CandidateStage } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";

type ViewMode = "grid" | "table";

export default function CandidatesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modal state
  const [analysisCandidate, setAnalysisCandidate] = useState<Candidate | null>(null);
  const [bulkScreeningOpen, setBulkScreeningOpen] = useState(false);

  // Comparison modal
  const [compareOpen, setCompareOpen] = useState(false);

  // Email modal
  const [emailCandidate, setEmailCandidate] = useState<typeof mockCandidates[0] | null>(null);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  // Bulk action dialogs
  const [assessmentDialogOpen, setAssessmentDialogOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState("");
  const [moveStageDialogOpen, setMoveStageDialogOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState("");
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filtered = useMemo(() => {
    return mockCandidates.filter((c) => {
      // Score range
      if (c.aiScore < filters.scoreRange[0] || c.aiScore > filters.scoreRange[1]) return false;

      // Stages
      if (filters.stages.length > 0 && !filters.stages.includes(c.stage)) return false;

      // Role filter
      if (filters.role && filters.role !== "all") {
        const roleStr = `${c.currentRole}`.toLowerCase();
        if (filters.role === "designer" && !roleStr.includes("design")) return false;
        if (filters.role === "engineer" && !roleStr.includes("engineer") && !roleStr.includes("developer")) return false;
        if (filters.role === "data_scientist" && !roleStr.includes("data")) return false;
        if (filters.role === "product_manager" && !roleStr.includes("product manager")) return false;
        if (filters.role === "researcher" && !roleStr.includes("research")) return false;
      }

      // Experience
      if (filters.experienceLevel !== "any") {
        const y = c.yearsExperience;
        if (filters.experienceLevel === "0-2" && (y < 0 || y > 2)) return false;
        if (filters.experienceLevel === "3-5" && (y < 3 || y > 5)) return false;
        if (filters.experienceLevel === "5-10" && (y < 5 || y > 10)) return false;
        if (filters.experienceLevel === "10+" && y < 10) return false;
      }

      // AI content flag
      if (filters.aiContentFlag && !c.hasAiContentFlag) return false;

      // Portfolio available
      if (filters.portfolioAvailable && !c.portfolioUrl) return false;

      // Search
      if (debouncedQuery) {
        const q = debouncedQuery.toLowerCase();
        const searchable = [
          c.name,
          c.currentRole,
          c.currentCompany,
          ...c.skills.map((s) => s.name),
        ]
          .join(" ")
          .toLowerCase();
        if (!searchable.includes(q)) return false;
      }

      return true;
    });
  }, [filters, debouncedQuery]);

  // Generate AI email draft based on candidate stage
  const getEmailDraft = useCallback((candidate: Candidate) => {
    const stage = candidate.stage;
    if (stage === "applied") {
      return {
        subject: `Application Received - ${candidate.currentRole} Position`,
        body: `Dear ${candidate.name},\n\nThank you for your interest in the ${candidate.currentRole} position and for taking the time to submit your application. We have received your materials and our team is currently reviewing them.\n\nWe appreciate your patience as we carefully evaluate each candidate. You can expect to hear back from us within the next 5-7 business days regarding the status of your application.\n\nIf you have any questions in the meantime, please don't hesitate to reach out.\n\nBest regards,\nThe Hiring Team`,
      };
    } else if (stage === "ai_screened" || stage === "shortlisted") {
      return {
        subject: `Interview Invitation - ${candidate.currentRole} Position`,
        body: `Dear ${candidate.name},\n\nWe were impressed by your profile and would love to invite you to the next stage of our hiring process. Based on our review, your experience at ${candidate.currentCompany} and your skills align well with what we're looking for.\n\nWe'd like to schedule an interview at your earliest convenience. Please let us know your availability for the coming week, and we'll send over a calendar invite.\n\nThe interview will be approximately 45-60 minutes and will cover your experience, technical skills, and team fit.\n\nLooking forward to speaking with you!\n\nBest regards,\nThe Hiring Team`,
      };
    } else if (stage === "assessment") {
      return {
        subject: `Assessment Reminder - ${candidate.currentRole} Position`,
        body: `Dear ${candidate.name},\n\nThis is a friendly reminder about the assessment that was sent to you as part of the ${candidate.currentRole} hiring process. We want to make sure you have enough time to complete it before the deadline.\n\nIf you've already submitted your assessment, please disregard this message. If you're experiencing any technical difficulties or need additional time, please don't hesitate to let us know.\n\nWe're excited to see your work!\n\nBest regards,\nThe Hiring Team`,
      };
    }
    return {
      subject: `Follow-up - ${candidate.currentRole} Position`,
      body: `Dear ${candidate.name},\n\nI wanted to follow up regarding your application for the ${candidate.currentRole} position. We value your continued interest and wanted to provide you with an update on the process.\n\nOur team is actively reviewing candidates and we expect to have more information for you shortly. Thank you for your patience throughout this process.\n\nPlease feel free to reach out if you have any questions.\n\nBest regards,\nThe Hiring Team`,
    };
  }, []);

  const handleSendEmailOpen = useCallback((candidateId: string) => {
    const candidate = mockCandidates.find((c) => c.id === candidateId);
    if (!candidate) return;
    const draft = getEmailDraft(candidate);
    setEmailSubject(draft.subject);
    setEmailBody(draft.body);
    setEmailCandidate(candidate);
  }, [getEmailDraft]);

  const handleBulkAction = useCallback((action: string) => {
    if (action === "Send Assessment") {
      setSelectedAssessment("");
      setAssessmentDialogOpen(true);
      return;
    }
    if (action === "Move Stage") {
      setSelectedStage("");
      setMoveStageDialogOpen(true);
      return;
    }
    if (action === "Reject") {
      setRejectDialogOpen(true);
      return;
    }
    // Export - keep as toast
    toast.success(`Exporting ${selectedIds.length} candidate profiles...`);
  }, [selectedIds.length]);

  const handleOpenAiAnalysis = useCallback((candidate: Candidate) => {
    setAnalysisCandidate(candidate);
  }, []);

  return (
    <div className="p-8">
      <Header title="Candidates" breadcrumbs={[{ label: "Candidates" }]} />

      {/* AI Insights Banner */}
      <div className="mt-8">
        <AiInsightsBanner
          icon={<Sparkles size={20} />}
          title="AI Candidate Insights"
          description="ARIA has identified 3 high-potential candidates matching your Senior PM role with 90%+ compatibility"
          badge="ARIA Powered"
          stats={[
            { label: "Avg Match Score", value: "86%" },
            { label: "Ready to Interview", value: "8" },
            { label: "Response Rate", value: "92%" },
          ]}
        />
      </div>

      {/* Toolbar */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        {/* View toggle */}
        <div className="flex items-center rounded-md border border-[var(--gray-200)]">
          <button
            className="p-2 rounded-l-md transition-colors"
            style={{
              backgroundColor: viewMode === "grid" ? "var(--brand-50)" : "transparent",
              color: viewMode === "grid" ? "var(--brand-600)" : "var(--gray-500)",
            }}
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
          >
            <LayoutGrid size={18} />
          </button>
          <button
            className="p-2 rounded-r-md transition-colors"
            style={{
              backgroundColor: viewMode === "table" ? "var(--brand-50)" : "transparent",
              color: viewMode === "table" ? "var(--brand-600)" : "var(--gray-500)",
            }}
            onClick={() => setViewMode("table")}
            aria-label="Table view"
          >
            <List size={18} />
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--gray-400)" }}
          />
          <Input
            placeholder="Search candidates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9"
          />
        </div>

        {/* Bulk AI Screen button */}
        <Button
          className="ml-auto text-white"
          style={{ backgroundColor: "var(--brand-600)" }}
          onClick={() => setBulkScreeningOpen(true)}
        >
          <Sparkles size={16} className="mr-2" />
          Bulk AI Screen
        </Button>

        {/* Mobile filter toggle (sheet only) */}
        <FilterSidebar filters={filters} onChange={setFilters} mobile />
      </div>

      {/* Content layout */}
      <div className="mt-8 flex gap-6">
        {/* Desktop filter sidebar */}
        <FilterSidebar filters={filters} onChange={setFilters} desktop />

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-sm font-medium" style={{ color: "var(--gray-500)" }}>
                No candidates match your filters
              </p>
              <Button
                variant="link"
                size="sm"
                className="mt-2"
                onClick={() => {
                  setFilters(defaultFilters);
                  setSearchQuery("");
                }}
              >
                Clear all filters
              </Button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((c) => (
                <CandidateCard
                  key={c.id}
                  candidate={c}
                  onAiAnalysis={handleOpenAiAnalysis}
                  onSendEmail={handleSendEmailOpen}
                />
              ))}
            </div>
          ) : (
            <CandidateTable
              candidates={filtered}
              selectedIds={selectedIds}
              onSelectChange={setSelectedIds}
            />
          )}
        </div>
      </div>

      {/* Bulk action bar */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 rounded-lg border border-[var(--gray-200)] bg-white px-4 py-3 shadow-lg">
          <span className="text-sm font-medium" style={{ color: "var(--gray-900)" }}>
            {selectedIds.length} selected
          </span>
          <Button size="sm" variant="outline" onClick={() => handleBulkAction("Send Assessment")}>
            Send Assessment
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleBulkAction("Move Stage")}>
            Move Stage
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleBulkAction("Reject")}>
            Reject
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleBulkAction("Export")}>
            Export
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={selectedIds.length < 2 || selectedIds.length > 4}
            onClick={() => setCompareOpen(true)}
          >
            <GitCompare size={14} className="mr-1.5" />
            Compare Selected
          </Button>
          <button
            className="ml-1 p-1 rounded hover:bg-[var(--gray-100)]"
            onClick={() => setSelectedIds([])}
            aria-label="Clear selection"
          >
            <X size={16} style={{ color: "var(--gray-500)" }} />
          </button>
        </div>
      )}

      {/* AI Analysis Modal */}
      {analysisCandidate && (
        <AiAnalysisModal
          candidate={analysisCandidate}
          open={!!analysisCandidate}
          onOpenChange={(open) => {
            if (!open) setAnalysisCandidate(null);
          }}
        />
      )}

      {/* Bulk Screening Modal */}
      <BulkScreeningModal
        candidateCount={filtered.length}
        open={bulkScreeningOpen}
        onOpenChange={setBulkScreeningOpen}
      />

      {/* Candidate Comparison Dialog */}
      <Dialog open={compareOpen} onOpenChange={setCompareOpen}>
        <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Candidate Comparison</DialogTitle>
            <DialogDescription>
              Side-by-side comparison of {selectedIds.length} selected candidates
            </DialogDescription>
          </DialogHeader>
          {(() => {
            const compareCandidates = mockCandidates.filter((c) =>
              selectedIds.includes(c.id)
            );
            const highestScore = Math.max(
              ...compareCandidates.map((c) => c.aiScore)
            );
            const highestSkillMatch = Math.max(
              ...compareCandidates.map((c) => c.skillMatchPercent)
            );
            const highestExperience = Math.max(
              ...compareCandidates.map((c) => c.yearsExperience)
            );

            const getScoreColor = (score: number) => {
              if (score >= 75) return { bg: "var(--success-50)", text: "var(--success-700)" };
              if (score >= 50) return { bg: "var(--brand-50)", text: "var(--brand-700)" };
              if (score >= 30) return { bg: "var(--warning-50)", text: "var(--warning-700)" };
              return { bg: "var(--error-50)", text: "var(--error-700)" };
            };

            const getStageName = (key: string) => {
              const stage = PIPELINE_STAGES.find((s) => s.key === key);
              return stage?.name ?? key;
            };

            return (
              <div className="mt-2">
                {/* Header row: avatars + names */}
                <div className="grid gap-4" style={{ gridTemplateColumns: `140px repeat(${compareCandidates.length}, 1fr)` }}>
                  <div className="text-sm font-semibold text-[var(--gray-500)]">Candidate</div>
                  {compareCandidates.map((c) => {
                    const initials = c.name.split(" ").map((p) => p[0]).join("").toUpperCase();
                    return (
                      <div key={c.id} className="flex flex-col items-center text-center gap-2">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold"
                          style={{ backgroundColor: "var(--brand-100)", color: "var(--brand-700)" }}
                        >
                          {initials}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[var(--gray-900)]">{c.name}</p>
                          <p className="text-xs text-[var(--gray-500)]">{c.currentRole}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 border-t border-[var(--gray-200)]" />

                {/* Score row */}
                <div className="grid gap-4 py-3 items-center" style={{ gridTemplateColumns: `140px repeat(${compareCandidates.length}, 1fr)` }}>
                  <div className="text-sm font-medium text-[var(--gray-600)]">AI Score</div>
                  {compareCandidates.map((c) => {
                    const colors = getScoreColor(c.aiScore);
                    const isBest = c.aiScore === highestScore;
                    return (
                      <div key={c.id} className="flex justify-center">
                        <span
                          className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold"
                          style={{
                            backgroundColor: isBest ? "var(--success-50)" : colors.bg,
                            color: isBest ? "var(--success-700)" : colors.text,
                            border: isBest ? "2px solid var(--success-400)" : "1px solid transparent",
                          }}
                        >
                          {c.aiScore}%
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-[var(--gray-100)]" />

                {/* Skills row */}
                <div className="grid gap-4 py-3" style={{ gridTemplateColumns: `140px repeat(${compareCandidates.length}, 1fr)` }}>
                  <div className="text-sm font-medium text-[var(--gray-600)]">Skills Match</div>
                  {compareCandidates.map((c) => {
                    const isBest = c.skillMatchPercent === highestSkillMatch;
                    return (
                      <div key={c.id} className="flex flex-col items-center gap-1.5">
                        <span
                          className="text-sm font-semibold"
                          style={{ color: isBest ? "var(--success-700)" : "var(--gray-700)" }}
                        >
                          {c.skillMatchPercent}% match
                        </span>
                        <div className="flex flex-wrap justify-center gap-1">
                          {c.skills.map((s) => (
                            <span
                              key={s.name}
                              className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium"
                              style={{
                                backgroundColor:
                                  s.matched === "full"
                                    ? "var(--success-50)"
                                    : s.matched === "partial"
                                    ? "var(--warning-50)"
                                    : "var(--error-50)",
                                color:
                                  s.matched === "full"
                                    ? "var(--success-700)"
                                    : s.matched === "partial"
                                    ? "var(--warning-700)"
                                    : "var(--error-700)",
                              }}
                            >
                              {s.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-[var(--gray-100)]" />

                {/* Experience row */}
                <div className="grid gap-4 py-3 items-center" style={{ gridTemplateColumns: `140px repeat(${compareCandidates.length}, 1fr)` }}>
                  <div className="text-sm font-medium text-[var(--gray-600)]">Experience</div>
                  {compareCandidates.map((c) => {
                    const isBest = c.yearsExperience === highestExperience;
                    return (
                      <div key={c.id} className="text-center">
                        <span
                          className="text-sm font-semibold"
                          style={{ color: isBest ? "var(--success-700)" : "var(--gray-700)" }}
                        >
                          {c.yearsExperience} years
                        </span>
                        <p className="text-xs text-[var(--gray-500)] mt-1 line-clamp-3">
                          {c.aiSummary}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-[var(--gray-100)]" />

                {/* Stage row */}
                <div className="grid gap-4 py-3 items-center" style={{ gridTemplateColumns: `140px repeat(${compareCandidates.length}, 1fr)` }}>
                  <div className="text-sm font-medium text-[var(--gray-600)]">Stage</div>
                  {compareCandidates.map((c) => (
                    <div key={c.id} className="text-center">
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                        style={{ backgroundColor: "var(--brand-50)", color: "var(--brand-700)" }}
                      >
                        {getStageName(c.stage)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
          <DialogFooter>
            <Button variant="outline" onClick={() => setCompareOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send AI Email Dialog */}
      <Dialog
        open={!!emailCandidate}
        onOpenChange={(open) => {
          if (!open) setEmailCandidate(null);
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Send AI Email to {emailCandidate?.name}</DialogTitle>
            <DialogDescription>
              Review and customize the AI-drafted email before sending.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div
              className="rounded-lg border border-[var(--brand-200)] bg-[var(--brand-50)] p-3"
            >
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={14} style={{ color: "var(--brand-600)" }} />
                <span className="text-xs font-semibold text-[var(--brand-700)]">AI-Drafted Content</span>
              </div>
              <p className="text-xs text-[var(--brand-600)]">
                {emailCandidate?.stage === "applied"
                  ? "Application acknowledgment email"
                  : emailCandidate?.stage === "ai_screened" || emailCandidate?.stage === "shortlisted"
                  ? "Interview invitation email"
                  : emailCandidate?.stage === "assessment"
                  ? "Assessment reminder email"
                  : "Follow-up email"}
              </p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Subject</Label>
              <Input
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Body</Label>
              <Textarea
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                className="min-h-[200px]"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setEmailCandidate(null)}>
              Cancel
            </Button>
            <Button
              className="text-white"
              style={{ backgroundColor: "var(--brand-600)" }}
              onClick={() => {
                toast.success(`Email sent to ${emailCandidate?.name}`);
                setEmailCandidate(null);
              }}
            >
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send Assessment Dialog */}
      <Dialog open={assessmentDialogOpen} onOpenChange={setAssessmentDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Send Assessment</DialogTitle>
            <DialogDescription>
              Choose an assessment to send to {selectedIds.length} selected candidate(s).
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            <Label className="text-sm font-medium">Assessment Type</Label>
            <Select value={selectedAssessment} onValueChange={setSelectedAssessment}>
              <SelectTrigger>
                <SelectValue placeholder="Select an assessment..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="coding_challenge">Coding Challenge</SelectItem>
                <SelectItem value="system_design">System Design Exercise</SelectItem>
                <SelectItem value="design_brief">Design Brief</SelectItem>
                <SelectItem value="portfolio_review">Portfolio Review</SelectItem>
                <SelectItem value="case_study">Case Study Analysis</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setAssessmentDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="text-white"
              style={{ backgroundColor: "var(--brand-600)" }}
              disabled={!selectedAssessment}
              onClick={() => {
                toast.success(`Assessment sent to ${selectedIds.length} candidate(s)`);
                setAssessmentDialogOpen(false);
                setSelectedIds([]);
              }}
            >
              Send Assessment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Move Stage Dialog */}
      <Dialog open={moveStageDialogOpen} onOpenChange={setMoveStageDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Move Stage</DialogTitle>
            <DialogDescription>
              Select the pipeline stage to move {selectedIds.length} selected candidate(s) to.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            <Label className="text-sm font-medium">Target Stage</Label>
            <Select value={selectedStage} onValueChange={setSelectedStage}>
              <SelectTrigger>
                <SelectValue placeholder="Select a stage..." />
              </SelectTrigger>
              <SelectContent>
                {PIPELINE_STAGES.map((stage) => (
                  <SelectItem key={stage.key} value={stage.key}>
                    {stage.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setMoveStageDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="text-white"
              style={{ backgroundColor: "var(--brand-600)" }}
              disabled={!selectedStage}
              onClick={() => {
                const stageName = PIPELINE_STAGES.find((s) => s.key === selectedStage)?.name ?? selectedStage;
                toast.success(`${selectedIds.length} candidate(s) moved to ${stageName}`);
                setMoveStageDialogOpen(false);
                setSelectedIds([]);
              }}
            >
              Move Stage
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Confirmation Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle size={18} style={{ color: "var(--error-500)" }} />
              Confirm Rejection
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to reject {selectedIds.length} candidate(s)? This action will move them to the rejected stage.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                toast.success(`${selectedIds.length} candidate(s) rejected`);
                setRejectDialogOpen(false);
                setSelectedIds([]);
              }}
            >
              Reject Candidates
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const ROLES = ["All", "Designer", "Engineer", "Data Scientist", "Product Manager", "Researcher"];
const EXPERIENCE_LEVELS = [
  { value: "any", label: "Any" },
  { value: "0-2", label: "0-2 yr" },
  { value: "3-5", label: "3-5 yr" },
  { value: "5-10", label: "5-10 yr" },
  { value: "10+", label: "10+ yr" },
];

function FilterSidebarInline({ filters, onChange }: { filters: FS; onChange: (f: FS) => void }) {
  const handleStageToggle = (stageKey: CandidateStage, checked: boolean) => {
    const next = checked
      ? [...filters.stages, stageKey]
      : filters.stages.filter((s) => s !== stageKey);
    onChange({ ...filters, stages: next });
  };

  return (
    <ScrollArea className="h-[calc(100vh-16rem)]">
      <div className="flex flex-col gap-6 pr-2">
        {/* Score range */}
        <div className="space-y-3">
          <Label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--gray-500)" }}>
            Score Range
          </Label>
          <Slider
            min={0}
            max={100}
            step={1}
            value={filters.scoreRange}
            onValueChange={(value) => onChange({ ...filters, scoreRange: value as [number, number] })}
          />
          <div className="flex items-center justify-between text-xs" style={{ color: "var(--gray-500)" }}>
            <span>{filters.scoreRange[0]}</span>
            <span>{filters.scoreRange[1]}</span>
          </div>
        </div>

        {/* Stages */}
        <div className="space-y-3">
          <Label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--gray-500)" }}>
            Stages
          </Label>
          <div className="space-y-2">
            {PIPELINE_STAGES.map((stage) => (
              <div key={stage.key} className="flex items-center gap-2">
                <Checkbox
                  id={`ds-${stage.key}`}
                  checked={filters.stages.includes(stage.key)}
                  onCheckedChange={(c) => handleStageToggle(stage.key, c === true)}
                />
                <label htmlFor={`ds-${stage.key}`} className="text-sm cursor-pointer" style={{ color: "var(--gray-700)" }}>
                  {stage.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Role */}
        <div className="space-y-3">
          <Label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--gray-500)" }}>
            Role
          </Label>
          <Select value={filters.role} onValueChange={(v) => onChange({ ...filters, role: v })}>
            <SelectTrigger className="h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ROLES.map((role) => (
                <SelectItem key={role} value={role.toLowerCase().replace(/ /g, "_")}>{role}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Experience */}
        <div className="space-y-3">
          <Label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--gray-500)" }}>
            Experience
          </Label>
          <RadioGroup value={filters.experienceLevel} onValueChange={(v) => onChange({ ...filters, experienceLevel: v })}>
            {EXPERIENCE_LEVELS.map((level) => (
              <div key={level.value} className="flex items-center gap-2">
                <RadioGroupItem value={level.value} id={`dexp-${level.value}`} />
                <label htmlFor={`dexp-${level.value}`} className="text-sm cursor-pointer" style={{ color: "var(--gray-700)" }}>
                  {level.label}
                </label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* AI Content flag */}
        <div className="flex items-center justify-between">
          <Label className="text-sm" style={{ color: "var(--gray-700)" }}>AI Content Flag</Label>
          <Switch checked={filters.aiContentFlag} onCheckedChange={(c) => onChange({ ...filters, aiContentFlag: c })} />
        </div>

        {/* Portfolio available */}
        <div className="flex items-center justify-between">
          <Label className="text-sm" style={{ color: "var(--gray-700)" }}>Portfolio Available</Label>
          <Switch checked={filters.portfolioAvailable} onCheckedChange={(c) => onChange({ ...filters, portfolioAvailable: c })} />
        </div>

        {/* Clear */}
        <Button variant="outline" size="sm" onClick={() => onChange({ ...defaultFilters })} className="w-full">
          Clear Filters
        </Button>
      </div>
    </ScrollArea>
  );
}
