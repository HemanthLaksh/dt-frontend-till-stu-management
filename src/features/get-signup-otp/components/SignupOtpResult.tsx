import { Smartphone } from "lucide-react";
import Card from "@/components/ui/Card/Card";
import type { SignupOtpData } from "../types/get-signup-otp.types";

interface SignupOtpResultProps {
  data: SignupOtpData;
}

export default function SignupOtpResult({ data }: SignupOtpResultProps) {
  return (
    <Card>
      <div className="space-y-5">
        <div>
          <h2 className="font-semibold text-slate-900">OTP Details</h2>
          <p className="mt-1 text-sm text-slate-500">
            Sample result for UI development only.
          </p>
        </div>

        <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-6 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-white text-blue-600">
            <Smartphone size={22} />
          </div>

          <h3 className="mt-3 text-sm font-medium text-slate-600">
            One-Time Password (OTP)
          </h3>

          <p className="mt-2 break-words text-2xl font-semibold tracking-wide text-blue-700">
            {data.otp}
          </p>

          <p className="mt-4 text-sm text-slate-600">
            Mobile:{" "}
            <span className="font-medium text-slate-900">{data.mobile_no}</span>
          </p>

          <span className="mt-4 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
            Demo Data — Not a Real OTP
          </span>
        </div>
      </div>
    </Card>
  );
}
