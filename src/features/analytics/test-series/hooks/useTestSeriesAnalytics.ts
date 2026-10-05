"use client";

import { useCallback, useState } from "react";

import { getTestSeriesAnalytics } from "../services/testSeriesAnalytics.service";

import type {
  TestSeriesAnalyticsItem,
  TestSeriesAnalyticsRequest,
} from "../types/testSeriesAnalytics.types";

export function useTestSeriesAnalytics() {
  const [data, setData] = useState<TestSeriesAnalyticsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(
    async (request: TestSeriesAnalyticsRequest) => {
      try {
        setLoading(true);
        setError(null);

        const response = await getTestSeriesAnalytics(request);

        setData(response.analytics ?? []);
      } catch (err) {
        setData([]);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to fetch Test Series Analytics.",
        );
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const clearAnalytics = useCallback(() => {
    setData([]);
    setError(null);
  }, []);

  return {
    data,
    loading,
    error,
    fetchAnalytics,
    clearAnalytics,
  };
}