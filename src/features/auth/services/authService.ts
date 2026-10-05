import authClient from "@/services/api/authClient";
import type {
  LoginCredentials,
  LoginResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "../types/auth.types";

export async function loginAdmin(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  const formData = new URLSearchParams();

  formData.append("userID", credentials.userID);
  formData.append("password", credentials.password);

  const response = await authClient.post<LoginResponse>(
    "/admin/login/",
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  return response.data;
}


export async function verifyAdminOtp(
  adminEmail: string,
  otp: string,
): Promise<VerifyOtpResponse> {
  const formData = new URLSearchParams();

  formData.append("admin_email", adminEmail);
  formData.append("otp", otp);

  const response = await authClient.post<VerifyOtpResponse>(
    "/admin/admin/curl_validateotp/",
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  return response.data;
}