# HireAI — Product Requirements Document
### AI-Augmented Hiring Platform for Design & Tech Teams

---

> *"Hiring has always been about human judgment. AI doesn't replace that — it protects it. It clears away the noise so your best instincts have room to work."*
> — Perspective of a Senior HR Leader, 20+ years in talent acquisition

---

| Field | Detail |
|---|---|
| **Product** | HireAI |
| **Version** | v1.0 |
| **Status** | Draft |
| **Date** | February 2026 |
| **Prepared by** | Amaan · AI Product Design Manager · Happening Design Agency |
| **Research Foundation** | AI-Augmented Hiring Efficiency Framework (AI-AHEF) · Leenus Telare, SSODL 2025 |

---

## Table of Contents

1. [A Note from the HR Chair](#1-a-note-from-the-hr-chair)
2. [Executive Summary](#2-executive-summary)
3. [The Problem We're Solving](#3-the-problem-were-solving)
4. [Who We're Building For](#4-who-were-building-for)
5. [What Success Looks Like](#5-what-success-looks-like)
6. [Design Language](#6-design-language)
7. [How People Navigate the Tool](#7-how-people-navigate-the-tool)
8. [Module 01 — Dashboard](#8-module-01--dashboard)
9. [Module 02 — Jobs](#9-module-02--jobs)
10. [Module 03 — Candidates](#10-module-03--candidates)
11. [Module 04 — AI Screening Engine](#11-module-04--ai-screening-engine)
12. [Module 05 — Assessment Center](#12-module-05--assessment-center)
13. [Module 06 — Interviews](#13-module-06--interviews)
14. [Module 07 — Reports & Analytics](#14-module-07--reports--analytics)
15. [Module 08 — Communications](#15-module-08--communications)
16. [Module 09 — Company Settings](#16-module-09--company-settings)
17. [ARIA — The AI Agent](#17-aria--the-ai-agent)
18. [User Stories](#18-user-stories)
19. [Non-Functional Requirements](#19-non-functional-requirements)
20. [Roadmap](#20-roadmap)
21. [Open Questions & Assumptions](#21-open-questions--assumptions)

---

## 1. A Note from the HR Chair

I've spent two decades watching talented recruiters burn out. Not because they lacked skill — but because the systems they worked in were designed for paperwork, not people.

A good recruiter can tell within three minutes of reading a portfolio whether a designer thinks in systems or just in pixels. A good tech lead can hear in the first sixty seconds of a coding interview whether a candidate understands trade-offs or just memorises solutions. That instinct is irreplaceable.

What's replaceable — and frankly, what should have been automated a long time ago — is reading the four hundred resumes that arrived before you got to those three people.

HireAI is built on a single conviction: **the best hiring decisions are made by humans who aren't exhausted.** The platform does the volume work. It reads the resumes, crawls the portfolios, scores the code, detects the AI-inflated applications, and surfaces the signal. It writes the job descriptions, sends the assessments, drafts the rejection emails, and schedules the interviews. It answers your questions in plain language.

What it does not do is decide. That remains yours.

This document is the blueprint for building that tool — honestly, carefully, and with the people on both sides of the hiring table always in mind.

---

## 2. Executive Summary

### Vision

> HireAI is the first AI-native hiring platform purpose-built for Design and Technology roles. It combines intelligent candidate sourcing, automated portfolio analysis, real-time code assessment, AI content detection, and a natural language action agent (ARIA) into one seamless workflow — reducing Time-to-Hire by 30% and Cost-per-Hire by 20%, while improving the quality and fairness of every hire.

### The Foundation

This product is grounded in the **AI-Augmented Hiring Efficiency Framework (AI-AHEF)** — a structured, research-backed model developed to address the specific inefficiencies of hiring for creative and technical roles. The framework was developed by Leenus Telare at Symbiosis School for Online and Digital Learning (SSODL), Pune, 2025.

The AI-AHEF identifies five stages where AI can meaningfully intervene: Sourcing, Screening, Assessment, Interview, and Onboarding. HireAI implements all five — with particular depth at the stages where traditional tools fail most visibly: portfolio evaluation and technical skills validation.

### Core Principles

- **Clarity over cleverness.** Every AI output must be explainable in plain English to a recruiter.
- **Human judgment is sacred.** AI makes recommendations; humans make decisions.
- **Speed without shortcuts.** Faster screening should not mean worse screening.
- **Fairness is not a checkbox.** Bias mitigation is a foundational system requirement, not a feature add-on.
- **Candidate dignity matters.** How we treat people who don't get the job is as important as how we hire the people who do.

---

## 3. The Problem We're Solving

### 3.1 The Numbers Are Damning

The average Time-to-Hire for a tech role exceeds **45 days**. The Cost-per-Hire for a single developer approaches **$25,000**. Top-tier candidates — the ones every company is competing for — are typically off the market within **10 days** of starting their search.

This means most organizations using traditional recruitment methods are structurally too slow to hire the best people. They are not losing candidates to better competitors. They are losing candidates to their own processes.

### 3.2 What's Actually Breaking Down

| Stage | What Should Happen | What Actually Happens |
|---|---|---|
| **Sourcing** | Find the best candidates, including those not actively looking | Manual job postings on generic boards; passive talent invisible |
| **Resume Screening** | Identify genuine skill fit objectively | Hours of subjective manual review; senior recruiters doing administrative work |
| **Portfolio Review** | Evaluate design thinking quality and depth | Visual work judged by non-designers; no consistent criteria; no scoring |
| **Technical Assessment** | Validate actual coding ability at seniority level | Take-home tests take days; grading is inconsistent; candidates drop off |
| **Interview Prep** | Interviewers ask the right questions for this specific candidate | Generic questions unrelated to candidate's profile gaps or strengths |
| **Offer & Onboarding** | Fast, smooth, personalised | Manual paperwork; slow access; generic orientation |

### 3.3 Why Generic AI Tools Don't Fix This

Most AI recruitment tools apply natural language keyword matching to resumes. This works adequately for high-volume, entry-level roles where standardised criteria exist.

It fails completely for Design and Tech roles — and here is why:

**For Design roles:** A UX designer's value lives in their design thinking process — how they frame a problem, how they involve users, how they justify decisions, and what business outcomes their work drove. None of this appears in a keyword. A portfolio full of visually beautiful screens may represent a designer who cannot articulate a single insight about user behaviour. A portfolio of rough wireframes may represent someone who will transform how your product thinks. A keyword scanner cannot tell the difference.

**For Tech roles:** A senior engineer's quality is revealed not in their tech stack list but in how they structure systems under constraints, how they handle ambiguity, and how they debug under pressure. "Python: 7 years" tells you nothing about whether this person writes maintainable code or whether they can lead a team through a production incident.

HireAI uses multimodal AI analysis — NLP, computer vision, web crawling, and code execution evaluation — to assess what actually matters for these roles.

### 3.4 The AI Content Problem

A new and growing challenge that existing tools ignore entirely: candidates increasingly use AI to generate resumes, cover letters, and portfolio case study descriptions wholesale. These documents often read as fluent and impressive while concealing either limited genuine experience or outright fabrication.

HireAI embeds AI content detection as a first-class platform feature — not as a rejection trigger, but as a transparency signal. HR receives the information needed to make an informed decision. The human decides what it means.

---

## 4. Who We're Building For

### Primary Users

**The Talent Recruiter** — In the trenches every day. Managing ten to thirty open roles simultaneously. Using ATS tools that were designed before AI existed. Spending four to six hours screening resumes for a single role that needed to be filled three weeks ago. This person needs the volume work taken off their plate so they can do the high-value work: conversations, relationships, judgment calls.

**The HR Manager** — Accountable for metrics. Reporting Time-to-Hire to the VP of People. Explaining why the engineering team's open roles have been empty for two months. Fielding complaints about candidate experience from a hiring manager who never gives feedback in time. This person needs a real-time view of pipeline health and the tools to fix what's breaking.

**The Hiring Manager** — A Design Lead or Engineering Lead who interviews two candidates a week on top of their regular job. They receive candidate profiles with no context, ask the same generic questions they always ask, and have no structured way to share feedback with the rest of the panel. This person needs to walk into every interview knowing exactly what to probe — and to walk out with a structured record they can share.

**The Founder / Head of People** — Running a fifty-person startup with one person in HR and thirty open roles. Has no time to learn complex HR software. Needs to trust that the platform will do the screening work autonomously so they can personally interview only the final three candidates for each critical role.

**The CHRO / VP Talent** — Responsible for hiring strategy across an organization of five hundred or five thousand. Needs ROI justification for headcount, DEI compliance reports for the board, and a way to understand why certain departments always have healthy pipelines while others are always three months behind target.

### Secondary Users

**Candidates** — Deserve transparency, speed, and respect. The platform must communicate clearly at every stage, provide a way for candidates to track their own progress, and ensure that rejection — when it comes — is delivered with dignity.

**Staffing and RPO Agencies** — Can white-label the platform to offer AI-powered screening as a managed service to their clients.

---

## 5. What Success Looks Like

### The Metrics That Matter

| Metric | Industry Baseline | HireAI Target | How We Get There |
|---|---|---|---|
| **Time-to-Hire** | 45 days (tech roles) | ≤ 31.5 days | AI automation of sourcing and screening stages (−30%) |
| **Cost-per-Hire** | $25,000 (developer) | ≤ $20,000 | Reduced recruiter hours on administrative tasks (−20%) |
| **Resume Screening Time** | 4–6 hours per role | < 15 minutes | NLP parsing + scoring replaces manual review |
| **Shortlist Accuracy** | ~40% reach interview | > 70% of AI shortlist reaches interview | Multi-signal scoring vs. keyword matching |
| **Portfolio Evaluation Time** | 45 min per candidate | < 2 minutes | Web crawl + AI multimodal analysis |
| **Candidate NPS** | Industry avg: 12 | > 50 | Speed, communication, transparency, dignity |
| **Offer Acceptance Rate** | ~65% | > 80% | Better candidate experience + faster process |
| **Quality-of-Hire (90-day retention)** | Baseline | 15–20% improvement | Skill-based matching reduces early attrition |
| **AI Content Detection** | Not tracked | > 90% recall | Dedicated classifier + section-level flagging |

### The Signal We'll Watch

Beyond these metrics, we watch for: recruiter reported time savings, hiring manager satisfaction with candidate quality, candidate portal engagement rates, ARIA command adoption, and override rates on AI screening decisions (a high override rate signals the AI is miscalibrated for a specific role type).

---

## 6. Design Language

### Glass & Soft UI System

HireAI uses a carefully crafted visual language called **Glass & Soft UI** — designed to communicate precision, trust, and intelligence without feeling cold or clinical. This is important: HR tools have historically felt either oppressively corporate or naively casual. HireAI should feel like a premium, considered workspace that takes its job seriously.

**Font:** Urbanist (Google Fonts) — used exclusively. Clean, humanist, modern. Weight pairing rule: headings at medium (500) with body at light (300); labels at semibold (600) with values at regular (400). All headings use negative letter-spacing for tightness.

**Color Philosophy:**
- `#0E5EF5` Brand Blue — AI actions, active states, links, highlights. The colour of intelligent action.
- `#212123` Ink — Primary text and headings. Near-black, not harsh black.
- `#36C054` Green — Strong Fit, success states, positive trends. Unmistakably good.
- `#E05748` Red — Not Fit, errors, AI content flags. Clear without being alarming.
- `#ECF4F9` Blue-50 — AI panel backgrounds, info surfaces. Subtly signals "this is AI-generated."
- `rgba(255,255,255,0.65)` Glass — Floating panels, modals, overlays. Soft depth without heavy shadow.

**Interaction Language:**
- Spring animation on all interactive elements: `cubic-bezier(0.34, 1.56, 0.64, 1)` — feels alive, not mechanical
- Blue-tinted shadow system — all elevation uses blue-hued shadows, not grey
- Hover states: `translateY(-1px)` on all buttons — subtle lift communicates responsiveness
- Border radius: pills for badges and buttons; 12–16px for cards and inputs

**Component Principles:**
- Buttons come in five variants: Primary (dark), Accent (brand blue), Secondary (outlined), Ghost (transparent), Glass (backdrop blur)
- Stat cards use the eyebrow → value → change pattern with arrow indicators
- AI-generated content zones always use the `#ECF4F9` blue tint background so users always know when they're reading AI output vs. human input
- All AI scores use a consistent 0–100 scale with the same colour tiers: 75–100 (green/Strong), 50–74 (blue/Good), 30–49 (amber/Review), 0–29 (red/Not Fit)

---

## 7. How People Navigate the Tool

### Application Shell

```
┌─────────────────────────────────────────────────────────┐
│  Left Sidebar (240px)   │  Main Content Area            │
│  ─────────────────────  │  ─────────────────────────── │
│  Logo + Workspace       │  Page header + breadcrumb    │
│                         │                               │
│  Dashboard              │  Content (grid/list/detail)  │
│  Jobs                   │                               │
│  Candidates             │                               │
│  AI Screening           │  Optional: Right Detail       │
│  Assessments            │  Panel (480px) slides in     │
│  Interviews             │  for candidate profiles,      │
│  Reports                │  job details, ARIA            │
│  Communications         │                               │
│  Settings               │                               │
│                         │                               │
│  ─────────────────────  │                               │
│  ARIA (floating btn) ●  │                               │
└─────────────────────────────────────────────────────────┘
```

The sidebar collapses to icon-only mode (64px) on narrower screens. ARIA lives as a persistent floating button in the bottom-right corner of every screen — always one click away.

### Navigation Items

| Section | Sub-sections | Purpose |
|---|---|---|
| **Dashboard** | — | Real-time hiring health command centre |
| **Jobs** | Active · Draft · Closed · + New | Full job lifecycle management |
| **Candidates** | All · Pipeline · Compare | AI-enriched candidate profiles and pipeline |
| **AI Screening** | Queue · Portfolio · Rules | Screening engine configuration and results |
| **Assessments** | Active · Library · Results | Technical and design evaluations |
| **Interviews** | Scheduled · Guides · Feedback | Interview prep, scheduling, scorecards |
| **Reports** | Hiring · AI · Sources · DEI | Analytics dashboards and exports |
| **Communications** | Inbox · Templates · Portal | All candidate communication |
| **Settings** | Company · AI · Team · Integrations | Platform configuration |
| **ARIA** | (persistent, all screens) | Natural language AI agent |

---

## 8. Module 01 — Dashboard

> *"The first thing a recruiter should see in the morning is: what needs my attention today. Not what happened yesterday, not an aggregate of the last quarter — what do I need to do right now."*

### Purpose

The Dashboard is the command centre. It answers one question without any navigation: **what is the state of my hiring right now, and what needs my attention today?**

### Layout Zones

**Hiring Health Score** — A single circular score (0–100) at the top of the page. Composite metric calculated from: active roles vs. headcount target, TTH vs. benchmark, pipeline conversion rates, and pending overdue actions. Color-coded: 70–100 green, 40–69 amber, 0–39 red. This is the first thing every user sees. If it's red, something needs fixing before they do anything else.

**Stat Card Row (4 cards)**
- Active Jobs → count + delta vs. last week
- Candidates in Pipeline → count + today's new applications
- Avg. Time-to-Hire → current vs. benchmark with trend arrow
- Avg. Cost-per-Hire → current vs. target with trend arrow

**ARIA Activity Feed** — What did AI do since you were last here? Every automated action is listed with a timestamp and a one-click review link. This feed is the transparency layer — users always know exactly what the system did on their behalf, and always have the option to review or undo it.

Examples:
- *"AI screened 47 resumes for Senior Product Designer — 9 shortlisted, 38 archived. Review shortlist →"*
- *"Portfolio analysis complete for 12 candidates. Top scorer: Priya M. (91/100). View profiles →"*
- *"3 resumes flagged for high AI-generated content in Backend Engineer pipeline. Review →"*

**Pipeline Funnel** — Visual funnel from Applied through to Hired, with candidate counts and conversion rates at each stage. Toggle between individual job view and company-wide aggregate. Clicking any stage navigates to the filtered candidate list for that stage.

**Top Candidate Cards (AI-Surfaced)** — Three candidate cards showing the highest-scoring candidates across active roles who have not yet been actioned. Each card shows: name, role, AI Fit Score, top three matched skills, and quick actions (View Profile / Send Assessment / Schedule Interview). These are the people most likely to be lost if HR doesn't act today.

**Urgent Actions Panel** — Time-sensitive items: offers about to expire, interview slots to confirm, assessments overdue, SLA warnings (candidate waiting more than X days with no response). Colour-coded by urgency. No action item survives without a clear owner and deadline.

### Features

| Feature | Description | AI Component |
|---|---|---|
| Hiring Health Score | Composite pipeline health indicator | ML model trained on historical TTH, conversion, and QoH outcomes |
| ARIA Activity Feed | Log of all AI-completed tasks with review links | LLM-generated plain-language summaries of AI actions |
| Pipeline Funnel | Stage-by-stage candidate flow with conversion rates | Anomaly detection flags drop-off rates above historical norms |
| Top Candidates | AI-curated shortlist of high-scoring unactioned candidates | Multi-signal scoring across resume, portfolio, and assessment |
| Urgent Actions | SLA-triggered alerts for time-sensitive items | Rule-based triggers with AI-prioritised ordering |

---

## 9. Module 02 — Jobs

> *"Writing a job description is one of the most consequential things HR does — it determines who applies, and the quality of who applies determines everything downstream. Yet most JDs are copy-pasted from the last hire, or written in twenty minutes by someone who doesn't actually do the job. AI can fix this."*

### Purpose

The Jobs module manages the full lifecycle of every open role — from creation through publication, management, and closure. The core UX principle: a recruiter should be able to post a fully structured, professionally written job description in under two minutes, without starting from a blank form.

### Jobs List View

- Tab filters: Active / Draft / Closed / All
- Job cards show: title, department, location, applicant count (today + total), days open, TTH progress bar, status badge
- Sort by: applicants, date posted, TTH, candidate quality score
- Filter by: department, location, role type, work arrangement, hiring manager
- Quick actions on each card: Edit, Pause, Clone, Boost (re-post to channels), Archive

### New Job Posting — AI-Assisted Flow

#### Step 1: Role Intent Input

HR types a single natural language description of what they need. No forms. No dropdowns. No templates to fill in. Just intent.

```
"We need a senior product designer for our fintech mobile app team.
Figma required, 5+ years, someone who can own end-to-end design
including user research."
```

From this, AI generates — in full, within seconds:

- Job title with seniority level
- Company-aligned summary paragraph
- 8–10 responsibility bullets
- Must-have and nice-to-have requirements
- Salary range suggestion (market data from LinkedIn Salary / Glassdoor)
- Screening criteria weights (portfolio: 40% / experience: 30% / skills: 30%)
- Recommended interview stage structure
- Suggested assessment type for this role
- LinkedIn post announcement copy

Everything is editable. Nothing is locked.

#### Step 2: JD Review and Edit

- Inline rich text editing of every section
- AI Confidence indicators: low-confidence sections are gently highlighted for human review (e.g., if salary data is limited for a rare role)
- Tone selector: Formal / Balanced / Startup-casual — AI rewrites to match
- Screening weight sliders: HR adjusts the relative importance of Portfolio vs. Experience vs. Skills vs. Culture for this specific role
- Skills taxonomy: AI-extracted skills shown as editable tags — HR can add, remove, or re-weight
- Requirements toggle: mark any requirement as "Hard Filter" (auto-reject if missing) vs. "Soft Preference" (affects score but doesn't eliminate)

#### Step 3: Job Configuration

- Department, team, hiring manager assignment, notification settings
- Location and remote/hybrid/onsite policy
- Application deadline with SLA reminder configuration
- Collaborators: who can view, comment, and make decisions
- Source channels: which platforms to publish to
- Auto-screening rules: configure automated actions based on scoring thresholds
- Custom screening questions: 3 role-specific questions AI suggests; HR edits

#### Step 4: Publish

- One-click multi-channel publish: LinkedIn, Naukri, Indeed, company career page
- Internal referral link generated automatically
- LinkedIn announcement post copy generated — HR approves before it posts
- Candidate-facing job preview before going live

### Job Detail View

Once live, each job has a full detail page showing: current pipeline funnel, screening rules active, activity log (full audit trail of every event), source performance, and TTH progress against benchmark.

---

## 10. Module 03 — Candidates

> *"I have reviewed thousands of candidate profiles in my career. The question I always asked was: is this person's potential visible in what they've submitted to us? AI's job is to make sure the answer is always yes — that no strong candidate is invisible just because their resume doesn't use the right keywords."*

### Purpose

The Candidates module is where hiring decisions form. Every applicant receives a rich, AI-enriched profile within minutes of applying. The module supports both pipeline management (Kanban view for stage movement) and deep individual candidate analysis (tabbed profile view). HR can action every candidate without leaving this module.

### Candidate List View

- Default: card grid showing AI Fit Score, name, role, key skills, stage badge, application date
- Toggle to table view for bulk operations
- Sort by: AI Fit Score (default), application date, assessment score, portfolio score
- Filter by: score range, stage, role, location, experience level, AI content flag, portfolio available
- Bulk actions: Send assessment · Move stage · Reject with AI email · Export · Add to Talent Pool

### Kanban Pipeline View

Columns match the hiring stages defined in the job configuration:

```
Applied → AI Screened → Shortlisted → Assessment → Interview Scheduled
→ Interview Done → Offer → Hired / Rejected
```

Each column shows candidate count. A red badge appears when SLA has been exceeded for candidates waiting in that column. Drag-and-drop moves candidates between stages. Quick-add note on hover without opening full profile.

### Candidate Profile — Six AI Analysis Tabs

The candidate profile is the most important screen in the platform. It must give any member of the hiring team full context on any candidate in under three minutes. It is available as a full-screen view or as a right-panel drawer that slides in over the current view.

---

#### Tab 1: Overview

The first thing anyone sees. Designed for the hiring manager who has thirty seconds to decide whether to read further.

- Header: name, photo (if provided), current role and company, location, applied date
- AI Fit Score: large, prominent, colour-coded (0–100)
- AI Verdict chip: ⭐ Strong Fit / ✅ Good Fit / ⚠️ Needs Review / ❌ Not Fit
- Three-sentence AI summary of the candidate's profile, written for a hiring manager who hasn't read the resume
- Quick action bar: Move Stage · Send Assessment · Schedule Interview · Reject · Add to Talent Pool
- Team activity: who has viewed this profile, comments from panel, ratings

---

#### Tab 2: Resume Analysis

Not a raw resume viewer. An analysis of the resume.

- Parsed career timeline (visual, chronological, with company names and durations)
- Skills match: required skills vs. candidate skills as a visual match bar — green for matched, amber for partial, grey for missing
- Career trajectory analysis (AI-generated): *"Consistent growth from IC to Lead in four years. Two product-focused roles suggesting strong cross-functional sensibility."*
- Red flags surfaced with context, not as verdicts: *"Employment gap of eight months in 2023. Worth exploring in interview."*
- Frequent job switching pattern noted if present — with average tenure calculation
- Resume quality score: formatting, completeness, ATS-readability
- Recommendation: Shortlist / Consider / Skip — with reasoning paragraph

---

#### Tab 3: AI Content Detection

This tab exists because HR deserves to know. Not to automate rejection — to inform judgment.

- Overall AI-generated content percentage for: resume + cover letter + portfolio text (where available)
- Section-by-section breakdown: each section scored individually
- Visual highlight overlay: flagged paragraphs shown in context with yellow highlight and confidence level per flag
- Context note always visible: *"A high score may reflect AI-assisted drafting or editing. It does not automatically indicate fabrication. Review flagged sections before deciding."*
- HR override buttons: "Reviewed — Acceptable" or "Reviewed — Concern" — both logged to the audit trail
- No auto-rejection based on AI content score. This is a signal, not a verdict.

---

#### Tab 4: Portfolio Analysis (Design Roles)

The tab that makes HireAI meaningfully different from every generic ATS for design hiring.

Portfolio URL is auto-extracted from the resume. AI dispatches a web crawler within seconds of application. Analysis is complete within five minutes.

**Portfolio website quality:**
- Load speed and performance score
- Mobile responsiveness
- Broken links detected
- Accessibility score

**AI scores across five dimensions (0–10 each):**
- Visual Design Quality
- UX Thinking Depth
- Case Study Clarity and Completeness
- Business Impact Articulation
- Process Documentation

**Aggregate portfolio score (0–100)** with tier label: Exceptional / Strong / Moderate / Weak

**Project-level breakdown:** each case study summarised individually with score, key strength, and key gap

**Tool detection:** Figma, Framer, Adobe XD, Sketch, ProtoPie detected from work shown

**Comparative context:** *"Portfolio ranked 3rd of 24 candidates who applied for this role."*

---

#### Tab 5: Technical Profile (Tech Roles)

For engineering and data roles, this tab surfaces what the resume cannot show.

- GitHub/GitLab profile auto-extracted and analysed (public repos)
- Contribution frequency over the last twelve months (activity graph)
- Language breakdown by lines of code
- Top repositories: name, stars, brief AI summary of what the project is
- Code quality signals: README quality, commenting patterns, project structure consistency
- Tech stack fingerprint: primary and secondary technologies confirmed by code evidence, not just resume claims
- Open source contribution history noted if present
- For personal websites: tech stack detected, performance score, design sensibility assessed

---

#### Tab 6: Fit Assessment

The synthesis tab. Designed for the hiring committee meeting.

- Role requirement vs. candidate comparison table: each criterion marked Met / Partial / Not Met
- Must-have criteria separated clearly from nice-to-haves
- Culture fit indicators: extracted from writing tone, project choices, stated interests and values
- AI recommendation paragraph: three to four sentences summarising overall fit with specific evidence cited (*"Strong Figma proficiency confirmed by portfolio. Research depth is moderate — two of five case studies document user interviews. No B2B product experience visible but stated interest in enterprise UX."*)
- Bias check confirmation: note confirming evaluation criteria were applied consistently with all other candidates for this role

### Side-by-Side Comparison

Select two to four candidates from any view. Opens a comparison mode:
- One column per candidate
- Rows: AI Fit Score, portfolio score, assessment score, years experience, skills match %, key skills, AI content %, recommendation
- Winning value per row highlighted green
- Export as PDF for sharing with hiring managers who don't have platform access

---

## 11. Module 04 — AI Screening Engine

> *"The best thing AI does in recruitment is not find the best candidate. It's eliminate the time you spend on the clearly wrong ones. That's where hours go. That's where energy goes. That's where bias often enters — because by application two hundred, you're not reading carefully anymore. You're pattern-matching on things that have nothing to do with the job."*

### Purpose

The AI Screening Engine is the automation backbone of HireAI. It runs automatically as applications arrive and can be triggered manually for batch processing. It handles resume parsing, skills extraction, portfolio crawling, technical profile enrichment, AI content detection, scoring, and verdict assignment — without HR involvement, unless HR wants to be involved.

### Auto-Screening Pipeline (per application)

1. Application received → metadata extracted (name, contact, role applied for)
2. Resume parsed by NLP engine → skills extracted, experience timeline mapped, education confirmed
3. Portfolio URL extracted (if present) → web crawler dispatched → AI analysis queued
4. GitHub / LinkedIn URLs extracted → technical profile enriched
5. AI content detection scan → percentage score calculated, flagged sections identified
6. Skills match scored against JD requirements using configured weighting
7. Overall AI Fit Score calculated (0–100) using multi-signal model
8. Verdict assigned: Strong Fit / Good Fit / Needs Review / Not Fit
9. Auto-actions executed based on HR-configured rules
10. HR notified of batch completion with plain-language summary

### Screening Rules Engine

Configured once per job type (or inherited from company defaults). Per-rule configuration of conditions and triggered actions.

| Rule Type | Example | Action Triggered |
|---|---|---|
| **Hard Filter** | Experience < 3 years for a role requiring 5+ | Auto-reject with AI-written personalised email |
| **Auto-Shortlist** | AI Fit Score > 80 AND portfolio score > 70 | Move to Shortlisted; notify hiring manager |
| **Auto-Send Assessment** | Score 65–79 AND no AI content flag | Send assessment invitation automatically |
| **AI Content Flag** | AI content % > 60 | Flag for HR review; hold at current stage |
| **SLA Alert** | Candidate in Applied stage > 3 days | Notify recruiter; suggest next action |
| **Passive Rejection Queue** | Score < 30 AND role has 50+ applicants | Queue for batch rejection at end of week |

All rules have override capability. Any auto-action can be reversed. Every action is logged.

### Portfolio Screener (Standalone Tool)

Available as a dedicated tool for bulk portfolio evaluation — particularly valuable for design agencies hiring multiple designers simultaneously or running portfolio shortlisting workshops.

- Paste up to fifty portfolio URLs directly, or upload a CSV
- AI crawls and analyses all portfolios in parallel (typically under five minutes for fifty URLs)
- Results presented as a ranked grid: portfolio score, top strengths, primary weakness, tools detected, case study count
- Filter by: score range, Figma-only work, motion design present, mobile-focused work
- Bulk shortlist top N candidates with one click

### AI Content Detection

| Component | What It Analyses | Technology |
|---|---|---|
| Resume Scanner | Full resume text for AI generation patterns | Fine-tuned classifier + perplexity scoring |
| Cover Letter Scanner | Formulaic AI-written letter patterns | Sentence-level probability scoring |
| Portfolio Copy Scanner | Case study descriptions and process text | Web crawler + NLP classifier on extracted text |
| Section Highlighting | Identifies specific flagged paragraphs | Token-level attribution |
| Confidence Display | Shows model confidence per flag | Uncertainty quantification |
| HR Override | Mark any flag as acceptable or concern | Human-in-the-loop with full audit log |

---

## 12. Module 05 — Assessment Center

> *"A well-designed assessment respects the candidate's time. It is directly relevant to the role. It is clearly scoped. It gives them a fair chance to demonstrate skill rather than perform under artificial pressure. And it gives us consistent, comparable data. Four things. Most hiring assessments fail at least two of them."*

### Purpose

The Assessment Center provides role-specific evaluations that go beyond what resumes and portfolios can show. For tech roles: AI-generated coding challenges in a browser-based environment with automated grading. For design roles: AI-crafted briefs with structured AI evaluation. All assessments are proctored, time-tracked, auto-graded, and supplemented with human-readable AI feedback.

### Tech Assessments

| Type | What the Candidate Does | How AI Evaluates |
|---|---|---|
| **Coding Challenge** | Multi-question coding test in browser IDE, tested against hidden cases | Auto-grades against test cases; AI explains correct and candidate approaches |
| **System Design** | Open-ended architecture question using whiteboard tool | AI evaluates: scalability thinking, trade-off awareness, clarity, completeness |
| **Debugging Challenge** | Fix broken code; identify and resolve bugs | AI generates bugs calibrated to seniority; auto-grades fix correctness and approach |
| **SQL / Data Challenge** | Database queries against real test datasets | Auto-executes queries; validates output against expected results |
| **Live Coding (async)** | Screen-share session recorded in browser | AI transcribes problem-solving narrative; analyses approach, not just final answer |

### Design Assessments

| Type | What the Candidate Does | How AI Evaluates |
|---|---|---|
| **Design Brief Challenge** | AI-generated brief for company's product domain; submits Figma link | Evaluates: adherence to brief, UX quality, visual execution, user centricity score |
| **Portfolio Deep Dive** | Records a Loom walkthrough of a specific case study from their portfolio | AI transcribes and analyses for design thinking depth, articulation quality |
| **Design Critique Task** | Reviews and annotates an existing product screen | Evaluates: quality of observations, UX principle knowledge, communication clarity |
| **Concept Sketch** | Time-boxed 30-minute wireframe for a given scenario | Evaluates: speed of ideation, problem interpretation, information architecture |

### Assessment Management

- **Template library:** pre-built assessments by role type; clone and customise
- **Assessment builder:** drag-and-drop question composer with AI suggestion of questions based on JD requirements
- **Expiry settings:** links expire after a configurable number of days; AI sends reminders to candidates who haven't started
- **Proctoring:** tab-switch detection, time tracking, optional webcam
- **Bulk send:** select multiple candidates and dispatch with one action
- **Candidate experience:** mobile-friendly player, progress autosave, visible time remaining

### Assessment Results

- Per-candidate: overall score, time taken, question-by-question performance, AI written feedback paragraph
- Code quality analysis: readability, efficiency, edge case handling, best practice adherence
- Design rubric scoring: five dimensions with written AI commentary per dimension
- Comparative view: all candidates for a role ranked by assessment score
- Future capability: correlation tracking between assessment score and actual 90-day performance rating

---

## 13. Module 06 — Interviews

> *"Interviewers are not naturally good at interviewing. This is not a criticism — it is simply true. Interviewing is a skill that requires preparation, structure, and the ability to distinguish between a candidate who performs well in conversations and a candidate who will perform well in the job. These are not the same thing. AI can give every interviewer the preparation they need."*

### Purpose

The Interviews module ensures that every conversation between a candidate and an interviewer is prepared, structured, and well-documented. AI generates tailored interview guides per candidate — not per role, but per individual, based on their specific profile, gaps, and what questions remain unanswered after screening and assessment.

### Scheduling

- One-click scheduling request from candidate profile
- Google Calendar / Outlook integration for real-time availability
- Candidate self-schedule link: candidate picks from available slots (reduces back-and-forth by eliminating the scheduling negotiation entirely)
- Panel interview: add multiple interviewers and assign a focus area to each (technical / cultural / portfolio / leadership)
- Automated confirmation and reminder emails: 24 hours before, 1 hour before
- Video link auto-generated from Zoom / Google Meet integration

### AI Interview Guide

Generated per candidate. The AI reads the complete candidate profile — resume analysis, portfolio score, assessment results, AI content flags, fit assessment — and produces a guide tailored to what this particular conversation needs to accomplish.

**Contents of every AI Interview Guide:**

- **Opening context:** three sentences summarising who this candidate is, for an interviewer who hasn't reviewed the full profile
- **Strengths to validate:** signals that look strong in the profile but deserve verbal confirmation
- **Gaps to probe:** specific concerns the interview should address (*"No user research evidence in any case studies — explore how they validate design decisions before building"*)
- **Suggested questions:** 8–12 questions categorised as Technical / Behavioral / Portfolio Deep-dive / Culture
- **Suggested time allocation:** minutes per category based on interview length
- **Flags to verify:** any AI content flags or experience timeline inconsistencies worth raising directly

### Feedback and Scorecards

- Structured scorecard: per-criteria ratings (1–5) aligned to the job's required competencies
- AI-prompted free text for each rating: *"What specific evidence supports your score for problem-solving ability?"*
- Team calibration view: all interviewers' scores in one comparison table after submissions
- Calibration alert: if two interviewers diverge significantly on the same criterion, the system flags for discussion before a decision is made
- AI synthesis: after all scorecards are submitted, AI produces a three-paragraph hiring committee brief summarising consensus and disagreement areas
- Decision record: Move to Offer / Hold / Reject — with mandatory reasoning field that becomes part of the audit trail

---

## 14. Module 07 — Reports & Analytics

> *"The VP of People asked me once what our quality of hire was. I had to tell her I didn't know — not because we weren't tracking anything, but because everything we tracked was in four different spreadsheets maintained by three different people. That conversation was the beginning of every analytics platform I've ever built."*

### Purpose

Full visibility into hiring performance at every level of the organization. All reports are real-time, filterable by date range, role, department, and hiring manager. All are exportable. Role-based visibility controls ensure recruiters see their own pipelines while CHROs see the full picture.

### Report Categories

#### Hiring Performance
- Time-to-Hire trends: by role type, department, hiring manager — weekly / monthly / quarterly
- Cost-per-Hire breakdown: external sourcing costs + recruiter time + assessment platform + HireAI subscription
- Pipeline conversion rates: stage-by-stage funnel with industry benchmark overlay
- Offer acceptance rate trends with reason-for-decline tracking (HR logs decline reason for learning)
- Headcount tracking: hired vs. target per department

#### AI Performance
- AI shortlist accuracy: percentage of AI-shortlisted candidates who reached the offer stage
- False positive / negative rates: candidates AI filtered out who were manually reinstated and subsequently hired
- Bias monitoring: demographic breakdown of AI screening decisions vs. final hires (where data was collected with consent)
- AI content detection: percentage of applications flagged per role, HR override rates
- Portfolio analysis accuracy: correlation between AI portfolio score and interviewer quality rating

#### Source Analytics
- Application volume per channel: LinkedIn, Naukri, Indeed, referral, organic
- Quality score per source: average AI fit score of applicants from each channel
- Cost per quality hire per source: channel spend divided by hires from that channel
- Conversion rate per source: % of source applications that reach the offer stage

#### DEI and Compliance
- Diversity metrics at each pipeline stage (based on voluntarily provided data only)
- Stage-by-stage drop-off analysis by demographic group — flags statistically significant disparities
- Audit trail: every AI decision logged with criteria applied, confidence level, and override history
- EEOC-ready data export for US-based enterprise customers

### Report Features

- Scheduled reports: auto-email weekly or monthly summaries to configured stakeholders
- Export: PDF one-pager, full data CSV, or shareable live dashboard link
- Benchmark overlay: toggle to compare your metrics against industry averages (LinkedIn / SHRM data)

---

## 15. Module 08 — Communications

> *"Every candidate who applied to your company has invested time and hope. The ones you don't hire deserve a response. A thoughtful one. Sent in a reasonable time. This is not a nice-to-have — it is a basic professional obligation that shapes your employer brand for years."*

### Purpose

All candidate communication managed from a single place. AI-drafted templates. Bulk personalised sending. A candidate portal so applicants aren't left wondering where they stand.

### Features

- **Unified inbox:** all email threads per candidate in one view, associated with their profile
- **AI-drafted templates:** for every communication type — acknowledgment, shortlist notification, assessment invite, rejection, interview invitation, offer letter, feedback request
- **Personalisation tokens:** `{candidate_name}`, `{role_title}`, `{company_name}`, `{interviewer_name}` auto-populated; AI adds context-specific personalisation where appropriate
- **Bulk send with personalisation:** send fifty rejection emails with individual names, role references, and personalised notes in one action
- **Candidate Portal:** a shareable link where candidates see their application stage, completed and pending tasks, and a timeline of activity — no more "we'll be in touch" ambiguity
- **Post-process NPS survey:** automatically sent after hire or rejection; responses feed the candidate experience score on the dashboard
- **Template library:** create, edit, version-control, and categorise all communication templates by stage and role type

### Rejection Email Principles

AI-drafted rejections must always: use the candidate's name, reference the specific role, acknowledge their application genuinely, and close with a forward-looking note. They must never: be form-letter generic, include false promises ("we'll keep your resume on file"), or explain why the candidate was rejected in terms that could constitute legal exposure.

HR reviews AI drafts before bulk send is confirmed. One-click approval. One-click edit. Never sent without human sign-off.

---

## 16. Module 09 — Company Settings

### Company Profile
- Brand kit: logo and primary colour used in candidate-facing pages and email templates
- Culture values: free-text or structured tags — AI uses these in job description generation and culture fit scoring
- Office locations with remote policy defaults
- Hiring team directory: roles, permissions (view / comment / decide), notification preferences

### AI Configuration
- Global screening weight defaults by role category: Design / Engineering / Product / Data
- AI aggressiveness dial: Conservative (more to HR review) / Balanced / Aggressive (more auto-actions)
- AI content detection threshold: default 60%, adjustable per role type
- Portfolio analysis dimensions: enable or disable specific scoring criteria (e.g., disable motion design scoring for companies that don't work in that domain)
- Bias monitoring: enable demographic data collection for DEI reporting (requires configured candidate consent flow)
- Explainability level: how much AI reasoning is shown to candidates in their portal (none / summary / full)

### Integrations

| Category | Platforms | Function |
|---|---|---|
| **Job Boards** | LinkedIn, Naukri, Indeed, Glassdoor | Multi-channel posting and applicant sync |
| **Calendar** | Google Calendar, Outlook | Interview scheduling and availability |
| **Video** | Zoom, Google Meet, Teams | Auto-generated meeting links |
| **Messaging** | Slack | Notifications: top candidate alert, offer accepted, SLA warning |
| **ATS Migration** | Greenhouse, Lever, Workday | Import existing candidates and job history |
| **HRIS** | BambooHR, Workday, Darwinbox | Push hired candidates to HRIS automatically |
| **Identity** | Okta, Azure AD | Enterprise SSO and SCIM user provisioning |
| **Automation** | Zapier, Make | Custom workflow triggers for edge cases |

---

## 17. ARIA — The AI Agent

> *"The best EA I ever had didn't wait to be asked. She had already done the thing I was about to ask about. That's what ARIA needs to be — not a search bar, not a help FAQ, but a genuinely proactive colleague who understands what you're trying to accomplish and does it."*

### What ARIA Is

ARIA (Autonomous Recruitment Intelligence Assistant) is not a chatbot. It is not a search interface. It is an action-taking AI agent that can execute complex multi-step tasks across the entire HireAI platform in response to natural language commands.

Every other feature in HireAI requires the user to navigate to it. ARIA collapses all of that navigation into a single conversation interface, always accessible, always available.

### What ARIA Can Do

#### Job Management
- *"Post a job for a mid-level React developer for our payments team, same requirements as the last one we posted"* → AI creates the job pre-filled from the previous posting, requests confirmation, publishes
- *"Show me which jobs have been open longer than 30 days"* → Filtered jobs list with TTH data surfaced inline
- *"Pause all open roles in the product design department for two weeks"* → Bulk pause with scheduled reactivation

#### Candidate Management
- *"Show me all design candidates who applied this week with a score above 75"* → Filtered candidate view appears
- *"Send the coding assessment to all shortlisted candidates for the backend engineer role"* → Confirms candidate count, bulk sends
- *"Reject all candidates with AI content score above 80% in the UX Designer pipeline"* → Confirms, writes personalised rejections, sends
- *"Compare the top 3 candidates for the product designer role"* → Opens comparison view for those three
- *"Move Priya Mehta to the interview stage and assign Amaan as the interviewer"* → Executes stage move and assignment

#### Screening and Analysis
- *"Screen all unreviewed applications for the data scientist role"* → Triggers AI screening batch, returns plain-language summary
- *"Analyse these 5 portfolio URLs and rank them"* → Dispatches portfolio analysis, returns ranked results with scores and key observations
- *"Flag any candidates in the frontend developer pipeline with more than 50% AI content"* → Filters and highlights

#### Scheduling
- *"Schedule interviews for the top 3 candidates for the product designer role with Amaan on Thursday"* → Checks calendar availability, drafts invites, requests confirmation before sending
- *"Send a reminder to all candidates who received an assessment more than 48 hours ago but haven't started"* → Confirms list, sends

#### Analytics
- *"What's our average time to hire for design roles this quarter?"* → Inline analytics card with drill-down option
- *"Which job posting channel is giving us the highest quality candidates this month?"* → Source analytics summary
- *"Generate a hiring performance report for Q1 and email it to the HR team"* → Generates PDF, dispatches email

#### Content Generation
- *"Write a LinkedIn post announcing we're hiring a senior data scientist"* → Drafts post, HR approves before posting
- *"Write a rejection email for Rahul Kumar for the UX Designer role — mention his strong portfolio but weak research evidence"* → Personalised, context-aware draft that HR can edit or send as-is

### ARIA Proactive Suggestions (Unprompted)

ARIA monitors the platform and surfaces suggestions without being asked. These appear as dismissible notifications in the ARIA feed.

- *"You have 31 unreviewed candidates for the Senior UX Designer role — want me to screen them now?"*
- *"The frontend developer role has been open 38 days, above your 30-day benchmark. Consider broadening the candidate criteria or boosting the job posting."*
- *"3 candidates accepted their assessment but haven't started — should I send a reminder?"*
- *"Priya Mehta's assessment score (87/100) significantly outperforms the next candidate (61/100). You may want to fast-track her to interviews."*
- *"Your offer acceptance rate dropped to 48% this month against a benchmark of 72%. The most common decline reason logged is compensation. Consider reviewing salary bands for tech roles."*

### ARIA UX Principles

- **Entry:** floating button, bottom-right corner, all screens — one click always
- **Panel:** expands to a 400px right-side panel that slides in over the current view; the user doesn't lose their place
- **Input:** natural language text field with command history (up-arrow to cycle previous commands)
- **Confirmation:** all destructive or bulk actions require explicit confirmation before execution: *"About to reject 23 candidates. This will send personalised rejection emails to each. Confirm?"*
- **Undo:** every ARIA-executed action can be undone within 60 seconds via an undo toast
- **Transparency:** ARIA explains what it will do before it does it. Every completed action is logged in the Activity Feed.
- **Honesty:** if ARIA cannot complete a task, it says so clearly and describes the manual path
- **No silent actions:** ARIA never takes an action the user did not request or confirm

---

## 18. User Stories

| ID | User Story | Priority |
|---|---|---|
| US-01 | As a Recruiter, I want to post a new job using AI so I can create a fully structured JD in under two minutes without starting from a blank form | **P0 — Critical** |
| US-02 | As a Recruiter, I want AI to automatically screen all incoming resumes so I only spend time on shortlisted candidates | **P0 — Critical** |
| US-03 | As a Hiring Manager, I want to see a candidate's AI Fit Score, resume analysis, and portfolio score in one view so I can make an informed decision in under three minutes | **P0 — Critical** |
| US-04 | As an HR Manager, I want the dashboard to show me the health of my entire hiring pipeline so I can identify bottlenecks without building manual reports | **P0 — Critical** |
| US-05 | As a Recruiter, I want AI to detect AI-generated content in resumes so I can flag candidates who may have inflated their applications | **P0 — Critical** |
| US-06 | As a Design Hiring Manager, I want AI to evaluate candidate portfolios from their websites so I don't have to manually review every Behance and Figma link | **P0 — Critical** |
| US-07 | As a Recruiter, I want to tell ARIA to send the coding assessment to all shortlisted candidates so I don't have to do it manually one by one | **P0 — Critical** |
| US-08 | As a Hiring Manager, I want an AI-generated interview guide tailored to each specific candidate so I know exactly what to probe based on their profile gaps | **P1 — High** |
| US-09 | As a CHRO, I want a bias monitoring report showing the demographic breakdown of AI screening decisions so I can ensure fairness | **P1 — High** |
| US-10 | As a Recruiter, I want to compare three shortlisted candidates side-by-side so I can make a clear recommendation to the hiring manager | **P1 — High** |
| US-11 | As an HR Manager, I want to configure auto-screening rules per job type so the platform advances strong candidates and filters clear mismatches autonomously | **P1 — High** |
| US-12 | As a Recruiter, I want bulk AI-written rejection emails so I can maintain good candidate experience without writing individual messages | **P1 — High** |
| US-13 | As a Hiring Manager, I want all interview scorecards from my panel in one view so I can facilitate the hiring decision with full context | **P1 — High** |
| US-14 | As a CHRO, I want a source analytics report showing cost-per-quality-hire by channel so I can optimise our job posting budget | **P2 — Medium** |
| US-15 | As a Recruiter, I want ARIA to proactively alert me when a top candidate has been waiting more than three days so no strong candidate is lost to slow follow-up | **P2 — Medium** |

---

## 19. Non-Functional Requirements

### Performance

- Page load time: under 2 seconds for all primary views
- Resume AI analysis: complete within 60 seconds of application received
- Portfolio crawl and analysis: complete within 5 minutes of application received
- ARIA command response: under 3 seconds for queries; under 5 seconds for action execution
- Bulk screening (100 resumes): complete within 10 minutes
- Dashboard data refresh: real-time (under 30 second lag from event to dashboard update)

### Security and Compliance

- Data encryption: AES-256 at rest, TLS 1.3 in transit
- GDPR compliant: candidate data deletion on request; configurable retention policies
- SOC 2 Type II target for Year 2
- Role-based access control: granular permissions per module per user role
- SSO: SAML 2.0 / OAuth 2.0 for enterprise customers
- Audit log: immutable, complete record of all AI decisions, human overrides, and user actions
- Candidate consent: explicit consent collected for AI processing and any demographic data collection

### Scalability

- Support up to 10,000 active candidates simultaneously per workspace
- Support up to 500 concurrent users per enterprise workspace
- Up to 1,000 active job postings per workspace
- Horizontal scaling of AI processing queues during seasonal hiring peaks

### Accessibility

- WCAG 2.1 AA compliance across all screens
- Full keyboard navigation for all primary workflows
- Screen reader support for candidate profile and pipeline views
- All colour contrast ratios verified against WCAG AA thresholds using the Glass & Soft design token values

### AI Ethics

These are not guidelines. These are requirements.

- **Explainability:** Every AI score is accompanied by a human-readable reasoning summary. No black-box verdicts.
- **Bias monitoring:** Demographic parity checks run automatically on screening decisions, weekly.
- **Human-in-the-loop:** No candidate is auto-rejected without an available HR review pathway.
- **AI content is a signal, not a verdict:** Flagged candidates are never automatically eliminated. HR decides.
- **Training data audited:** AI models are audited for historical bias before deployment and after each significant update.
- **Candidate transparency:** All candidates are informed in the application flow that AI is used in the screening process.
- **Override capability:** Every AI decision can be overridden by a human, and every override is logged.

---

## 20. Roadmap

### Phase 1 — MVP (Months 1–3)
*Goal: First paying users. Core AI screening loop operational.*

- Dashboard (core metrics, pipeline funnel, activity feed)
- Jobs module with AI-assisted JD generation
- Candidates module with resume parsing and AI Fit Scoring
- Basic AI content detection (resume and cover letter)
- Kanban pipeline management
- Bulk communications with AI-drafted emails
- ARIA (core commands: job posting, candidate filtering, bulk sends, basic queries)

### Phase 2 — Core AI (Months 4–6)
*Goal: Full AI screening loop complete. Portfolio analysis live.*

- Portfolio analysis: web crawl, multimodal scoring, comparative ranking
- Full AI content detection including portfolio text
- Assessment Center: coding tests and design brief evaluations
- AI-powered shortlisting and auto-screening rules engine
- Candidate comparison tool
- ARIA expanded command set

### Phase 3 — Intelligence (Months 7–9)
*Goal: Enterprise-ready. Full reporting and bias monitoring.*

- Interviews module: AI guide generation, scheduling, scorecards, synthesis
- Full Reports and Analytics suite
- Source analytics and channel optimisation
- Bias monitoring dashboard
- ARIA proactive suggestions
- Candidate Portal (public-facing)

### Phase 4 — Enterprise (Months 10–12)
*Goal: Large organisation readiness. Compliance and scale.*

- SSO / SCIM integration
- HRIS integrations (BambooHR, Workday, Darwinbox)
- White-label mode for staffing agencies
- DEI compliance reporting (EEOC-ready)
- Quality-of-Hire correlation tracking (90-day performance data)
- ARIA voice input
- Mobile app (iOS and Android)

### Phase 5 — Platform (Year 2+)
*Goal: Market leadership. Ecosystem and prediction.*

- Predictive QoH model (predicts 90-day retention at screening stage)
- Async video interviews with AI analysis
- Talent pool CRM (keep warm candidate relationships)
- Skills gap analysis feeding into L&D recommendations
- API marketplace for third-party integrations
- Industry-specific assessment libraries (Fintech / Healthcare / E-commerce / etc.)

---

## 21. Open Questions & Assumptions

### Open Questions

1. **AI Model Selection** — Which LLM provider powers the core AI features? GPT-4o, Claude, or a combination strategy? Decision affects cost, accuracy, rate limits, and data residency for enterprise customers.

2. **Portfolio Crawling Scope** — How do we handle Behance, Figma Community, password-protected portfolios, and PDFs? Need to define crawl scope and fallback behaviour when a portfolio cannot be accessed.

3. **Bias Monitoring Data** — What demographic data can we legally collect and in which geographies? This requires legal review per market. India, Canada, and the US each have different requirements.

4. **Pricing Model** — Seat-based? Job-posting volume? AI credits model? Freemium with a usage cap? To be defined post-MVP market testing.

5. **Assessment Question Bank** — Do we build our own question bank for coding assessments or license from HackerRank / CodeSignal? Building takes longer but avoids dependency; licensing is faster but adds cost and reduces differentiation.

6. **GitHub Analysis Depth** — OAuth-based access for private repos (more signal, more friction) or public repo analysis only (less signal, zero friction)? Decision affects quality of technical profile for candidates with private work.

7. **ARIA Trust Threshold** — What categories of action require mandatory human confirmation vs. can be executed autonomously? Needs a defined framework before development begins to avoid scope creep in both directions.

8. **Candidate Portal Scope for Phase 1** — Hosted web page, mobile experience, or both? How much status detail does a candidate see? What communications come through the portal vs. email?

### Assumptions

- Primary access is web browser, desktop-first. Mobile-responsive for Phase 1; native mobile app in Phase 4.
- Initial GTM targets companies with 50–2,000 employees, primarily in India and Canada, hiring Design and Tech roles.
- Candidates apply via standard web application forms — HireAI controls the data capture. LinkedIn Easy Apply handled as a separate integration track.
- AI scoring accuracy will improve over time through a feedback loop: HR override data trains and recalibrates the models.
- ARIA is powered by a combination of structured platform API calls and an LLM reasoning layer — not a rule-based bot. The LLM determines intent and orchestrates API calls; it does not have direct database access.
- The Glass & Soft UI design system (Urbanist typeface, blue-tinted glassmorphism, established token set) is the locked visual language for the entire platform.
- The research foundation of this product — the AI-AHEF framework — is publicly documented and provides the ethical and structural justification for the AI-first approach.

---

*HireAI PRD v1.0 · Confidential · February 2026*

*Prepared by Amaan · AI Product Design Manager · Happening Design Agency*

*Research Foundation: AI-Augmented Hiring Efficiency Framework · Leenus Telare, SSODL Pune 2025*

---

> *"The measure of a great hiring process is not how quickly it fills seats. It is how often the people it places still belong, still grow, and still remember why they joined — two years later."*
