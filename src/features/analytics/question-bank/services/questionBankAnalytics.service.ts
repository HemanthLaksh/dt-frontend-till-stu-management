import apiClient from "@/services/api/client";

import type {
  QuestionBankAnalyticsRequest,
  QuestionBankAnalyticsResponse,
} from "../types/questionBankAnalytics.types";

export async function getQuestionBankAnalytics(
  request: QuestionBankAnalyticsRequest,
): Promise<QuestionBankAnalyticsResponse> {
  const response =
    await apiClient.post<QuestionBankAnalyticsResponse>(
      "/Operations/getStudentAnalyticsModule",
      {
        ...(request.studentid
          ? {
              studentID: Number(request.studentid),
            }
          : {}),

        ...(request.fdate && request.tdate
          ? {
              fromDate: request.fdate,
              toDate: request.tdate,
            }
          : {}),
      },
    );

  return response.data;
}