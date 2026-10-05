"use client";

import {
  CalendarDays,
  CreditCard,
  Mail,
  Phone,
  UserRound,
  X,
} from "lucide-react";

import type { Order } from "../types/orders.types";

interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
}

function getStatusClasses(status: Order["status"]) {
  switch (status) {
    case "Success":
      return "bg-green-50 text-green-700";

    case "Pending":
      return "bg-amber-50 text-amber-700";

    case "Failed":
      return "bg-red-50 text-red-700";

    case "Cancelled":
      return "bg-slate-100 text-slate-600";

    default:
      return "bg-slate-100 text-slate-600";
  }
}

export default function OrderDetailsModal({
  order,
  onClose,
}: OrderDetailsModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
              Order Details
            </p>

            <h2 className="mt-1 text-lg font-semibold text-slate-900">
              Order #{order.orderID}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto p-6">
          {/* Student */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <UserRound size={18} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {order.studentName}
                </p>

                <p className="text-xs text-slate-500">
                  Student ID: {order.studentID}
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <Phone
                  size={16}
                  className="text-slate-400"
                />

                <div>
                  <p className="text-xs text-slate-500">
                    Mobile
                  </p>

                  <p className="text-sm font-medium text-slate-800">
                    {order.mobileNo}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail
                  size={16}
                  className="text-slate-400"
                />

                <div>
                  <p className="text-xs text-slate-500">
                    Email
                  </p>

                  <p className="break-all text-sm font-medium text-slate-800">
                    {order.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order information */}
          <div className="mt-5">
            <h3 className="text-sm font-semibold text-slate-900">
              Order Information
            </h3>

            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 p-4">
                <p className="text-xs text-slate-500">
                  Course
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {order.course}
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 p-4">
                <p className="text-xs text-slate-500">
                  Plan
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {order.planName}
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-center gap-2">
                  <CreditCard
                    size={15}
                    className="text-slate-400"
                  />

                  <p className="text-xs text-slate-500">
                    Payment Method
                  </p>
                </div>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {order.paymentMethod}
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-center gap-2">
                  <CalendarDays
                    size={15}
                    className="text-slate-400"
                  />

                  <p className="text-xs text-slate-500">
                    Order Date
                  </p>
                </div>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {order.orderDate}
                </p>
              </div>
            </div>
          </div>

          {/* Amount + Status */}
          <div className="mt-5 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-slate-500">
                Order Amount
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                ₹{order.amount.toLocaleString("en-IN")}
              </p>
            </div>

            <span
              className={`inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusClasses(
                order.status,
              )}`}
            >
              {order.status}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}