import Link from "next/link";
import { activityFeedItems } from "@/lib/mock-data";
import { formatRelativeDate } from "@/lib/utils";

export function AriaFeed() {
  return (
    <div className="rounded-xl bg-white border border-[var(--gray-200)] p-6 lg:p-8 transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        <h2
          className="text-base font-semibold lg:text-lg"
          style={{ color: "var(--gray-900)" }}
        >
          ARIA Activity
        </h2>
        <Link
          href="/screening"
          className="text-sm font-medium"
          style={{ color: "var(--brand-600)" }}
        >
          View All
        </Link>
      </div>

      <div className="mt-6 max-h-[360px] space-y-3 overflow-y-auto">
        {activityFeedItems.map((item) => (
          <div
            key={item.id}
            className="rounded-lg py-4 px-4"
            style={{
              borderLeft: "3px solid var(--brand-200)",
              backgroundColor: "var(--brand-25)",
            }}
          >
            <p className="text-xs font-medium" style={{ color: "var(--gray-400)" }}>
              {formatRelativeDate(item.timestamp)}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--gray-700)" }}>
              {item.description}
            </p>
            <Link
              href={item.actionUrl}
              className="mt-2 inline-block text-sm font-semibold"
              style={{ color: "var(--brand-600)" }}
            >
              {item.actionLabel}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
