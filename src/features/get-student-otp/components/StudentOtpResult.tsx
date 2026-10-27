import { CheckCircle2, ShieldCheck, UserRound } from "lucide-react";
import Card from "@/components/ui/Card/Card";
import type { StudentOtpRecord } from "../types/get-student-otp.types";

interface StudentOtpResultProps {
  student: StudentOtpRecord;
}

export default function StudentOtpResult({ student }: StudentOtpResultProps) {
  const details = [
    ["Student ID", student.studentId],
    ["Mobile Number", student.mobileNo],
    ["Plan", student.planName],
    ["Plan ID", student.planId],
    ["College", student.collegeName],
    ["OTP Sent At", student.otpSentAt],
    ["OTP Attempts Today", String(student.otpAttemptsToday)],
    ["Maximum Attempts", String(student.maxAttemptsAllowed)],
  ];

  return (
    <Card>
      <div className="space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">
                Student OTP Details
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Sample result for UI development only.
              </p>
            </div>
          </div>

          <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
            Demo Data
          </span>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <UserRound size={22} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">{student.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{student.mobileNo}</p>
          </div>
          <span
            className={`ml-auto rounded-full px-2.5 py-1 text-xs font-medium ${
              student.profileStatus === "ACTIVE"
                ? "bg-emerald-50 text-emerald-700"
                : student.profileStatus === "PENDING"
                  ? "bg-amber-50 text-amber-700"
                  : "bg-slate-100 text-slate-600"
            }`}
          >
            {student.profileStatus}
          </span>
        </div>

        <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
          <div className="flex items-center gap-2 text-blue-700">
            <ShieldCheck size={18} />
            <span className="text-sm font-medium">OTP Reference</span>
          </div>
          <p className="mt-2 text-xl font-semibold tracking-wider text-slate-900">
            {student.otp}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Placeholder only — no real OTP has been retrieved.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 border-t border-slate-200 pt-4 sm:grid-cols-2 lg:grid-cols-3">
          {details.map(([label, value]) => (
            <div key={label}>
              <p className="text-xs font-medium text-slate-500">{label}</p>
              <p className="mt-1 break-words text-sm font-medium text-slate-900">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
