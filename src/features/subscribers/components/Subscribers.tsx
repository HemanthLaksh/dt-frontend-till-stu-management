"use client";

import {
  Bookmark,
  Users,
} from "lucide-react";

import SubscriberFilters from "./SubscriberFilters";
import SubscriberReportResult from "./SubscriberReportResult";

import {
  SUBSCRIBER_REPORT_TYPES,
} from "../constants/subscribers.constants";

import useSubscribers from "../hooks/useSubscribers";
import { getSubscriberReportTitle } from "../utils/subscribers.utils";

export default function Subscribers() {
  const {
    reportType,
    filters,
    result,
    error,
    isLoading,
    selectReportType,
    updateFilter,
    generateReport,
  } = useSubscribers();

  const title = reportType
    ? getSubscriberReportTitle(reportType)
    : "Subscribers Report Download";

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Subscribers
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Generate and download subscriber reports by status,
          business type, course, and date range.
        </p>
      </div>

      {/* Main card */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-blue-100 bg-blue-50/70 px-5 py-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
            <Bookmark size={19} />
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-800">
              {title}
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Select subscriber status and generate the required report.
            </p>
          </div>
        </div>

        <div className="p-6">
          {/* Report type */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <Users
                size={17}
                className="text-blue-600"
              />

              <h3 className="text-sm font-semibold text-slate-700">
                Subscriber Status
              </h3>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() =>
                  selectReportType(
                    SUBSCRIBER_REPORT_TYPES.ACTIVE,
                  )
                }
                className={`h-11 rounded-lg border px-5 text-sm font-semibold transition-all duration-200 ${
                  reportType ===
                  SUBSCRIBER_REPORT_TYPES.ACTIVE
                    ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                Active
              </button>

              <button
                type="button"
                onClick={() =>
                  selectReportType(
                    SUBSCRIBER_REPORT_TYPES.INACTIVE,
                  )
                }
                className={`h-11 rounded-lg border px-5 text-sm font-semibold transition-all duration-200 ${
                  reportType ===
                  SUBSCRIBER_REPORT_TYPES.INACTIVE
                    ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                In-Active
              </button>
            </div>
          </div>

          {/* Filters */}
          {reportType && (
            <SubscriberFilters
              filters={filters}
              onChange={updateFilter}
              onSubmit={generateReport}
              isLoading={isLoading}
              error={error}
            />
          )}

          {/* Result */}
          <SubscriberReportResult result={result} />
        </div>
      </section>
    </div>
  );
}