"use client";

import { useState } from "react";
import { ChartNoAxesCombined, LoaderCircle } from "lucide-react";

import Select from "@/components/ui/Select/Select";
import BackButton from "@/components/ui/BackButton/BackButton";
import ModuleLoading from "@/components/ui/ModuleLoading/ModuleLoading";

import TrendDateFilter from "./TrendDateFilter";
import TrendReportCard from "./TrendReportCard";
import TrendChart from "./TrendChart";

import { trendReportSections } from "../constants/trends";
import { useTrends } from "../hooks/useTrends";

export default function Trends() {
  const [selectedSectionId, setSelectedSectionId] = useState("neet-pg");

  const {
    selectedReport,
    generatedReport,
    fromDate,
    toDate,
    state,
    error,
    isModuleLoading,
    isGeneratingReport,
    selectReport,
    changeFromDate,
    changeToDate,
    changeState,
    clearFilters,
    generateReport,
    goBack,
  } = useTrends();

  const selectedSection = trendReportSections.find(
    (section) => section.id === selectedSectionId,
  );

  const showStateFilter = selectedReport?.id.endsWith("-state-wise") ?? false;

  const isCollegeWiseReport = selectedReport?.id.endsWith("-college") ?? false;

  const handleSectionChange = (sectionId: string) => {
    setSelectedSectionId(sectionId);
    goBack();
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <ChartNoAxesCombined size={23} />
        </div>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Trends
          </h1>
        </div>
      </div>

      {/* Module / Section Loading */}
      {isModuleLoading ? (
        <ModuleLoading
          moduleName={
            selectedReport ? `${selectedReport.title} Report` : "Trends"
          }
        />
      ) : (
        <>
          {/* Trend Report Selection */}
          {!selectedReport && (
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="space-y-5">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    Generate Trend Reports
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Select a course or Plan Orders to view the available trend
                    reports.
                  </p>
                </div>

                {/* Course / Plan Orders Dropdown */}
                <div className="max-w-md">
                  <Select
                    label="Course"
                    value={selectedSectionId}
                    options={trendReportSections.map((section) => ({
                      label: section.title,
                      value: section.id,
                    }))}
                    placeholder="Select a course"
                    onChange={handleSectionChange}
                  />
                </div>

                {/* Available Reports */}
                {selectedSection && (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {selectedSection.reports.map((report) => (
                      <TrendReportCard
                        key={report.id}
                        report={report}
                        onClick={selectReport}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Selected Report */}
          {selectedReport && (
            <div className="space-y-4">
              <BackButton onClick={goBack} label="Back to Reports" />

              {/* Report Header and Filters */}
              {!isCollegeWiseReport && (
                <div className="rounded-xl border border-slate-200 bg-white shadow-md">
                  <div className="border-b border-slate-200 bg-blue-50 px-6 py-5">
                    <h2 className="text-lg font-semibold text-slate-900">
                      {selectedReport.title}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {selectedReport.description}
                    </p>
                  </div>

                  <div className="p-5">
                    <TrendDateFilter
                      fromDate={fromDate}
                      toDate={toDate}
                      onFromDateChange={changeFromDate}
                      onToDateChange={changeToDate}
                      onGenerateReport={generateReport}
                      error={error}
                      disabled={isGeneratingReport}
                      state={state}
                      onStateChange={changeState}
                      showStateFilter={showStateFilter}
                      onClear={clearFilters}
                    />
                  </div>
                </div>
              )}

              {/* Report Generation Loading / Results */}
              {isGeneratingReport ? (
                <div
                  className="flex min-h-[250px] items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white p-6"
                  role="status"
                  aria-live="polite"
                >
                  <LoaderCircle
                    size={24}
                    className="animate-spin text-blue-600"
                  />

                  <span className="text-sm font-medium text-slate-600">
                    Generating report...
                  </span>
                </div>
              ) : (
                generatedReport && (
                  <TrendChart report={generatedReport} selectedState={state} />
                )
              )}

              {/* Error Message */}
              {error && !generatedReport && !isGeneratingReport && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600"
                >
                  {error}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
