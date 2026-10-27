"use client";

import { useState } from "react";

import { getTrendReport } from "../services/trendsService";
import type { TrendReport } from "../types/trends.types";

import { getDateRangeError, isValidDateRange } from "../utils/trends.utils";

export const useTrends = () => {
  const [selectedReport, setSelectedReport] = useState<TrendReport | null>(
    null,
  );

  const [generatedReport, setGeneratedReport] = useState<TrendReport | null>(
    null,
  );

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [state, setState] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const selectReport = (report: TrendReport) => {
    setSelectedReport(report);
    setGeneratedReport(null);
    setFromDate("");
    setToDate("");
    setState("");
    setError("");
  };

  const changeFromDate = (date: string) => {
    setFromDate(date);
    setError("");
    setGeneratedReport(null);

    if (toDate && date > toDate) {
      setToDate("");
    }
  };

  const changeToDate = (date: string) => {
    setToDate(date);
    setError("");
    setGeneratedReport(null);
  };

  const changeState = (value: string) => {
    setState(value);
    setError("");
    setGeneratedReport(null);
  };

  const generateReport = async () => {
    const validationError = getDateRangeError(fromDate, toDate);

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

    const isStateWiseReport = selectedReport.id.endsWith("-state-wise");

    if (isStateWiseReport && !state.trim()) {
      setError("Please enter a state.");
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
        ...(isStateWiseReport ? { state: state.trim() } : {}),
      });

      if (!report) {
        setError("No report data available.");
        return;
      }

      setGeneratedReport({
        ...report,
        title: "Generated Report",
        description: "Insights based on your selected date range and filters",
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to generate the report. Please try again.";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    setSelectedReport(null);
    setGeneratedReport(null);
    setFromDate("");
    setToDate("");
    setState("");
    setError("");
  };

  const clearFilters = () => {
    setFromDate("");
    setToDate("");
    setState("");
    setError("");
    setGeneratedReport(null);
  };

  return {
    selectedReport,
    generatedReport,
    fromDate,
    toDate,
    state,
    error,
    isLoading,
    selectReport,
    changeFromDate,
    changeToDate,
    changeState,
    clearFilters,
    generateReport,
    goBack,
  };
};
