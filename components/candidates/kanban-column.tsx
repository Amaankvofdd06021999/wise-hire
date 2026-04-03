import type { Candidate, CandidateStage } from "@/lib/types";
import { KanbanCard } from "./kanban-card";
import { Droppable } from "@hello-pangea/dnd";
import { ScrollArea } from "@/components/ui/scroll-area";

interface KanbanColumnProps {
  stage: { name: string; key: CandidateStage };
  candidates: Candidate[];
  index: number;
}

export function KanbanColumn({ stage, candidates, index }: KanbanColumnProps) {
  const hasSlaWarning = candidates.some((c) => c.daysInStage > 5);

  return (
    <div className="flex w-[280px] shrink-0 flex-col rounded-xl border border-[var(--gray-200)] bg-[var(--gray-50)]">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-[var(--gray-200)] px-3 py-2.5">
        <h3 className="text-sm font-semibold" style={{ color: "var(--gray-900)" }}>
          {stage.name}
        </h3>
        <span
          className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-xs font-medium"
          style={{ backgroundColor: "var(--gray-200)", color: "var(--gray-700)" }}
        >
          {candidates.length}
        </span>
        {hasSlaWarning && (
          <span
            className="inline-flex h-5 items-center rounded-full px-1.5 text-xs font-medium"
            style={{ backgroundColor: "var(--error-50)", color: "var(--error-700)" }}
          >
            SLA
          </span>
        )}
      </div>

      {/* Card list */}
      <Droppable droppableId={stage.key}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[120px] flex-1 p-2 transition-colors ${
              snapshot.isDraggingOver ? "bg-[var(--brand-50)]" : ""
            }`}
          >
            <ScrollArea className="max-h-[calc(100vh-16rem)]">
              <div className="flex flex-col gap-2">
                {candidates.map((candidate, idx) => (
                  <KanbanCard key={candidate.id} candidate={candidate} index={idx} />
                ))}
                {provided.placeholder}
              </div>
            </ScrollArea>
          </div>
        )}
      </Droppable>
    </div>
  );
}
