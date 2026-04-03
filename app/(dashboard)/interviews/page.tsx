"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Clock,
  Video,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertCircle,
  Flag,
  Sparkles,
  User,
  Briefcase,
  Plus,
  ExternalLink,
  Loader2,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  TYPES                                                                     */
/* -------------------------------------------------------------------------- */

type InterviewType =
  | "technical"
  | "culture"
  | "portfolio"
  | "system_design"
  | "final";

type InterviewStatus = "confirmed" | "pending" | "completed" | "cancelled";

interface Interviewer {
  name: string;
  initials: string;
  color: string;
}

interface ScheduledInterview {
  id: string;
  candidateName: string;
  candidateInitials: string;
  candidateColor: string;
  role: string;
  jobTitle: string;
  type: InterviewType;
  date: string;
  time: string;
  interviewers: Interviewer[];
  status: InterviewStatus;
  meetingLink: string;
}

interface GuideQuestion {
  number: number;
  category: string;
  question: string;
  timeMinutes: number;
}

interface InterviewGuide {
  id: string;
  candidateName: string;
  jobTitle: string;
  generatedDate: string;
  openingContext: string;
  strengths: string[];
  gaps: string[];
  questions: GuideQuestion[];
  flags: string[];
  totalDuration: number;
}

type FeedbackDecision = "advance" | "hold" | "reject";

interface FeedbackCriterion {
  name: string;
  rating: number;
  notes: string;
}

interface InterviewFeedback {
  id: string;
  candidateName: string;
  interviewerName: string;
  interviewerRole: string;
  jobTitle: string;
  date: string;
  criteria: FeedbackCriterion[];
  decision: FeedbackDecision;
  aiSynthesis: string;
  overallNotes: string;
}

/* -------------------------------------------------------------------------- */
/*  MOCK DATA                                                                 */
/* -------------------------------------------------------------------------- */

const SCHEDULED_INTERVIEWS: ScheduledInterview[] = [
  {
    id: "int-1",
    candidateName: "Sarah Chen",
    candidateInitials: "SC",
    candidateColor: "#6366F1",
    role: "Senior Frontend Engineer",
    jobTitle: "Senior Frontend Engineer",
    type: "technical",
    date: "Mar 26, 2026",
    time: "10:00 AM - 11:00 AM",
    interviewers: [
      { name: "Alex Rivera", initials: "AR", color: "#0E5EF5" },
      { name: "Priya Sharma", initials: "PS", color: "#7C3AED" },
    ],
    status: "confirmed",
    meetingLink: "#",
  },
  {
    id: "int-2",
    candidateName: "Marcus Johnson",
    candidateInitials: "MJ",
    candidateColor: "#059669",
    role: "Product Designer",
    jobTitle: "Senior Product Designer",
    type: "portfolio",
    date: "Mar 26, 2026",
    time: "2:00 PM - 3:00 PM",
    interviewers: [
      { name: "Jordan Lee", initials: "JL", color: "#DC2626" },
      { name: "Amaan Shahana", initials: "AS", color: "#0E5EF5" },
      { name: "Mia Zhang", initials: "MZ", color: "#CA8504" },
    ],
    status: "confirmed",
    meetingLink: "#",
  },
  {
    id: "int-3",
    candidateName: "Elena Volkov",
    candidateInitials: "EV",
    candidateColor: "#DC2626",
    role: "Data Scientist",
    jobTitle: "Staff Data Scientist",
    type: "system_design",
    date: "Mar 27, 2026",
    time: "11:00 AM - 12:30 PM",
    interviewers: [
      { name: "Ravi Patel", initials: "RP", color: "#059669" },
      { name: "Lisa Nguyen", initials: "LN", color: "#7C3AED" },
    ],
    status: "pending",
    meetingLink: "#",
  },
  {
    id: "int-4",
    candidateName: "David Kim",
    candidateInitials: "DK",
    candidateColor: "#CA8504",
    role: "Backend Engineer",
    jobTitle: "Senior Backend Engineer",
    type: "technical",
    date: "Mar 27, 2026",
    time: "3:00 PM - 4:00 PM",
    interviewers: [
      { name: "Alex Rivera", initials: "AR", color: "#0E5EF5" },
    ],
    status: "pending",
    meetingLink: "#",
  },
  {
    id: "int-5",
    candidateName: "Aisha Mohammed",
    candidateInitials: "AM",
    candidateColor: "#7C3AED",
    role: "Engineering Manager",
    jobTitle: "Engineering Manager",
    type: "culture",
    date: "Mar 24, 2026",
    time: "9:00 AM - 10:00 AM",
    interviewers: [
      { name: "Jordan Lee", initials: "JL", color: "#DC2626" },
      { name: "Amaan Shahana", initials: "AS", color: "#0E5EF5" },
    ],
    status: "completed",
    meetingLink: "#",
  },
  {
    id: "int-6",
    candidateName: "Tom Bradley",
    candidateInitials: "TB",
    candidateColor: "#0EA5E9",
    role: "QA Lead",
    jobTitle: "QA Lead",
    type: "final",
    date: "Mar 28, 2026",
    time: "1:00 PM - 2:00 PM",
    interviewers: [
      { name: "Priya Sharma", initials: "PS", color: "#7C3AED" },
      { name: "Ravi Patel", initials: "RP", color: "#059669" },
      { name: "Lisa Nguyen", initials: "LN", color: "#7C3AED" },
    ],
    status: "cancelled",
    meetingLink: "#",
  },
];

