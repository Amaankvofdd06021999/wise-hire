# HireAI MVP Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete HireAI MVP frontend — a fully interactive hiring platform with 7 modules, ARIA AI agent panel, and comprehensive mock data, using Next.js 16 + React 19 + Tailwind 4 + shadcn/ui with Untitled UI design tokens.

**Architecture:** Next.js App Router with route groups `(auth)` and `(dashboard)`. All data is client-side mock. shadcn/ui components customized with Untitled UI PRO v4.0 tokens. Responsive at mobile (<768px), tablet (768-1279px), and desktop (>=1280px).

**Tech Stack:** Next.js 16, React 19, TypeScript 5.7+, Tailwind CSS 4, shadcn/ui (Radix), Lucide React, Recharts 2.15+, @hello-pangea/dnd, sonner (toasts)

**Spec:** `docs/superpowers/specs/2026-03-16-hireai-mvp-design.md`

**Note on testing:** This is a frontend-only MVP with mock data and no backend. Traditional TDD does not apply. Each task verifies by running `npm run dev` and confirming the page renders correctly. `npm run build` is run at chunk boundaries to catch type errors.

---

## Chunk 1: Foundation — Project Setup, Tokens, Types, Mock Data

### Task 1: Scaffold Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `tailwind.config.ts` (all via `create-next-app`)

- [ ] **Step 1: Create Next.js 16 project**

```bash
cd /Users/amaan/Documents/Happening/HappeningX/WiseHire
npx create-next-app@latest wisehire --typescript --tailwind --eslint --app --src=false --import-alias "@/*" --use-npm
```

Select: App Router=Yes, src/=No, Tailwind=Yes, import alias=@/*

- [ ] **Step 2: Install dependencies**

```bash
cd wisehire
npm install @hello-pangea/dnd recharts sonner lucide-react @radix-ui/react-slot @radix-ui/react-tabs @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-checkbox @radix-ui/react-radio-group @radix-ui/react-slider @radix-ui/react-tooltip @radix-ui/react-popover @radix-ui/react-scroll-area @radix-ui/react-separator @radix-ui/react-toggle @radix-ui/react-avatar @radix-ui/react-progress @radix-ui/react-switch class-variance-authority clsx tailwind-merge date-fns
```

- [ ] **Step 3: Initialize shadcn/ui**

```bash
npx shadcn@latest init
```

Select: Style=Default, Base color=Slate, CSS variables=Yes. Then install core components:

```bash
npx shadcn@latest add button input badge tabs card table dialog sheet dropdown-menu select checkbox radio-group slider tooltip avatar progress separator scroll-area textarea label popover
```

- [ ] **Step 4: Verify dev server runs**

```bash
npm run dev
```

Open http://localhost:3000 — confirm Next.js default page renders.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: scaffold Next.js 16 project with shadcn/ui and dependencies"
```

---

### Task 2: Design Tokens — globals.css

**Files:**
- Modify: `app/globals.css`

The globals.css file must define all Untitled UI design tokens as CSS variables and override shadcn/ui defaults. This is the foundation every component depends on.

- [ ] **Step 1: Replace globals.css with Untitled UI token system**

Replace the entire contents of `app/globals.css` with:

```css
@import "tailwindcss";

@layer base {
  :root {
    /* === Untitled UI Color Tokens === */
    --brand-25: #FCFAFF;
    --brand-50: #F9F5FF;
    --brand-100: #F4EBFF;
    --brand-200: #E9D7FE;
    --brand-300: #D6BBFB;
    --brand-400: #B692F6;
    --brand-500: #9E77ED;
    --brand-600: #7F56D9;
    --brand-700: #6941C6;
    --brand-800: #53389E;
    --brand-900: #42307D;
    --brand-950: #2C1C5F;

    --gray-25: #FCFCFD;
    --gray-50: #F9FAFB;
    --gray-100: #F2F4F7;
    --gray-200: #EAECF0;
    --gray-300: #D0D5DD;
    --gray-400: #98A2B3;
    --gray-500: #667085;
    --gray-600: #475467;
    --gray-700: #344054;
    --gray-800: #1D2939;
    --gray-900: #101828;
    --gray-950: #0C111D;

    --success-25: #F6FEF9;
    --success-50: #EDFCF2;
    --success-100: #D3F8DF;
    --success-500: #16B364;
    --success-600: #099250;
    --success-700: #087443;

    --warning-25: #FEFDF0;
    --warning-50: #FEFBE8;
    --warning-100: #FEF7C3;
    --warning-500: #EAAA08;
    --warning-600: #CA8504;
    --warning-700: #A15C07;

    --error-25: #FFF5F6;
    --error-50: #FFF1F3;
    --error-100: #FFE4E8;
    --error-500: #F63D68;
    --error-600: #E31B54;
    --error-700: #C01048;

    /* === shadcn/ui variable overrides === */
    --background: var(--gray-25);
    --foreground: var(--gray-900);
    --card: #FFFFFF;
    --card-foreground: var(--gray-900);
    --popover: #FFFFFF;
    --popover-foreground: var(--gray-900);
    --primary: var(--brand-600);
    --primary-foreground: #FFFFFF;
    --secondary: var(--gray-100);
    --secondary-foreground: var(--gray-700);
    --muted: var(--gray-50);
    --muted-foreground: var(--gray-500);
    --accent: var(--brand-50);
    --accent-foreground: var(--brand-700);
    --destructive: var(--error-600);
    --destructive-foreground: #FFFFFF;
    --border: var(--gray-200);
    --input: var(--gray-300);
    --ring: var(--brand-100);
    --radius: 0.5rem;

    /* === Shadows === */
    --shadow-xs: 0px 1px 2px rgba(16, 24, 40, 0.05);
    --shadow-sm: 0px 1px 2px rgba(16, 24, 40, 0.06), 0px 1px 3px rgba(16, 24, 40, 0.1);
    --shadow-md: 0px 2px 4px rgba(16, 24, 40, 0.06), 0px 4px 8px rgba(16, 24, 40, 0.1);
    --shadow-lg: 0px 4px 6px rgba(16, 24, 40, 0.03), 0px 12px 16px rgba(16, 24, 40, 0.08);
    --shadow-xl: 0px 8px 8px rgba(16, 24, 40, 0.03), 0px 20px 24px rgba(16, 24, 40, 0.08);
    --shadow-2xl: 0px 24px 48px rgba(16, 24, 40, 0.18);
  }
}

