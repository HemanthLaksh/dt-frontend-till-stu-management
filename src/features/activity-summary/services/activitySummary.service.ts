import apiClient from "@/services/api/client";

import type {
  ActivitySummaryResponse,
} from "../types/activitySummary.types";

export async function getActivitySummary(
  date: string,
): Promise<ActivitySummaryResponse> {
  const response = await apiClient.post<ActivitySummaryResponse>(
    "/Operations/testActivitySummary",
    {
      dateyyyymmdd: date,
    },
  );

  return response.data;
}