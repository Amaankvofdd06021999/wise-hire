import type {
  DashboardStats,
  PipelineStage,
  Job,
  Candidate,
  ActivityFeedItem,
  UrgentAction,
  ScreeningBatch,
  ScreeningRule,
  Thread,
  EmailTemplate,
  AriaCard,
  Skill,
  ResumeAnalysis,
  PortfolioAnalysis,
  TechnicalProfile,
  AiContentAnalysis,
  FitAssessment,
  CareerEntry,
  TeamActivityEntry,
  Assessment,
  AssessmentTemplate,
  AssessmentResult,
  Interview,
  InterviewGuide,
  InterviewFeedback,
  HiringMetric,
  SourceMetric,
  AIPerformanceMetric,
  DEIMetric,
  TeamMember,
  Integration,
  CompanySettings,
} from "./types";

// ---------------------------------------------------------------------------
// 1. Dashboard Stats
// ---------------------------------------------------------------------------
export const dashboardStats: DashboardStats = {
  healthScore: 74,
  activeJobs: { value: 12, delta: 3, deltaPercent: 12 },
  pipelineCandidates: { value: 847, newToday: 47 },
  avgTTH: { value: 32, benchmark: 45, deltaPercent: -8 },
  avgCPH: { value: 21400, target: 25000, deltaPercent: -12 },
};

// ---------------------------------------------------------------------------
// 2. Pipeline Stages
// ---------------------------------------------------------------------------
export const pipelineStages: PipelineStage[] = [
  { name: "Applied", key: "applied", count: 342, conversionPercent: 100 },
  { name: "AI Screened", key: "ai_screened", count: 186, conversionPercent: 54 },
  { name: "Shortlisted", key: "shortlisted", count: 67, conversionPercent: 36 },
  { name: "Assessment", key: "assessment", count: 31, conversionPercent: 46 },
  { name: "Interview Scheduled", key: "interview_scheduled", count: 18, conversionPercent: 58 },
  { name: "Interview Done", key: "interview_done", count: 12, conversionPercent: 67 },
  { name: "Offer", key: "offer", count: 8, conversionPercent: 67 },
  { name: "Hired", key: "hired", count: 4, conversionPercent: 50 },
];

// ---------------------------------------------------------------------------
// 3. Mock Jobs
// ---------------------------------------------------------------------------
export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Product Designer",
    department: "Design",
    location: "Bangalore",
    remotePolicy: "hybrid",
    status: "active",
    hiringManager: "Amaan Shahana",
    applicantsCount: 47,
    newApplicantsToday: 5,
    daysOpen: 18,
    tthDays: 28,
    tthBenchmark: 45,
    salaryRange: { min: 2500000, max: 4000000, currency: "INR" },
    description: {
      summary:
        "We are looking for a Senior Product Designer to lead end-to-end design for our core product experiences. You will collaborate with product managers, engineers, and researchers to ship high-impact features that delight millions of users.",
      responsibilities: [
        "Lead end-to-end product design from concept through launch for key product areas",
        "Conduct user research and usability testing to inform design decisions with data",
        "Build and maintain scalable design systems and component libraries in Figma",
        "Mentor junior designers and establish best practices across the design team",
        "Present design rationale to stakeholders and iterate based on feedback",
      ],
      mustHaves: [
        "5+ years of product design experience with a strong portfolio of shipped work",
        "Expert-level Figma proficiency including components, auto-layout, and variables",
        "Demonstrated user research skills with evidence of research-informed design decisions",
        "Experience building or contributing to a design system at scale",
      ],
      niceToHaves: [
        "Experience with motion design and micro-interactions",
        "Background in fintech or B2B SaaS products",
        "Familiarity with front-end development (HTML/CSS/React)",
      ],
    },
    screeningWeights: { portfolio: 40, experience: 30, skills: 20, culture: 10 },
    skills: [
      { name: "Figma", matched: "full", required: true },
      { name: "User Research", matched: "full", required: true },
      { name: "Design Systems", matched: "partial", required: true },
      { name: "Prototyping", matched: "full", required: false },
      { name: "Motion Design", matched: "missing", required: false },
    ],
    channels: ["LinkedIn", "Naukri", "Career Page"],
    createdAt: "2026-02-26T10:00:00Z",
  },
  {
    id: "2",
    title: "UX Research Lead",
    department: "Design",
    location: "Toronto",
    remotePolicy: "remote",
    status: "active",
    hiringManager: "Sarah Mitchell",
    applicantsCount: 23,
    newApplicantsToday: 2,
    daysOpen: 32,
    tthDays: 38,
    tthBenchmark: 45,
    salaryRange: { min: 90000, max: 120000, currency: "CAD" },
    description: {
      summary:
        "We need a UX Research Lead to build and scale our research practice. You will define the research roadmap, lead strategic studies, and embed user insights into every product decision.",
      responsibilities: [
        "Define the UX research strategy and build a research roadmap aligned with product goals",
        "Plan and execute qualitative and quantitative research studies end-to-end",
        "Synthesize findings into actionable insights and present to leadership",
        "Build and mentor a team of UX researchers across multiple product areas",
      ],
      mustHaves: [
        "7+ years of UX research experience with at least 2 years in a leadership role",
        "Expertise in both qualitative and quantitative research methodologies",
        "Experience building and scaling a research practice from the ground up",
      ],
      niceToHaves: [
        "Experience with research operations and tooling at scale",
        "Background in enterprise or B2B products",
      ],
    },
    screeningWeights: { portfolio: 30, experience: 35, skills: 25, culture: 10 },
    skills: [
      { name: "User Research", matched: "full", required: true },
      { name: "Qualitative Methods", matched: "full", required: true },
      { name: "Quantitative Methods", matched: "partial", required: true },
      { name: "Research Ops", matched: "missing", required: false },
    ],
    channels: ["LinkedIn", "Indeed", "Career Page"],
    createdAt: "2026-02-12T10:00:00Z",
  },
  {
    id: "3",
    title: "Visual Designer",
    department: "Design",
    location: "Mumbai",
    remotePolicy: "onsite",
    status: "active",
    hiringManager: "Raj Patel",
    applicantsCount: 61,
    newApplicantsToday: 8,
    daysOpen: 8,
    tthDays: 12,
    tthBenchmark: 30,
    salaryRange: { min: 800000, max: 1500000, currency: "INR" },
    description: {
      summary:
        "Join our brand and marketing team as a Visual Designer. You will create stunning visual assets for campaigns, product launches, and brand collateral across digital and print.",
      responsibilities: [
        "Design visual assets for marketing campaigns across social, web, and print channels",
        "Maintain and evolve the brand visual identity and guidelines",
        "Collaborate with content and growth teams to produce high-converting creative",
        "Create illustrations, icons, and infographics that communicate complex ideas clearly",
      ],
      mustHaves: [
        "3+ years of visual or graphic design experience with a strong portfolio",
        "Proficiency in Figma and Adobe Creative Suite",
        "Strong typography, color theory, and layout fundamentals",
      ],
      niceToHaves: [
        "Experience with motion graphics or video editing",
        "Illustration skills",
        "Understanding of brand strategy",
      ],
    },
    screeningWeights: { portfolio: 50, experience: 20, skills: 20, culture: 10 },
    skills: [
      { name: "Figma", matched: "full", required: true },
      { name: "Visual Design", matched: "full", required: true },
      { name: "Typography", matched: "full", required: true },
      { name: "Illustration", matched: "partial", required: false },
    ],
    channels: ["LinkedIn", "Naukri", "Behance"],
    createdAt: "2026-03-08T10:00:00Z",
  },
  {
    id: "4",
    title: "Design Systems Engineer",
    department: "Design",
    location: "Bangalore",
    remotePolicy: "hybrid",
    status: "draft",
    hiringManager: "Amaan Shahana",
    applicantsCount: 0,
    newApplicantsToday: 0,
    daysOpen: 0,
    tthDays: 0,
    tthBenchmark: 40,
    salaryRange: { min: 2000000, max: 3500000, currency: "INR" },
    description: {
      summary:
        "We are hiring a Design Systems Engineer to bridge design and engineering. You will build, document, and maintain our component library ensuring pixel-perfect implementation.",
      responsibilities: [
        "Build and maintain React component library aligned with design specifications",
        "Write comprehensive documentation and usage guidelines for each component",
        "Collaborate with designers to translate design tokens into code",
        "Ensure accessibility compliance across all components",
      ],
      mustHaves: [
        "4+ years of front-end engineering experience with React and TypeScript",
        "Experience building or maintaining a design system or component library",
        "Strong understanding of accessibility standards (WCAG 2.1 AA)",
      ],
      niceToHaves: [
        "Experience with Storybook or similar documentation tools",
        "Familiarity with design tools like Figma",
      ],
    },
    screeningWeights: { portfolio: 25, experience: 30, skills: 35, culture: 10 },
    skills: [
      { name: "React", matched: "full", required: true },
      { name: "TypeScript", matched: "full", required: true },
      { name: "CSS", matched: "full", required: true },
      { name: "Accessibility", matched: "partial", required: false },
    ],
    channels: [],
    createdAt: "2026-03-16T10:00:00Z",
  },
  {
    id: "5",
    title: "Senior Full Stack Engineer",
    department: "Engineering",
    location: "Toronto",
    remotePolicy: "hybrid",
    status: "active",
    hiringManager: "David Kim",
    applicantsCount: 89,
    newApplicantsToday: 12,
    daysOpen: 25,
    tthDays: 30,
    tthBenchmark: 45,
    salaryRange: { min: 120000, max: 160000, currency: "CAD" },
    description: {
      summary:
        "We are looking for a Senior Full Stack Engineer to build and scale our core platform. You will own features end-to-end, from database design to polished UI, working in a fast-paced product team.",
      responsibilities: [
        "Design, build, and ship full-stack features using TypeScript, React, and Node.js",
        "Own technical architecture decisions for your product area",
        "Write clean, tested, and well-documented code that other engineers love to work with",
        "Participate in code reviews and mentor junior engineers",
        "Collaborate with product and design to scope and estimate work",
      ],
      mustHaves: [
        "5+ years of software engineering experience with TypeScript and React",
        "Strong backend experience with Node.js and relational databases",
        "Experience with cloud infrastructure (AWS or GCP)",
        "Track record of shipping features in a fast-paced environment",
      ],
      niceToHaves: [
        "Experience with GraphQL and microservices architecture",
        "Familiarity with CI/CD pipelines and DevOps practices",
        "Contributions to open-source projects",
      ],
    },
    screeningWeights: { portfolio: 10, experience: 30, skills: 40, culture: 20 },
    skills: [
      { name: "TypeScript", matched: "full", required: true },
      { name: "React", matched: "full", required: true },
      { name: "Node.js", matched: "full", required: true },
      { name: "PostgreSQL", matched: "partial", required: true },
      { name: "AWS", matched: "full", required: false },
      { name: "GraphQL", matched: "missing", required: false },
    ],
    channels: ["LinkedIn", "Indeed", "Career Page", "Hacker News"],
    createdAt: "2026-02-19T10:00:00Z",
  },
  {
    id: "6",
    title: "Backend Engineer",
    department: "Engineering",
    location: "Pune",
    remotePolicy: "hybrid",
    status: "active",
    hiringManager: "Vikram Mehta",
    applicantsCount: 34,
    newApplicantsToday: 3,
    daysOpen: 12,
    tthDays: 18,
    tthBenchmark: 35,
    salaryRange: { min: 1500000, max: 2500000, currency: "INR" },
    description: {
      summary:
        "Join our backend team to build reliable, high-performance APIs and services that power our platform. You will work on systems that handle millions of requests daily.",
      responsibilities: [
        "Design and implement RESTful APIs and backend services in Node.js or Go",
        "Optimize database queries and ensure data integrity at scale",
        "Build monitoring and alerting for production services",
        "Participate in on-call rotation and incident response",
      ],
      mustHaves: [
        "3+ years of backend engineering experience",
        "Proficiency in Node.js, Python, or Go",
        "Experience with relational and NoSQL databases",
      ],
      niceToHaves: [
        "Experience with message queues (Kafka, RabbitMQ)",
        "Familiarity with containerization and Kubernetes",
      ],
    },
    screeningWeights: { portfolio: 5, experience: 30, skills: 45, culture: 20 },
    skills: [
      { name: "Node.js", matched: "full", required: true },
      { name: "PostgreSQL", matched: "full", required: true },
      { name: "Redis", matched: "partial", required: false },
      { name: "Docker", matched: "full", required: false },
    ],
    channels: ["LinkedIn", "Naukri", "Career Page"],
    createdAt: "2026-03-04T10:00:00Z",
  },
  {
    id: "7",
    title: "Data Scientist",
    department: "Engineering",
    location: "Remote",
    remotePolicy: "remote",
    status: "draft",
    hiringManager: "Priya Singh",
    applicantsCount: 0,
    newApplicantsToday: 0,
    daysOpen: 0,
    tthDays: 0,
    tthBenchmark: 50,
    salaryRange: { min: 2000000, max: 3500000, currency: "INR" },
    description: {
      summary:
        "We are hiring a Data Scientist to build ML models that power our AI screening and recommendation systems. You will work at the intersection of data engineering and product.",
      responsibilities: [
        "Build and deploy ML models for candidate screening and matching",
        "Analyze large datasets to uncover hiring trends and optimize funnels",
        "Collaborate with engineering to productionize models",
        "Design A/B experiments and measure model performance",
      ],
      mustHaves: [
        "3+ years of data science experience with Python and SQL",
        "Experience building and deploying ML models in production",
        "Strong statistical foundations and experiment design skills",
      ],
      niceToHaves: [
        "Experience with NLP and text classification",
        "Familiarity with MLOps tools (MLflow, Kubeflow)",
      ],
    },
    screeningWeights: { portfolio: 10, experience: 30, skills: 40, culture: 20 },
    skills: [
      { name: "Python", matched: "full", required: true },
      { name: "Machine Learning", matched: "full", required: true },
      { name: "SQL", matched: "full", required: true },
      { name: "NLP", matched: "partial", required: false },
    ],
    channels: [],
    createdAt: "2026-03-16T10:00:00Z",
  },
  {
    id: "8",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Toronto",
    remotePolicy: "onsite",
    status: "closed",
    hiringManager: "David Kim",
    applicantsCount: 45,
    newApplicantsToday: 0,
    daysOpen: 60,
    tthDays: 55,
    tthBenchmark: 35,
    salaryRange: { min: 100000, max: 140000, currency: "CAD" },
    description: {
      summary:
        "We needed a DevOps Engineer to own our cloud infrastructure and CI/CD pipelines. This role has been filled.",
      responsibilities: [
        "Manage and optimize AWS infrastructure using Terraform",
        "Build and maintain CI/CD pipelines for all engineering teams",
        "Implement monitoring, logging, and alerting across services",
        "Ensure security best practices and compliance across infrastructure",
      ],
      mustHaves: [
        "4+ years of DevOps or SRE experience",
        "Expert-level AWS knowledge with Terraform or CloudFormation",
        "Experience with Kubernetes and container orchestration",
      ],
      niceToHaves: [
        "Experience with multi-cloud environments",
        "Security certifications (AWS Security Specialty, CKS)",
      ],
    },
    screeningWeights: { portfolio: 5, experience: 35, skills: 40, culture: 20 },
    skills: [
      { name: "AWS", matched: "full", required: true },
      { name: "Terraform", matched: "full", required: true },
      { name: "Kubernetes", matched: "full", required: true },
      { name: "CI/CD", matched: "full", required: false },
    ],
    channels: ["LinkedIn", "Indeed"],
    createdAt: "2026-01-15T10:00:00Z",
  },
];

