"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { ChevronDown, ChevronRight, Play } from "lucide-react";
import { screeningBatches as initialBatches } from "@/lib/mock-data";
import { ScoreBadge } from "@/components/shared/score-badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ScreeningBatch, ScoreTier } from "@/lib/types";

function StatusBadge({ status }: { status: ScreeningBatch["status"] }) {
  const styles: Record<ScreeningBatch["status"], string> = {
    processing: "bg-amber-100 text-amber-700",
    complete: "bg-green-100 text-green-700",
    failed: "bg-red-100 text-red-700",
  };
  const labels: Record<ScreeningBatch["status"], string> = {
    processing: "Processing",
    complete: "Complete",
    failed: "Failed",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

function formatDate(iso: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDuration(ms: number): string {
  if (!ms) return "—";
  const secs = Math.floor(ms / 1000);
  const mins = Math.floor(secs / 60);
  const remaining = secs % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${remaining}s`;
}

const MOCK_NEW_RESULTS: ScreeningBatch["results"] = [
  { candidateId: "new-1", candidateName: "Jordan Blake", score: 88, verdict: "strong" as ScoreTier, flags: [] },
  { candidateId: "new-2", candidateName: "Morgan Lee", score: 73, verdict: "good" as ScoreTier, flags: [] },
  { candidateId: "new-3", candidateName: "Casey Kim", score: 48, verdict: "review" as ScoreTier, flags: ["high_ai_content"] },
];

export function ScreeningQueue() {
  const [batches, setBatches] = useState<ScreeningBatch[]>(initialBatches);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  function toggleExpand(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function handleRunScreening() {
    const newBatch: ScreeningBatch = {
      id: `batch-${Date.now()}`,
      jobId: "new",
      jobTitle: "New Screening Run",
      candidateCount: 3,
      status: "processing",
      startedAt: new Date().toISOString(),
      durationMs: 0,
      results: [],
    };

    setBatches((prev) => [newBatch, ...prev]);

    setTimeout(() => {
      setBatches((prev) =>
        prev.map((b) =>
          b.id === newBatch.id
            ? {
                ...b,
                status: "complete",
                durationMs: 3000,
                results: MOCK_NEW_RESULTS,
              }
            : b
        )
      );
      toast.success("Screening complete");
    }, 3000);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--gray-500)]">
          {batches.length} screening batch{batches.length !== 1 ? "es" : ""}
        </p>
        <Button onClick={handleRunScreening} className="gap-2">
          <Play size={14} />
          Run Screening
        </Button>
      </div>

      <div className="rounded-xl border border-[var(--gray-200)] overflow-hidden bg-white" style={{ boxShadow: "var(--shadow-sm)" }}>
        <Table>
          <TableHeader>
            <TableRow className="bg-[var(--gray-50)]">
              <TableHead className="w-8" />
              <TableHead>Job</TableHead>
              <TableHead>Candidates</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Started</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {batches.map((batch) => {
              const isExpanded = expandedIds.has(batch.id);
              return (
                <React.Fragment key={batch.id}>
                  <TableRow
                    className="cursor-pointer hover:bg-[var(--gray-50)]"
                    onClick={() => toggleExpand(batch.id)}
                  >
                    <TableCell className="py-3 px-3">
                      {isExpanded ? (
                        <ChevronDown size={16} className="text-[var(--gray-400)]" />
                      ) : (
                        <ChevronRight size={16} className="text-[var(--gray-400)]" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium text-[var(--gray-900)] py-3">
                      <span className="text-[var(--brand-600)] hover:underline">
                        {batch.jobTitle}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 text-[var(--gray-700)]">
                      {batch.candidateCount}
                    </TableCell>
                    <TableCell className="py-3">
                      <StatusBadge status={batch.status} />
                    </TableCell>
                    <TableCell className="py-3 text-[var(--gray-600)] text-sm">
                      {formatDate(batch.startedAt)}
                    </TableCell>
                    <TableCell className="py-3 text-[var(--gray-600)] text-sm">
                      {formatDuration(batch.durationMs)}
                    </TableCell>
                    <TableCell className="py-3" onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>

                  {isExpanded && (
                    <TableRow key={`${batch.id}-expanded`} className="bg-[var(--gray-50)]">
                      <TableCell colSpan={7} className="py-0 px-0">
                        <div className="px-6 py-4">
                          {batch.results.length === 0 ? (
                            <p className="text-sm text-[var(--gray-500)] italic">
                              No results yet — screening in progress.
                            </p>
                          ) : (
                            <div className="rounded-md border border-[var(--gray-200)] overflow-hidden bg-white">
                              <Table>
                                <TableHeader>
                                  <TableRow className="bg-[var(--gray-100)]">
                                    <TableHead className="text-xs py-2">Name</TableHead>
                                    <TableHead className="text-xs py-2">Score</TableHead>
                                    <TableHead className="text-xs py-2">Verdict</TableHead>
                                    <TableHead className="text-xs py-2">Flags</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {batch.results.map((result) => (
                                    <TableRow key={result.candidateId}>
                                      <TableCell className="py-2 text-sm font-medium text-[var(--gray-900)]">
                                        {result.candidateName}
                                      </TableCell>
                                      <TableCell className="py-2">
                                        <ScoreBadge score={result.score} size="sm" />
                                      </TableCell>
                                      <TableCell className="py-2 text-sm text-[var(--gray-600)] capitalize">
                                        {result.verdict.replace("_", " ")}
                                      </TableCell>
                                      <TableCell className="py-2">
                                        <div className="flex flex-wrap gap-1">
                                          {result.flags.length === 0 ? (
                                            <span className="text-xs text-[var(--gray-400)]">—</span>
                                          ) : (
                                            result.flags.map((flag) => (
                                              <span
                                                key={flag}
                                                className="inline-flex items-center rounded-full bg-amber-100 text-amber-700 px-2 py-0.5 text-xs font-medium"
                                              >
                                                {flag.replace(/_/g, " ")}
                                              </span>
                                            ))
                                          )}
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
