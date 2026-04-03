"use client";

import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface ScreeningWeightsProps {
  weights: {
    portfolio: number;
    experience: number;
    skills: number;
    culture: number;
  };
  onChange: (weights: ScreeningWeightsProps["weights"]) => void;
}

const weightLabels: { key: keyof ScreeningWeightsProps["weights"]; label: string }[] = [
  { key: "portfolio", label: "Portfolio" },
  { key: "experience", label: "Experience" },
  { key: "skills", label: "Skills" },
  { key: "culture", label: "Culture Fit" },
];

export function ScreeningWeights({ weights, onChange }: ScreeningWeightsProps) {
  const total = weights.portfolio + weights.experience + weights.skills + weights.culture;
  const isBalanced = total === 100;

  return (
    <div className="space-y-4">
      {weightLabels.map(({ key, label }) => (
        <div key={key} className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm text-[var(--gray-700)]">{label}</Label>
            <span className="text-sm font-medium text-[var(--gray-900)]">
              {weights[key]}%
            </span>
          </div>
          <Slider
            value={[weights[key]]}
            onValueChange={([value]) =>
              onChange({ ...weights, [key]: value })
            }
            min={0}
            max={100}
            step={5}
          />
        </div>
      ))}

      {/* Total indicator */}
      <div className="pt-2 border-t border-[var(--gray-100)]">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--gray-500)]">Weights should total 100%</span>
          <span
            className="text-sm font-semibold"
            style={{ color: isBalanced ? "var(--success-600)" : "var(--warning-600)" }}
          >
            Total: {total}%
          </span>
        </div>
      </div>
    </div>
  );
}
