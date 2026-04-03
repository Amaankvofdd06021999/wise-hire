"use client";

import Link from "next/link";
import { toast } from "sonner";
import type { Job } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Building2,
  MapPin,
  Sparkles,
  BarChart3,
  ExternalLink,
  Send,
} from "lucide-react";

interface JobCardProps {
  job: Job;
}

const statusConfig: Record<
  Job["status"],
  { label: string; bg: string; text: string }
> = {
  active: {
    label: "Active",
    bg: "var(--success-50)",
    text: "var(--success-700)",
  },
  draft: {
    label: "Draft",
    bg: "#FEF3C7",
    text: "#92400E",
  },
  closed: {
    label: "Closed",
    bg: "var(--gray-100)",
    text: "var(--gray-600)",
  },
};

function formatPostedDate(dateString: string): string {
  const posted = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - posted.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  }
  const months = Math.floor(diffDays / 30);
  return months === 1 ? "1 month ago" : `${months} months ago`;
}

export function JobCard({ job }: JobCardProps) {
  const status = statusConfig[job.status];

  return (
    <div
      className="rounded-xl p-6 bg-white transition-all duration-200 flex flex-col"
      style={{
        boxShadow: "var(--shadow-sm)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = "var(--shadow-md, 0 4px 12px rgba(0,0,0,0.1))";
        el.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = "var(--shadow-sm)";
        el.style.transform = "translateY(0)";
      }}
    >
      {/* Top: Title + AI Badge + Status */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-2 min-w-0 flex-1">
          <Link
            href={`/jobs/${job.id}`}
            className="text-lg font-semibold text-[var(--gray-900)] leading-tight hover:text-[var(--brand-600)] transition-colors truncate"
          >
            {job.title}
          </Link>
          {job.description && job.description.summary && job.description.summary.length > 100 && (
            <span
              className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium shrink-0 mt-0.5"
              style={{
                backgroundColor: "var(--brand-50)",
                color: "var(--brand-600)",
              }}
            >
              <Sparkles size={12} />
              AI Generated
            </span>
          )}
        </div>
        <span
          className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold shrink-0"
          style={{ backgroundColor: status.bg, color: status.text }}
        >
          {status.label}
        </span>
      </div>

      {/* Info row: department + location */}
      <div className="flex items-center gap-4 mb-4">
        <span className="flex items-center gap-1.5 text-sm text-[var(--gray-600)]">
          <Building2 size={14} className="text-[var(--gray-400)]" />
          {job.department}
        </span>
        <span className="flex items-center gap-1.5 text-sm text-[var(--gray-600)]">
          <MapPin size={14} className="text-[var(--gray-400)]" />
          {job.location}
        </span>
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-4">
          <span className="text-sm text-[var(--gray-500)]">
            Openings:{" "}
            <span className="font-medium text-[var(--gray-700)]">
              {job.status === "active" ? 2 : 1}
            </span>
          </span>
          <span className="text-sm text-[var(--gray-500)]">
            Posted {formatPostedDate(job.createdAt)}
          </span>
        </div>
        <span
          className="text-sm font-semibold"
          style={{ color: "var(--brand-600)" }}
        >
          Applicants: {job.applicantsCount}
        </span>
      </div>

      {/* Bottom: Action buttons */}
      <div className="mt-auto pt-4 border-t border-[var(--gray-100)]">
        {job.status === "draft" ? (
          <Button
            className="w-full gap-2 text-sm font-medium"
            style={{
              backgroundColor: "var(--brand-600)",
              color: "white",
            }}
            onClick={() => toast.success("Job published successfully")}
          >
            <Send size={14} />
            Publish
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 gap-1.5 text-sm text-[var(--gray-600)] hover:text-[var(--gray-900)]"
              asChild
            >
              <Link href={`/jobs/${job.id}`}>
                <BarChart3 size={14} />
                Analytics
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 gap-1.5 text-sm text-[var(--gray-600)] hover:text-[var(--gray-900)]"
              asChild
            >
              <Link href={`/jobs/${job.id}`}>
                <ExternalLink size={14} />
                View Details
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