const INTERVIEW_GUIDES: InterviewGuide[] = [
  {
    id: "guide-1",
    candidateName: "Sarah Chen",
    jobTitle: "Senior Frontend Engineer",
    generatedDate: "Mar 24, 2026",
    openingContext:
      "Sarah brings 7 years of frontend experience with a strong focus on React and TypeScript. She has led the migration of a monolithic jQuery app to a modern React architecture at FinTech Corp, resulting in a 40% improvement in page load times. Her background in accessibility and design systems makes her a strong fit for our component library initiative.",
    strengths: [
      "Deep expertise in React, TypeScript, and Next.js with production-scale experience",
      "Proven track record of leading complex frontend migrations",
      "Strong accessibility knowledge (WCAG 2.1 AA certified)",
      "Experience building and maintaining design systems used by 50+ developers",
      "Excellent communication skills evidenced by conference talks and technical blog posts",
    ],
    gaps: [
      "Limited experience with WebGL/Canvas-based rendering (relevant for our data visualization features)",
      "No prior experience with micro-frontend architecture",
      "Most leadership experience is tech-lead level, not people management",
      "Resume does not mention experience with CI/CD pipeline optimization",
    ],
    questions: [
      { number: 1, category: "Architecture", question: "Walk me through how you would design a component library that supports both light and dark themes while maintaining accessibility standards. What trade-offs would you consider?", timeMinutes: 8 },
      { number: 2, category: "Technical Depth", question: "Describe your approach to optimizing a React application that renders 10,000+ list items with real-time updates. What techniques and patterns would you use?", timeMinutes: 10 },
      { number: 3, category: "Migration", question: "Tell me about the jQuery to React migration at FinTech Corp. How did you plan the migration strategy, and how did you manage risk during the transition?", timeMinutes: 8 },
      { number: 4, category: "Accessibility", question: "How do you ensure accessibility is built into the development process rather than being an afterthought? Give a specific example.", timeMinutes: 6 },
      { number: 5, category: "Collaboration", question: "Describe a situation where you had to align frontend architecture decisions with backend constraints. How did you navigate the trade-offs?", timeMinutes: 6 },
      { number: 6, category: "Problem Solving", question: "You discover that a critical third-party dependency has a security vulnerability. Walk me through your decision-making process.", timeMinutes: 5 },
      { number: 7, category: "System Design", question: "Design a real-time collaborative text editor. Focus on the frontend architecture and state management approach.", timeMinutes: 10 },
      { number: 8, category: "Leadership", question: "How do you approach mentoring junior developers on frontend best practices? Share a specific success story.", timeMinutes: 5 },
      { number: 9, category: "Gap Probe", question: "Our product includes data visualization dashboards with Canvas rendering. How would you approach learning and contributing to this area?", timeMinutes: 5 },
      { number: 10, category: "Culture Fit", question: "What does your ideal engineering culture look like, and how do you contribute to building it?", timeMinutes: 5 },
    ],
    flags: [
      "Short tenure at previous company (11 months) - verify circumstances",
      "GitHub contributions show a gap from June to September 2025 - may be unrelated but worth understanding",
    ],
    totalDuration: 68,
  },
  {
    id: "guide-2",
    candidateName: "Marcus Johnson",
    jobTitle: "Senior Product Designer",
    generatedDate: "Mar 24, 2026",
    openingContext:
      "Marcus has 6 years of product design experience, most recently at a Series B startup where he was the sole designer scaling the design system from 0 to 1. His portfolio showcases strong visual design skills and a data-informed approach to UX decisions. His experience with B2B SaaS products aligns well with our product domain.",
    strengths: [
      "Built a design system from scratch that scaled across 4 product teams",
      "Strong portfolio with measurable impact metrics (conversion improvements, usability scores)",
      "Experience with both consumer and enterprise product design",
      "Proficient in Figma, including advanced prototyping and design tokens",
      "Background in user research - has conducted 100+ usability studies",
    ],
    gaps: [
      "No experience with design systems at scale (50+ contributors)",
      "Portfolio does not showcase complex data visualization work",
      "Limited mention of cross-platform (mobile/desktop) design experience",
    ],
    questions: [
      { number: 1, category: "Design Process", question: "Walk me through your end-to-end design process for a recent feature. How do you balance speed with design quality?", timeMinutes: 8 },
      { number: 2, category: "Design Systems", question: "Tell me about building the design system at your previous company. What were the key decisions you made, and what would you do differently?", timeMinutes: 10 },
      { number: 3, category: "Data-Driven", question: "Describe a time when user research data contradicted your design instinct. How did you handle it?", timeMinutes: 7 },
      { number: 4, category: "Collaboration", question: "How do you work with engineers to ensure design intent is preserved during implementation?", timeMinutes: 6 },
      { number: 5, category: "Scale Challenge", question: "Our design system is used by 60+ contributors. How would you approach governance and contribution models at this scale?", timeMinutes: 8 },
      { number: 6, category: "Portfolio Deep Dive", question: "Let us look at the case study you are most proud of. Walk me through the problem, your process, and the measurable outcome.", timeMinutes: 10 },
      { number: 7, category: "Visual Design", question: "How do you approach creating visual hierarchy in complex enterprise dashboards with dense information?", timeMinutes: 6 },
      { number: 8, category: "Gap Probe", question: "We have significant data visualization needs. How would you approach designing charts and graphs you haven't worked with before?", timeMinutes: 5 },
      { number: 9, category: "Stakeholder Mgmt", question: "Tell me about a time you had to push back on a stakeholder's design request. What was your approach?", timeMinutes: 5 },
      { number: 10, category: "Culture Fit", question: "What kind of design culture do you thrive in, and how do you contribute to shaping it?", timeMinutes: 5 },
      { number: 11, category: "Accessibility", question: "How do you incorporate accessibility into your design workflow? Walk me through your process.", timeMinutes: 5 },
      { number: 12, category: "Cross-Platform", question: "How would you approach designing a feature that needs to work across desktop, tablet, and mobile?", timeMinutes: 5 },
    ],
    flags: [
      "Portfolio hosted on personal domain - verify that all work is original and not under NDA restrictions",
      "References list is incomplete - only one professional reference provided",
    ],
    totalDuration: 80,
  },
  {
    id: "guide-3",
    candidateName: "Elena Volkov",
    jobTitle: "Staff Data Scientist",
    generatedDate: "Mar 25, 2026",
    openingContext:
      "Elena is a PhD researcher turned industry data scientist with 8 years of experience. Her work at a major tech company involved building ML pipelines that processed 10TB+ of data daily. She has published 5 papers in top-tier ML conferences and has experience translating complex models into production-ready systems.",
    strengths: [
      "PhD in Machine Learning from MIT with 5 published papers",
      "Production ML experience at scale (10TB+ daily processing)",
      "Strong coding skills - contributed to several open-source ML libraries",
      "Experience bridging research and production engineering",
      "Prior experience mentoring teams of 4-6 data scientists",
    ],
    gaps: [
      "Most experience is in NLP - limited computer vision background",
      "No explicit experience with real-time ML inference systems",
      "Academic background may mean preference for research over shipping quickly",
      "Limited exposure to A/B testing frameworks at scale",
    ],
    questions: [
      { number: 1, category: "ML Systems", question: "Describe the architecture of the ML pipeline you built at your previous company. How did you handle data quality, model training, and deployment?", timeMinutes: 10 },
      { number: 2, category: "Research to Prod", question: "Walk me through how you translated a research paper into a production feature. What challenges did you face?", timeMinutes: 8 },
      { number: 3, category: "Technical Depth", question: "Explain your approach to feature engineering for a prediction problem with highly imbalanced classes.", timeMinutes: 8 },
      { number: 4, category: "Scale", question: "How do you handle model monitoring and drift detection in production? What metrics do you track?", timeMinutes: 7 },
      { number: 5, category: "Collaboration", question: "How do you communicate complex ML concepts to non-technical stakeholders?", timeMinutes: 5 },
      { number: 6, category: "Gap Probe", question: "Our team is building real-time inference systems. What is your experience with low-latency model serving, and how would you ramp up?", timeMinutes: 7 },
      { number: 7, category: "Leadership", question: "Describe your approach to mentoring junior data scientists. How do you balance guidance with autonomy?", timeMinutes: 5 },
      { number: 8, category: "Ethics", question: "How do you approach fairness and bias in ML models? Give a specific example from your work.", timeMinutes: 6 },
    ],
    flags: [
      "Current employer is a direct competitor - verify non-compete clause status",
      "Expected compensation is at the top of our band - confirm flexibility",
      "Relocation required - verify timeline expectations",
    ],
    totalDuration: 56,
  },
  {
    id: "guide-4",
    candidateName: "David Kim",
    jobTitle: "Senior Backend Engineer",
    generatedDate: "Mar 25, 2026",
    openingContext:
      "David is a backend specialist with 5 years of experience building high-throughput distributed systems in Go and Python. At his current company, he architected a microservices platform handling 50K requests per second. He is known for his pragmatic approach to system design and strong testing practices.",
    strengths: [
      "Strong distributed systems experience with Go and Python",
      "Architected systems handling 50K+ RPS with 99.99% uptime",
      "Excellent testing practices - advocate for TDD and integration testing",
      "Experience with Kubernetes, Docker, and cloud-native infrastructure",
      "Active open-source contributor with well-maintained personal projects",
    ],
    gaps: [
      "No experience with event-driven architectures (Kafka, RabbitMQ)",
      "Limited database experience beyond PostgreSQL",
      "Resume does not mention GraphQL or API design patterns",
      "No explicit experience with observability tooling (Datadog, Grafana)",
    ],
    questions: [
      { number: 1, category: "Architecture", question: "Describe the microservices platform you built. What were the key architectural decisions, and what would you change in hindsight?", timeMinutes: 10 },
      { number: 2, category: "Technical Depth", question: "How do you handle distributed transactions across multiple services? Walk me through a specific pattern you have used.", timeMinutes: 8 },
      { number: 3, category: "Performance", question: "Your system handles 50K RPS. Walk me through how you identified and resolved the most critical performance bottleneck.", timeMinutes: 8 },
      { number: 4, category: "Testing", question: "Describe your testing strategy for a distributed system. How do you test failure scenarios and edge cases?", timeMinutes: 7 },
      { number: 5, category: "Gap Probe", question: "We use Kafka extensively for event-driven communication. How would you approach learning and working with event streaming?", timeMinutes: 6 },
      { number: 6, category: "System Design", question: "Design a rate limiting service that works across multiple regions. Consider consistency and performance trade-offs.", timeMinutes: 10 },
      { number: 7, category: "Collaboration", question: "How do you approach API design when multiple teams depend on your service?", timeMinutes: 5 },
      { number: 8, category: "DevOps", question: "Walk me through your ideal CI/CD pipeline and deployment strategy for a critical backend service.", timeMinutes: 6 },
      { number: 9, category: "Gap Probe", question: "What observability tools and practices have you used? How do you approach debugging production issues?", timeMinutes: 5 },
      { number: 10, category: "Culture Fit", question: "How do you balance technical excellence with shipping speed? Give a real example of this tension.", timeMinutes: 5 },
    ],
    flags: [
      "Application mentions interest in transitioning to a staff engineer role - verify growth expectations align with the senior IC position",
    ],
    totalDuration: 70,
  },
];