// ---------------------------------------------------------------------------
// 4. Mock Candidates
// ---------------------------------------------------------------------------

// --- Candidate 1: Priya Mehta (FULLY FLESHED) ---
const priyaMehta: Candidate = {
  id: "1",
  name: "Priya Mehta",
  email: "priya.mehta@email.com",
  avatarUrl: null,
  currentRole: "Senior UX Designer",
  currentCompany: "Razorpay",
  location: "Bangalore",
  appliedDate: "2026-03-10T09:00:00Z",
  jobId: "1",
  stage: "interview_scheduled",
  daysInStage: 2,
  aiScore: 91,
  scoreTier: "strong",
  aiSummary:
    "Exceptional candidate with 7 years of design experience and a strong portfolio. Consistent career growth from IC to Lead at top fintech companies. All must-have requirements met.",
  aiVerdict: "Strong match — recommend fast-tracking to interview.",
  skills: [
    { name: "Figma", matched: "full", required: true },
    { name: "User Research", matched: "full", required: true },
    { name: "Design Systems", matched: "full", required: true },
    { name: "Prototyping", matched: "full", required: false },
    { name: "Motion Design", matched: "partial", required: false },
  ],
  skillMatchPercent: 92,
  yearsExperience: 7,
  aiContentPercent: 12,
  hasAiContentFlag: false,
  portfolioUrl: "https://priyamehta.design",
  portfolioScore: 89,
  githubUrl: null,
  resumeAnalysis: {
    qualityScore: 88,
    trajectoryAnalysis:
      "Consistent growth from IC Designer to Lead in 4 years. Two product-focused roles at fintech companies show strong domain depth. Clear progression in responsibility and scope.",
    redFlags: [],
    recommendation: "shortlist",
    recommendationReasoning:
      "Exceptional match for Senior Product Designer. Strong portfolio scores, consistent career trajectory, and deep fintech domain experience align perfectly with role requirements.",
  },
  portfolioAnalysis: {
    overallScore: 89,
    tier: "strong",
    websiteMetrics: { loadSpeed: 95, mobileResponsive: true, brokenLinks: 0, accessibilityScore: 92 },
    dimensions: { visualDesign: 8.5, uxThinking: 9.0, caseStudyClarity: 8.0, businessImpact: 7.5, processDocumentation: 8.5 },
    projects: [
      {
        title: "Razorpay Dashboard Redesign",
        score: 92,
        strength: "Exceptional UX thinking with clear business impact metrics",
        gap: "Could document more user testing methodology",
      },
      {
        title: "Payment Flow Optimization",
        score: 87,
        strength: "Strong data-driven design decisions",
        gap: "Limited exploration of alternative solutions",
      },
      {
        title: "Design System v2.0",
        score: 88,
        strength: "Systematic approach to component architecture",
        gap: "Missing accessibility documentation",
      },
    ],
    toolsDetected: ["Figma", "Framer", "Principle"],
    comparativeRank: { rank: 1, total: 24 },
  },
  technicalProfile: null,
  aiContentAnalysis: {
    overallPercent: 12,
    sections: [
      { name: "Resume Summary", score: 8, confidence: 92 },
      { name: "Experience Descriptions", score: 15, confidence: 88 },
      { name: "Cover Letter", score: 12, confidence: 90 },
    ],
    flaggedExcerpts: [],
    overrideStatus: null,
  },
  fitAssessment: {
    requirements: [
      { criterion: "5+ years design experience", status: "met", evidence: "7 years across 3 companies", isRequired: true },
      { criterion: "Figma proficiency", status: "met", evidence: "Primary tool in portfolio, Design System built in Figma", isRequired: true },
      { criterion: "User research capability", status: "met", evidence: "3 of 3 case studies document user research methodology", isRequired: true },
      { criterion: "Mobile app design", status: "met", evidence: "2 mobile-focused projects in portfolio", isRequired: true },
      { criterion: "B2B/SaaS experience", status: "met", evidence: "Razorpay and previous fintech roles are B2B", isRequired: false },
      { criterion: "Motion design skills", status: "partial", evidence: "Some micro-interactions shown but no dedicated motion work", isRequired: false },
    ],
    aiRecommendation:
      "Priya is an exceptional candidate for the Senior Product Designer role. Her 7 years of design experience includes consistent growth from IC to Lead, and her portfolio demonstrates strong UX thinking (9.0/10) with clear business impact articulation. All must-have requirements are met. The only gap is motion design, which is a nice-to-have. Recommend fast-tracking to interview.",
    biasCheckPassed: true,
  },
  careerTimeline: [
    { company: "Razorpay", role: "Lead Product Designer", startDate: "2024-01", endDate: null, current: true },
    { company: "PhonePe", role: "Senior UX Designer", startDate: "2022-03", endDate: "2023-12", current: false },
    { company: "Flipkart", role: "UX Designer", startDate: "2020-06", endDate: "2022-02", current: false },
    { company: "Infosys", role: "UI Designer", startDate: "2019-01", endDate: "2020-05", current: false },
  ],
  teamActivity: [
    { userId: "u1", userName: "Amaan Shahana", avatarUrl: null, action: "viewed", timestamp: "2026-03-15T10:30:00Z" },
    { userId: "u2", userName: "Sarah Mitchell", avatarUrl: null, action: "commented", comment: "Strong portfolio. Let's fast-track to interview.", timestamp: "2026-03-15T11:45:00Z" },
    { userId: "u1", userName: "Amaan Shahana", avatarUrl: null, action: "rated", rating: 5, timestamp: "2026-03-15T14:00:00Z" },
  ],
};

// --- Candidate 2: Alex Chen (FULLY FLESHED) ---
const alexChen: Candidate = {
  id: "2",
  name: "Alex Chen",
  email: "alex.chen@email.com",
  avatarUrl: null,
  currentRole: "Senior Engineer",
  currentCompany: "Shopify",
  location: "Toronto",
  appliedDate: "2026-03-08T11:00:00Z",
  jobId: "5",
  stage: "assessment",
  daysInStage: 3,
  aiScore: 68,
  scoreTier: "good",
  aiSummary:
    "Strong technical skills confirmed by GitHub profile. Some concern about career stability with 3 startups in 5 years. Assessment will help validate depth.",
  aiVerdict: "Good match — proceed to assessment to validate depth.",
  skills: [
    { name: "TypeScript", matched: "full", required: true },
    { name: "React", matched: "full", required: true },
    { name: "Node.js", matched: "full", required: true },
    { name: "PostgreSQL", matched: "partial", required: true },
    { name: "AWS", matched: "full", required: false },
    { name: "GraphQL", matched: "missing", required: false },
  ],
  skillMatchPercent: 78,
  yearsExperience: 5,
  aiContentPercent: 34,
  hasAiContentFlag: false,
  portfolioUrl: null,
  portfolioScore: null,
  githubUrl: "https://github.com/alexchen-dev",
  resumeAnalysis: {
    qualityScore: 72,
    trajectoryAnalysis:
      "Moved between 3 startups in 5 years, showing breadth but potentially lacking depth. Current Shopify role is the longest tenure. Skills are strong but experience could be deeper.",
    redFlags: [
      {
        text: "Employment gap of 4 months in 2024",
        context: "Worth exploring in interview — may be sabbatical or job search",
      },
    ],
    recommendation: "consider",
    recommendationReasoning:
      "Strong technical skills match but career stability is a minor concern. Assessment will help validate depth of knowledge.",
  },
  portfolioAnalysis: null,
  technicalProfile: {
    githubUsername: "alexchen-dev",
    contributionData: [
      3, 5, 2, 8, 6, 1, 0, 4, 7, 3, 9, 2, 5, 8, 1, 6, 4, 0, 3, 7,
      2, 5, 9, 1, 4, 6, 8, 3, 0, 5, 7, 2, 4, 9, 1, 6, 3, 8, 5, 0,
      2, 7, 4, 1, 6, 3, 9, 5, 8, 2, 4, 7,
    ],
    languages: [
      { name: "TypeScript", percent: 45, color: "#3178c6" },
      { name: "Python", percent: 30, color: "#3572A5" },
      { name: "Go", percent: 15, color: "#00ADD8" },
      { name: "Rust", percent: 10, color: "#dea584" },
    ],
    topRepos: [
      { name: "distributed-cache", stars: 234, description: "A distributed caching layer built with Go and Redis", language: "Go" },
      { name: "react-query-builder", stars: 189, description: "Visual query builder component for React applications", language: "TypeScript" },
      { name: "ml-pipeline", stars: 67, description: "End-to-end ML pipeline framework with Python", language: "Python" },
      { name: "rust-wasm-playground", stars: 45, description: "WebAssembly experiments with Rust", language: "Rust" },
    ],
    codeQuality: { readme: 78, commenting: 65, structure: 82 },
    techStack: { primary: ["TypeScript", "React", "Node.js", "PostgreSQL"], secondary: ["Go", "Python", "Redis", "Docker"] },
  },
  aiContentAnalysis: {
    overallPercent: 34,
    sections: [
      { name: "Resume Summary", score: 42, confidence: 85 },
      { name: "Experience Descriptions", score: 28, confidence: 90 },
      { name: "Cover Letter", score: 38, confidence: 82 },
    ],
    flaggedExcerpts: [
      { text: "Leveraged cutting-edge technologies to drive innovation and deliver scalable solutions", confidence: 78 },
    ],
    overrideStatus: null,
  },
  fitAssessment: {
    requirements: [
      { criterion: "5+ years engineering experience", status: "met", evidence: "5 years across 3 companies", isRequired: true },
      { criterion: "TypeScript/React proficiency", status: "met", evidence: "Primary stack confirmed by GitHub repos", isRequired: true },
      { criterion: "Backend experience", status: "met", evidence: "Node.js + Go backend projects", isRequired: true },
      { criterion: "Database design", status: "partial", evidence: "PostgreSQL listed but no dedicated DB projects visible", isRequired: true },
      { criterion: "System design capability", status: "partial", evidence: "distributed-cache repo shows some systems thinking", isRequired: false },
      { criterion: "Team leadership", status: "not_met", evidence: "No leadership experience documented", isRequired: false },
    ],
    aiRecommendation:
      "Alex is a solid candidate for the Full Stack Engineer role. Technical skills are strong with confirmed GitHub evidence. The main concern is relatively short tenures and a gap in 2024. Database depth should be validated in the assessment. Team leadership experience is absent but not required for this role.",
    biasCheckPassed: true,
  },
  careerTimeline: [
    { company: "Shopify", role: "Senior Software Engineer", startDate: "2024-05", endDate: null, current: true },
    { company: "Stripe", role: "Software Engineer", startDate: "2022-08", endDate: "2023-12", current: false },
    { company: "Startup (YC W21)", role: "Full Stack Developer", startDate: "2021-01", endDate: "2022-07", current: false },
  ],
  teamActivity: [
    { userId: "u3", userName: "David Kim", avatarUrl: null, action: "viewed", timestamp: "2026-03-14T09:00:00Z" },
    { userId: "u3", userName: "David Kim", avatarUrl: null, action: "commented", comment: "Good GitHub profile. Let's see how assessment goes.", timestamp: "2026-03-14T09:30:00Z" },
  ],
};

// --- Candidate 3: Riya Sharma (FULLY FLESHED) ---
const riyaSharma: Candidate = {
  id: "3",
  name: "Riya Sharma",
  email: "riya.sharma@email.com",
  avatarUrl: null,
  currentRole: "Designer",
  currentCompany: "TCS",
  location: "Mumbai",
  appliedDate: "2026-03-08T14:00:00Z",
  jobId: "1",
  stage: "ai_screened",
  daysInStage: 4,
  aiScore: 45,
  scoreTier: "review",
  aiSummary:
    "Early career designer with visual talent but significant gaps in UX research and process. High AI content flag on application materials requires review.",
  aiVerdict: "Needs review — gaps in core requirements and high AI content.",
  skills: [
    { name: "Figma", matched: "full", required: true },
    { name: "User Research", matched: "missing", required: true },
    { name: "Design Systems", matched: "partial", required: true },
    { name: "Prototyping", matched: "partial", required: false },
    { name: "Visual Design", matched: "full", required: false },
  ],
  skillMatchPercent: 52,
  yearsExperience: 3,
  aiContentPercent: 72,
  hasAiContentFlag: true,
  portfolioUrl: "https://riyasharma.design",
  portfolioScore: 48,
  githubUrl: null,
  resumeAnalysis: {
    qualityScore: 55,
    trajectoryAnalysis:
      "Early career designer with 3 years at TCS. Limited exposure to product design practices. Portfolio shows visual skill but lacks UX depth.",
    redFlags: [
      { text: "Short tenure at previous company (8 months)", context: "Left first job quickly — worth understanding reasons" },
      { text: "Portfolio case studies lack research methodology", context: "No user research documented in any project" },
    ],
    recommendation: "consider",
    recommendationReasoning:
      "Has visual design talent but significant gaps in UX research and process documentation. High AI content flag warrants review.",
  },
  portfolioAnalysis: {
    overallScore: 48,
    tier: "moderate",
    websiteMetrics: { loadSpeed: 72, mobileResponsive: true, brokenLinks: 2, accessibilityScore: 61 },
    dimensions: { visualDesign: 7.0, uxThinking: 4.5, caseStudyClarity: 5.0, businessImpact: 3.5, processDocumentation: 4.0 },
    projects: [
      { title: "TCS Internal Dashboard", score: 52, strength: "Clean visual execution", gap: "No user research or testing documented" },
      { title: "E-commerce App Concept", score: 44, strength: "Good UI patterns", gap: "Concept project with no real constraints or outcomes" },
    ],
    toolsDetected: ["Figma"],
    comparativeRank: { rank: 15, total: 24 },
  },
  technicalProfile: null,
  aiContentAnalysis: {
    overallPercent: 72,
    sections: [
      { name: "Resume Summary", score: 85, confidence: 94 },
      { name: "Experience Descriptions", score: 68, confidence: 88 },
      { name: "Portfolio Case Study 1", score: 75, confidence: 91 },
      { name: "Portfolio Case Study 2", score: 62, confidence: 85 },
    ],
    flaggedExcerpts: [
      {
        text: "Spearheaded the complete redesign of the enterprise dashboard, leveraging user-centered design principles to drive a 40% improvement in task completion rates",
        confidence: 92,
      },
      {
        text: "Passionate about creating intuitive and delightful user experiences that bridge the gap between business objectives and user needs",
        confidence: 88,
      },
    ],
    overrideStatus: "pending",
  },
  fitAssessment: {
    requirements: [
      { criterion: "5+ years design experience", status: "not_met", evidence: "3 years experience, below requirement", isRequired: true },
      { criterion: "Figma proficiency", status: "met", evidence: "Primary tool used in all projects", isRequired: true },
      { criterion: "User research capability", status: "not_met", evidence: "No research methodology visible in portfolio", isRequired: true },
      { criterion: "Mobile app design", status: "partial", evidence: "One concept project, no shipped mobile work", isRequired: true },
      { criterion: "B2B/SaaS experience", status: "partial", evidence: "TCS dashboard is enterprise but limited scope", isRequired: false },
      { criterion: "Motion design skills", status: "not_met", evidence: "No motion design work visible", isRequired: false },
    ],
    aiRecommendation:
      "Riya shows visual design talent but significant gaps exist in core requirements. Experience is below the 5-year requirement, and user research capability — a must-have — is not demonstrated. The high AI content percentage (72%) in her application materials warrants review before proceeding. Recommend holding for HR review.",
    biasCheckPassed: true,
  },
  careerTimeline: [
    { company: "TCS", role: "UI/UX Designer", startDate: "2023-06", endDate: null, current: true },
    { company: "Wipro", role: "Junior Designer", startDate: "2022-10", endDate: "2023-05", current: false },
  ],
  teamActivity: [
    { userId: "u1", userName: "Amaan Shahana", avatarUrl: null, action: "viewed", timestamp: "2026-03-16T08:00:00Z" },
  ],
};

