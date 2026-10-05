"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAppSelector } from "@/store/hooks";

import { useAuth } from "../hooks/useAuth";

export default function OtpVerification() {
  const router = useRouter();
  const admin = useAppSelector(
    (state) => state.auth.admin,
  );

  const otpPending = useAppSelector(
    (state) => state.auth.otpPending,
  );

  const isAuthenticated = useAppSelector(
    (state) => state.auth.isAuthenticated,
  );

  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const inputRefs = useRef<
    Array<HTMLInputElement | null>
  >([]);

  const {
    verifyOtp,
    completeAuthentication,
    loading,
    error,
    setError,
  } = useAuth();

  /*
   * If the user reaches this page directly
   * without completing username/password,
   * send them back to login.
   */
  useEffect(() => {
    if (
      !isAuthenticated &&
      (!otpPending || !admin)
    ) {
      router.replace("/login");
    }
  }, [
    admin,
    otpPending,
    isAuthenticated,
    router,
  ]);

  /*
   * Temporary authentication state debugging.
   */
  useEffect(() => {
    console.log("Auth state changed:", {
      isAuthenticated,
      admin,
      otpPending,
    });
  }, [
    isAuthenticated,
    admin,
    otpPending,
  ]);

  /*
   * Handle entering one digit.
   */
  const handleChange = (
    index: number,
    value: string,
  ) => {
    const digit = value
      .replace(/\D/g, "")
      .slice(-1);

    const updatedOtp = [...otp];

    updatedOtp[index] = digit;

    setOtp(updatedOtp);
    setError(null);

    /*
     * Automatically move to the next box.
     */
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /*
   * Handle backspace navigation.
   */
  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (
      event.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  /*
   * Allow the user to paste the complete OTP.
   */
  const handlePaste = (
    event: React.ClipboardEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();

    const pastedOtp = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedOtp) {
      return;
    }

    const updatedOtp = Array.from(
      { length: 6 },
      (_, index) => pastedOtp[index] || "",
    );

    setOtp(updatedOtp);
    setError(null);

    const focusIndex = Math.min(
      pastedOtp.length,
      5,
    );

    inputRefs.current[focusIndex]?.focus();
  };

  /*
   * Submit OTP.
   */
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setError(
        "Please enter the 6 digit OTP.",
      );
      return;
    }

    if (!admin) {
      router.replace("/login");
      return;
    }

    const verified = await verifyOtp(
      admin.adminEmail,
      otpValue,
    );

    console.log("OTP verified:", verified);
    console.log("Admin:", admin);

    if (!verified) {
      console.log(
        "OTP verification failed",
      );
      return;
    }

    console.log(
      "OTP verification successful",
    );
console.log("🔥 ABOUT TO CALL COMPLETE AUTH");

    /*
     * OTP successfully verified.
     *
     * Authentication is now complete.
     */
    completeAuthentication(admin);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          {/* Header */}
          <div className="bg-blue-600 px-8 py-7 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-white text-blue-600 shadow-md">
              <ShieldCheck className="h-8 w-8" />
            </div>

            <h1 className="mt-4 text-2xl font-semibold text-white">
              Admin Login
            </h1>

            <p className="mt-1 text-sm text-blue-100">
              Verify your identity
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-slate-900">
                Enter 6 Digit OTP
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter the OTP sent to your registered
                email or Outlook account.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-7"
            >
              {/* OTP Inputs */}
              <div className="flex justify-center gap-2 sm:gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      inputRefs.current[index] =
                        element;
                    }}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    disabled={loading}
                    onChange={(event) =>
                      handleChange(
                        index,
                        event.target.value,
                      )
                    }
                    onKeyDown={(event) =>
                      handleKeyDown(
                        index,
                        event,
                      )
                    }
                    onPaste={handlePaste}
                    autoComplete={
                      index === 0
                        ? "one-time-code"
                        : "off"
                    }
                    aria-label={`OTP digit ${
                      index + 1
                    }`}
                    className="h-12 w-11 rounded-lg border border-slate-200 bg-slate-50 text-center text-lg font-semibold text-slate-900 outline-none transition hover:border-slate-300 hover:bg-white focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:opacity-60 sm:h-14 sm:w-12"
                  />
                ))}
              </div>

              {/* Error */}
              {error && (
                <div
                  role="alert"
                  className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700"
                >
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={
                  loading ||
                  otp.join("").length !== 6
                }
                className="mt-6 h-12 w-full rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Verifying...
                  </span>
                ) : (
                  "Submit"
                )}
              </button>
            </form>

            {/* Back */}
            <button
              type="button"
              disabled={loading}
              onClick={() =>
                router.replace("/login")
              }
              className="mx-auto mt-5 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}