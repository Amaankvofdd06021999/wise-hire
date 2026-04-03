export type JobStatus = "active" | "draft" | "closed";
export type CandidateStage = "applied" | "ai_screened" | "shortlisted" | "assessment" | "interview_scheduled" | "interview_done" | "offer" | "hired" | "rejected";
export type ScoreTier = "strong" | "good" | "review" | "not_fit";
export type ScreeningStatus = "processing" | "complete" | "failed";
export type AssessmentType = "coding" | "system_design" | "design_brief" | "portfolio_review";
export type RuleType = "hard_filter" | "auto_shortlist" | "auto_assessment" | "ai_content_flag" | "sla_alert";
export type MessageDirection = "sent" | "received";
export type UrgencyLevel = "critical" | "warning" | "info";

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  remotePolicy: "remote" | "hybrid" | "onsite";
  status: JobStatus;
  hiringManager: string;
  applicantsCount: number;
  newApplicantsToday: number;
  daysOpen: number;
  tthDays: number;
  tthBenchmark: number;
  salaryRange: { min: number; max: number; currency: string };
  description: { summary: string; responsibilities: string[]; mustHaves: string[]; niceToHaves: string[] };
  screeningWeights: { portfolio: number; experience: number; skills: number; culture: number };
  skills: Skill[];
  channels: string[];
  createdAt: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  currentRole: string;
  currentCompany: string;
  location: string;
  appliedDate: string;
  jobId: string;
  stage: CandidateStage;
  daysInStage: number;
  aiScore: number;
  scoreTier: ScoreTier;
  aiSummary: string;
  aiVerdict: string;
  skills: Skill[];
  skillMatchPercent: number;
  yearsExperience: number;
  aiContentPercent: number;
  hasAiContentFlag: boolean;
  portfolioUrl: string | null;
  portfolioScore: number | null;
  githubUrl: string | null;
  resumeAnalysis: ResumeAnalysis;
  portfolioAnalysis: PortfolioAnalysis | null;
  technicalProfile: TechnicalProfile | null;
  aiContentAnalysis: AiContentAnalysis;
  fitAssessment: FitAssessment;
  careerTimeline: CareerEntry[];
  teamActivity: TeamActivityEntry[];
}

export interface Skill {
  name: string;
  matched: "full" | "partial" | "missing";
  required: boolean;
}

export interface CareerEntry {
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
}

export interface ResumeAnalysis {
  qualityScore: number;
  trajectoryAnalysis: string;
  redFlags: { text: string; context: string }[];
  recommendation: "shortlist" | "consider" | "skip";
  recommendationReasoning: string;
}

export interface PortfolioAnalysis {
  overallScore: number;
  tier: "exceptional" | "strong" | "moderate" | "weak";
  websiteMetrics: { loadSpeed: number; mobileResponsive: boolean; brokenLinks: number; accessibilityScore: number };
  dimensions: { visualDesign: number; uxThinking: number; caseStudyClarity: number; businessImpact: number; processDocumentation: number };
  projects: { title: string; score: number; strength: string; gap: string }[];
  toolsDetected: string[];
  comparativeRank: { rank: number; total: number };
}

export interface TechnicalProfile {
  githubUsername: string;
  contributionData: number[];
  languages: { name: string; percent: number; color: string }[];
  topRepos: { name: string; stars: number; description: string; language: string }[];
  codeQuality: { readme: number; commenting: number; structure: number };
  techStack: { primary: string[]; secondary: string[] };
}

export interface AiContentAnalysis {
  overallPercent: number;
  sections: { name: string; score: number; confidence: number }[];
  flaggedExcerpts: { text: string; confidence: number }[];
  overrideStatus: "pending" | "acceptable" | "concern" | null;
}

export interface FitAssessment {
  requirements: { criterion: string; status: "met" | "partial" | "not_met"; evidence: string; isRequired: boolean }[];
  aiRecommendation: string;
  biasCheckPassed: boolean;
}

export interface ScreeningBatch {
  id: string;
  jobId: string;
  jobTitle: string;
  candidateCount: number;
  status: ScreeningStatus;
  startedAt: string;
  durationMs: number;
  results: { candidateId: string; candidateName: string; score: number; verdict: ScoreTier; flags: string[] }[];
}

export interface ScreeningRule {
  id: string;
  type: RuleType;
  condition: string;
  action: string;
  enabled: boolean;
}

export interface Thread {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateAvatar: string | null;
  role: string;
  stage: CandidateStage;
  lastMessage: string;
  lastMessageAt: string;
  unread: boolean;
  starred: boolean;
  messages: Message[];
}

export interface Message {
  id: string;
  direction: MessageDirection;
  content: string;
  sentAt: string;
  isAiDraft: boolean;
}

export interface EmailTemplate {
  id: string;
  title: string;
  category: "acknowledgment" | "shortlist" | "assessment_invite" | "rejection" | "interview" | "offer";
  subject: string;
  body: string;
}

export interface AriaMessage {
  id: string;
  role: "user" | "aria";
  content: string;
  timestamp: string;
  embeddedCards?: AriaCard[];
  requiresConfirmation?: boolean;
  confirmed?: boolean;
}

