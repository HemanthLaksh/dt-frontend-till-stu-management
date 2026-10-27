"use client";

import { useRef, useState } from "react";
import {
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
import { COURSE_OPTIONS } from "@/constants/courseOptions";

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
  const isSendingRef = useRef(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ReportResult | null>(null);

  function handleFromDateChange(value: string) {
    setFromDate(value);

    if (!value || (toDate && value > toDate)) {
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
    if (isSendingRef.current) return;

    setError("");
    setResult(null);

    if (!COURSE_OPTIONS.some((course) => course.value === courseId)) {
      setError("Please select a valid course.");
      return;
    }

    if (!fromDate || !toDate) {
      setError("Please select both From Date and To Date.");
      return;
    }

    if (fromDate > toDate) {
      setError("From Date cannot be later than To Date.");
      return;
    }

    isSendingRef.current = true;
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
      isSendingRef.current = false;
      setIsSending(false);
    }
  }
  function getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
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
        </div>
      </div>

      {/* Report filters */}

      <Card
        title="Report Filters"
        description="Select a course and date range to send the report to your registered Email."
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
              options={COURSE_OPTIONS.map(({ label, value }) => ({
                label,
                value,
              }))}
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
              maxDate={getTodayDate()}
              onChange={handleFromDateChange}
            />

            {/* To Date */}

            <DatePicker
              label="To Date"
              value={toDate}
              minDate={fromDate || undefined}
              maxDate={getTodayDate()}
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
    </div>
  );
}