@layer base {
  * {
    border-color: var(--border);
  }
  body {
    background-color: var(--background);
    color: var(--foreground);
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

/* === Focus ring === */
.focus-ring {
  outline: none;
  box-shadow: 0 0 0 4px var(--brand-100);
}

/* === AI Content Zone === */
.ai-content-zone {
  background-color: var(--brand-25);
  border-left: 3px solid var(--brand-200);
  padding: 16px;
  border-radius: 8px;
}

/* === Score tier colors === */
.score-strong { color: var(--success-600); }
.score-good { color: var(--brand-600); }
.score-review { color: var(--warning-600); }
.score-not-fit { color: var(--error-600); }

.score-bg-strong { background-color: var(--success-50); color: var(--success-700); }
.score-bg-good { background-color: var(--brand-50); color: var(--brand-700); }
.score-bg-review { background-color: var(--warning-50); color: var(--warning-700); }
.score-bg-not-fit { background-color: var(--error-50); color: var(--error-700); }

/* === Skeleton shimmer === */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, var(--gray-100) 25%, var(--gray-50) 50%, var(--gray-100) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
}
```

- [ ] **Step 2: Update root layout with Inter font**

Replace `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "WiseHire — AI-Augmented Hiring Platform",
  description: "AI-native hiring platform for Design & Tech teams",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Verify tokens render**

```bash
npm run dev
```

Open browser, inspect `<html>` — confirm Inter font loads and CSS variables are present in `:root`.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: add Untitled UI design tokens and Inter font"
```

---

### Task 3: TypeScript Types, Constants, and Utilities

**Files:**
- Create: `lib/types.ts`
- Create: `lib/constants.ts`
- Create: `lib/utils.ts`

- [ ] **Step 1: Create lib/types.ts**

Copy the complete Data Models section from the spec (lines 131-357) into `lib/types.ts`. Add `export` to every type and interface. File should contain all types: `JobStatus`, `CandidateStage`, `ScoreTier`, `ScreeningStatus`, `AssessmentType`, `RuleType`, `MessageDirection`, `UrgencyLevel`, `Job`, `Candidate`, `Skill`, `CareerEntry`, `ResumeAnalysis`, `PortfolioAnalysis`, `TechnicalProfile`, `AiContentAnalysis`, `FitAssessment`, `ScreeningBatch`, `ScreeningRule`, `Thread`, `Message`, `EmailTemplate`, `AriaMessage`, `AriaCard`, `DashboardStats`, `PipelineStage`, `UrgentAction`, `TeamActivityEntry`, `ActivityFeedItem`.

- [ ] **Step 2: Create lib/constants.ts**

```typescript
import type { CandidateStage, ScoreTier } from "./types";

export const NAV_ITEMS = [
  { label: "Dashboard", href: "/", icon: "LayoutDashboard" },
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
  { min: 70, max: 100, color: "var(--success-600)", bg: "var(--success-50)" },
  { min: 40, max: 69, color: "var(--warning-600)", bg: "var(--warning-50)" },
  { min: 0, max: 39, color: "var(--error-600)", bg: "var(--error-50)" },
];

export const TEMPLATE_CATEGORIES = [
  "acknowledgment", "shortlist", "assessment_invite", "rejection", "interview", "offer",
] as const;
```

- [ ] **Step 3: Create lib/utils.ts**

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ScoreTier } from "./types";
import { SCORE_TIERS, HEALTH_SCORE_TIERS } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getScoreTier(score: number): (typeof SCORE_TIERS)[number] {
  return SCORE_TIERS.find((t) => score >= t.min && score <= t.max) ?? SCORE_TIERS[3];
}

export function getScoreTierFromKey(tier: ScoreTier): (typeof SCORE_TIERS)[number] {
  return SCORE_TIERS.find((t) => t.tier === tier) ?? SCORE_TIERS[3];
}

export function getHealthScoreTier(score: number): (typeof HEALTH_SCORE_TIERS)[number] {
  return HEALTH_SCORE_TIERS.find((t) => score >= t.min && score <= t.max) ?? HEALTH_SCORE_TIERS[2];
}

export function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ${seconds % 60}s`;
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}
```

- [ ] **Step 4: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add lib/
git commit -m "feat: add TypeScript types, constants, and utility functions"
```

---

### Task 4: Mock Data

**Files:**
- Create: `lib/mock-data.ts`

This file contains all mock entities the entire app depends on. Must conform exactly to the interfaces in `lib/types.ts`.

- [ ] **Step 1: Create lib/mock-data.ts**

Create the file with all mock data per the spec requirements:
- **8 jobs** (4 design, 4 tech; 5 active, 2 draft, 1 closed)
- **24 candidates** (12 design, 12 tech; score distribution: 4 Strong, 8 Good, 8 Review, 4 Not Fit; distributed across pipeline stages)
- **3 fully fleshed candidates** (all 6 tabs populated — one design Strong Fit, one tech Good Fit, one design with AI content flag)
- **Dashboard stats** (healthScore: 74, activeJobs: 12, pipeline: 847, TTH: 32, CPH: $21.4k)
- **Pipeline stages** with counts (Applied:342, Screened:186, Shortlisted:67, Assessment:31, Interview:18, Offer:8, Hired:4)
- **5 activity feed items** (screening completions, portfolio analyses, content flags)
- **5 urgent actions** (2 critical, 2 warning, 1 info)
- **3 screening batches** (2 complete, 1 processing) with results
- **5 screening rules** (one of each type)
- **8 communication threads** with messages
- **6 email templates** (one per category)
- **7 ARIA mock command/response pairs** matching the spec's command map