const FEEDBACK_ENTRIES: InterviewFeedback[] = [
  {
    id: "fb-1",
    candidateName: "Aisha Mohammed",
    interviewerName: "Jordan Lee",
    interviewerRole: "VP of Engineering",
    jobTitle: "Engineering Manager",
    date: "Mar 24, 2026",
    criteria: [
      { name: "Technical Knowledge", rating: 4, notes: "Strong understanding of system architecture and technical trade-offs. Could articulate complex concepts clearly." },
      { name: "Leadership & People Management", rating: 5, notes: "Exceptional examples of team building, conflict resolution, and mentoring. Has grown teams from 4 to 15." },
      { name: "Strategic Thinking", rating: 4, notes: "Good at connecting technical decisions to business outcomes. Demonstrated strong product sense." },
      { name: "Communication", rating: 5, notes: "Articulate, concise, and empathetic. Great at adjusting communication style for different audiences." },
      { name: "Culture Fit", rating: 4, notes: "Values align well with our emphasis on transparency and ownership. Collaborative mindset." },
    ],
    decision: "advance",
    aiSynthesis:
      "Aisha is a strong engineering manager candidate who excels in people leadership and communication. Her track record of growing teams and establishing engineering culture aligns perfectly with the team's needs. Technical depth is solid for a management role. Recommend advancing to final round with CTO.",
    overallNotes: "One of the strongest EM candidates we have interviewed this quarter. Her experience scaling engineering teams at a similar-stage company is particularly relevant.",
  },
  {
    id: "fb-2",
    candidateName: "Aisha Mohammed",
    interviewerName: "Amaan Shahana",
    interviewerRole: "Head of Product",
    jobTitle: "Engineering Manager",
    date: "Mar 24, 2026",
    criteria: [
      { name: "Product Sense", rating: 5, notes: "Excellent understanding of product-engineering collaboration. Has experience with product-led growth." },
      { name: "Stakeholder Management", rating: 4, notes: "Demonstrated ability to manage competing priorities across multiple stakeholders." },
      { name: "Process & Delivery", rating: 4, notes: "Strong on agile practices. Has implemented sprint planning improvements that reduced cycle time by 30%." },
      { name: "Cross-functional Collaboration", rating: 5, notes: "Exceptional at bridging design, product, and engineering. Several examples of breaking down silos." },
      { name: "Growth Mindset", rating: 4, notes: "Actively seeks feedback and learning opportunities. Mentioned several recent leadership courses." },
    ],
    decision: "advance",
    aiSynthesis:
      "From a product partnership perspective, Aisha demonstrates the collaborative leadership style we need. Her experience with product-led growth and cross-functional alignment would strengthen our product-engineering interface significantly.",
    overallNotes: "Very impressed with her cross-functional experience. She would be a strong partner for the product team.",
  },
  {
    id: "fb-3",
    candidateName: "Sarah Chen",
    interviewerName: "Alex Rivera",
    interviewerRole: "Staff Frontend Engineer",
    jobTitle: "Senior Frontend Engineer",
    date: "Mar 22, 2026",
    criteria: [
      { name: "React/TypeScript Expertise", rating: 5, notes: "Deep knowledge of React internals, hooks patterns, and TypeScript generics. Solved the live coding challenge elegantly." },
      { name: "System Design", rating: 4, notes: "Good architectural thinking. Proposed a clean component composition pattern for the design system question." },
      { name: "Performance Optimization", rating: 4, notes: "Solid understanding of React rendering optimization, virtualization, and bundle splitting." },
      { name: "Code Quality", rating: 5, notes: "Clean, readable code with thoughtful naming. Strong testing instincts." },
      { name: "Problem Solving", rating: 4, notes: "Methodical debugger. Identified the root cause of the tricky async race condition quickly." },
    ],
    decision: "advance",
    aiSynthesis:
      "Sarah's technical depth in React and TypeScript is impressive, with scores consistently at or above our hiring bar. Her practical experience with design systems and performance optimization directly maps to our current initiatives. Strong recommend for the next round.",
    overallNotes: "Top performer in the technical interview. Her approach to the design system architecture question was particularly insightful.",
  },
  {
    id: "fb-4",
    candidateName: "Marcus Johnson",
    interviewerName: "Jordan Lee",
    interviewerRole: "VP of Engineering",
    jobTitle: "Senior Product Designer",
    date: "Mar 21, 2026",
    criteria: [
      { name: "Design Process", rating: 4, notes: "Structured and data-driven process. Clear articulation of design rationale." },
      { name: "Visual Design", rating: 5, notes: "Portfolio showcases exceptional visual craft. Strong typography and layout skills." },
      { name: "User Research", rating: 4, notes: "Good research methodology. Has conducted both qualitative and quantitative studies." },
      { name: "Design Systems", rating: 3, notes: "Built a system from scratch but at smaller scale. Needs to demonstrate ability to work within a large existing system." },
      { name: "Collaboration", rating: 4, notes: "Good examples of working with engineers. Uses Figma effectively for handoff." },
    ],
    decision: "advance",
    aiSynthesis:
      "Marcus shows strong individual design skills and a data-informed approach. The design systems gap at scale is notable but manageable with mentorship. His visual design strength and research skills are assets we need on the team.",
    overallNotes: "Strong designer with room to grow on systems thinking at scale. Portfolio review was impressive.",
  },
  {
    id: "fb-5",
    candidateName: "Tom Bradley",
    interviewerName: "Priya Sharma",
    interviewerRole: "QA Director",
    jobTitle: "QA Lead",
    date: "Mar 20, 2026",
    criteria: [
      { name: "Test Strategy", rating: 3, notes: "Has experience with test planning but approach felt somewhat traditional. Limited automation experience." },
      { name: "Automation Skills", rating: 2, notes: "Primarily manual testing background. Mentioned Selenium but struggled with automation architecture questions." },
      { name: "Leadership", rating: 3, notes: "Has managed a small QA team but examples lacked depth in process improvement." },
      { name: "CI/CD Integration", rating: 2, notes: "Limited experience integrating testing into CI/CD pipelines. Mostly relied on separate QA environments." },
      { name: "Communication", rating: 4, notes: "Clear communicator. Good at explaining testing rationale to non-technical stakeholders." },
    ],
    decision: "reject",
    aiSynthesis:
      "Tom's experience is more heavily weighted toward manual testing, which does not align with our automation-first QA culture. While his communication skills are strong, the technical gaps in automation and CI/CD integration are significant for a lead-level position.",
    overallNotes: "Not the right fit for our current needs. We need someone who can drive our test automation strategy forward.",
  },
  {
    id: "fb-6",
    candidateName: "Elena Volkov",
    interviewerName: "Ravi Patel",
    interviewerRole: "Staff ML Engineer",
    jobTitle: "Staff Data Scientist",
    date: "Mar 19, 2026",
    criteria: [
      { name: "ML Fundamentals", rating: 5, notes: "PhD-level understanding. Could discuss model architectures, loss functions, and optimization in depth." },
      { name: "Production ML", rating: 4, notes: "Good experience with ML pipelines. Some gaps in real-time serving but has the foundation to learn." },
      { name: "Coding Proficiency", rating: 4, notes: "Clean Python code. Comfortable with NumPy, Pandas, and PyTorch. Could benefit from more software engineering rigor." },
      { name: "Research Application", rating: 5, notes: "Exceptional ability to translate research papers into practical solutions. Several examples of novel approaches." },
      { name: "System Thinking", rating: 4, notes: "Good end-to-end thinking. Considered data quality, monitoring, and model lifecycle in answers." },
    ],
    decision: "advance",
    aiSynthesis:
      "Elena is a rare combination of deep ML research expertise and practical production experience. Her ability to bridge research and engineering is exactly what we need for our ML platform evolution. The real-time inference gap is addressable given her strong foundation.",
    overallNotes: "Highly recommend. Her research background combined with production experience is the profile we have been looking for.",
  },
  {
    id: "fb-7",
    candidateName: "David Kim",
    interviewerName: "Alex Rivera",
    interviewerRole: "Staff Frontend Engineer",
    jobTitle: "Senior Backend Engineer",
    date: "Mar 18, 2026",
    criteria: [
      { name: "System Design", rating: 4, notes: "Strong distributed systems thinking. The rate limiter design was well thought out with clear trade-off analysis." },
      { name: "Go Proficiency", rating: 5, notes: "Excellent Go skills. Clean, idiomatic code. Deep understanding of concurrency primitives." },
      { name: "Testing", rating: 5, notes: "Outstanding testing practices. TDD approach produced clean, testable code. Great integration test strategy." },
      { name: "API Design", rating: 3, notes: "Functional but not exceptional. Could improve on API versioning and documentation practices." },
      { name: "Problem Solving", rating: 4, notes: "Methodical approach. Good at breaking down complex problems into smaller, manageable pieces." },
    ],
    decision: "hold",
    aiSynthesis:
      "David is technically strong, particularly in Go and distributed systems. However, his API design skills need development for a senior role where he would own public-facing APIs. Recommend a follow-up focused on API design and system integration before making a final decision.",
    overallNotes: "Strong technically but want to probe deeper on API design and event-driven architecture experience before advancing.",
  },
  {
    id: "fb-8",
    candidateName: "Sarah Chen",
    interviewerName: "Priya Sharma",
    interviewerRole: "QA Director",
    jobTitle: "Senior Frontend Engineer",
    date: "Mar 22, 2026",
    criteria: [
      { name: "Accessibility Knowledge", rating: 5, notes: "WCAG certified. Demonstrated deep knowledge of ARIA patterns and keyboard navigation." },
      { name: "Testing Practices", rating: 4, notes: "Good unit and integration testing. Uses Testing Library effectively. Could improve on E2E coverage." },
      { name: "Cross-browser Compatibility", rating: 4, notes: "Aware of common gotchas. Has experience with polyfills and progressive enhancement." },
      { name: "Performance Awareness", rating: 4, notes: "Good understanding of Core Web Vitals and how to measure and optimize them." },
      { name: "Documentation", rating: 5, notes: "Thorough component documentation approach. Advocates for Storybook and living style guides." },
    ],
    decision: "advance",
    aiSynthesis:
      "Sarah's accessibility expertise is a standout strength that would immediately elevate our product quality. Combined with strong testing practices and documentation habits, she demonstrates the engineering maturity we look for in senior hires.",
    overallNotes: "Her accessibility expertise alone makes her valuable. Combined with overall frontend strength, she is a clear advance.",
  },
];

