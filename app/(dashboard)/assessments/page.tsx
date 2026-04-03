"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Plus,
  Sparkles,
  Calendar,
  Clock,
  FileText,
  Eye,
  Send,
  Copy,
  Pencil,
  Code2,
  Cpu,
  Palette,
  FolderOpen,
  BarChart3,
  HelpCircle,
  TrendingUp,
  Users,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type AssessmentType = "coding" | "system_design" | "design_brief" | "portfolio_review";
type Difficulty = "easy" | "medium" | "hard";

interface Assessment {
  id: string;
  name: string;
  type: AssessmentType;
  jobTitle: string;
  assignedCount: number;
  completedCount: number;
  dueDate: string;
  duration: number;
  status: "active";
}

interface Template {
  id: string;
  name: string;
  type: AssessmentType;
  description: string;
  questionCount: number;
  avgTime: number;
  difficulty: Difficulty;
  usedCount: number;
}

interface Result {
  id: string;
  candidateName: string;
  assessmentName: string;
  type: AssessmentType;
  score: number;
  timeTaken: number;
  date: string;
  aiFeedback: string;
}

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const mockAssessments: Assessment[] = [
  {
    id: "1",
    name: "Frontend Coding Challenge",
    type: "coding",
    jobTitle: "Senior Frontend Engineer",
    assignedCount: 15,
    completedCount: 9,
    dueDate: "2024-03-15",
    duration: 90,
    status: "active",
  },
  {
    id: "2",
    name: "System Design Assessment",
    type: "system_design",
    jobTitle: "Full Stack Engineer",
    assignedCount: 8,
    completedCount: 5,
    dueDate: "2024-03-18",
    duration: 120,
    status: "active",
  },
  {
    id: "3",
    name: "Product Design Brief",
    type: "design_brief",
    jobTitle: "Design Lead",
    assignedCount: 6,
    completedCount: 2,
    dueDate: "2024-03-20",
    duration: 180,
    status: "active",
  },
  {
    id: "4",
    name: "SQL Proficiency Test",
    type: "coding",
    jobTitle: "Data Engineer",
    assignedCount: 12,
    completedCount: 12,
    dueDate: "2024-03-10",
    duration: 60,
    status: "active",
  },
];

const mockTemplates: Template[] = [
  {
    id: "t1",
    name: "React & TypeScript Challenge",
    type: "coding",
    description:
      "Build a responsive dashboard component with state management, API integration, and comprehensive test coverage.",
    questionCount: 5,
    avgTime: 90,
    difficulty: "hard",
    usedCount: 42,
  },
  {
    id: "t2",
    name: "Distributed Systems Design",
    type: "system_design",
    description:
      "Design a scalable real-time messaging platform handling millions of concurrent connections with fault tolerance.",
    questionCount: 3,
    avgTime: 120,
    difficulty: "hard",
    usedCount: 28,
  },
  {
    id: "t3",
    name: "Mobile App Design Brief",
    type: "design_brief",
    description:
      "Create a complete design system and high-fidelity mockups for a fintech onboarding experience.",
    questionCount: 4,
    avgTime: 180,
    difficulty: "medium",
    usedCount: 19,
  },
  {
    id: "t4",
    name: "Portfolio & Case Study Review",
    type: "portfolio_review",
    description:
      "Present and walk through two case studies demonstrating end-to-end design thinking and measurable impact.",
    questionCount: 6,
    avgTime: 60,
    difficulty: "medium",
    usedCount: 35,
  },
  {
    id: "t5",
    name: "SQL & Data Modeling",
    type: "coding",
    description:
      "Write complex queries, optimize slow queries, and design a normalized schema for an e-commerce platform.",
    questionCount: 8,
    avgTime: 75,
    difficulty: "medium",
    usedCount: 56,
  },
  {
    id: "t6",
    name: "Debugging & Code Review",
    type: "coding",
    description:
      "Identify and fix bugs in a production codebase, then review a pull request for correctness and best practices.",
    questionCount: 10,
    avgTime: 60,
    difficulty: "easy",
    usedCount: 73,
  },
  {
    id: "t7",
    name: "API Architecture Design",
    type: "system_design",
    description:
      "Design RESTful and GraphQL APIs for a multi-tenant SaaS platform with authentication, rate limiting, and versioning.",
    questionCount: 4,
    avgTime: 90,
    difficulty: "hard",
    usedCount: 31,
  },
  {
    id: "t8",
    name: "Design System Audit",
    type: "design_brief",
    description:
      "Evaluate an existing design system for accessibility, consistency, and scalability, then propose improvements.",
    questionCount: 5,
    avgTime: 120,
    difficulty: "easy",
    usedCount: 14,
  },
];

