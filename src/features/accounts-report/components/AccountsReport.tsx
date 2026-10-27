"use client";

import { useState } from "react";

import Button from "@/components/ui/Button/Button";
import Card from "@/components/ui/Card/Card";
import DatePicker from "@/components/ui/DatePicker/DatePicker";
import Select from "@/components/ui/Select/Select";
import { RotateCcw, CheckCircle2, FileBarChart } from "lucide-react";

import { ACCOUNTS_REPORT_OPTIONS } from "../constants/accountsReportMockData";

import { validateAccountsReport } from "../utils/accountsReportUtils";

import { sendAccountsReportEmail } from "../services/accountsReportService";

import { COURSE_OPTIONS } from "@/constants/courseOptions";

import type { AccountsReportType } from "../types/accounts-report.types";

export default function AccountsReport() {
  const [courseId, setCourseId] = useState("1");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reportType, setReportType] = useState<AccountsReportType | "">("");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const courseOptions = COURSE_OPTIONS.map((course) => ({
    label: course.label,
    value: String(course.id),
  }));

  const [result, setResult] = useState<{
    message: string;
    recipientEmail?: string;
    rowCount?: number;
    fileName?: string;
  } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setResult(null);

    const validationError = validateAccountsReport({
      fromDate,
      toDate,
      reportType,
    });

    if (validationError) {
      setError(validationError);
      return;
    }

    if (!courseId) {
      setError("Please select a course.");
      return;
    }

    if (!reportType) {
      setError("Please select a report type.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await sendAccountsReportEmail({
        reportType,
        courseId: Number(courseId),
        fromDate,
        toDate,
        format: "csv",
        send_mail: "Y",
      });

      setResult({
        message: response.message,
        recipientEmail: response.data?.recipient_email,
        rowCount: response.data?.row_count,
        fileName: response.data?.file_name,
      });
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to send the accounts report. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }
  function handleClear() {
    setCourseId("1");
    setFromDate("");
    setToDate("");
    setReportType("");
    setError("");
    setResult(null);
  }
  function getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function handleFromDateChange(value: string) {
    setFromDate(value);

    if (!value || (toDate && value > toDate)) {
      setToDate("");
    }

    setError("");
    setResult(null);
  }
  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FileBarChart size={23} />
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
              Accounts Reports
            </h1>
          </div>
        </div>
      </div>

      {/* Report form */}
      <Card
        title="Get Report"
        description="Select the required filters to send your report by email."
        className="hover:translate-y-0 hover:shadow-sm"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Course */}
            <Select
              label="Course"
              value={courseId}
              options={courseOptions}
              placeholder="Select Course"
              onChange={setCourseId}
            />

            {/* Report Type */}
            <Select
              label="Report Type"
              value={reportType}
              options={ACCOUNTS_REPORT_OPTIONS}
              placeholder="Select Report Type"
              onChange={(value) => setReportType(value as AccountsReportType)}
            />

            {/* From Date */}
            <DatePicker
              label="From Date"
              value={fromDate}
              maxDate={getTodayDate()}
              onChange={handleFromDateChange}
            />

            {/* To Date */}
            <DatePicker
              label="To Date"
              value={toDate}
              minDate={fromDate || undefined}
              maxDate={getTodayDate()}
              onChange={(value) => {
                setToDate(value);
                setError("");
                setResult(null);
              }}
              disabled={!fromDate}
            />
          </div>

          {!fromDate && (
            <p className="text-xs text-text-secondary">
              Select a From Date to enable the To Date picker.
            </p>
          )}

          {/* Validation error */}
          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {/* Success message */}

          {result && (
            <div
              role="status"
              className="rounded-xl border border-emerald-200 bg-emerald-50 p-5"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-emerald-800">
                    {result.message}
                  </h3>

                  <p className="mt-1 text-sm text-emerald-700">
                    The accounts report has been processed successfully.
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 border-t border-emerald-200 pt-4 sm:grid-cols-2">
                {result.recipientEmail && (
                  <div>
                    <p className="text-xs font-medium text-emerald-700">
                      Email
                    </p>

                    <p className="mt-1 break-all text-sm font-medium text-emerald-900">
                      {result.recipientEmail}
                    </p>
                  </div>
                )}

                {result.rowCount !== undefined && (
                  <div>
                    <p className="text-xs font-medium text-emerald-700">
                      Total Records
                    </p>

                    <p className="mt-1 text-sm font-semibold text-emerald-900">
                      {result.rowCount.toLocaleString("en-IN")}
                    </p>
                  </div>
                )}

                {result.fileName && (
                  <div className="sm:col-span-2">
                    <p className="text-xs font-medium text-emerald-700">
                      Generated Report
                    </p>

                    <p className="mt-1 break-all text-sm text-emerald-900">
                      {result.fileName}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Submit */}

          <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
            <Button type="button" variant="secondary" onClick={handleClear}>
              <span className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4" />
                Reset
              </span>
            </Button>

            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? "Sending Report..." : "Send Report to Email"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
