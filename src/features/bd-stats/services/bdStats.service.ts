import apiClient from "@/services/api/client";

import type {
  BDStatsRequest,
  BDStatsResponse,
} from "../types/bdStats.types";

export async function getBDStats(
  request: BDStatsRequest,
): Promise<BDStatsResponse> {
  const response = await apiClient.post<BDStatsResponse>(
    "/operationsV2/getBDStats",
    {
      fromDate: request.fromDate || null,
      toDate: request.toDate || null,
      courseId: request.courseId,
    },
  );

  return response.data;
}