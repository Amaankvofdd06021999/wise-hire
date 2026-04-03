"use client";

import { useState, useMemo } from "react";
import type { Candidate, CandidateStage } from "@/lib/types";
import { PIPELINE_STAGES } from "@/lib/constants";
import { mockCandidates } from "@/lib/mock-data";
import { KanbanColumn } from "./kanban-column";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function KanbanBoard() {
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [activeStage, setActiveStage] = useState<CandidateStage>("applied");

  const candidatesByStage = useMemo(() => {
    const map = new Map<CandidateStage, Candidate[]>();
    for (const stage of PIPELINE_STAGES) {
      map.set(stage.key, []);
    }
    for (const c of candidates) {
      const list = map.get(c.stage);
      if (list) {
        list.push(c);
      }
    }
    return map;
  }, [candidates]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const destStage = destination.droppableId as CandidateStage;
    const sourceStage = source.droppableId as CandidateStage;
    const stageName = PIPELINE_STAGES.find((s) => s.key === destStage)?.name ?? destStage;

    setCandidates((prev) =>
      prev.map((c) =>
        c.id === draggableId ? { ...c, stage: destStage, daysInStage: 0 } : c,
      ),
    );

    const candidateName = candidates.find((c) => c.id === draggableId)?.name ?? "Candidate";
    toast.success(`Moved ${candidateName} to ${stageName}`);
  };

  return (
    <div>
      {/* Mobile: tab bar */}
      <div className="flex md:hidden overflow-x-auto gap-1 pb-3 border-b border-[var(--gray-200)] mb-3">
        {PIPELINE_STAGES.map((stage) => (
          <Button
            key={stage.key}
            variant={activeStage === stage.key ? "default" : "ghost"}
            size="sm"
            className="shrink-0 text-xs"
            onClick={() => setActiveStage(stage.key)}
          >
            {stage.name} ({candidatesByStage.get(stage.key)?.length ?? 0})
          </Button>
        ))}
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        {/* Desktop: horizontal scroll */}
        <div className="hidden md:flex gap-3 overflow-x-auto pb-4">
          {PIPELINE_STAGES.map((stage, index) => (
            <KanbanColumn
              key={stage.key}
              stage={stage}
              candidates={candidatesByStage.get(stage.key) ?? []}
              index={index}
            />
          ))}
        </div>

        {/* Mobile: single column */}
        <div className="md:hidden">
          {PIPELINE_STAGES.filter((s) => s.key === activeStage).map((stage, index) => (
            <KanbanColumn
              key={stage.key}
              stage={stage}
              candidates={candidatesByStage.get(stage.key) ?? []}
              index={index}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
