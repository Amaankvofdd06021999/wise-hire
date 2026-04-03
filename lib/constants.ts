import type { CandidateStage, ScoreTier } from "./types";

export const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Jobs", href: "/jobs", icon: "Briefcase" },
  { label: "Candidates", href: "/candidates", icon: "Users" },
  { label: "AI Screening", href: "/screening", icon: "ScanSearch" },
  { label: "Assessments", href: "/assessments", icon: "ClipboardCheck" },
  { label: "Interviews", href: "/interviews", icon: "Video" },
  { label: "Reports", href: "/reports", icon: "BarChart3" },
  { label: "Communications", href: "/communications", icon: "MessageSquare" },
  { label: "Settings", href: "/settings", icon: "Settings" },
] as const;

export const MOBILE_NAV_ITEMS = NAV_ITEMS.slice(0, 4);

export const PIPELINE_STAGES: { name: string; key: CandidateStage }[] = [
  { name: "Applied", key: "applied" },
  { name: "AI Screened", key: "ai_screened" },
  { name: "Shortlisted", key: "shortlisted" },
  { name: "Assessment", key: "assessment" },
  { name: "Interview Scheduled", key: "interview_scheduled" },
  { name: "Interview Done", key: "interview_done" },
  { name: "Offer", key: "offer" },
  { name: "Hired", key: "hired" },
  { name: "Rejected", key: "rejected" },
];

export const SCORE_TIERS: { tier: ScoreTier; label: string; min: number; max: number; color: string; bg: string; textColor: string }[] = [
  { tier: "strong", label: "Strong Fit", min: 75, max: 100, color: "var(--success-600)", bg: "var(--success-50)", textColor: "var(--success-700)" },
  { tier: "good", label: "Good Fit", min: 50, max: 74, color: "var(--brand-600)", bg: "var(--brand-50)", textColor: "var(--brand-700)" },
  { tier: "review", label: "Needs Review", min: 30, max: 49, color: "var(--warning-600)", bg: "var(--warning-50)", textColor: "var(--warning-700)" },
  { tier: "not_fit", label: "Not Fit", min: 0, max: 29, color: "var(--error-600)", bg: "var(--error-50)", textColor: "var(--error-700)" },
];

export const HEALTH_SCORE_TIERS = [
  { min: 70, max: 100, color: "var(--brand-600)", bg: "var(--brand-50)" },
  { min: 40, max: 69, color: "var(--warning-600)", bg: "var(--warning-50)" },
  { min: 0, max: 39, color: "var(--error-600)", bg: "var(--error-50)" },
];

export const TEMPLATE_CATEGORIES = [
  "acknowledgment", "shortlist", "assessment_invite", "rejection", "interview", "offer",
] as const;
