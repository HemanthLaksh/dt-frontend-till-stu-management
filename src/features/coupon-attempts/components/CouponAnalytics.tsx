"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  Eye,
  Search,
  RotateCcw,
  Download,
  UserRound,
} from "lucide-react";

import DatePicker from "@/components/ui/DatePicker/DatePicker";

import type { CouponCourse } from "../constants/couponAttempts.constants";

interface CouponAnalyticsProps {
  course: CouponCourse;
}

interface CouponStudent {
  studentID: number;
  studentName: string;
  mobileNo: string;
  email?: string;
  education?: string;
  college?: string;
  subscribedYN?: string;
  couponCodeUsed?: string;
  subscribedDate?: string;
  planName?: string;
}

/*
 * Temporary UI data.
 *
 * This will be replaced by the API response
 * once the Coupon Attempts service is connected.
 */
const DUMMY_STUDENTS: CouponStudent[] = [
  {
    studentID: 1001,
    studentName: "Arun Kumar",
    mobileNo: "9876543210",
    email: "arun.kumar@example.com",
    education: "MBBS",
    college: "AIIMS Delhi",
    subscribedYN: "Yes",
    couponCodeUsed: "NEET50",
    subscribedDate: "2026-09-02",
    planName: "NEET PG Premium",
  },
  {
    studentID: 1002,
    studentName: "Priya Sharma",
    mobileNo: "9876543211",
    email: "priya.sharma@example.com",
    education: "MBBS",
    college: "CMC Vellore",
    subscribedYN: "Yes",
    couponCodeUsed: "MED30",
    subscribedDate: "2026-09-05",
    planName: "NEET PG Standard",
  },
  {
    studentID: 1003,
    studentName: "Rahul Verma",
    mobileNo: "9876543212",
    email: "rahul.verma@example.com",
    education: "MBBS",
    college: "KGMU Lucknow",
    subscribedYN: "No",
    couponCodeUsed: "WELCOME20",
    subscribedDate: "2026-09-08",
    planName: "NEET PG Premium",
  },
  {
    studentID: 1004,
    studentName: "Sneha Reddy",
    mobileNo: "9876543213",
    email: "sneha.reddy@example.com",
    education: "MBBS",
    college: "Osmania Medical College",
    subscribedYN: "Yes",
    couponCodeUsed: "DOC40",
    subscribedDate: "2026-09-11",
    planName: "NEET PG Standard",
  },
  {
    studentID: 1005,
    studentName: "Vikram Singh",
    mobileNo: "9876543214",
    email: "vikram.singh@example.com",
    education: "MBBS",
    college: "Maulana Azad Medical College",
    subscribedYN: "Yes",
    couponCodeUsed: "SAVE25",
    subscribedDate: "2026-09-15",
    planName: "NEET PG Premium",
  },
  {
    studentID: 1006,
    studentName: "Anjali Nair",
    mobileNo: "9876543215",
    email: "anjali.nair@example.com",
    education: "MBBS",
    college: "Amrita Institute of Medical Sciences",
    subscribedYN: "No",
    couponCodeUsed: "MED20",
    subscribedDate: "2026-09-18",
    planName: "NEET PG Standard",
  },
];

