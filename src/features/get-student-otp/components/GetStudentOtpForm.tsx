"use client";

import { Search, RotateCcw } from "lucide-react";
import Button from "@/components/ui/Button/Button";

interface GetStudentOtpFormProps {
  mobileNo: string;
  loading: boolean;
  onMobileChange: (value: string) => void;
  onSubmit: () => void;
  onReset: () => void;
}

export default function GetStudentOtpForm({
  mobileNo,
  loading,
  onMobileChange,
  onSubmit,
  onReset,
}: GetStudentOtpFormProps) {
  const valid = /^\d{6,16}$/.test(mobileNo);

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
          Student Details
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Enter the student&apos;s mobile number to view OTP details.
        </p>
      </div>

      <div className="max-w-xl">
        <label
          htmlFor="student-mobile"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Mobile Number
        </label>

        <input
          id="student-mobile"
          type="tel"
          inputMode="numeric"
          autoComplete="off"
          value={mobileNo}
          onChange={(event) => onMobileChange(event.target.value)}
          placeholder="Enter mobile number"
          maxLength={16}
          aria-describedby="mobile-hint"
          className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
        />

        <p id="mobile-hint" className="mt-2 text-xs text-slate-500">
          Enter 6–16 digits without the country code.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-5">
        <Button loading={loading} disabled={!valid || loading}>
          <Search size={16} className="mr-2" />
          {loading ? "Searching..." : "Get Student OTP"}
        </Button>

        <Button variant="outline" onClick={onReset} disabled={loading}>
          <RotateCcw size={16} className="mr-2" />
          Clear
        </Button>
      </div>
    </form>
  );
}
