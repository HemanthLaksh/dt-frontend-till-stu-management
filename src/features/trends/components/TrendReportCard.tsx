"use client";

import {
  BarChart3,
  ChevronRight,
} from "lucide-react";

import type {
  TrendReportCardProps,
} from "../types/trends.types";

export default function TrendReportCard({
  report,
  onClick,
}: TrendReportCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(report)}
      className="
        group
        flex
        min-h-[120px]
        w-full
        flex-col
        items-center
        justify-center
        rounded-xl
        border
        border-slate-200
        bg-white
        px-5
        py-5
        text-center
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:border-blue-200
        hover:bg-blue-50/30
        hover:shadow-md
        focus:outline-none
        focus:ring-4
        focus:ring-blue-100
      "
    >
      <div
        className="
          mb-3
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-lg
          bg-blue-50
          text-blue-600
          transition-colors
          duration-200
          group-hover:bg-blue-100
        "
      >
        <BarChart3 size={21} />
      </div>

      <div className="flex items-center gap-1.5">
        <span
          className="
            text-sm
            font-semibold
            text-slate-700
            group-hover:text-blue-700
          "
        >
          {report.title}
        </span>

        <ChevronRight
          size={16}
          className="
            text-slate-300
            transition-all
            duration-200
            group-hover:translate-x-0.5
            group-hover:text-blue-500
          "
        />
      </div>

      <p className="mt-1 text-xs text-slate-400">
        {report.description}
      </p>
    </button>
  );
}