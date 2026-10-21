import type { StudentReportRequest } from "../types/student-report.types";

/**
 * Validates the selected date range.
 */
export function validateReportDates(
  fromDate: string,
  toDate: string,
): string | null {
  if (!fromDate || !toDate) {
    return "Please select both From Date and To Date.";
  }

  const from = new Date(`${fromDate}T00:00:00`);
  const to = new Date(`${toDate}T00:00:00`);

  if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) {
    return "Please enter valid dates.";
  }

  if (from > to) {
    return "From Date cannot be later than To Date.";
  }

  return null;
}

/**
 * Validates location selections for location-based reports.
 */
export function validateReportLocation(
  request: StudentReportRequest,
): string | null {
  if (request.reportType === "state-wise" && !request.stateName) {
    return "Please select a state.";
  }

  if (request.reportType === "country-wise" && !request.countryCode) {
    return "Please select a country.";
  }

  return null;
}

/**
 * Formats a date for display.
 * Expects a date in YYYY-MM-DD format.
 */
export function formatReportDate(date: string): string {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
}