/* -------------------------------------------------------------------------- */
/*  HELPER COMPONENTS                                                         */
/* -------------------------------------------------------------------------- */

const TYPE_CONFIG: Record<InterviewType, { label: string; bg: string; text: string }> = {
  technical: { label: "Technical", bg: "bg-blue-50", text: "text-blue-700" },
  culture: { label: "Culture Fit", bg: "bg-green-50", text: "text-green-700" },
  portfolio: { label: "Portfolio Review", bg: "bg-amber-50", text: "text-amber-700" },
  system_design: { label: "System Design", bg: "bg-purple-50", text: "text-purple-700" },
  final: { label: "Final Round", bg: "bg-red-50", text: "text-red-700" },
};

const STATUS_CONFIG: Record<InterviewStatus, { label: string; bg: string; text: string; dot: string }> = {
  confirmed: { label: "Confirmed", bg: "bg-[var(--success-50)]", text: "text-[var(--success-600)]", dot: "bg-[var(--success-600)]" },
  pending: { label: "Pending", bg: "bg-[var(--warning-50)]", text: "text-[var(--warning-600)]", dot: "bg-[var(--warning-600)]" },
  completed: { label: "Completed", bg: "bg-blue-50", text: "text-[var(--brand-600)]", dot: "bg-[var(--brand-600)]" },
  cancelled: { label: "Cancelled", bg: "bg-red-50", text: "text-[var(--error-600)]", dot: "bg-[var(--error-600)]" },
};