const mockResults: Result[] = [
  {
    id: "r1",
    candidateName: "Sarah Chen",
    assessmentName: "Frontend Coding Challenge",
    type: "coding",
    score: 92,
    timeTaken: 78,
    date: "2024-03-12",
    aiFeedback:
      "Excellent problem-solving approach with clean, well-structured code. Strong understanding of React patterns and TypeScript typing.",
  },
  {
    id: "r2",
    candidateName: "Marcus Johnson",
    assessmentName: "Frontend Coding Challenge",
    type: "coding",
    score: 85,
    timeTaken: 88,
    date: "2024-03-12",
    aiFeedback:
      "Good overall solution with solid component architecture. Minor improvements needed in error handling and edge cases.",
  },
  {
    id: "r3",
    candidateName: "Priya Patel",
    assessmentName: "System Design Assessment",
    type: "system_design",
    score: 94,
    timeTaken: 110,
    date: "2024-03-11",
    aiFeedback:
      "Outstanding system design with thorough consideration of scalability, fault tolerance, and trade-offs. Exceptional communication.",
  },
  {
    id: "r4",
    candidateName: "James Wilson",
    assessmentName: "Frontend Coding Challenge",
    type: "coding",
    score: 67,
    timeTaken: 90,
    date: "2024-03-11",
    aiFeedback:
      "Functional solution but lacks optimization. Consider improving state management patterns and reducing unnecessary re-renders.",
  },
  {
    id: "r5",
    candidateName: "Emma Rodriguez",
    assessmentName: "Product Design Brief",
    type: "design_brief",
    score: 88,
    timeTaken: 165,
    date: "2024-03-10",
    aiFeedback:
      "Strong visual design with excellent attention to accessibility. User flows are well thought out with clear rationale.",
  },
  {
    id: "r6",
    candidateName: "David Kim",
    assessmentName: "System Design Assessment",
    type: "system_design",
    score: 45,
    timeTaken: 120,
    date: "2024-03-10",
    aiFeedback:
      "Basic understanding of distributed systems but missing key considerations around data consistency and failure modes.",
  },
  {
    id: "r7",
    candidateName: "Aisha Okafor",
    assessmentName: "SQL Proficiency Test",
    type: "coding",
    score: 78,
    timeTaken: 55,
    date: "2024-03-09",
    aiFeedback:
      "Solid SQL fundamentals with good query optimization. Could improve on complex joins and window functions.",
  },
  {
    id: "r8",
    candidateName: "Lucas Fernandez",
    assessmentName: "Frontend Coding Challenge",
    type: "coding",
    score: 23,
    timeTaken: 90,
    date: "2024-03-09",
    aiFeedback:
      "Incomplete solution with several fundamental errors. Needs significant improvement in JavaScript basics and React concepts.",
  },
  {
    id: "r9",
    candidateName: "Mei Lin",
    assessmentName: "Product Design Brief",
    type: "design_brief",
    score: 91,
    timeTaken: 170,
    date: "2024-03-08",
    aiFeedback:
      "Exceptional design thinking with innovative solutions. Prototype demonstrates strong interaction design and micro-animations.",
  },
  {
    id: "r10",
    candidateName: "Tom Nguyen",
    assessmentName: "System Design Assessment",
    type: "system_design",
    score: 56,
    timeTaken: 115,
    date: "2024-03-08",
    aiFeedback:
      "Adequate high-level design but lacking depth in database selection rationale and caching strategy specifics.",
  },
  {
    id: "r11",
    candidateName: "Rachel Adams",
    assessmentName: "SQL Proficiency Test",
    type: "coding",
    score: 34,
    timeTaken: 60,
    date: "2024-03-07",
    aiFeedback:
      "Struggles with complex queries and normalization concepts. Recommend additional practice with subqueries and indexing strategies.",
  },
  {
    id: "r12",
    candidateName: "Omar Hassan",
    assessmentName: "Frontend Coding Challenge",
    type: "coding",
    score: 72,
    timeTaken: 85,
    date: "2024-03-07",
    aiFeedback:
      "Competent implementation with clean code style. Performance optimizations and testing coverage could be strengthened.",
  },
];

// ---------------------------------------------------------------------------
// Mock data for "View Results" per-assessment candidate breakdown
// ---------------------------------------------------------------------------

const mockAssessmentCandidateResults: Record<
  string,
  { name: string; score: number; timeTaken: number; status: "passed" | "failed" | "in_progress" }[]
