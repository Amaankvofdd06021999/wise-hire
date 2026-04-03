"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JdEditor } from "./jd-editor";
import { mockJobs } from "@/lib/mock-data";
import { Check, Sparkles } from "lucide-react";
import type { Skill } from "@/lib/types";

interface FormData {
  intent: string;
  title: string;
  summary: string;
  responsibilities: string[];
  mustHaves: string[];
  niceToHaves: string[];
  salaryRange: { min: number; max: number; currency: string };
  screeningWeights: {
    portfolio: number;
    experience: number;
    skills: number;
    culture: number;
  };
  skills: Skill[];
  department: string;
  location: string;
  remotePolicy: "remote" | "hybrid" | "onsite";
  hiringManager: string;
  channels: string[];
  autoScreening: boolean;
}

const STEPS = [
  { number: 1, label: "Intent" },
  { number: 2, label: "Review" },
  { number: 3, label: "Config" },
  { number: 4, label: "Publish" },
];

const CHANNEL_OPTIONS = ["LinkedIn", "Naukri", "Indeed", "Career Page"];

const DEPARTMENTS = ["Design", "Engineering", "Product", "Marketing", "Sales", "HR"];
const LOCATIONS = ["Bangalore", "Mumbai", "Pune", "Toronto", "Remote", "Hyderabad", "Delhi", "Chennai"];
const HIRING_MANAGERS = ["Amaan Shahana", "Sarah Mitchell", "Raj Patel", "David Kim", "Vikram Mehta", "Priya Singh"];

