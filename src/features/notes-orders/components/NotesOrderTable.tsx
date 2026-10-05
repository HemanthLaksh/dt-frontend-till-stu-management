"use client";

import {
  Eye,
  PackageCheck,
  Truck,
} from "lucide-react";

import type {
  NotesOrder,
  NotesOrderStatus,
} from "../types/notesOrders.types";

interface NotesOrderTableProps {
  orders: NotesOrder[];
  status: NotesOrderStatus;
  loading: boolean;
  onStudentDetails: (order: NotesOrder) => void;
  onUpdateStatus: (order: NotesOrder) => void;
}

export default function NotesOrderTable({
  orders,
  status,
  loading,
  onStudentDetails,
  onUpdateStatus,
}: NotesOrderTableProps) {
  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-12 shadow-sm">
        <div className="flex flex-col items-center justify-center">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

          <p className="mt-4 text-sm text-slate-500">
            Loading notes orders...
          </p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-12 shadow-sm">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
            <PackageCheck
              size={26}
              className="text-slate-400"
            />
          </div>

          <h3 className="mt-4 text-base font-semibold text-slate-800">
            No Notes Orders Found
          </h3>

          <p className="mt-1 max-w-md text-sm text-slate-500">
            Select a course and status, then click Search Orders
            to view the available notes orders.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Table Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Notes Orders
          </h2>

          <p className="mt-0.5 text-xs text-slate-500">
            {status} orders
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-[1500px] w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Sl No.
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Order ID
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Amount
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Student ID
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Name
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Mobile No.
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Notes
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Tracking No.
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Payment Order ID
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {orders.map((order, index) => (
              <tr
                key={order.notesOrderId}
                className="transition hover:bg-slate-50"
              >
                <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                  {index + 1}
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900">
                  #{order.notesOrderId}
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900">
                  ₹{order.amount.toLocaleString("en-IN")}
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                  {order.studentId}
                </td>

                <td className="whitespace-nowrap px-4 py-4">
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {order.studentName}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      {order.education || "—"}
                    </p>
                  </div>
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                  {order.mobileNo}
                </td>

                <td className="max-w-[180px] px-4 py-4 text-sm text-slate-600">
                  <span className="line-clamp-2">
                    {order.notes || "—"}
                  </span>
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                  {order.courierTrackingNo || "—"}
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                  {order.paymentOrderId || "—"}
                </td>

                <td className="whitespace-nowrap px-4 py-4">
                  <StatusBadge status={status} />
                </td>

                <td className="whitespace-nowrap px-4 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onStudentDetails(order)}
                      className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <Eye size={15} />

                      Student
                    </button>

                    {status !== "Delivered" && (
                      <button
                        type="button"
                        onClick={() => onUpdateStatus(order)}
                        className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-blue-600 px-3 text-xs font-medium text-white transition hover:bg-blue-700"
                      >
                        <Truck size={15} />

                        Update
                      </button>
                    )}

                    {status === "Delivered" && (
                      <span className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-emerald-50 px-3 text-xs font-medium text-emerald-700">
                        <PackageCheck size={15} />

                        Delivered
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: NotesOrderStatus;
}) {
  if (status === "New") {
    return (
      <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
        New
      </span>
    );
  }

  if (status === "Couriered") {
    return (
      <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
        Couriered
      </span>
    );
  }

  return (
    <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
      Delivered
    </span>
  );
}