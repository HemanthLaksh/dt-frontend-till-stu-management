"use client";

import { useCallback, useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";
import type { DashboardResponse } from "../types/dashboard.types";

export function useDashboard() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getDashboard();

      if (response.status !== "Y") {
        setError(response.message || "Unable to load dashboard data.");
        return;
      }

      setData(response);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to load dashboard data.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchDashboard();
  }, [fetchDashboard]);

  return {
    data,
    loading,
    error,
    refetch: fetchDashboard,
  };
}