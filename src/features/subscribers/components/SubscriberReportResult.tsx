"use client";

import { AlertCircle, CheckCircle2, Download } from "lucide-react";

import type { SubscriberReportResponse } from "../types/subscribers.types";

interface SubscriberReportResultProps {
  result: SubscriberReportResponse | null;
}

export default function SubscriberReportResult({
  result,
}: SubscriberReportResultProps) {
  if (!result) {
    return null;
  }

  if (result.status === "N") {
    return (
      <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5">
        <div className="flex items-start gap-3">
          <AlertCircle
            size={20}
            className="mt-0.5 shrink-0 text-red-600"
          />

          <div>
            <h3 className="text-sm font-semibold text-red-800">
              Report Generation Failed
            </h3>

            <p className="mt-1 text-sm text-red-600">
              {result.message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <CheckCircle2
            size={20}
            className="mt-0.5 shrink-0 text-emerald-600"
          />

          <div>
            <h3 className="text-sm font-semibold text-emerald-800">
              Report Generated Successfully
            </h3>

            <p className="mt-1 text-sm text-emerald-700">
              {result.message || "Your subscriber report is ready."}
            </p>
          </div>
        </div>

        {result.reportPath && (
          <a
            href={result.reportPath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            <Download size={17} />
            Download Report
          </a>
        )}
      </div>
    </div>
  );
}