"use client";

import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

export default function BackButton({
  onClick,
  label = "Back",
}: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex
        items-center
        gap-2
        rounded-lg
        border
        border-slate-300
        bg-white
        px-4
        py-2
        text-sm
        font-medium
        text-slate-700
        transition-colors
        duration-200
        hover:bg-slate-50
        hover:text-slate-900
        focus:outline-none
        focus:ring-4
        focus:ring-blue-100
      "
    >
      <ArrowLeft size={16} />
      {label}
    </button>
  );
}