import authClient from "@/services/api/authClient";

export interface CouponAttemptsRequest {
  courseId: number;
  fromDate: string;
  toDate: string;
  sendMail: "Y";
}

export interface CouponAttemptsResponse {
  success: boolean;
  message: string;
  data?: {
    recipient_email?: string;
    file_name?: string;
    row_count?: number;
  };
}

export async function sendCouponAttemptsReport(
  payload: CouponAttemptsRequest,
): Promise<CouponAttemptsResponse> {
  const response = await authClient.post<CouponAttemptsResponse>(
    "/adminrevamp/reportsCouponDetails/",
    payload,
  );

  if (response.data.success !== true) {
    throw new Error(
      response.data.message || "Failed to send the coupon attempts report.",
    );
  }

  return response.data;
}
