import authClient from "@/services/api/authClient";
import type { AccountsReportType } from "../types/accounts-report.types";

export interface AccountsReportRequest {
  reportType: AccountsReportType;
  courseId: number;
  fromDate: string;
  toDate: string;
  format: "csv";
  send_mail: "Y";
}

export interface AccountsReportResponse {
  success: boolean;
  message: string;
  data?: {
    recipient_email?: string;
    file_name?: string;
    row_count?: number;
    results?: unknown[];
  };
}

export async function sendAccountsReportEmail(
  payload: AccountsReportRequest,
): Promise<AccountsReportResponse> {
  const response = await authClient.post<AccountsReportResponse>(
    "/adminrevamp/reportsaccount/",
    payload,
  );

  if (!response.data.success) {
    throw new Error(
      response.data.message || "Failed to send the accounts report.",
    );
  }

  return response.data;
}