// --- Helper to create minimal design candidate ---
function makeDesignCandidate(
  id: string,
  name: string,
  email: string,
  role: string,
  company: string,
  location: string,
  jobId: string,
  stage: Candidate["stage"],
  daysInStage: number,
  aiScore: number,
  scoreTier: Candidate["scoreTier"],
  yearsExperience: number,
  aiContentPercent: number,
  hasAiContentFlag: boolean,
  portfolioScore: number,
  skillMatchPercent: number,
  recommendation: ResumeAnalysis["recommendation"],
  trajectoryAnalysis: string,
  recommendationReasoning: string,
  aiRecommendation: string,
  careerTimeline: CareerEntry[],
): Candidate {
  return {
    id,
    name,
    email,
    avatarUrl: null,
    currentRole: role,
    currentCompany: company,
    location,
    appliedDate: `2026-03-${String(Math.max(1, 16 - parseInt(id))).padStart(2, "0")}T10:00:00Z`,
    jobId,
    stage,
    daysInStage,
    aiScore,
    scoreTier,
    aiSummary: `${name} is a ${role} at ${company} with ${yearsExperience} years of experience. Score: ${aiScore}/100.`,
    aiVerdict: scoreTier === "strong" ? "Strong match — recommend advancing." : scoreTier === "good" ? "Good match — worth considering." : scoreTier === "review" ? "Needs review — gaps identified." : "Not a fit for this role.",
    skills: [
      { name: "Figma", matched: aiScore > 60 ? "full" : "partial", required: true },
      { name: "User Research", matched: aiScore > 70 ? "full" : aiScore > 40 ? "partial" : "missing", required: true },
      { name: "Visual Design", matched: "full", required: false },
    ],
    skillMatchPercent,
    yearsExperience,
    aiContentPercent,
    hasAiContentFlag,
    portfolioUrl: `https://${name.toLowerCase().replace(/[^a-z]/g, "")}.design`,
    portfolioScore,
    githubUrl: null,
    resumeAnalysis: {
      qualityScore: Math.round(aiScore * 0.9),
      trajectoryAnalysis,
      redFlags: hasAiContentFlag ? [{ text: "High AI-generated content detected", context: "Application materials may be AI-written" }] : [],
      recommendation,
      recommendationReasoning,
    },
    portfolioAnalysis: {
      overallScore: portfolioScore,
      tier: portfolioScore >= 80 ? "strong" : portfolioScore >= 60 ? "moderate" : "weak",
      websiteMetrics: { loadSpeed: 70 + Math.floor(Math.random() * 25), mobileResponsive: true, brokenLinks: Math.floor(Math.random() * 3), accessibilityScore: 60 + Math.floor(Math.random() * 30) },
      dimensions: { visualDesign: 5 + Math.random() * 2, uxThinking: 5 + Math.random() * 2, caseStudyClarity: 5 + Math.random() * 2, businessImpact: 5 + Math.random() * 2, processDocumentation: 5 + Math.random() * 2 },
      projects: [{ title: `${company} Project`, score: portfolioScore, strength: "Good visual execution", gap: "Could improve documentation" }],
      toolsDetected: ["Figma"],
      comparativeRank: { rank: parseInt(id), total: 24 },
    },
    technicalProfile: null,
    aiContentAnalysis: {
      overallPercent: aiContentPercent,
      sections: [
        { name: "Resume Summary", score: aiContentPercent + 5, confidence: 88 },
        { name: "Experience Descriptions", score: aiContentPercent - 5, confidence: 85 },
      ],
      flaggedExcerpts: hasAiContentFlag
        ? [{ text: "Driven professional with a passion for creating impactful designs", confidence: 82 }]
        : [],
      overrideStatus: null,
    },
    fitAssessment: {
      requirements: [
        { criterion: "Design experience", status: aiScore > 60 ? "met" : "partial", evidence: `${yearsExperience} years of experience`, isRequired: true },
        { criterion: "Figma proficiency", status: aiScore > 40 ? "met" : "partial", evidence: "Used in portfolio projects", isRequired: true },
        { criterion: "User research capability", status: aiScore > 70 ? "met" : aiScore > 40 ? "partial" : "not_met", evidence: aiScore > 70 ? "Research documented in case studies" : "Limited research evidence", isRequired: true },
      ],
      aiRecommendation,
      biasCheckPassed: true,
    },
    careerTimeline,
    teamActivity: [],
  };
}

// --- Helper to create minimal tech candidate ---
function makeTechCandidate(
  id: string,
  name: string,
  email: string,
  role: string,
  company: string,
  location: string,
  jobId: string,
  stage: Candidate["stage"],
  daysInStage: number,
  aiScore: number,
  scoreTier: Candidate["scoreTier"],
  yearsExperience: number,
  aiContentPercent: number,
  hasAiContentFlag: boolean,
  skillMatchPercent: number,
  recommendation: ResumeAnalysis["recommendation"],
  trajectoryAnalysis: string,
  recommendationReasoning: string,
  aiRecommendation: string,
  githubUsername: string,
  careerTimeline: CareerEntry[],
): Candidate {
  return {
    id,
    name,
    email,
    avatarUrl: null,
    currentRole: role,
    currentCompany: company,
    location,
    appliedDate: `2026-03-${String(Math.max(1, 16 - parseInt(id))).padStart(2, "0")}T10:00:00Z`,
    jobId,
    stage,
    daysInStage,
    aiScore,
    scoreTier,
    aiSummary: `${name} is a ${role} at ${company} with ${yearsExperience} years of experience. Score: ${aiScore}/100.`,
    aiVerdict: scoreTier === "strong" ? "Strong match — recommend advancing." : scoreTier === "good" ? "Good match — worth considering." : scoreTier === "review" ? "Needs review — gaps identified." : "Not a fit for this role.",
    skills: [
      { name: "TypeScript", matched: aiScore > 60 ? "full" : "partial", required: true },
      { name: "React", matched: aiScore > 50 ? "full" : aiScore > 30 ? "partial" : "missing", required: true },
      { name: "Node.js", matched: aiScore > 40 ? "full" : "partial", required: true },
    ],
    skillMatchPercent,
    yearsExperience,
    aiContentPercent,
    hasAiContentFlag,
    portfolioUrl: null,
    portfolioScore: null,
    githubUrl: `https://github.com/${githubUsername}`,
    resumeAnalysis: {
      qualityScore: Math.round(aiScore * 0.9),
      trajectoryAnalysis,
      redFlags: hasAiContentFlag ? [{ text: "High AI-generated content detected", context: "Application materials may be AI-written" }] : [],
      recommendation,
      recommendationReasoning,
    },
    portfolioAnalysis: null,
    technicalProfile: {
      githubUsername,
      contributionData: Array(52).fill(0).map((_, i) => Math.floor(Math.random() * 10)),
      languages: [
        { name: "TypeScript", percent: 60, color: "#3178c6" },
        { name: "Python", percent: 40, color: "#3572A5" },
      ],
      topRepos: [
        { name: `${githubUsername}-project-1`, stars: Math.floor(Math.random() * 200), description: "A full-stack web application", language: "TypeScript" },
        { name: `${githubUsername}-project-2`, stars: Math.floor(Math.random() * 100), description: "Backend API service", language: "Python" },
      ],
      codeQuality: { readme: 60 + Math.floor(Math.random() * 30), commenting: 50 + Math.floor(Math.random() * 30), structure: 60 + Math.floor(Math.random() * 30) },
      techStack: { primary: ["TypeScript", "React", "Node.js"], secondary: ["Python", "Docker"] },
    },
    aiContentAnalysis: {
      overallPercent: aiContentPercent,
      sections: [
        { name: "Resume Summary", score: aiContentPercent + 5, confidence: 88 },
        { name: "Experience Descriptions", score: aiContentPercent - 5, confidence: 85 },
      ],
      flaggedExcerpts: hasAiContentFlag
        ? [{ text: "Results-oriented engineer passionate about building scalable systems", confidence: 80 }]
        : [],
      overrideStatus: null,
    },
    fitAssessment: {
      requirements: [
        { criterion: "Engineering experience", status: aiScore > 60 ? "met" : "partial", evidence: `${yearsExperience} years of experience`, isRequired: true },
        { criterion: "TypeScript/React proficiency", status: aiScore > 50 ? "met" : "partial", evidence: "Confirmed via GitHub repositories", isRequired: true },
        { criterion: "Backend experience", status: aiScore > 40 ? "met" : "not_met", evidence: aiScore > 40 ? "Backend projects on GitHub" : "No backend projects visible", isRequired: true },
      ],
      aiRecommendation,
      biasCheckPassed: true,
    },
    careerTimeline,
    teamActivity: [],
  };
}

// --- Remaining 21 candidates ---

// id:4 Arjun Patel — even (tech), Strong tier
const arjunPatel = makeTechCandidate(
  "4", "Arjun Patel", "arjun.patel@email.com",
  "Staff Engineer", "Google", "Bangalore", "5",
  "offer", 3, 85, "strong", 8, 10, false, 90,
  "shortlist",
  "Strong career trajectory with progression to Staff level at Google.",
  "Exceptional technical depth and leadership experience. Highly recommended.",
  "Arjun brings 8 years of engineering experience with Staff-level impact at Google. Strong recommend for Senior Full Stack role.",
  "arjunpatel-dev",
  [
    { company: "Google", role: "Staff Software Engineer", startDate: "2022-01", endDate: null, current: true },
    { company: "Amazon", role: "Senior Software Engineer", startDate: "2019-06", endDate: "2021-12", current: false },
  ],
);

// id:5 Sarah Kim — odd (design), Good tier
const sarahKim = makeDesignCandidate(
  "5", "Sarah Kim", "sarah.kim@email.com",
  "Product Designer", "Wealthsimple", "Toronto", "2",
  "shortlisted", 3, 72, "good", 5, 18, false, 70, 74,
  "consider",
  "Steady growth at fintech companies with a solid research foundation.",
  "Good design skills with strong research background. Consider for UX Research Lead.",
  "Sarah has solid UX research skills from her fintech background. Worth interviewing.",
  [
    { company: "Wealthsimple", role: "Product Designer", startDate: "2023-01", endDate: null, current: true },
    { company: "RBC", role: "UX Designer", startDate: "2021-03", endDate: "2022-12", current: false },
  ],
);

// id:6 Raj Kumar — even (tech), Good tier
const rajKumar = makeTechCandidate(
  "6", "Raj Kumar", "raj.kumar@email.com",
  "Software Engineer", "Flipkart", "Bangalore", "6",
  "shortlisted", 2, 65, "good", 4, 22, false, 72,
  "consider",
  "Solid engineer with 4 years at a major e-commerce company.",
  "Good technical foundation but may need growth in system design.",
  "Raj has strong fundamentals from Flipkart. Assessment will validate system design skills.",
  "rajkumar-dev",
  [
    { company: "Flipkart", role: "Software Engineer", startDate: "2022-06", endDate: null, current: true },
    { company: "Infosys", role: "Associate Engineer", startDate: "2021-01", endDate: "2022-05", current: false },
  ],
);

// id:7 Emma Wilson — odd (design), Good tier
const emmaWilson = makeDesignCandidate(
  "7", "Emma Wilson", "emma.wilson@email.com",
  "Senior Designer", "Deloitte", "Toronto", "1",
  "assessment", 4, 60, "good", 6, 20, false, 65, 68,
  "consider",
  "Experienced designer with enterprise background at Deloitte.",
  "Solid design experience but portfolio lacks depth in UX research.",
  "Emma has good enterprise design experience. Assessment will reveal UX depth.",
  [
    { company: "Deloitte", role: "Senior Designer", startDate: "2022-01", endDate: null, current: true },
    { company: "Accenture", role: "UX Designer", startDate: "2020-06", endDate: "2021-12", current: false },
  ],
);

// id:8 Vikram Singh — even (tech), Good tier
const vikramSingh = makeTechCandidate(
  "8", "Vikram Singh", "vikram.singh@email.com",
  "Backend Developer", "Paytm", "Pune", "6",
  "interview_scheduled", 1, 58, "good", 4, 15, false, 65,
  "consider",
  "Backend specialist with payments domain experience at Paytm.",
  "Strong backend skills, needs frontend depth validation.",
  "Vikram has relevant payments experience. Interview will assess full-stack capability.",
  "vikramsingh-dev",
  [
    { company: "Paytm", role: "Backend Developer", startDate: "2023-01", endDate: null, current: true },
    { company: "TCS", role: "Software Developer", startDate: "2021-06", endDate: "2022-12", current: false },
  ],
);

// id:9 Ana Rodriguez — odd (design), Good tier
const anaRodriguez = makeDesignCandidate(
  "9", "Ana Rodriguez", "ana.rodriguez@email.com",
  "UX Designer", "Meta", "Toronto", "2",
  "shortlisted", 5, 55, "good", 4, 16, false, 62, 64,
  "consider",
  "UX designer with big tech experience but limited leadership exposure.",
  "Good research skills from Meta. Needs leadership experience for Lead role.",
  "Ana has solid UX foundations from Meta. Consider for the research lead role with mentoring support.",
  [
    { company: "Meta", role: "UX Designer", startDate: "2023-03", endDate: null, current: true },
    { company: "Startup", role: "Junior Designer", startDate: "2022-01", endDate: "2023-02", current: false },
  ],
);

// id:10 James Liu — even (tech), Good tier
const jamesLiu = makeTechCandidate(
  "10", "James Liu", "james.liu@email.com",
  "Full Stack Developer", "RBC", "Toronto", "5",
  "assessment", 2, 52, "good", 3, 25, false, 60,
  "consider",
  "Early-career developer with financial services background.",
  "Decent skills but limited experience. Assessment will help calibrate.",
  "James has promising skills for his experience level. Assessment results will be key.",
  "jamesliu-dev",
  [
    { company: "RBC", role: "Full Stack Developer", startDate: "2023-06", endDate: null, current: true },
    { company: "Deloitte", role: "Junior Developer", startDate: "2022-01", endDate: "2023-05", current: false },
  ],
);

// id:11 Neha Gupta — odd (design), Good tier
const nehaGupta = makeDesignCandidate(
  "11", "Neha Gupta", "neha.gupta@email.com",
  "Product Designer", "CRED", "Bangalore", "1",
  "interview_done", 1, 50, "good", 4, 14, false, 60, 62,
  "consider",
  "Designer with premium consumer product experience at CRED.",
  "Good visual skills with consumer product focus. UX depth is moderate.",
  "Neha brings consumer product sensibility from CRED. Moderate fit for the senior role.",
  [
    { company: "CRED", role: "Product Designer", startDate: "2023-01", endDate: null, current: true },
    { company: "Swiggy", role: "UI Designer", startDate: "2022-01", endDate: "2022-12", current: false },
  ],
);

