import apiClient from "@/services/api/client";

import type {
  VideosDownloadAnalyticsRequest,
  VideosDownloadAnalyticsResponse,
} from "../types/videosDownloadAnalytics.types";

export async function getVideosDownloadAnalytics(
  request: VideosDownloadAnalyticsRequest,
): Promise<VideosDownloadAnalyticsResponse> {
  const payload: Record<string, string | number> = {};

  /*
   * Student ID takes priority.
   *
   * Old PHP behavior:
   * { studentID: <id> }
   */
  if (request.studentid.trim()) {
    payload.studentID = Number(request.studentid);
  }

  /*
   * If Student ID is not supplied, use the date range.
   */
  else if (request.fdate && request.tdate) {
    payload.fromDate = request.fdate;
    payload.toDate = request.tdate;
  }

  /*
   * If no filter is supplied, payload remains {}
   */

  const response =
    await apiClient.post<VideosDownloadAnalyticsResponse>(
      "/BVRBackEndCore/Operations/getStudentAnalyticsVideosDownload",
      payload,
    );

  return response.data;
}