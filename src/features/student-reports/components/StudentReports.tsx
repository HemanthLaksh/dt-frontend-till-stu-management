"use client";

import { useState } from "react";

import {
  ArrowLeft,
  Mail,
  FileBarChart,
  Globe,
  MapPin,
  Users,
  CheckCircle2,
} from "lucide-react";

import Card from "@/components/ui/Card/Card";
import Button from "@/components/ui/Button/Button";
import Select from "@/components/ui/Select/Select";
import DatePicker from "@/components/ui/DatePicker/DatePicker";

import {
  STUDENT_REPORT_COUNTRIES,
  STUDENT_REPORT_COURSES,
  STUDENT_REPORT_OPTIONS,
  STUDENT_REPORT_STATES,
} from "../constants/studentReportMockData";

import type {
  StudentReportCourse,
  StudentReportType,
} from "../types/student-report.types";

import {
  formatReportDate,
  validateReportDates,
  validateReportLocation,
} from "../utils/studentReportUtils";

import {
  fetchStudentAnalysisReport,
  fetchStateWiseStudentReport,
  fetchCountryWiseStudentReport,
  type StudentReportRecord,
} from "../services/studentReportService";

type GeneratedReport = {
  courseName: StudentReportCourse;
  reportType: StudentReportType;
  fromDate: string;
  toDate: string;
  location?: string;
  message: string;
  recipientEmail?: string;
  fileName?: string;
  rowCount?: number;
};

const reportIcons = {
  students: Users,
  "state-wise": MapPin,
  "country-wise": Globe,
};

