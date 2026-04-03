import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ScoreTier } from "./types";
import { SCORE_TIERS, HEALTH_SCORE_TIERS } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getScoreTier(score: number): (typeof SCORE_TIERS)[number] {
  return SCORE_TIERS.find((t) => score >= t.min && score <= t.max) ?? SCORE_TIERS[3];
}

export function getScoreTierFromKey(tier: ScoreTier): (typeof SCORE_TIERS)[number] {
  return SCORE_TIERS.find((t) => t.tier === tier) ?? SCORE_TIERS[3];
}

export function getHealthScoreTier(score: number): (typeof HEALTH_SCORE_TIERS)[number] {
  return HEALTH_SCORE_TIERS.find((t) => score >= t.min && score <= t.max) ?? HEALTH_SCORE_TIERS[2];
}

export function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ${seconds % 60}s`;
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}
