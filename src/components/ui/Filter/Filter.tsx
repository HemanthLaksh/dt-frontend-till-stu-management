"use client";

import { ChevronDown } from "lucide-react";

export interface FilterOption {
  label: string;
  value: string;
}

interface FilterProps {
  label?: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export default function Filter({
  label,
  value,
  options,
  onChange,
  placeholder = "Select...",
  disabled = false,
  className = "",
}: FilterProps) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-text-primary">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
          aria-label={label ?? placeholder}
          className="
            w-full appearance-none rounded-lg
            border border-border
            bg-surface
            px-3.5 py-2.5 pr-10
            text-sm text-text-primary
            outline-none
            transition-all duration-200
            hover:border-slate-300
            focus:border-primary
            focus:ring-4
            focus:ring-primary-light
            disabled:cursor-not-allowed
            disabled:bg-secondary-light
            disabled:text-text-muted
          "
        >
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={18}
          strokeWidth={2}
          className="
            pointer-events-none
            absolute right-3 top-1/2
            -translate-y-1/2
            text-text-muted
          "
          aria-hidden="true"
        />
      </div>
    </div>
  );
}