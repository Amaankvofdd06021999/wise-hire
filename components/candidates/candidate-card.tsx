"use client";

import Link from "next/link";
import type { Candidate } from "@/lib/types";
import { formatRelativeDate } from "@/lib/utils";
import { StageBadge } from "@/components/shared/stage-badge";
import {
  Brain,
  ArrowRight,
  Sparkles,
  Mail,
  MapPin,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CandidateCardProps {
  candidate: Candidate;
  onAiAnalysis?: (candidate: Candidate) => void;
  onSendEmail?: (candidateId: string) => void;
}

function getInitials(name: string): string {
  const parts = name.split(" ");
  const first = parts[0]?.[0] ?? "";
  const last = parts[parts.length - 1]?.[0] ?? "";
  return (first + last).toUpperCase();
}

// Deterministic color palette for avatar backgrounds
const AVATAR_COLORS = [
  { bg: "var(--brand-100)", text: "var(--brand-700)" },
  { bg: "var(--success-50)", text: "var(--success-700)" },
  { bg: "var(--warning-50)", text: "var(--warning-700)" },
  { bg: "#E0E7FF", text: "#3730A3" },
  { bg: "#FCE7F3", text: "#9D174D" },
  { bg: "#CCFBF1", text: "#115E59" },
];

function getAvatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export function CandidateCard({ candidate, onAiAnalysis, onSendEmail }: CandidateCardProps) {
  const avatarColor = getAvatarColor(candidate.name);

  return (
    <div
      className="rounded-xl p-6 bg-white border border-[var(--gray-200)] transition-all duration-200 hover:-translate-y-0.5"
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      {/* Top: Avatar + Name + Role */}
      <Link href={`/candidates/${candidate.id}`} className="block">
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
            style={{
              backgroundColor: avatarColor.bg,
              color: avatarColor.text,
            }}
          >
            {getInitials(candidate.name)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="text-base font-semibold truncate text-[var(--gray-900)]">
                {candidate.name}
              </p>
              {candidate.hasAiContentFlag && (
                <AlertTriangle
                  size={14}
                  className="shrink-0"
                  style={{ color: "var(--error-500)" }}
                />
              )}
            </div>
            <p className="text-sm truncate text-[var(--gray-500)]">
              {candidate.currentRole} at {candidate.currentCompany}
            </p>
          </div>
        </div>
      </Link>

      {/* Middle: Stage badge + Match score */}
      <div className="mt-4 flex items-center justify-between">
        <StageBadge stage={candidate.stage} />
        <div className="flex items-center gap-1.5">
          <Sparkles size={14} style={{ color: "var(--brand-600)" }} />
          <span
            className="text-sm font-semibold"
            style={{ color: "var(--brand-600)" }}
          >
            {candidate.aiScore}% Match
          </span>
        </div>
      </div>

      {/* Contact info */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2">
          <Mail size={14} className="shrink-0 text-[var(--gray-400)]" />
          <span className="text-sm text-[var(--gray-500)] truncate">
            {candidate.email}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={14} className="shrink-0 text-[var(--gray-400)]" />
          <span className="text-sm text-[var(--gray-500)]">
            {candidate.location}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={14} className="shrink-0 text-[var(--gray-400)]" />
          <span className="text-sm text-[var(--gray-500)]">
            Applied {formatRelativeDate(candidate.appliedDate)}
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-5 flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 text-[var(--gray-600)] hover:text-[var(--brand-600)] hover:bg-[var(--brand-50)]"
          onClick={(e) => {
            e.preventDefault();
            onAiAnalysis?.(candidate);
          }}
        >
          <Brain size={15} className="mr-1.5" />
          AI Analysis
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 text-[var(--gray-600)] hover:text-[var(--brand-600)] hover:bg-[var(--brand-50)]"
          asChild
        >
          <Link href={`/candidates/${candidate.id}`}>
            <ArrowRight size={15} className="mr-1.5" />
            View Profile
          </Link>
        </Button>
      </div>
      <Button
        size="sm"
        className="w-full mt-2 text-white"
        style={{ backgroundColor: "var(--brand-600)" }}
        onClick={() => {
          if (onSendEmail) {
            onSendEmail(candidate.id);
          } else {
            toast.success("AI email drafted for " + candidate.name);
          }
        }}
      >
        <Sparkles size={15} className="mr-1.5" />
        Send AI Email
      </Button>
    </div>
  );
}
