"use client";

import { useCallback, useState } from "react";

import { getActivitySummary } from "../services/activitySummary.service";

import type {
  ActivitySummaryResponse,
} from "../types/activitySummary.types";

export function useActivitySummary() {
  const [data, setData] = useState<ActivitySummaryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchActivitySummary = useCallback(
    async (date: string) => {
      try {
        setLoading(true);
        setError(null);

        const response = await getActivitySummary(date);

        if (response.status !== "Y") {
          setData(null);
          setError("No activity summary available for the selected date.");
          return;
        }

        setData(response);
      } catch (err) {
        setData(null);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to fetch Activity Summary.",
        );
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const clearActivitySummary = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return {
    data,
    loading,
    error,
    fetchActivitySummary,
    clearActivitySummary,
  };
}