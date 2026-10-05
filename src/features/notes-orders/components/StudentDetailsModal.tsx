"use client";

import { MapPin, User, X } from "lucide-react";

import type { NotesOrder } from "../types/notesOrders.types";

interface StudentDetailsModalProps {
  order: NotesOrder;
  onClose: () => void;
}

export default function StudentDetailsModal({
  order,
  onClose,
}: StudentDetailsModalProps) {
  const address = [
    order.address.addressLine,
    order.address.city,
    order.address.state,
    order.address.pinCode,
  ]
    .filter(Boolean)
    .join(", ");

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
                Student Details
              </h2>

              <p className="text-xs text-slate-500">
                Student ID: {order.studentId}
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <InfoSection title="Student Information">
              <InfoItem
                label="Student ID"
                value={String(order.studentId)}
              />

              <InfoItem
                label="Name"
                value={order.studentName}
              />

              <InfoItem
                label="Mobile No."
                value={order.mobileNo}
              />

              <InfoItem
                label="Education"
                value={order.education}
              />

              <InfoItem
                label="College"
                value={order.college}
              />
            </InfoSection>

            <InfoSection title="Order Information">
              <InfoItem
                label="Order ID"
                value={`#${order.notesOrderId}`}
              />

              <InfoItem
                label="Amount"
                value={`₹${order.amount.toLocaleString("en-IN")}`}
              />

              <InfoItem
                label="Payment Order ID"
                value={order.paymentOrderId}
              />

              <InfoItem
                label="Notes"
                value={order.notes}
              />

              <InfoItem
                label="Subjects"
                value={order.subjects}
              />
            </InfoSection>
          </div>

          <div className="mt-6">
            <InfoSection title="Delivery Address">
              <div className="flex gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-blue-600"
                />

                <p className="text-sm leading-6 text-slate-600">
                  {address || "No address available"}
                </p>
              </div>
            </InfoSection>
          </div>

          {order.courierTrackingNo && (
            <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
              <p className="text-xs font-medium text-blue-600">
                Courier Tracking Number
              </p>

              <p className="mt-1 text-sm font-semibold text-blue-900">
                {order.courierTrackingNo}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-5">
      <h3 className="mb-4 text-sm font-semibold text-slate-900">
        {title}
      </h3>

      <div className="space-y-3">{children}</div>
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
    <div>
      <p className="text-xs font-medium text-slate-400">
        {label}
      </p>

      <p className="mt-0.5 text-sm text-slate-700">
        {value || "—"}
      </p>
    </div>
  );
}