Each mock entity must use realistic names (Indian + international mix per the GTM target), plausible data, and cover the full range of score tiers and stages.

The 3 fully fleshed candidates must have:
1. **Priya Mehta** — Senior UX Designer, Score 91 (Strong), full portfolio analysis, 2 case studies, tools: Figma/Framer, low AI content (12%)
2. **Alex Chen** — Full Stack Engineer, Score 68 (Good), full technical profile, 5 GitHub repos, languages: TypeScript/Python/Go, moderate AI content (34%)
3. **Riya Sharma** — Product Designer, Score 45 (Review), portfolio analysis moderate, high AI content flag (72%), resume red flags

- [ ] **Step 2: Verify mock data compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add lib/mock-data.ts
git commit -m "feat: add comprehensive mock data for all modules"
```

- [ ] **Step 4: Run build to verify chunk**

```bash
npm run build
```

Expected: build succeeds with no errors.

---

## Chunk 2: App Shell — Layouts, Sidebar, Header, Navigation

### Task 5: Auth Layout and Login Page

**Files:**
- Create: `app/(auth)/layout.tsx`
- Create: `app/(auth)/login/page.tsx`

- [ ] **Step 1: Create auth layout**

`app/(auth)/layout.tsx` — centered layout, no sidebar, Gray/25 bg, flex center vertically and horizontally.

- [ ] **Step 2: Create login page**

`app/(auth)/login/page.tsx` — per spec lines 824-839:
- Max-width 400px card, white bg, shadow-lg, rounded-xl, p-8
- WiseHire logo text (Display xs/Semibold, Brand/600)
- "Welcome back" heading + "Sign in to your account" subheading
- Email + Password inputs (shadcn Input)
- Remember me checkbox + Forgot password link
- "Sign in" primary button (full width) — onClick navigates to `/` via `router.push("/")`
- Divider with "or continue with"
- Google + Microsoft SSO buttons (secondary, full width)
- "Don't have an account? Contact sales" link
- All `"use client"` since it has interactivity

- [ ] **Step 3: Verify login page renders**

Visit `http://localhost:3000/login` — confirm card renders with all fields.

- [ ] **Step 4: Commit**

```bash
git add app/\(auth\)/
git commit -m "feat: add auth layout and login page"
```

---

### Task 6: Sidebar Component

**Files:**
- Create: `components/layout/sidebar.tsx`

- [ ] **Step 1: Create sidebar**

`"use client"` component. Props: none (reads pathname from `usePathname()`).

Structure:
- Outer `<aside>` with responsive width: `w-60` desktop (>=1280), `w-16` tablet (768-1279), `hidden` mobile (<768)
- State: `collapsed` boolean, toggled by button at bottom (desktop only)
- Top section: WiseHire logo + workspace "Amaan's Team" (hidden when collapsed, show tooltip)
- Nav section: map over `NAV_ITEMS` from constants. Each renders a `<Link>` with Lucide icon + label. Active detection via `pathname.startsWith(item.href)` (special case: Dashboard matches exactly `/`).
- Active style: `bg-[var(--brand-50)] text-[var(--brand-700)] border-l-[3px] border-[var(--brand-600)]`
- Default style: `text-[var(--gray-700)] hover:bg-[var(--gray-50)]`
- Collapsed: icons only, labels hidden, `<Tooltip>` on each item
- Bottom: user avatar (hardcoded "AS" initials, Brand/100 bg) + "Amaan Shahana" + settings gear
- Border-right: `border-r border-[var(--gray-200)]`

- [ ] **Step 2: Verify sidebar renders standalone**

Import into a test page temporarily, confirm layout and active state detection.

- [ ] **Step 3: Commit**

```bash
git add components/layout/sidebar.tsx
git commit -m "feat: add responsive sidebar with navigation"
```

---

### Task 7: Mobile Navigation and Header

**Files:**
- Create: `components/layout/mobile-nav.tsx`
- Create: `components/layout/header.tsx`

- [ ] **Step 1: Create mobile bottom nav**

`"use client"` component. Fixed bottom bar, `md:hidden`, 64px height, safe area padding.
- 5 items from `MOBILE_NAV_ITEMS` + "More" (MoreHorizontal icon) that opens a sheet with remaining items
- Active: Brand/600 icon + text, inactive: Gray/400

- [ ] **Step 2: Create header**

`"use client"` component. Props: `title: string`, `breadcrumbs?: { label: string; href?: string }[]`.
- Left: breadcrumb (if provided) above page title (Display xs/Semibold)
- Right: notification bell (Bell icon, relative positioned red dot badge) + user avatar dropdown (shadcn DropdownMenu: name, email, divider, "Sign Out" links to `/login`)
- Responsive: breadcrumb hidden on mobile, title smaller

- [ ] **Step 3: Commit**

```bash
git add components/layout/mobile-nav.tsx components/layout/header.tsx
git commit -m "feat: add mobile bottom nav and page header"
```

---

### Task 8: Dashboard Layout

**Files:**
- Create: `app/(dashboard)/layout.tsx`

- [ ] **Step 1: Create dashboard layout**

This layout wraps all dashboard pages with sidebar + header + ARIA button.

```tsx
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
        {children}
      </main>
      <MobileNav />
      {/* ARIA floating button added in Task 27 */}
    </div>
  );
}
```

- [ ] **Step 2: Create placeholder pages for all routes**