const DECISION_CONFIG: Record<FeedbackDecision, { label: string; bg: string; text: string }> = {
  advance: { label: "Advance", bg: "bg-[var(--success-50)]", text: "text-[var(--success-600)]" },
  hold: { label: "Hold", bg: "bg-[var(--warning-50)]", text: "text-[var(--warning-600)]" },
  reject: { label: "Reject", bg: "bg-red-50", text: "text-[var(--error-600)]" },
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  Architecture: { bg: "bg-blue-50", text: "text-blue-700" },
  "Technical Depth": { bg: "bg-indigo-50", text: "text-indigo-700" },
  Migration: { bg: "bg-cyan-50", text: "text-cyan-700" },
  Accessibility: { bg: "bg-teal-50", text: "text-teal-700" },
  Collaboration: { bg: "bg-green-50", text: "text-green-700" },
  "Problem Solving": { bg: "bg-amber-50", text: "text-amber-700" },
  "System Design": { bg: "bg-purple-50", text: "text-purple-700" },
  Leadership: { bg: "bg-rose-50", text: "text-rose-700" },
  "Gap Probe": { bg: "bg-orange-50", text: "text-orange-700" },
  "Culture Fit": { bg: "bg-emerald-50", text: "text-emerald-700" },
  "Design Process": { bg: "bg-blue-50", text: "text-blue-700" },
  "Design Systems": { bg: "bg-violet-50", text: "text-violet-700" },
  "Data-Driven": { bg: "bg-cyan-50", text: "text-cyan-700" },
  "Scale Challenge": { bg: "bg-indigo-50", text: "text-indigo-700" },
  "Portfolio Deep Dive": { bg: "bg-pink-50", text: "text-pink-700" },
  "Visual Design": { bg: "bg-fuchsia-50", text: "text-fuchsia-700" },
  "Stakeholder Mgmt": { bg: "bg-amber-50", text: "text-amber-700" },
  "Cross-Platform": { bg: "bg-teal-50", text: "text-teal-700" },
  "ML Systems": { bg: "bg-blue-50", text: "text-blue-700" },
  "Research to Prod": { bg: "bg-purple-50", text: "text-purple-700" },
  Scale: { bg: "bg-indigo-50", text: "text-indigo-700" },
  Ethics: { bg: "bg-rose-50", text: "text-rose-700" },
  Performance: { bg: "bg-orange-50", text: "text-orange-700" },
  Testing: { bg: "bg-lime-50", text: "text-lime-700" },
  DevOps: { bg: "bg-slate-100", text: "text-slate-700" },
  "Research Application": { bg: "bg-violet-50", text: "text-violet-700" },
};

function getCategoryColor(category: string) {
  return CATEGORY_COLORS[category] ?? { bg: "bg-gray-50", text: "text-gray-700" };
}

function RatingDots({ rating }: { rating: number }) {
  const color =
    rating >= 4
      ? "var(--success-600)"
      : rating === 3
        ? "var(--warning-600)"
        : "var(--error-600)";

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="w-2.5 h-2.5 rounded-full transition-colors"
          style={{
            backgroundColor: i <= rating ? color : "var(--gray-200)",
          }}
        />
      ))}
      <span
        className="ml-1.5 text-xs font-semibold"
        style={{ color }}
      >
        {rating}/5
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  SCHEDULED TAB                                                             */
/* -------------------------------------------------------------------------- */

