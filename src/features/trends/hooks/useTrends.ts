"use client";

import { useCallback, useState } from "react";

import { getTrendReport } from "../services/trendsService";
import type { TrendReport } from "../types/trends.types";
import { getDateRangeError } from "../utils/trends.utils";

type LoadingMode = "module" | "report";

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

  // Controls the transition into a report section.
  const [isModuleLoading, setIsModuleLoading] = useState(false);

  // Controls only manual/normal report generation.
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  const fetchReport = useCallback(
    async (
      reportToFetch: TrendReport,
      dates: { fromDate: string; toDate: string },
      selectedState: string,
      loadingMode: LoadingMode,
    ) => {
      const isCollegeWise = reportToFetch.id.endsWith("-college");

      const isStateWiseReport = reportToFetch.id.endsWith("-state-wise");

      if (!isCollegeWise) {
        const validationError = getDateRangeError(dates.fromDate, dates.toDate);

        if (validationError) {
          setError(validationError);
          return;
        }
      }

      if (isStateWiseReport && !selectedState.trim()) {
        setError("Please enter a state.");
        return;
      }

      if (loadingMode === "module") {
        setIsModuleLoading(true);
      } else {
        setIsGeneratingReport(true);
      }

      try {
        setError("");
        setGeneratedReport(null);

        const report = await getTrendReport({
          reportId: reportToFetch.id,
          fromDate: dates.fromDate,
          toDate: dates.toDate,
          ...(isStateWiseReport ? { state: selectedState.trim() } : {}),
        });

        if (!report) {
          setError("No report data available.");
          return;
        }

        setGeneratedReport({
          ...report,
          title: reportToFetch.title,
          description: isCollegeWise
            ? "Insights based on College-wise student data"
            : "Insights based on your selected date range and filters",
        });
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to generate the report. Please try again.",
        );
      } finally {
        if (loadingMode === "module") {
          setIsModuleLoading(false);
        } else {
          setIsGeneratingReport(false);
        }
      }
    },
    [],
  );

  const selectReport = (report: TrendReport) => {
    setSelectedReport(report);
    setGeneratedReport(null);
    setFromDate("");
    setToDate("");
    setState("");
    setError("");

    if (report.id.endsWith("-college")) {
      // College-wise reports load their data automatically.
      // Keep the module loader visible until the API completes.
      void fetchReport(report, { fromDate: "", toDate: "" }, "", "module");
    } else {
      // Normal reports have no automatic data request.
      // Show the module loader for the section transition.
      setIsModuleLoading(true);

      requestAnimationFrame(() => {
        setIsModuleLoading(false);
      });
    }
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

  const generateReport = useCallback(async () => {
    if (!selectedReport) {
      setError("Please select a report.");
      return;
    }

    await fetchReport(selectedReport, { fromDate, toDate }, state, "report");
  }, [selectedReport, fromDate, toDate, state, fetchReport]);

  const goBack = () => {
    setSelectedReport(null);
    setGeneratedReport(null);
    setFromDate("");
    setToDate("");
    setState("");
    setError("");
    setIsModuleLoading(false);
    setIsGeneratingReport(false);
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
    isModuleLoading,
    isGeneratingReport,
    selectReport,
    changeFromDate,
    changeToDate,
    changeState,
    clearFilters,
    generateReport,
    goBack,
  };
};