Create minimal placeholder pages for every route in `(dashboard)/`:
- `app/(dashboard)/page.tsx` — "Dashboard" heading
- `app/(dashboard)/jobs/page.tsx` — "Jobs" heading
- `app/(dashboard)/jobs/new/page.tsx` — "New Job" heading
- `app/(dashboard)/jobs/[id]/page.tsx` — "Job Detail" heading
- `app/(dashboard)/candidates/page.tsx` — "Candidates" heading
- `app/(dashboard)/candidates/pipeline/page.tsx` — "Pipeline" heading
- `app/(dashboard)/candidates/[id]/page.tsx` — "Candidate Profile" heading
- `app/(dashboard)/screening/page.tsx` — "AI Screening" heading
- `app/(dashboard)/communications/page.tsx` — "Communications" heading
- `app/(dashboard)/settings/page.tsx` — "Settings" heading
- `app/(dashboard)/assessments/page.tsx` — "Assessments — Coming Soon" placeholder
- `app/(dashboard)/interviews/page.tsx` — "Interviews — Coming Soon" placeholder
- `app/(dashboard)/reports/page.tsx` — "Reports — Coming Soon" placeholder

Each placeholder page should use the `Header` component with the correct title.

- [ ] **Step 3: Verify all routes render with sidebar**

Navigate to each route — confirm sidebar shows, active state highlights correctly, mobile nav appears on narrow viewport.

- [ ] **Step 4: Commit**

```bash
git add app/\(dashboard\)/
git commit -m "feat: add dashboard layout with all route placeholders"
```

- [ ] **Step 5: Run build to verify chunk**

```bash
npm run build
```

---

## Chunk 3: Shared Components + Dashboard

### Task 9: Shared Components — Score Ring, Score Badge, AI Content Zone

**Files:**
- Create: `components/shared/score-ring.tsx`
- Create: `components/shared/score-badge.tsx`
- Create: `components/shared/ai-content-zone.tsx`

- [ ] **Step 1: Create ScoreRing**

Props: `score: number`, `size?: number` (default 120), `tierType?: "candidate" | "health"` (default "candidate"), `label?: string`.

SVG circle with stroke-dasharray for progress. Uses `getScoreTier()` or `getHealthScoreTier()` for color. Score number centered. `role="meter"` with `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-label`.

- [ ] **Step 2: Create ScoreBadge**

Props: `score: number`, `showLabel?: boolean` (default true).

Small inline badge using score tier colors. Format: "82 — Strong Fit" or just "82". `aria-label` with full text.

- [ ] **Step 3: Create AiContentZone**

Props: `children: React.ReactNode`, `className?: string`.

Wrapper div with `ai-content-zone` CSS class. Renders children inside.

- [ ] **Step 4: Commit**

```bash
git add components/shared/
git commit -m "feat: add ScoreRing, ScoreBadge, and AiContentZone components"
```

---

### Task 10: Shared Components — Skill Tag, Stage Badge, Trend Indicator, Empty State

**Files:**
- Create: `components/shared/skill-tag.tsx`
- Create: `components/shared/stage-badge.tsx`
- Create: `components/shared/trend-indicator.tsx`
- Create: `components/shared/empty-state.tsx`

- [ ] **Step 1: Create SkillTag**

Props: `name: string`, `matched?: "full" | "partial" | "missing"`.
- Full: green bg/text, Partial: amber, Missing: gray. Renders as a small badge (Text xs).

- [ ] **Step 2: Create StageBadge**

Props: `stage: CandidateStage`.
- Maps stage key to human-readable name from `PIPELINE_STAGES`. Colored badge: hired=green, rejected=red, offer=brand, rest=gray.

- [ ] **Step 3: Create TrendIndicator**

Props: `value: number`, `suffix?: string` (e.g., "%"), `positive?: boolean`.
- Shows up arrow (green) or down arrow (red) with value. Uses `TrendingUp`/`TrendingDown` from Lucide.

- [ ] **Step 4: Create EmptyState**

Props: `icon: string` (Lucide icon name), `heading: string`, `subheading: string`, `ctaLabel?: string`, `ctaHref?: string`.
- Centered vertically, 64px gray icon, heading (Text lg/Semibold), subheading (Text sm, Gray/500), optional CTA button.

- [ ] **Step 5: Commit**

```bash
git add components/shared/
git commit -m "feat: add SkillTag, StageBadge, TrendIndicator, and EmptyState components"
```

---

### Task 11: Dashboard — Stat Cards and Health Score Widget

**Files:**
- Create: `components/dashboard/health-score.tsx`
- Create: `components/dashboard/stat-card.tsx`

- [ ] **Step 1: Create HealthScore widget**

Uses `ScoreRing` with `tierType="health"`, `size={120}`, label "Hiring Health". Takes `score` from mock data.

- [ ] **Step 2: Create StatCard**

Props: `eyebrow: string`, `value: string`, `delta: number`, `deltaSuffix?: string`, `subtitle?: string`.

White bg card, shadow-xs, rounded-lg, p-6. Eyebrow (Text xs/Medium, Gray/500, uppercase), Value (Display xs/Semibold, Gray/900), Delta row using `TrendIndicator`.

- [ ] **Step 3: Commit**

```bash
git add components/dashboard/
git commit -m "feat: add HealthScore and StatCard dashboard widgets"
```

---

### Task 12: Dashboard — Pipeline Funnel, Activity Feed, Top Candidates, Urgent Actions

**Files:**
- Create: `components/dashboard/pipeline-funnel.tsx`
- Create: `components/dashboard/aria-feed.tsx`
- Create: `components/dashboard/top-candidates.tsx`
- Create: `components/dashboard/urgent-actions.tsx`

- [ ] **Step 1: Create PipelineFunnel**

`"use client"` component. Uses Recharts `BarChart` with horizontal bars. Data from mock `pipelineStages`. Brand color gradient across bars. `ResponsiveContainer` for responsive sizing. Card wrapper with "Pipeline Overview" header.

- [ ] **Step 2: Create AriaFeed**

Card wrapper with "ARIA Activity" header + "View All" link. Scrollable list (max 5 items). Each item: left Brand/25 border, timestamp, description, action link. Data from mock `activityFeedItems`.

