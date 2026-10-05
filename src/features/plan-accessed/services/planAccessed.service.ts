import apiClient from "@/services/api/client";
import type {
  PlanAccessedRequest,
  PlanAccessedResponse,
} from "../types/planAccessed.types";

export async function getPlanAccessedReport(
  payload: PlanAccessedRequest
): Promise<PlanAccessedResponse> {
  const response = await apiClient.post<PlanAccessedResponse>(
    "/Plan/getAllOrderAttemptsDownload",
    payload
  );

  return response.data;
}