# WiseHire Complete Rebuild — Design Spec

## Overview
Full UI redesign (purple→blue, premium spacing, WCAG AA) + build all missing pages (Assessments, Interviews, Reports, Settings) with complete mock data. All interactions functional with mock data, no backend.

## Design System Changes

### Colors — Purple to Blue
- `--brand-600: #0E5EF5` (primary)
- `--brand-700: #0B4DCC` (hover)
- `--brand-500: #3B82F6` (ring/focus)
- `--brand-400: #60A5FA`
- `--brand-300: #93C5FD`
- `--brand-200: #BFDBFE`
- `--brand-100: #DBEAFE`
- `--brand-50: #EFF6FF`
- `--brand-25: #F5F9FF`
- `--brand-800: #1E40AF`
- `--brand-900: #1E3A8A`
- `--brand-950: #172554`
- Gray, success, warning, error scales unchanged

### Typography — Inter to Urbanist
- Google Font: Urbanist 300,400,500,600
- Headings: weight 600, letter-spacing -0.025em
- Body: weight 400
- Labels: weight 600, uppercase, tracking wide
- Page titles: 1.5rem, section heads: 1.125rem, body: 0.875rem

### Spacing — Generous
- Page padding: p-8
- Card gaps: gap-6
- Section gaps: space-y-8
- Inner card padding: p-6

### Shadows — Blue-tinted
- `--shadow-sm: 0 1px 3px rgba(14,94,245,0.04), 0 1px 2px rgba(14,94,245,0.03)`
- `--shadow-md: 0 4px 16px rgba(14,94,245,0.06), 0 2px 4px rgba(14,94,245,0.03)`
- `--shadow-lg: 0 12px 40px rgba(14,94,245,0.08), 0 4px 12px rgba(14,94,245,0.04)`

### Components
- Cards: white bg, rounded-xl (16px), blue-tinted shadow, hover lift translateY(-1px)
- Buttons: pill radius for primary actions, 12px radius for secondary
- AI content zones: brand-25 bg, brand-200 left border
- Score tiers: green (75-100), blue (50-74), amber (30-49), red (0-29)
- Sidebar: white bg, blue active states, blue-600 logo mark

### WCAG 4.5:1 Contrast
- Body text: gray-700 (#344054) on white = 7.1:1
- Secondary: gray-500 (#667085) on white = 4.6:1
- brand-600 (#0E5EF5) on white = 4.7:1

## Existing Page Enhancements

### All Pages
- AI Insights banner at top (blue-50 bg, sparkle icon, proactive insight text, key stats)
- New typography and spacing applied
- Blue brand tokens throughout

### Dashboard
- Same structure, new tokens
- Blue health score ring, blue pipeline chart gradient
- AI insights banner with hiring summary

### Candidates
- AI Insights banner: "ARIA has identified X high-potential candidates..."
- Stats row: Avg Match Score, Ready to Interview, Response Rate
- Card redesign: avatar, name, role, stage+score badges, contact info, 3 actions (AI Analysis, Advance, Send AI Email)
- AI Analysis modal: score bar, strengths list, concerns list (good AND bad), skill match bars, AI recommendations zone
- Bulk AI Screening modal: criteria checklist, candidate count, est time, start button

### Jobs
- AI Hiring Insights banner
- Card redesign: title, AI Generated badge, dept+location, openings, posted date, applicants, actions
- Create Job modal: title, dept/location, AI JD generator, description, create button

### Screening & Communications
- Apply new tokens, add AI insights banners

## New Pages

### Assessments (tabs: Active, Library, Results)
- **Active**: Assessment cards — name, type badge, assigned count, completion progress, due date, actions
- **Library**: Template cards — name, type, question count, avg time, difficulty, Use/Edit/Duplicate
- **Results**: Table — candidate, assessment, score (color tier), time, date, AI feedback, View Detail
- Mock data: 4 active assessments, 8 library templates, 12 results

### Interviews (tabs: Scheduled, Guides, Feedback)
- **Scheduled**: Interview list — candidate+avatar, job, type badge, datetime, interviewers, status, actions
- **Guides**: AI interview guides per candidate — sections (Opening, Strengths, Gaps, Questions, Time, Flags)
- **Feedback**: Scorecards — candidate, interviewer, criteria ratings 1-5, notes, decision, AI synthesis
- Mock data: 6 scheduled, 4 guides, 8 feedback entries

### Reports (tabs: Hiring, AI Performance, Sources, DEI)
- **Hiring**: 4 KPI stat cards + TTH trend line chart + conversion funnel bar chart
- **AI Performance**: Accuracy metrics cards + screening volume chart + bias indicators
- **Sources**: Source breakdown bar chart + quality table per source
- **DEI**: Pipeline demographics chart + stage drop-off + compliance indicators + export
- Mock data: 6 months of trend data, source breakdowns, demographic distributions

### Settings (tabs: Company, AI Config, Team, Integrations)
- **Company**: Name, logo, brand colors, culture values tags, locations
- **AI Config**: Screening weight sliders, auto-screening toggles, detection sensitivity, ARIA settings
- **Team**: Member table — name, role, email, permissions, status, actions
- **Integrations**: Cards — logo placeholder, name, description, status badge, connect/disconnect
- Mock data: 5 team members, 8 integrations

## Implementation Order
1. Design tokens (globals.css) + font swap
2. Sidebar + layout components
3. Shared components (AI insights banner, modal patterns)
4. Dashboard fixes
5. Candidates enhancements (cards, modals)
6. Jobs enhancements (cards, modal)
7. Screening + Communications token updates
8. Mock data additions for new pages
9. Assessments page
10. Interviews page
11. Reports page (with Recharts)
12. Settings page

## Architecture Notes
- All new pages follow existing pattern: `app/(dashboard)/<route>/page.tsx` with tab structure
- New components in `components/<module>/` directories
- Mock data added to `lib/mock-data.ts`
- New types added to `lib/types.ts`
- Tabs via existing shadcn Tabs component
- Charts via existing Recharts dependency
- Modals via existing shadcn Dialog component
- No new dependencies needed
