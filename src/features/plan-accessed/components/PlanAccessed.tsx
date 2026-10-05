"use client";

import { useState } from "react";
import {
  CreditCard,
  Download,
  Loader2,
  RotateCcw,
} from "lucide-react";

import DatePicker from "@/components/ui/DatePicker/DatePicker";

import { PLAN_ACCESSED_COURSES } from "../constants/planAccessed.constants";
import { usePlanAccessed } from "../hooks/usePlanAccessed";

export default function PlanAccessed() {
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(
    null
  );

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [showReportForm, setShowReportForm] = useState(false);

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { loading, result, error, fetchReport } = usePlanAccessed();

  /*
   * Temporary admin ID.
   *
   * This will later be replaced with the
   * authenticated admin ID from the auth state.
   */
  const adminId = 1;

  const selectedCourse = PLAN_ACCESSED_COURSES.find(
    (course) => course.id === selectedCourseId
  );

  /* =========================================
     COURSE SELECTION
  ========================================= */

  const handleCourseSelect = (courseId: number) => {
    setSelectedCourseId(courseId);

    setFromDate("");
    setToDate("");

    setHasSubmitted(false);

    setShowReportForm(true);
  };

  /* =========================================
     SUBMIT REPORT
  ========================================= */

  const handleSubmit = async () => {
    setHasSubmitted(true);

    if (!fromDate || !toDate || !selectedCourseId) {
      return;
    }

    await fetchReport(
      adminId,
      selectedCourseId,
      fromDate,
      toDate
    );
  };

  /* =========================================
     BACK
  ========================================= */

  const handleBack = () => {
    setShowReportForm(false);

    setSelectedCourseId(null);

    setFromDate("");
    setToDate("");

    setHasSubmitted(false);
  };

  /* =========================================
     RENDER
  ========================================= */

  return (
    <div className="space-y-6">
      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div>
        {/* <p className="text-sm font-medium text-blue-600">
          Analytics & Reports
        </p> */}

        <h1 className="mt-1 text-2xl font-semibold text-slate-900">
          Plan Accessed
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Generate plan accessed student reports by course and date range.
        </p>
      </div>

      {/* =========================================
          COURSE SELECTION
      ========================================= */}

      {!showReportForm && (
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {/* HEADER */}

          <div className="border-b border-slate-200 bg-blue-50 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                <CreditCard size={20} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Plan Accessed Students
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Select a course to generate the report.
                </p>
              </div>
            </div>
          </div>

          {/* COURSE CARDS */}

          <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {PLAN_ACCESSED_COURSES.map((course) => (
              <button
                key={course.id}
                type="button"
                onClick={() => handleCourseSelect(course.id)}
                className="group rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md"
              >
                {/* ICON */}

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors group-hover:bg-blue-100 group-hover:text-blue-600">
                  <CreditCard size={21} />
                </div>

                {/* COURSE NAME */}

                <h3 className="mt-4 text-sm font-semibold text-slate-800">
                  {course.name}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Plan Accessed Students
                </p>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* =========================================
          REPORT FORM
      ========================================= */}

      {showReportForm && selectedCourse && (
        <section className="overflow-visible rounded-xl border border-slate-200 bg-white shadow-sm">
          {/* =========================================
              REPORT HEADER
          ========================================= */}

          <div className="border-b border-slate-200 bg-blue-50 px-6 py-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* TITLE */}

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
                  {selectedCourse.name}
                </p>

                <h2 className="mt-1 text-lg font-semibold text-slate-900">
                  Plan Accessed Students Report
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Select a date range to generate the report.
                </p>
              </div>

              {/* BACK */}

              <button
                type="button"
                onClick={handleBack}
                disabled={loading}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <RotateCcw size={16} />

                Back
              </button>
            </div>
          </div>

          {/* =========================================
              FILTER AREA
          ========================================= */}

          <div className="p-6">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
              {/* =====================================
                  FROM DATE
              ===================================== */}

              <DatePicker
                label="From Date"
                value={fromDate}
                onChange={(value) => {
                  setFromDate(value);

                  /*
                   * If the new From Date becomes
                   * later than the existing To Date,
                   * clear the To Date.
                   */
                  if (toDate && value > toDate) {
                    setToDate("");
                  }

                  setHasSubmitted(false);
                }}
                disabled={loading}
              />

              {/* =====================================
                  TO DATE
              ===================================== */}

              <DatePicker
                label="To Date"
                value={toDate}
                onChange={(value) => {
                  setToDate(value);
                  setHasSubmitted(false);
                }}
                minDate={fromDate}
                disabled={loading}
              />

              {/* =====================================
                  SUBMIT
              ===================================== */}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={
                  loading ||
                  !fromDate ||
                  !toDate
                }
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none lg:w-auto"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />

                    Generating...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>

            {/* =========================================
                VALIDATION
            ========================================= */}

            {hasSubmitted &&
              (!fromDate || !toDate) && (
                <p className="mt-3 text-sm font-medium text-red-500">
                  Select From Date and To Date.
                </p>
              )}

            {/* =========================================
                ERROR
            ========================================= */}

            {error && (
              <div className="mt-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-red-700">
                    Report generation failed
                  </p>

                  <p className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                </div>
              </div>
            )}

            {/* =========================================
                SUCCESS
            ========================================= */}

            {result?.status !== "N" &&
              result?.reportPath && (
                <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    {/* SUCCESS MESSAGE */}

                    <div>
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                          ✓
                        </div>

                        <h3 className="text-sm font-semibold text-green-800">
                          Report generated successfully
                        </h3>
                      </div>

                      <p className="mt-2 text-sm text-green-700">
                        Your Plan Accessed Students report is ready.
                      </p>
                    </div>

                    {/* DOWNLOAD */}

                    <a
                      href={result.reportPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-700 hover:shadow-md"
                    >
                      <Download size={17} />

                      Download Report
                    </a>
                  </div>
                </div>
              )}
          </div>
        </section>
      )}
    </div>
  );
}