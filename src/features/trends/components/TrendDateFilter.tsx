"use client";

import DatePicker from "@/components/ui/DatePicker/DatePicker";

import type {
  TrendDateFilterProps,
} from "../types/trends.types";

export default function TrendDateFilter({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  onGenerateReport,
  error,
  disabled = false,
}: TrendDateFilterProps) {
  const handleFromDateChange = (date: string) => {
    onFromDateChange(date);

    if (toDate && date > toDate) {
      onToDateChange("");
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <DatePicker
          label="From Date"
          value={fromDate}
          onChange={handleFromDateChange}
          disabled={disabled}
        />

        <DatePicker
          label="To Date"
          value={toDate}
          onChange={onToDateChange}
          minDate={fromDate}
          disabled={!fromDate || disabled}
        />
      </div>

      {error && (
        <p className="mt-3 text-sm font-medium text-red-600">
          {error}
        </p>
      )}

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={onGenerateReport}
          disabled={
            disabled ||
            !fromDate ||
            !toDate
          }
          className="
            rounded-lg
            bg-blue-600
            px-5
            py-2.5
            text-sm
            font-semibold
            text-white
            transition-all
            duration-200
            hover:bg-blue-700
            focus:outline-none
            focus:ring-4
            focus:ring-blue-100
            disabled:cursor-not-allowed
            disabled:bg-slate-300
          "
        >
          {disabled
            ? "Generating..."
            : "Generate Report"}
        </button>
      </div>
    </div>
  );
}