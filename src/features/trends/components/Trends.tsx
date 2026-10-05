"use client";

import { Bookmark } from "lucide-react";

import BackButton from "@/components/ui/BackButton/BackButton";

import TrendChart from "./TrendChart";
import TrendDateFilter from "./TrendDateFilter";
import TrendReportCard from "./TrendReportCard";

import { trendReportSections } from "../constants/trends";
import { useTrends } from "../hooks/useTrends";

export default function Trends() {
  const {
    selectedReport,
    generatedReport,
    fromDate,
    toDate,
    error,
    isLoading,
    selectReport,
    changeFromDate,
    changeToDate,
    generateReport,
    goBack,
  } = useTrends();

  return (
    <div className="space-y-6">

      {/* ------------------------------------------------------------------ */}
      {/* PAGE HEADER                                                        */}
      {/* ------------------------------------------------------------------ */}

      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Trends
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Select a report to view trend data.
        </p>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* REPORT SELECTION                                                   */}
      {/* ------------------------------------------------------------------ */}

      {!selectedReport && (
        <div className="space-y-7">
          {trendReportSections.map((section) => (
            <section
              key={section.id}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              {/* Section Header */}
              <div className="flex items-center gap-3 border-b border-blue-100 bg-blue-50/70 px-5 py-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                  <Bookmark size={18} />
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-700">
                    {section.title}
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-500">
                    {section.description}
                  </p>
                </div>
              </div>

              {/* Report Cards */}
              <div className="p-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {section.reports.map((report) => (
                    <TrendReportCard
                      key={report.id}
                      report={report}
                      onClick={selectReport}
                    />
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* SELECTED REPORT                                                    */}
      {/* ------------------------------------------------------------------ */}

      {selectedReport && (
        <div className="space-y-4">

          {/* Back Button */}
          <BackButton
            onClick={goBack}
            label="Back to Reports"
          />

          {/* Selected Report */}
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

            {/* Report Header */}
            <div className="border-b border-slate-200 bg-blue-50 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {selectedReport.title}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedReport.description}
                </p>
              </div>
            </div>

            {/* Date Filter */}
            <div className="p-5">
              <TrendDateFilter
                fromDate={fromDate}
                toDate={toDate}
                onFromDateChange={changeFromDate}
                onToDateChange={changeToDate}
                onGenerateReport={generateReport}
                error={error}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Chart */}
          {generatedReport && (
            <div>
              <TrendChart report={generatedReport} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}