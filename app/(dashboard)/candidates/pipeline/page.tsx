"use client";

import { Header } from "@/components/layout/header";
import { KanbanBoard } from "@/components/candidates/kanban-board";

export default function PipelinePage() {
  return (
    <div className="p-8">
      <Header
        title="Pipeline"
        breadcrumbs={[
          { label: "Candidates", href: "/candidates" },
          { label: "Pipeline" },
        ]}
      />
      <div className="mt-6">
        <KanbanBoard />
      </div>
    </div>
  );
}
