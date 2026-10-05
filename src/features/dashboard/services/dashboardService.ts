import apiClient from "@/api/client";
import type { DashboardResponse } from "../types/dashboard.types";

export async function getDashboard(): Promise<DashboardResponse> {
  const response = await apiClient.post<DashboardResponse>(
    "/Operations/dashboard",
    {},
  );

  return response.data;
}