export function JobCreationWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const seedJob = mockJobs[0];

  const [formData, setFormData] = useState<FormData>({
    intent: "",
    title: "",
    summary: "",
    responsibilities: [],
    mustHaves: [],
    niceToHaves: [],
    salaryRange: { min: 0, max: 0, currency: "INR" },
    screeningWeights: { portfolio: 25, experience: 25, skills: 25, culture: 25 },
    skills: [],
    department: "",
    location: "",
    remotePolicy: "hybrid",
    hiringManager: "",
    channels: [],
    autoScreening: true,
  });

  function handleGenerate() {
    setIsGenerating(true);
    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        title: seedJob.title,
        summary: seedJob.description.summary,
        responsibilities: seedJob.description.responsibilities,
        mustHaves: seedJob.description.mustHaves,
        niceToHaves: seedJob.description.niceToHaves,
        salaryRange: seedJob.salaryRange,
        screeningWeights: seedJob.screeningWeights,
        skills: seedJob.skills,
      }));
      setIsGenerating(false);
      setCurrentStep(2);
    }, 2000);
  }

  function validateStep3(): boolean {
    const newErrors: Record<string, string> = {};
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.location) newErrors.location = "Location is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleNext() {
    if (currentStep === 3 && !validateStep3()) return;
    setCurrentStep((s) => Math.min(s + 1, 4));
  }

  function handleBack() {
    setCurrentStep((s) => Math.max(s - 1, 1));
  }

  function handlePublish() {
    toast.success("Job published successfully");
    router.push("/jobs");
  }

  function handleSaveDraft() {
    toast.success("Job saved as draft");
    router.push("/jobs");
  }

  function toggleChannel(channel: string) {
    setFormData((prev) => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter((c) => c !== channel)
        : [...prev.channels, channel],
    }));
  }

  return (
    <div className="space-y-8">
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-0">
        {STEPS.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          return (
            <div key={step.number} className="flex items-center">
              {/* Step circle */}
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                    isCompleted
                      ? "bg-[var(--brand-600)] text-white"
                      : isCurrent
                        ? "bg-[var(--brand-600)] text-white"
                        : "border-2 border-[var(--gray-300)] text-[var(--gray-400)]"
                  }`}
                >
                  {isCompleted ? <Check size={16} /> : step.number}
                </div>
                <span
                  className={`text-xs ${
                    isCurrent || isCompleted
                      ? "text-[var(--brand-600)] font-medium"
                      : "text-[var(--gray-400)]"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {/* Connector line */}
              {index < STEPS.length - 1 && (
                <div
                  className={`w-16 md:w-24 h-0.5 mx-2 mb-5 ${
                    currentStep > step.number
                      ? "bg-[var(--brand-600)]"
                      : "bg-[var(--gray-200)]"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      {currentStep === 1 && (
        <div className="max-w-xl mx-auto space-y-6 text-center">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-[var(--gray-900)]">
              What role are you hiring for?
            </h2>
            <p className="text-sm text-[var(--gray-500)]">
              Describe the role in your own words and our AI will generate a
              complete job description.
            </p>
          </div>
          <Textarea
            value={formData.intent}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, intent: e.target.value }))
            }
            placeholder="e.g. We need a senior product designer who can lead end-to-end design for our fintech platform. They should be strong in user research and have experience with design systems..."
            className="min-h-[160px] text-left"
          />
          {isGenerating ? (
            <div className="space-y-3">
              <div className="h-4 bg-[var(--gray-100)] rounded animate-pulse" />
              <div className="h-4 bg-[var(--gray-100)] rounded animate-pulse w-3/4" />
              <div className="h-4 bg-[var(--gray-100)] rounded animate-pulse w-1/2" />
              <div className="h-4 bg-[var(--gray-100)] rounded animate-pulse w-5/6" />
              <p className="text-sm text-[var(--gray-500)]">
                Generating job description...
              </p>
            </div>
          ) : (
            <Button
              onClick={handleGenerate}
              disabled={formData.intent.length <= 20}
              className="gap-2"
            >
              <Sparkles size={16} />
              Generate with AI
            </Button>
          )}
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-6">
          <JdEditor
            jobData={{
              title: formData.title,
              summary: formData.summary,
              responsibilities: formData.responsibilities,
              mustHaves: formData.mustHaves,
              niceToHaves: formData.niceToHaves,
              salaryRange: formData.salaryRange,
            }}
            onUpdate={(data) =>
              setFormData((prev) => ({
                ...prev,
                title: data.title,
                summary: data.summary,
                responsibilities: data.responsibilities,
                mustHaves: data.mustHaves,
                niceToHaves: data.niceToHaves,
                salaryRange: data.salaryRange,
              }))
            }
            weights={formData.screeningWeights}
            onWeightsChange={(w) =>
              setFormData((prev) => ({ ...prev, screeningWeights: w }))
            }
            skills={formData.skills}
            onSkillsChange={(s) =>
              setFormData((prev) => ({ ...prev, skills: s }))
            }
          />
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleNext}>Continue</Button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="max-w-xl mx-auto space-y-6">
          {/* Department */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[var(--gray-700)]">
              Department <span className="text-[var(--error-500)]">*</span>
            </Label>
            <Select
              value={formData.department}
              onValueChange={(val) => {
                setFormData((prev) => ({ ...prev, department: val }));
                setErrors((prev) => ({ ...prev, department: "" }));
              }}
            >
              <SelectTrigger
                className={errors.department ? "border-[var(--error-500)]" : ""}
              >
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
            {errors.department && (
              <p className="text-xs text-[var(--error-500)]">
                {errors.department}
              </p>
            )}
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[var(--gray-700)]">
              Location <span className="text-[var(--error-500)]">*</span>
            </Label>
            <Select
              value={formData.location}
              onValueChange={(val) => {
                setFormData((prev) => ({ ...prev, location: val }));
                setErrors((prev) => ({ ...prev, location: "" }));
              }}
            >
              <SelectTrigger
                className={errors.location ? "border-[var(--error-500)]" : ""}
              >
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
            {errors.location && (
              <p className="text-xs text-[var(--error-500)]">
                {errors.location}
              </p>
            )}
          </div>

          {/* Remote Policy */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[var(--gray-700)]">
              Remote Policy
            </Label>
            <RadioGroup
              value={formData.remotePolicy}
              onValueChange={(val) =>
                setFormData((prev) => ({
                  ...prev,
                  remotePolicy: val as FormData["remotePolicy"],
                }))
              }
              className="flex gap-4"
            >
              {(["remote", "hybrid", "onsite"] as const).map((policy) => (
                <div key={policy} className="flex items-center gap-2">
                  <RadioGroupItem value={policy} id={`policy-${policy}`} />
                  <Label htmlFor={`policy-${policy}`} className="capitalize cursor-pointer">
                    {policy === "onsite" ? "On-site" : policy.charAt(0).toUpperCase() + policy.slice(1)}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Hiring Manager */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[var(--gray-700)]">
              Hiring Manager
            </Label>
            <Select
              value={formData.hiringManager}
              onValueChange={(val) =>
                setFormData((prev) => ({ ...prev, hiringManager: val }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select hiring manager" />
              </SelectTrigger>
              <SelectContent>
                {HIRING_MANAGERS.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Channels */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[var(--gray-700)]">
              Channels
            </Label>
            <div className="flex flex-wrap gap-3">
              {CHANNEL_OPTIONS.map((channel) => (
                <div key={channel} className="flex items-center gap-2">
                  <Checkbox
                    id={`channel-${channel}`}
                    checked={formData.channels.includes(channel)}
                    onCheckedChange={() => toggleChannel(channel)}
                  />
                  <Label
                    htmlFor={`channel-${channel}`}
                    className="cursor-pointer text-sm"
                  >
                    {channel}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Auto-screening */}
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-[var(--gray-700)]">
              Auto-screening
            </Label>
            <Switch
              checked={formData.autoScreening}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, autoScreening: checked }))
              }
            />
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleNext}>Continue</Button>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="max-w-xl mx-auto space-y-6">
          {/* Preview Card */}
          <div
            className="rounded-lg p-6 bg-white space-y-4"
            style={{ boxShadow: "var(--shadow-sm)" }}
          >
            <h3 className="text-lg font-semibold text-[var(--gray-900)]">
              {formData.title || "Untitled Job"}
            </h3>
            <p className="text-sm text-[var(--gray-600)]">
              {formData.summary || "No summary provided."}
            </p>
            <div className="flex flex-wrap gap-2 text-sm text-[var(--gray-500)]">
              {formData.department && (
                <Badge variant="secondary">{formData.department}</Badge>
              )}
              {formData.location && (
                <Badge variant="secondary">{formData.location}</Badge>
              )}
              {formData.remotePolicy && (
                <Badge variant="secondary" className="capitalize">
                  {formData.remotePolicy}
                </Badge>
              )}
            </div>
            {formData.channels.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-[var(--gray-500)]">
                  Publishing to:
                </p>
                <div className="flex flex-wrap gap-2">
                  {formData.channels.map((ch) => (
                    <Badge key={ch} variant="outline" className="text-xs">
                      {ch}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {formData.hiringManager && (
              <p className="text-sm text-[var(--gray-500)]">
                Hiring Manager: {formData.hiringManager}
              </p>
            )}
            <p className="text-sm text-[var(--gray-500)]">
              Auto-screening: {formData.autoScreening ? "Enabled" : "Disabled"}
            </p>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleSaveDraft}>
                Save as Draft
              </Button>
              <Button onClick={handlePublish}>Publish Job</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
