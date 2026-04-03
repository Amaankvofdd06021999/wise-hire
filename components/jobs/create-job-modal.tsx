"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, Loader2, Plus } from "lucide-react";

interface CreateJobModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DEPARTMENTS = [
  "Engineering",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "HR",
  "Operations",
];

const LOCATIONS = [
  "San Francisco, CA",
  "New York, NY",
  "Austin, TX",
  "Remote",
  "London, UK",
];

const AI_GENERATED_JD = `About the Role
We are seeking a talented professional to join our growing team. In this role, you will be instrumental in driving key initiatives, collaborating cross-functionally, and delivering high-impact outcomes that directly contribute to our company's mission.

Key Responsibilities
• Lead end-to-end project execution from ideation through launch, ensuring timely delivery and quality standards
• Collaborate with cross-functional teams including engineering, design, and marketing to align on priorities and deliverables
• Analyze data and market trends to inform strategic decisions and identify growth opportunities
• Mentor and support junior team members, fostering a culture of continuous learning and excellence
• Present findings and recommendations to senior leadership, driving alignment on key initiatives

Requirements
• 5+ years of relevant experience in a fast-paced, high-growth environment
• Proven track record of delivering complex projects on time and within scope
• Strong analytical and problem-solving skills with a data-driven mindset
• Excellent communication and stakeholder management abilities
• Bachelor's degree in a relevant field; advanced degree preferred

Nice to Have
• Experience with AI/ML tools and emerging technologies
• Background in startup or scale-up environments
• Familiarity with agile methodologies and modern collaboration tools

What We Offer
• Competitive salary and equity package
• Comprehensive health, dental, and vision benefits
• Flexible work arrangements and generous PTO
• Professional development budget and learning opportunities
• A collaborative, inclusive team culture that values innovation`;

export function CreateJobModal({ open, onOpenChange }: CreateJobModalProps) {
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  function resetForm() {
    setTitle("");
    setDepartment("");
    setLocation("");
    setDescription("");
    setIsGenerating(false);
  }

  function handleGenerateAI() {
    setIsGenerating(true);
    setTimeout(() => {
      setDescription(AI_GENERATED_JD);
      setIsGenerating(false);
    }, 2000);
  }

  function handleCreate() {
    if (!title.trim() || !department || !location) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success("Job created successfully");
    resetForm();
    onOpenChange(false);
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) resetForm();
    onOpenChange(nextOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg"
              style={{
                backgroundColor: "var(--brand-50)",
              }}
            >
              <Sparkles
                size={18}
                style={{ color: "var(--brand-600)" }}
              />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold text-[var(--gray-900)]">
                Create New Job with AI
              </DialogTitle>
              <DialogDescription className="text-sm text-[var(--gray-500)]">
                Let ARIA help you create an optimized job description in seconds
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Job Title */}
          <div className="space-y-2">
            <Label
              htmlFor="job-title"
              className="text-sm font-medium text-[var(--gray-700)]"
            >
              Job Title <span className="text-[var(--error-500)]">*</span>
            </Label>
            <Input
              id="job-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Senior Product Manager"
              className="h-10"
            />
          </div>

          {/* Department + Location side by side */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[var(--gray-700)]">
                Department <span className="text-[var(--error-500)]">*</span>
              </Label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[var(--gray-700)]">
                Location <span className="text-[var(--error-500)]">*</span>
              </Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {LOCATIONS.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* AI Job Description Generator */}
          <div
            className="rounded-xl border p-4 space-y-3"
            style={{ borderColor: "var(--gray-200)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ backgroundColor: "var(--brand-50)" }}
              >
                <Sparkles size={16} style={{ color: "var(--brand-600)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--gray-900)]">
                  AI Job Description Generator
                </p>
                <p className="text-xs text-[var(--gray-500)]">
                  ARIA will create a compelling job description based on your
                  inputs
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className="gap-2 text-sm font-medium"
              style={{ color: "var(--brand-600)" }}
            >
              {isGenerating ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Generate with AI
                </>
              )}
            </Button>
          </div>

          {/* Job Description Textarea */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[var(--gray-700)]">
              Job Description
            </Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter job description or use AI to generate..."
              className="min-h-[160px] resize-y text-sm"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleCreate}
            className="gap-2"
            style={{
              backgroundColor: "var(--brand-600)",
              color: "white",
            }}
          >
            <Plus size={16} />
            Create Job
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
