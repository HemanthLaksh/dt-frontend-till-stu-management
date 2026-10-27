"use client";

import { useState } from "react";
import { MOCK_STUDENT_OTP } from "../utils/student-otp.mock";
import type { StudentOtpRecord } from "../types/get-student-otp.types";

export default function useGetStudentOtp() {
  const [mobileNo, setMobileNo] = useState("");
  const [result, setResult] = useState<StudentOtpRecord | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMobileChange = (value: string) => {
    setMobileNo(value.replace(/\D/g, "").slice(0, 16));
    setError("");
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!/^\d{6,16}$/.test(mobileNo)) {
      setError("Enter a mobile number containing 6–16 digits.");
      setResult(null);
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    // Simulate a lookup using dummy data.
    await new Promise((resolve) => setTimeout(resolve, 400));

    setResult({
      ...MOCK_STUDENT_OTP,
      mobileNo,
    });

    setLoading(false);
  };

  const reset = () => {
    setMobileNo("");
    setResult(null);
    setError("");
    setLoading(false);
  };

  return {
    mobileNo,
    result,
    error,
    loading,
    handleMobileChange,
    handleSubmit,
    reset,
  };
}
