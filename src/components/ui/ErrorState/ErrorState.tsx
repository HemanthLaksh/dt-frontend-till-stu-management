import { AlertCircle, RefreshCw } from "lucide-react";
import type { ReactNode } from "react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  icon?: ReactNode;
  action?: ReactNode;
  onRetry?: () => void;
  retryLabel?: string;
}

export default function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load the requested data. Please try again.",
  icon,
  action,
  onRetry,
  retryLabel = "Try Again",
}: ErrorStateProps) {
  return (
    <div
      className="
        flex min-h-[220px]
        flex-col items-center justify-center
        px-6 py-10
        text-center
      "
      role="alert"
    >
      <div
        className="
          mb-3 flex h-12 w-12
          items-center justify-center
          rounded-full bg-red-50 text-error
        "
      >
        {icon ?? <AlertCircle size={24} aria-hidden="true" />}
      </div>

      <h2 className="text-base font-semibold text-text-primary">
        {title}
      </h2>

      <p className="mt-1 max-w-md text-sm text-text-secondary">
        {message}
      </p>

      {(onRetry || action) && (
        <div className="mt-4 flex items-center gap-2">
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="
                inline-flex items-center gap-2
                rounded-lg
                bg-primary
                px-4 py-2.5
                text-sm font-medium text-white
                transition-colors duration-200
                hover:bg-primary-hover
                focus:outline-none
                focus:ring-4 focus:ring-primary-light
              "
            >
              <RefreshCw size={16} aria-hidden="true" />
              {retryLabel}
            </button>
          )}

          {action}
        </div>
      )}
    </div>
  );
}