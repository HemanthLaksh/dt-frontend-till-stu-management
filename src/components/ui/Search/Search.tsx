"use client";

import { Search as SearchIcon, X } from "lucide-react";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export default function Search({
  value,
  onChange,
  placeholder = "Search...",
  disabled = false,
  className = "",
}: SearchProps) {
  const handleClear = () => {
    onChange("");
  };

  return (
    <div className={`relative w-full ${className}`}>
      <SearchIcon
        size={18}
        strokeWidth={2}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
        aria-hidden="true"
      />

      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={placeholder}
        className="
          w-full rounded-lg
          border border-border
          bg-surface
          py-2.5 pl-10 pr-10
          text-sm text-text-primary
          placeholder:text-text-muted
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
      />

      {value && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="
            absolute right-3 top-1/2
            -translate-y-1/2
            rounded-md
            p-1
            text-text-muted
            transition-colors
            hover:bg-secondary-light
            hover:text-text-primary
          "
        >
          <X size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}