"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  PackageCheck,
  Truck,
  X,
} from "lucide-react";

import type {
  NotesOrder,
  NotesOrderStatus,
} from "../types/notesOrders.types";

interface NotesOrderStatusModalProps {
  order: NotesOrder;
  currentStatus: NotesOrderStatus;
  loading: boolean;
  onClose: () => void;
  onUpdate: (
    order: NotesOrder,
    newStatus: NotesOrderStatus,
    trackingNumber: string,
  ) => Promise<{
    success: boolean;
    message: string;
  }>;
}

export default function NotesOrderStatusModal({
  order,
  currentStatus,
  loading,
  onClose,
  onUpdate,
}: NotesOrderStatusModalProps) {
  const [trackingNumber, setTrackingNumber] = useState(
    order.courierTrackingNo ?? "",
  );

  const nextStatus: NotesOrderStatus =
    currentStatus === "New"
      ? "Couriered"
      : "Delivered";

  const requiresTrackingNumber =
    currentStatus === "New" && nextStatus === "Couriered";

  useEffect(() => {
    setTrackingNumber(order.courierTrackingNo ?? "");
  }, [order]);

  const handleSubmit = async () => {
    if (requiresTrackingNumber && !trackingNumber.trim()) {
      return;
    }

    await onUpdate(
      order,
      nextStatus,
      trackingNumber.trim(),
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Update Order Status
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Order #{order.notesOrderId}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Student */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium text-slate-400">
              Student
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-900">
              {order.studentName}
            </p>

            <p className="mt-0.5 text-xs text-slate-500">
              Student ID: {order.studentId}
            </p>
          </div>

          {/* Status transition */}
          <div className="mt-5 flex items-center justify-between gap-3">
            <StatusStep
              icon={<PackageCheck size={18} />}
              label="Current"
              status={currentStatus}
              active
            />

            <div className="h-px flex-1 bg-slate-200" />

            <StatusStep
              icon={
                nextStatus === "Couriered" ? (
                  <Truck size={18} />
                ) : (
                  <CheckCircle2 size={18} />
                )
              }
              label="Next"
              status={nextStatus}
              active
            />
          </div>

          {/* Tracking Number */}
          {requiresTrackingNumber && (
            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Courier Tracking Number
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                type="text"
                value={trackingNumber}
                onChange={(event) =>
                  setTrackingNumber(event.target.value)
                }
                placeholder="Enter courier tracking number"
                disabled={loading}
                className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 disabled:bg-slate-100"
              />

              {!trackingNumber.trim() && (
                <p className="mt-2 text-xs text-slate-500">
                  Tracking number is required before marking the
                  order as couriered.
                </p>
              )}
            </div>
          )}

          {/* Delivered info */}
          {nextStatus === "Delivered" && (
            <div className="mt-6 rounded-lg border border-emerald-100 bg-emerald-50 p-4">
              <div className="flex gap-3">
                <CheckCircle2
                  size={19}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />

                <div>
                  <p className="text-sm font-medium text-emerald-800">
                    Mark order as delivered
                  </p>

                  <p className="mt-1 text-xs leading-5 text-emerald-700">
                    This will change the order status from Couriered
                    to Delivered.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={
              loading ||
              (requiresTrackingNumber &&
                !trackingNumber.trim())
            }
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                Updating...
              </>
            ) : (
              <>
                {nextStatus === "Couriered" ? (
                  <Truck size={16} />
                ) : (
                  <CheckCircle2 size={16} />
                )}

                Mark as {nextStatus}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function StatusStep({
  icon,
  label,
  status,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  status: NotesOrderStatus;
  active: boolean;
}) {
  return (
    <div className="flex min-w-[110px] flex-col items-center">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full ${
          active
            ? "bg-blue-50 text-blue-600"
            : "bg-slate-100 text-slate-400"
        }`}
      >
        {icon}
      </div>

      <p className="mt-2 text-[11px] font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-0.5 text-xs font-semibold text-slate-700">
        {status}
      </p>
    </div>
  );
}