// id:12 David Park — even (tech), Good tier
const davidPark = makeTechCandidate(
  "12", "David Park", "david.park@email.com",
  "Software Engineer", "Amazon", "Toronto", "5",
  "interview_done", 2, 51, "good", 5, 20, false, 62,
  "consider",
  "Engineer at Amazon with distributed systems experience.",
  "Solid background but may be overqualified for individual contributor role.",
  "David has strong big-tech experience. Interview feedback will determine fit.",
  "davidpark-dev",
  [
    { company: "Amazon", role: "Software Engineer", startDate: "2022-01", endDate: null, current: true },
    { company: "IBM", role: "Junior Engineer", startDate: "2021-01", endDate: "2021-12", current: false },
  ],
);

// id:13 Ananya Reddy — odd (design), Review tier
const ananyaReddy = makeDesignCandidate(
  "13", "Ananya Reddy", "ananya.reddy@email.com",
  "UI Designer", "Infosys", "Hyderabad", "3",
  "applied", 6, 48, "review", 2, 45, false, 42, 48,
  "consider",
  "Junior designer with IT services background. Limited product experience.",
  "Some visual talent but lacks product design depth for this role.",
  "Ananya has basic design skills but limited product experience. Consider for junior roles.",
  [
    { company: "Infosys", role: "UI Designer", startDate: "2024-01", endDate: null, current: true },
  ],
);

// id:14 Michael O'Brien — even (tech), Review tier
const michaelObrien = makeTechCandidate(
  "14", "Michael O'Brien", "michael.obrien@email.com",
  "Junior Developer", "Deloitte", "Toronto", "5",
  "applied", 5, 42, "review", 2, 30, false, 45,
  "consider",
  "Early career developer with consulting background.",
  "Junior profile for a senior role. May not meet experience requirements.",
  "Michael is early in his career and below the experience threshold for this senior role.",
  "mobrien-dev",
  [
    { company: "Deloitte", role: "Junior Developer", startDate: "2024-06", endDate: null, current: true },
  ],
);

// id:15 Kavita Desai — odd (design), Review tier
const kavitaDesai = makeDesignCandidate(
  "15", "Kavita Desai", "kavita.desai@email.com",
  "Graphic Designer", "Zomato", "Mumbai", "3",
  "ai_screened", 3, 40, "review", 3, 55, true, 38, 44,
  "consider",
  "Graphic designer transitioning to product design. Limited UX exposure.",
  "Visual skills present but UX and research gaps are significant.",
  "Kavita has graphic design talent but needs significant upskilling for product design roles.",
  [
    { company: "Zomato", role: "Graphic Designer", startDate: "2023-06", endDate: null, current: true },
    { company: "Freelance", role: "Designer", startDate: "2022-01", endDate: "2023-05", current: false },
  ],
);

// id:16 Thomas Brown — even (tech), Review tier
const thomasBrown = makeTechCandidate(
  "16", "Thomas Brown", "thomas.brown@email.com",
  "QA Engineer", "Shopify", "Toronto", "5",
  "ai_screened", 4, 38, "review", 3, 28, false, 40,
  "consider",
  "QA engineer looking to transition into development. Limited coding portfolio.",
  "Testing background is valuable but development skills are insufficient for this role.",
  "Thomas has testing expertise but lacks the development depth required for a full stack position.",
  "tbrown-dev",
  [
    { company: "Shopify", role: "QA Engineer", startDate: "2023-01", endDate: null, current: true },
  ],
);

// id:17 Sneha Joshi — odd (design), Review tier
const snehaJoshi = makeDesignCandidate(
  "17", "Sneha Joshi", "sneha.joshi@email.com",
  "Visual Designer", "Meesho", "Bangalore", "1",
  "shortlisted", 2, 35, "review", 2, 50, true, 35, 40,
  "consider",
  "Junior visual designer with e-commerce background. Limited portfolio.",
  "Some potential but significant experience and skill gaps for the senior role.",
  "Sneha is too junior for the Senior Product Designer role. Portfolio lacks depth.",
  [
    { company: "Meesho", role: "Visual Designer", startDate: "2024-06", endDate: null, current: true },
  ],
);

// id:18 Ryan Taylor — even (tech), Review tier
const ryanTaylor = makeTechCandidate(
  "18", "Ryan Taylor", "ryan.taylor@email.com",
  "Frontend Developer", "Wealthsimple", "Toronto", "6",
  "assessment", 5, 33, "review", 2, 40, false, 38,
  "consider",
  "Frontend-focused developer with limited backend experience.",
  "Frontend skills are decent but backend experience is below requirements.",
  "Ryan is frontend-heavy and lacks the backend depth needed for this backend role.",
  "rtaylor-dev",
  [
    { company: "Wealthsimple", role: "Frontend Developer", startDate: "2024-01", endDate: null, current: true },
  ],
);

// id:19 Meera Nair — odd (design), Review tier
const meeraNair = makeDesignCandidate(
  "19", "Meera Nair", "meera.nair@email.com",
  "UI/UX Designer", "Swiggy", "Bangalore", "3",
  "applied", 7, 30, "review", 2, 62, true, 32, 36,
  "skip",
  "Junior designer with food-tech background. Portfolio is thin.",
  "Limited portfolio and experience. Not recommended for this role at this time.",
  "Meera needs more experience before being considered for this role.",
  [
    { company: "Swiggy", role: "UI/UX Designer", startDate: "2024-08", endDate: null, current: true },
  ],
);

// id:20 Chris Anderson — even (tech), Review tier
const chrisAnderson = makeTechCandidate(
  "20", "Chris Anderson", "chris.anderson@email.com",
  "DevOps Engineer", "RBC", "Toronto", "5",
  "rejected", 0, 32, "review", 4, 35, false, 35,
  "skip",
  "DevOps specialist applying for a full-stack role. Skill mismatch.",
  "Primary expertise is in infrastructure, not application development.",
  "Chris has strong DevOps skills but insufficient full-stack development experience for this role.",
  "canderson-dev",
  [
    { company: "RBC", role: "DevOps Engineer", startDate: "2022-06", endDate: null, current: true },
    { company: "Bell", role: "Systems Admin", startDate: "2021-01", endDate: "2022-05", current: false },
  ],
);

// id:21 Aisha Khan — odd (design), Not Fit tier
const aishaKhan = makeDesignCandidate(
  "21", "Aisha Khan", "aisha.khan@email.com",
  "Marketing Coordinator", "Paytm", "Delhi", "1",
  "applied", 8, 22, "not_fit", 1, 78, true, 20, 22,
  "skip",
  "Marketing professional with minimal design experience. Not a designer by trade.",
  "No relevant design experience. Application appears to be a career pivot attempt.",
  "Aisha has marketing experience but no design background. Not a fit for this design role.",
  [
    { company: "Paytm", role: "Marketing Coordinator", startDate: "2025-01", endDate: null, current: true },
  ],
);

// id:22 Daniel Lee — even (tech), Not Fit tier
const danielLee = makeTechCandidate(
  "22", "Daniel Lee", "daniel.lee@email.com",
  "Data Analyst", "Deloitte", "Toronto", "5",
  "ai_screened", 6, 18, "not_fit", 2, 70, true, 18,
  "skip",
  "Data analyst with SQL skills but no software engineering background.",
  "Skills do not match engineering requirements. Not recommended.",
  "Daniel is a data analyst, not a software engineer. Fundamental skill mismatch for this role.",
  "daniellee-data",
  [
    { company: "Deloitte", role: "Data Analyst", startDate: "2024-01", endDate: null, current: true },
  ],
);

// id:23 Pooja Iyer — odd (design), Not Fit tier
const poojaIyer = makeDesignCandidate(
  "23", "Pooja Iyer", "pooja.iyer@email.com",
  "Content Writer", "Flipkart", "Chennai", "2",
  "hired", 0, 15, "not_fit", 1, 82, true, 15, 16,
  "skip",
  "Content writer with no design experience. Misaligned application.",
  "No design skills or portfolio. Clear mismatch with role requirements.",
  "Pooja is a content writer applying for a design role. Not a fit.",
  [
    { company: "Flipkart", role: "Content Writer", startDate: "2025-06", endDate: null, current: true },
  ],
);

// id:24 Marcus Johnson — even (tech), Not Fit tier
const marcusJohnson = makeTechCandidate(
  "24", "Marcus Johnson", "marcus.johnson@email.com",
  "IT Support Specialist", "RBC", "Toronto", "6",
  "hired", 0, 12, "not_fit", 1, 75, true, 14,
  "skip",
  "IT support role with no development experience.",
  "No software engineering background. Skills do not align with requirements.",
  "Marcus is in IT support with no coding background. Not a fit for an engineering role.",
  "mjohnson-it",
  [
    { company: "RBC", role: "IT Support Specialist", startDate: "2025-03", endDate: null, current: true },
  ],
);

export const mockCandidates: Candidate[] = [
  priyaMehta,
  alexChen,
  riyaSharma,
  arjunPatel,
  sarahKim,
  rajKumar,
  emmaWilson,
  vikramSingh,
  anaRodriguez,
  jamesLiu,
  nehaGupta,
  davidPark,
  ananyaReddy,
  michaelObrien,
  kavitaDesai,
  thomasBrown,
  snehaJoshi,
  ryanTaylor,
  meeraNair,
  chrisAnderson,
  aishaKhan,
  danielLee,
  poojaIyer,
  marcusJohnson,
];

// ---------------------------------------------------------------------------
// 5. Activity Feed Items
// ---------------------------------------------------------------------------
export const activityFeedItems: ActivityFeedItem[] = [
  {
    id: "1",
    description: "AI screened 47 resumes for Senior Product Designer — 9 shortlisted, 38 archived.",
    timestamp: "2026-03-16T09:30:00Z",
    actionLabel: "Review shortlist",
    actionUrl: "/candidates?job=1&stage=shortlisted",
  },
  {
    id: "2",
    description: "Portfolio analysis complete for 12 candidates. Top scorer: Priya M. (91/100).",
    timestamp: "2026-03-16T08:15:00Z",
    actionLabel: "View profiles",
    actionUrl: "/candidates?sort=portfolio",
  },
  {
    id: "3",
    description: "3 resumes flagged for high AI-generated content in Backend Engineer pipeline.",
    timestamp: "2026-03-15T16:45:00Z",
    actionLabel: "Review flags",
    actionUrl: "/candidates?job=6&aiFlag=true",
  },
  {
    id: "4",
    description: "Assessment sent to 5 shortlisted candidates for Full Stack Engineer role.",
    timestamp: "2026-03-15T14:20:00Z",
    actionLabel: "View assessments",
    actionUrl: "/assessments",
  },
  {
    id: "5",
    description: "Interview guide generated for Priya Mehta — Senior Product Designer interview.",
    timestamp: "2026-03-15T11:00:00Z",
    actionLabel: "View guide",
    actionUrl: "/interviews",
  },
];

// ---------------------------------------------------------------------------
// 6. Urgent Actions
// ---------------------------------------------------------------------------
export const urgentActions: UrgentAction[] = [
  {
    id: "1",
    urgency: "critical",
    icon: "Clock",
    description: "Offer for Arjun Patel expires in 24 hours",
    timeAgo: "2h ago",
    actionLabel: "Review offer",
    actionUrl: "/candidates/4",
  },
  {
    id: "2",
    urgency: "critical",
    icon: "AlertTriangle",
    description: "SLA breach: 4 candidates waiting >5 days in Applied stage",
    timeAgo: "1h ago",
    actionLabel: "Review queue",
    actionUrl: "/candidates?stage=applied&sort=oldest",
  },
  {
    id: "3",
    urgency: "warning",
    icon: "FileWarning",
    description: "3 assessments overdue for Backend Engineer role",
    timeAgo: "4h ago",
    actionLabel: "Send reminder",
    actionUrl: "/assessments",
  },
  {
    id: "4",
    urgency: "warning",
    icon: "MessageCircle",
    description: "Interview feedback pending from 2 panel members",
    timeAgo: "1d ago",
    actionLabel: "Nudge reviewers",
    actionUrl: "/interviews",
  },
  {
    id: "5",
    urgency: "info",
    icon: "Star",
    description: "New high-scoring candidate: Priya Mehta (91) for Senior Product Designer",
    timeAgo: "3h ago",
    actionLabel: "View profile",
    actionUrl: "/candidates/1",
  },
];

// ---------------------------------------------------------------------------
// 7. Screening Batches
// ---------------------------------------------------------------------------
export const screeningBatches: ScreeningBatch[] = [
  {
    id: "1",
    jobId: "1",
    jobTitle: "Senior Product Designer",
    candidateCount: 47,
    status: "complete",
    startedAt: "2026-03-16T09:00:00Z",
    durationMs: 480000,
    results: [
      { candidateId: "1", candidateName: "Priya Mehta", score: 91, verdict: "strong", flags: [] },
      { candidateId: "3", candidateName: "Riya Sharma", score: 45, verdict: "review", flags: ["high_ai_content"] },
      { candidateId: "7", candidateName: "Emma Wilson", score: 60, verdict: "good", flags: [] },
      { candidateId: "11", candidateName: "Neha Gupta", score: 50, verdict: "good", flags: [] },
      { candidateId: "17", candidateName: "Sneha Joshi", score: 35, verdict: "review", flags: ["high_ai_content"] },
    ],
  },
  {
    id: "2",
    jobId: "5",
    jobTitle: "Senior Full Stack Engineer",
    candidateCount: 89,
    status: "complete",
    startedAt: "2026-03-15T14:00:00Z",
    durationMs: 720000,
    results: [
      { candidateId: "2", candidateName: "Alex Chen", score: 68, verdict: "good", flags: [] },
      { candidateId: "4", candidateName: "Arjun Patel", score: 85, verdict: "strong", flags: [] },
      { candidateId: "10", candidateName: "James Liu", score: 52, verdict: "good", flags: [] },
      { candidateId: "14", candidateName: "Michael O'Brien", score: 42, verdict: "review", flags: [] },
      { candidateId: "12", candidateName: "David Park", score: 51, verdict: "good", flags: [] },
    ],
  },
  {
    id: "3",
    jobId: "6",
    jobTitle: "Backend Engineer",
    candidateCount: 34,
    status: "processing",
    startedAt: "2026-03-16T10:30:00Z",
    durationMs: 0,
    results: [],
  },
];

// ---------------------------------------------------------------------------
// 8. Screening Rules
// ---------------------------------------------------------------------------
export const screeningRules: ScreeningRule[] = [
  {
    id: "1",
    type: "hard_filter",
    condition: "Experience < 3 years for roles requiring 5+",
    action: "Auto-reject with personalized email",
    enabled: true,
  },
  {
    id: "2",
    type: "auto_shortlist",
    condition: "AI Fit Score > 80 AND portfolio score > 70",
    action: "Move to Shortlisted and notify hiring manager",
    enabled: true,
  },
  {
    id: "3",
    type: "auto_assessment",
    condition: "Score 65-79 AND no AI content flag",
    action: "Send assessment invitation automatically",
    enabled: true,
  },
  {
    id: "4",
    type: "ai_content_flag",
    condition: "AI content percentage > 60%",
    action: "Flag for HR review and hold at current stage",
    enabled: true,
  },
  {
    id: "5",
    type: "sla_alert",
    condition: "Candidate in Applied stage > 3 days",
    action: "Notify recruiter and suggest next action",
    enabled: true,
  },
];

