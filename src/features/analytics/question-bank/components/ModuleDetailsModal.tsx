"use client";

import {
  BarChart3,
  CheckCircle2,
  Clock3,
  X,
  XCircle,
} from "lucide-react";

import type { QuestionBankAnalyticsItem } from "../types/questionBankAnalytics.types";

interface ModuleDetailsModalProps {
  module: QuestionBankAnalyticsItem["module"];
  onClose: () => void;
}

export default function ModuleDetailsModal({
  module,
  onClose,
}: ModuleDetailsModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <BarChart3
                size={20}
                className="text-blue-600"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Module Details
              </h2>

              <p className="text-xs text-slate-500">
                Question Bank activity
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[calc(90vh-90px)] overflow-y-auto p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InfoCard
              icon={<BarChart3 size={18} />}
              label="Module Tracking ID"
              value={module.moduleTrackingID}
            />

            <InfoCard
              icon={<Clock3 size={18} />}
              label="Module Accessed At"
              value={module.moduleAccessedAt}
            />

            <InfoCard
              icon={<CheckCircle2 size={18} />}
              label="Correct Answers"
              value={String(module.correctAnswers)}
              valueClassName="text-emerald-600"
            />

            <InfoCard
              icon={<XCircle size={18} />}
              label="Incorrect Answers"
              value={String(module.incorrectAnswers)}
              valueClassName="text-red-600"
            />

            <InfoCard
              icon={<BarChart3 size={18} />}
              label="Skipped Answers"
              value={String(module.skippedAnswers)}
            />

            <InfoCard
              icon={<BarChart3 size={18} />}
              label="Module Name"
              value={module.moduleName}
            />

            <InfoCard
              icon={<BarChart3 size={18} />}
              label="Topic Name"
              value={module.topicName}
            />

            <InfoCard
              icon={<BarChart3 size={18} />}
              label="Subject Name"
              value={module.subjectName}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
  valueClassName = "text-slate-800",
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  valueClassName?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-slate-400">
        {icon}

        <span className="text-xs font-medium">
          {label}
        </span>
      </div>

      <p
        className={`mt-2 text-sm font-semibold ${valueClassName}`}
      >
        {value || "—"}
      </p>
    </div>
  );
}