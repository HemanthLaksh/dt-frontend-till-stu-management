"use client";

import { useState } from "react";

import { getTrendReport } from "../services/trendsService";

import type {
  TrendReport,
} from "../types/trends.types";

import {
  getDateRangeError,
  isValidDateRange,
} from "../utils/trends.utils";

export const useTrends = () => {
  const [selectedReport, setSelectedReport] =
    useState<TrendReport | null>(null);

  const [generatedReport, setGeneratedReport] =
    useState<TrendReport | null>(null);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const selectReport = (report: TrendReport) => {
    setSelectedReport(report);
    setGeneratedReport(null);
    setFromDate("");
    setToDate("");
    setError("");
  };

  const changeFromDate = (date: string) => {
    setFromDate(date);
    setError("");

    if (toDate && date > toDate) {
      setToDate("");
    }
  };

  const changeToDate = (date: string) => {
    setToDate(date);
    setError("");
  };

  const generateReport = async () => {
    const validationError = getDateRangeError(
      fromDate,
      toDate,
    );

    if (validationError) {
      setError(validationError);
      return;
    }

    if (!isValidDateRange(fromDate, toDate)) {
      setError("Please select a valid date range.");
      return;
    }

    if (!selectedReport) {
      setError("Please select a report.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      setGeneratedReport(null);

      const report = await getTrendReport({
        reportId: selectedReport.id,
        fromDate,
        toDate,
      });

      if (!report) {
        setError("No report data available.");
        return;
      }

      setGeneratedReport(report);
    } catch {
      setError(
        "Unable to generate the report. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    setSelectedReport(null);
    setGeneratedReport(null);
    setFromDate("");
    setToDate("");
    setError("");
  };

  return {
    selectedReport,
    generatedReport,

    fromDate,
    toDate,

    error,
    isLoading,

    selectReport,
    changeFromDate,
    changeToDate,
    generateReport,
    goBack,
  };
};