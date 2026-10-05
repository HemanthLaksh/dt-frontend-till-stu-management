"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Search, X } from "lucide-react";

import Link from "next/link";

import DatePicker from "@/components/ui/DatePicker/DatePicker";

import { useVideosViewAnalytics } from "../hooks/useVideosViewAnalytics";

import {
  VIDEOS_VIEW_ANALYTICS_TABLE_COLUMNS,
  VIDEOS_VIEW_ANALYTICS_TITLE,
  VIDEOS_VIEW_REPORT_TITLE,
} from "../constants/videosViewAnalytics.constants";

import StudentProfileModal from "./StudentProfileModal";
import VideoViewDetailsModal from "./VideoViewDetailsModal";

import type {
  VideosViewAnalyticsItem,
} from "../types/videosViewAnalytics.types";

export default function VideosViewAnalytics() {
  const {
    data,
    loading,
    error,
    fetchAnalytics,
    clearAnalytics,
  } = useVideosViewAnalytics();

  const [studentId, setStudentId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedStudent, setSelectedStudent] =
    useState<VideosViewAnalyticsItem | null>(null);

  const [selectedVideo, setSelectedVideo] =
    useState<VideosViewAnalyticsItem["videosView"] | null>(
      null,
    );

  /*
   * The old page automatically loaded analytics
   * when the page opened.
   */
  useEffect(() => {
    fetchAnalytics({
      studentid: "",
      fdate: "",
      tdate: "",
    });
  }, [fetchAnalytics]);

  /*
   * Local search.
   */
  const filteredData = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) {
      return data;
    }

    return data.filter((item) => {
      return (
        String(item.studentID)
          .toLowerCase()
          .includes(search) ||
        item.studentName
          ?.toLowerCase()
          .includes(search) ||
        item.mobileNo
          ?.toLowerCase()
          .includes(search) ||
        item.videosView?.videoName
          ?.toLowerCase()
          .includes(search) ||
        item.videosView?.videoSubject
          ?.toLowerCase()
          .includes(search) ||
        item.videosView?.videoTopic
          ?.toLowerCase()
          .includes(search)
      );
    });
  }, [data, searchTerm]);

  /*
   * Submit filters.
   */
  const handleSubmit = async () => {
    /*
     * Student ID has priority.
     */
    if (studentId.trim()) {
      await fetchAnalytics({
        studentid: studentId.trim(),
        fdate: "",
        tdate: "",
      });

      return;
    }

    /*
     * Date range.
     */
    if (fromDate && toDate) {
      await fetchAnalytics({
        studentid: "",
        fdate: fromDate,
        tdate: toDate,
      });

      return;
    }

    /*
     * No filters.
     */
    await fetchAnalytics({
      studentid: "",
      fdate: "",
      tdate: "",
    });
  };

  /*
   * Clear filters and reload default data.
   */
  const handleClear = () => {
    setStudentId("");
    setFromDate("");
    setToDate("");
    setSearchTerm("");

    clearAnalytics();

    fetchAnalytics({
      studentid: "",
      fdate: "",
      tdate: "",
    });
  };

  /*
   * Match the old page behavior:
   * selecting From Date initially sets To Date
   * to the same date.
   */
  const handleFromDateChange = (value: string) => {
    setFromDate(value);

    if (!toDate) {
      setToDate(value);
    }
  };

  return (
    <div className="space-y-6">
      {/* ===================================================== */}
      {/* PAGE HEADER                                           */}
      {/* ===================================================== */}

      <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {VIDEOS_VIEW_ANALYTICS_TITLE}
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              View student video viewing activity and details.
            </p>
          </div>

          <Link
            href="/analytics"
            className="inline-flex h-10 items-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
        </div>

      {/* ===================================================== */}
      {/* FILTER CARD                                           */}
      {/* ===================================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-900">
            {VIDEOS_VIEW_REPORT_TITLE}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Search video view analytics using Student ID or a
            date range.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {/* Student ID */}
          <div>
            <label
              htmlFor="videos-view-student-id"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Student ID
            </label>

            <input
              id="videos-view-student-id"
              type="text"
              value={studentId}
              onChange={(event) =>
                setStudentId(event.target.value)
              }
              placeholder="Enter Student ID"
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* From Date */}
          <div>
            <DatePicker
              label="From Date"
              value={fromDate}
              onChange={handleFromDateChange}
            />
          </div>

          {/* To Date */}
          <div>
            <DatePicker
              label="To Date"
              value={toDate}
              onChange={setToDate}
            />
          </div>

          {/* Search */}
          <div>
            <label
              htmlFor="videos-view-search"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Search Results
            </label>

            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                id="videos-view-search"
                type="text"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder="Search results..."
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

        {studentId && (fromDate || toDate) && (
          <p className="mt-3 text-xs text-slate-500">
            Student ID search takes priority over the date range.
          </p>
        )}
      </div>

      {/* ===================================================== */}
      {/* RESULTS CARD                                          */}
      {/* ===================================================== */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Results Header */}
        <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Videos View Analytics
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {loading
                ? "Loading analytics..."
                : `${filteredData.length} result${
                    filteredData.length === 1
                      ? ""
                      : "s"
                  } found`}
            </p>
          </div>

          {searchTerm && !loading && (
            <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              Searching: {searchTerm}
            </div>
          )}
        </div>

        {/* =================================================== */}
        {/* LOADING                                             */}
        {/* =================================================== */}

        {loading && (
          <div className="flex min-h-64 items-center justify-center px-6 py-12">
            <div className="flex flex-col items-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

              <p className="mt-4 text-sm font-medium text-slate-600">
                Loading Videos View Analytics...
              </p>
            </div>
          </div>
        )}

        {/* =================================================== */}
        {/* ERROR                                               */}
        {/* =================================================== */}

        {!loading && error && (
          <div className="flex min-h-64 items-center justify-center px-6 py-12">
            <div className="max-w-md text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
                <X className="h-6 w-6" />
              </div>

              <h3 className="mt-4 text-base font-semibold text-slate-900">
                Unable to load analytics
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {error}
              </p>

              <button
                type="button"
                onClick={handleSubmit}
                className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* =================================================== */}
        {/* EMPTY                                               */}
        {/* =================================================== */}

        {!loading &&
          !error &&
          filteredData.length === 0 && (
            <div className="flex min-h-64 items-center justify-center px-6 py-12">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>

                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  No analytics found
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Try changing your filters or search term.
                </p>
              </div>
            </div>
          )}

        {/* =================================================== */}
        {/* TABLE                                                */}
        {/* =================================================== */}

        {!loading &&
          !error &&
          filteredData.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-[900px] w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    {VIDEOS_VIEW_ANALYTICS_TABLE_COLUMNS.map(
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
                  {filteredData.map((student, index) => (
                    <tr
                      key={`${student.studentID}-${index}`}
                      className="transition hover:bg-slate-50"
                    >
                      {/* Sl No */}
                      <td className="px-5 py-4 text-sm text-slate-600">
                        {index + 1}
                      </td>

                      {/* Student ID */}
                      <td className="px-5 py-4 text-sm font-medium text-slate-800">
                        {student.studentID}
                      </td>

                      {/* Name */}
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedStudent(student)
                          }
                          className="text-left text-sm font-semibold text-blue-600 transition hover:text-blue-800 hover:underline"
                        >
                          {student.studentName || "-"}
                        </button>
                      </td>

                      {/* Mobile */}
                      <td className="px-5 py-4 text-sm text-slate-600">
                        {student.mobileNo || "-"}
                      </td>

                      {/* Subscribed */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                            student.subscribedYN?.toLowerCase() ===
                            "y"
                              ? "bg-green-50 text-green-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {student.subscribedYN?.toLowerCase() ===
                          "y"
                            ? "Yes"
                            : "No"}
                        </span>
                      </td>

                      {/* Video View */}
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedVideo(
                              student.videosView ?? null,
                            )
                          }
                          disabled={!student.videosView}
                          className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
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

        {/* Footer */}
        {!loading &&
          !error &&
          filteredData.length > 0 && (
            <div className="border-t border-slate-200 bg-slate-50 px-6 py-3">
              <p className="text-xs text-slate-500">
                Showing {filteredData.length} of {data.length}{" "}
                result
                {data.length === 1 ? "" : "s"}.
              </p>
            </div>
          )}
      </div>

      {/* ===================================================== */}
      {/* STUDENT PROFILE MODAL                                  */}
      {/* ===================================================== */}

      <StudentProfileModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />

      {/* ===================================================== */}
      {/* VIDEO VIEW DETAILS MODAL                               */}
      {/* ===================================================== */}

      <VideoViewDetailsModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
}