- [ ] **Step 3: Create TopCandidates**

Card wrapper with "Top Candidates" header + "View All" link. 3 candidate mini-cards. Each: avatar (initials), name, role, ScoreBadge, 3 SkillTags, "View" button. Data from top-scoring mock candidates.

- [ ] **Step 4: Create UrgentActions**

Card wrapper with "Needs Attention" header. Color-coded list items (left border: red/amber/blue). Each: Lucide icon, description, time, action button. Data from mock `urgentActions`.

- [ ] **Step 5: Commit**

```bash
git add components/dashboard/
git commit -m "feat: add PipelineFunnel, AriaFeed, TopCandidates, UrgentActions"
```

---

### Task 13: Dashboard Page Assembly

**Files:**
- Modify: `app/(dashboard)/page.tsx`

- [ ] **Step 1: Assemble dashboard page**

Replace the placeholder with the full dashboard layout:
- Header component with title "Dashboard"
- Row 1: grid `grid-cols-1 lg:grid-cols-[auto_1fr]` — HealthScore (left) + 4 StatCards in a `grid-cols-2 xl:grid-cols-4` grid (right)
- Row 2: grid `grid-cols-1 lg:grid-cols-[3fr_2fr]` — PipelineFunnel + AriaFeed
- Row 3: grid `grid-cols-1 lg:grid-cols-[3fr_2fr]` — TopCandidates + UrgentActions
- Max-width container, padding, gap between rows
- Import all mock data

- [ ] **Step 2: Verify dashboard renders**

Open `/` — confirm all 4 zones render with data. Resize viewport — confirm responsive behavior.

- [ ] **Step 3: Commit**

```bash
git add app/\(dashboard\)/page.tsx
git commit -m "feat: assemble complete dashboard page with all widgets"
```

- [ ] **Step 4: Run build to verify chunk**

```bash
npm run build
```

---

## Chunk 4: Jobs Module

### Task 14: Job Card Component and Jobs List Page

**Files:**
- Create: `components/jobs/job-card.tsx`
- Modify: `app/(dashboard)/jobs/page.tsx`

- [ ] **Step 1: Create JobCard**

Props: `job: Job`. Card with shadow-xs, rounded-lg, p-5. Title, department badge, location, stat row (applicants + days open), TTH progress bar (shadcn Progress, Brand/600 fill), status badge (Active green, Draft gray, Closed dark). Hover: shadow-sm transition. Links to `/jobs/${job.id}`.

- [ ] **Step 2: Build Jobs list page**

`"use client"` page. Header with title "Jobs".
- Tabs: Active / Draft / Closed / All (shadcn Tabs)
- Action bar: search input (320px, left Search icon, debounced 300ms) + "Create Job" button linking to `/jobs/new`
- Card grid: `grid-cols-1 md:grid-cols-2 xl:grid-cols-3` — filter jobs by active tab + search query
- Empty state when no jobs match filters
- Import mock jobs data

- [ ] **Step 3: Verify**

Visit `/jobs` — confirm tabs filter, search works, cards link correctly.

- [ ] **Step 4: Commit**

```bash
git add components/jobs/ app/\(dashboard\)/jobs/page.tsx
git commit -m "feat: add JobCard component and jobs list page with tabs and search"
```

---

### Task 15: Job Creation Wizard

**Files:**
- Create: `components/jobs/job-creation-wizard.tsx`
- Create: `components/jobs/jd-editor.tsx`
- Create: `components/jobs/screening-weights.tsx`
- Modify: `app/(dashboard)/jobs/new/page.tsx`

- [ ] **Step 1: Create ScreeningWeights**

4 labeled sliders (shadcn Slider): Portfolio, Experience, Skills, Culture. Values 0-100. Display weight percentages.

- [ ] **Step 2: Create JdEditor**

Editable JD sections in AI content zone. Sections: Title, Summary, Responsibilities, Must-haves, Nice-to-haves, Salary Range. Each section has an edit icon — on click, turns into a textarea. Right sidebar: tone selector (Select), ScreeningWeights, skills as editable tags.

- [ ] **Step 3: Create JobCreationWizard**

`"use client"` component. State: `currentStep` (1-4), form data.

Step indicator: horizontal bar with 4 numbered circles + labels.
- Step 1 (Intent): centered textarea + "Generate with AI" button (disabled until >20 chars). On click: 2-second shimmer, then populate mock JD data and advance to step 2.
- Step 2 (Review): JdEditor component with mock AI-generated JD. "Back" + "Continue" buttons.
- Step 3 (Config): form with Department select, Location select, Remote policy radio, Hiring manager select, Deadline date picker, Channels checkboxes, Auto-screening toggle. "Back" + "Continue".
- Step 4 (Publish): preview card + channel summary + "Publish Job" (primary) + "Save as Draft" (secondary). Both navigate to `/jobs` with sonner toast.

Sequential navigation: can go back but not skip forward.

- [ ] **Step 4: Wire up the page**

`app/(dashboard)/jobs/new/page.tsx` renders Header + JobCreationWizard.

- [ ] **Step 5: Verify all 4 steps work**

Walk through the wizard start to finish. Confirm loading state, validation, back navigation, publish action.

- [ ] **Step 6: Commit**

```bash
git add components/jobs/ app/\(dashboard\)/jobs/new/page.tsx
git commit -m "feat: add 4-step AI job creation wizard"
```

---

### Task 16: Job Detail Page

**Files:**
- Modify: `app/(dashboard)/jobs/[id]/page.tsx`

- [ ] **Step 1: Build Job Detail page**

`"use client"` page. Reads `id` from params. Finds job from mock data (fallback to first job).

Header section: title + status badge + action buttons (Edit, Pause, Clone, Share).
Stat row: 4 inline stats.
Tabs (shadcn Tabs): Pipeline, Activity, Screening Rules, Sources.

