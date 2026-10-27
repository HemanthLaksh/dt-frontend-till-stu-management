"use client";

import { useState } from "react";

interface EmptyTrendStateProps {
  onChangeFilters?: () => void;
}

export default function EmptyTrendState({
  onChangeFilters,
}: EmptyTrendStateProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex min-h-[360px] w-full items-center justify-center rounded-2xl border border-dashed border-blue-200 bg-gradient-to-b from-blue-50/80 to-white px-6 py-12 text-center dark:border-slate-700 dark:from-slate-900 dark:to-slate-950">
      <div className="flex max-w-md flex-col items-center">
        {/* Animated illustration */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-transform duration-300 dark:bg-blue-950 dark:text-blue-400 ${
            isHovered ? "scale-110" : "animate-[float_3s_ease-in-out_infinite]"
          }`}
        >
          {/* Decorative circles */}
          <span className="absolute -right-1 top-2 h-3 w-3 animate-ping rounded-full bg-blue-400/60" />
          <span className="absolute -left-2 bottom-4 h-2.5 w-2.5 animate-pulse rounded-full bg-sky-400" />

          {/* Chart/search icon */}
          <svg
            viewBox="0 0 64 64"
            fill="none"
            className="h-12 w-12"
            aria-hidden="true"
          >
            <rect
              x="10"
              y="8"
              width="36"
              height="44"
              rx="5"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            <path
              d="M18 20H37M18 27H31"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M18 42L25 35L31 39L39 30"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="40"
              strokeDashoffset="0"
              className="animate-[draw_2s_ease-in-out_infinite_alternate]"
            />
            <circle
              cx="45"
              cy="44"
              r="10"
              fill="#DBEAFE"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            <path
              d="M52 51L58 57"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Message */}
        <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
          No data found for this date range
        </h3>

        <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
          We couldn’t find any records for the selected interval. Try adjusting
          your date range or filters to explore more insights.
        </p>

        {onChangeFilters && (
          <button
            type="button"
            onClick={onChangeFilters}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                d="M3 5H17M6 10H14M8 15H12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            Change filters
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        @keyframes draw {
          from {
            stroke-dashoffset: 40;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
