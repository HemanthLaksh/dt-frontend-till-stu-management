"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  value: string;
  options: SelectOption[];
  placeholder?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export default function Select({
  label,
  value,
  options,
  placeholder = "Select an option",
  onChange,
  disabled = false,
  className = "",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selectRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const selectId = useId();

  const selectedOption = options.find((option) => option.value === value);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.trim().toLowerCase()),
  );

  // Close the dropdown when clicking outside.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus the search input when the dropdown opens.
  useEffect(() => {
    if (isOpen && !disabled) {
      const timeout = window.setTimeout(() => {
        searchRef.current?.focus();
      }, 100);

      return () => window.clearTimeout(timeout);
    }
  }, [isOpen, disabled]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearch("");
  };

  const handleToggle = () => {
    if (disabled) return;

    setIsOpen((previous) => !previous);
  };

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={selectId}
          className="mb-2 block text-sm font-medium text-text-primary"
        >
          {label}
        </label>
      )}

      {/* Select trigger */}
      <button
        id={selectId}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={handleToggle}
        className={`
          flex h-11 w-full items-center justify-between
          rounded-lg border bg-surface px-3.5
          text-left text-sm outline-none
          transition-all duration-200 ease-out
          ${
            disabled
              ? "cursor-not-allowed border-border bg-secondary-light text-text-muted"
              : isOpen
                ? "border-primary ring-4 ring-primary-light"
                : "border-border hover:border-primary"
          }
        `}
      >
        <span
          className={selectedOption ? "text-text-primary" : "text-text-muted"}
        >
          {selectedOption?.label ?? placeholder}
        </span>

        <ChevronDown
          size={17}
          className={`
            shrink-0 text-text-muted
            transition-transform duration-200 ease-out
            ${isOpen ? "rotate-180" : "rotate-0"}
          `}
          aria-hidden="true"
        />
      </button>

      {/* Animated searchable dropdown */}
      <div
        aria-hidden={!isOpen || disabled}
        className={`
          absolute left-0 right-0 z-50 mt-2
          origin-top overflow-hidden
          rounded-lg border border-border
          bg-surface shadow-lg

          transition-[opacity,transform,visibility]
          duration-400 ease-out

          ${
            isOpen && !disabled
              ? "visible translate-y-0 scale-100 opacity-100"
              : "invisible pointer-events-none -translate-y-2 scale-[0.98] opacity-0"
          }
        `}
      >
        {/* Search input */}
        <div className="border-b border-border p-2">
          <div
            className="
              flex items-center gap-2
              rounded-md border border-border
              bg-white px-3
              transition-colors duration-200
              focus-within:border-primary
              focus-within:ring-2
              focus-within:ring-primary-light
            "
          >
            <Search
              size={16}
              className="shrink-0 text-text-muted"
              aria-hidden="true"
            />

            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search options..."
              aria-label={`Search ${label ?? "options"}`}
              tabIndex={isOpen && !disabled ? 0 : -1}
              className="
                h-9 w-full bg-transparent
                text-sm text-text-primary
                outline-none
                placeholder:text-text-muted
              "
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setIsOpen(false);
                  setSearch("");
                }

                if (event.key === "Enter" && filteredOptions.length > 0) {
                  event.preventDefault();
                  handleSelect(filteredOptions[0].value);
                }
              }}
            />
          </div>
        </div>

        {/* Options list */}
        <div
          role="listbox"
          aria-labelledby={selectId}
          className="
            max-h-60 overflow-y-auto p-1.5
            transition-opacity duration-150 ease-out
          "
        >
          {filteredOptions.length === 0 ? (
            <div className="px-3 py-3 text-center text-sm text-text-muted">
              No options found
            </div>
          ) : (
            filteredOptions.map((option, index) => {
              const isSelected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={isOpen && !disabled ? 0 : -1}
                  onClick={() => handleSelect(option.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      setIsOpen(false);
                      setSearch("");
                    }

                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleSelect(option.value);
                    }
                  }}
                  className={`
                    flex w-full items-center justify-between
                    rounded-md px-3 py-2.5
                    text-left text-base
                    transition-colors duration-150

                    ${
                      isSelected
                        ? "bg-primary-light font-medium text-primary"
                        : "text-text-primary hover:bg-secondary-light hover:text-primary"
                    }
                  `}
                >
                  <span>{option.label}</span>

                  {isSelected && (
                    <Check
                      size={16}
                      className="shrink-0 text-primary"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
