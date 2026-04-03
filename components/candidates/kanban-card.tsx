import type { Candidate } from "@/lib/types";
import { ScoreBadge } from "@/components/shared/score-badge";
import { AlertTriangle } from "lucide-react";
import { Draggable } from "@hello-pangea/dnd";

interface KanbanCardProps {
  candidate: Candidate;
  index: number;
}

export function KanbanCard({ candidate, index }: KanbanCardProps) {
  return (
    <Draggable draggableId={candidate.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`rounded-md border border-[var(--gray-200)] bg-white p-3 shadow-xs transition-shadow ${
            snapshot.isDragging ? "shadow-md" : ""
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium truncate" style={{ color: "var(--gray-900)" }}>
              {candidate.name}
            </p>
            <ScoreBadge score={candidate.aiScore} size="sm" showLabel={false} />
          </div>
          <p className="mt-0.5 text-xs truncate" style={{ color: "var(--gray-500)" }}>
            {candidate.currentRole}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs" style={{ color: "var(--gray-400)" }}>
              {candidate.daysInStage}d in stage
            </span>
            {candidate.hasAiContentFlag && (
              <AlertTriangle size={12} style={{ color: "var(--error-500)" }} />
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}
