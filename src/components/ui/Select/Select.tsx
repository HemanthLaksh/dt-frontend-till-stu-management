"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { Check, ChevronDown } from "lucide-react";

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
  const selectRef = useRef<HTMLDivElement>(null);
  const selectId = useId();

  const selectedOption = options.find(
    (option) => option.value === value,
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(
          event.target as Node,
        )
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div
      ref={selectRef}
      className={`relative ${className}`}
    >
      {label && (
        <label
          htmlFor={selectId}
          className="mb-2 block text-sm font-medium text-text-primary"
        >
          {label}
        </label>
      )}

      <button
        id={selectId}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => {
          if (!disabled) {
            setIsOpen((previous) => !previous);
          }
        }}
        className={`flex h-11 w-full items-center justify-between rounded-lg border bg-surface px-3.5 text-left text-sm outline-none transition-all duration-200 ${
          disabled
            ? "cursor-not-allowed border-border bg-secondary-light text-text-muted"
            : isOpen
              ? "border-primary ring-4 ring-primary-light"
              : "border-border hover:border-primary"
        }`}
      >
        <span
          className={
            selectedOption
              ? "text-text-primary"
              : "text-text-muted"
          }
        >
          {selectedOption?.label ?? placeholder}
        </span>

        <ChevronDown
          size={17}
          className={`shrink-0 text-text-muted transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && !disabled && (
        <div
          role="listbox"
          aria-labelledby={selectId}
          className="
            absolute left-0 right-0 z-50 mt-2
            max-h-60 overflow-y-auto
            rounded-lg
            border border-border
            bg-surface
            p-1.5
            shadow-lg
          "
        >
          {options.length === 0 ? (
            <div className="px-3 py-2.5 text-sm text-text-muted">
              No options available
            </div>
          ) : (
            options.map((option) => {
              const isSelected =
                option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() =>
                    handleSelect(option.value)
                  }
                  className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-base transition-colors ${
                    isSelected
                      ? "bg-primary-light font-medium text-primary"
                      : "text-text-primary hover:bg-secondary-light hover:text-primary"
                  }`}
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
      )}
    </div>
  );
}