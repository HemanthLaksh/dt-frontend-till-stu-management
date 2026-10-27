export interface StudentOtpRecord {
  studentId: string;
  name: string;
  mobileNo: string;
  otp: string;
  otpSentAt: string;
  planName: string;
  planId: string;
  collegeName: string;
  profileStatus: "ACTIVE" | "INACTIVE" | "PENDING";
  otpAttemptsToday: number;
  maxAttemptsAllowed: number;
}

export interface GetStudentOtpResult {
  success: boolean;
  message: string;
  data: StudentOtpRecord | null;
}