> = {
  "1": [
    { name: "Sarah Chen", score: 92, timeTaken: 78, status: "passed" },
    { name: "Marcus Johnson", score: 85, timeTaken: 88, status: "passed" },
    { name: "James Wilson", score: 67, timeTaken: 90, status: "failed" },
    { name: "Lucas Fernandez", score: 23, timeTaken: 90, status: "failed" },
  ],
  "2": [
    { name: "Priya Patel", score: 94, timeTaken: 110, status: "passed" },
    { name: "David Kim", score: 45, timeTaken: 120, status: "failed" },
    { name: "Tom Nguyen", score: 56, timeTaken: 115, status: "failed" },
  ],
  "3": [
    { name: "Emma Rodriguez", score: 88, timeTaken: 165, status: "passed" },
    { name: "Mei Lin", score: 91, timeTaken: 170, status: "passed" },
  ],
  "4": [
    { name: "Aisha Okafor", score: 78, timeTaken: 55, status: "passed" },
    { name: "Rachel Adams", score: 34, timeTaken: 60, status: "failed" },
    { name: "Omar Hassan", score: 72, timeTaken: 85, status: "passed" },
  ],
};

// ---------------------------------------------------------------------------
// Mock detail data for "View Detail" per result
// ---------------------------------------------------------------------------

const mockResultDetails: Record<
  string,
  {
    strengths: string[];
    weaknesses: string[];
  }
> = {
  r1: {
    strengths: [
      "Clean, modular component architecture",
      "Excellent TypeScript type safety",
      "Comprehensive error handling",
      "Strong test coverage with meaningful assertions",
    ],
    weaknesses: [
      "Could optimize re-renders with useMemo in data-heavy components",
      "Minor accessibility gaps in custom dropdown component",
    ],
  },
  r2: {
    strengths: [
      "Solid component architecture and separation of concerns",
      "Good use of custom hooks for shared logic",
      "Clean and readable code style",
    ],
    weaknesses: [
      "Missing error boundaries for graceful failure handling",
      "Edge cases in form validation not fully covered",
      "Could improve loading state UX",
    ],
  },
  r3: {
    strengths: [
      "Thorough consideration of scalability requirements",
      "Excellent trade-off analysis between consistency and availability",
      "Clear communication of design decisions",
      "Well-structured database schema design",
    ],
    weaknesses: [
      "Could elaborate more on monitoring and observability strategy",
    ],
  },
  r4: {
    strengths: [
      "Functional solution that meets basic requirements",
      "Reasonable component structure",
    ],
    weaknesses: [
      "State management needs improvement -- unnecessary prop drilling",
      "Performance issues with large lists due to missing virtualization",
      "Insufficient error handling in async operations",
    ],
  },
  r5: {
    strengths: [
      "Strong visual design with consistent spacing and typography",
      "Excellent attention to accessibility (WCAG AA compliance)",
      "Well-documented user flows with clear rationale",
    ],
    weaknesses: [
      "Some micro-interactions could be more polished",
      "Missing dark mode considerations in the design system",
    ],
  },
  r6: {
    strengths: [
      "Basic understanding of system components",
    ],
    weaknesses: [
      "Missing key considerations around data consistency",
      "Failure modes not adequately addressed",
      "Caching strategy lacks specificity",
      "Did not discuss monitoring or alerting",
    ],
  },
  r7: {
    strengths: [
      "Solid SQL fundamentals",
      "Good query optimization awareness",
      "Efficient use of indexes in schema design",
    ],
    weaknesses: [
      "Complex joins could be more efficient",
      "Window functions need improvement",
    ],
  },
  r8: {
    strengths: [
      "Attempted all sections of the challenge",
    ],
    weaknesses: [
      "Fundamental JavaScript errors in variable scoping",
      "React component lifecycle not well understood",
      "Missing basic error handling patterns",
      "Code structure lacks organization",
    ],
  },
  r9: {
    strengths: [
      "Exceptional design thinking and creative problem-solving",
      "Innovative interaction patterns with micro-animations",
      "Strong prototype that clearly demonstrates user journeys",
      "Excellent presentation and storytelling skills",
    ],
    weaknesses: [
      "Some animations may impact performance on lower-end devices",
    ],
  },
  r10: {
    strengths: [
      "Adequate high-level system architecture",
      "Reasonable technology choices",
    ],
    weaknesses: [
      "Lacking depth in database selection rationale",
      "Caching strategy needs more specifics",
      "Did not address failure recovery mechanisms",
    ],
  },
  r11: {
    strengths: [
      "Showed basic understanding of SELECT queries",
    ],
    weaknesses: [
      "Struggles with complex multi-table joins",
      "Normalization concepts need significant work",
      "Subquery performance not considered",
      "Indexing strategies not well understood",
    ],
  },
  r12: {
    strengths: [
      "Clean, readable code style",
      "Competent implementation of required features",
      "Good naming conventions throughout",
    ],
    weaknesses: [
      "Performance optimizations lacking for larger datasets",
      "Test coverage could be significantly improved",
      "Missing memoization for expensive computations",
    ],
  },
};

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MOCK_JOB_TITLES = [
  "Senior Frontend Engineer",
  "Full Stack Engineer",
  "Design Lead",
  "Data Engineer",
  "Backend Engineer",
  "Product Designer",
  "DevOps Engineer",
  "Mobile Engineer",
];

