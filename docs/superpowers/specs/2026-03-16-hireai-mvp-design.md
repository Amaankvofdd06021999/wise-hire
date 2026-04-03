# HireAI MVP (Phase 1) — Design Specification

**Date:** 2026-03-16
**Author:** Amaan + Claude
**Status:** Approved
**PRD Reference:** HireAI-PRD-v1.0.md

---

## Overview

HireAI is an AI-augmented hiring platform for Design & Tech teams. This spec covers the Phase 1 MVP: App Shell, Dashboard, Jobs, Candidates, AI Screening, Communications, and ARIA agent panel.

The frontend is a fully interactive webapp with mock AI data. Real AI backend integration is out of scope for this phase.

### Deviations from PRD

The PRD specifies a "Glass & Soft UI" design language (Urbanist font, #0E5EF5 blue brand, glassmorphism surfaces, blue-tinted shadows). **This has been intentionally replaced with the Untitled UI PRO v4.0 design system** per stakeholder decision on 2026-03-16. Changes:

- Font: Inter (not Urbanist)
- Brand color: #7F56D9 purple (not #0E5EF5 blue)
- Surfaces: Solid white with gray-based shadows (no glassmorphism)
- "Good Fit" AI score tier: Brand/600 purple (not blue as stated in PRD Section 6)

All product logic, features, IA, and module specifications from the PRD remain unchanged. Only the visual language is replaced.

---

## Tech Stack

| Layer | Choice | Version |
|-------|--------|---------|
| Framework | Next.js (App Router) | 16 |
| Language | TypeScript | 5.7+ |
| UI Runtime | React | 19 |
| Styling | Tailwind CSS | 4 |
| Component Library | shadcn/ui (Radix primitives) | Latest |
| Icons | Lucide React | Latest |
| Charts | Recharts | 2.15+ |
| Design Tokens | Untitled UI PRO v4.0 | Mapped to CSS variables |
| Drag and Drop | @hello-pangea/dnd | Latest |

---

## Design System Integration

### Font
Inter (Google Fonts). Loaded in root layout. All weights: 300, 400, 500, 600, 700.

### Color Tokens (CSS Variables)

```css
--brand-25: #FCFAFF;    --brand-50: #F9F5FF;
--brand-100: #F4EBFF;   --brand-200: #E9D7FE;
--brand-300: #D6BBFB;   --brand-400: #B692F6;
--brand-500: #9E77ED;   --brand-600: #7F56D9;
--brand-700: #6941C6;   --brand-800: #53389E;
--brand-900: #42307D;   --brand-950: #2C1C5F;

--gray-25: #FCFCFD;     --gray-50: #F9FAFB;
--gray-100: #F2F4F7;    --gray-200: #EAECF0;
--gray-300: #D0D5DD;    --gray-400: #98A2B3;
--gray-500: #667085;    --gray-600: #475467;
--gray-700: #344054;    --gray-800: #1D2939;
--gray-900: #101828;    --gray-950: #0C111D;

--success-50: #EDFCF2;  --success-500: #16B364;
--success-600: #099250;  --success-700: #087443;

--warning-50: #FEFBE8;  --warning-500: #EAAA08;
--warning-600: #CA8504;

--error-50: #FFF1F3;    --error-500: #F63D68;
--error-600: #E31B54;   --error-700: #C01048;
```

### Shadows

```css
--shadow-xs: 0px 1px 2px rgba(16, 24, 40, 0.05);
--shadow-sm: 0px 1px 2px rgba(16, 24, 40, 0.06), 0px 1px 3px rgba(16, 24, 40, 0.1);
--shadow-md: 0px 2px 4px rgba(16, 24, 40, 0.06), 0px 4px 8px rgba(16, 24, 40, 0.1);
--shadow-lg: 0px 4px 6px rgba(16, 24, 40, 0.03), 0px 12px 16px rgba(16, 24, 40, 0.08);
--shadow-xl: 0px 8px 8px rgba(16, 24, 40, 0.03), 0px 20px 24px rgba(16, 24, 40, 0.08);
--shadow-2xl: 0px 24px 48px rgba(16, 24, 40, 0.18);
```

### Spacing Scale

```
0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160 (px)
```

### Border Radius

Default: 8px (radius-md). Scale: 0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 9999px.

### Typography Scale

| Token | Size | Weight | Line Height |
|-------|------|--------|-------------|
| Display 2xl | 72px | 600 | 90px |
| Display xl | 60px | 600 | 72px |
| Display lg | 48px | 600 | 60px |
| Display md | 36px | 600 | 44px |
| Display sm | 30px | 600 | 38px |
| Display xs | 24px | 500/600 | 32px |
| Text xl | 20px | 400/500/600 | 30px |
| Text lg | 18px | 400/500/600 | 28px |
| Text md | 16px | 400/500/600 | 24px |
| Text sm | 14px | 400/500/600 | 20px |
| Text xs | 12px | 400/500 | 18px |

### AI Score Color Tiers

| Range | Color | Label | Usage |
|-------|-------|-------|-------|
| 75-100 | Success/600 #099250 | Strong Fit | Green badge/text |
| 50-74 | Brand/600 #7F56D9 | Good Fit | Purple badge/text |
| 30-49 | Warning/600 #CA8504 | Needs Review | Amber badge/text |
| 0-29 | Error/600 #E31B54 | Not Fit | Red badge/text |

### AI Content Zone

Background: Brand/25 (#FCFAFF) with left border Brand/200 (#E9D7FE). Used wherever AI-generated content is displayed.

---

## Data Models (TypeScript Interfaces)

```typescript
// Enums
type JobStatus = "active" | "draft" | "closed";
type CandidateStage = "applied" | "ai_screened" | "shortlisted" | "assessment" | "interview_scheduled" | "interview_done" | "offer" | "hired" | "rejected";
type ScoreTier = "strong" | "good" | "review" | "not_fit";
type ScreeningStatus = "processing" | "complete" | "failed";
type AssessmentType = "coding" | "system_design" | "design_brief" | "portfolio_review";
type RuleType = "hard_filter" | "auto_shortlist" | "auto_assessment" | "ai_content_flag" | "sla_alert";
type MessageDirection = "sent" | "received";
type UrgencyLevel = "critical" | "warning" | "info";

// Core Entities
interface Job {
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

interface Candidate {
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

interface Skill {
  name: string;
  matched: "full" | "partial" | "missing";
  required: boolean;
}

interface CareerEntry {
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
}

interface ResumeAnalysis {
  qualityScore: number;
  trajectoryAnalysis: string;
  redFlags: { text: string; context: string }[];
  recommendation: "shortlist" | "consider" | "skip";
  recommendationReasoning: string;
}

interface PortfolioAnalysis {
  overallScore: number;
  tier: "exceptional" | "strong" | "moderate" | "weak";
  websiteMetrics: { loadSpeed: number; mobileResponsive: boolean; brokenLinks: number; accessibilityScore: number };
  dimensions: { visualDesign: number; uxThinking: number; caseStudyClarity: number; businessImpact: number; processDocumentation: number };
  projects: { title: string; score: number; strength: string; gap: string }[];
  toolsDetected: string[];
  comparativeRank: { rank: number; total: number };
}

interface TechnicalProfile {
  githubUsername: string;
  contributionData: number[]; // 52 weeks of contribution counts
  languages: { name: string; percent: number; color: string }[];
  topRepos: { name: string; stars: number; description: string; language: string }[];
  codeQuality: { readme: number; commenting: number; structure: number };
  techStack: { primary: string[]; secondary: string[] };
}

interface AiContentAnalysis {
  overallPercent: number;
  sections: { name: string; score: number; confidence: number }[];
  flaggedExcerpts: { text: string; confidence: number }[];
  overrideStatus: "pending" | "acceptable" | "concern" | null;
}

interface FitAssessment {
  requirements: { criterion: string; status: "met" | "partial" | "not_met"; evidence: string; isRequired: boolean }[];
  aiRecommendation: string;
  biasCheckPassed: boolean;
}

interface ScreeningBatch {
  id: string;
  jobId: string;
  jobTitle: string;
  candidateCount: number;
  status: ScreeningStatus;
  startedAt: string;
  durationMs: number;
  results: { candidateId: string; candidateName: string; score: number; verdict: ScoreTier; flags: string[] }[];
}

interface ScreeningRule {
  id: string;
  type: RuleType;
  condition: string; // Human-readable condition
  action: string; // Human-readable action
  enabled: boolean;
}

interface Thread {
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

interface Message {
  id: string;
  direction: MessageDirection;
  content: string;
  sentAt: string;
  isAiDraft: boolean;
}

interface EmailTemplate {
  id: string;
  title: string;
  category: "acknowledgment" | "shortlist" | "assessment_invite" | "rejection" | "interview" | "offer";
  subject: string;
  body: string;
}

interface AriaMessage {
  id: string;
  role: "user" | "aria";
  content: string;
  timestamp: string;
  embeddedCards?: AriaCard[];
  requiresConfirmation?: boolean;
  confirmed?: boolean;
}

interface AriaCard {
  type: "candidate" | "stat" | "action_confirm" | "link";
  data: Record<string, unknown>;
}

interface DashboardStats {
  healthScore: number;
  activeJobs: { value: number; delta: number; deltaPercent: number };
  pipelineCandidates: { value: number; newToday: number };
  avgTTH: { value: number; benchmark: number; deltaPercent: number };
  avgCPH: { value: number; target: number; deltaPercent: number };
}

interface PipelineStage {
  name: string;
  key: CandidateStage;
  count: number;
  conversionPercent: number;
}

interface UrgentAction {
  id: string;
  urgency: UrgencyLevel;
  icon: string;
  description: string;
  timeAgo: string;
  actionLabel: string;
  actionUrl: string;
}

interface TeamActivityEntry {
  userId: string;
  userName: string;
  avatarUrl: string | null;
  action: "viewed" | "commented" | "rated";
  comment?: string;
  rating?: number;
  timestamp: string;
}

interface ActivityFeedItem {
  id: string;
  description: string;
  timestamp: string;
  actionLabel: string;
  actionUrl: string;
}
```

---

## Project Structure

```
wisehire/
├── app/
│   ├── layout.tsx                    # Root: Inter font, providers, metadata
│   ├── globals.css                   # Untitled UI tokens, Tailwind config
│   ├── (auth)/
│   │   ├── layout.tsx                # Centered layout, no sidebar
│   │   └── login/page.tsx            # Login page
│   ├── (dashboard)/
│   │   ├── layout.tsx                # Sidebar + main area + ARIA
│   │   ├── page.tsx                  # Dashboard
│   │   ├── jobs/
│   │   │   ├── page.tsx              # Jobs list (tabs: Active/Draft/Closed/All)
│   │   │   ├── new/page.tsx          # AI job creation (4-step wizard)
│   │   │   └── [id]/page.tsx         # Job detail
│   │   ├── candidates/
│   │   │   ├── page.tsx              # Candidate list/grid
│   │   │   ├── pipeline/page.tsx     # Kanban pipeline view
│   │   │   └── [id]/page.tsx         # Candidate profile (6 tabs)
│   │   ├── screening/
│   │   │   └── page.tsx              # AI screening queue + rules
│   │   ├── communications/
│   │   │   └── page.tsx              # Inbox + templates
│   │   └── settings/
│   │       └── page.tsx              # Company settings
├── components/
│   ├── ui/                           # shadcn/ui primitives (customized)
│   ├── layout/
│   │   ├── sidebar.tsx               # Main sidebar navigation
│   │   ├── mobile-nav.tsx            # Bottom navigation bar (<768px)
│   │   ├── header.tsx                # Page header with breadcrumb
│   │   └── aria-panel.tsx            # ARIA floating button + panel
│   ├── dashboard/
│   │   ├── health-score.tsx          # Circular health score widget
│   │   ├── stat-card.tsx             # Metric card with delta
│   │   ├── pipeline-funnel.tsx       # Recharts funnel visualization
│   │   ├── aria-feed.tsx             # AI activity feed
│   │   ├── top-candidates.tsx        # AI-surfaced candidate cards
│   │   └── urgent-actions.tsx        # Time-sensitive action items
│   ├── jobs/
│   │   ├── job-card.tsx              # Job listing card
│   │   ├── job-creation-wizard.tsx   # 4-step AI job creation
│   │   ├── jd-editor.tsx             # Rich JD editor with AI sections
│   │   └── screening-weights.tsx     # Weight slider controls
│   ├── candidates/
│   │   ├── candidate-card.tsx        # Candidate grid card
│   │   ├── candidate-table.tsx       # Table view
│   │   ├── kanban-board.tsx          # Drag-and-drop pipeline
│   │   ├── kanban-column.tsx         # Pipeline column
│   │   ├── kanban-card.tsx           # Compact pipeline card
│   │   ├── candidate-profile.tsx     # Full profile container
│   │   ├── tabs/
│   │   │   ├── overview-tab.tsx      # Tab 1: Overview + AI verdict
│   │   │   ├── resume-tab.tsx        # Tab 2: Resume analysis
│   │   │   ├── ai-content-tab.tsx    # Tab 3: AI content detection
│   │   │   ├── portfolio-tab.tsx     # Tab 4: Portfolio analysis
│   │   │   ├── technical-tab.tsx     # Tab 5: Technical profile
│   │   │   └── fit-tab.tsx           # Tab 6: Fit assessment
│   │   ├── compare-view.tsx          # Side-by-side comparison
│   │   └── score-badge.tsx           # Color-coded AI score badge
│   ├── screening/
│   │   ├── screening-queue.tsx       # Batch screening table
│   │   └── rules-builder.tsx         # Screening rules config
│   ├── communications/
│   │   ├── inbox.tsx                 # Conversation list + thread
│   │   └── template-library.tsx      # Email template cards
│   └── shared/
│       ├── ai-content-zone.tsx       # Purple-tinted AI content wrapper
│       ├── score-ring.tsx            # Circular score visualization
│       ├── skill-tag.tsx             # Editable skill badge
│       ├── stage-badge.tsx           # Pipeline stage indicator
│       ├── trend-indicator.tsx       # Up/down arrow with delta
│       └── filter-sidebar.tsx        # Reusable filter panel
├── lib/
│   ├── mock-data.ts                  # All mock entities
│   ├── types.ts                      # TypeScript interfaces
│   ├── utils.ts                      # cn(), score tier helpers
│   └── constants.ts                  # Score tiers, stage names, nav items
```

---

## Module Specifications

### App Shell

**Sidebar**:
- Desktop (≥1280px): 240px expanded, toggle to 64px collapsed
- Tablet (768–1279px): 64px icon-only by default
- Mobile (<768px): hidden, replaced by bottom nav
- Toggle button at bottom of sidebar (desktop only)
- Top: Logo ("WiseHire" in Display xs/Semibold) + workspace name (Text sm, Gray/500)
- Nav items: icon (20px Lucide) + label (Text sm/Medium)
- Default state: Gray/700 text
- Hover: Gray/50 bg
- Active: Brand/50 bg, Brand/700 text, Brand/600 left border (3px)
- Bottom section: user avatar + name + settings gear icon
- Collapsed: icons only, labels hidden, tooltips on hover

**Navigation items**:
1. Dashboard (LayoutDashboard)
2. Jobs (Briefcase)
3. Candidates (Users)
4. AI Screening (ScanSearch)
5. Assessments (ClipboardCheck) — placeholder page
6. Interviews (Video) — placeholder page
7. Reports (BarChart3) — placeholder page
8. Communications (MessageSquare)
9. Settings (Settings)

**Mobile bottom nav (<768px)**:
- Fixed bottom, 5 items: Dashboard, Jobs, Candidates, Screening, More (ellipsis menu for rest)
- Active: Brand/600 icon + label
- Height: 64px with safe area padding

**Header**:
- Breadcrumb (Text sm, Gray/500 → Gray/900 for current)
- Page title (Display xs/Semibold, Gray/900)
- Right: notification bell (placeholder — shows bell icon with red dot badge, dropdown not functional in Phase 1) + user avatar dropdown (name, email, Sign Out link)

**ARIA floating button**:
- Position: fixed, bottom-right (24px offset, above mobile nav on mobile)
- Size: 56px circle
- Style: Brand/600 bg, white Sparkles icon, shadow-lg
- Hover: Brand/700 bg, translateY(-1px)
- Click: opens ARIA panel

**ARIA panel**:
- Width: 400px, slides from right edge
- Full viewport height
- Header: "ARIA" (Text lg/Semibold) + X close button
- Body: scrollable chat messages
- User messages: right-aligned, Brand/50 bg, rounded-lg
- ARIA messages: left-aligned, white bg, Gray/200 border, rounded-lg
- ARIA can embed cards (candidate cards, stat summaries, action confirmations)
- Confirmation: inline confirm/cancel for destructive actions
- Input: fixed bottom, text field + send button
- Mobile: full-screen modal instead of side panel
- Mock responses from predefined response map

---

### Module 01 — Dashboard

**Route:** `/(dashboard)/page.tsx`

**Row 1 — Health Score + Stats** (grid: 1fr 3fr on desktop, stack on mobile):

Left: Health Score widget
- Circular SVG ring, 120px diameter
- Score number center (Display sm/Semibold)
- Color: success(70-100), warning(40-69), error(0-39) — note: Health Score uses different thresholds than AI Fit Score tiers (75/50/30) because it measures pipeline health, not candidate fit
- Label below: "Hiring Health" (Text sm/Medium, Gray/600)
- Mock value: 74

Right: 4 stat cards (grid-cols-4 desktop, grid-cols-2 mobile)
- Each card: white bg, shadow-xs, rounded-lg, p-6
- Eyebrow: Text xs/Medium, Gray/500, uppercase
- Value: Display xs/Semibold, Gray/900
- Delta: trend indicator (green up arrow + "12%" or red down arrow + "5%")
- Mock data: Active Jobs: 12 (+3), Pipeline: 847 (+47 today), TTH: 32 days (-8%), CPH: $21.4k (-12%)

**Row 2 — Pipeline Funnel + ARIA Feed** (grid: 3fr 2fr):

Pipeline Funnel:
- Card container with "Pipeline Overview" header
- Recharts horizontal bar/funnel chart
- Stages: Applied(342) → Screened(186) → Shortlisted(67) → Assessment(31) → Interview(18) → Offer(8) → Hired(4)
- Conversion % between each stage
- Brand/100-600 gradient across bars

ARIA Activity Feed:
- Card container with "ARIA Activity" header + "View All" link
- Scrollable list, max 5 items visible
- Each item: Brand/25 left border, timestamp (Text xs, Gray/400), description (Text sm, Gray/700), action link (Text sm/Medium, Brand/600)
- Mock items: screening completions, portfolio analyses, content flags

**Row 3 — Top Candidates + Urgent Actions** (grid: 3fr 2fr):

Top Candidates:
- "Top Candidates" header + "View All" link
- 3 candidate cards (white bg, shadow-xs, rounded-lg, p-4)
- Each: avatar, name (Text sm/Semibold), role (Text xs, Gray/500), AI Score badge, 3 skill tags, quick action buttons (View, Send Assessment)

Urgent Actions:
- "Needs Attention" header
- Color-coded list items with left border
- Red: offers expiring, SLA breaches
- Amber: overdue assessments, pending reviews
- Blue: new high-scoring candidates
- Each: icon, description (Text sm), time (Text xs, Gray/400), action button

---

### Module 02 — Jobs

**Route:** `/(dashboard)/jobs/page.tsx`

**List View**:
- Tab filters: Active / Draft / Closed / All (shadcn Tabs)
- Action bar: search input + filter dropdown + "Create Job" primary button
- Card grid (grid-cols-3 desktop, grid-cols-2 tablet, grid-cols-1 mobile)
- Each card (shadow-xs, rounded-lg, p-5):
  - Title (Text md/Semibold, Gray/900)
  - Department badge + location (Text sm, Gray/500)
  - Stat row: applicants count, days open
  - TTH progress bar (Brand/600 fill)
  - Status badge: Active (green), Draft (gray), Closed (gray dark)
  - Hover: shadow-sm transition
- Mock: 8 jobs (mix of design and tech roles)

**New Job — AI Creation Flow**:

**Route:** `/(dashboard)/jobs/new/page.tsx`

Step indicator: horizontal 4-step bar at top (numbered circles + labels, Brand/600 for completed, Gray/300 for upcoming)

Step 1 — Intent:
- Clean centered layout, max-width 640px
- Heading: "What role are you hiring for?" (Display xs/Semibold)
- Subheading: "Describe the role in plain language. AI will generate everything." (Text md, Gray/500)
- Large textarea (min-height 160px, shadow-sm)
- "Generate with AI" primary button below
- On click: loading state (shimmer animation), then transition to Step 2

Step 2 — Review JD:
- AI-generated content in AI content zone (Brand/25 bg, Brand/200 left border)
- Sections: Title, Summary, Responsibilities (bullets), Must-haves, Nice-to-haves, Salary Range
- Each section: editable inline on click
- Right sidebar: Tone selector (Formal/Balanced/Casual dropdown), Screening weight sliders (Portfolio/Experience/Skills/Culture), Skills as editable tags
- "Continue" button

Step 3 — Configuration:
- Standard form layout (max-width 640px)
- Fields: Department (select), Location (select), Remote policy (radio), Hiring manager (select), Deadline (date picker), Channels (checkbox group: LinkedIn, Naukri, Indeed, Career Page), Auto-screening toggle
- All shadcn/ui form components

Step 4 — Publish:
- Preview card showing how the job will appear
- Channel summary
- "Publish Job" primary button + "Save as Draft" secondary button

**Job Detail**:

**Route:** `/(dashboard)/jobs/[id]/page.tsx`

Header section:
- Job title (Display xs/Semibold) + status badge (Active green / Draft gray / Closed dark gray)
- Department + location + remote policy (Text sm, Gray/500)
- Action buttons: Edit (secondary), Pause (secondary), Clone (ghost), Share (ghost)
- Stat row: 4 inline stats — Applicants (count), Days Open, TTH Progress (bar), Screening Active (badge)

Tab navigation (shadcn Tabs):

**Pipeline tab**:
- Mini funnel: horizontal Recharts bar chart showing stage counts for this job only
- Below funnel: candidate cards grouped by stage, using `kanban-card.tsx` component
- Each stage section: collapsible, stage header with count
- Quick action on each card: "View Profile" opens candidate drawer

**Activity tab**:
- Chronological event log (vertical timeline)
- Event types: Job Published, Application Received, AI Screening Complete, Candidate Moved, Assessment Sent, Interview Scheduled, Offer Made
- Each event: icon (Lucide), description (Text sm), timestamp (Text xs, Gray/400), actor name
- Paginated: show 20 events, "Load more" button
- Mock: 15 events for the demo job

**Screening Rules tab**:
- Reuses `rules-builder.tsx` component, pre-filled with rules for this job
- Read/edit mode: displays current rules, "Edit Rules" button switches to edit mode
- Changes saved per job (mock — toast confirms save)

**Sources tab**:
- Bar chart: applications per source channel (LinkedIn, Naukri, Indeed, Referral, Career Page)
- Table: Source, Applications, Avg Score, Shortlisted %, Cost
- Best performing source highlighted with green indicator
- Mock: 5 sources with varied performance

Mock data: 1 fully populated job ("Senior Product Designer") with all 4 tabs complete

---

### Module 03 — Candidates

**Route:** `/(dashboard)/candidates/page.tsx`

**List View**:
- Toggle: Grid / Table view (icon buttons in header)
- Left filter sidebar (240px, collapsible on mobile):
  - Score range slider (0-100)
  - Stage multi-select checkboxes
  - Role dropdown
  - Experience level radio
  - AI Content flag toggle
  - Portfolio available toggle
  - "Clear Filters" link
- Grid view: cards (grid-cols-3 desktop, grid-cols-2 tablet, grid-cols-1 mobile)
  - Avatar (40px), name (Text sm/Semibold), role (Text xs, Gray/500)
  - AI Fit Score badge (color-coded)
  - AI Content flag icon (Warning triangle, Error/500) if hasAiContentFlag is true
  - 3 skill tags (gray badges)
  - Stage badge + date (Text xs, Gray/400)
- Table view: sortable columns — Name, Role, Score, Stage, Applied, Skills, Actions
- Bulk action bar: appears when checkboxes selected — "Send Assessment", "Move Stage", "Reject", "Export"
- Mock: 24 candidates across various roles and score ranges

**Kanban Pipeline**:

**Route:** `/(dashboard)/candidates/pipeline/page.tsx`

- Horizontal scrollable board
- Columns: Applied, AI Screened, Shortlisted, Assessment, Interview Scheduled, Interview Done, Offer, Hired, Rejected
- Each column: header (stage name + count + SLA badge if overdue), scrollable card list
- Cards: compact (name, score badge, role, days in stage, AI content flag icon if flagged)
- Drag-and-drop: @hello-pangea/dnd (chosen for keyboard accessibility and mobile touch)
- On drop: stage updates, toast notification
- Mobile: horizontal tab bar for stages, one column visible at a time
- Mock: distribute the 24 candidates across stages

**Candidate Profile**:

**Route:** `/(dashboard)/candidates/[id]/page.tsx`

Also available as 480px right drawer (opened from list/kanban views).

Header:
- Avatar (64px), name (Display xs/Semibold), current role + company (Text md, Gray/500)
- Location, applied date (Text sm, Gray/400)
- AI Fit Score: large circle (80px), color-coded
- Verdict chip: badge with icon and label
- Quick action bar: Move Stage (dropdown), Send Assessment, Schedule Interview, Reject, Add to Pool

Tab navigation (shadcn Tabs, scrollable on mobile):

**Tab 1 — Overview**:
- AI Fit Score section (large ring + verdict + 3-sentence AI summary in AI content zone)
- Quick Stats row: Years exp, Portfolio score, Assessment score (if available)
- Matched skills: horizontal bar showing % match
- Team activity: avatars of who viewed, recent comments
- Timeline: application events in chronological order

**Tab 2 — Resume Analysis**:
- Career timeline: vertical timeline component (company, role, duration, logo placeholder)
- Skills match: horizontal bars per skill (green matched, amber partial, gray missing)
- AI analysis in AI content zone: career trajectory paragraph, red flags with context
- Resume quality score: small progress bar
- AI Recommendation: badge + paragraph

**Tab 3 — AI Content Detection**:
- Overall score: circular gauge (0-100%)
- Warning banner: "A high score may reflect AI-assisted drafting. It does not indicate fabrication."
- Section breakdown: table (Section, Score, Confidence)
- Highlighted excerpts: quoted text with yellow bg highlight + confidence badge
- Override buttons: "Reviewed — Acceptable" (outlined green) / "Reviewed — Concern" (outlined red)

**Tab 4 — Portfolio Analysis**:
- Website metrics: 4 mini stat cards (Load speed, Mobile responsive, Broken links, Accessibility)
- Radar chart: 5 dimensions (Recharts RadarChart)
- Aggregate score: large number + tier label
- Project cards: per case study (thumbnail placeholder, title, score, key strength, key gap)
- Tools detected: icon badges (Figma, Framer, etc.)
- Comparative rank: "Ranked 3rd of 24 candidates"

**Tab 5 — Technical Profile**:
- GitHub contribution heatmap (CSS grid, green shades)
- Language breakdown: horizontal stacked bar chart
- Top repos: list cards (repo name, stars, AI summary, primary language badge)
- Code quality: progress bars (README, Comments, Structure)
- Tech stack: grouped badge list (Primary / Secondary)

**Tab 6 — Fit Assessment**:
- Requirements table: rows per criterion, columns: Criterion, Status (Met/Partial/Not Met icon), Evidence
- Must-haves separated from nice-to-haves visually
- AI recommendation: AI content zone with 3-4 sentence synthesis
- Bias check: success alert — "Evaluation criteria applied consistently with all candidates for this role"

**Compare Mode** (pulled forward from PRD Phase 2 — included in MVP due to high value for hiring manager workflows):
- Select 2-4 candidates
- Full-width comparison table
- One column per candidate (avatar + name header)
- Rows: AI Fit Score, Portfolio Score, Assessment Score, Years Exp, Skills Match %, Key Skills, AI Content %, Recommendation
- Best value per row: green highlight
- Export as PDF button

---

### Module 04 — AI Screening

**Route:** `/(dashboard)/screening/page.tsx`

- Tabs: Queue / Rules
- Queue tab: table of screening batches
  - Columns: Job, Candidates, Status (badge: Processing/Complete/Failed), Started, Duration, Actions
  - Expandable rows: show per-candidate results (name, score, verdict, flags)
  - "Run Screening" button to trigger manual batch
- Rules tab: per-job-type rule configuration
  - Rule cards: condition (dropdowns + inputs) → action (dropdown)
  - Rule types: Hard Filter, Auto-Shortlist, Auto-Send Assessment, AI Content Flag, SLA Alert
  - Add/remove/reorder rules
  - Save per job or as company default
- Mock: 3 completed batches with results, 5 pre-configured rules

---

### Module 05 — Communications

**Route:** `/(dashboard)/communications/page.tsx`

- Two-panel layout (email client style)
- Left panel (320px): conversation list
  - Each: avatar, candidate name, last message preview, timestamp, unread dot
  - Filter: All / Unread / Starred
- Right panel: thread view
  - Header: candidate name + role + stage badge
  - Messages: chronological, sent (right, Brand/50 bg) / received (left, white bg)
  - Compose: rich text editor with personalization tokens dropdown
  - "AI Draft" button: generates contextual email draft in AI content zone for review
- **Bulk send flow**: accessible from candidate list (bulk action bar → "Reject" or "Send Assessment")
  - Step 1: shows selected candidates count and selected template
  - Step 2: AI generates personalized versions (each with {candidate_name}, {role_title} filled, plus AI-written context)
  - Step 3: preview carousel of personalized emails
  - Step 4: "Send All" confirmation with count
  - Toast: "Sent 23 rejection emails" with undo (60 seconds)
- Templates sub-tab: grid of template cards
  - Categories: Acknowledgment, Shortlist, Assessment Invite, Rejection, Interview, Offer
  - Each card: title, category badge, preview text, "Use" / "Edit" buttons
- Mock: 8 conversations, 6 templates

---

### ARIA Agent Panel

Accessible from every page via floating button.

**Panel structure**:
- Header: ARIA label + "New Chat" button + close X
- Messages area: scrollable
- Pre-populated welcome message: "Hi! I'm ARIA, your recruitment assistant. Ask me anything or give me a command."
- Suggested commands (chips): "Screen candidates", "Show top candidates", "Draft rejection email"
- User messages: right-aligned, Brand/50 bg, rounded-xl
- ARIA responses: left-aligned, white bg, border Gray/200, rounded-xl
- ARIA can render:
  - Text paragraphs
  - Inline candidate cards (compact)
  - Inline stat cards
  - Action confirmations with confirm/cancel buttons
  - Links to platform pages
- Input: sticky bottom, text field (placeholder: "Ask ARIA anything...") + send icon button
- Loading state: typing indicator (3 animated dots)

**Mock command→response map** (minimum set):
- "Show top candidates" → 3 inline candidate cards with name, score, role, quick actions
- "Screen all candidates for [job]" → confirmation card → "Screened 47 candidates. 9 shortlisted." + summary
- "Draft rejection email for [name]" → AI content zone with editable email draft
- "What's our average TTH?" → inline stat card (value + trend + benchmark)
- "Compare top 3 for product designer" → link card navigating to comparison view
- "Post a job for a senior React developer" → "I'll create a job posting for Senior React Developer. Let me set that up." + link to /jobs/new with pre-filled intent
- "Which jobs have been open more than 30 days?" → filtered job list (2 job cards with TTH highlighted)

---

## Login Page

**Route:** `/(auth)/login/page.tsx`

Visual-only (no real auth in Phase 1). Centered card layout.

- Full viewport, Gray/25 background
- Centered card (max-width 400px, white bg, shadow-lg, rounded-xl, p-8)
- Top: WiseHire logo + "Welcome back" (Display xs/Semibold) + "Sign in to your account" (Text sm, Gray/500)
- Fields: Email input + Password input (shadcn Input, standard styling)
- "Remember me" checkbox + "Forgot password?" link
- "Sign in" primary button (full width)
- Divider: "or continue with"
- SSO buttons: Google + Microsoft (secondary buttons, full width, with icons)
- Bottom: "Don't have an account? Contact sales" link
- On submit: navigates to dashboard (no validation needed in Phase 1)

---

## Search

Client-side search filtering across mock data. Appears in Jobs and Candidates list views.

**Search input**:
- Left icon: Search (Lucide), Gray/400
- Placeholder: "Search jobs..." or "Search candidates..."
- Clear button (X) appears when text is entered
- Width: 320px on desktop, full-width on mobile
- Debounced: 300ms delay before filtering

**Jobs search**: matches against job title, department, location, hiring manager name
**Candidates search**: matches against candidate name, role, company, skills

---

## Empty States

Every major view has a defined empty state:

| View | Illustration | Heading | Subheading | CTA |
|------|-------------|---------|------------|-----|
| Dashboard (no jobs) | Briefcase icon (64px, Gray/300) | "No active jobs yet" | "Create your first job posting to start building your pipeline." | "Create Job" primary button |
| Jobs list | Briefcase icon | "No jobs found" | "Create a new job posting or adjust your filters." | "Create Job" |
| Candidates list | Users icon | "No candidates yet" | "Candidates will appear here once applications come in." | — |
| Kanban (no candidates) | Columns icon | "Pipeline is empty" | "Move candidates through stages as they progress." | — |
| Screening queue | ScanSearch icon | "No screening batches" | "Screening will begin automatically when candidates apply." | "Run Screening" |
| Communications inbox | MessageSquare icon | "No conversations" | "Conversations will appear here as you communicate with candidates." | — |
| ARIA (fresh state) | Welcome message only | — | — | Suggested command chips |

Empty state layout: centered vertically, icon + heading (Text lg/Semibold, Gray/900) + subheading (Text sm, Gray/500) + optional CTA button.

---

## Interaction States

### Loading States
- Page-level: skeleton loaders matching the page layout (shimmer animation, Gray/100 blocks)
- Button loading: spinner icon replaces label, button disabled
- ARIA response: 3 animated dots in a chat bubble
- AI generation (Job wizard Step 1→2): full-card shimmer with "AI is generating your job description..." text

### Validation (Job Creation Wizard)
- Step 1: "Generate with AI" disabled until textarea has >20 characters. Error: "Please describe the role in more detail."
- Step 3: required fields (Department, Location, Hiring Manager) show red border + error text if empty on "Continue"
- All form inputs: standard shadcn/ui error state (Error/500 border, error message below)

### Wizard Navigation
- Sequential only: steps unlock as previous steps complete
- Back button available on steps 2-4
- Step indicator shows completed (Brand/600 check), current (Brand/600 filled), upcoming (Gray/300 outline)
- Data persists in React state across steps (lost on page leave — acceptable for Phase 1)

### Kanban Drag-and-Drop
- Valid drop: column header turns Brand/50 bg, dashed Brand/300 border on drop zone
- Invalid drop: no visual feedback, card snaps back to origin
- Stage transition rules (Phase 1): all transitions allowed (no restrictions)
- On successful drop: sonner toast "Moved [name] to [stage]"

### Screening Rules Builder
- Add rule: "Add Rule" button appends new empty rule card with dropdowns
- Delete rule: trash icon on rule card, requires click confirm (small inline "Delete? Yes / No")
- Reorder: drag handle on left side of rule card using @hello-pangea/dnd
- Save: "Save Rules" button, toast on success

### Error States
- API errors (Phase 1 — mock): not applicable, all data is client-side
- Empty search results: "No results for '[query]'. Try a different search term." (centered, Text sm, Gray/500)

---

## Accessibility

### Keyboard Navigation
- All interactive elements reachable via Tab
- Sidebar: arrow keys navigate items, Enter activates
- Kanban board: Tab moves between columns, arrow keys move between cards within a column, Space/Enter picks up card, arrow keys move card between columns, Space/Enter drops
- ARIA panel: Escape closes panel, focus trapped inside when open, Tab cycles through messages and input
- Modal/drawer: focus trapped, Escape closes, focus returns to trigger element on close
- Candidate profile tabs: arrow keys switch tabs

### Focus Management
- ARIA panel open: focus moves to panel input field
- ARIA panel close: focus returns to floating button
- Candidate drawer open: focus moves to drawer header
- Candidate drawer close: focus returns to triggering card/row
- Job wizard step change: focus moves to first interactive element of new step
- Bulk action toast: does not steal focus

### ARIA Attributes
- Score ring: `role="meter"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-label="Hiring Health Score: 74"`
- Pipeline funnel bars: `role="img"`, `aria-label` describing the data
- Stage badges: `aria-label` with stage name and count
- AI content flag icon: `aria-label="AI content flagged"` + `title` tooltip
- Score badges: `aria-label="AI Fit Score: 82 — Strong Fit"`
- Kanban cards: `role="listitem"`, columns: `role="list"` with `aria-label="[stage name] — [count] candidates"`
- Skip navigation: "Skip to main content" link as first focusable element in app shell

### Color Contrast
- All text meets WCAG AA (4.5:1 for normal text, 3:1 for large text)
- Score tier colors on white bg all pass AA: Success/600 on white (5.5:1), Brand/600 on white (4.6:1), Warning/600 on white (4.8:1), Error/600 on white (4.7:1)
- Gray/500 (#667085) on white: 4.6:1 — passes AA for normal text

---

## Responsive Design

### Breakpoints
- Mobile: <768px
- Tablet: 768px–1279px
- Desktop: ≥1280px

### Behavior per breakpoint

| Component | Desktop (≥1280) | Tablet (768-1279) | Mobile (<768) |
|-----------|-----------------|-------------------|---------------|
| Sidebar | 240px expanded | 64px icon-only | Hidden; bottom nav instead |
| Bottom nav | Hidden | Hidden | 64px fixed bottom, 5 items + more |
| Page header | Full breadcrumb + title | Title only | Title only, smaller |
| Dashboard stats | 4-col grid | 2-col grid | 2-col grid |
| Dashboard rows | 2-col (3fr 2fr) | 2-col (1fr 1fr) | Single column stack |
| Job cards | 3-col grid | 2-col grid | Single column |
| Candidate cards | 3-col grid | 2-col grid | Single column |
| Kanban | Horizontal scroll all columns | Horizontal scroll | Tab bar + single column |
| Candidate profile | 480px drawer or full page | Full page | Full page |
| Profile tabs | Horizontal tab bar | Horizontal scrollable | Horizontal scrollable |
| Filter sidebar | 240px left panel | Collapsible overlay | Full-screen sheet |
| ARIA panel | 400px right panel | 400px right panel | Full-screen modal |
| Communications | 2-panel (320px + rest) | 2-panel (240px + rest) | Single panel, back nav |
| Compare view | Side-by-side columns | Horizontal scroll | Horizontal scroll |

---

## Mock Data Requirements

### Candidates (24 total)
- Mix: 12 design roles, 12 tech roles
- Score distribution: 4 Strong (75-100), 8 Good (50-74), 8 Review (30-49), 4 Not Fit (0-29)
- Each with: name, avatar placeholder, role, company, location, skills[], AI fit score, portfolio score (design), github stats (tech), AI content %, stage, applied date, career timeline[], resume analysis, AI summary
- 3 candidates fully fleshed out for profile demo (all 6 tabs populated)

### Jobs (8 total)
- Mix: 4 design, 4 tech
- Statuses: 5 active, 2 draft, 1 closed
- Each with: title, department, location, remote policy, applicants count, days open, TTH, status, description sections, screening rules

### ARIA conversations (5)
- Pre-built command/response pairs demonstrating core capabilities

### Communications (8 threads, 6 templates)
- Realistic email threads at various pipeline stages
- Templates for each communication type

---

## Out of Scope (Phase 1)

- Real AI/LLM integration (all AI outputs are mock data)
- Authentication/authorization (login page is visual only)
- Backend API / database
- Assessments module (placeholder page only)
- Interviews module (placeholder page only)
- Reports module (placeholder page only)
- Settings module (placeholder page only)
- Real email sending
- Real calendar integration
- File upload
- Real drag-and-drop persistence
- Real-time updates / WebSockets
- Native mobile app
- Candidate Portal (public-facing candidate status page)
- Dark mode
- Notification system (bell icon is placeholder only)

---

## Success Criteria

1. All 9 navigation items render their respective pages
2. Dashboard displays all 4 zones with mock data and is fully responsive
3. Jobs list renders with tab filtering and search; AI creation wizard completes all 4 steps
4. Candidates grid/table toggle works; Kanban board renders with draggable cards; Profile opens with all 6 tabs populated
5. AI Screening queue table renders with expandable rows; Rules builder allows add/edit/remove
6. Communications two-panel inbox works; Templates are browsable
7. ARIA panel opens/closes from floating button; Mock commands produce responses
8. All views are responsive at mobile/tablet/desktop breakpoints
9. Design tokens match Untitled UI exactly (colors, typography, spacing, shadows, radius)
10. No accessibility violations (proper contrast, keyboard nav, semantic HTML)