- **Pipeline tab**: mini Recharts bar chart + candidate cards grouped by stage (collapsible sections)
- **Activity tab**: vertical timeline with 15 mock events (icons, descriptions, timestamps)
- **Screening Rules tab**: reusable rules display (read-only by default, edit mode toggle)
- **Sources tab**: Recharts bar chart (applications per channel) + source performance table

- [ ] **Step 2: Verify job detail renders**

Visit `/jobs/1` — confirm all 4 tabs work with data.

- [ ] **Step 3: Commit**

```bash
git add app/\(dashboard\)/jobs/\[id\]/page.tsx
git commit -m "feat: add job detail page with Pipeline, Activity, Rules, Sources tabs"
```

- [ ] **Step 4: Run build to verify chunk**

```bash
npm run build
```

---

## Chunk 5: Candidates Module

### Task 17: Candidate Card, Table, and Filter Sidebar

**Files:**
- Create: `components/candidates/candidate-card.tsx`
- Create: `components/candidates/candidate-table.tsx`
- Create: `components/shared/filter-sidebar.tsx`

- [ ] **Step 1: Create CandidateCard**

Props: `candidate: Candidate`. Avatar (40px, initials), name, role, ScoreBadge, AI content flag icon (AlertTriangle, Error/500) if `hasAiContentFlag`, 3 SkillTags, StageBadge + date. Links to `/candidates/${id}`. Hover: shadow-sm.

- [ ] **Step 2: Create CandidateTable**

Props: `candidates: Candidate[]`, `onSelect: (ids: string[]) => void`. shadcn Table with sortable columns: checkbox, Name, Role, Score, Stage, Applied, Skills, Actions. Bulk selection via checkboxes.

- [ ] **Step 3: Create FilterSidebar**

`"use client"` component. Props: filter state + onChange callbacks.
- Score range slider (0-100)
- Stage checkboxes
- Role dropdown
- Experience level radio (Any, 0-2yr, 3-5yr, 5-10yr, 10+yr)
- AI Content flag toggle
- Portfolio available toggle
- "Clear Filters" link
- Mobile: renders as a Sheet (full-screen), desktop: 240px left panel

- [ ] **Step 4: Commit**

```bash
git add components/candidates/ components/shared/filter-sidebar.tsx
git commit -m "feat: add CandidateCard, CandidateTable, and FilterSidebar"
```

---

### Task 18: Candidates List Page

**Files:**
- Modify: `app/(dashboard)/candidates/page.tsx`

- [ ] **Step 1: Build candidates list page**

`"use client"` page. State: viewMode ("grid" | "table"), filters, search query, selected candidates.

- Header with title "Candidates" + view toggle icons (LayoutGrid / List) + search input
- FilterSidebar (left panel desktop, sheet on mobile)
- Grid view: CandidateCard grid (3/2/1 cols)
- Table view: CandidateTable
- Bulk action bar (appears when candidates selected): "Send Assessment", "Move Stage", "Reject", "Export" buttons
- Client-side filtering by score range, stage, search query, AI content flag
- Empty state when no candidates match
- Import mock candidates

- [ ] **Step 2: Verify list and table views**

Toggle between grid/table. Apply filters. Search. Select candidates and confirm bulk bar appears.

- [ ] **Step 3: Commit**

```bash
git add app/\(dashboard\)/candidates/page.tsx
git commit -m "feat: add candidates list page with grid/table toggle and filtering"
```

---

### Task 19: Kanban Pipeline Board

**Files:**
- Create: `components/candidates/kanban-board.tsx`
- Create: `components/candidates/kanban-column.tsx`
- Create: `components/candidates/kanban-card.tsx`
- Modify: `app/(dashboard)/candidates/pipeline/page.tsx`

- [ ] **Step 1: Create KanbanCard**

Props: `candidate: Candidate`. Compact card: name (Text sm/Semibold), ScoreBadge, role (Text xs), "X days in stage", AI content flag icon if flagged. `draggableId` for DnD.

- [ ] **Step 2: Create KanbanColumn**

Props: `stage: PipelineStage`, `candidates: Candidate[]`, `droppableId: string`. Column header (stage name + count badge + red SLA badge if any candidate > 5 days). Scrollable card list. Uses `@hello-pangea/dnd` `Droppable`.

- [ ] **Step 3: Create KanbanBoard**

`"use client"` component. State: candidates by stage (derived from mock data). `DragDropContext` wrapping all columns. `onDragEnd` moves candidate between stages + sonner toast. Desktop: horizontal scroll all columns. Mobile: tab bar to select one stage at a time.

- [ ] **Step 4: Build pipeline page**

Header + KanbanBoard with mock data.

- [ ] **Step 5: Verify drag and drop**

Drag a card between columns. Confirm toast appears, card moves, counts update. Test mobile tab view.

- [ ] **Step 6: Commit**

```bash
git add components/candidates/kanban* app/\(dashboard\)/candidates/pipeline/page.tsx
git commit -m "feat: add Kanban pipeline board with drag-and-drop"
```

---

### Task 20: Candidate Profile — Overview and Resume Tabs

**Files:**
- Create: `components/candidates/candidate-profile.tsx`
- Create: `components/candidates/tabs/overview-tab.tsx`
- Create: `components/candidates/tabs/resume-tab.tsx`

- [ ] **Step 1: Create OverviewTab**

ScoreRing (80px, candidate tier) + verdict chip badge + AI summary in AiContentZone. Quick stats row (years exp, portfolio score, assessment score). Skill match bar (horizontal progress). Team activity section (avatars + recent comments). Application timeline.

- [ ] **Step 2: Create ResumeTab**

Career timeline (vertical, each entry: company, role, duration, circle connectors). Skills match bars per skill (green/amber/gray with labels). AI career trajectory paragraph in AiContentZone. Red flags section (each with context note). Resume quality progress bar. AI recommendation badge + paragraph.

- [ ] **Step 3: Create CandidateProfile container**

