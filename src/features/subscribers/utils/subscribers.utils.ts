import type { SubscriberReportType } from "../types/subscribers.types";

export const getSubscriberReportTitle = (
  reportType: SubscriberReportType,
): string => {
  return reportType === "A"
    ? "Active Subscribers Report Download"
    : "In-Active Subscribers Report Download";
};

export const isValidDateRange = (
  fromDate: string,
  toDate: string,
): boolean => {
  if (!fromDate || !toDate) {
    return false;
  }

  return fromDate <= toDate;
};