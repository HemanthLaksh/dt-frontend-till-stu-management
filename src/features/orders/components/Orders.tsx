"use client";

import { useState } from "react";
import {
  ShoppingCart,
  ChevronRight,
  Download,
  RotateCcw,
  Search,
} from "lucide-react";

import BackButton from "@/components/ui/BackButton/BackButton";
import DatePicker from "@/components/ui/DatePicker/DatePicker";
import Select from "@/components/ui/Select/Select";

import {
  ORDER_COURSES,
  ORDER_STATUSES,
} from "../constants/orders.constants";

import useOrders from "../hooks/useOrders";

import type { Order } from "../types/orders.types";

import OrderDetailsModal from "./OrderDetailsModal";
import OrderTable from "./OrderTable";

export default function Orders() {
  const {
    filters,
    setFilters,
    filteredOrders,
    loading,
    searchOrders,
    clearFilters,
  } = useOrders();

  const [selectedOrder, setSelectedOrder] =
    useState<Order | null>(null);

  /*
   * ------------------------------------------------------------
   * COURSE SELECTION
   * ------------------------------------------------------------
   */

  const [selectedCourse, setSelectedCourse] =
    useState<string | null>(null);

  const handleCourseSelect = (course: string) => {
    setSelectedCourse(course);

    setFilters((previous) => ({
      ...previous,
      course,
    }));
  };

  const handleBack = () => {
    setSelectedCourse(null);

    clearFilters();
  };

  /*
   * ------------------------------------------------------------
   * SEARCH
   * ------------------------------------------------------------
   */

  const handleSearch = async () => {
    await searchOrders();
  };

  /*
   * ------------------------------------------------------------
   * CLEAR
   * ------------------------------------------------------------
   */

  const handleClear = () => {
    clearFilters();
  };

  /*
   * ------------------------------------------------------------
   * DOWNLOAD
   * ------------------------------------------------------------
   */

  const handleDownload = () => {
    console.info("Order report download requested", {
      fromDate: filters.fromDate,
      toDate: filters.toDate,
      course: filters.course,
      status: filters.status,
    });
  };

  /*
   * ============================================================
   * COURSE SELECTION SCREEN
   * ============================================================
   */

  if (!selectedCourse) {
    return (
      <div className="space-y-6">

        {/* PAGE HEADER */}

        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Orders
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View and manage student orders and payment
            information.
          </p>
        </div>

        {/* COURSE SELECTION */}

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

          {/* SECTION HEADER */}

          <div className="border-b border-slate-200 bg-blue-50 px-6 py-5">
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                <ShoppingCart size={20} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Orders
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Select a course to view order details.
                </p>
              </div>

            </div>
          </div>

          {/* COURSE CARDS */}

          <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

            {ORDER_COURSES.map((course) => (
              <button
                key={course}
                type="button"
                onClick={() =>
                  handleCourseSelect(course)
                }
                className="group rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md"
              >
                <div className="flex items-center justify-between">

                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors group-hover:bg-blue-100 group-hover:text-blue-600">
                    <ShoppingCart size={21} />
                  </div>

                  <ChevronRight
                    size={18}
                    className="text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-blue-500"
                  />

                </div>

                <h3 className="mt-4 text-sm font-semibold text-slate-800">
                  {course}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Order Details
                </p>
              </button>
            ))}

          </div>
        </section>

      </div>
    );
  }

  /*
   * ============================================================
   * SELECTED COURSE / ORDERS SCREEN
   * ============================================================
   */

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}

      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Orders
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View and manage student orders and payment
          information.
        </p>
      </div>

      {/* BACK BUTTON */}

      <BackButton
        onClick={handleBack}
        label="Back to Courses"
      />

      {/* SEARCH & FILTERS */}

      <section className="relative rounded-xl border border-slate-200 bg-white shadow-sm">

        {/* SECTION HEADER */}

        <div className="border-b border-slate-200 bg-blue-50 px-6 py-5">

          <div className="flex items-center justify-between gap-4">

            <div>
              <p className="text-sm font-medium text-blue-600">
                {selectedCourse}
              </p>

              <h2 className="mt-1 text-lg font-semibold text-slate-900">
                Order Details
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Search and manage orders for{" "}
                {selectedCourse}.
              </p>
            </div>

            {/* CURRENT COURSE */}

            <div className="hidden rounded-lg border border-blue-100 bg-white px-4 py-2 sm:block">

              <p className="text-xs font-medium text-slate-500">
                Selected Course
              </p>

              <p className="text-sm font-semibold text-blue-700">
                {selectedCourse}
              </p>

            </div>

          </div>

        </div>

        {/* FILTER CONTENT */}

        <div className="p-6">

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">

          {/* COURSE */}

            <Select
              label="Course"
              value={filters.course}
              options={ORDER_COURSES.map(
                (course) => ({
                  value: course,
                  label: course,
                }),
              )}
              onChange={() => {}}
              disabled={true}
            />

            {/* FROM DATE */}

            <DatePicker
              label="From Date"
              value={filters.fromDate}
              onChange={(value) => {
                setFilters((previous) => ({
                  ...previous,
                  fromDate: value,

                  ...(previous.toDate &&
                  value > previous.toDate
                    ? { toDate: "" }
                    : {}),
                }));
              }}
              disabled={loading}
            />

            {/* TO DATE */}

            <DatePicker
              label="To Date"
              value={filters.toDate}
              onChange={(value) => {
                setFilters((previous) => ({
                  ...previous,
                  toDate: value,
                }));
              }}
              minDate={filters.fromDate}
              disabled={loading}
            />

            {/* STATUS */}

            <Select
              label="Status"
              value={filters.status}
              options={ORDER_STATUSES.map(
                (status) => ({
                  value: status,
                  label: status,
                }),
              )}
              onChange={(value) => {
                setFilters((previous) => ({
                  ...previous,
                  status: value,
                }));
              }}
              disabled={loading}
            />

          </div>

          {/* SEARCH */}

          <div className="mt-5">

            <label
              htmlFor="order-search"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Search Orders
            </label>

            <div className="relative">

              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="order-search"
                type="text"
                value={filters.search}
                onChange={(event) => {
                  setFilters((previous) => ({
                    ...previous,
                    search: event.target.value,
                  }));
                }}
                placeholder="Search by order ID, student ID, name, mobile or email..."
                disabled={loading}
                className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3.5 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 hover:bg-white focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:bg-slate-100"
              />

            </div>

          </div>

          {/* ACTION BUTTONS */}

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">

            {/* SEARCH */}

            <button
              type="button"
              onClick={handleSearch}
              disabled={loading}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              <Search size={16} />

              {loading
                ? "Searching..."
                : "Search"}
            </button>

            {/* CLEAR */}

            <button
              type="button"
              onClick={handleClear}
              disabled={loading}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-medium text-slate-600 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RotateCcw size={16} />

              Clear
            </button>

            {/* DOWNLOAD */}

            <button
              type="button"
              onClick={handleDownload}
              disabled={
                loading ||
                filteredOrders.length === 0
              }
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-medium text-slate-600 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Download size={16} />

              Download Invoice
            </button>

          </div>

        </div>

      </section>

      {/* ORDER TABLE */}

      <OrderTable
        orders={filteredOrders}
        loading={loading}
        onViewOrder={setSelectedOrder}
      />

      {/* ORDER DETAILS MODAL */}

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() =>
            setSelectedOrder(null)
          }
        />
      )}

    </div>
  );
}