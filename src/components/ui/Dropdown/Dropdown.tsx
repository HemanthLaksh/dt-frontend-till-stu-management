"use client";

import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

export interface DropdownOption {
  label: string;
  value: string;
  icon?: ReactNode;
  danger?: boolean;
  disabled?: boolean;
}

interface DropdownProps {
  trigger: ReactNode;
  options: DropdownOption[];
  onSelect: (value: string) => void;
  align?: "left" | "right";
  disabled?: boolean;
}

export default function Dropdown({
  trigger,
  options,
  onSelect,
  align = "left",
  disabled = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSelect = (option: DropdownOption) => {
    if (option.disabled) {
      return;
    }

    onSelect(option.value);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((previous) => !previous)}
        className="
          inline-flex items-center gap-2
          rounded-lg
          border border-border
          bg-surface
          px-3.5 py-2.5
          text-sm font-medium text-text-primary
          outline-none
          transition-all duration-200
          hover:border-primary
          focus:border-primary
          focus:ring-4 focus:ring-primary-light
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {trigger}

        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          className={`
            absolute z-50 mt-2
            min-w-48
            overflow-hidden
            rounded-lg
            border border-border
            bg-surface
            p-1
            shadow-lg
            ${align === "right" ? "right-0" : "left-0"}
          `}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="menuitem"
              disabled={option.disabled}
              onClick={() => handleSelect(option)}
              className={`
                flex w-full items-center gap-2
                rounded-md
                px-3 py-2.5
                text-left text-sm
                transition-colors duration-150
                ${
                  option.danger
                    ? "text-error hover:bg-red-50"
                    : "text-text-primary hover:bg-secondary-light"
                }
                disabled:cursor-not-allowed
                disabled:opacity-50
              `}
            >
              {option.icon && (
                <span className="shrink-0">{option.icon}</span>
              )}

              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}