function ScheduledTab({
  onReschedule,
}: {
  onReschedule: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      {SCHEDULED_INTERVIEWS.map((interview) => {
        const typeConf = TYPE_CONFIG[interview.type];
        const statusConf = STATUS_CONFIG[interview.status];

        return (
          <div
            key={interview.id}
            className="bg-white rounded-xl p-6 border border-[var(--gray-200)] hover:shadow-[var(--shadow-sm)] transition-shadow"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
              {/* Left: candidate info */}
              <div className="flex items-center gap-3 lg:w-[220px] shrink-0">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0"
                  style={{ backgroundColor: interview.candidateColor }}
                >
                  {interview.candidateInitials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[var(--gray-900)] truncate">
                    {interview.candidateName}
                  </p>
                  <p className="text-xs text-[var(--gray-500)] truncate">
                    {interview.role}
                  </p>
                </div>
              </div>

              {/* Center: details */}
              <div className="flex flex-wrap items-center gap-3 flex-1 min-w-0">
                <span className="text-sm font-medium text-[var(--gray-700)]">
                  {interview.jobTitle}
                </span>

                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${typeConf.bg} ${typeConf.text}`}
                >
                  {typeConf.label}
                </span>

                <span className="flex items-center gap-1.5 text-xs text-[var(--gray-500)]">
                  <Calendar size={13} />
                  {interview.date}
                </span>

                <span className="flex items-center gap-1.5 text-xs text-[var(--gray-500)]">
                  <Clock size={13} />
                  {interview.time}
                </span>
              </div>

              {/* Right: interviewers + status + actions */}
              <div className="flex items-center gap-4 shrink-0">
                {/* Interviewer avatars */}
                <div className="flex items-center -space-x-2">
                  {interview.interviewers.slice(0, 3).map((interviewer, idx) => (
                    <div
                      key={idx}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-semibold border-2 border-white"
                      style={{ backgroundColor: interviewer.color, zIndex: 3 - idx }}
                      title={interviewer.name}
                    >
                      {interviewer.initials}
                    </div>
                  ))}
                  {interview.interviewers.length > 3 && (
                    <div className="w-7 h-7 rounded-full flex items-center justify-center bg-[var(--gray-100)] text-[10px] font-semibold text-[var(--gray-600)] border-2 border-white">
                      +{interview.interviewers.length - 3}
                    </div>
                  )}
                </div>

                {/* Status badge */}
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusConf.bg} ${statusConf.text}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${statusConf.dot}`} />
                  {statusConf.label}
                </span>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {interview.status !== "cancelled" && interview.status !== "completed" && (
                    <button
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--brand-600)] hover:text-[var(--brand-700)] transition-colors"
                      onClick={() => {
                        window.open("about:blank", "_blank");
                        toast.success(`Joining meeting for ${interview.candidateName}...`);
                      }}
                    >
                      <Video size={14} />
                      Join
                      <ExternalLink size={12} />
                    </button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[var(--gray-500)] hover:text-[var(--gray-700)]"
                    onClick={() => onReschedule(interview.id)}
                  >
                    Reschedule
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  GUIDES TAB                                                                */
/* -------------------------------------------------------------------------- */

function MissingGuidesSection() {
  const guideNames = new Set(INTERVIEW_GUIDES.map((g) => g.candidateName));
  const missing = SCHEDULED_INTERVIEWS.filter(
    (iv) => !guideNames.has(iv.candidateName)
  );

  const [generatingIds, setGeneratingIds] = useState<Set<string>>(new Set());
  const [generatedIds, setGeneratedIds] = useState<Set<string>>(new Set());

  const handleGenerate = (iv: ScheduledInterview) => {
    setGeneratingIds((prev) => new Set(prev).add(iv.id));
    setTimeout(() => {
      setGeneratingIds((prev) => {
        const next = new Set(prev);
        next.delete(iv.id);
        return next;
      });
      setGeneratedIds((prev) => new Set(prev).add(iv.id));
      toast.success(`Interview guide generated for ${iv.candidateName}`);
    }, 2000);
  };

  if (missing.length === 0) return null;

  return (
    <div className="mt-6 space-y-3">
      <h4 className="text-xs font-semibold uppercase tracking-wide text-[var(--gray-500)]">
        Guides Not Yet Generated
      </h4>
      {missing.map((iv) => {
        const isGenerating = generatingIds.has(iv.id);
        const isGenerated = generatedIds.has(iv.id);

        return (
          <div
            key={iv.id}
            className="bg-white rounded-xl border border-[var(--gray-200)] p-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0"
                style={{ backgroundColor: iv.candidateColor }}
              >
                {iv.candidateInitials}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[var(--gray-900)] truncate">
                  {iv.candidateName}
                </p>
                <p className="text-xs text-[var(--gray-500)] truncate">
                  {iv.jobTitle}
                </p>
              </div>
            </div>
            {isGenerated ? (
              <Button
                disabled
                className="gap-2 bg-[var(--success-600)] text-white shrink-0 opacity-90"
              >
                <CheckCircle size={16} />
                Guide Ready
              </Button>
            ) : (
              <Button
                disabled={isGenerating}
                className="gap-2 bg-[var(--brand-600)] hover:bg-[var(--brand-700)] text-white shrink-0"
                onClick={() => handleGenerate(iv)}
              >
                {isGenerating ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Sparkles size={16} />
                )}
                {isGenerating ? "Generating..." : "Generate Guide"}
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}

function GuidesTab() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {INTERVIEW_GUIDES.map((guide) => {
        const isExpanded = expandedIds.has(guide.id);

        return (
          <div
            key={guide.id}
            className="bg-white rounded-xl border border-[var(--gray-200)] overflow-hidden hover:shadow-[var(--shadow-sm)] transition-shadow"
          >
            {/* Header */}
            <button
              className="w-full flex items-center justify-between p-6 text-left hover:bg-[var(--gray-25)] transition-colors"
              onClick={() => toggle(guide.id)}
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 rounded-full bg-[var(--brand-50)] flex items-center justify-center shrink-0">
                  <Briefcase size={18} className="text-[var(--brand-600)]" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-[var(--gray-900)]">
                      {guide.candidateName}
                    </span>
                    <span className="text-sm text-[var(--gray-500)]">
                      {guide.jobTitle}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--gray-400)] mt-0.5">
                    Generated {guide.generatedDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 ml-4">
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--brand-50)] text-[var(--brand-600)]">
                  <Sparkles size={12} />
                  AI Generated
                </span>
                {isExpanded ? (
                  <ChevronUp size={18} className="text-[var(--gray-400)]" />
                ) : (
                  <ChevronDown size={18} className="text-[var(--gray-400)]" />
                )}
              </div>
            </button>

            {/* Expanded content */}
            {isExpanded && (
              <div className="px-6 pb-6 space-y-6 border-t border-[var(--gray-100)]">
                {/* Opening Context */}
                <div className="mt-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-[var(--gray-500)] mb-3">
                    Opening Context
                  </h4>
                  <div className="rounded-lg bg-[var(--brand-50)] border-l-4 border-[var(--brand-200)] p-4">
                    <p className="text-sm text-[var(--gray-700)] leading-relaxed">
                      {guide.openingContext}
                    </p>
                  </div>
                </div>

                {/* Strengths + Gaps in 2 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-[var(--success-600)] mb-3">
                      Strengths to Validate
                    </h4>
                    <ul className="space-y-2">
                      {guide.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle
                            size={16}
                            className="text-[var(--success-600)] shrink-0 mt-0.5"
                          />
                          <span className="text-sm text-[var(--gray-700)] leading-relaxed">
                            {s}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Gaps */}
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-[var(--warning-600)] mb-3">
                      Gaps to Probe
                    </h4>
                    <ul className="space-y-2">
                      {guide.gaps.map((g, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <AlertCircle
                            size={16}
                            className="text-[var(--warning-600)] shrink-0 mt-0.5"
                          />
                          <span className="text-sm text-[var(--gray-700)] leading-relaxed">
                            {g}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Suggested Questions */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-[var(--gray-500)]">
                      Suggested Questions
                    </h4>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[var(--brand-50)] text-[var(--brand-600)]">
                      <Clock size={12} />
                      {guide.totalDuration} min total
                    </span>
                  </div>
                  <div className="space-y-3">
                    {guide.questions.map((q) => {
                      const catColor = getCategoryColor(q.category);
                      return (
                        <div
                          key={q.number}
                          className="flex items-start gap-3 p-3 rounded-lg bg-[var(--gray-50)] hover:bg-[var(--gray-100)] transition-colors"
                        >
                          <span className="w-6 h-6 rounded-full bg-[var(--brand-600)] text-white text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                            {q.number}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${catColor.bg} ${catColor.text}`}
                              >
                                {q.category}
                              </span>
                              <span className="flex items-center gap-1 text-[10px] text-[var(--gray-400)]">
                                <Clock size={10} />
                                {q.timeMinutes} min
                              </span>
                            </div>
                            <p className="text-sm text-[var(--gray-700)] leading-relaxed">
                              {q.question}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Flags to Verify */}
                {guide.flags.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-[var(--error-600)] mb-3">
                      Flags to Verify
                    </h4>
                    <ul className="space-y-2">
                      {guide.flags.map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Flag
                            size={16}
                            className="text-[var(--error-600)] shrink-0 mt-0.5"
                          />
                          <span className="text-sm text-[var(--gray-700)] leading-relaxed">
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* Candidates with scheduled interviews but no guide yet */}
      <MissingGuidesSection />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  FEEDBACK TAB                                                              */
/* -------------------------------------------------------------------------- */

function FeedbackTab() {
  return (
    <div className="flex flex-col gap-6">
      {FEEDBACK_ENTRIES.map((fb) => {
        const decisionConf = DECISION_CONFIG[fb.decision];

        return (
          <div
            key={fb.id}
            className="bg-white rounded-xl p-6 border border-[var(--gray-200)] hover:shadow-[var(--shadow-sm)] transition-shadow"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--gray-100)] flex items-center justify-center shrink-0">
                  <User size={18} className="text-[var(--gray-500)]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--gray-900)]">
                    {fb.candidateName}
                  </p>
                  <p className="text-xs text-[var(--gray-500)] mt-0.5">
                    {fb.jobTitle}
                  </p>
                  <p className="text-xs text-[var(--gray-400)] mt-0.5">
                    Interviewed by{" "}
                    <span className="font-medium text-[var(--gray-600)]">
                      {fb.interviewerName}
                    </span>{" "}
                    ({fb.interviewerRole}) &middot; {fb.date}
                  </p>
                </div>
              </div>

              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${decisionConf.bg} ${decisionConf.text} shrink-0`}
              >
                {fb.decision === "advance" && <CheckCircle size={13} />}
                {fb.decision === "hold" && <AlertCircle size={13} />}
                {fb.decision === "reject" && <Flag size={13} />}
                {decisionConf.label}
              </span>
            </div>

            {/* Criteria ratings */}
            <div className="space-y-3 mb-5">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-[var(--gray-500)]">
                Evaluation Criteria
              </h4>
              <div className="space-y-3">
                {fb.criteria.map((c, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-[var(--gray-50)]"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                      <span className="text-sm font-medium text-[var(--gray-700)]">
                        {c.name}
                      </span>
                      <RatingDots rating={c.rating} />
                    </div>
                    <p className="text-xs text-[var(--gray-500)] leading-relaxed mt-1">
                      {c.notes}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Synthesis */}
            <div className="mb-5">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-[var(--gray-500)] mb-3">
                AI Synthesis
              </h4>
              <div className="rounded-lg bg-[var(--brand-50)] border-l-4 border-[var(--brand-200)] p-4">
                <div className="flex items-start gap-2">
                  <Sparkles size={16} className="text-[var(--brand-600)] shrink-0 mt-0.5" />
                  <p className="text-sm text-[var(--gray-700)] leading-relaxed">
                    {fb.aiSynthesis}
                  </p>
                </div>
              </div>
            </div>

            {/* Overall notes */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-[var(--gray-500)] mb-2">
                Overall Notes
              </h4>
              <p className="text-sm text-[var(--gray-600)] leading-relaxed">
                {fb.overallNotes}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  MAIN PAGE                                                                 */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*  MOCK OPTIONS FOR SCHEDULE FORM                                            */
/* -------------------------------------------------------------------------- */

const MOCK_CANDIDATES = [
  "Sarah Chen",
  "Marcus Johnson",
  "Elena Volkov",
  "David Kim",
  "Aisha Mohammed",
  "Tom Bradley",
];

const MOCK_JOBS = [
  "Senior Frontend Engineer",
  "Senior Product Designer",
  "Staff Data Scientist",
  "Senior Backend Engineer",
  "Engineering Manager",
  "QA Lead",
];

const INTERVIEW_TYPE_OPTIONS = [
  { value: "technical", label: "Technical" },
  { value: "culture", label: "Culture Fit" },
  { value: "portfolio", label: "Portfolio Review" },
  { value: "system_design", label: "System Design" },
  { value: "final", label: "Final Round" },
];

const DURATION_OPTIONS = [
  { value: "30", label: "30 minutes" },
  { value: "45", label: "45 minutes" },
  { value: "60", label: "60 minutes" },
  { value: "90", label: "90 minutes" },
];

/* -------------------------------------------------------------------------- */
/*  MAIN PAGE                                                                 */
/* -------------------------------------------------------------------------- */

export default function InterviewsPage() {
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [rescheduleInterview, setRescheduleInterview] = useState<string | null>(null);

  /* Schedule form state */
  const [schedCandidate, setSchedCandidate] = useState("");
  const [schedJob, setSchedJob] = useState("");
  const [schedType, setSchedType] = useState("");
  const [schedDate, setSchedDate] = useState("");
  const [schedTime, setSchedTime] = useState("");
  const [schedDuration, setSchedDuration] = useState("");
  const [schedInterviewers, setSchedInterviewers] = useState("");

  /* Reschedule form state */
  const [reschedDate, setReschedDate] = useState("");
  const [reschedTime, setReschedTime] = useState("");
  const [reschedReason, setReschedReason] = useState("");

  const rescheduleData = rescheduleInterview
    ? SCHEDULED_INTERVIEWS.find((iv) => iv.id === rescheduleInterview)
    : null;

  const resetScheduleForm = () => {
    setSchedCandidate("");
    setSchedJob("");
    setSchedType("");
    setSchedDate("");
    setSchedTime("");
    setSchedDuration("");
    setSchedInterviewers("");
  };

  const resetRescheduleForm = () => {
    setReschedDate("");
    setReschedTime("");
    setReschedReason("");
  };

  return (
    <div className="p-8">
      <Header
        title="Interviews"
        breadcrumbs={[{ label: "Interviews" }]}
      />

      <div className="mt-8 space-y-8">
        {/* AI Insights Banner */}
        <div className="bg-[var(--brand-50)] rounded-xl p-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            {/* Left: icon + text */}
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <Sparkles size={20} className="text-[var(--brand-600)]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-[var(--gray-900)]">
                    Interview Insights
                  </h3>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[var(--brand-600)] text-white">
                    ARIA Powered
                  </span>
                </div>
                <p className="text-sm text-[var(--gray-600)] leading-relaxed">
                  6 interviews scheduled this week. ARIA has generated personalized interview guides
                  for 4 candidates. 2 feedback forms pending submission.
                </p>
              </div>
            </div>

            {/* Right: stat cards */}
            <div className="flex items-center gap-4 shrink-0">
              <div className="text-center px-4 py-2 rounded-lg bg-white/70">
                <p className="text-xl font-bold text-[var(--brand-600)]">6</p>
                <p className="text-[10px] font-medium text-[var(--gray-500)] uppercase tracking-wide">
                  This Week
                </p>
              </div>
              <div className="text-center px-4 py-2 rounded-lg bg-white/70">
                <p className="text-xl font-bold text-[var(--success-600)]">4</p>
                <p className="text-[10px] font-medium text-[var(--gray-500)] uppercase tracking-wide">
                  Guides Ready
                </p>
              </div>
              <div className="text-center px-4 py-2 rounded-lg bg-white/70">
                <p className="text-xl font-bold text-[var(--warning-600)]">2</p>
                <p className="text-[10px] font-medium text-[var(--gray-500)] uppercase tracking-wide">
                  Pending Feedback
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--gray-900)]">
              Interviews
            </h2>
            <p className="text-sm text-[var(--gray-500)] mt-1">
              Schedule, prepare and evaluate candidate interviews
            </p>
          </div>
          <Button
            className="bg-[var(--brand-600)] hover:bg-[var(--brand-700)] text-white shrink-0"
            onClick={() => setScheduleOpen(true)}
          >
            <Plus size={16} />
            Schedule Interview
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="scheduled">
          <TabsList>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="scheduled" className="mt-6">
            <ScheduledTab onReschedule={(id) => setRescheduleInterview(id)} />
          </TabsContent>

          <TabsContent value="guides" className="mt-6">
            <GuidesTab />
          </TabsContent>

          <TabsContent value="feedback" className="mt-6">
            <FeedbackTab />
          </TabsContent>
        </Tabs>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/*  SCHEDULE INTERVIEW DIALOG                                          */}
      {/* ------------------------------------------------------------------ */}
      <Dialog
        open={scheduleOpen}
        onOpenChange={(open) => {
          setScheduleOpen(open);
          if (!open) resetScheduleForm();
        }}
      >
        <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Schedule Interview</DialogTitle>
            <DialogDescription>
              Fill in the details to schedule a new interview.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Candidate */}
            <div className="grid gap-2">
              <Label htmlFor="sched-candidate">Candidate Name</Label>
              <Select value={schedCandidate} onValueChange={setSchedCandidate}>
                <SelectTrigger id="sched-candidate">
                  <SelectValue placeholder="Select a candidate" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_CANDIDATES.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Job */}
            <div className="grid gap-2">
              <Label htmlFor="sched-job">Job</Label>
              <Select value={schedJob} onValueChange={setSchedJob}>
                <SelectTrigger id="sched-job">
                  <SelectValue placeholder="Select a job" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_JOBS.map((job) => (
                    <SelectItem key={job} value={job}>
                      {job}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Interview Type */}
            <div className="grid gap-2">
              <Label htmlFor="sched-type">Interview Type</Label>
              <Select value={schedType} onValueChange={setSchedType}>
                <SelectTrigger id="sched-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {INTERVIEW_TYPE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date & Time row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="sched-date">Date</Label>
                <Input
                  id="sched-date"
                  type="date"
                  value={schedDate}
                  onChange={(e) => setSchedDate(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sched-time">Time</Label>
                <Input
                  id="sched-time"
                  type="time"
                  value={schedTime}
                  onChange={(e) => setSchedTime(e.target.value)}
                />
              </div>
            </div>

            {/* Duration */}
            <div className="grid gap-2">
              <Label htmlFor="sched-duration">Duration</Label>
              <Select value={schedDuration} onValueChange={setSchedDuration}>
                <SelectTrigger id="sched-duration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {DURATION_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Interviewers */}
            <div className="grid gap-2">
              <Label htmlFor="sched-interviewers">Interviewer(s)</Label>
              <Input
                id="sched-interviewers"
                placeholder="e.g. Alex Rivera, Priya Sharma"
                value={schedInterviewers}
                onChange={(e) => setSchedInterviewers(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Separate multiple names with commas
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setScheduleOpen(false);
                resetScheduleForm();
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-[var(--brand-600)] hover:bg-[var(--brand-700)] text-white"
              onClick={() => {
                toast.success("Interview scheduled");
                setScheduleOpen(false);
                resetScheduleForm();
              }}
            >
              Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ------------------------------------------------------------------ */}
      {/*  RESCHEDULE INTERVIEW DIALOG                                        */}
      {/* ------------------------------------------------------------------ */}
      <Dialog
        open={rescheduleInterview !== null}
        onOpenChange={(open) => {
          if (!open) {
            setRescheduleInterview(null);
            resetRescheduleForm();
          }
        }}
      >
        <DialogContent className="sm:max-w-[440px]">
          <DialogHeader>
            <DialogTitle>
              Reschedule Interview with {rescheduleData?.candidateName}
            </DialogTitle>
            <DialogDescription>
              Choose a new date and time for this interview.
            </DialogDescription>
          </DialogHeader>

          {rescheduleData && (
            <div className="grid gap-4 py-4">
              {/* Current schedule reference */}
              <div className="rounded-lg bg-[var(--gray-50)] p-3 space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--gray-500)]">
                  Current Schedule
                </p>
                <p className="text-sm text-[var(--gray-700)]">
                  {rescheduleData.date} &middot; {rescheduleData.time}
                </p>
              </div>

              {/* New Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="resched-date">New Date</Label>
                  <Input
                    id="resched-date"
                    type="date"
                    value={reschedDate}
                    onChange={(e) => setReschedDate(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="resched-time">New Time</Label>
                  <Input
                    id="resched-time"
                    type="time"
                    value={reschedTime}
                    onChange={(e) => setReschedTime(e.target.value)}
                  />
                </div>
              </div>

              {/* Reason */}
              <div className="grid gap-2">
                <Label htmlFor="resched-reason">
                  Reason for reschedule{" "}
                  <span className="text-muted-foreground font-normal">(optional)</span>
                </Label>
                <Textarea
                  id="resched-reason"
                  placeholder="e.g. Interviewer conflict, candidate request..."
                  value={reschedReason}
                  onChange={(e) => setReschedReason(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setRescheduleInterview(null);
                resetRescheduleForm();
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-[var(--brand-600)] hover:bg-[var(--brand-700)] text-white"
              onClick={() => {
                toast.success(
                  `Interview with ${rescheduleData?.candidateName} rescheduled`
                );
                setRescheduleInterview(null);
                resetRescheduleForm();
              }}
            >
              Confirm Reschedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
