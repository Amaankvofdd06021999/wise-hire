import { cn } from "@/lib/utils";

interface AiContentZoneProps {
  children: React.ReactNode;
  className?: string;
}

export function AiContentZone({ children, className }: AiContentZoneProps) {
  return <div className={cn("ai-content-zone", className)}>{children}</div>;
}
