"use client";

import { useState } from "react";
import type { Candidate } from "@/lib/types";
import { ScoreRing } from "@/components/shared/score-ring";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Info } from "lucide-react";

interface AiContentTabProps {
  candidate: Candidate;
}

export function AiContentTab({ candidate }: AiContentTabProps) {
  const { aiContentAnalysis } = candidate;
  const [overrideStatus, setOverrideStatus] = useState(aiContentAnalysis.overrideStatus);

  const handleOverride = (status: "acceptable" | "concern") => {
    setOverrideStatus(status);
    toast.success(
      status === "acceptable"
        ? "Marked as reviewed — acceptable"
        : "Marked as reviewed — concern",
    );
  };

  return (
    <div className="space-y-6">
      {/* Score ring */}
      <div className="flex items-center gap-6">
        <ScoreRing
          score={aiContentAnalysis.overallPercent}
          size={80}
          tierType="candidate"
          label="AI Content %"
        />
      </div>

      {/* Warning banner */}
      <div
        className="flex items-start gap-3 rounded-xl border p-4"
        style={{
          backgroundColor: "var(--warning-50)",
          borderColor: "var(--warning-200)",
        }}
      >
        <Info size={18} className="shrink-0 mt-0.5" style={{ color: "var(--warning-600)" }} />
        <p className="text-sm" style={{ color: "var(--warning-700)" }}>
          AI content detection is probabilistic. High scores indicate text patterns commonly associated
          with AI-generated content. Review flagged excerpts and use your judgment before making decisions.
        </p>
      </div>

      {/* Section breakdown */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold" style={{ color: "var(--gray-900)" }}>
          Section Breakdown
        </h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Section</TableHead>
              <TableHead className="text-right">Score %</TableHead>
              <TableHead className="text-right">Confidence %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {aiContentAnalysis.sections.map((section) => (
              <TableRow key={section.name}>
                <TableCell className="text-sm" style={{ color: "var(--gray-700)" }}>
                  {section.name}
                </TableCell>
                <TableCell className="text-right text-sm font-medium" style={{ color: "var(--gray-900)" }}>
                  {section.score}%
                </TableCell>
                <TableCell className="text-right text-sm" style={{ color: "var(--gray-500)" }}>
                  {section.confidence}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Flagged excerpts */}
      {aiContentAnalysis.flaggedExcerpts.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold" style={{ color: "var(--gray-900)" }}>
            Flagged Excerpts
          </h3>
          <div className="space-y-2">
            {aiContentAnalysis.flaggedExcerpts.map((excerpt, i) => (
              <div
                key={i}
                className="rounded-md p-3"
                style={{ backgroundColor: "var(--warning-50)" }}
              >
                <p className="text-sm italic" style={{ color: "var(--gray-700)" }}>
                  &ldquo;{excerpt.text}&rdquo;
                </p>
                <span
                  className="mt-2 inline-flex rounded-full px-2 py-0.5 text-xs font-medium"
                  style={{ backgroundColor: "var(--warning-100)", color: "var(--warning-700)" }}
                >
                  {excerpt.confidence}% confidence
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Override buttons */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold" style={{ color: "var(--gray-900)" }}>
          Review Override
        </h3>
        {overrideStatus && overrideStatus !== "pending" ? (
          <p className="text-sm" style={{ color: "var(--gray-600)" }}>
            Status: <span className="font-medium capitalize">{overrideStatus}</span>
          </p>
        ) : (
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              className="border-[var(--success-300)] text-[var(--success-700)] hover:bg-[var(--success-50)]"
              onClick={() => handleOverride("acceptable")}
            >
              Reviewed &mdash; Acceptable
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-[var(--error-300)] text-[var(--error-700)] hover:bg-[var(--error-50)]"
              onClick={() => handleOverride("concern")}
            >
              Reviewed &mdash; Concern
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
