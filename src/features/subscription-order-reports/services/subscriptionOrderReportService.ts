import authClient from "@/services/api/authClient";

export interface SubscriptionOrderReportRequest {
  academic_year: string;
  course_id: number;
  start_date: string;
  end_date: string;
  send_mail: "Y";
}

export interface SubscriptionOrderReportResponse {
  success: boolean;
  message: string;
  data?: {
    recipient_email?: string;
    file_name?: string;
    row_count?: number;
  };
}

export async function sendSubscriptionOrderReport(
  payload: SubscriptionOrderReportRequest,
): Promise<SubscriptionOrderReportResponse> {
  const response = await authClient.post<SubscriptionOrderReportResponse>(
    "/adminrevamp/reportsnotesorder/",
    payload,
  );

  if (!response.data.success) {
    throw new Error(
      response.data.message || "Failed to send the order report.",
    );
  }

  return response.data;
}
