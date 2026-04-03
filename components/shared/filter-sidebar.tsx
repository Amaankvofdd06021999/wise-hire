"use client";

import { useState } from "react";
import type { CandidateStage } from "@/lib/types";
import { PIPELINE_STAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface FilterState {
  scoreRange: [number, number];
  stages: CandidateStage[];
  role: string;
  experienceLevel: string;
  aiContentFlag: boolean;
  portfolioAvailable: boolean;
}

export const defaultFilters: FilterState = {
  scoreRange: [0, 100],
  stages: [],
  role: "all",
  experienceLevel: "any",
  aiContentFlag: false,
  portfolioAvailable: false,
};

const ROLES = ["All", "Designer", "Engineer", "Data Scientist", "Product Manager", "Researcher"];
const EXPERIENCE_LEVELS = [
  { value: "any", label: "Any" },
  { value: "0-2", label: "0-2 yr" },
  { value: "3-5", label: "3-5 yr" },
  { value: "5-10", label: "5-10 yr" },
  { value: "10+", label: "10+ yr" },
];

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  className?: string;
}

function FilterContent({ filters, onChange }: FilterSidebarProps) {
  const handleStageToggle = (stageKey: CandidateStage, checked: boolean) => {
    const next = checked
      ? [...filters.stages, stageKey]
      : filters.stages.filter((s) => s !== stageKey);
    onChange({ ...filters, stages: next });
  };

  const handleClear = () => {
    onChange({ ...defaultFilters });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Score range */}
      <div className="space-y-3">
        <Label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--gray-500)" }}>
          Score Range
        </Label>
        <Slider
          min={0}
          max={100}
          step={1}
          value={filters.scoreRange}
          onValueChange={(value) =>
            onChange({ ...filters, scoreRange: value as [number, number] })
          }
        />
        <div className="flex items-center justify-between text-xs" style={{ color: "var(--gray-500)" }}>
          <span>{filters.scoreRange[0]}</span>
          <span>{filters.scoreRange[1]}</span>
        </div>
      </div>

      {/* Stages */}
      <div className="space-y-3">
        <Label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--gray-500)" }}>
          Stages
        </Label>
        <div className="space-y-2">
          {PIPELINE_STAGES.map((stage) => (
            <div key={stage.key} className="flex items-center gap-2">
              <Checkbox
                id={`stage-${stage.key}`}
                checked={filters.stages.includes(stage.key)}
                onCheckedChange={(checked) =>
                  handleStageToggle(stage.key, checked === true)
                }
              />
              <label
                htmlFor={`stage-${stage.key}`}
                className="text-sm cursor-pointer"
                style={{ color: "var(--gray-700)" }}
              >
                {stage.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Role */}
      <div className="space-y-3">
        <Label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--gray-500)" }}>
          Role
        </Label>
        <Select
          value={filters.role}
          onValueChange={(value) => onChange({ ...filters, role: value })}
        >
          <SelectTrigger className="h-9 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ROLES.map((role) => (
              <SelectItem key={role} value={role.toLowerCase().replace(/ /g, "_")}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Experience */}
      <div className="space-y-3">
        <Label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--gray-500)" }}>
          Experience
        </Label>
        <RadioGroup
          value={filters.experienceLevel}
          onValueChange={(value) => onChange({ ...filters, experienceLevel: value })}
        >
          {EXPERIENCE_LEVELS.map((level) => (
            <div key={level.value} className="flex items-center gap-2">
              <RadioGroupItem value={level.value} id={`exp-${level.value}`} />
              <label
                htmlFor={`exp-${level.value}`}
                className="text-sm cursor-pointer"
                style={{ color: "var(--gray-700)" }}
              >
                {level.label}
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* AI Content flag */}
      <div className="flex items-center justify-between">
        <Label className="text-sm" style={{ color: "var(--gray-700)" }}>
          AI Content Flag
        </Label>
        <Switch
          checked={filters.aiContentFlag}
          onCheckedChange={(checked) =>
            onChange({ ...filters, aiContentFlag: checked })
          }
        />
      </div>

      {/* Portfolio available */}
      <div className="flex items-center justify-between">
        <Label className="text-sm" style={{ color: "var(--gray-700)" }}>
          Portfolio Available
        </Label>
        <Switch
          checked={filters.portfolioAvailable}
          onCheckedChange={(checked) =>
            onChange({ ...filters, portfolioAvailable: checked })
          }
        />
      </div>

      {/* Clear filters */}
      <Button variant="outline" size="sm" onClick={handleClear} className="w-full">
        Clear Filters
      </Button>
    </div>
  );
}

export function FilterSidebar({ filters, onChange, className }: FilterSidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden md:block w-[240px] shrink-0 border-r border-[var(--gray-200)] pr-4",
          className,
        )}
      >
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <FilterContent filters={filters} onChange={onChange} />
        </ScrollArea>
      </aside>

      {/* Mobile sheet trigger */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Filter size={16} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] p-6">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription className="sr-only">Filter candidates</SheetDescription>
          </SheetHeader>
          <div className="mt-4">
            <FilterContent filters={filters} onChange={onChange} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