// ---------------------------------------------------------------------------
// 9. Mock Threads
// ---------------------------------------------------------------------------
export const mockThreads: Thread[] = [
  {
    id: "1",
    candidateId: "1",
    candidateName: "Priya Mehta",
    candidateAvatar: null,
    role: "Senior Product Designer",
    stage: "interview_scheduled",
    lastMessage: "Looking forward to the interview on Thursday!",
    lastMessageAt: "2026-03-15T16:00:00Z",
    unread: false,
    starred: true,
    messages: [
      {
        id: "m1",
        direction: "sent",
        content: "Hi Priya, thank you for your application for the Senior Product Designer role. We were impressed by your portfolio and would like to schedule an interview. Are you available this Thursday at 2:00 PM IST?",
        sentAt: "2026-03-14T10:00:00Z",
        isAiDraft: true,
      },
      {
        id: "m2",
        direction: "received",
        content: "Hi! Thank you so much for getting back to me. Thursday at 2:00 PM IST works perfectly. Looking forward to the interview on Thursday!",
        sentAt: "2026-03-15T16:00:00Z",
        isAiDraft: false,
      },
    ],
  },
  {
    id: "2",
    candidateId: "2",
    candidateName: "Alex Chen",
    candidateAvatar: null,
    role: "Senior Full Stack Engineer",
    stage: "assessment",
    lastMessage: "I have submitted the assessment. Please let me know if you need anything else.",
    lastMessageAt: "2026-03-14T18:30:00Z",
    unread: true,
    starred: false,
    messages: [
      {
        id: "m3",
        direction: "sent",
        content: "Hi Alex, we'd like to invite you to complete a take-home assessment for the Senior Full Stack Engineer role. The assessment focuses on building a REST API with TypeScript and will take approximately 3 hours. You have 5 days to submit. Here is the link: [assessment-link]",
        sentAt: "2026-03-12T09:00:00Z",
        isAiDraft: true,
      },
      {
        id: "m4",
        direction: "received",
        content: "Thanks for the opportunity! I'll work on it this weekend.",
        sentAt: "2026-03-12T12:00:00Z",
        isAiDraft: false,
      },
      {
        id: "m5",
        direction: "received",
        content: "I have submitted the assessment. Please let me know if you need anything else.",
        sentAt: "2026-03-14T18:30:00Z",
        isAiDraft: false,
      },
    ],
  },
  {
    id: "3",
    candidateId: "4",
    candidateName: "Arjun Patel",
    candidateAvatar: null,
    role: "Senior Full Stack Engineer",
    stage: "offer",
    lastMessage: "I am reviewing the offer details with my family and will get back to you by tomorrow.",
    lastMessageAt: "2026-03-15T20:00:00Z",
    unread: true,
    starred: true,
    messages: [
      {
        id: "m6",
        direction: "sent",
        content: "Hi Arjun, congratulations! We are thrilled to extend an offer for the Senior Full Stack Engineer position. Please find the offer letter attached. The offer is valid until March 17, 2026. Let us know if you have any questions.",
        sentAt: "2026-03-14T11:00:00Z",
        isAiDraft: false,
      },
      {
        id: "m7",
        direction: "received",
        content: "Thank you so much! This is very exciting. I am reviewing the offer details with my family and will get back to you by tomorrow.",
        sentAt: "2026-03-15T20:00:00Z",
        isAiDraft: false,
      },
    ],
  },
  {
    id: "4",
    candidateId: "5",
    candidateName: "Sarah Kim",
    candidateAvatar: null,
    role: "UX Research Lead",
    stage: "shortlisted",
    lastMessage: "We would like to move forward with a portfolio review. Could you share 2-3 case studies?",
    lastMessageAt: "2026-03-15T09:00:00Z",
    unread: false,
    starred: false,
    messages: [
      {
        id: "m8",
        direction: "sent",
        content: "Hi Sarah, thank you for applying for the UX Research Lead role. Your background in fintech research is very relevant. We would like to move forward with a portfolio review. Could you share 2-3 case studies that showcase your research methodology?",
        sentAt: "2026-03-15T09:00:00Z",
        isAiDraft: true,
      },
    ],
  },
  {
    id: "5",
    candidateId: "8",
    candidateName: "Vikram Singh",
    candidateAvatar: null,
    role: "Backend Engineer",
    stage: "interview_scheduled",
    lastMessage: "Confirmed for Monday at 11 AM IST. See you then!",
    lastMessageAt: "2026-03-15T14:00:00Z",
    unread: false,
    starred: false,
    messages: [
      {
        id: "m9",
        direction: "sent",
        content: "Hi Vikram, great news — we'd like to schedule a technical interview for the Backend Engineer role. Would Monday at 11 AM IST work for you? The interview will be about 60 minutes covering system design and coding.",
        sentAt: "2026-03-14T15:00:00Z",
        isAiDraft: true,
      },
      {
        id: "m10",
        direction: "received",
        content: "Confirmed for Monday at 11 AM IST. See you then!",
        sentAt: "2026-03-15T14:00:00Z",
        isAiDraft: false,
      },
    ],
  },
  {
    id: "6",
    candidateId: "3",
    candidateName: "Riya Sharma",
    candidateAvatar: null,
    role: "Senior Product Designer",
    stage: "ai_screened",
    lastMessage: "Thank you for applying. We are currently reviewing your application and will be in touch soon.",
    lastMessageAt: "2026-03-13T10:00:00Z",
    unread: false,
    starred: false,
    messages: [
      {
        id: "m11",
        direction: "sent",
        content: "Hi Riya, thank you for applying for the Senior Product Designer role at WiseHire. We have received your application and portfolio. Our team is currently reviewing all submissions and we will be in touch within the next few days.",
        sentAt: "2026-03-13T10:00:00Z",
        isAiDraft: true,
      },
    ],
  },
  {
    id: "7",
    candidateId: "6",
    candidateName: "Raj Kumar",
    candidateAvatar: null,
    role: "Backend Engineer",
    stage: "shortlisted",
    lastMessage: "That sounds great! I am available for the assessment anytime this week.",
    lastMessageAt: "2026-03-15T11:00:00Z",
    unread: true,
    starred: false,
    messages: [
      {
        id: "m12",
        direction: "sent",
        content: "Hi Raj, we have reviewed your application for the Backend Engineer position and are impressed with your Flipkart experience. We would like to invite you to complete a technical assessment.",
        sentAt: "2026-03-14T14:00:00Z",
        isAiDraft: true,
      },
      {
        id: "m13",
        direction: "received",
        content: "That sounds great! I am available for the assessment anytime this week.",
        sentAt: "2026-03-15T11:00:00Z",
        isAiDraft: false,
      },
    ],
  },
  {
    id: "8",
    candidateId: "11",
    candidateName: "Neha Gupta",
    candidateAvatar: null,
    role: "Senior Product Designer",
    stage: "interview_done",
    lastMessage: "Thank you for the interview! It was a pleasure meeting the team.",
    lastMessageAt: "2026-03-15T17:30:00Z",
    unread: true,
    starred: false,
    messages: [
      {
        id: "m14",
        direction: "sent",
        content: "Hi Neha, thank you for completing the interview for the Senior Product Designer role. We appreciate the time you spent with our team. We will review internally and get back to you within 3 business days.",
        sentAt: "2026-03-15T16:00:00Z",
        isAiDraft: true,
      },
      {
        id: "m15",
        direction: "received",
        content: "Thank you for the interview! It was a pleasure meeting the team. I am excited about the opportunity and look forward to hearing from you.",
        sentAt: "2026-03-15T17:30:00Z",
        isAiDraft: false,
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// 10. Email Templates
// ---------------------------------------------------------------------------
export const emailTemplates: EmailTemplate[] = [
  {
    id: "1",
    title: "Application Acknowledgment",
    category: "acknowledgment",
    subject: "Thank you for applying to {role_title} at {company_name}",
    body: "Hi {candidate_name},\n\nThank you for applying for the {role_title} position at {company_name}. We have received your application and our team is reviewing it carefully.\n\nWe aim to get back to all applicants within 5 business days. In the meantime, feel free to reach out if you have any questions.\n\nBest regards,\nThe {company_name} Talent Team",
  },
  {
    id: "2",
    title: "Shortlist Notification",
    category: "shortlist",
    subject: "Great news about your {role_title} application at {company_name}",
    body: "Hi {candidate_name},\n\nWe are pleased to let you know that your application for the {role_title} position at {company_name} has been shortlisted. Your background and skills stood out among a competitive pool of applicants.\n\nOur team will be reaching out shortly to discuss the next steps in the process.\n\nBest regards,\nThe {company_name} Talent Team",
  },
  {
    id: "3",
    title: "Assessment Invitation",
    category: "assessment_invite",
    subject: "Next step: Assessment for {role_title} at {company_name}",
    body: "Hi {candidate_name},\n\nAs part of the hiring process for the {role_title} role at {company_name}, we would like to invite you to complete a skills assessment. This will help us understand your expertise and working style.\n\nPlease complete the assessment within 5 days of receiving this email. It should take approximately 2-3 hours.\n\nIf you have any questions or need accommodations, please do not hesitate to reach out.\n\nBest regards,\nThe {company_name} Talent Team",
  },
  {
    id: "4",
    title: "Rejection — After Screening",
    category: "rejection",
    subject: "Update on your {role_title} application at {company_name}",
    body: "Hi {candidate_name},\n\nThank you for your interest in the {role_title} role at {company_name} and for taking the time to apply.\n\nAfter careful review, we have decided to move forward with other candidates whose experience more closely matches our current needs. This was a difficult decision given the quality of applicants we received.\n\nWe encourage you to apply for future openings that match your skills. We will keep your profile on file.\n\nWishing you the best in your career journey.\n\nBest regards,\nThe {company_name} Talent Team",
  },
  {
    id: "5",
    title: "Interview Invitation",
    category: "interview",
    subject: "Interview invitation for {role_title} at {company_name}",
    body: "Hi {candidate_name},\n\nWe would like to invite you to interview for the {role_title} position at {company_name}. We were impressed with your background and are excited to learn more about you.\n\nThe interview will be approximately 60 minutes and will include a conversation about your experience, a role-specific discussion, and time for your questions.\n\nPlease reply with your availability over the next week, and we will send a calendar invite.\n\nBest regards,\nThe {company_name} Talent Team",
  },
  {
    id: "6",
    title: "Offer Letter",
    category: "offer",
    subject: "Offer for {role_title} at {company_name} — Congratulations!",
    body: "Hi {candidate_name},\n\nCongratulations! On behalf of the entire team at {company_name}, we are thrilled to extend an offer for the {role_title} position.\n\nPlease find the formal offer letter attached to this email. The offer includes details on compensation, benefits, and start date. This offer is valid for 7 days.\n\nWe are excited about the possibility of you joining our team and are happy to answer any questions you may have.\n\nBest regards,\nThe {company_name} Talent Team",
  },
];

// ---------------------------------------------------------------------------
// 11. Aria Responses
// ---------------------------------------------------------------------------
export const ariaResponses: Record<string, { content: string; cards?: AriaCard[] }> = {
  "show top candidates": {
    content: "Here are the top-scoring candidates across all active roles. Priya Mehta leads with a 91 score for the Senior Product Designer position.",
    cards: [
      {
        type: "candidate",
        data: { name: "Priya Mehta", score: 91, role: "Senior Product Designer", stage: "interview_scheduled" },
      },
      {
        type: "candidate",
        data: { name: "Arjun Patel", score: 85, role: "Senior Full Stack Engineer", stage: "offer" },
      },
      {
        type: "candidate",
        data: { name: "Sarah Kim", score: 72, role: "UX Research Lead", stage: "shortlisted" },
      },
    ],
  },
  "pipeline summary": {
    content: "Your hiring pipeline currently has 847 candidates across 12 active jobs. The funnel shows a healthy 54% screen-to-shortlist conversion rate, but time-to-hire is trending up at 32 days.",
    cards: [
      {
        type: "stat",
        data: { label: "Total Candidates", value: 847, delta: "+47 today" },
      },
      {
        type: "stat",
        data: { label: "Avg Time to Hire", value: "32 days", benchmark: "45 days" },
      },
    ],
  },
  "schedule interview priya": {
    content: "I can schedule an interview with Priya Mehta for the Senior Product Designer role. She is currently in the Interview Scheduled stage. Shall I send her available time slots for this week?",
    cards: [
      {
        type: "action_confirm",
        data: { action: "schedule_interview", candidateId: "1", candidateName: "Priya Mehta", role: "Senior Product Designer" },
      },
    ],
  },
  "ai content flags": {
    content: "There are currently 5 candidates flagged for high AI-generated content (>60%). The highest is Riya Sharma at 72%. Here are the flagged candidates that need your review.",
    cards: [
      {
        type: "candidate",
        data: { name: "Riya Sharma", aiContentPercent: 72, stage: "ai_screened", status: "pending_review" },
      },
      {
        type: "candidate",
        data: { name: "Aisha Khan", aiContentPercent: 78, stage: "applied", status: "pending_review" },
      },
    ],
  },
  "compare candidates for designer role": {
    content: "Comparing the top 3 candidates for Senior Product Designer:\n\n1. **Priya Mehta** (91) — Strongest overall. 7 years experience, exceptional portfolio (89/100), all must-haves met.\n2. **Emma Wilson** (60) — Solid enterprise background. 6 years experience, moderate portfolio (65/100), partial UX research.\n3. **Neha Gupta** (50) — Consumer product experience. 4 years, decent portfolio (60/100) but below experience requirement.\n\nPriya is the clear frontrunner for this role.",
    cards: [
      {
        type: "candidate",
        data: { name: "Priya Mehta", score: 91, portfolioScore: 89, yearsExperience: 7 },
      },
      {
        type: "candidate",
        data: { name: "Emma Wilson", score: 60, portfolioScore: 65, yearsExperience: 6 },
      },
      {
        type: "candidate",
        data: { name: "Neha Gupta", score: 50, portfolioScore: 60, yearsExperience: 4 },
      },
    ],
  },
  "draft rejection email": {
    content: "I have drafted a rejection email for the candidates who did not pass the AI screening stage. The email is personalized and constructive. Would you like me to send it?",
    cards: [
      {
        type: "action_confirm",
        data: { action: "send_rejection_emails", count: 38, template: "rejection_after_screening" },
      },
    ],
  },
  "hiring health report": {
    content: "Your hiring health score is 74/100. Here is the breakdown:\n\n- **Pipeline velocity**: Good. Candidates move through stages in an average of 4.2 days.\n- **Time to hire**: 32 days, which is 29% faster than the 45-day benchmark.\n- **Cost per hire**: $21,400, 14% under the $25,000 target.\n- **Bottleneck**: Assessment stage has the longest dwell time at 5.2 days average.\n- **Risk**: 4 candidates have been in Applied for over 5 days, breaching your SLA.",
    cards: [
      {
        type: "stat",
        data: { label: "Health Score", value: 74, maxValue: 100 },
      },
      {
        type: "link",
        data: { label: "View full report", url: "/analytics" },
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// 10. Assessments
// ---------------------------------------------------------------------------
export const mockAssessments: Assessment[] = [
  {
    id: "asmt-1",
    name: "Frontend React Challenge",
    type: "coding",
    jobId: "5",
    jobTitle: "Senior Full Stack Engineer",
    status: "active",
    assignedCount: 18,
    completedCount: 11,
    dueDate: "2024-11-20T23:59:00Z",
    createdDate: "2024-11-01T10:00:00Z",
    duration: 90,
  },
  {
    id: "asmt-2",
    name: "Product Design Portfolio Review",
    type: "portfolio_review",
    jobId: "1",
    jobTitle: "Senior Product Designer",
    status: "active",
    assignedCount: 12,
    completedCount: 8,
    dueDate: "2024-11-18T23:59:00Z",
    createdDate: "2024-10-28T10:00:00Z",
    duration: 60,
  },
  {
    id: "asmt-3",
    name: "System Design — Scalable Notification Service",
    type: "system_design",
    jobId: "6",
    jobTitle: "Backend Engineer",
    status: "active",
    assignedCount: 8,
    completedCount: 3,
    dueDate: "2024-11-25T23:59:00Z",
    createdDate: "2024-11-10T10:00:00Z",
    duration: 120,
  },
  {
    id: "asmt-4",
    name: "Visual Design Brief — Landing Page Redesign",
    type: "design_brief",
    jobId: "3",
    jobTitle: "Visual Designer",
    status: "active",
    assignedCount: 15,
    completedCount: 15,
    dueDate: "2024-11-10T23:59:00Z",
    createdDate: "2024-10-25T10:00:00Z",
    duration: 180,
  },
];

export const mockAssessmentTemplates: AssessmentTemplate[] = [
  {
    id: "tmpl-1",
    name: "React Component Builder",
    type: "coding",
    questionCount: 4,
    avgCompletionTime: 75,
    difficulty: "medium",
    description: "Build a set of interactive React components with state management, API integration, and responsive design. Tests component architecture and hooks proficiency.",
    usageCount: 42,
  },
  {
    id: "tmpl-2",
    name: "Algorithm & Data Structures",
    type: "coding",
    questionCount: 6,
    avgCompletionTime: 90,
    difficulty: "hard",
    description: "Solve algorithmic problems covering graphs, dynamic programming, and tree traversal. Evaluates problem-solving ability and code efficiency.",
    usageCount: 67,
  },
  {
    id: "tmpl-3",
    name: "Distributed Systems Design",
    type: "system_design",
    questionCount: 2,
    avgCompletionTime: 110,
    difficulty: "hard",
    description: "Design a distributed system with considerations for scalability, fault tolerance, and consistency. Candidates sketch architecture diagrams and justify trade-offs.",
    usageCount: 31,
  },
  {
    id: "tmpl-4",
    name: "API Design & Microservices",
    type: "system_design",
    questionCount: 3,
    avgCompletionTime: 80,
    difficulty: "medium",
    description: "Design RESTful APIs and decompose a monolith into microservices. Covers schema design, versioning, and inter-service communication patterns.",
    usageCount: 25,
  },
  {
    id: "tmpl-5",
    name: "Mobile App Redesign Brief",
    type: "design_brief",
    questionCount: 1,
    avgCompletionTime: 150,
    difficulty: "medium",
    description: "Redesign a key user flow for a mobile application. Candidates submit wireframes, a style guide, and a rationale document explaining their decisions.",
    usageCount: 19,
  },
  {
    id: "tmpl-6",
    name: "Dashboard Design Brief",
    type: "design_brief",
    questionCount: 1,
    avgCompletionTime: 180,
    difficulty: "hard",
    description: "Design an analytics dashboard for a SaaS product. Evaluate information hierarchy, data visualization choices, and interaction design.",
    usageCount: 14,
  },
  {
    id: "tmpl-7",
    name: "Portfolio Deep Dive",
    type: "portfolio_review",
    questionCount: 5,
    avgCompletionTime: 45,
    difficulty: "easy",
    description: "Guided walkthrough of the candidate's portfolio. Includes questions about design process, iteration cycles, and measurable outcomes from past projects.",
    usageCount: 53,
  },
  {
    id: "tmpl-8",
    name: "SQL Proficiency Test",
    type: "coding",
    questionCount: 8,
    avgCompletionTime: 60,
    difficulty: "medium",
    description: "Write SQL queries covering joins, window functions, CTEs, and performance optimization. Tests practical database skills against realistic schemas.",
    usageCount: 38,
  },
];

export const mockAssessmentResults: AssessmentResult[] = [
  {
    id: "result-1",
    candidateId: "1",
    candidateName: "Priya Mehta",
    assessmentId: "asmt-2",
    assessmentName: "Product Design Portfolio Review",
    type: "portfolio_review",
    score: 88,
    maxScore: 100,
    timeTaken: 52,
    completedDate: "2024-11-05T14:30:00Z",
    aiFeedback: "Exceptional portfolio presentation with strong case studies demonstrating end-to-end design thinking. The candidate clearly articulates problem definitions and measures impact quantitatively.",
    strengths: ["Case study depth and storytelling", "Clear articulation of design rationale", "Quantitative impact metrics for each project"],
    weaknesses: ["Limited examples of design system work", "Could improve accessibility documentation"],
  },
  {
    id: "result-2",
    candidateId: "2",
    candidateName: "Alex Chen",
    assessmentId: "asmt-1",
    assessmentName: "Frontend React Challenge",
    type: "coding",
    score: 92,
    maxScore: 100,
    timeTaken: 68,
    completedDate: "2024-11-08T16:45:00Z",
    aiFeedback: "Outstanding technical implementation. Code is clean, well-structured, and demonstrates deep understanding of React patterns including custom hooks and context management.",
    strengths: ["Excellent component architecture", "Proper error handling and edge cases", "Efficient state management with custom hooks"],
    weaknesses: ["Test coverage could be more comprehensive", "Minor accessibility gaps in form components"],
  },
  {
    id: "result-3",
    candidateId: "3",
    candidateName: "Riya Sharma",
    assessmentId: "asmt-2",
    assessmentName: "Product Design Portfolio Review",
    type: "portfolio_review",
    score: 71,
    maxScore: 100,
    timeTaken: 58,
    completedDate: "2024-11-06T11:20:00Z",
    aiFeedback: "Solid portfolio with good visual design skills. Case studies show awareness of user needs but lack depth in research methodology and impact measurement.",
    strengths: ["Strong visual design execution", "Good understanding of design trends", "Clean and organized portfolio structure"],
    weaknesses: ["Shallow user research documentation", "Missing quantitative outcomes", "Limited examples of collaborative design process"],
  },
  {
    id: "result-4",
    candidateId: "5",
    candidateName: "Sarah Kim",
    assessmentId: "asmt-1",
    assessmentName: "Frontend React Challenge",
    type: "coding",
    score: 78,
    maxScore: 100,
    timeTaken: 85,
    completedDate: "2024-11-09T10:15:00Z",
    aiFeedback: "Good foundational React skills with working implementations. Some areas for improvement in performance optimization and advanced patterns.",
    strengths: ["Functional components implemented correctly", "Good use of TypeScript types", "Clean code formatting"],
    weaknesses: ["Unnecessary re-renders not addressed", "Missing memoization for expensive computations", "Could improve error boundary implementation"],
  },
  {
    id: "result-5",
    candidateId: "6",
    candidateName: "Raj Kumar",
    assessmentId: "asmt-3",
    assessmentName: "System Design — Scalable Notification Service",
    type: "system_design",
    score: 85,
    maxScore: 100,
    timeTaken: 105,
    completedDate: "2024-11-14T13:00:00Z",
    aiFeedback: "Strong system design skills with thorough consideration of scalability and fault tolerance. The candidate proposed a well-reasoned architecture with clear trade-off analysis.",
    strengths: ["Comprehensive scalability considerations", "Clear trade-off analysis between consistency models", "Good use of message queues and caching layers"],
    weaknesses: ["Monitoring and observability not fully addressed", "Cost estimation section was superficial"],
  },
  {
    id: "result-6",
    candidateId: "8",
    candidateName: "Vikram Singh",
    assessmentId: "asmt-3",
    assessmentName: "System Design — Scalable Notification Service",
    type: "system_design",
    score: 62,
    maxScore: 100,
    timeTaken: 118,
    completedDate: "2024-11-15T09:30:00Z",
    aiFeedback: "Adequate understanding of system design fundamentals but gaps in distributed systems concepts. The architecture lacks depth in handling edge cases and failure scenarios.",
    strengths: ["Correct identification of core components", "Reasonable database choice justification"],
    weaknesses: ["Incomplete failure handling strategy", "Missing consideration for data partitioning", "No discussion of rate limiting or backpressure", "Diagrams lacked detail"],
  },
  {
    id: "result-7",
    candidateId: "4",
    candidateName: "Arjun Patel",
    assessmentId: "asmt-4",
    assessmentName: "Visual Design Brief — Landing Page Redesign",
    type: "design_brief",
    score: 94,
    maxScore: 100,
    timeTaken: 165,
    completedDate: "2024-11-03T17:00:00Z",
    aiFeedback: "Exceptional design brief submission. The candidate delivered a polished landing page with strong visual hierarchy, thoughtful micro-interactions, and a comprehensive style guide.",
    strengths: ["Outstanding visual hierarchy and typography", "Thoughtful color palette with accessibility contrast ratios", "Detailed interaction specifications", "Mobile-first responsive approach"],
    weaknesses: ["Animation performance considerations not documented"],
  },
  {
    id: "result-8",
    candidateId: "7",
    candidateName: "Emma Wilson",
    assessmentId: "asmt-4",
    assessmentName: "Visual Design Brief — Landing Page Redesign",
    type: "design_brief",
    score: 73,
    maxScore: 100,
    timeTaken: 170,
    completedDate: "2024-11-04T15:45:00Z",
    aiFeedback: "Competent design work with some creative flourishes. The layout is functional but could benefit from stronger information architecture and more intentional whitespace usage.",
    strengths: ["Creative illustration style", "Good brand consistency", "Functional responsive breakpoints"],
    weaknesses: ["Weak information hierarchy on hero section", "Inconsistent spacing system", "CTA buttons lack visual prominence"],
  },
  {
    id: "result-9",
    candidateId: "9",
    candidateName: "Ana Rodriguez",
    assessmentId: "asmt-1",
    assessmentName: "Frontend React Challenge",
    type: "coding",
    score: 55,
    maxScore: 100,
    timeTaken: 89,
    completedDate: "2024-11-10T12:00:00Z",
    aiFeedback: "The candidate demonstrates basic React knowledge but struggled with more advanced concepts. Several components have structural issues and the state management approach needs improvement.",
    strengths: ["Basic component rendering works correctly", "Understands JSX syntax and props"],
    weaknesses: ["Prop drilling instead of context or state management", "Missing error handling throughout", "Several runtime errors in edge cases", "Incomplete TypeScript typing"],
  },
  {
    id: "result-10",
    candidateId: "10",
    candidateName: "James Liu",
    assessmentId: "asmt-1",
    assessmentName: "Frontend React Challenge",
    type: "coding",
    score: 81,
    maxScore: 100,
    timeTaken: 72,
    completedDate: "2024-11-11T14:20:00Z",
    aiFeedback: "Solid React skills with clean code structure. The candidate shows good understanding of modern React patterns and delivers well-organized, maintainable code.",
    strengths: ["Clean component decomposition", "Good use of custom hooks for logic reuse", "Comprehensive TypeScript types"],
    weaknesses: ["Could optimize bundle size with lazy loading", "Unit tests cover happy paths only"],
  },
  {
    id: "result-11",
    candidateId: "11",
    candidateName: "Neha Gupta",
    assessmentId: "asmt-2",
    assessmentName: "Product Design Portfolio Review",
    type: "portfolio_review",
    score: 66,
    maxScore: 100,
    timeTaken: 40,
    completedDate: "2024-11-07T10:00:00Z",
    aiFeedback: "The portfolio shows potential but lacks depth in several areas. Projects demonstrate visual skill but the design process documentation is thin and outcomes are not well quantified.",
    strengths: ["Appealing visual aesthetics", "Good variety of project types"],
    weaknesses: ["Minimal process documentation", "No user research evidence", "Missing success metrics and business impact", "Portfolio website has slow load times"],
  },
  {
    id: "result-12",
    candidateId: "12",
    candidateName: "David Park",
    assessmentId: "asmt-3",
    assessmentName: "System Design — Scalable Notification Service",
    type: "system_design",
    score: 90,
    maxScore: 100,
    timeTaken: 95,
    completedDate: "2024-11-16T11:00:00Z",
    aiFeedback: "Excellent system design submission. The candidate demonstrated deep expertise in distributed systems with a pragmatic approach to architecture. Clear communication of trade-offs and phased rollout strategy.",
    strengths: ["Detailed capacity estimation and math", "Elegant pub-sub architecture with dead letter queues", "Comprehensive monitoring and alerting strategy", "Phased migration plan from monolith"],
    weaknesses: ["Could elaborate more on security considerations"],
  },
];

// ---------------------------------------------------------------------------
// 11. Interviews
// ---------------------------------------------------------------------------
export const mockInterviews: Interview[] = [
  {
    id: "int-1",
    candidateId: "1",
    candidateName: "Priya Mehta",
    candidateRole: "Senior Product Designer",
    jobId: "1",
    jobTitle: "Senior Product Designer",
    type: "portfolio",
    scheduledDate: "2024-11-18T10:00:00Z",
    duration: 60,
    interviewers: [
      { name: "Amaan Shahana", role: "Design Director" },
      { name: "Sarah Mitchell", role: "UX Research Lead" },
    ],
    status: "confirmed",
    meetingLink: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: "int-2",
    candidateId: "2",
    candidateName: "Alex Chen",
    candidateRole: "Senior Full Stack Engineer",
    jobId: "5",
    jobTitle: "Senior Full Stack Engineer",
    type: "technical",
    scheduledDate: "2024-11-19T14:00:00Z",
    duration: 90,
    interviewers: [
      { name: "David Kim", role: "Engineering Manager" },
      { name: "Vikram Mehta", role: "Staff Engineer" },
    ],
    status: "confirmed",
    meetingLink: "https://zoom.us/j/123456789",
  },
  {
    id: "int-3",
    candidateId: "4",
    candidateName: "Arjun Patel",
    candidateRole: "Visual Designer",
    jobId: "3",
    jobTitle: "Visual Designer",
    type: "culture",
    scheduledDate: "2024-11-20T11:00:00Z",
    duration: 45,
    interviewers: [
      { name: "Raj Patel", role: "Design Manager" },
    ],
    status: "pending",
  },
  {
    id: "int-4",
    candidateId: "6",
    candidateName: "Raj Kumar",
    candidateRole: "Backend Engineer",
    jobId: "6",
    jobTitle: "Backend Engineer",
    type: "system_design",
    scheduledDate: "2024-11-15T15:00:00Z",
    duration: 75,
    interviewers: [
      { name: "Vikram Mehta", role: "Staff Engineer" },
      { name: "Priya Singh", role: "Data Science Lead" },
    ],
    status: "completed",
    meetingLink: "https://meet.google.com/klm-nopq-rst",
  },
  {
    id: "int-5",
    candidateId: "12",
    candidateName: "David Park",
    candidateRole: "Backend Engineer",
    jobId: "6",
    jobTitle: "Backend Engineer",
    type: "final",
    scheduledDate: "2024-11-22T09:30:00Z",
    duration: 60,
    interviewers: [
      { name: "Vikram Mehta", role: "Staff Engineer" },
      { name: "David Kim", role: "Engineering Manager" },
      { name: "Amaan Shahana", role: "VP of Product" },
    ],
    status: "pending",
    meetingLink: "https://zoom.us/j/987654321",
  },
  {
    id: "int-6",
    candidateId: "3",
    candidateName: "Riya Sharma",
    candidateRole: "Senior Product Designer",
    jobId: "1",
    jobTitle: "Senior Product Designer",
    type: "portfolio",
    scheduledDate: "2024-11-12T10:00:00Z",
    duration: 60,
    interviewers: [
      { name: "Amaan Shahana", role: "Design Director" },
    ],
    status: "cancelled",
  },
];

export const mockInterviewGuides: InterviewGuide[] = [
  {
    id: "guide-1",
    candidateId: "1",
    candidateName: "Priya Mehta",
    jobTitle: "Senior Product Designer",
    generatedDate: "2024-11-17T08:00:00Z",
    openingContext: "Priya has 7 years of product design experience at Flipkart and Swiggy. Her portfolio scored 88/100 with particularly strong case study storytelling. She currently leads a team of 3 at Swiggy. Focus on validating her leadership experience and probing gaps in design system work.",
    strengthsToValidate: [
      "End-to-end design ownership at scale (Swiggy checkout redesign impacted 2M+ users)",
      "Strong quantitative approach — measures impact with A/B tests and funnel metrics",
      "Experience mentoring junior designers",
    ],
    gapsToProbe: [
      "Limited design system contributions in portfolio — verify depth of component-level thinking",
      "No accessibility-focused projects shown — assess WCAG awareness",
      "Career gap of 6 months in 2022 — address naturally if relevant",
    ],
    suggestedQuestions: [
      { question: "Walk me through a project where you had to push back on a product manager's direction. What was the outcome?", category: "Collaboration", timeAllocation: 8 },
      { question: "How did you approach the Swiggy checkout redesign? What metrics did you track and how did you iterate?", category: "Design Process", timeAllocation: 10 },
      { question: "Describe a time you built or contributed to a design system. What principles guided your decisions?", category: "Design Systems", timeAllocation: 8 },
      { question: "How do you ensure your designs are accessible? Give a specific example.", category: "Accessibility", timeAllocation: 6 },
      { question: "Tell me about a design decision you made that failed. What did you learn?", category: "Growth Mindset", timeAllocation: 7 },
      { question: "How do you prioritize when you have competing design requests from multiple product teams?", category: "Prioritization", timeAllocation: 6 },
      { question: "What is your approach to mentoring junior designers? Share a specific example of growth you enabled.", category: "Leadership", timeAllocation: 7 },
      { question: "How do you stay current with design trends while maintaining a consistent product experience?", category: "Design Thinking", timeAllocation: 5 },
    ],
    flagsToVerify: [
      "AI content score of 18% on resume — verify authenticity of listed achievements",
      "Portfolio website had 2 broken links at time of screening",
    ],
    totalDuration: 60,
  },
  {
    id: "guide-2",
    candidateId: "2",
    candidateName: "Alex Chen",
    jobTitle: "Senior Full Stack Engineer",
    generatedDate: "2024-11-18T08:00:00Z",
    openingContext: "Alex scored 92/100 on the coding assessment with exceptional React architecture. He has 6 years of experience at Shopify and currently works at a Series B startup. His GitHub shows consistent open-source contributions. Validate system design thinking and collaboration skills.",
    strengthsToValidate: [
      "Outstanding React and TypeScript proficiency demonstrated in assessment",
      "Active open-source contributor with 1.2k GitHub stars across projects",
      "Experience scaling services at Shopify (handled Black Friday traffic)",
    ],
    gapsToProbe: [
      "Assessment showed gaps in test coverage — understand testing philosophy",
      "No cloud infrastructure experience listed — verify DevOps comfort level",
      "Current startup is pre-product-market-fit — assess ability to work in mature codebase",
    ],
    suggestedQuestions: [
      { question: "Describe the most complex technical architecture you have designed. What were the key trade-offs?", category: "System Design", timeAllocation: 10 },
      { question: "How did you handle scaling challenges during Shopify's peak traffic events?", category: "Scalability", timeAllocation: 8 },
      { question: "Walk me through your testing strategy. When do you write tests and what do you prioritize?", category: "Testing", timeAllocation: 7 },
      { question: "Tell me about a time you had to debug a production issue under pressure. What was your process?", category: "Debugging", timeAllocation: 8 },
      { question: "How do you approach code reviews? What do you look for and how do you give feedback?", category: "Collaboration", timeAllocation: 6 },
      { question: "Describe your experience with CI/CD pipelines and infrastructure as code.", category: "DevOps", timeAllocation: 6 },
      { question: "What motivates your open-source contributions? How do you balance them with work?", category: "Passion", timeAllocation: 5 },
      { question: "How do you approach working with designers and product managers to scope features?", category: "Cross-functional", timeAllocation: 6 },
      { question: "What is your experience with database optimization? Give a specific example.", category: "Database", timeAllocation: 7 },
      { question: "Where do you see yourself technically in 3 years? What skills do you want to develop?", category: "Growth", timeAllocation: 5 },
    ],
    flagsToVerify: [
      "Short tenure at current startup (8 months) — understand motivation for leaving",
    ],
    totalDuration: 90,
  },
  {
    id: "guide-3",
    candidateId: "6",
    candidateName: "Raj Kumar",
    jobTitle: "Backend Engineer",
    generatedDate: "2024-11-14T08:00:00Z",
    openingContext: "Raj scored 85/100 on the system design assessment with strong scalability thinking. He has 4 years of backend experience at Infosys and Razorpay. His technical profile shows deep expertise in Node.js and PostgreSQL. Probe production experience and independent problem-solving ability.",
    strengthsToValidate: [
      "Strong system design fundamentals — scored well on trade-off analysis",
      "Experience with payment systems at Razorpay (high reliability domain)",
      "Good grasp of message queues and caching patterns",
    ],
    gapsToProbe: [
      "System design assessment noted weak monitoring/observability section",
      "No experience with Go listed — role may require it",
      "Resume mentions leading a project but no direct reports — clarify leadership scope",
    ],
    suggestedQuestions: [
      { question: "How do you approach monitoring and observability for production services?", category: "Operations", timeAllocation: 8 },
      { question: "Describe the most critical production incident you handled at Razorpay. What was the root cause and resolution?", category: "Incident Response", timeAllocation: 10 },
      { question: "Walk me through how you would design an API rate limiter from scratch.", category: "System Design", timeAllocation: 10 },
      { question: "What is your experience with Go or other compiled languages? How quickly can you ramp up?", category: "Technical Skills", timeAllocation: 5 },
      { question: "How do you ensure data consistency in distributed systems?", category: "Distributed Systems", timeAllocation: 8 },
      { question: "Tell me about a time you optimized a slow database query. What was the impact?", category: "Database", timeAllocation: 7 },
      { question: "How do you approach writing documentation for APIs and services?", category: "Communication", timeAllocation: 5 },
      { question: "Describe a project where you had to make a difficult technical decision with incomplete information.", category: "Decision Making", timeAllocation: 7 },
    ],
    flagsToVerify: [
      "Resume states 'led a team of 5' — verify whether this was formal management or tech lead role",
      "Infosys tenure (2 years) included a client switch — clarify nature of projects",
    ],
    totalDuration: 75,
  },
  {
    id: "guide-4",
    candidateId: "12",
    candidateName: "David Park",
    jobTitle: "Backend Engineer",
    generatedDate: "2024-11-21T08:00:00Z",
    openingContext: "David scored 90/100 on system design — highest among all backend candidates. He has 5 years at Amazon AWS and currently works at Stripe. His assessment showed exceptional capacity estimation and phased migration thinking. This is a final-round interview; focus on culture fit and long-term alignment.",
    strengthsToValidate: [
      "Exceptional system design skills — detailed capacity math and phased rollout plan",
      "Experience at two top-tier infrastructure companies (AWS, Stripe)",
      "Strong communication skills evident from assessment write-up clarity",
    ],
    gapsToProbe: [
      "Assessment noted security considerations could be deeper — probe security mindset",
      "Moving from big tech to mid-stage startup — validate motivation and adaptability",
      "No frontend experience — assess willingness to contribute across stack when needed",
    ],
    suggestedQuestions: [
      { question: "What motivates your interest in leaving Stripe for a mid-stage company? What are you looking for?", category: "Motivation", timeAllocation: 7 },
      { question: "How do you approach security in API and service design? Walk me through your security checklist.", category: "Security", timeAllocation: 8 },
      { question: "Describe a time you had to simplify a complex technical concept for a non-technical audience.", category: "Communication", timeAllocation: 6 },
      { question: "What does a healthy engineering culture look like to you?", category: "Culture", timeAllocation: 6 },
      { question: "How do you handle disagreements with team members about technical direction?", category: "Collaboration", timeAllocation: 7 },
      { question: "Tell me about your experience with on-call and incident management at scale.", category: "Operations", timeAllocation: 6 },
      { question: "If you could change one thing about how backend systems are typically built, what would it be?", category: "Vision", timeAllocation: 5 },
      { question: "How do you approach learning new technologies or frameworks outside your comfort zone?", category: "Growth", timeAllocation: 5 },
      { question: "Where do you see yourself contributing most in your first 90 days?", category: "Onboarding", timeAllocation: 5 },
      { question: "What questions do you have for us about the team, product, or company direction?", category: "Candidate Questions", timeAllocation: 10 },
    ],
    flagsToVerify: [
      "Salary expectations may be high given Stripe compensation — confirm range alignment early",
      "Notice period at Stripe is typically 2 months — confirm availability timeline",
    ],
    totalDuration: 60,
  },
];

export const mockInterviewFeedback: InterviewFeedback[] = [
  {
    id: "fb-1",
    interviewId: "int-4",
    candidateId: "6",
    candidateName: "Raj Kumar",
    interviewerName: "Vikram Mehta",
    interviewerRole: "Staff Engineer",
    jobTitle: "Backend Engineer",
    date: "2024-11-15T16:30:00Z",
    criteriaRatings: [
      { criterion: "System Design", rating: 4, maxRating: 5, notes: "Strong understanding of distributed patterns. Proposed an elegant pub-sub architecture for the notification service." },
      { criterion: "Problem Solving", rating: 4, maxRating: 5, notes: "Methodical approach to breaking down complex problems. Considered edge cases proactively." },
      { criterion: "Technical Depth", rating: 3, maxRating: 5, notes: "Solid Node.js and PostgreSQL skills. Limited exposure to Go, which we use for some services." },
      { criterion: "Communication", rating: 4, maxRating: 5, notes: "Explains technical decisions clearly. Good whiteboard skills." },
      { criterion: "Culture Fit", rating: 4, maxRating: 5, notes: "Collaborative mindset. Seems genuinely excited about our mission." },
    ],
    overallNotes: "Strong candidate with solid backend fundamentals. Would benefit from Go exposure but can ramp up. Recommend advancing to final round with a focus on validating leadership potential.",
    decision: "advance",
    aiSynthesis: "Raj demonstrated strong system design and problem-solving skills, scoring 4/5 on both criteria. His main gap is limited Go experience (3/5 on Technical Depth), but his Node.js expertise and distributed systems knowledge are transferable. Combined with his 85/100 assessment score, he is a strong hire candidate. Recommend advancing to final round.",
  },
  {
    id: "fb-2",
    interviewId: "int-4",
    candidateId: "6",
    candidateName: "Raj Kumar",
    interviewerName: "Priya Singh",
    interviewerRole: "Data Science Lead",
    jobTitle: "Backend Engineer",
    date: "2024-11-15T16:30:00Z",
    criteriaRatings: [
      { criterion: "System Design", rating: 4, maxRating: 5, notes: "Impressed by his capacity estimation approach. Good understanding of caching strategies." },
      { criterion: "Problem Solving", rating: 3, maxRating: 5, notes: "Solved most problems well but took longer on the distributed consensus question." },
      { criterion: "Technical Depth", rating: 3, maxRating: 5, notes: "Strong in his domain but narrow. Needs to broaden beyond Node.js ecosystem." },
      { criterion: "Communication", rating: 5, maxRating: 5, notes: "Excellent communicator. Asked great clarifying questions before diving into solutions." },
      { criterion: "Culture Fit", rating: 4, maxRating: 5, notes: "Aligns well with our values. Showed genuine interest in our data pipeline challenges." },
    ],
    overallNotes: "Good candidate overall. Communication skills stand out. Would be a solid addition to the backend team, especially for API and data pipeline work.",
    decision: "advance",
    aiSynthesis: "Priya Singh's assessment aligns with Vikram's on system design strength (4/5). She noted slightly lower problem-solving speed but highlighted Raj's exceptional communication skills (5/5). Both interviewers agree on advancing. Consensus: strong candidate for backend API and data pipeline work.",
  },
  {
    id: "fb-3",
    interviewId: "int-6",
    candidateId: "3",
    candidateName: "Riya Sharma",
    interviewerName: "Amaan Shahana",
    interviewerRole: "Design Director",
    jobTitle: "Senior Product Designer",
    date: "2024-11-12T11:15:00Z",
    criteriaRatings: [
      { criterion: "Design Thinking", rating: 3, maxRating: 5, notes: "Shows awareness of user-centered design but process documentation in portfolio is thin." },
      { criterion: "Visual Execution", rating: 4, maxRating: 5, notes: "Strong visual skills. Good eye for typography and color. Consistent style across projects." },
      { criterion: "Research & Insights", rating: 2, maxRating: 5, notes: "Weak on research methodology. Could not articulate a clear research framework when asked." },
      { criterion: "Collaboration", rating: 3, maxRating: 5, notes: "Described mostly solo work. Limited evidence of cross-functional collaboration." },
      { criterion: "Leadership Potential", rating: 2, maxRating: 5, notes: "Currently an IC with no mentorship experience. Role requires mentoring junior designers." },
    ],
    overallNotes: "Riya has strong visual skills but the Senior role requires deeper research capabilities and leadership experience than she currently demonstrates. Better suited for a mid-level position. Recommend hold pending conversation about role leveling.",
    decision: "hold",
    aiSynthesis: "Riya's feedback reveals a skill-level mismatch for the Senior Product Designer role. While her visual execution is strong (4/5), her research skills (2/5) and leadership potential (2/5) fall below the senior threshold. Her assessment score of 71/100 corroborates this gap. Recommend either holding for a mid-level role or providing structured feedback for reapplication.",
  },
  {
    id: "fb-4",
    interviewId: "int-1",
    candidateId: "1",
    candidateName: "Priya Mehta",
    interviewerName: "Amaan Shahana",
    interviewerRole: "Design Director",
    jobTitle: "Senior Product Designer",
    date: "2024-11-18T11:15:00Z",
    criteriaRatings: [
      { criterion: "Design Thinking", rating: 5, maxRating: 5, notes: "Exceptional end-to-end thinking. Her Swiggy checkout case study showed rigorous problem framing and iteration." },
      { criterion: "Visual Execution", rating: 4, maxRating: 5, notes: "Strong visual skills with good attention to detail. Could push further on motion design." },
      { criterion: "Research & Insights", rating: 4, maxRating: 5, notes: "Good research instincts. Uses both qualitative and quantitative data to inform decisions." },
      { criterion: "Collaboration", rating: 5, maxRating: 5, notes: "Excellent cross-functional skills. Described productive conflicts with PMs that led to better outcomes." },
      { criterion: "Leadership Potential", rating: 4, maxRating: 5, notes: "Mentors 3 junior designers currently. Could grow into a design lead role within a year." },
    ],
    overallNotes: "Priya is our strongest candidate for this role. Her design thinking and collaboration skills are exactly what we need. I am confident she would elevate the whole team. Strong hire recommendation.",
    decision: "advance",
    aiSynthesis: "Priya received consistently high ratings from Amaan: 5/5 on Design Thinking and Collaboration, 4/5 on the remaining criteria. Combined with her 88/100 assessment score and strong portfolio, she is the top candidate for this role. Unanimous recommendation to advance to offer stage.",
  },
  {
    id: "fb-5",
    interviewId: "int-1",
    candidateId: "1",
    candidateName: "Priya Mehta",
    interviewerName: "Sarah Mitchell",
    interviewerRole: "UX Research Lead",
    jobTitle: "Senior Product Designer",
    date: "2024-11-18T11:15:00Z",
    criteriaRatings: [
      { criterion: "Design Thinking", rating: 4, maxRating: 5, notes: "Solid design process. She asks the right questions before jumping to solutions." },
      { criterion: "Visual Execution", rating: 4, maxRating: 5, notes: "Clean, professional work. Consistent design language across projects." },
      { criterion: "Research & Insights", rating: 5, maxRating: 5, notes: "Impressive research integration. She described mixed-methods approaches that directly influenced product decisions." },
      { criterion: "Collaboration", rating: 5, maxRating: 5, notes: "Describes design as a team sport. Actively seeks feedback from engineering early in the process." },
      { criterion: "Leadership Potential", rating: 4, maxRating: 5, notes: "Ready for a senior role. Has the emotional intelligence and communication skills to lead." },
    ],
    overallNotes: "I was particularly impressed by how Priya integrates research into her design process. She does not just design — she validates. This research-mindedness is rare and exactly what we need. Strong yes.",
    decision: "advance",
    aiSynthesis: "Sarah's feedback reinforces Amaan's assessment. She rated Priya 5/5 on Research & Insights and Collaboration, aligning with the role's core requirements. Both interviewers are a strong yes. Aggregate score across all criteria: 4.5/5. Recommend moving directly to offer.",
  },
  {
    id: "fb-6",
    interviewId: "int-2",
    candidateId: "2",
    candidateName: "Alex Chen",
    interviewerName: "David Kim",
    interviewerRole: "Engineering Manager",
    jobTitle: "Senior Full Stack Engineer",
    date: "2024-11-19T15:45:00Z",
    criteriaRatings: [
      { criterion: "Technical Skills", rating: 5, maxRating: 5, notes: "Outstanding React and TypeScript depth. Live coding was impressive — clean code under pressure." },
      { criterion: "System Design", rating: 4, maxRating: 5, notes: "Good architecture thinking. Proposed a solid event-driven system. Could go deeper on data modeling." },
      { criterion: "Problem Solving", rating: 5, maxRating: 5, notes: "Excellent problem decomposition. Found an elegant solution to the edge case I threw at him." },
      { criterion: "Communication", rating: 4, maxRating: 5, notes: "Thinks out loud well. Explains rationale clearly. Could be slightly more concise." },
      { criterion: "Culture Fit", rating: 4, maxRating: 5, notes: "Collaborative, curious, and humble. Mentioned he loves code reviews and learning from others." },
    ],
    overallNotes: "Alex is technically outstanding and would be a strong addition to the team. His coding assessment and interview performance are both in the top tier. Recommend advancing to offer with competitive compensation.",
    decision: "advance",
    aiSynthesis: "Alex demonstrated top-tier technical skills (5/5) and problem-solving (5/5) in David's interview. Combined with his 92/100 assessment score, he is the strongest engineering candidate in the pipeline. His only growth area is data modeling depth. Recommend advancing to offer.",
  },
  {
    id: "fb-7",
    interviewId: "int-2",
    candidateId: "2",
    candidateName: "Alex Chen",
    interviewerName: "Vikram Mehta",
    interviewerRole: "Staff Engineer",
    jobTitle: "Senior Full Stack Engineer",
    date: "2024-11-19T15:45:00Z",
    criteriaRatings: [
      { criterion: "Technical Skills", rating: 5, maxRating: 5, notes: "Deep expertise in React ecosystem. Also showed solid backend knowledge during system design discussion." },
      { criterion: "System Design", rating: 4, maxRating: 5, notes: "Good understanding of distributed systems fundamentals. His Shopify scaling experience shows." },
      { criterion: "Problem Solving", rating: 4, maxRating: 5, notes: "Structured thinker. Asks good clarifying questions before coding." },
      { criterion: "Communication", rating: 5, maxRating: 5, notes: "One of the best communicators I have interviewed. Clearly articulates trade-offs and alternatives." },
      { criterion: "Culture Fit", rating: 5, maxRating: 5, notes: "Would be a fantastic teammate. Genuine passion for building great products." },
    ],
    overallNotes: "Alex would be an immediate contributor and a culture amplifier. His technical skills are strong and his communication is exceptional. Strong hire.",
    decision: "advance",
    aiSynthesis: "Vikram's feedback is strongly aligned with David's assessment. Both rate Alex's technical skills at 5/5. Vikram additionally highlights exceptional communication (5/5) and culture fit (5/5). Aggregate interviewer score: 4.6/5. Combined with assessment performance, Alex is the top engineering candidate. Recommend advancing to offer immediately.",
  },
  {
    id: "fb-8",
    interviewId: "int-3",
    candidateId: "4",
    candidateName: "Arjun Patel",
    interviewerName: "Raj Patel",
    interviewerRole: "Design Manager",
    jobTitle: "Visual Designer",
    date: "2024-11-20T12:00:00Z",
    criteriaRatings: [
      { criterion: "Visual Design", rating: 5, maxRating: 5, notes: "Exceptional visual skills. His landing page redesign was the strongest submission we received." },
      { criterion: "Brand Thinking", rating: 4, maxRating: 5, notes: "Good brand consistency. Understands how visual design serves brand narrative." },
      { criterion: "Tools Proficiency", rating: 5, maxRating: 5, notes: "Expert in Figma, Illustrator, and After Effects. Demonstrated advanced prototyping skills." },
      { criterion: "Communication", rating: 3, maxRating: 5, notes: "Slightly introverted in the interview but articulates design decisions well when prompted." },
      { criterion: "Culture Fit", rating: 4, maxRating: 5, notes: "Passionate about craft. Would thrive in our studio-style team environment." },
    ],
    overallNotes: "Arjun is a rare visual talent. His assessment score of 94/100 speaks for itself. He is a bit quiet in group settings but his work is outstanding. I am confident he will open up once he is comfortable. Strong hire for the Visual Designer role.",
    decision: "advance",
    aiSynthesis: "Arjun received outstanding marks on Visual Design (5/5) and Tools Proficiency (5/5), consistent with his 94/100 assessment score. His only development area is communication confidence in group settings (3/5), which is manageable for an IC role. Recommend advancing to offer.",
  },
];

// ---------------------------------------------------------------------------
// 12. Reports
// ---------------------------------------------------------------------------
export const mockHiringMetrics: HiringMetric[] = [
  { month: "2024-06", tth: 48, cph: 28500, offerAcceptance: 68, pipelineVelocity: 3.2 },
  { month: "2024-07", tth: 45, cph: 26800, offerAcceptance: 71, pipelineVelocity: 3.5 },
  { month: "2024-08", tth: 41, cph: 25200, offerAcceptance: 74, pipelineVelocity: 3.8 },
  { month: "2024-09", tth: 38, cph: 23400, offerAcceptance: 78, pipelineVelocity: 4.1 },
  { month: "2024-10", tth: 35, cph: 22100, offerAcceptance: 80, pipelineVelocity: 4.4 },
  { month: "2024-11", tth: 32, cph: 21400, offerAcceptance: 82, pipelineVelocity: 4.7 },
];

export const mockSourceMetrics: SourceMetric[] = [
  { source: "LinkedIn", applicants: 312, shortlisted: 47, hired: 8, costPerHire: 18500, conversionRate: 2.6 },
  { source: "Naukri", applicants: 245, shortlisted: 31, hired: 5, costPerHire: 14200, conversionRate: 2.0 },
  { source: "Indeed", applicants: 189, shortlisted: 22, hired: 3, costPerHire: 16800, conversionRate: 1.6 },
  { source: "Glassdoor", applicants: 78, shortlisted: 12, hired: 2, costPerHire: 22100, conversionRate: 2.6 },
  { source: "Referral", applicants: 34, shortlisted: 18, hired: 6, costPerHire: 8500, conversionRate: 17.6 },
  { source: "Direct", applicants: 92, shortlisted: 14, hired: 2, costPerHire: 12300, conversionRate: 2.2 },
];

export const mockAIPerformanceMetrics: AIPerformanceMetric[] = [
  { month: "2024-06", screeningVolume: 156, shortlistPrecision: 72, falsePositiveRate: 18, falseNegativeRate: 12 },
  { month: "2024-07", screeningVolume: 198, shortlistPrecision: 76, falsePositiveRate: 15, falseNegativeRate: 10 },
  { month: "2024-08", screeningVolume: 234, shortlistPrecision: 79, falsePositiveRate: 13, falseNegativeRate: 9 },
  { month: "2024-09", screeningVolume: 267, shortlistPrecision: 82, falsePositiveRate: 11, falseNegativeRate: 8 },
  { month: "2024-10", screeningVolume: 301, shortlistPrecision: 85, falsePositiveRate: 9, falseNegativeRate: 7 },
  { month: "2024-11", screeningVolume: 342, shortlistPrecision: 88, falsePositiveRate: 7, falseNegativeRate: 5 },
];

export const mockDEIMetrics: DEIMetric[] = [
  {
    stage: "Applied",
    total: 847,
    demographics: [
      { group: "Men", count: 508, percentage: 60 },
      { group: "Women", count: 297, percentage: 35 },
      { group: "Non-binary", count: 42, percentage: 5 },
    ],
  },
  {
    stage: "AI Screened",
    total: 456,
    demographics: [
      { group: "Men", count: 269, percentage: 59 },
      { group: "Women", count: 164, percentage: 36 },
      { group: "Non-binary", count: 23, percentage: 5 },
    ],
  },
  {
    stage: "Shortlisted",
    total: 186,
    demographics: [
      { group: "Men", count: 109, percentage: 59 },
      { group: "Women", count: 67, percentage: 36 },
      { group: "Non-binary", count: 10, percentage: 5 },
    ],
  },
  {
    stage: "Assessment",
    total: 67,
    demographics: [
      { group: "Men", count: 38, percentage: 57 },
      { group: "Women", count: 25, percentage: 37 },
      { group: "Non-binary", count: 4, percentage: 6 },
    ],
  },
  {
    stage: "Interview Scheduled",
    total: 31,
    demographics: [
      { group: "Men", count: 17, percentage: 55 },
      { group: "Women", count: 12, percentage: 39 },
      { group: "Non-binary", count: 2, percentage: 6 },
    ],
  },
  {
    stage: "Interview Done",
    total: 18,
    demographics: [
      { group: "Men", count: 10, percentage: 56 },
      { group: "Women", count: 7, percentage: 39 },
      { group: "Non-binary", count: 1, percentage: 5 },
    ],
  },
  {
    stage: "Offer",
    total: 12,
    demographics: [
      { group: "Men", count: 6, percentage: 50 },
      { group: "Women", count: 5, percentage: 42 },
      { group: "Non-binary", count: 1, percentage: 8 },
    ],
  },
  {
    stage: "Hired",
    total: 8,
    demographics: [
      { group: "Men", count: 4, percentage: 50 },
      { group: "Women", count: 3, percentage: 37.5 },
      { group: "Non-binary", count: 1, percentage: 12.5 },
    ],
  },
];

// ---------------------------------------------------------------------------
// 13. Settings
// ---------------------------------------------------------------------------
export const mockTeamMembers: TeamMember[] = [
  {
    id: "tm-1",
    name: "Amaan Shahana",
    email: "amaan@wisehire.io",
    role: "Admin",
    permissions: "Full Access",
    status: "active",
    avatarInitials: "AS",
    joinedDate: "2024-01-15T10:00:00Z",
  },
  {
    id: "tm-2",
    name: "Sarah Mitchell",
    email: "sarah.mitchell@wisehire.io",
    role: "Hiring Manager",
    permissions: "Manage Jobs & Candidates",
    status: "active",
    avatarInitials: "SM",
    joinedDate: "2024-03-08T10:00:00Z",
  },
  {
    id: "tm-3",
    name: "Vikram Mehta",
    email: "vikram.mehta@wisehire.io",
    role: "Interviewer",
    permissions: "View Candidates & Submit Feedback",
    status: "active",
    avatarInitials: "VM",
    joinedDate: "2024-04-22T10:00:00Z",
  },
  {
    id: "tm-4",
    name: "Priya Singh",
    email: "priya.singh@wisehire.io",
    role: "Hiring Manager",
    permissions: "Manage Jobs & Candidates",
    status: "invited",
    avatarInitials: "PS",
    joinedDate: "2024-11-01T10:00:00Z",
  },
  {
    id: "tm-5",
    name: "Raj Patel",
    email: "raj.patel@wisehire.io",
    role: "Interviewer",
    permissions: "View Candidates & Submit Feedback",
    status: "deactivated",
    avatarInitials: "RP",
    joinedDate: "2024-02-10T10:00:00Z",
  },
];

export const mockIntegrations: Integration[] = [
  {
    id: "intg-1",
    name: "LinkedIn Recruiter",
    category: "job_board",
    description: "Post jobs, source candidates, and sync applicant data directly from LinkedIn Recruiter.",
    status: "connected",
    icon: "linkedin",
  },
  {
    id: "intg-2",
    name: "Google Calendar",
    category: "calendar",
    description: "Sync interview schedules, check interviewer availability, and send calendar invites automatically.",
    status: "connected",
    icon: "calendar",
  },
  {
    id: "intg-3",
    name: "Zoom",
    category: "video",
    description: "Generate Zoom meeting links for interviews and record sessions for review.",
    status: "connected",
    icon: "video",
  },
  {
    id: "intg-4",
    name: "Slack",
    category: "messaging",
    description: "Get real-time notifications for new applicants, interview reminders, and ARIA alerts in Slack channels.",
    status: "connected",
    icon: "message-square",
  },
  {
    id: "intg-5",
    name: "BambooHR",
    category: "hris",
    description: "Sync employee data, push new hires to onboarding workflows, and maintain a single source of truth.",
    status: "not_connected",
    icon: "users",
  },
  {
    id: "intg-6",
    name: "Zapier",
    category: "automation",
    description: "Connect WiseHire with 5,000+ apps. Automate workflows like posting to multiple job boards or syncing with spreadsheets.",
    status: "not_connected",
    icon: "zap",
  },
  {
    id: "intg-7",
    name: "Indeed",
    category: "job_board",
    description: "Publish job listings to Indeed and import applicants into your WiseHire pipeline automatically.",
    status: "connected",
    icon: "briefcase",
  },
  {
    id: "intg-8",
    name: "Microsoft Teams",
    category: "video",
    description: "Schedule and host interviews via Microsoft Teams. Supports meeting link generation and recording.",
    status: "not_connected",
    icon: "monitor",
  },
];

export const mockCompanySettings: CompanySettings = {
  name: "WiseHire Technologies",
  locations: ["Bangalore", "Toronto", "Mumbai", "Pune", "Remote"],
  cultureValues: [
    "User obsession — every decision starts with the user",
    "Bias for action — ship fast, learn faster",
    "Radical transparency — share context widely",
    "Craft matters — sweat the details",
    "Inclusive by default — build for everyone",
  ],
  aiConfig: {
    resumeWeight: 30,
    portfolioWeight: 25,
    technicalWeight: 30,
    cultureWeight: 15,
    autoScreening: true,
    detectionSensitivity: "medium",
    ariaProactiveSuggestions: true,
  },
};
