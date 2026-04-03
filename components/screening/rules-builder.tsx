"use client";

import { useState } from "react";
import { toast } from "sonner";
import { GripVertical, Trash2, ArrowRight, Plus, Save } from "lucide-react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import { screeningRules as defaultRules } from "@/lib/mock-data";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import type { ScreeningRule, RuleType } from "@/lib/types";

interface RulesBuilderProps {
  rules?: ScreeningRule[];
  onChange?: (rules: ScreeningRule[]) => void;
  readOnly?: boolean;
}

const RULE_TYPE_STYLES: Record<RuleType, { bg: string; text: string; label: string }> = {
  hard_filter: { bg: "bg-red-100", text: "text-red-700", label: "Hard Filter" },
  auto_shortlist: { bg: "bg-green-100", text: "text-green-700", label: "Auto Shortlist" },
  auto_assessment: { bg: "bg-[var(--brand-100)]", text: "text-[var(--brand-700)]", label: "Auto Assessment" },
  ai_content_flag: { bg: "bg-amber-100", text: "text-amber-700", label: "AI Content Flag" },
  sla_alert: { bg: "bg-blue-100", text: "text-blue-700", label: "SLA Alert" },
};

const DEFAULT_NEW_RULE: Omit<ScreeningRule, "id"> = {
  type: "hard_filter",
  condition: "New condition",
  action: "New action",
  enabled: true,
};

export function RulesBuilder({ rules: externalRules, onChange, readOnly = false }: RulesBuilderProps) {
  const [internalRules, setInternalRules] = useState<ScreeningRule[]>(
    externalRules ?? defaultRules
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const rules = externalRules ?? internalRules;

  function updateRules(next: ScreeningRule[]) {
    setInternalRules(next);
    onChange?.(next);
  }

  function handleDragEnd(result: DropResult) {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.index === destination.index) return;

    const reordered = Array.from(rules);
    const [moved] = reordered.splice(source.index, 1);
    reordered.splice(destination.index, 0, moved);
    updateRules(reordered);
  }

  function toggleEnabled(id: string) {
    updateRules(rules.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)));
  }

  function handleDeleteRequest(id: string) {
    setDeletingId(id);
  }

  function handleDeleteConfirm(id: string) {
    updateRules(rules.filter((r) => r.id !== id));
    setDeletingId(null);
  }

  function handleDeleteCancel() {
    setDeletingId(null);
  }

  function handleAddRule() {
    const newRule: ScreeningRule = {
      ...DEFAULT_NEW_RULE,
      id: `rule-${Date.now()}`,
    };
    updateRules([...rules, newRule]);
  }

  function handleSave() {
    toast.success("Rules saved successfully");
  }

  return (
    <div className="space-y-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="rules-list">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-3"
            >
              {rules.map((rule, index) => {
                const typeStyle = RULE_TYPE_STYLES[rule.type];
                const isDeleting = deletingId === rule.id;

                return (
                  <Draggable
                    key={rule.id}
                    draggableId={rule.id}
                    index={index}
                    isDragDisabled={readOnly}
                  >
                    {(draggableProvided, snapshot) => (
                      <div
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        className={`flex items-start gap-3 border rounded-xl p-5 bg-white transition-shadow ${
                          snapshot.isDragging
                            ? "shadow-lg border-[var(--brand-300)]"
                            : "border-[var(--gray-200)] shadow-sm"
                        } ${!rule.enabled ? "opacity-60" : ""}`}
                      >
                        {/* Drag handle */}
                        {!readOnly && (
                          <div
                            {...draggableProvided.dragHandleProps}
                            className="mt-0.5 cursor-grab active:cursor-grabbing text-[var(--gray-400)] hover:text-[var(--gray-600)] shrink-0"
                            aria-label="Drag to reorder"
                          >
                            <GripVertical size={18} />
                          </div>
                        )}

                        {/* Main content */}
                        <div className="flex-1 min-w-0 space-y-2">
                          {/* Type badge */}
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${typeStyle.bg} ${typeStyle.text}`}
                          >
                            {typeStyle.label}
                          </span>

                          {/* Condition → Action */}
                          <div className="flex items-start gap-2 flex-wrap">
                            <span className="text-sm text-[var(--gray-700)] leading-snug">
                              {rule.condition}
                            </span>
                            <ArrowRight
                              size={14}
                              className="text-[var(--gray-400)] shrink-0 mt-0.5"
                            />
                            <span className="text-sm text-[var(--gray-600)] leading-snug">
                              {rule.action}
                            </span>
                          </div>
                        </div>

                        {/* Right controls */}
                        <div className="flex items-center gap-3 shrink-0 mt-0.5">
                          {/* Enabled toggle */}
                          <Switch
                            checked={rule.enabled}
                            onCheckedChange={() => !readOnly && toggleEnabled(rule.id)}
                            disabled={readOnly}
                            aria-label={`${rule.enabled ? "Disable" : "Enable"} rule`}
                          />

                          {/* Delete button */}
                          {!readOnly && (
                            isDeleting ? (
                              <div className="flex items-center gap-2 text-xs">
                                <span className="text-[var(--gray-600)]">Delete?</span>
                                <button
                                  onClick={() => handleDeleteConfirm(rule.id)}
                                  className="text-red-600 font-medium hover:underline"
                                >
                                  Yes
                                </button>
                                <button
                                  onClick={handleDeleteCancel}
                                  className="text-[var(--gray-500)] font-medium hover:underline"
                                >
                                  No
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleDeleteRequest(rule.id)}
                                className="text-[var(--gray-400)] hover:text-red-500 transition-colors"
                                aria-label="Delete rule"
                              >
                                <Trash2 size={16} />
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Footer actions */}
      {!readOnly && (
        <div className="flex items-center gap-3 pt-2">
          <Button variant="outline" onClick={handleAddRule} className="gap-2">
            <Plus size={14} />
            Add Rule
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save size={14} />
            Save Rules
          </Button>
        </div>
      )}
    </div>
  );
}
