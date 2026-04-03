import Link from "next/link";

interface EmptyStateProps {
  icon: React.ReactNode;
  heading: string;
  subheading: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function EmptyState({
  icon,
  heading,
  subheading,
  ctaLabel,
  ctaHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div
        className="mb-4 flex items-center justify-center"
        style={{ width: 64, height: 64, color: "var(--gray-400)" }}
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold" style={{ color: "var(--gray-900)" }}>
        {heading}
      </h3>
      <p className="mt-1 text-sm" style={{ color: "var(--gray-500)" }}>
        {subheading}
      </p>
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className="mt-4 inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors"
          style={{ backgroundColor: "var(--brand-600)" }}
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}
