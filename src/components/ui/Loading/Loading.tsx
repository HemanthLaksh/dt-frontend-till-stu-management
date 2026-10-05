import { LoaderCircle } from "lucide-react";

interface LoadingProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
}

const sizeStyles = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

export default function Loading({
  message = "Loading...",
  size = "md",
  fullScreen = false,
}: LoadingProps) {
  return (
    <div
      className={`
        flex items-center justify-center gap-2
        text-text-secondary
        ${fullScreen ? "min-h-[300px] w-full" : "py-8"}
      `}
      role="status"
      aria-live="polite"
    >
      <LoaderCircle
        className={`${sizeStyles[size]} animate-spin text-primary`}
        aria-hidden="true"
      />

      {message && (
        <span className="text-sm font-medium">
          {message}
        </span>
      )}
    </div>
  );
}