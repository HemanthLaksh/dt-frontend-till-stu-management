"use client";

import { useCallback, useState } from "react";

import { getVideosDownloadAnalytics } from "../services/videosDownloadAnalytics.service";

import type {
  VideosDownloadAnalyticsItem,
  VideosDownloadAnalyticsRequest,
} from "../types/videosDownloadAnalytics.types";

export function useVideosDownloadAnalytics() {
  const [data, setData] = useState<VideosDownloadAnalyticsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(
    async (request: VideosDownloadAnalyticsRequest) => {
      try {
        setLoading(true);
        setError(null);

        const response = await getVideosDownloadAnalytics(request);

        setData(response.analytics ?? []);
      } catch (err) {
        setData([]);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to fetch Videos Download Analytics.",
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