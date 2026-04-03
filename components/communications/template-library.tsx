"use client";

import { useState } from "react";
import { toast } from "sonner";
import { emailTemplates } from "@/lib/mock-data";
import type { EmailTemplate } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type TemplateCategory = EmailTemplate["category"] | "all";

const TEMPLATE_CATEGORIES: EmailTemplate["category"][] = [
  "acknowledgment",
  "shortlist",
  "assessment_invite",
  "rejection",
  "interview",
  "offer",
];

const categoryConfig: Record<
  EmailTemplate["category"],
  { label: string; bg: string; text: string }
> = {
  acknowledgment: {
    label: "Acknowledgment",
    bg: "var(--brand-50)",
    text: "var(--brand-700)",
  },
  shortlist: {
    label: "Shortlist",
    bg: "var(--success-50)",
    text: "var(--success-700)",
  },
  assessment_invite: {
    label: "Assessment",
    bg: "var(--brand-50)",
    text: "var(--brand-600)",
  },
  rejection: {
    label: "Rejection",
    bg: "var(--error-50)",
    text: "var(--error-700)",
  },
  interview: {
    label: "Interview",
    bg: "var(--warning-50)",
    text: "var(--warning-700)",
  },
  offer: {
    label: "Offer",
    bg: "var(--success-50)",
    text: "var(--success-700)",
  },
};

function CategoryBadge({ category }: { category: EmailTemplate["category"] }) {
  const config = categoryConfig[category];
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      {config.label}
    </span>
  );
}

interface EditState {
  subject: string;
  body: string;
}

export function TemplateLibrary() {
  const [templates, setTemplates] = useState<EmailTemplate[]>(emailTemplates);
  const [activeCategory, setActiveCategory] = useState<TemplateCategory>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<EditState>({ subject: "", body: "" });

  const filteredTemplates =
    activeCategory === "all"
      ? templates
      : templates.filter((t) => t.category === activeCategory);

  function handleUse(template: EmailTemplate) {
    // In a real app this would copy to compose; here we show a toast
    navigator.clipboard
      .writeText(`Subject: ${template.subject}\n\n${template.body}`)
      .catch(() => {});
    toast.success("Template copied to compose");
  }

  function handleEditStart(template: EmailTemplate) {
    setEditingId(template.id);
    setEditValues({ subject: template.subject, body: template.body });
  }

  function handleEditSave(id: string) {
    setTemplates((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, subject: editValues.subject, body: editValues.body }
          : t
      )
    );
    setEditingId(null);
    toast.success("Template saved");
  }

  function handleEditCancel() {
    setEditingId(null);
  }

  return (
    <div className="space-y-5">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory("all")}
          className={cn(
            "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
            activeCategory === "all"
              ? "bg-[var(--brand-50)] text-[var(--brand-700)]"
              : "text-[var(--gray-500)] hover:text-[var(--gray-700)] hover:bg-[var(--gray-50)]"
          )}
        >
          All
        </button>
        {TEMPLATE_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-3 py-1.5 rounded-md text-sm font-medium transition-colors capitalize",
              activeCategory === cat
                ? "bg-[var(--brand-50)] text-[var(--brand-700)]"
                : "text-[var(--gray-500)] hover:text-[var(--gray-700)] hover:bg-[var(--gray-50)]"
            )}
          >
            {categoryConfig[cat].label}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => {
          const isEditing = editingId === template.id;
          return (
            <div
              key={template.id}
              className="border border-[var(--gray-200)] rounded-xl p-5 flex flex-col gap-3 bg-white hover:border-[var(--gray-300)] transition-all card-hover"
              style={{ boxShadow: "var(--shadow-sm)" }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-sm text-[var(--gray-900)] leading-snug">
                  {template.title}
                </h3>
                <CategoryBadge category={template.category} />
              </div>

              {isEditing ? (
                /* Edit Mode */
                <div className="flex flex-col gap-3 flex-1">
                  <div>
                    <label className="text-xs font-medium text-[var(--gray-600)] mb-1 block">
                      Subject
                    </label>
                    <Input
                      value={editValues.subject}
                      onChange={(e) =>
                        setEditValues((v) => ({ ...v, subject: e.target.value }))
                      }
                      className="text-xs"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-medium text-[var(--gray-600)] mb-1 block">
                      Body
                    </label>
                    <Textarea
                      value={editValues.body}
                      onChange={(e) =>
                        setEditValues((v) => ({ ...v, body: e.target.value }))
                      }
                      className="text-xs resize-none"
                      rows={6}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleEditSave(template.id)}
                      className="text-xs"
                      style={{ backgroundColor: "var(--brand-600)", color: "white" }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleEditCancel}
                      className="text-xs text-[var(--gray-600)]"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                /* View Mode */
                <>
                  <div>
                    <p className="text-sm text-[var(--gray-600)] leading-snug">
                      {template.subject}
                    </p>
                  </div>
                  <p className="text-xs text-[var(--gray-500)] leading-relaxed line-clamp-3 flex-1">
                    {template.body}
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUse(template)}
                      className="text-xs"
                      style={{
                        color: "var(--brand-600)",
                        borderColor: "var(--brand-200)",
                      }}
                    >
                      Use
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditStart(template)}
                      className="text-xs text-[var(--gray-500)] hover:text-[var(--gray-700)]"
                    >
                      Edit
                    </Button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12 text-sm text-[var(--gray-500)]">
          No templates found for this category.
        </div>
      )}
    </div>
  );
}