Props: `candidate: Candidate`. Header: avatar (64px), name, role + company, location, date. ScoreRing + verdict. Quick action bar buttons. Tab navigation (6 tabs). Renders active tab content.

- [ ] **Step 4: Commit**

```bash
git add components/candidates/candidate-profile.tsx components/candidates/tabs/overview-tab.tsx components/candidates/tabs/resume-tab.tsx
git commit -m "feat: add candidate profile container with Overview and Resume tabs"
```

---

### Task 21: Candidate Profile — AI Content, Portfolio, Technical, Fit Tabs

**Files:**
- Create: `components/candidates/tabs/ai-content-tab.tsx`
- Create: `components/candidates/tabs/portfolio-tab.tsx`
- Create: `components/candidates/tabs/technical-tab.tsx`
- Create: `components/candidates/tabs/fit-tab.tsx`

- [ ] **Step 1: Create AiContentTab**

ScoreRing gauge (0-100%). Warning banner (yellow/amber alert). Section breakdown table (shadcn Table). Flagged excerpts with yellow bg highlight + confidence badge. Override buttons ("Reviewed — Acceptable" outlined green, "Reviewed — Concern" outlined red).

- [ ] **Step 2: Create PortfolioTab**

4 mini stat cards (website metrics). Recharts RadarChart (5 dimensions). Aggregate score + tier label. Project cards (each: placeholder thumbnail, title, score, strength, gap). Tool badges. Comparative rank text.

- [ ] **Step 3: Create TechnicalTab**

GitHub contribution heatmap (CSS grid, 52 cols x 7 rows, green shades). Language breakdown (Recharts horizontal stacked bar). Top repos list (name, stars, description, language badge). Code quality progress bars. Tech stack badge groups.

- [ ] **Step 4: Create FitTab**

Requirements table (shadcn Table: Criterion, Status icon, Evidence). Must-haves section + nice-to-haves section separated. AI recommendation in AiContentZone. Bias check success alert.

- [ ] **Step 5: Commit**

```bash
git add components/candidates/tabs/
git commit -m "feat: add AI Content, Portfolio, Technical, and Fit Assessment tabs"
```

---

### Task 22: Candidate Profile Page and Compare View

**Files:**
- Create: `components/candidates/compare-view.tsx`
- Modify: `app/(dashboard)/candidates/[id]/page.tsx`

- [ ] **Step 1: Create CompareView**

Props: `candidates: Candidate[]` (2-4). Full-width table: one column per candidate (avatar + name header). Rows: AI Fit Score, Portfolio Score, Assessment Score, Years Exp, Skills Match %, Key Skills (tags), AI Content %, Recommendation. Best value per row: green highlight. "Export PDF" button (placeholder — shows toast).

- [ ] **Step 2: Build candidate profile page**

Reads `id` from params. Finds candidate from mock data. Renders CandidateProfile component with full tab set. Fallback: 404-style page if not found.

- [ ] **Step 3: Verify all 6 tabs render**

Visit `/candidates/1` — click through all tabs. Confirm data renders for the 3 fully-fleshed candidates.

- [ ] **Step 4: Commit**

```bash
git add components/candidates/compare-view.tsx app/\(dashboard\)/candidates/\[id\]/page.tsx
git commit -m "feat: add candidate profile page and compare view"
```

- [ ] **Step 5: Run build to verify chunk**

```bash
npm run build
```

---

## Chunk 6: Screening, Communications, ARIA, Final Integration

### Task 23: AI Screening Module

**Files:**
- Create: `components/screening/screening-queue.tsx`
- Create: `components/screening/rules-builder.tsx`
- Modify: `app/(dashboard)/screening/page.tsx`

- [ ] **Step 1: Create ScreeningQueue**

Table of screening batches. Columns: Job (linked), Candidates (count), Status (badge: Processing=amber, Complete=green, Failed=red), Started, Duration, Actions. Expandable rows: collapsible section showing per-candidate results (name, score badge, verdict, flag badges). "Run Screening" button (simulates: adds processing batch, 3-second delay, then marks complete with toast).

- [ ] **Step 2: Create RulesBuilder**

Props: `rules: ScreeningRule[]`, `onChange`, `readOnly?: boolean`. Each rule as a card: drag handle (GripVertical), type badge, condition text, arrow icon, action text, enabled toggle (Switch), delete button (Trash2). "Add Rule" button appends new rule. Delete requires inline confirmation. Drag reorder via @hello-pangea/dnd. "Save Rules" button + toast. Read-only mode for Job Detail page reuse.

- [ ] **Step 3: Build screening page**

Header + Tabs (Queue / Rules). Queue tab: ScreeningQueue + empty state. Rules tab: RulesBuilder.

- [ ] **Step 4: Verify**

Expand a batch row. Add/delete/reorder rules. Run screening simulation.

- [ ] **Step 5: Commit**

```bash
git add components/screening/ app/\(dashboard\)/screening/page.tsx
git commit -m "feat: add AI screening queue and rules builder"
```

---

### Task 24: Communications Module

**Files:**
- Create: `components/communications/inbox.tsx`
- Create: `components/communications/template-library.tsx`
- Modify: `app/(dashboard)/communications/page.tsx`

- [ ] **Step 1: Create Inbox**

Two-panel layout. Left panel (320px desktop, full width mobile): conversation list with avatar, name, preview, timestamp, unread dot. Filter tabs: All / Unread / Starred. Right panel: selected thread — header (name + role + stage badge), message list (sent right with Brand/50 bg, received left with white bg), compose area with textarea + "AI Draft" button (generates mock AI response in AiContentZone) + "Send" button. Mobile: single panel with back navigation.

- [ ] **Step 2: Create TemplateLibrary**

Grid of template cards. Each: title, category badge, preview text, "Use" / "Edit" buttons. Filter by category. "Use" copies template to compose area. "Edit" opens inline editor (textarea replacement).

- [ ] **Step 3: Build communications page**

Header + Tabs (Inbox / Templates). Import mock threads and templates.