export interface AriaCard {
  type: "candidate" | "stat" | "action_confirm" | "link";
  data: Record<string, unknown>;
}

export interface DashboardStats {
  healthScore: number;
  activeJobs: { value: number; delta: number; deltaPercent: number };
  pipelineCandidates: { value: number; newToday: number };
  avgTTH: { value: number; benchmark: number; deltaPercent: number };
  avgCPH: { value: number; target: number; deltaPercent: number };
}

export interface PipelineStage {
  name: string;
  key: CandidateStage;
  count: number;
  conversionPercent: number;
}

export interface UrgentAction {
  id: string;
  urgency: UrgencyLevel;
  icon: string;
  description: string;
  timeAgo: string;
  actionLabel: string;
  actionUrl: string;
}

export interface TeamActivityEntry {
  userId: string;
  userName: string;
  avatarUrl: string | null;
  action: "viewed" | "commented" | "rated";
  comment?: string;
  rating?: number;
  timestamp: string;
}

export interface ActivityFeedItem {
  id: string;
  description: string;
  timestamp: string;
  actionLabel: string;
  actionUrl: string;
}

// ---------------------------------------------------------------------------
// Assessments
// ---------------------------------------------------------------------------
export type AssessmentStatus = "active" | "completed" | "expired" | "draft";
export type DifficultyLevel = "easy" | "medium" | "hard";

export interface Assessment {
  id: string;
  name: string;
  type: AssessmentType;
  jobId: string;
  jobTitle: string;
  status: AssessmentStatus;
  assignedCount: number;
  completedCount: number;
  dueDate: string;
  createdDate: string;
  duration: number; // minutes
}

export interface AssessmentTemplate {
  id: string;
  name: string;
  type: AssessmentType;
  questionCount: number;
  avgCompletionTime: number; // minutes
  difficulty: DifficultyLevel;
  description: string;
  usageCount: number;
}

export interface AssessmentResult {
  id: string;
  candidateId: string;
  candidateName: string;
  assessmentId: string;
  assessmentName: string;
  type: AssessmentType;
  score: number;
  maxScore: number;
  timeTaken: number; // minutes
  completedDate: string;
  aiFeedback: string;
  strengths: string[];
  weaknesses: string[];
}

// ---------------------------------------------------------------------------
// Interviews
// ---------------------------------------------------------------------------
export type InterviewType = "technical" | "culture" | "portfolio" | "system_design" | "final";
export type InterviewStatus = "confirmed" | "pending" | "completed" | "cancelled";
export type FeedbackDecision = "advance" | "hold" | "reject";

export interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateRole: string;
  jobId: string;
  jobTitle: string;
  type: InterviewType;
  scheduledDate: string;
  duration: number; // minutes
  interviewers: { name: string; role: string }[];
  status: InterviewStatus;
  meetingLink?: string;
}

export interface InterviewGuide {
  id: string;
  candidateId: string;
  candidateName: string;
  jobTitle: string;
  generatedDate: string;
  openingContext: string;
  strengthsToValidate: string[];
  gapsToProbe: string[];
  suggestedQuestions: { question: string; category: string; timeAllocation: number }[];
  flagsToVerify: string[];
  totalDuration: number;
}

export interface InterviewFeedback {
  id: string;
  interviewId: string;
  candidateId: string;
  candidateName: string;
  interviewerName: string;
  interviewerRole: string;
  jobTitle: string;
  date: string;
  criteriaRatings: { criterion: string; rating: number; maxRating: number; notes: string }[];
  overallNotes: string;
  decision: FeedbackDecision;
  aiSynthesis: string;
}

// ---------------------------------------------------------------------------
// Reports
// ---------------------------------------------------------------------------
export interface HiringMetric {
  month: string;
  tth: number; // time to hire in days
  cph: number; // cost per hire
  offerAcceptance: number; // percentage
  pipelineVelocity: number;
}

export interface SourceMetric {
  source: string;
  applicants: number;
  shortlisted: number;
  hired: number;
  costPerHire: number;
  conversionRate: number;
}

export interface AIPerformanceMetric {
  month: string;
  screeningVolume: number;
  shortlistPrecision: number;
  falsePositiveRate: number;
  falseNegativeRate: number;
}

export interface DEIMetric {
  stage: string;
  total: number;
  demographics: { group: string; count: number; percentage: number }[];
}

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string;
  status: "active" | "invited" | "deactivated";
  avatarInitials: string;
  joinedDate: string;
}

export interface Integration {
  id: string;
  name: string;
  category: "job_board" | "calendar" | "video" | "messaging" | "hris" | "automation";
  description: string;
  status: "connected" | "not_connected";
  icon: string; // lucide icon name
}

export interface CompanySettings {
  name: string;
  locations: string[];
  cultureValues: string[];
  aiConfig: {
    resumeWeight: number;
    portfolioWeight: number;
    technicalWeight: number;
    cultureWeight: number;
    autoScreening: boolean;
    detectionSensitivity: "low" | "medium" | "high";
    ariaProactiveSuggestions: boolean;
  };
}
