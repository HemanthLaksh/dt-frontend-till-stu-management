"use client";

import { useState } from "react";

import { getPlanAccessedReport } from "../services/planAccessed.service";
import type { PlanAccessedResponse } from "../types/planAccessed.types";

export function usePlanAccessed() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PlanAccessedResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = async (
    adminId: number,
    courseId: number,
    fromDate: string,
    toDate: string
  ) => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const response = await getPlanAccessedReport({
        adminId,
        courseId,
        fromDate,
        toDate,
      });

      setResult(response);

      if (response.status === "N") {
        setError("Report Download Failed! Try Again");
      }

      return response;
    } catch {
      setError("Report Download Failed! Try Again");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    result,
    error,
    fetchReport,
  };
}