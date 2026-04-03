interface SkillTagProps {
  name: string;
  matched?: "full" | "partial" | "missing";
}

const matchStyles: Record<string, { bg: string; text: string }> = {
  full: { bg: "var(--success-50)", text: "var(--success-700)" },
  partial: { bg: "var(--warning-50)", text: "var(--warning-700)" },
  missing: { bg: "var(--gray-100)", text: "var(--gray-500)" },
};

export function SkillTag({ name, matched = "missing" }: SkillTagProps) {
  const style = matchStyles[matched];

  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {name}
    </span>
  );
}