export default function StudentReports() {
  const [studentRecords, setStudentRecords] = useState<StudentReportRecord[]>(
    [],
  );

  const [recordCount, setRecordCount] = useState(0);

  const [selectedCourse, setSelectedCourse] =
    useState<StudentReportCourse>("NEET PG");

  const [selectedReport, setSelectedReport] =
    useState<StudentReportType | null>(null);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [stateName, setStateName] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [generatedReport, setGeneratedReport] =
    useState<GeneratedReport | null>(null);

  const selectedCourseDetails = STUDENT_REPORT_COURSES.find(
    (course) => course.label === selectedCourse,
  );

  const resetReport = () => {
    setSelectedReport(null);
    setFromDate("");
    setToDate("");
    setStateName("");
    setCountryCode("");
    setError("");
    setLoading(false);
    setGeneratedReport(null);
    setStudentRecords([]);
    setRecordCount(0);
  };

  const handleCourseChange = (course: StudentReportCourse) => {
    setSelectedCourse(course);
    resetReport();
  };

  const handleReportSelect = (reportType: StudentReportType) => {
    setSelectedReport(reportType);
    setFromDate("");
    setToDate("");
    setStateName("");
    setCountryCode("");
    setError("");
    setGeneratedReport(null);
    setStudentRecords([]);
    setRecordCount(0);
  };

  const handleSubmit = async () => {
    if (!selectedReport || !selectedCourseDetails) {
      setError("Please select a report and course.");
      return;
    }

    const dateError = validateReportDates(fromDate, toDate);

    if (dateError) {
      setError(dateError);
      return;
    }

    const locationError = validateReportLocation({
      courseId: selectedCourseDetails.id,
      courseName: selectedCourse,
      reportType: selectedReport,
      fromDate,
      toDate,
      ...(selectedReport === "state-wise" && { stateName }),
      ...(selectedReport === "country-wise" && { countryCode }),
    });

    if (locationError) {
      setError(locationError);
      return;
    }

    if (selectedReport === "country-wise" && !countryCode) {
      setError("Please select a country.");
      return;
    }

    if (selectedReport === "state-wise" && !stateName) {
      setError("Please select a state.");
      return;
    }

    setError("");
    setLoading(true);
    setGeneratedReport(null);
    setStudentRecords([]);
    setRecordCount(0);

    try {
      const response =
        selectedReport === "state-wise"
          ? await fetchStateWiseStudentReport({
              course_id: selectedCourseDetails.id,
              start_date: fromDate,
              end_date: toDate,
              state_name: stateName,
              send_mail: "Y",
            })
          : selectedReport === "country-wise"
            ? await fetchCountryWiseStudentReport({
                course_id: selectedCourseDetails.id,
                start_date: fromDate,
                end_date: toDate,
                country_code: countryCode,
                send_mail: "Y",
              })
            : await fetchStudentAnalysisReport({
                academic_year: "26-27",
                start_date: fromDate,
                end_date: toDate,
                course_id: selectedCourseDetails.id,
                send_mail: "Y",
              });

      if (!response.success) {
        throw new Error(
          response.message || "Failed to send the student report.",
        );
      }

      const records = response.data?.results ?? [];
      const responseData = response.data;

      setStudentRecords(records);

      setRecordCount(
        responseData?.row_count ?? responseData?.count ?? records.length,
      );

      setGeneratedReport({
        courseName: selectedCourse,
        reportType: selectedReport,
        fromDate,
        toDate,
        ...(selectedReport === "state-wise" && {
          location: stateName,
        }),
        ...(selectedReport === "country-wise" && {
          location: countryCode,
        }),
        message: response.message,
        recipientEmail: responseData?.recipient_email,
        fileName: responseData?.file_name,
        rowCount: responseData?.row_count,
      });
    } catch (err: unknown) {
      const axiosError = err as {
        response?: {
          status?: number;
          data?: {
            detail?: string;
            message?: string;
          };
        };
        message?: string;
      };

      if (axiosError.response?.status === 401) {
        setError(
          "Authentication failed. Your development Bearer Token may be missing or expired. Please update it and try again.",
        );
      } else {
        setError(
          axiosError.response?.data?.detail ||
            axiosError.response?.data?.message ||
            axiosError.message ||
            "Unable to send the student report. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedReport || studentRecords.length === 0) {
      setError("No student records available to download.");
      return;
    }

    const headers: (keyof StudentReportRecord)[] = [
      "student_id",
      "name",
      "country_code",
      "mobile_no",
      "student_email_id",
      "education",
      "course",
      "specialization_subject",
      "college",
      "address",
      "profile_status",
      "created_at",
      "updated_at",
    ];

    const escapeCsvValue = (value: unknown) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const csvContent = [
      headers.map(escapeCsvValue).join(","),
      ...studentRecords.map((record) =>
        headers.map((header) => escapeCsvValue(record[header])).join(","),
      ),
    ].join("\r\n");

    const blob = new Blob(["\uFEFF", csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "student-report.csv";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Page heading */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FileBarChart size={23} />
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Student Reports
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Generate student account reports by course, date, and location.
            </p>
          </div>
        </div>
      </div>

      {/* Course selection and report form */}
      <Card>
        <div className="space-y-5">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Generate Student Reports
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Select a course to view the available report types.
            </p>
          </div>

          {/* Course tabs */}
          <div className="flex gap-2 overflow-x-auto border-b border-slate-200 pb-0">
            {STUDENT_REPORT_COURSES.map((course) => {
              const active = selectedCourse === course.label;

              return (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => handleCourseChange(course.label)}
                  className={`-mb-px shrink-0 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                    active
                      ? "border-blue-600 text-blue-700"
                      : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800"
                  }`}
                >
                  {course.label}
                </button>
              );
            })}
          </div>

          {/* Report options */}
          {!selectedReport && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {STUDENT_REPORT_OPTIONS.map((option) => {
                const Icon = reportIcons[option.id];

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleReportSelect(option.id)}
                    className="group rounded-xl border border-slate-200 bg-white p-5 text-left transition-all hover:border-blue-300 hover:bg-blue-50/40 hover:shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-100"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
                      <Icon size={22} />
                    </div>

                    <h3 className="mt-4 font-semibold text-slate-900">
                      {option.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {option.description}
                    </p>

                    <span className="mt-4 inline-flex items-center text-sm font-medium text-blue-700">
                      Generate report
                      <span className="ml-2 transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Report form */}
          {selectedReport && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-blue-50 px-4 py-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
                    Selected report
                  </p>

                  <h3 className="mt-1 font-semibold text-slate-900">
                    {
                      STUDENT_REPORT_OPTIONS.find(
                        (option) => option.id === selectedReport,
                      )?.title
                    }
                  </h3>

                  <p className="mt-1 text-sm text-slate-600">
                    Course: {selectedCourse}
                  </p>
                </div>

                <Button variant="outline" onClick={resetReport}>
                  <ArrowLeft size={16} className="mr-2" />
                  Back
                </Button>
              </div>

              {/* Date and location fields */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <DatePicker
                    label="From Date"
                    value={fromDate}
                    onChange={(value) => {
                      setFromDate(value);

                      if (toDate && value > toDate) {
                        setToDate("");
                      }
                    }}
                  />
                </div>

                <div>
                  <DatePicker
                    label="To Date"
                    value={toDate}
                    onChange={setToDate}
                  />
                </div>

                {selectedReport === "state-wise" && (
                  <div className="md:col-span-2">
                    <Select
                      label="State"
                      value={stateName}
                      options={STUDENT_REPORT_STATES}
                      placeholder="Select a state"
                      onChange={setStateName}
                    />
                  </div>
                )}

                {selectedReport === "country-wise" && (
                  <div className="md:col-span-2">
                    <Select
                      label="Country"
                      value={countryCode}
                      options={STUDENT_REPORT_COUNTRIES}
                      placeholder="Select a country"
                      onChange={setCountryCode}
                    />
                  </div>
                )}
              </div>

              {/* API error and empty results */}
              {error && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 pt-5">
                <Button
                  loading={loading}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  <Mail size={16} className="mr-2" />
                  {loading ? "Sending Report..." : "Send Mail"}
                </Button>

                <Button
                  variant="outline"
                  onClick={resetReport}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Generated report result */}
      {generatedReport && (
        <Card>
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={22} />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-slate-900">
                  Report Email Requested
                </h2>

                <p className="mt-1 text-sm text-emerald-700">
                  {generatedReport.message}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 border-t border-slate-200 pt-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-slate-500">Course</p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  {generatedReport.courseName}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">
                  Report Type
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  {
                    STUDENT_REPORT_OPTIONS.find(
                      (option) => option.id === generatedReport.reportType,
                    )?.title
                  }
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">Date Range</p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  {formatReportDate(generatedReport.fromDate)} –{" "}
                  {formatReportDate(generatedReport.toDate)}
                </p>
              </div>

              {generatedReport.location && (
                <div>
                  <p className="text-xs font-medium text-slate-500">Location</p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {generatedReport.location}
                  </p>
                </div>
              )}

              {generatedReport.recipientEmail && (
                <div className="sm:col-span-2">
                  <p className="text-xs font-medium text-slate-500">
                    Recipient Email
                  </p>
                  <p className="mt-1 break-all text-sm font-medium text-slate-900">
                    {generatedReport.recipientEmail}
                  </p>
                </div>
              )}

              {(generatedReport.rowCount !== undefined || recordCount > 0) && (
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Total Records
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {(generatedReport.rowCount ?? recordCount).toLocaleString(
                      "en-IN",
                    )}
                  </p>
                </div>
              )}

              {generatedReport.fileName && (
                <div className="sm:col-span-2">
                  <p className="text-xs font-medium text-slate-500">
                    Generated Report
                  </p>
                  <p className="mt-1 break-all text-sm text-slate-900">
                    {generatedReport.fileName}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
