"use client";

import { useMemo, useState } from "react";
import { RotateCcw, Mail, FileText, CheckCircle2 } from "lucide-react";

import Button from "@/components/ui/Button/Button";
import Card from "@/components/ui/Card/Card";
import DatePicker from "@/components/ui/DatePicker/DatePicker";
import Select from "@/components/ui/Select/Select";
import { sendSubscriptionOrderReport } from "../services/subscriptionOrderReportService";
import { COURSE_OPTIONS } from "@/constants/courseOptions";

const ACADEMIC_YEARS = [
  {
    label: "2023-2024",
    value: "23-24",
    startDate: "2023-05-01",
    endDate: "2024-04-30",
  },
  {
    label: "2024-2025",
    value: "24-25",
    startDate: "2024-05-01",
    endDate: "2025-04-30",
  },
  {
    label: "2025-2026",
    value: "25-26",
    startDate: "2025-05-01",
    endDate: "2026-04-30",
  },
  {
    label: "2026-2027",
    value: "26-27",
    startDate: "2026-05-01",
    endDate: "2027-04-30",
  },
];

const SUBSCRIPTION_ORDER_COURSE_OPTIONS = [
  ...COURSE_OPTIONS.map(({ label, value }) => ({
    label,
    value,
  })),
  { label: "All Courses", value: "0" },
];

const PAGE_SIZE = 100;

interface ReportRow {
  id: string | number;
  [key: string]: unknown;
}

export default function SubscriptionOrderReports() {
  const [academicYear, setAcademicYear] = useState("26-27");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [courseId, setCourseId] = useState("1");

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "info">(
    "info",
  );

  const [result, setResult] = useState<{
    message: string;
    recipientEmail?: string;
    rowCount?: number;
    fileName?: string;
  } | null>(null);

  // API integration will populate this state.
  const [reportRows] = useState<ReportRow[]>([]);

  const selectedAcademicYear = ACADEMIC_YEARS.find(
    (year) => year.value === academicYear,
  );

  const academicYearOptions = ACADEMIC_YEARS.map((year) => ({
    label: year.label,
    value: year.value,
  }));

  const [isSending, setIsSending] = useState(false);

  const filteredRows = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return reportRows;
    }

    return reportRows.filter((row) =>
      Object.values(row).some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(query),
      ),
    );
  }, [reportRows, searchTerm]);

  const totalPages = Math.ceil(filteredRows.length / PAGE_SIZE);

  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const columns = useMemo(() => {
    if (!filteredRows.length) {
      return [];
    }

    return Object.keys(filteredRows[0]).filter(
      (column) =>
        !["id", "coupon_discount_pct", "status_code", "campaign"].includes(
          column,
        ),
    );
  }, [filteredRows]);

  function handleAcademicYearChange(value: string) {
    setAcademicYear(value);
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
    setStatusMessage("");
    setResult(null);
  }

  function handleStartDateChange(value: string) {
    setStartDate(value);
    setResult(null);
    setEndDate("");
    setStatusMessage("");
  }

  function handleReset() {
    setAcademicYear("26-27");
    setStartDate("");
    setEndDate("");
    setCourseId("1");
    setSearchTerm("");
    setCurrentPage(1);
    setStatusMessage("");
    setResult(null);
  }

  async function handleSendMail() {
    setStatusMessage("");
    setResult(null);

    if (!startDate || !endDate) {
      setStatusType("error");
      setStatusMessage("Please select both the start date and end date.");
      return;
    }

    if (startDate > endDate) {
      setStatusType("error");
      setStatusMessage("The start date cannot be later than the end date.");
      return;
    }

    if (
      selectedAcademicYear &&
      (startDate < selectedAcademicYear.startDate ||
        endDate > selectedAcademicYear.endDate)
    ) {
      setStatusType("error");
      setStatusMessage(
        "Please select dates within the selected academic year.",
      );
      return;
    }

    setIsSending(true);
    setStatusType("info");
    setStatusMessage("Sending the order report to email...");

    try {
      const response = await sendSubscriptionOrderReport({
        academic_year: academicYear,
        course_id: Number(courseId),
        start_date: startDate,
        end_date: endDate,
        send_mail: "Y",
      });

      setResult({
        message: response.message,
        recipientEmail: response.data?.recipient_email,
        rowCount: response.data?.row_count,
        fileName: response.data?.file_name,
      });

      setStatusMessage("");
    } catch (error: unknown) {
      setResult(null);
      setStatusType("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Unable to send the order report. Please try again.",
      );
    } finally {
      setIsSending(false);
    }
  }

  function formatColumnName(column: string) {
    const labels: Record<string, string> = {
      partial_payment: "Payment Type",
      pricing_price: "Plan Price",
      amount: "Amount",
      support_team_remarks: "Remarks",
    };

    if (labels[column]) {
      return labels[column];
    }

    return column
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  return (
    <div className="space-y-6">
      {/* Page Heading */}

      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FileText className="h-6 w-6" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
              Subscription Order Reports
            </h1>
          </div>
        </div>
      </div>

      {/* Filters */}

      <Card
        title="Order Report Filters"
        description="Choose the reporting period and course to prepare your report."
        className="hover:translate-y-0 hover:shadow-sm"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {/* Academic Year */}

            <Select
              label="Academic Year"
              value={academicYear}
              options={academicYearOptions}
              onChange={handleAcademicYearChange}
            />

            {/* Start Date */}

            <DatePicker
              label="Start Date"
              value={startDate}
              minDate={selectedAcademicYear?.startDate}
              maxDate={selectedAcademicYear?.endDate}
              onChange={handleStartDateChange}
            />

            {/* End Date */}

            <DatePicker
              label="End Date"
              value={endDate}
              minDate={startDate || selectedAcademicYear?.startDate}
              maxDate={selectedAcademicYear?.endDate}
              disabled={!startDate}
              onChange={(value) => {
                setEndDate(value);
                setStatusMessage("");
                setResult(null);
              }}
            />

            {/* Course */}

            <Select
              label="Course"
              value={courseId}
              options={SUBSCRIPTION_ORDER_COURSE_OPTIONS}
              onChange={(value) => {
                setCourseId(value);
                setStatusMessage("");
                setResult(null);
              }}
            />
          </div>

          {!startDate && (
            <p className="text-xs text-text-secondary">
              Select a start date to enable the end date picker.
            </p>
          )}

          {statusMessage && (
            <div
              role={statusType === "error" ? "alert" : "status"}
              className={`rounded-lg border px-4 py-3 text-sm ${
                statusType === "error"
                  ? "border-red-200 bg-red-50 text-red-700"
                  : statusType === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-blue-200 bg-blue-50 text-blue-700"
              }`}
            >
              {statusMessage}
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
                    The subscription order report has been processed
                    successfully.
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

          <div className="flex flex-wrap items-center justify-end gap-3 border-t border-border pt-5">
            <Button type="button" variant="secondary" onClick={handleReset}>
              <span className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4" />
                Reset
              </span>
            </Button>

            <Button
              type="button"
              variant="primary"
              onClick={handleSendMail}
              disabled={isSending}
            >
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {isSending ? "Sending Report..." : "Send Mail"}
              </span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
