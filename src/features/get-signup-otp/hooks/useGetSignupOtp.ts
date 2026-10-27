"use client";

import { useState } from "react";
import { MOCK_SIGNUP_OTP } from "../utils/signup-otp.mock";
import type { SignupOtpData } from "../types/get-signup-otp.types";

export default function useGetSignupOtp() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpData, setOtpData] = useState<SignupOtpData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const isValidMobileNumber = /^\d{6,16}$/.test(mobileNumber);

  const handleMobileChange = (value: string) => {
    setMobileNumber(value.replace(/\D/g, "").slice(0, 16));
    setOtpData(null);
    setError("");
    setSearched(false);
  };

  const handleSubmit = async () => {
    if (!isValidMobileNumber) {
      setError("Please enter a valid mobile number (6–16 digits).");
      return;
    }

    setLoading(true);
    setError("");
    setOtpData(null);
    setSearched(false);

    try {
      // Simulate a lookup. No API call is made.
      await new Promise((resolve) => setTimeout(resolve, 400));

      setOtpData({
        ...MOCK_SIGNUP_OTP,
        mobile_no: mobileNumber,
      });
      setSearched(true);
    } catch {
      setError("Unable to load signup OTP details.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setMobileNumber("");
    setOtpData(null);
    setError("");
    setLoading(false);
    setSearched(false);
  };

  return {
    mobileNumber,
    otpData,
    loading,
    error,
    searched,
    isValidMobileNumber,
    handleMobileChange,
    handleSubmit,
    reset,
  };
}
