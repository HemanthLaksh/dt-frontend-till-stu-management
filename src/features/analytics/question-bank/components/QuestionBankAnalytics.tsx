"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  Search,
  RotateCcw,
} from "lucide-react";

import Link from "next/link";

import DatePicker from "@/components/ui/DatePicker/DatePicker";

import { useQuestionBankAnalytics } from "../hooks/useQuestionBankAnalytics";

import type {
  QuestionBankAnalyticsItem,
  QuestionBankAnalyticsRequest,
} from "../types/questionBankAnalytics.types";

import StudentProfileModal from "./StudentProfileModal";
import ModuleDetailsModal from "./ModuleDetailsModal";

export default function QuestionBankAnalytics() {
  const [studentId, setStudentId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [search, setSearch] = useState("");

  const [selectedStudent, setSelectedStudent] =
    useState<QuestionBankAnalyticsItem | null>(null);

  const [selectedModule, setSelectedModule] =
    useState<QuestionBankAnalyticsItem["module"] | null>(null);

  const {
    data,
    loading,
    error,
    fetchAnalytics,
    clearAnalytics,
  } = useQuestionBankAnalytics();

  const filteredData = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) {
      return data;
    }

    return data.filter((item) =>
      [
        item.studentID,
        item.studentName,
        item.mobileNo,
        item.subscribedYN,
        item.module?.moduleName,
        item.module?.topicName,
        item.module?.subjectName,
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchValue),
    );
  }, [data, search]);

  const handleSubmit = async () => {
    const request: QuestionBankAnalyticsRequest = {
      studentid: studentId.trim(),
      fdate: fromDate,
      tdate: toDate,
    };

    await fetchAnalytics(request);
  };

  const handleClear = () => {
    setStudentId("");
    setFromDate("");
    setToDate("");
    setSearch("");
    clearAnalytics();
  };

  const handleFromDateChange = (value: string) => {
    setFromDate(value);

    // The old implementation automatically set To Date
    // equal to From Date when From Date was selected.
    if (!toDate) {
      setToDate(value);
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <BarChart3
                size={22}
                className="text-blue-600"
              />
            </div>

            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                Question Bank Analytics
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                View student Question Bank activity and module performance.
              </p>
            </div>
          </div>

          <Link
            href="/analytics"
            className="inline-flex h-10 items-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:self-auto"
          >
            <ArrowLeft size={16} />

            Back
          </Link>
        </div>

        {/* Filters */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-slate-900">
              Module Report
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Search analytics by student or date range.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {/* Student ID */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Student ID
              </label>

              <input
                type="text"
                value={studentId}
                onChange={(event) =>
                  setStudentId(event.target.value)
                }
                placeholder="Enter Student ID"
                disabled={loading}
                className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 disabled:bg-slate-100"
              />
            </div>

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
              minDate={fromDate || undefined}
              onChange={setToDate}
            />

            {/* Search button */}
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Search size={17} />

                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>

          <div className="mt-5 flex justify-end border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={handleClear}
              disabled={loading}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              <RotateCcw size={16} />

              Clear
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Results */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Analytics Module
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {filteredData.length} record
                  {filteredData.length !== 1 ? "s" : ""}
                </p>
              </div>

              {data.length > 0 && (
                <div className="relative w-full md:w-72">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search results..."
                    className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-72 flex-col items-center justify-center">
              <div className="h-9 w-9 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

              <p className="mt-4 text-sm text-slate-500">
                Loading analytics...
              </p>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                <BarChart3
                  size={26}
                  className="text-slate-400"
                />
              </div>

              <h3 className="mt-4 text-base font-semibold text-slate-800">
                No Records Found
              </h3>

              <p className="mt-1 max-w-md text-sm text-slate-500">
                No Question Bank analytics records match the
                selected criteria.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-[900px] w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Sl No.
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Student ID
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Name
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Mobile No.
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Subscribed
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Module
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredData.map((item, index) => (
                    <tr
                      key={`${item.studentID}-${index}`}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-4 text-sm text-slate-600">
                        {index + 1}
                      </td>

                      <td className="px-5 py-4 text-sm font-medium text-slate-900">
                        {item.studentID}
                      </td>

                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedStudent(item)
                          }
                          className="text-left text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                        >
                          {item.studentName}
                        </button>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {item.mobileNo}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            item.subscribedYN === "Y"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {item.subscribedYN === "Y"
                            ? "Yes"
                            : "No"}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedModule(item.module)
                          }
                          className="inline-flex h-9 items-center rounded-lg bg-blue-600 px-4 text-xs font-medium text-white transition hover:bg-blue-700"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Student Profile */}
      {selectedStudent && (
        <StudentProfileModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}

      {/* Module Details */}
      {selectedModule && (
        <ModuleDetailsModal
          module={selectedModule}
          onClose={() => setSelectedModule(null)}
        />
      )}
    </>
  );
}