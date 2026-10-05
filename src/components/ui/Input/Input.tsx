import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export default function Input({
  label,
  error,
  required = false,
  className = "",
  id,
  name,
  ...props
}: InputProps) {
  const inputId = id ?? name ?? `input-${label?.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-text-primary"
        >
          {label}
          {required && <span className="ml-1 text-error">*</span>}
        </label>
      )}

      <input
        id={inputId}
        name={name}
        className={`
          w-full rounded-lg
          border bg-surface
          px-3.5 py-2.5
          text-sm text-text-primary
          placeholder:text-text-muted
          outline-none
          transition-all duration-200
          disabled:cursor-not-allowed
          disabled:bg-secondary-light
          disabled:text-text-muted
          ${
            error
              ? "border-error focus:border-error focus:ring-4 focus:ring-red-100"
              : "border-border hover:border-slate-300 focus:border-primary focus:ring-4 focus:ring-primary-light"
          }
          ${className}
        `}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />

      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-1.5 text-xs text-error"
        >
          {error}
        </p>
      )}
    </div>
  );
}