const ASSESSMENT_TYPE_OPTIONS = [
  { value: "coding", label: "Coding Challenge" },
  { value: "system_design", label: "System Design" },
  { value: "design_brief", label: "Design Brief" },
  { value: "portfolio_review", label: "Portfolio Review" },
  { value: "sql", label: "SQL" },
  { value: "debugging", label: "Debugging" },
];

// ---------------------------------------------------------------------------
// Helper maps
// ---------------------------------------------------------------------------

const typeConfig: Record<
  AssessmentType,
  { label: string; bg: string; text: string; icon: React.ElementType }
> = {
  coding: {
    label: "Coding",
    bg: "bg-[var(--brand-50)]",
    text: "text-[var(--brand-600)]",
    icon: Code2,
  },
  system_design: {
    label: "System Design",
    bg: "bg-purple-50",
    text: "text-purple-700",
    icon: Cpu,
  },
  design_brief: {
    label: "Design Brief",
    bg: "bg-amber-50",
    text: "text-amber-700",
    icon: Palette,
  },
  portfolio_review: {
    label: "Portfolio Review",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    icon: FolderOpen,
  },
};

const difficultyConfig: Record<Difficulty, { label: string; bg: string; text: string }> = {
  easy: { label: "Easy", bg: "bg-emerald-50", text: "text-emerald-700" },
  medium: { label: "Medium", bg: "bg-amber-50", text: "text-amber-700" },
  hard: { label: "Hard", bg: "bg-red-50", text: "text-red-700" },
};

function getScoreColor(score: number) {
  if (score >= 75) return "text-emerald-600";
  if (score >= 50) return "text-[var(--brand-600)]";
  if (score >= 30) return "text-amber-600";
  return "text-red-600";
}

function getScoreBg(score: number) {
  if (score >= 75) return "bg-emerald-50";
  if (score >= 50) return "bg-[var(--brand-50)]";
  if (score >= 30) return "bg-amber-50";
  return "bg-red-50";
}

