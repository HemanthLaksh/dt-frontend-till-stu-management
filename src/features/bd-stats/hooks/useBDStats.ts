"use client";

import { useCallback, useState } from "react";

import { getBDStats } from "../services/bdStats.service";

import type {
  BDStatsItem,
  BDStatsRequest,
} from "../types/bdStats.types";

export function useBDStats() {
  const [data, setData] = useState<BDStatsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBDStats = useCallback(
    async (request: BDStatsRequest) => {
      try {
        setLoading(true);
        setError(null);

        const response = await getBDStats(request);

        setData(response.bdstats ?? []);
      } catch (err) {
        setData([]);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to fetch BD Stats.",
        );
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const clearBDStats = useCallback(() => {
    setData([]);
    setError(null);
  }, []);

  return {
    data,
    loading,
    error,
    fetchBDStats,
    clearBDStats,
  };
}