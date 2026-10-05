import { Inbox } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export default function EmptyState({
  title = "No data found",
  message = "There is no data available to display.",
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div
      className="
        flex min-h-[220px]
        flex-col items-center justify-center
        px-6 py-10
        text-center
      "
      role="status"
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-secondary-light text-text-muted">
        {icon ?? <Inbox size={24} aria-hidden="true" />}
      </div>

      <h2 className="text-base font-semibold text-text-primary">
        {title}
      </h2>

      <p className="mt-1 max-w-md text-sm text-text-secondary">
        {message}
      </p>

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}