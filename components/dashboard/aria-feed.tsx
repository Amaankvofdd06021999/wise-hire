import Link from "next/link";
import { activityFeedItems } from "@/lib/mock-data";
import { formatRelativeDate } from "@/lib/utils";

export function AriaFeed() {
  return (
    <div
      className="rounded-xl bg-white p-6"
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      <div className="flex items-center justify-between">
        <h2
          className="text-base font-semibold"
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

      <div className="mt-4 max-h-[340px] space-y-3 overflow-y-auto">
        {activityFeedItems.map((item) => (
          <div
            key={item.id}
            className="rounded-md py-3 px-3"
            style={{
              borderLeft: "3px solid var(--brand-200)",
              backgroundColor: "var(--brand-25)",
            }}
          >
            <p className="text-xs" style={{ color: "var(--gray-400)" }}>
              {formatRelativeDate(item.timestamp)}
            </p>
            <p className="mt-1 text-sm" style={{ color: "var(--gray-700)" }}>
              {item.description}
            </p>
            <Link
              href={item.actionUrl}
              className="mt-1 inline-block text-sm font-medium"
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
