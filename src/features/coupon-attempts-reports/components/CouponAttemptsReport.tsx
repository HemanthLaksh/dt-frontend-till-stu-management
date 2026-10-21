"use client";

import { useState } from "react";
import {
  CalendarDays,
  RotateCcw,
  Mail,
  FileText,
  CheckCircle2,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";

import Button from "@/components/ui/Button/Button";
import Card from "@/components/ui/Card/Card";
import DatePicker from "@/components/ui/DatePicker/DatePicker";
import Select from "@/components/ui/Select/Select";

import { sendCouponAttemptsReport } from "../services/couponAttemptsService";

const COURSE_OPTIONS = [
  { label: "NEET PG", value: "1" },
  { label: "NEET SS", value: "2" },
  { label: "FMGE", value: "3" },
  { label: "MBBS Curriculum", value: "4" },
  { label: "PG Residency", value: "5" },
];

interface ReportResult {
  message: string;
  recipientEmail?: string;
  fileName?: string;
  rowCount?: number;
}

export default function CouponAttemptsReport() {
  const [courseId, setCourseId] = useState("1");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ReportResult | null>(null);

  function handleFromDateChange(value: string) {
    setFromDate(value);

    if (toDate && value > toDate) {
      setToDate("");
    }

    setError("");
    setResult(null);
  }

  function handleReset() {
    setCourseId("1");
    setFromDate("");
    setToDate("");
    setError("");
    setResult(null);
  }

  async function handleSendMail() {
    setError("");
    setResult(null);

    if (!fromDate || !toDate) {
      setError("Please select both From Date and To Date.");
      return;
    }

    if (fromDate > toDate) {
      setError("From Date cannot be later than To Date.");
      return;
    }

    setIsSending(true);

    try {
      const response = await sendCouponAttemptsReport({
        courseId: Number(courseId),
        fromDate,
        toDate,
        sendMail: "Y",
      });

      setResult({
        message: response.message,
        recipientEmail: response.data?.recipient_email,
        fileName: response.data?.file_name,
        rowCount: response.data?.row_count,
      });
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to send the coupon attempts report. Please try again.",
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Page heading */}

      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <FileText className="h-6 w-6" />
        </div>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
            Coupon Attempts Report
          </h1>

          <p className="mt-1 text-sm text-text-secondary">
            Generate coupon attempt reports by course and date range.
          </p>
        </div>
      </div>

      {/* Report filters */}

      <Card
        title="Report Filters"
        description="Select a course and date range to send the report to your registered report recipient."
        className="hover:translate-y-0 hover:shadow-sm"
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void handleSendMail();
          }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {/* Course */}

            <Select
              label="Course"
              value={courseId}
              options={COURSE_OPTIONS}
              placeholder="Select Course"
              onChange={(value) => {
                setCourseId(value);
                setError("");
                setResult(null);
              }}
            />

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
              disabled={!fromDate}
              onChange={(value) => {
                setToDate(value);
                setError("");
                setResult(null);
              }}
            />
          </div>

          {!fromDate && (
            <p className="text-xs text-text-secondary">
              Select a From Date to enable the To Date picker.
            </p>
          )}

          {/* Error message */}

          {error && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

              <p>{error}</p>
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
                    The coupon attempts report has been processed successfully.
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 border-t border-emerald-200 pt-4 sm:grid-cols-2">
                {result.recipientEmail && (
                  <div>
                    <p className="text-xs font-medium text-emerald-700">
                      Recipient Email
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

          {/* Actions */}

          <div className="flex flex-wrap justify-end gap-3 border-t border-border pt-5">
            <Button
              type="button"
              variant="secondary"
              onClick={handleReset}
              disabled={isSending}
            >
              <span className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4" />
                Reset
              </span>
            </Button>

            <Button type="submit" variant="primary" disabled={isSending}>
              <span className="flex items-center gap-2">
                {isSending ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <Mail className="h-4 w-4" />
                )}

                {isSending ? "Sending Report..." : "Send Mail"}
              </span>
            </Button>
          </div>
        </form>
      </Card>

      {/* Information card */}

      <Card className="hover:translate-y-0 hover:shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <CalendarDays className="h-5 w-5" />
          </div>

          <div>
            <h2 className="font-semibold text-text-primary">
              About this report
            </h2>

            <p className="mt-1 text-sm leading-6 text-text-secondary">
              Choose the course and reporting period, then select Send Mail. The
              generated report will be sent to the recipient configured by the
              backend. The response will show the recipient, report filename,
              and number of records processed.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
