import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  title?: string;
  description?: string;
  headerAction?: ReactNode;
}

export default function Card({
  children,
  title,
  description,
  headerAction,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`
        rounded-xl
        border border-border
        bg-white
        transition-all duration-300 ease-out
        hover:-translate-y-0.5
        hover:bg-white
        hover:shadow-md
        ${className}
      `}
      {...props}
    >
      {(title || description || headerAction) && (
        <div className="flex flex-col gap-4 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {title && (
              <h2 className="text-base font-semibold text-text-primary">
                {title}
              </h2>
            )}

            {description && (
              <p className="mt-1 text-sm text-text-secondary">{description}</p>
            )}
          </div>

          {headerAction && <div className="shrink-0">{headerAction}</div>}
        </div>
      )}

      <div className="p-5">{children}</div>
    </div>
  );
}
