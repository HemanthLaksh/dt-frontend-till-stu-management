"use client";

import { RotateCcw, Search } from "lucide-react";
import Button from "@/components/ui/Button/Button";

interface GetSignupOtpFormProps {
  mobileNumber: string;
  loading: boolean;
  isValidMobileNumber: boolean;
  onMobileChange: (value: string) => void;
  onSubmit: () => void;
  onReset: () => void;
}

export default function GetSignupOtpForm({
  mobileNumber,
  loading,
  isValidMobileNumber,
  onMobileChange,
  onSubmit,
  onReset,
}: GetSignupOtpFormProps) {
  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div>
        <h2 className="text-base font-semibold text-slate-900">
          Student Mobile Number
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Enter the mobile number to preview signup OTP details.
        </p>
      </div>

      <div className="max-w-xl">
        <label
          htmlFor="signup-mobile"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Mobile Number
        </label>

        <input
          id="signup-mobile"
          type="tel"
          inputMode="numeric"
          autoComplete="off"
          value={mobileNumber}
          onChange={(event) => onMobileChange(event.target.value)}
          placeholder="Enter mobile number"
          maxLength={16}
          aria-describedby="signup-mobile-hint"
          className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
        />

        <p id="signup-mobile-hint" className="mt-2 text-xs text-slate-500">
          Enter 6–16 digits without the country code.
        </p>

        {mobileNumber.length > 0 && !isValidMobileNumber && (
          <p className="mt-2 text-xs text-red-600" role="status">
            Enter 6–16 digits using numbers only.
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-5">
        <Button disabled={!isValidMobileNumber || loading} loading={loading}>
          <Search size={16} className="mr-2" />
          {loading ? "Searching..." : "Get OTP"}
        </Button>

        <Button variant="outline" onClick={onReset} disabled={loading}>
          <RotateCcw size={16} className="mr-2" />
          Clear
        </Button>
      </div>
    </form>
  );
}