export default function CouponAnalytics({
  course,
}: CouponAnalyticsProps) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [couponCode, setCouponCode] = useState("");

  const [search, setSearch] = useState("");

  const [students, setStudents] =
    useState<CouponStudent[]>(DUMMY_STUDENTS);

  const [hasSearched, setHasSearched] =
    useState(false);

  const [selectedStudent, setSelectedStudent] =
    useState<CouponStudent | null>(null);

  const [loading, setLoading] = useState(false);

  const isNeetPg = course.id === 1;

  /* =========================================
     FILTER STUDENTS
  ========================================= */

  const filteredStudents = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase();

    const couponValue = couponCode
      .trim()
      .toLowerCase();

    return students.filter((student) => {
      const matchesSearch =
        !searchValue ||
        student.studentName
          .toLowerCase()
          .includes(searchValue) ||
        String(student.studentID)
          .includes(searchValue) ||
        student.mobileNo.includes(
          searchValue
        ) ||
        student.email
          ?.toLowerCase()
          .includes(searchValue);

      const matchesCoupon =
        !couponValue ||
        student.couponCodeUsed
          ?.toLowerCase()
          .includes(couponValue);

      return (
        matchesSearch &&
        matchesCoupon
      );
    });
  }, [students, search, couponCode]);

  /* =========================================
     SEARCH
  ========================================= */

  const handleSearch = async () => {
    setHasSearched(true);

    setLoading(true);

    /*
     * API integration will go here through
     * useCouponAttempts().
     */

    await new Promise((resolve) =>
      setTimeout(resolve, 400)
    );

    setLoading(false);
  };

  /* =========================================
     CLEAR
  ========================================= */

  const handleClear = () => {
    setFromDate("");
    setToDate("");
    setCouponCode("");
    setSearch("");

    setHasSearched(false);

    setStudents(DUMMY_STUDENTS);
  };

  /* =========================================
     DOWNLOAD
  ========================================= */

  const handleDownload = () => {
    /*
     * The old PHP page generates/downloads
     * a coupon report.
     *
     * This will be connected to the actual
     * backend report endpoint.
     */
    console.info(
      "Coupon report download requested",
      {
        courseId: course.id,
        fromDate,
        toDate,
        couponCode,
      }
    );
  };

  return (
    <div className="space-y-6">
      {/* =========================================
          COURSE HEADER
      ========================================= */}

      <section className="overflow-visible rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-blue-50 px-6 py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                {course.name}
              </p>

              <h2 className="mt-1 text-lg font-semibold text-slate-900">
                Coupon Analytics
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Search and view coupon attempts for{" "}
                {course.name}.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-white px-3 py-2">
              <CalendarDays
                size={16}
                className="text-blue-600"
              />

              <span className="text-xs font-medium text-slate-600">
                Course ID: {course.id}
              </span>
            </div>
          </div>
        </div>

        {/* =========================================
            FILTERS
        ========================================= */}

        <div className="p-6">
          <div
            className={`grid grid-cols-1 gap-5 ${
              isNeetPg
                ? "lg:grid-cols-3"
                : "lg:grid-cols-3"
            }`}
          >
            {/* FROM DATE */}

            <DatePicker
              label="From Date"
              value={fromDate}
              onChange={(value) => {
                setFromDate(value);

                if (
                  toDate &&
                  value > toDate
                ) {
                  setToDate("");
                }
              }}
              disabled={loading}
            />

            {/* TO DATE */}

            <DatePicker
              label="To Date"
              value={toDate}
              onChange={setToDate}
              minDate={fromDate}
              disabled={loading}
            />

            {/* SEARCH BUTTON */}

            <div className="flex items-end">
              <button
                type="button"
                onClick={handleSearch}
                disabled={loading}
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
              >
                <Search size={17} />

                {loading
                  ? "Searching..."
                  : "Search"}
              </button>
            </div>
          </div>

          {/* =========================================
              ACTIONS
          ========================================= */}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleClear}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RotateCcw size={16} />

              Clear
            </button>

            <button
              type="button"
              onClick={handleDownload}
              disabled={
                loading ||
                filteredStudents.length === 0
              }
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Download size={16} />

              Download Report
            </button>
          </div>
        </div>
      </section>

      {/* =========================================
          SEARCH BAR
      ========================================= */}

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Coupon Attempt Records
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredStudents.length}{" "}
              records found
            </p>
          </div>

          <div className="relative w-full sm:w-80">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search student..."
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 hover:bg-white focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
            />
          </div>
        </div>

        {/* =========================================
            TABLE
        ========================================= */}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Sl No
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Student ID
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Name
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Mobile No.
                </th>

                {isNeetPg ? (
                  <>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Email
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Education
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      College
                    </th>
                  </>
                ) : (
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Subscribed
                  </th>
                )}

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Coupon Report
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td
                    colSpan={
                      isNeetPg
                        ? 8
                        : 6
                    }
                    className="px-6 py-16 text-center"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

                      <p className="mt-3 text-sm font-medium text-slate-600">
                        Loading coupon attempts...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : filteredStudents.length ===
                0 ? (
                <tr>
                  <td
                    colSpan={
                      isNeetPg
                        ? 8
                        : 6
                    }
                    className="px-6 py-16 text-center"
                  >
                    <div className="mx-auto flex max-w-sm flex-col items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                        <Search size={21} />
                      </div>

                      <h3 className="mt-4 text-sm font-semibold text-slate-800">
                        No records found
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Try changing your filters
                        or search criteria.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredStudents.map(
                  (
                    student,
                    index
                  ) => (
                    <tr
                      key={
                        student.studentID
                      }
                      className="transition-colors hover:bg-blue-50/40"
                    >
                      {/* SL NO */}

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                        {index + 1}
                      </td>

                      {/* STUDENT ID */}

                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-700">
                        {student.studentID}
                      </td>

                      {/* NAME */}

                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                            <UserRound
                              size={15}
                            />
                          </div>

                          <span className="text-sm font-medium text-slate-800">
                            {
                              student.studentName
                            }
                          </span>
                        </div>
                      </td>

                      {/* MOBILE */}

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                        {student.mobileNo}
                      </td>

                      {/* NEET PG FIELDS */}

                      {isNeetPg ? (
                        <>
                          <td className="px-6 py-4 text-sm text-slate-600">
                            {student.email ||
                              "—"}
                          </td>

                          <td className="px-6 py-4 text-sm text-slate-600">
                            {student.education ||
                              "—"}
                          </td>

                          <td className="px-6 py-4 text-sm text-slate-600">
                            {student.college ||
                              "—"}
                          </td>
                        </>
                      ) : (
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                              student.subscribedYN ===
                              "Yes"
                                ? "bg-green-50 text-green-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {student.subscribedYN ||
                              "No"}
                          </span>
                        </td>
                      )}

                      {/* REPORT */}

                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedStudent(
                              student
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-100"
                        >
                          <Eye size={15} />

                          View
                        </button>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================
          COUPON REPORT MODAL
      ========================================= */}

      {selectedStudent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                  Coupon Report
                </p>

                <h3 className="mt-1 text-lg font-semibold text-slate-900">
                  {
                    selectedStudent.studentName
                  }
                </h3>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedStudent(
                    null
                  )
                }
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <span className="text-xl leading-none">
                  ×
                </span>
              </button>
            </div>

            {/* MODAL CONTENT */}

            <div className="space-y-4 p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-500">
                    Student ID
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {
                      selectedStudent.studentID
                    }
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-500">
                    Mobile
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {
                      selectedStudent.mobileNo
                    }
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 p-4">
                <p className="text-xs font-medium text-slate-500">
                  Coupon Code
                </p>

                <p className="mt-1 text-sm font-semibold text-blue-600">
                  {selectedStudent.couponCodeUsed ||
                    "—"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Plan
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {selectedStudent.planName ||
                      "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Subscription Date
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {selectedStudent.subscribedDate ||
                      "—"}
                  </p>
                </div>
              </div>
            </div>

            {/* MODAL FOOTER */}

            <div className="flex justify-end border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                onClick={() =>
                  setSelectedStudent(
                    null
                  )
                }
                className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}