import type { Candidate } from "@/lib/types";
import { AiContentZone } from "@/components/shared/ai-content-zone";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";

interface FitTabProps {
  candidate: Candidate;
}

const statusConfig: Record<string, { icon: React.ReactNode; color: string }> = {
  met: {
    icon: <CheckCircle size={16} />,
    color: "var(--success-500)",
  },
  partial: {
    icon: <AlertCircle size={16} />,
    color: "var(--warning-500)",
  },
  not_met: {
    icon: <XCircle size={16} />,
    color: "var(--error-500)",
  },
};

export function FitTab({ candidate }: FitTabProps) {
  const { fitAssessment } = candidate;
  const mustHaves = fitAssessment.requirements.filter((r) => r.isRequired);
  const niceToHaves = fitAssessment.requirements.filter((r) => !r.isRequired);

  return (
    <div className="space-y-6">
      {/* Requirements table */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold" style={{ color: "var(--gray-900)" }}>
          Requirements Assessment
        </h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Criterion</TableHead>
              <TableHead className="w-24">Status</TableHead>
              <TableHead>Evidence</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mustHaves.length > 0 && (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "var(--gray-500)", backgroundColor: "var(--gray-50)" }}
                >
                  Required
                </TableCell>
              </TableRow>
            )}
            {mustHaves.map((req, i) => {
              const status = statusConfig[req.status];
              return (
                <TableRow key={`must-${i}`}>
                  <TableCell className="text-sm" style={{ color: "var(--gray-700)" }}>
                    {req.criterion}
                  </TableCell>
                  <TableCell>
                    <span style={{ color: status.color }}>{status.icon}</span>
                  </TableCell>
                  <TableCell className="text-sm" style={{ color: "var(--gray-600)" }}>
                    {req.evidence}
                  </TableCell>
                </TableRow>
              );
            })}
            {niceToHaves.length > 0 && (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "var(--gray-500)", backgroundColor: "var(--gray-50)" }}
                >
                  Nice to Have
                </TableCell>
              </TableRow>
            )}
            {niceToHaves.map((req, i) => {
              const status = statusConfig[req.status];
              return (
                <TableRow key={`nice-${i}`}>
                  <TableCell className="text-sm" style={{ color: "var(--gray-700)" }}>
                    {req.criterion}
                  </TableCell>
                  <TableCell>
                    <span style={{ color: status.color }}>{status.icon}</span>
                  </TableCell>
                  <TableCell className="text-sm" style={{ color: "var(--gray-600)" }}>
                    {req.evidence}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* AI recommendation */}
      <AiContentZone>
        <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--gray-900)" }}>
          AI Recommendation
        </h3>
        <p className="text-sm" style={{ color: "var(--gray-700)" }}>
          {fitAssessment.aiRecommendation}
        </p>
      </AiContentZone>

      {/* Bias check */}
      {fitAssessment.biasCheckPassed ? (
        <div
          className="flex items-start gap-3 rounded-xl border p-4"
          style={{
            backgroundColor: "var(--success-50)",
            borderColor: "var(--success-200)",
          }}
        >
          <CheckCircle size={18} className="shrink-0 mt-0.5" style={{ color: "var(--success-600)" }} />
          <p className="text-sm" style={{ color: "var(--success-700)" }}>
            Evaluation criteria applied consistently with all candidates for this role
          </p>
        </div>
      ) : (
        <div className="rounded-xl p-4 border" style={{ backgroundColor: "var(--warning-50)", borderColor: "var(--warning-100)" }}>
          <div className="flex items-center gap-2">
            <AlertCircle size={16} style={{ color: "var(--warning-600)" }} />
            <span className="text-sm font-medium" style={{ color: "var(--warning-700)" }}>Bias Check: Review Recommended</span>
          </div>
          <p className="text-xs mt-1" style={{ color: "var(--warning-600)" }}>Potential scoring inconsistencies detected. Manual review recommended before advancing.</p>
        </div>
      )}
    </div>
  );
}
