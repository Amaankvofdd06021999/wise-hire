"use client";

import { useState } from "react";
import Link from "next/link";
import type { Candidate } from "@/lib/types";
import { formatRelativeDate } from "@/lib/utils";
import { ScoreBadge } from "@/components/shared/score-badge";
import { SkillTag } from "@/components/shared/skill-tag";
import { StageBadge } from "@/components/shared/stage-badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CandidateTableProps {
  candidates: Candidate[];
  selectedIds: string[];
  onSelectChange: (ids: string[]) => void;
}

type SortField = "name" | "score" | "date" | null;
type SortDir = "asc" | "desc";

function getInitials(name: string): string {
  const parts = name.split(" ");
  const first = parts[0]?.[0] ?? "";
  const last = parts[parts.length - 1]?.[0] ?? "";
  return (first + last).toUpperCase();
}

export function CandidateTable({
  candidates,
  selectedIds,
  onSelectChange,
}: CandidateTableProps) {
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const sorted = [...candidates].sort((a, b) => {
    if (!sortField) return 0;
    const dir = sortDir === "asc" ? 1 : -1;
    if (sortField === "name") return dir * a.name.localeCompare(b.name);
    if (sortField === "score") return dir * (a.aiScore - b.aiScore);
    if (sortField === "date")
      return dir * (new Date(a.appliedDate).getTime() - new Date(b.appliedDate).getTime());
    return 0;
  });

  const allSelected =
    candidates.length > 0 && candidates.every((c) => selectedIds.includes(c.id));

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set([...selectedIds, ...candidates.map((c) => c.id)]);
      onSelectChange(Array.from(allIds));
    } else {
      const candidateIds = new Set(candidates.map((c) => c.id));
      onSelectChange(selectedIds.filter((id) => !candidateIds.has(id)));
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      onSelectChange([...selectedIds, id]);
    } else {
      onSelectChange(selectedIds.filter((i) => i !== id));
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10">
            <Checkbox
              checked={allSelected}
              onCheckedChange={(checked) => handleSelectAll(checked === true)}
            />
          </TableHead>
          <TableHead>
            <button
              className="inline-flex items-center gap-1 hover:text-foreground"
              onClick={() => handleSort("name")}
            >
              Name <ArrowUpDown size={14} />
            </button>
          </TableHead>
          <TableHead>Role</TableHead>
          <TableHead>
            <button
              className="inline-flex items-center gap-1 hover:text-foreground"
              onClick={() => handleSort("score")}
            >
              Score <ArrowUpDown size={14} />
            </button>
          </TableHead>
          <TableHead>Stage</TableHead>
          <TableHead>
            <button
              className="inline-flex items-center gap-1 hover:text-foreground"
              onClick={() => handleSort("date")}
            >
              Applied <ArrowUpDown size={14} />
            </button>
          </TableHead>
          <TableHead>Skills</TableHead>
          <TableHead className="w-16">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted.map((candidate) => (
          <TableRow key={candidate.id}>
            <TableCell>
              <Checkbox
                checked={selectedIds.includes(candidate.id)}
                onCheckedChange={(checked) =>
                  handleSelectOne(candidate.id, checked === true)
                }
              />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: "var(--brand-100)",
                    color: "var(--brand-700)",
                  }}
                >
                  {getInitials(candidate.name)}
                </div>
                <span className="text-sm font-medium" style={{ color: "var(--gray-900)" }}>
                  {candidate.name}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <span className="text-sm" style={{ color: "var(--gray-600)" }}>
                {candidate.currentRole}
              </span>
            </TableCell>
            <TableCell>
              <ScoreBadge score={candidate.aiScore} size="sm" />
            </TableCell>
            <TableCell>
              <StageBadge stage={candidate.stage} />
            </TableCell>
            <TableCell>
              <span className="text-sm" style={{ color: "var(--gray-500)" }}>
                {formatRelativeDate(candidate.appliedDate)}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {candidate.skills.slice(0, 3).map((skill) => (
                  <SkillTag key={skill.name} name={skill.name} matched={skill.matched} />
                ))}
              </div>
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/candidates/${candidate.id}`}>
                  <Eye size={16} />
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
