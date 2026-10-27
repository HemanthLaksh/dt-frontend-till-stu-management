import type { StudentOtpRecord } from "../types/get-student-otp.types";

export const MOCK_STUDENT_OTP: StudentOtpRecord = {
  studentId: "DEMO-1001",
  name: "Sample Student",
  mobileNo: "9876543210",
  otp: "DEMO-OTP",
  otpSentAt: "21 Oct 2026, 10:30 AM",
  planName: "NEET PG Premium",
  planId: "PLAN-DEMO-01",
  collegeName: "Sample Medical College",
  profileStatus: "ACTIVE",
  otpAttemptsToday: 1,
  maxAttemptsAllowed: 5,
};
