"use client";

import { RotateCcw } from "lucide-react";

import DatePicker from "@/components/ui/DatePicker/DatePicker";

import type { TrendDateFilterProps } from "../types/trends.types";

export default function TrendDateFilter({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  onGenerateReport,
  error,
  disabled = false,
  state = "",
  onStateChange,
  showStateFilter = false,
  onClear,
}: TrendDateFilterProps) {
  const handleFromDateChange = (date: string) => {
    onFromDateChange(date);

    if (!date || (toDate && date > toDate)) {
      onToDateChange("");
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Filters */}
      <div
        className={`grid grid-cols-1 gap-5 ${
          showStateFilter ? "md:grid-cols-3" : "md:grid-cols-2"
        }`}
      >
        {/* From Date */}
        <DatePicker
          label="From Date"
          value={fromDate}
          onChange={handleFromDateChange}
          disabled={disabled}
        />

        {/* To Date */}
        <DatePicker
          label="To Date"
          value={toDate}
          onChange={onToDateChange}
          minDate={fromDate}
          disabled={!fromDate || disabled}
        />

        {/* State Filter */}
        {showStateFilter && (
          <div className="flex flex-col gap-2">
            <label
              htmlFor="trend-state"
              className="text-sm font-medium text-slate-700"
            >
              State
            </label>

            <input
              id="trend-state"
              type="text"
              value={state}
              onChange={(event) => onStateChange?.(event.target.value)}
              placeholder="e.g. Telangana"
              disabled={disabled}
              className="
                w-full rounded-lg border border-slate-200 bg-white
                px-3.5 py-2.5 text-sm text-slate-700
                outline-none transition-all duration-200
                placeholder:text-slate-400
                hover:border-slate-300
                focus:border-blue-500 focus:ring-4 focus:ring-blue-50
                disabled:cursor-not-allowed disabled:bg-slate-100
              "
            />
          </div>
        )}
      </div>

      {/* Validation Error */}
      {error && (
        <p role="alert" className="mt-3 text-sm font-medium text-red-600">
          {error}
        </p>
      )}

      {/* Actions */}
      <div className="mt-5 flex flex-wrap justify-end gap-3">
        <button
          type="button"
          onClick={onClear}
          disabled={disabled || (!fromDate && !toDate && !state && !error)}
          className="
            inline-flex items-center gap-2 rounded-lg border border-slate-200
            bg-white px-5 py-2.5 text-sm font-semibold text-slate-700
            transition-colors hover:bg-slate-50
            focus:outline-none focus:ring-4 focus:ring-blue-100
            disabled:cursor-not-allowed disabled:opacity-50
          "
        >
          <RotateCcw size={16} />
          Clear
        </button>

        <button
          type="button"
          onClick={onGenerateReport}
          disabled={
            disabled ||
            !fromDate ||
            !toDate ||
            (showStateFilter && !state.trim())
          }
          className="
            rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold
            text-white transition-all duration-200 hover:bg-blue-700
            focus:outline-none focus:ring-4 focus:ring-blue-100
            disabled:cursor-not-allowed disabled:bg-slate-300
          "
        >
          {disabled ? "Generating..." : "Generate Report"}
        </button>
      </div>
    </div>
  );
}
