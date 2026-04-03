"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle, Loader2 } from "lucide-react";

interface BulkScreeningModalProps {
  candidateCount: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ScreeningState = "idle" | "processing" | "success";

const CRITERIA = [
  "Resume keyword matching (90% threshold)",
  "Experience level verification",
  "Skills assessment and scoring",
  "Cultural fit analysis",
];

export function BulkScreeningModal({
  candidateCount,
  open,
  onOpenChange,
}: BulkScreeningModalProps) {
  const [state, setState] = useState<ScreeningState>("idle");

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!open) {
      setState("idle");
    }
  }, [open]);

  const handleStart = () => {
    setState("processing");
    setTimeout(() => {
      setState("success");
    }, 3000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
              style={{
                backgroundColor: "var(--brand-50)",
                color: "var(--brand-600)",
              }}
            >
              <Sparkles size={20} />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold text-[var(--gray-900)]">
                Bulk AI Screening
              </DialogTitle>
              <DialogDescription className="text-sm text-[var(--gray-500)]">
                Automatically screen multiple candidates using ARIA&apos;s AI
                engine
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {state === "idle" && (
          <div className="space-y-5 mt-2">
            {/* Screening Criteria */}
            <div className="rounded-xl border border-[var(--gray-200)] p-5">
              <h4 className="text-sm font-semibold text-[var(--gray-900)] mb-3">
                Screening Criteria
              </h4>
              <div className="space-y-2.5">
                {CRITERIA.map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle
                      size={16}
                      style={{ color: "var(--brand-600)" }}
                    />
                    <span className="text-sm text-[var(--gray-700)]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Candidates to Screen */}
            <div className="rounded-xl border border-[var(--gray-200)] p-5 text-center">
              <h4 className="text-sm font-semibold text-[var(--gray-900)] mb-2">
                Candidates to Screen
              </h4>
              <p
                className="text-3xl font-semibold"
                style={{ color: "var(--brand-600)" }}
              >
                {candidateCount} candidates
              </p>
              <p className="text-sm text-[var(--gray-500)] mt-1">
                Estimated time: 2-3 minutes
              </p>
            </div>
          </div>
        )}

        {state === "processing" && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2
              size={40}
              className="animate-spin"
              style={{ color: "var(--brand-600)" }}
            />
            <div className="text-center">
              <p className="text-sm font-semibold text-[var(--gray-900)]">
                Screening in progress...
              </p>
              <p className="text-sm text-[var(--gray-500)] mt-1">
                ARIA is analyzing {candidateCount} candidates
              </p>
            </div>
            {/* Progress bar animation */}
            <div className="w-full max-w-xs h-2 overflow-hidden rounded-full bg-[var(--gray-100)]">
              <div
                className="h-full rounded-full animate-pulse"
                style={{
                  width: "70%",
                  backgroundColor: "var(--brand-600)",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        )}

        {state === "success" && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full"
              style={{
                backgroundColor: "var(--success-50)",
                color: "var(--success-600)",
              }}
            >
              <CheckCircle size={28} />
            </div>
            <div className="text-center">
              <p className="text-base font-semibold text-[var(--gray-900)]">
                Screening Complete!
              </p>
              <p className="text-sm text-[var(--gray-500)] mt-1">
                Successfully screened {candidateCount} candidates. Results are
                now available in each candidate&apos;s profile.
              </p>
            </div>
            <div className="flex gap-3 mt-2">
              <div className="text-center px-4">
                <p
                  className="text-xl font-semibold"
                  style={{ color: "var(--success-600)" }}
                >
                  {Math.round(candidateCount * 0.4)}
                </p>
                <p className="text-xs text-[var(--gray-500)]">Shortlisted</p>
              </div>
              <div className="text-center px-4">
                <p
                  className="text-xl font-semibold"
                  style={{ color: "var(--warning-600)" }}
                >
                  {Math.round(candidateCount * 0.35)}
                </p>
                <p className="text-xs text-[var(--gray-500)]">Needs Review</p>
              </div>
              <div className="text-center px-4">
                <p
                  className="text-xl font-semibold"
                  style={{ color: "var(--error-600)" }}
                >
                  {Math.round(candidateCount * 0.25)}
                </p>
                <p className="text-xs text-[var(--gray-500)]">Not a Fit</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <DialogFooter className="mt-4 gap-2 sm:gap-2">
          {state === "idle" && (
            <>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="text-[var(--gray-700)]"
              >
                Cancel
              </Button>
              <Button
                className="text-white"
                style={{ backgroundColor: "var(--brand-600)" }}
                onClick={handleStart}
              >
                <Sparkles size={16} className="mr-2" />
                Start AI Screening
              </Button>
            </>
          )}
          {state === "processing" && (
            <Button variant="outline" disabled className="text-[var(--gray-400)]">
              Processing...
            </Button>
          )}
          {state === "success" && (
            <Button
              className="text-white"
              style={{ backgroundColor: "var(--brand-600)" }}
              onClick={() => onOpenChange(false)}
            >
              Done
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
