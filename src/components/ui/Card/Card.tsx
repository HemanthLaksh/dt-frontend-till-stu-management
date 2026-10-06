import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function Card({
  children,
  title,
  description,
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
      {(title || description) && (
        <div className="border-b border-border px-5 py-4">
          {title && (
            <h2 className="text-base font-semibold text-text-primary">
              {title}
            </h2>
          )}

          {description && (
            <p className="mt-1 text-sm text-text-secondary">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="p-5">
        {children}
      </div>
    </div>
  );
}