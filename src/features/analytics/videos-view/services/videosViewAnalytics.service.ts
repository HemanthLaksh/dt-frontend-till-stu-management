import apiClient from "@/services/api/client";

import type {
  VideosViewAnalyticsRequest,
  VideosViewAnalyticsResponse,
} from "../types/videosViewAnalytics.types";

export async function getVideosViewAnalytics(
  request: VideosViewAnalyticsRequest,
): Promise<VideosViewAnalyticsResponse> {
  const payload: Record<string, string | number> = {};

  /*
   * Student ID takes priority.
   */
  if (request.studentid.trim()) {
    payload.studentID = Number(request.studentid);
  }

  /*
   * If Student ID is not supplied,
   * use the date range.
   */
  else if (request.fdate && request.tdate) {
    payload.fromDate = request.fdate;
    payload.toDate = request.tdate;
  }

  /*
   * If there are no filters,
   * payload remains {}.
   */

  const response =
    await apiClient.post<VideosViewAnalyticsResponse>(
      "/BVRBackEndCore/Operations/getStudentAnalyticsVideosView",
      payload,
    );

  return response.data;
}