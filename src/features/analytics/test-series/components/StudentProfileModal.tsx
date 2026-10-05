"use client";

import { X } from "lucide-react";

import type {
  TestSeriesAnalyticsItem,
} from "../types/testSeriesAnalytics.types";

interface StudentProfileModalProps {
  student: TestSeriesAnalyticsItem | null;
  onClose: () => void;
}

interface DetailRowProps {
  label: string;
  value: string | number | null | undefined;
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="grid grid-cols-1 gap-1 border-b border-slate-100 py-3 sm:grid-cols-[220px_1fr] sm:gap-4">
      <div className="text-sm font-medium text-slate-500">
        {label}
      </div>

      <div className="text-sm font-semibold text-slate-800">
        {value !== null && value !== undefined && value !== ""
          ? String(value)
          : "-"}
      </div>
    </div>
  );
}

export default function StudentProfileModal({
  student,
  onClose,
}: StudentProfileModalProps) {
  if (!student) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="student-profile-title"
    >
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-blue-50 px-6 py-4">
          <div>
            <h2
              id="student-profile-title"
              className="text-lg font-semibold text-slate-900"
            >
              Student Profile
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Student subscription and account details
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close student profile"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-white hover:text-slate-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-6 py-4">
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <DetailRow
              label="Student ID"
              value={student.studentID}
            />

            <DetailRow
              label="Name"
              value={student.studentName}
            />

            <DetailRow
              label="ISD Code"
              value={student.isdCode}
            />

            <DetailRow
              label="Mobile No."
              value={student.mobileNo}
            />

            <DetailRow
              label="Email"
              value={student.email}
            />

            <DetailRow
              label="Education"
              value={student.education}
            />

            <DetailRow
              label="College"
              value={student.college}
            />

            <DetailRow
              label="State"
              value={student.addressState}
            />

            <DetailRow
              label="Subscription Taken"
              value={student.subscribedYN}
            />

            <DetailRow
              label="Plan Subscribed"
              value={student.subsribedToPlan}
            />

            <DetailRow
              label="Subscription Date"
              value={student.subscribedDate}
            />

            <DetailRow
              label="Coupon Code Used"
              value={student.couponCodeUsed}
            />

            <DetailRow
              label="Subscription Order ID"
              value={student.subscriptionOrderID}
            />

            <DetailRow
              label="Amount"
              value={student.amount}
            />

            <DetailRow
              label="Video Download"
              value={student.videoDownload}
            />

            <DetailRow
              label="Videos View"
              value={student.videosView}
            />

            <DetailRow
              label="Coupon Report"
              value={student.couponReport}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}