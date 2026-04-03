"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ScreeningWeights } from "./screening-weights";
import { X, Plus } from "lucide-react";
import type { Skill } from "@/lib/types";

interface JobData {
  title: string;
  summary: string;
  responsibilities: string[];
  mustHaves: string[];
  niceToHaves: string[];
  salaryRange: { min: number; max: number; currency: string };
}

interface JdEditorProps {
  jobData: JobData;
  onUpdate: (data: JobData) => void;
  weights: {
    portfolio: number;
    experience: number;
    skills: number;
    culture: number;
  };
  onWeightsChange: (weights: JdEditorProps["weights"]) => void;
  skills: Skill[];
  onSkillsChange: (skills: Skill[]) => void;
}

type EditingSection =
  | "title"
  | "summary"
  | "responsibilities"
  | "mustHaves"
  | "niceToHaves"
  | null;

export function JdEditor({
  jobData,
  onUpdate,
  weights,
  onWeightsChange,
  skills,
  onSkillsChange,
}: JdEditorProps) {
  const [editingSection, setEditingSection] = useState<EditingSection>(null);
  const [newSkill, setNewSkill] = useState("");

  function handleAddSkill() {
    const trimmed = newSkill.trim();
    if (!trimmed) return;
    if (skills.some((s) => s.name.toLowerCase() === trimmed.toLowerCase()))
      return;
    onSkillsChange([
      ...skills,
      { name: trimmed, matched: "full", required: false },
    ]);
    setNewSkill("");
  }

  function handleRemoveSkill(name: string) {
    onSkillsChange(skills.filter((s) => s.name !== name));
  }

  function renderEditableSection(
    sectionKey: EditingSection & string,
    heading: string,
    content: string | string[]
  ) {
    const isEditing = editingSection === sectionKey;
    const displayText = Array.isArray(content)
      ? content.join("\n")
      : content;

    return (
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-[var(--gray-900)]">
          {heading}
        </h3>
        {isEditing ? (
          <Textarea
            value={displayText}
            onChange={(e) => {
              const val = e.target.value;
              if (Array.isArray(content)) {
                const lines = val.split("\n").filter((l) => l.trim());
                onUpdate({
                  ...jobData,
                  [sectionKey]: lines,
                });
              } else {
                onUpdate({ ...jobData, [sectionKey]: val });
              }
            }}
            onBlur={() => setEditingSection(null)}
            className="min-h-[100px]"
            autoFocus
          />
        ) : (
          <div
            className="cursor-pointer rounded-md p-3 text-sm text-[var(--gray-700)] hover:bg-[var(--gray-50)] transition-colors border border-transparent hover:border-[var(--gray-200)]"
            onClick={() => setEditingSection(sectionKey)}
          >
            {Array.isArray(content) ? (
              <ul className="list-disc list-inside space-y-1">
                {content.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>{content || "Click to edit..."}</p>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: Content area */}
      <div className="lg:col-span-2 space-y-6">
        {renderEditableSection("title", "Job Title", jobData.title)}
        {renderEditableSection("summary", "Summary", jobData.summary)}
        {renderEditableSection(
          "responsibilities",
          "Responsibilities",
          jobData.responsibilities
        )}
        {renderEditableSection(
          "mustHaves",
          "Must-Have Requirements",
          jobData.mustHaves
        )}
        {renderEditableSection(
          "niceToHaves",
          "Nice-to-Have Requirements",
          jobData.niceToHaves
        )}
      </div>

      {/* Right: Sidebar */}
      <div className="space-y-6">
        {/* Screening Weights */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-[var(--gray-900)]">
            Screening Weights
          </Label>
          <ScreeningWeights weights={weights} onChange={onWeightsChange} />
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-[var(--gray-900)]">
            Skills
          </Label>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill.name}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {skill.name}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill.name)}
                  className="ml-1 text-[var(--gray-500)] hover:text-[var(--gray-700)]"
                >
                  <X size={12} />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add skill..."
              className="text-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="shrink-0 p-2 rounded-md text-[var(--gray-500)] hover:bg-[var(--gray-100)] transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
