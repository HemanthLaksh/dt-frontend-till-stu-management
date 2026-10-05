"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Search, X } from "lucide-react";

import DatePicker from "@/components/ui/DatePicker/DatePicker";
import Select from "@/components/ui/Select/Select";

import {
  BD_STATS_COURSES,
  BD_STATS_TABLE_COLUMNS,
  BD_STATS_TITLE,
} from "../constants/bdStats.constants";

import { useBDStats } from "../hooks/useBDStats";

export default function BDStats() {
  const {
    data,
    loading,
    error,
    fetchBDStats,
    clearBDStats,
  } = useBDStats();

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [courseId, setCourseId] = useState("");

  const [validationError, setValidationError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  /*
   * ---------------------------------------------------------
   * COURSE OPTIONS
   * ---------------------------------------------------------
   */

  const courseOptions = useMemo(
    () =>
      BD_STATS_COURSES.map((course) => ({
        value: course.value,
        label: course.label,
      })),
    [],
  );

  /*
   * ---------------------------------------------------------
   * SELECTED COURSE NAME
   * ---------------------------------------------------------
   */

  const selectedCourseName = useMemo(() => {
    return (
      BD_STATS_COURSES.find(
        (course) => course.value === courseId,
      )?.label ?? ""
    );
  }, [courseId]);

  /*
   * ---------------------------------------------------------
   * FILTER TABLE RESULTS
   * ---------------------------------------------------------
   */

  const filteredData = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) {
      return data;
    }

    return data.filter((item) => {
      return (
        item.bdName?.toLowerCase().includes(search) ||
        item.bdEmail?.toLowerCase().includes(search) ||
        item.courseName?.toLowerCase().includes(search)
      );
    });
  }, [data, searchTerm]);

  /*
   * ---------------------------------------------------------
   * FROM DATE CHANGE
   * ---------------------------------------------------------
   *
   * Same behavior we used on the older analytics screens:
   * when From Date is selected and To Date is empty,
   * initially copy the same date into To Date.
   */

  const handleFromDateChange = (value: string) => {
    setFromDate(value);

    if (!toDate) {
      setToDate(value);
    }

    setValidationError("");
  };

  /*
   * ---------------------------------------------------------
   * TO DATE CHANGE
   * ---------------------------------------------------------
   */

  const handleToDateChange = (value: string) => {
    setToDate(value);
    setValidationError("");
  };

  /*
   * ---------------------------------------------------------
   * COURSE CHANGE
   * ---------------------------------------------------------
   */

  const handleCourseChange = (value: string) => {
    setCourseId(value);
    setValidationError("");
  };

  /*
   * ---------------------------------------------------------
   * SUBMIT
   * ---------------------------------------------------------
   */

  const handleSubmit = async () => {
    setValidationError("");

    /*
     * Old PHP validation:
     *
     * No dates + no course
     * → Enter from and to dates or select any course
     */

    if (!fromDate && !toDate && !courseId) {
      setValidationError(
        "Enter from and to dates or select any course.",
      );

      return;
    }

    /*
     * Only one date entered
     * → Enter both dates
     */

    if (
      (fromDate && !toDate) ||
      (!fromDate && toDate)
    ) {
      setValidationError("Enter from and to dates.");

      return;
    }

    /*
     * Validate date order.
     */

    if (fromDate && toDate && fromDate > toDate) {
      setValidationError(
        "From Date cannot be later than To Date.",
      );

      return;
    }

    /*
     * Convert course ID to number.
     */

    const parsedCourseId = courseId
      ? Number(courseId)
      : null;

    await fetchBDStats({
      fromDate: fromDate || "",
      toDate: toDate || "",
      courseId: parsedCourseId,
    });
  };

  /*
   * ---------------------------------------------------------
   * CLEAR
   * ---------------------------------------------------------
   */

  const handleClear = () => {
    setFromDate("");
    setToDate("");
    setCourseId("");
    setSearchTerm("");
    setValidationError("");

    clearBDStats();
  };

  return (
    <div className="space-y-6">
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          {BD_STATS_TITLE}
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View business development access and conversion
          statistics.
        </p>
      </div>

      {/* =====================================================
          FILTER CARD
      ====================================================== */}

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Section Header */}

        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">
            BD Stats
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Select a date range, a course, or both to view
            statistics.
          </p>
        </div>

        {/* Filters */}

        <div className="p-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {/* From Date */}

            <DatePicker
              label="From Date"
              value={fromDate}
              onChange={handleFromDateChange}
            />

            {/* To Date */}

            <DatePicker
              label="To Date"
              value={toDate}
              onChange={handleToDateChange}
            />

            {/* Course */}

            <Select
              label="Course"
              value={courseId}
              options={courseOptions}
              placeholder="Select course"
              onChange={handleCourseChange}
            />

            {/* Search */}

            <div>
              <label
                htmlFor="bd-stats-search"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Search Results
              </label>

              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  id="bd-stats-search"
                  type="text"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                  placeholder="Search BD, email or course..."
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Validation Error */}

          {validationError && (
            <div className="mt-5 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />

              <p className="text-sm font-medium text-red-700">
                {validationError}
              </p>
            </div>
          )}

          {/* API Error */}

          {error && (
            <div className="mt-5 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />

              <p className="text-sm font-medium text-red-700">
                {error}
              </p>
            </div>
          )}

          {/* Buttons */}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Loading..." : "Submit"}
            </button>

            <button
              type="button"
              onClick={handleClear}
              disabled={loading}
              className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Clear
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          RESULTS
      ====================================================== */}

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Results Header */}

        <div className="border-b border-slate-200 px-6 py-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                BD Stats
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {loading
                  ? "Loading statistics..."
                  : filteredData.length > 0
                    ? `${filteredData.length} result${
                        filteredData.length === 1
                          ? ""
                          : "s"
                      } found`
                    : "No results loaded"}
              </p>
            </div>

            {/* Selected Filters */}

            {(selectedCourseName ||
              (fromDate && toDate)) && (
              <div className="flex flex-wrap gap-2">
                {selectedCourseName && (
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    {selectedCourseName}
                  </span>
                )}

                {fromDate && toDate && (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    {fromDate} → {toDate}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ===================================================
            LOADING
        ==================================================== */}

        {loading && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

              <p className="mt-4 text-sm font-medium text-slate-500">
                Loading BD statistics...
              </p>
            </div>
          </div>
        )}

        {/* ===================================================
            EMPTY
        ==================================================== */}

        {!loading &&
          !error &&
          filteredData.length === 0 && (
            <div className="flex min-h-[300px] items-center justify-center px-6">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>

                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  No Records Found
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Select a course or date range and click
                  Submit.
                </p>
              </div>
            </div>
          )}

        {/* ===================================================
            TABLE
        ==================================================== */}

        {!loading &&
          !error &&
          filteredData.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-[900px] w-full">
                <thead>
                  {/* Dynamic Result Title */}

                  <tr>
                    <th
                      colSpan={6}
                      className="border-b border-slate-200 bg-blue-50 px-5 py-4 text-center text-sm font-semibold text-slate-800"
                    >
                      BD Stats For{" "}

                      {selectedCourseName && (
                        <span>
                          {selectedCourseName}
                        </span>
                      )}

                      {selectedCourseName &&
                        fromDate &&
                        toDate && (
                          <span> </span>
                        )}

                      {fromDate && toDate && (
                        <span>
                          between {fromDate} and{" "}
                          {toDate}
                        </span>
                      )}
                    </th>
                  </tr>

                  {/* Column Headers */}

                  <tr className="border-b border-slate-200 bg-slate-50">
                    {BD_STATS_TABLE_COLUMNS.map(
                      (column) => (
                        <th
                          key={column}
                          className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                        >
                          {column}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredData.map((item, index) => (
                    <tr
                      key={`${item.bdEmail}-${item.courseName}-${index}`}
                      className="transition hover:bg-slate-50"
                    >
                      {/* Sl No */}

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {index + 1}
                      </td>

                      {/* BD Name */}

                      <td className="px-5 py-4 text-sm font-medium text-slate-800">
                        {item.bdName || "-"}
                      </td>

                      {/* BD Email */}

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {item.bdEmail || "-"}
                      </td>

                      {/* Course */}

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {item.courseName || "-"}
                      </td>

                      {/* Total Access Given */}

                      <td className="px-5 py-4 text-sm font-medium text-slate-800">
                        {item.totalAccessGiven ?? 0}
                      </td>

                      {/* Total Converted */}

                      <td className="px-5 py-4 text-sm font-medium text-slate-800">
                        {item.totalConverted ?? 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        {/* Results Footer */}

        {!loading &&
          !error &&
          filteredData.length > 0 && (
            <div className="border-t border-slate-200 bg-slate-50 px-6 py-3">
              <p className="text-xs text-slate-500">
                Showing {filteredData.length} of{" "}
                {data.length} result
                {data.length === 1 ? "" : "s"}.
              </p>
            </div>
          )}
      </section>
    </div>
  );
}