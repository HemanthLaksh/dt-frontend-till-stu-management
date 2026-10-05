"use client";

import Select from "@/components/ui/Select/Select";
import DatePicker from "@/components/ui/DatePicker/DatePicker";

import {
  BUSINESS_TYPE_OPTIONS,
  SUBSCRIBER_COURSE_OPTIONS,
} from "../constants/subscribers.constants";

import type { SubscriberFilters as SubscriberFiltersType } from "../types/subscribers.types";

interface SubscriberFiltersProps {
  filters: SubscriberFiltersType;
  onChange: (
    field: keyof SubscriberFiltersType,
    value: string,
  ) => void;
  onSubmit: () => void;
  isLoading: boolean;
  error: string;
}

export default function SubscriberFilters({
  filters,
  onChange,
  onSubmit,
  isLoading,
  error,
}: SubscriberFiltersProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        <Select
          label="Business Type"
          value={filters.businessType}
          options={BUSINESS_TYPE_OPTIONS}
          placeholder="Select Business Type"
          onChange={(value) =>
            onChange("businessType", value)
          }
          disabled={isLoading}
        />

        <Select
          label="Course"
          value={filters.courseId}
          options={SUBSCRIBER_COURSE_OPTIONS}
          placeholder="Select Course"
          onChange={(value) =>
            onChange("courseId", value)
          }
          disabled={isLoading}
        />

        <DatePicker
          label="From Date"
          value={filters.fromDate}
          onChange={(value) =>
            onChange("fromDate", value)
          }
          disabled={isLoading}
        />

        <DatePicker
          label="To Date"
          value={filters.toDate}
          minDate={filters.fromDate}
          onChange={(value) =>
            onChange("toDate", value)
          }
          disabled={!filters.fromDate || isLoading}
        />
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={onSubmit}
          disabled={isLoading}
          className="inline-flex h-11 min-w-32 items-center justify-center rounded-lg bg-blue-600 px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Generating..." : "Submit"}
        </button>
      </div>
    </div>
  );
}