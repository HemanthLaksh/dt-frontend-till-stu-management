"use client";

import { User, X } from "lucide-react";

import type { QuestionBankAnalyticsItem } from "../types/questionBankAnalytics.types";

interface StudentProfileModalProps {
  student: QuestionBankAnalyticsItem;
  onClose: () => void;
}

export default function StudentProfileModal({
  student,
  onClose,
}: StudentProfileModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <User
                size={20}
                className="text-blue-600"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Student Profile
              </h2>

              <p className="text-xs text-slate-500">
                Student ID: {student.studentID}
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
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <InfoItem
              label="Student ID"
              value={String(student.studentID)}
            />

            <InfoItem
              label="Name"
              value={student.studentName}
            />

            <InfoItem
              label="ISD Code"
              value={student.isdCode}
            />

            <InfoItem
              label="Mobile No."
              value={student.mobileNo}
            />

            <InfoItem
              label="Email"
              value={student.email}
            />

            <InfoItem
              label="Education"
              value={student.education}
            />

            <InfoItem
              label="College"
              value={student.college}
            />

            <InfoItem
              label="State"
              value={student.addressState}
            />

            <InfoItem
              label="Subscription Taken"
              value={student.subscribedYN}
            />

            <InfoItem
              label="Plan Subscribed"
              value={student.subsribedToPlan}
            />

            <InfoItem
              label="Subscription Date"
              value={student.subscribedDate}
            />

            <InfoItem
              label="Coupon Code Used"
              value={student.couponCodeUsed}
            />

            <InfoItem
              label="Subscription Order ID"
              value={student.subscriptionOrderID}
            />

            <InfoItem
              label="Amount"
              value={String(student.amount)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-medium text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-slate-800">
        {value || "—"}
      </p>
    </div>
  );
}