function getScoreProgressColor(score: number) {
  if (score >= 75) return "bg-emerald-500";
  if (score >= 50) return "bg-blue-500";
  if (score >= 30) return "bg-amber-500";
  return "bg-red-500";
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ---------------------------------------------------------------------------
// Sub-components (inline)
// ---------------------------------------------------------------------------

function TypeBadge({ type }: { type: AssessmentType }) {
  const config = typeConfig[type];
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${config.bg} ${config.text}`}
    >
      <Icon size={12} />
      {config.label}
    </span>
  );
}

function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const config = difficultyConfig[difficulty];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-100)] text-[var(--brand-600)]">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-lg font-semibold tracking-tight text-[var(--gray-900)]">{value}</p>
        <p className="text-xs text-[var(--gray-500)]">{label}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: "passed" | "failed" | "in_progress" }) {
  const config = {
    passed: { label: "Passed", bg: "bg-emerald-50", text: "text-emerald-700" },
    failed: { label: "Failed", bg: "bg-red-50", text: "text-red-700" },
    in_progress: { label: "In Progress", bg: "bg-amber-50", text: "text-amber-700" },
  };
  const c = config[status];
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${c.bg} ${c.text}`}>
      {c.label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AssessmentsPage() {
  const [activeTab, setActiveTab] = useState("active");

  // Modal states
  const [createOpen, setCreateOpen] = useState(false);
  const [viewResultsAssessment, setViewResultsAssessment] = useState<string | null>(null);
  const [viewDetailResult, setViewDetailResult] = useState<string | null>(null);
  const [editTemplate, setEditTemplate] = useState<string | null>(null);
  const [useTemplate, setUseTemplate] = useState<string | null>(null);

  // Local assessments list (so we can add new ones)
  const [assessments, setAssessments] = useState<Assessment[]>(mockAssessments);

  // Create Assessment form state
  const [createName, setCreateName] = useState("");
  const [createType, setCreateType] = useState("");
  const [createJob, setCreateJob] = useState("");
  const [createDuration, setCreateDuration] = useState("60");
  const [createDueDate, setCreateDueDate] = useState("");

  // Edit Template form state
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editQuestionCount, setEditQuestionCount] = useState("");
  const [editDuration, setEditDuration] = useState("");

  // Use Template form state
  const [useTemplateJob, setUseTemplateJob] = useState("");
  const [useTemplateDueDate, setUseTemplateDueDate] = useState("");

  // Derived data for modals
  const viewResultsData = viewResultsAssessment
    ? assessments.find((a) => a.id === viewResultsAssessment)
    : null;
  const viewResultsCandidates = viewResultsAssessment
    ? mockAssessmentCandidateResults[viewResultsAssessment] ?? []
    : [];

  const viewDetailData = viewDetailResult
    ? mockResults.find((r) => r.id === viewDetailResult)
    : null;
  const viewDetailExtras = viewDetailResult
    ? mockResultDetails[viewDetailResult]
    : null;

  const editTemplateData = editTemplate
    ? mockTemplates.find((t) => t.id === editTemplate)
    : null;

  const useTemplateData = useTemplate
    ? mockTemplates.find((t) => t.id === useTemplate)
    : null;

  // Handlers
  function handleCreateAssessment() {
    const newAssessment: Assessment = {
      id: `new-${Date.now()}`,
      name: createName || "Untitled Assessment",
      type: (createType as AssessmentType) || "coding",
      jobTitle: createJob || "General",
      assignedCount: 0,
      completedCount: 0,
      dueDate: createDueDate || new Date().toISOString().split("T")[0],
      duration: parseInt(createDuration) || 60,
      status: "active",
    };
    setAssessments((prev) => [newAssessment, ...prev]);
    toast.success("Assessment created");
    setCreateOpen(false);
    // Reset form
    setCreateName("");
    setCreateType("");
    setCreateJob("");
    setCreateDuration("60");
    setCreateDueDate("");
  }

  function handleOpenEditTemplate(templateId: string) {
    const t = mockTemplates.find((t) => t.id === templateId);
    if (t) {
      setEditName(t.name);
      setEditDescription(t.description);
      setEditQuestionCount(String(t.questionCount));
      setEditDuration(String(t.avgTime));
    }
    setEditTemplate(templateId);
  }

  function handleSaveEditTemplate() {
    toast.success("Template changes saved");
    setEditTemplate(null);
  }

  function handleUseTemplate(templateId: string) {
    setUseTemplateJob("");
    setUseTemplateDueDate("");
    setUseTemplate(templateId);
  }

  function handleAssignTemplate() {
    const jobName = useTemplateJob || "selected candidates";
    toast.success(`Assessment assigned to ${jobName} candidates`);
    setUseTemplate(null);
  }

  return (
    <div className="p-8 space-y-8">
      {/* ----------------------------------------------------------------- */}
      {/* Header                                                            */}
      {/* ----------------------------------------------------------------- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--gray-900)]">
            Assessments
          </h1>
          <p className="mt-1 text-sm text-[var(--gray-500)]">
            Create, manage and track candidate assessments
          </p>
        </div>
        <Button
          className="bg-[var(--brand-600)] text-white hover:bg-[var(--brand-700)]"
          onClick={() => setCreateOpen(true)}
        >
          <Plus size={16} />
          Create Assessment
        </Button>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* AI Insights Banner                                                */}
      {/* ----------------------------------------------------------------- */}
      <div className="rounded-xl bg-[var(--brand-50)] p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[var(--brand-600)]">
              <Sparkles size={20} />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold tracking-tight text-[var(--gray-900)]">
                  Assessment Insights
                </h2>
                <span className="inline-flex items-center rounded-full bg-[var(--brand-50)] border border-[var(--brand-200)] px-2.5 py-0.5 text-xs font-semibold text-[var(--brand-600)]">
                  ARIA Powered
                </span>
              </div>
              <p className="text-sm text-[var(--gray-700)] max-w-2xl">
                4 assessments in progress with 67% average completion rate. 3 candidates scored
                above 90% &mdash; consider fast-tracking to interviews.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 lg:gap-8">
            <StatCard label="Completion Rate" value="67%" icon={TrendingUp} />
            <StatCard label="Avg Score" value={74} icon={BarChart3} />
            <StatCard label="Pending Review" value={6} icon={Users} />
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Tabs                                                              */}
      {/* ----------------------------------------------------------------- */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="library">Library</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        {/* ----- Tab 1: Active Assessments ----- */}
        <TabsContent value="active" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {assessments.map((assessment) => {
              const progress =
                assessment.assignedCount > 0
                  ? Math.round((assessment.completedCount / assessment.assignedCount) * 100)
                  : 0;
              const isComplete = assessment.completedCount === assessment.assignedCount;

              return (
                <div
                  key={assessment.id}
                  className="rounded-xl bg-white p-6 shadow-[var(--shadow-sm)] space-y-4"
                >
                  {/* Top row: name + badge */}
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-semibold text-[var(--gray-900)]">
                      {assessment.name}
                    </h3>
                    <TypeBadge type={assessment.type} />
                  </div>

                  {/* Job title */}
                  <p className="text-sm text-[var(--gray-500)]">{assessment.jobTitle}</p>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[var(--gray-700)]">
                        {assessment.completedCount}/{assessment.assignedCount} completed
                      </span>
                      <span className="font-medium text-[var(--gray-900)]">{progress}%</span>
                    </div>
                    <Progress
                      value={progress}
                      className="h-2 bg-[var(--gray-100)]"
                    />
                  </div>

                  {/* Due date + duration */}
                  <div className="flex items-center gap-4 text-sm text-[var(--gray-500)]">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={14} />
                      Due {formatDate(assessment.dueDate)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={14} />
                      {assessment.duration} min
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2 border-t border-[var(--gray-100)]">
                    <Button
                      size="sm"
                      className="bg-[var(--brand-600)] text-white hover:bg-[var(--brand-700)]"
                      onClick={() => setViewResultsAssessment(assessment.id)}
                    >
                      <Eye size={14} />
                      View Results
                    </Button>
                    {!isComplete && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          toast.success(
                            `Reminders sent for "${assessment.name}" (${assessment.assignedCount - assessment.completedCount} pending)`
                          )
                        }
                      >
                        <Send size={14} />
                        Send Reminders
                      </Button>
                    )}
                    {isComplete && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                        <CheckCircle2 size={14} />
                        All Complete
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        {/* ----- Tab 2: Library ----- */}
        <TabsContent value="library" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {mockTemplates.map((template) => (
              <div
                key={template.id}
                className="rounded-xl bg-white p-6 shadow-[var(--shadow-sm)] space-y-4"
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-[var(--gray-900)]">
                    {template.name}
                  </h3>
                  <TypeBadge type={template.type} />
                </div>

                {/* Description */}
                <p className="text-sm text-[var(--gray-500)] line-clamp-2">
                  {template.description}
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="inline-flex items-center gap-1.5 text-[var(--gray-700)]">
                    <HelpCircle size={14} className="text-[var(--gray-400)]" />
                    {template.questionCount} questions
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[var(--gray-700)]">
                    <Clock size={14} className="text-[var(--gray-400)]" />
                    ~{template.avgTime}min
                  </span>
                  <DifficultyBadge difficulty={template.difficulty} />
                </div>

                {/* Used count */}
                <p className="text-xs text-[var(--gray-400)]">
                  Used {template.usedCount} times
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-[var(--gray-100)]">
                  <Button
                    size="sm"
                    className="bg-[var(--brand-600)] text-white hover:bg-[var(--brand-700)]"
                    onClick={() => handleUseTemplate(template.id)}
                  >
                    <FileText size={14} />
                    Use Template
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleOpenEditTemplate(template.id)}
                  >
                    <Pencil size={14} />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toast.success(`"${template.name}" duplicated`)}
                  >
                    <Copy size={14} />
                    Duplicate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* ----- Tab 3: Results ----- */}
        <TabsContent value="results" className="mt-6">
          <div className="rounded-xl bg-white shadow-[var(--shadow-sm)] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[var(--gray-50)]">
                  <TableHead className="font-semibold text-[var(--gray-700)]">Candidate</TableHead>
                  <TableHead className="font-semibold text-[var(--gray-700)]">Assessment</TableHead>
                  <TableHead className="font-semibold text-[var(--gray-700)]">Type</TableHead>
                  <TableHead className="font-semibold text-[var(--gray-700)]">Score</TableHead>
                  <TableHead className="font-semibold text-[var(--gray-700)]">Time Taken</TableHead>
                  <TableHead className="font-semibold text-[var(--gray-700)]">Date</TableHead>
                  <TableHead className="font-semibold text-[var(--gray-700)] min-w-[200px]">
                    AI Feedback
                  </TableHead>
                  <TableHead className="font-semibold text-[var(--gray-700)]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className="font-medium text-[var(--gray-900)]">
                      {result.candidateName}
                    </TableCell>
                    <TableCell className="text-[var(--gray-700)]">
                      {result.assessmentName}
                    </TableCell>
                    <TableCell>
                      <TypeBadge type={result.type} />
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-sm font-semibold ${getScoreBg(result.score)} ${getScoreColor(result.score)}`}
                      >
                        {result.score}%
                      </span>
                    </TableCell>
                    <TableCell className="text-[var(--gray-700)]">
                      {result.timeTaken} min
                    </TableCell>
                    <TableCell className="text-[var(--gray-500)] whitespace-nowrap">
                      {formatDate(result.date)}
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-[var(--gray-500)] line-clamp-2 max-w-[280px]">
                        {result.aiFeedback}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setViewDetailResult(result.id)}
                      >
                        <Eye size={14} />
                        View Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* ================================================================= */}
      {/* DIALOG 1: Create Assessment                                       */}
      {/* ================================================================= */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Create New Assessment</DialogTitle>
            <DialogDescription>
              Set up a new assessment to evaluate candidates.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="create-name">Assessment Name</Label>
              <Input
                id="create-name"
                placeholder="e.g. Frontend Coding Challenge"
                value={createName}
                onChange={(e) => setCreateName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="create-type">Type</Label>
              <Select value={createType} onValueChange={setCreateType}>
                <SelectTrigger id="create-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {ASSESSMENT_TYPE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="create-job">Job</Label>
              <Select value={createJob} onValueChange={setCreateJob}>
                <SelectTrigger id="create-job">
                  <SelectValue placeholder="Select job" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_JOB_TITLES.map((job) => (
                    <SelectItem key={job} value={job}>
                      {job}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="create-duration">Duration (minutes)</Label>
                <Input
                  id="create-duration"
                  type="number"
                  min={10}
                  value={createDuration}
                  onChange={(e) => setCreateDuration(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="create-due-date">Due Date</Label>
                <Input
                  id="create-due-date"
                  type="date"
                  value={createDueDate}
                  onChange={(e) => setCreateDueDate(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[var(--brand-600)] text-white hover:bg-[var(--brand-700)]"
              onClick={handleCreateAssessment}
            >
              Create Assessment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ================================================================= */}
      {/* DIALOG 2: View Results (per assessment)                           */}
      {/* ================================================================= */}
      <Dialog
        open={viewResultsAssessment !== null}
        onOpenChange={(open) => { if (!open) setViewResultsAssessment(null); }}
      >
        <DialogContent className="sm:max-w-[640px]">
          <DialogHeader>
            <DialogTitle>Results &mdash; {viewResultsData?.name ?? "Assessment"}</DialogTitle>
            <DialogDescription>
              Candidate performance summary for this assessment.
            </DialogDescription>
          </DialogHeader>

          {viewResultsData && (
            <>
              {/* Summary stats */}
              <div className="grid grid-cols-3 gap-4 py-2">
                <div className="rounded-lg border p-3 text-center">
                  <p className="text-2xl font-semibold text-[var(--gray-900)]">
                    {viewResultsCandidates.length}
                  </p>
                  <p className="text-xs text-[var(--gray-500)]">Completed</p>
                </div>
                <div className="rounded-lg border p-3 text-center">
                  <p className="text-2xl font-semibold text-[var(--gray-900)]">
                    {viewResultsCandidates.length > 0
                      ? Math.round(
                          viewResultsCandidates.reduce((sum, c) => sum + c.score, 0) /
                            viewResultsCandidates.length
                        )
                      : 0}
                    %
                  </p>
                  <p className="text-xs text-[var(--gray-500)]">Avg Score</p>
                </div>
                <div className="rounded-lg border p-3 text-center">
                  <p className="text-2xl font-semibold text-[var(--gray-900)]">
                    {viewResultsCandidates.length > 0
                      ? Math.round(
                          (viewResultsCandidates.filter((c) => c.status === "passed").length /
                            viewResultsCandidates.length) *
                            100
                        )
                      : 0}
                    %
                  </p>
                  <p className="text-xs text-[var(--gray-500)]">Pass Rate</p>
                </div>
              </div>

              {/* Candidate results mini table */}
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[var(--gray-50)]">
                      <TableHead className="text-xs font-semibold text-[var(--gray-700)]">Candidate</TableHead>
                      <TableHead className="text-xs font-semibold text-[var(--gray-700)]">Score</TableHead>
                      <TableHead className="text-xs font-semibold text-[var(--gray-700)]">Time</TableHead>
                      <TableHead className="text-xs font-semibold text-[var(--gray-700)]">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {viewResultsCandidates.map((candidate, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium text-sm text-[var(--gray-900)]">
                          {candidate.name}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-16 rounded-full bg-[var(--gray-100)] overflow-hidden">
                              <div
                                className={`h-full rounded-full ${getScoreProgressColor(candidate.score)}`}
                                style={{ width: `${candidate.score}%` }}
                              />
                            </div>
                            <span className={`text-sm font-medium ${getScoreColor(candidate.score)}`}>
                              {candidate.score}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-[var(--gray-700)]">
                          {candidate.timeTaken} min
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={candidate.status} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewResultsAssessment(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ================================================================= */}
      {/* DIALOG 3: View Detail (single result)                             */}
      {/* ================================================================= */}
      <Dialog
        open={viewDetailResult !== null}
        onOpenChange={(open) => { if (!open) setViewDetailResult(null); }}
      >
        <DialogContent className="sm:max-w-[580px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {viewDetailData?.candidateName ?? "Candidate"} &mdash; {viewDetailData?.assessmentName ?? "Assessment"}
            </DialogTitle>
            <DialogDescription>
              Full assessment result and AI analysis.
            </DialogDescription>
          </DialogHeader>

          {viewDetailData && viewDetailExtras && (
            <div className="space-y-5 py-2">
              {/* Overall score */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[var(--gray-700)]">Overall Score</span>
                  <span className={`text-lg font-bold ${getScoreColor(viewDetailData.score)}`}>
                    {viewDetailData.score}%
                  </span>
                </div>
                <div className="h-3 w-full rounded-full bg-[var(--gray-100)] overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${getScoreProgressColor(viewDetailData.score)}`}
                    style={{ width: `${viewDetailData.score}%` }}
                  />
                </div>
              </div>

              {/* Time taken */}
              <div className="flex items-center gap-2 text-sm text-[var(--gray-600)]">
                <Clock size={14} />
                <span>Time taken: <strong>{viewDetailData.timeTaken} min</strong></span>
              </div>

              {/* AI Feedback */}
              <div className="space-y-1.5">
                <h4 className="text-sm font-semibold text-[var(--gray-900)]">AI Feedback</h4>
                <p className="text-sm text-[var(--gray-600)] leading-relaxed">
                  {viewDetailData.aiFeedback}
                </p>
              </div>

              {/* Strengths */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-[var(--gray-900)]">Strengths</h4>
                <ul className="space-y-1.5">
                  {viewDetailExtras.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--gray-700)]">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-[var(--gray-900)]">Areas for Improvement</h4>
                <ul className="space-y-1.5">
                  {viewDetailExtras.weaknesses.map((w, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--gray-700)]">
                      <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-500" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDetailResult(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ================================================================= */}
      {/* DIALOG 4: Edit Template                                           */}
      {/* ================================================================= */}
      <Dialog
        open={editTemplate !== null}
        onOpenChange={(open) => { if (!open) setEditTemplate(null); }}
      >
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Edit Template &mdash; {editTemplateData?.name ?? "Template"}</DialogTitle>
            <DialogDescription>
              Update the template details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                rows={3}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-question-count">Question Count</Label>
                <Input
                  id="edit-question-count"
                  type="number"
                  min={1}
                  value={editQuestionCount}
                  onChange={(e) => setEditQuestionCount(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-duration">Duration (minutes)</Label>
                <Input
                  id="edit-duration"
                  type="number"
                  min={10}
                  value={editDuration}
                  onChange={(e) => setEditDuration(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditTemplate(null)}>
              Cancel
            </Button>
            <Button
              className="bg-[var(--brand-600)] text-white hover:bg-[var(--brand-700)]"
              onClick={handleSaveEditTemplate}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ================================================================= */}
      {/* DIALOG 5: Use Template                                            */}
      {/* ================================================================= */}
      <Dialog
        open={useTemplate !== null}
        onOpenChange={(open) => { if (!open) setUseTemplate(null); }}
      >
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Use Template &mdash; {useTemplateData?.name ?? "Template"}</DialogTitle>
            <DialogDescription>
              Assign this assessment template to a job and set a deadline.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="use-template-job">Assign to Job</Label>
              <Select value={useTemplateJob} onValueChange={setUseTemplateJob}>
                <SelectTrigger id="use-template-job">
                  <SelectValue placeholder="Select a job" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_JOB_TITLES.map((job) => (
                    <SelectItem key={job} value={job}>
                      {job}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="use-template-due-date">Due Date</Label>
              <Input
                id="use-template-due-date"
                type="date"
                value={useTemplateDueDate}
                onChange={(e) => setUseTemplateDueDate(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUseTemplate(null)}>
              Cancel
            </Button>
            <Button
              className="bg-[var(--brand-600)] text-white hover:bg-[var(--brand-700)]"
              onClick={handleAssignTemplate}
            >
              Assign to Candidates
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
