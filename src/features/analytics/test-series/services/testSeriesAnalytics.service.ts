import apiClient from "@/services/api/client";

import type {
  TestSeriesAnalyticsRequest,
  TestSeriesAnalyticsResponse,
} from "../types/testSeriesAnalytics.types";

export async function getTestSeriesAnalytics(
  request: TestSeriesAnalyticsRequest,
): Promise<TestSeriesAnalyticsResponse> {
  const payload: Record<string, string | number> = {};

  if (request.studentid.trim()) {
    payload.studentID = Number(request.studentid);
  } else if (request.fdate && request.tdate) {
    payload.fromDate = request.fdate;
    payload.toDate = request.tdate;
  }

  const response = await apiClient.post<TestSeriesAnalyticsResponse>(
    "/BVRBackEndCore/Operations/getStudentAnalyticsTestSeries",
    payload,
  );

  return response.data;
}