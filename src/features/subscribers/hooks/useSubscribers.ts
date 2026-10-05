"use client";

import { useState } from "react";

import { getSubscribersReport } from "../services/subscribersService";

import type {
  SubscriberFilters,
  SubscriberReportResponse,
  SubscriberReportType,
} from "../types/subscribers.types";

export default function useSubscribers() {
  const [reportType, setReportType] =
    useState<SubscriberReportType | null>(null);

  const [filters, setFilters] = useState<SubscriberFilters>({
    courseId: "",
    businessType: "",
    fromDate: "",
    toDate: "",
  });

  const [result, setResult] =
    useState<SubscriberReportResponse | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const selectReportType = (
    type: SubscriberReportType,
  ) => {
    setReportType(type);
    setResult(null);
    setError("");
  };

  const updateFilter = (
    field: keyof SubscriberFilters,
    value: string,
  ) => {
    setFilters((previous) => ({
      ...previous,
      [field]: value,
    }));

    setResult(null);
    setError("");
  };

  const generateReport = async () => {
    if (!reportType) {
      return;
    }

    if (!filters.businessType) {
      setError("Select Business Type");
      return;
    }

    if (!filters.courseId) {
      setError("Select Course");
      return;
    }

    if (!filters.fromDate) {
      setError("Select From Date");
      return;
    }

    if (!filters.toDate) {
      setError("Select To Date");
      return;
    }

    if (filters.fromDate > filters.toDate) {
      setError("To Date cannot be earlier than From Date");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      setResult(null);

      const response = await getSubscribersReport(
        reportType,
        {
          courseId: Number(filters.courseId),
          businessType: filters.businessType,
          fromDate: filters.fromDate,
          toDate: filters.toDate,
        },
      );

      setResult(response);
    } catch {
      setError(
        "Unable to generate subscriber report. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setReportType(null);

    setFilters({
      courseId: "",
      businessType: "",
      fromDate: "",
      toDate: "",
    });

    setResult(null);
    setError("");
  };

  return {
    reportType,
    filters,
    result,
    error,
    isLoading,
    selectReportType,
    updateFilter,
    generateReport,
    reset,
  };
}