- [ ] **Step 4: Verify**

Select a thread, read messages, compose reply, use AI Draft, switch to templates.

- [ ] **Step 5: Commit**

```bash
git add components/communications/ app/\(dashboard\)/communications/page.tsx
git commit -m "feat: add communications inbox and template library"
```

---

### Task 25: ARIA Agent Panel

**Files:**
- Create: `components/layout/aria-panel.tsx`
- Modify: `app/(dashboard)/layout.tsx`

- [ ] **Step 1: Create AriaPanel**

`"use client"` component. Two parts:

**Floating button**: fixed bottom-right (24px offset, above mobile nav on mobile). 56px Brand/600 circle, Sparkles icon, shadow-lg. Hover: Brand/700, translateY(-1px). onClick toggles panel.

**Panel**: 400px wide, slides from right (desktop/tablet) or full-screen modal (mobile). Focus trap when open. Escape to close.
- Header: "ARIA" (Text lg/Semibold) + "New Chat" button + X close
- Messages area: ScrollArea. Welcome message + suggested command chips.
- User messages: right-aligned, Brand/50 bg, rounded-xl
- ARIA messages: left-aligned, white bg, Gray/200 border, rounded-xl
- ARIA can render embedded cards: candidate cards (compact), stat cards, confirmation buttons, links
- Loading state: 3 animated dots
- Input: sticky bottom, text input + Send button (SendHorizontal icon)

**Mock response logic**: state machine matching user input against command map. Case-insensitive partial matching. 1.5-second simulated delay before response. Commands from spec: "show top candidates", "screen all candidates", "draft rejection email", "average TTH", "compare top 3", "post a job", "jobs open more than 30 days". Default response: "I can help with that! Try asking me to screen candidates, show top candidates, or draft emails."

- [ ] **Step 2: Add ARIA to dashboard layout**

Import AriaPanel into `app/(dashboard)/layout.tsx`. Render as last child in the flex container.

- [ ] **Step 3: Verify ARIA**

Click floating button — panel opens. Type "show top candidates" — see candidate cards. Type "what's our average tth" — see stat card. Press Escape — panel closes. Test on mobile — confirm full-screen modal.

- [ ] **Step 4: Commit**

```bash
git add components/layout/aria-panel.tsx app/\(dashboard\)/layout.tsx
git commit -m "feat: add ARIA AI agent panel with mock command responses"
```

---

### Task 26: Placeholder Pages Polish

**Files:**
- Modify: `app/(dashboard)/assessments/page.tsx`
- Modify: `app/(dashboard)/interviews/page.tsx`
- Modify: `app/(dashboard)/reports/page.tsx`
- Modify: `app/(dashboard)/settings/page.tsx`

- [ ] **Step 1: Add styled placeholder pages**

Each page: Header + EmptyState component with appropriate icon, "Coming Soon" heading, description of what the module will do, no CTA.

- Assessments: ClipboardCheck icon, "Assessment Center — Coming Soon", "Technical and design evaluations with AI-powered grading."
- Interviews: Video icon, "Interview Hub — Coming Soon", "AI-generated interview guides, scheduling, and structured scorecards."
- Reports: BarChart3 icon, "Reports & Analytics — Coming Soon", "Real-time hiring performance dashboards and AI accuracy metrics."
- Settings: Settings icon, "Settings — Coming Soon", "Company profile, AI configuration, team management, and integrations."

- [ ] **Step 2: Commit**

```bash
git add app/\(dashboard\)/assessments/ app/\(dashboard\)/interviews/ app/\(dashboard\)/reports/ app/\(dashboard\)/settings/
git commit -m "feat: add styled placeholder pages for Phase 2 modules"
```

---

### Task 27: Final Integration and Verification

**Files:**
- Modify: various — final wiring and fixes

- [ ] **Step 1: Add skip navigation link**

In `app/(dashboard)/layout.tsx`, add as first child: `<a href="#main-content" className="sr-only focus:not-sr-only ...">Skip to main content</a>`. Add `id="main-content"` to the `<main>` element.

- [ ] **Step 2: Wire up cross-module navigation**

Verify all links work:
- Dashboard "View All" links → correct filtered views
- Top candidate cards → `/candidates/{id}`
- Job cards → `/jobs/{id}`
- ARIA command links → correct pages
- Sidebar navigation → all routes
- Mobile bottom nav → all routes
- Login "Sign in" → Dashboard
- User dropdown "Sign Out" → Login

- [ ] **Step 3: Full responsive verification**

Test every page at 3 breakpoints (375px mobile, 768px tablet, 1440px desktop):
- Dashboard: stat grid, funnel, feed all adapt
- Jobs: card grid adapts
- Candidates: grid/table, filters as sheet on mobile
- Kanban: tab bar on mobile
- Communications: single panel on mobile
- ARIA: full-screen modal on mobile

- [ ] **Step 4: Run production build**

```bash
npm run build
```

Expected: build succeeds with zero errors.

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "feat: complete HireAI MVP — all modules integrated and responsive"
```

---

## Summary

| Chunk | Tasks | What It Delivers |
|-------|-------|-----------------|
| 1: Foundation | 1-4 | Project scaffold, tokens, types, mock data |
| 2: App Shell | 5-8 | Login, sidebar, header, mobile nav, all route placeholders |
| 3: Shared + Dashboard | 9-13 | Shared components, dashboard with all 4 zones |
| 4: Jobs | 14-16 | Jobs list, AI creation wizard, job detail |
| 5: Candidates | 17-22 | List, kanban, 6-tab profile, compare view |
| 6: Integration | 23-27 | Screening, communications, ARIA, placeholders, final wiring |

**Total tasks:** 27
**Parallel opportunities:** Tasks within each chunk are sequential, but chunks 4 and 5 can run in parallel after chunk 3 completes. Tasks 23, 24, and 25 in chunk 6 are independent and can run in parallel.
