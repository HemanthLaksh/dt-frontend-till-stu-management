"use client";

import { useState } from "react";

import {
  Download,
  PackageCheck,
  ChevronRight,
  RotateCcw,
  Search,
  Truck,
} from "lucide-react";

import BackButton from "@/components/ui/BackButton/BackButton";
import Select from "@/components/ui/Select/Select";

import {
  NOTES_ORDER_COURSES,
  NOTES_ORDER_STATUSES,
} from "../constants/notesOrders.constants";

import { useNotesOrders } from "../hooks/useNotesOrders";

import type {
  NotesOrder,
  NotesOrderStatus,
} from "../types/notesOrders.types";

import NotesOrderTable from "./NotesOrderTable";
import StudentDetailsModal from "./StudentDetailsModal";
import NotesOrderStatusModal from "./NotesOrderStatusModal";

export default function NotesOrders() {
  /* ---------------------------------------------------------------------- */
  /* STATE                                                                  */
  /* ---------------------------------------------------------------------- */

  const [courseId, setCourseId] = useState<number>(1);

  const [status, setStatus] =
    useState<NotesOrderStatus>("New");

  const [selectedCourse, setSelectedCourse] =
    useState<number | null>(null);

  const [selectedStudent, setSelectedStudent] =
    useState<NotesOrder | null>(null);

  const [selectedOrder, setSelectedOrder] =
    useState<NotesOrder | null>(null);

  /* ---------------------------------------------------------------------- */
  /* HOOK                                                                   */
  /* ---------------------------------------------------------------------- */

  const {
    orders,
    loading,
    updating,
    error,
    fetchOrders,
    updateStatus,
    clearOrders,
  } = useNotesOrders();

  /* ---------------------------------------------------------------------- */
  /* COURSE SELECTION                                                       */
  /* ---------------------------------------------------------------------- */

  const handleCourseSelect = (courseId: number) => {
    setCourseId(courseId);
    setStatus("New");
    setSelectedCourse(courseId);

    clearOrders();
  };

  /* ---------------------------------------------------------------------- */
  /* BACK TO COURSES                                                        */
  /* ---------------------------------------------------------------------- */

  const handleBack = () => {
    setSelectedCourse(null);

    clearOrders();
  };

  /* ---------------------------------------------------------------------- */
  /* SEARCH                                                                 */
  /* ---------------------------------------------------------------------- */

  const handleSearch = async () => {
    await fetchOrders(courseId, status);
  };

  /* ---------------------------------------------------------------------- */
  /* CLEAR                                                                  */
  /* ---------------------------------------------------------------------- */

  const handleClear = () => {
    setCourseId(1);
    setStatus("New");

    clearOrders();
  };

  /* ---------------------------------------------------------------------- */
  /* STATUS UPDATE                                                          */
  /* ---------------------------------------------------------------------- */

  const handleStatusUpdate = async (
    order: NotesOrder,
    newStatus: NotesOrderStatus,
    trackingNumber: string,
  ) => {
    const result = await updateStatus(
      order.notesOrderId,
      newStatus,
      trackingNumber,
    );

    if (result.success) {
      setSelectedOrder(null);

      await fetchOrders(
        courseId,
        status,
      );
    }

    return result;
  };

  /* ---------------------------------------------------------------------- */
  /* EXPORT                                                                 */
  /* ---------------------------------------------------------------------- */

  const handleExport = () => {
    if (orders.length === 0) {
      return;
    }

    const headers = [
      "Sl No.",
      "Order ID",
      "Amount",
      "Student ID",
      "Name",
      "Mobile No.",
      "Notes",
      "Subjects",
      "Tracking No.",
      "Payment Order ID",
      "College",
      "Education",
      "State",
      "Address",
      "Status",
    ];

    const rows = orders.map((order, index) => [
      index + 1,
      order.notesOrderId,
      order.amount,
      order.studentId,
      order.studentName,
      order.mobileNo,
      order.notes,
      order.subjects,
      order.courierTrackingNo,
      order.paymentOrderId,
      order.college,
      order.education,
      order.addressState,
      [
        order.address.addressLine,
        order.address.city,
        order.address.state,
        order.address.pinCode,
      ]
        .filter(Boolean)
        .join(", "),
      status,
    ]);

    const csv = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map(
            (value) =>
              `"${String(value ?? "").replace(
                /"/g,
                '""',
              )}"`,
          )
          .join(","),
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `notes-orders-${status.toLowerCase()}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* ---------------------------------------------------------------------- */
  /* SELECT OPTIONS                                                         */
  /* ---------------------------------------------------------------------- */

  const courseOptions = NOTES_ORDER_COURSES.map(
    (course) => ({
      value: String(course.id),
      label: course.name,
    }),
  );

  const statusOptions = NOTES_ORDER_STATUSES.map(
    (item) => ({
      value: item,
      label: item,
    }),
  );

  /* ---------------------------------------------------------------------- */
  /* CURRENT COURSE                                                         */
  /* ---------------------------------------------------------------------- */

  const currentCourse =
    NOTES_ORDER_COURSES.find(
      (course) => course.id === selectedCourse,
    );

  /* ====================================================================== */
  /* PAGE                                                                   */
  /* ====================================================================== */

  return (
    <>
      <div className="space-y-6">

        {/* ================================================================ */}
        {/* PAGE HEADER                                                       */}
        {/* ================================================================ */}

        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Notes Orders
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage hard notes orders, delivery status and student details.
          </p>
        </div>

        {/* ================================================================ */}
        {/* COURSE SELECTION                                                  */}
        {/* ================================================================ */}

        {!selectedCourse && (
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

            {/* SECTION HEADER */}
            <div className="border-b border-slate-200 bg-blue-50 px-6 py-5">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                  <PackageCheck size={20} />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Notes Orders
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Select a course to manage notes orders.
                  </p>
                </div>

              </div>

            </div>

            {/* COURSE CARDS */}
            <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

              {NOTES_ORDER_COURSES.map(
                (course) => (
                  <button
                    key={course.id}
                    type="button"
                    onClick={() =>
                      handleCourseSelect(
                        course.id,
                      )
                    }
                    className="group rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md"
                  >

                    <div className="flex items-center justify-between">

                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors group-hover:bg-blue-100 group-hover:text-blue-600">
                        <PackageCheck size={21} />
                      </div>

                      <ChevronRight
                        size={18}
                        className="text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-blue-500"
                      />

                    </div>

                    <h3 className="mt-4 text-sm font-semibold text-slate-800">
                      {course.name}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Notes Orders
                    </p>

                  </button>
                ),
              )}

            </div>

          </section>
        )}

        {/* ================================================================ */}
        {/* SELECTED COURSE SCREEN                                            */}
        {/* ================================================================ */}

        {selectedCourse && (
          <div className="space-y-4">

            {/* BACK BUTTON */}
            <BackButton
              onClick={handleBack}
              label="Back to Courses"
            />

            {/* ============================================================ */}
            {/* FILTER CARD                                                   */}
            {/* ============================================================ */}

            {selectedCourse && (

    <section className="relative rounded-xl border border-slate-200 bg-white shadow-sm">

          {/* HEADER */}
          <div className="border-b border-slate-200 bg-blue-50 px-6 py-5">
            <div className="flex items-center justify-between gap-4">

              <div>
                <p className="text-sm font-medium text-blue-600">
                  {currentCourse?.name}
                </p>

                <h2 className="mt-1 text-lg font-semibold text-slate-900">
                  Notes Orders
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Manage notes orders, delivery status and student details.
                </p>
              </div>

              <div className="hidden rounded-lg border border-blue-100 bg-white px-4 py-2 sm:block">
                <p className="text-xs font-medium text-slate-500">
                  Current Status
                </p>

                <p className="text-sm font-semibold text-blue-700">
                  {status}
                </p>
              </div>

            </div>
          </div>

          {/* FILTER AREA */}
          <div className="p-6">

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

              {/* COURSE - DISABLED */}
              <Select
                label="Course"
                value={String(courseId)}
                options={courseOptions}
                placeholder="Select course"
                disabled={true}
                onChange={(value) =>
                  setCourseId(Number(value))
                }
              />

              {/* STATUS - ACTIVE */}
              <Select
                label="Status"
                value={status}
                options={statusOptions}
                placeholder="Select status"
                disabled={loading}
                onChange={(value) =>
                  setStatus(
                    value as NotesOrderStatus,
                  )
                }
              />

              {/* CURRENT STATUS */}
              <div className="flex items-end">
                <div className="w-full rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">

                  <div className="flex items-center gap-3">

                    {status === "New" && (
                      <PackageCheck
                        size={20}
                        className="text-blue-600"
                      />
                    )}

                    {status === "Couriered" && (
                      <Truck
                        size={20}
                        className="text-blue-600"
                      />
                    )}

                    {status === "Delivered" && (
                      <PackageCheck
                        size={20}
                        className="text-blue-600"
                      />
                    )}

                    <div>
                      <p className="text-xs font-medium text-slate-500">
                        Current Status
                      </p>

                      <p className="text-sm font-semibold text-blue-700">
                        {status}
                      </p>
                    </div>

                  </div>

                </div>
              </div>

            </div>

            {/* ACTIONS */}
            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">

              <button
                type="button"
                onClick={handleSearch}
                disabled={loading}
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Search size={17} />

                {loading
                  ? "Searching..."
                  : "Search Orders"}
              </button>

              <button
                type="button"
                onClick={handleClear}
                disabled={loading}
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RotateCcw size={17} />

                Clear
              </button>

              <button
                type="button"
                onClick={handleExport}
                disabled={
                  loading ||
                  orders.length === 0
                }
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Download size={17} />

                Export
              </button>

              {orders.length > 0 && (
                <span className="ml-auto text-sm text-slate-500">
                  {orders.length} order
                  {orders.length !== 1
                    ? "s"
                    : ""}{" "}
                  found
                </span>
              )}

            </div>

          </div>
        </section>
    )}

            {/* ============================================================ */}
            {/* ERROR                                                         */}
            {/* ============================================================ */}

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* ============================================================ */}
            {/* TABLE                                                         */}
            {/* ============================================================ */}

            <NotesOrderTable
              orders={orders}
              status={status}
              loading={loading}
              onStudentDetails={
                setSelectedStudent
              }
              onUpdateStatus={
                setSelectedOrder
              }
            />

          </div>
        )}

      </div>

      {/* ================================================================== */}
      {/* STUDENT DETAILS MODAL                                               */}
      {/* ================================================================== */}

      {selectedStudent && (
        <StudentDetailsModal
          order={selectedStudent}
          onClose={() =>
            setSelectedStudent(null)
          }
        />
      )}

      {/* ================================================================== */}
      {/* STATUS UPDATE MODAL                                                 */}
      {/* ================================================================== */}

      {selectedOrder && (
        <NotesOrderStatusModal
          order={selectedOrder}
          currentStatus={status}
          loading={updating}
          onClose={() =>
            setSelectedOrder(null)
          }
          onUpdate={handleStatusUpdate}
        />
      )}
    </>
  );
}