"use client";

import { useCallback, useState } from "react";

import { getVideosViewAnalytics } from "../services/videosViewAnalytics.service";

import type {
  VideosViewAnalyticsItem,
  VideosViewAnalyticsRequest,
} from "../types/videosViewAnalytics.types";

export function useVideosViewAnalytics() {
  const [data, setData] = useState<VideosViewAnalyticsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(
    async (request: VideosViewAnalyticsRequest) => {
      try {
        setLoading(true);
        setError(null);

        const response = await getVideosViewAnalytics(request);

        setData(response.analytics ?? []);
      } catch (err) {
        setData([]);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to fetch Videos View Analytics.",
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