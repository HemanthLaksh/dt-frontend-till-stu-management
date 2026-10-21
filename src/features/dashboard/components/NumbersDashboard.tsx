"use client";

import { useEffect, useState } from "react";
import {
  GraduationCap,
  Stethoscope,
  HeartPulse,
  BookOpen,
  Smartphone,
  Globe,
  Users,
  CalendarDays,
  ChartNoAxesCombined,
  MailCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Card from "@/components/ui/Card/Card";
import DatePicker from "@/components/ui/DatePicker/DatePicker";
import Button from "@/components/ui/Button/Button";
import Select from "@/components/ui/Select/Select";
import RegistrationOverview from "./RegistrationOverview";
import SessionOverview from "./SessionOverview";
import {
  fetchFastApiDashboard,
  fetchFastApiStudentAccounts,
  sendFastApiDailyStats,
  type FastApiDashboardResponse,
} from "../services/dashboardFastApiService";
import type {
  FastApiCourse,
  FastApiStudent,
  FastApiStudentAccountsResponse,
} from "../services/dashboardFastApiService";
// ============================================================

// Constants

// ============================================================

const VISIBLE_COURSES = [
  { id: 1, name: "NEET PG" },
  { id: 2, name: "NEET SS" },
  { id: 3, name: "FMGE" },
  { id: 4, name: "MBBS Curriculum" },
  { id: 5, name: "PG Residency" },
] as const;

const courseStyles = [
  {
    icon: GraduationCap,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    accent: "bg-blue-500",
    hover: "hover:border-blue-200 hover:shadow-blue-100",
    valueColor: "text-blue-700",
  },

  {
    icon: Stethoscope,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-100",
    accent: "bg-violet-500",
    hover: "hover:border-violet-200 hover:shadow-violet-100",
    valueColor: "text-violet-700",
  },

  {
    icon: HeartPulse,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
    accent: "bg-emerald-500",
    hover: "hover:border-emerald-200 hover:shadow-emerald-100",
    valueColor: "text-emerald-700",
  },

  {
    icon: BookOpen,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100",
    accent: "bg-orange-500",
    hover: "hover:border-orange-200 hover:shadow-orange-100",
    valueColor: "text-orange-700",
  },

  {
    icon: GraduationCap,
    iconColor: "text-pink-600",
    iconBg: "bg-pink-100",
    accent: "bg-pink-500",
    hover: "hover:border-pink-200 hover:shadow-pink-100",
    valueColor: "text-pink-700",
  },
] as const;

const deviceStyles = [
  {
    name: "Android",
    icon: Smartphone,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
    accent: "bg-emerald-500",
    hover: "hover:border-emerald-200 hover:shadow-emerald-100",
    valueColor: "text-emerald-700",
  },

  {
    name: "iOS",
    icon: Smartphone,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-100",
    accent: "bg-violet-500",
    hover: "hover:border-violet-200 hover:shadow-violet-100",
    valueColor: "text-violet-700",
  },

  {
    name: "Website",
    icon: Globe,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    accent: "bg-blue-500",
    hover: "hover:border-blue-200 hover:shadow-blue-100",
    valueColor: "text-blue-700",
  },
] as const;

const PAGE_SIZE = 10;
// ============================================================

// Formatting and HTML sanitization

// ============================================================

function formatNumber(value: string | number | undefined): string {
  if (value === undefined || value === null || value === "") {
    return "—";
  }

  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed.toLocaleString("en-IN") : "—";
}

/**
 * Allow only basic formatting and table elements from the daily
 * statistics API response. Event handlers and other attributes
 * are not copied.
 */

function sanitizeStatisticsHtml(html: string): string {
  if (typeof window === "undefined") {
    return "";
  }

  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(html, "text/html");

  const allowedTags = new Set([
    "H5",
    "B",
    "BR",
    "TABLE",
    "THEAD",
    "TBODY",
    "TR",
    "TH",
    "TD",
  ]);

  function cleanNode(node: Node): Node | null {
    if (node.nodeType === Node.TEXT_NODE) {
      return document.createTextNode(node.textContent ?? "");
    }

    if (!(node instanceof Element)) {
      return null;
    }

    if (!allowedTags.has(node.tagName)) {
      const fragment = document.createDocumentFragment();

      node.childNodes.forEach((child) => {
        const cleaned = cleanNode(child);

        if (cleaned) {
          fragment.appendChild(cleaned);
        }
      });

      return fragment;
    }

    const safeElement = document.createElement(node.tagName.toLowerCase());

    if (node.tagName === "TABLE") {
      safeElement.className = "daily-stats-table";
    }

    node.childNodes.forEach((child) => {
      const cleaned = cleanNode(child);

      if (cleaned) {
        safeElement.appendChild(cleaned);
      }
    });

    return safeElement;
  }

  const sanitized = document.createElement("div");

  parsedDocument.body.childNodes.forEach((node) => {
    const cleaned = cleanNode(node);

    if (cleaned) {
      sanitized.appendChild(cleaned);
    }
  });

  return sanitized.innerHTML;
}

// ============================================================

// Component

// ============================================================

export default function NumbersDashboard() {
  // Dashboard statistics

  const [courses, setCourses] = useState<FastApiCourse[]>([]);
  const [deviceStats, setDeviceStats] = useState({
    android: "0",
    ios: "0",
    websiteCount: "0",
    activeStudentsCreatedThisMonth: "0",
    deletedStudents: "0",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Student Details

  const [selectedCourse, setSelectedCourse] = useState("NEET PG");
  const [studentFromDate, setStudentFromDate] = useState("");
  const [studentToDate, setStudentToDate] = useState("");
  const [studentResponse, setStudentResponse] =
    useState<FastApiStudentAccountsResponse | null>(null);

  const [studentLoading, setStudentLoading] = useState(false);
  const [studentError, setStudentError] = useState<string | null>(null);
  const [studentPage, setStudentPage] = useState(1);

  // Daily Statistics

  const [dailyFromDate, setDailyFromDate] = useState("");
  const [dailyToDate, setDailyToDate] = useState("");
  const [dailyStatsHtml, setDailyStatsHtml] = useState("");
  const [dailyStatsLoading, setDailyStatsLoading] = useState(false);
  const [dailyStatsError, setDailyStatsError] = useState<string | null>(null);

  // ----------------------------------------------------------

  // Fetch Dashboard statistics

  // ----------------------------------------------------------

  useEffect(() => {
    let isMounted = true;
    async function loadDashboard() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetchFastApiDashboard();
        if (!isMounted) {
          return;
        }

        // Only the five requested courses are used.
        const visibleCourses = VISIBLE_COURSES.map((visibleCourse) =>
          response.courses.find(
            (course) => course.courseId === visibleCourse.id,
          ),
        ).filter((course): course is FastApiCourse => Boolean(course));
        setCourses(visibleCourses);
        setDeviceStats({
          android: response.studentDetails.android,
          ios: response.studentDetails.ios,
          websiteCount: response.studentDetails.websiteCount,
          activeStudentsCreatedThisMonth:
            response.studentDetails.activeStudentsCreatedThisMonth,
          deletedStudents: response.studentDetails.deletedStudents,
        });
      } catch (err: unknown) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load Dashboard statistics.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadDashboard();
    return () => {
      isMounted = false;
    };
  }, []);

  // ----------------------------------------------------------

  // Fetch Student Details

  // ----------------------------------------------------------

  async function handleGetStudentDetails(page = 1) {
    if (!studentFromDate || !studentToDate) {
      setStudentError("Please select both dates.");
      setStudentResponse(null);
      return;
    }

    if (studentFromDate > studentToDate) {
      setStudentError("From Date cannot be later than To Date.");
      setStudentResponse(null);
      return;
    }

    const course = VISIBLE_COURSES.find((item) => item.name === selectedCourse);

    if (!course) {
      setStudentError("Please select a valid course.");
      return;
    }

    try {
      setStudentLoading(true);
      setStudentError(null);

      const response = await fetchFastApiStudentAccounts({
        startDate: studentFromDate,
        endDate: studentToDate,
        courseId: course.id,
        page,
        pageSize: PAGE_SIZE,
      });

      setStudentResponse(response);
      setStudentPage(response.page);
    } catch (err: unknown) {
      setStudentError(
        err instanceof Error ? err.message : "Failed to fetch student details.",
      );

      setStudentResponse(null);
    } finally {
      setStudentLoading(false);
    }
  }

  // ----------------------------------------------------------

  // Fetch Daily Statistics

  // ----------------------------------------------------------

  async function handleGetDailyStats() {
    if (!dailyFromDate || !dailyToDate) {
      setDailyStatsError("Please select both dates.");
      setDailyStatsHtml("");
      return;
    }

    if (dailyFromDate > dailyToDate) {
      setDailyStatsError("From Date cannot be later than To Date.");
      setDailyStatsHtml("");
      return;
    }

    try {
      setDailyStatsLoading(true);
      setDailyStatsError(null);
      setDailyStatsHtml("");

      const response = await sendFastApiDailyStats({
        fromDate: dailyFromDate,
        toDate: dailyToDate,
      });

      setDailyStatsHtml(response.message);
    } catch (err: unknown) {
      setDailyStatsError(
        err instanceof Error
          ? err.message
          : "Failed to fetch daily statistics.",
      );
    } finally {
      setDailyStatsLoading(false);
    }
  }

  // ----------------------------------------------------------

  // Render

  // ----------------------------------------------------------

  return (
    <div className="min-h-screen space-y-6 bg-slate-50">
      {/* Loading */}
      {isLoading && (
        <div
          role="status"
          className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700"
        >
          Loading Dashboard statistics...
        </div>
      )}

      {/* Dashboard error */}
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {/* Total Signups */}
      <Card
        title="Total Signups"
        description="Total student registrations across five courses."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {VISIBLE_COURSES.map((visibleCourse, index) => {
            const course = courses.find(
              (item) => item.courseId === visibleCourse.id,
            );

            const style = courseStyles[index];
            const Icon = style.icon;
            return (
              <div
                key={visibleCourse.id}
                className={`
                  group relative overflow-hidden rounded-xl
                  border border-slate-200/80 bg-white p-4
                  transition-all duration-300 ease-out
                  hover:-translate-y-1 hover:shadow-lg
                  ${style.hover}
                `}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 ${style.accent}`}
                />
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-500">
                      {visibleCourse.name}
                    </p>
                    <p
                      className={`mt-3 text-2xl font-bold tracking-tight ${style.valueColor}`}
                    >
                      {isLoading ? "—" : formatNumber(course?.totalStudents)}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Total registrations
                    </p>
                  </div>
                  <div
                    className={`
                      flex h-10 w-10 shrink-0 items-center
                      justify-center rounded-xl
                      transition-transform duration-300
                      group-hover:scale-110
                      ${style.iconBg} ${style.iconColor}
                    `}
                  >
                    <Icon size={20} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Student Details */}
      <Card
        title="Student Details"
        description="View student accounts created within a selected date range."
      >
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Select
              label="Course"
              value={selectedCourse}
              options={VISIBLE_COURSES.map((course) => ({
                label: course.name,
                value: course.name,
              }))}
              onChange={(value) => {
                setSelectedCourse(value);
                setStudentResponse(null);
                setStudentError(null);
                setStudentPage(1);
              }}
            />
            <div className="flex items-end gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <Users size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-blue-600">
                  Selected Course
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {selectedCourse}
                </p>
              </div>
            </div>

            <DatePicker
              label="From Date"
              value={studentFromDate}
              onChange={(value) => {
                setStudentFromDate(value);

                if (studentToDate && value > studentToDate) {
                  setStudentToDate("");
                }

                setStudentResponse(null);
              }}
            />

            <DatePicker
              label="To Date"
              value={studentToDate}
              minDate={studentFromDate || undefined}
              disabled={!studentFromDate}
              onChange={(value) => {
                setStudentToDate(value);
                setStudentResponse(null);
              }}
            />
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Select a course and date range to fetch student records.
            </p>

            <Button
              type="button"
              className="w-full sm:w-auto"
              disabled={studentLoading}
              onClick={() => void handleGetStudentDetails(1)}
            >
              <Users size={16} className="mr-2" />
              {studentLoading ? "Loading..." : "Get Student Details"}
            </Button>
          </div>
          {studentError && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {studentError}
            </div>
          )}

          {studentResponse && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Student Accounts
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {selectedCourse} · {studentFromDate} to {studentToDate}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-700">
                    {formatNumber(studentResponse.total)}
                  </p>

                  <p className="text-xs text-slate-500">Total students</p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      {[
                        "Student ID",
                        "Name",
                        "Mobile",
                        "Email",
                        "Education",
                        "College",
                        "Status",
                        "Created At",
                      ].map((heading) => (
                        <th
                          key={heading}
                          className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 bg-white">
                    {studentResponse.student.map((student: FastApiStudent) => (
                      <tr
                        key={student.studentID}
                        className="transition-colors hover:bg-blue-50/50"
                      >
                        <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-700">
                          {student.studentID}
                        </td>

                        <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                          {student.name}
                        </td>

                        <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                          {student.mobileNo}
                        </td>

                        <td className="px-4 py-3 text-slate-600">
                          {student.email}
                        </td>

                        <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                          {student.education}
                        </td>

                        <td className="min-w-48 px-4 py-3 text-slate-600">
                          {student.college}
                        </td>

                        <td className="whitespace-nowrap px-4 py-3">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                              student.profileStatus === "ACTIVE"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {student.profileStatus}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                          {student.createdAt}
                        </td>
                      </tr>
                    ))}

                    {studentResponse.student.length === 0 && (
                      <tr>
                        <td
                          colSpan={8}
                          className="px-4 py-8 text-center text-slate-500"
                        >
                          No students found for the selected filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">
                  Page {studentResponse.page} of {studentResponse.totalPages}
                  {" · "}
                  {formatNumber(studentResponse.total)} students
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={studentLoading || studentPage <= 1}
                    onClick={() =>
                      void handleGetStudentDetails(studentPage - 1)
                    }
                  >
                    <ChevronLeft size={16} className="mr-1" />
                    Previous
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    disabled={
                      studentLoading ||
                      studentPage >= studentResponse.totalPages
                    }
                    onClick={() =>
                      void handleGetStudentDetails(studentPage + 1)
                    }
                  >
                    Next
                    <ChevronRight size={16} className="ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Registration Overview — existing service remains unchanged */}
      <RegistrationOverview />

      {/* Additional tudent Statistics */}

      <div className="grid gid-cols-1 gap-4 sm:grid-cols-2">
        <Card
          title="Students Created This Month"
          description="Student accounts created during the current month."
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <Users size={23} />
            </div>

            <p className="text-3xl font-bold tracking-tight text-slate-900">
              {isLoading
                ? "—"
                : formatNumber(deviceStats.activeStudentsCreatedThisMonth)}
            </p>
          </div>
        </Card>

        <Card
          title="Deleted Students"
          description="Total deleted student accounts."
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <Users size={23} />
            </div>

            <p className="text-3xl font-bold tracking-tight text-slate-900">
              {isLoading ? "—" : formatNumber(deviceStats.deletedStudents)}
            </p>
          </div>
        </Card>
      </div>

      {/* Session Overview — existing component remains unchanged */}
      <SessionOverview />
      {/* Daily Statistics */}
      <Card
        title="Daily Statistics"
        description="View signup, plan access, and subscription statistics for a selected date range."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          <DatePicker
            label="From Date"
            value={dailyFromDate}
            onChange={(value) => {
              setDailyFromDate(value);

              if (dailyToDate && value > dailyToDate) {
                setDailyToDate("");
              }

              setDailyStatsHtml("");
            }}
          />

          <DatePicker
            label="To Date"
            value={dailyToDate}
            minDate={dailyFromDate || undefined}
            disabled={!dailyFromDate}
            onChange={(value) => {
              setDailyToDate(value);
              setDailyStatsHtml("");
            }}
          />

          <div className="flex items-end">
            <Button
              type="button"
              className="w-full"
              disabled={dailyStatsLoading}
              onClick={() => void handleGetDailyStats()}
            >
              <ChartNoAxesCombined size={17} className="mr-2" />

              {dailyStatsLoading ? "Loading..." : "Get Daily Statistics"}
            </Button>
          </div>
        </div>

        {dailyStatsError && (
          <div
            role="alert"
            className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {dailyStatsError}
          </div>
        )}

        {dailyStatsLoading && (
          <div
            role="status"
            className="mt-5 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700"
          >
            Fetching daily statistics...
          </div>
        )}

        {dailyStatsHtml && (
          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
            <style>{`
              .daily-stats-table {
                width: 100%;
                border-collapse: collapse;
                margin: 12px 0 24px;
                font-size: 14px;
              }
              .daily-stats-table th,
              .daily-stats-table td {
                border: 1px solid #e2e8f0;
                padding: 10px 12px;
                text-align: left;
              }

              .daily-stats-table th {
                background: #eff6ff;
                color: #334155;
                font-weight: 600;
              }

              .daily-stats-table tr:nth-child(even) td {
                background: #f8fafc;
              }
            `}</style>

            <div
              className="space-y-4 text-sm leading-6 text-slate-700"
              dangerouslySetInnerHTML={{
                __html: sanitizeStatisticsHtml(dailyStatsHtml),
              }}
            />
          </div>
        )}
      </Card>

      {/* Device Statistics */}
      <Card
        title="Device Statistics"
        description="Student activity by platform."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {deviceStyles.map((device) => {
            const Icon = device.icon;

            const value =
              device.name === "Android"
                ? deviceStats.android
                : device.name === "iOS"
                  ? deviceStats.ios
                  : deviceStats.websiteCount;

            return (
              <div
                key={device.name}
                className={`
                  group relative overflow-hidden rounded-xl
                  border border-slate-200/80 bg-white p-5
                  transition-all duration-300 ease-out
                  hover:-translate-y-1 hover:shadow-lg
                  ${device.hover}
                `}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 ${device.accent}`}
                />

                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {device.name}
                    </p>

                    <p
                      className={`mt-3 text-2xl font-bold tracking-tight ${device.valueColor}`}
                    >
                      {isLoading ? "—" : formatNumber(value)}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Platform activity
                    </p>
                  </div>

                  <div
                    className={`
                      flex h-12 w-12 items-center justify-center
                      rounded-xl transition-transform duration-300
                      group-hover:scale-110
                      ${device.iconBg} ${device.iconColor}
                    `}
                  >
                    <Icon size={22} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
