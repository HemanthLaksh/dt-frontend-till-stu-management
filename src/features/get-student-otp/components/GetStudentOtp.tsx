"use client";

import { Smartphone } from "lucide-react";
import Card from "@/components/ui/Card/Card";
import GetStudentOtpForm from "./GetStudentOtpForm";
import StudentOtpResult from "./StudentOtpResult";
import useGetStudentOtp from "../hooks/useGetStudentOtp";

export default function GetStudentOtp() {
  const {
    mobileNo,
    result,
    error,
    loading,
    handleMobileChange,
    handleSubmit,
    reset,
  } = useGetStudentOtp();

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Smartphone size={23} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Get Student OTP
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Find student account and OTP information using a mobile number.
          </p>
        </div>
      </div>

      <Card>
        <GetStudentOtpForm
          mobileNo={mobileNo}
          loading={loading}
          onMobileChange={handleMobileChange}
          onSubmit={handleSubmit}
          onReset={reset}
        />

        {error && (
          <div
            role="alert"
            className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}
      </Card>

      {result && <StudentOtpResult student={result} />}

      {!result && !error && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center">
          <Smartphone className="mx-auto text-slate-400" size={28} />
          <h2 className="mt-3 text-sm font-semibold text-slate-800">
            No student selected
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Enter a mobile number above to preview the sample result.
          </p>
        </div>
      )}
    </div>
  );
}
