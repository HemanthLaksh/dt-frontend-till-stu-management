"use client";

import { useCallback, useState } from "react";

import { getQuestionBankAnalytics } from "../services/questionBankAnalytics.service";

import type {
  QuestionBankAnalyticsItem,
  QuestionBankAnalyticsRequest,
} from "../types/questionBankAnalytics.types";

export function useQuestionBankAnalytics() {
  const [data, setData] = useState<QuestionBankAnalyticsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(
    async (request: QuestionBankAnalyticsRequest) => {
      try {
        setLoading(true);
        setError(null);

        const response = await getQuestionBankAnalytics(request);

        setData(response.analytics ?? []);
      } catch (err) {
        setData([]);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to fetch Question Bank Analytics.",
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