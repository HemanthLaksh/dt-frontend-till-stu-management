"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Users,
  CreditCard,
  IndianRupee,
  Plus,
  UserRound,
  CalendarDays,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Smartphone,
  Monitor,
  X,
} from "lucide-react";

import Card from "@/components/ui/Card/Card";
import Button from "@/components/ui/Button/Button";
import Select from "@/components/ui/Select/Select";

import {
  subscriptionStudents,
  subscriptionMockData,
  subscriptionOrders,
} from "../constants/subscriptionMockData";

import type {
  StudentSubscription,
  SubscriptionStudent,
} from "../types/subscription.types";

type SubscriptionFilter = "All" | "Active" | "Inactive" | "Expired";

const subscriptionFilters: SubscriptionFilter[] = [
  "All",
  "Active",
  "Inactive",
  "Expired",
];

const inputClassName =
  "h-11 w-full rounded-lg border border-border bg-white px-3.5 text-sm text-text-primary outline-none transition-all placeholder:text-text-muted hover:border-primary focus:border-primary focus:ring-4 focus:ring-primary-light";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(date: string) {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return date;

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(date: string) {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return date;

  return parsedDate.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function DetailItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number | null | undefined;
  icon?: React.ReactNode;
}) {
  return (
    <div className="min-w-0 rounded-lg border border-border/70 bg-white p-3.5">
      <div className="flex items-center gap-2 text-text-secondary">
        {icon}
        <p className="text-xs font-medium">{label}</p>
      </div>

      <p className="mt-2 break-words text-sm font-semibold text-text-primary">
        {value === null || value === undefined || value === "" ? "—" : value}
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const normalizedStatus = status.toLowerCase();

  const styles =
    normalizedStatus === "active" || normalizedStatus === "1"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
      : normalizedStatus === "expired"
        ? "bg-amber-50 text-amber-700 ring-amber-600/20"
        : "bg-slate-100 text-slate-600 ring-slate-500/20";

  const label =
    normalizedStatus === "1"
      ? "Active"
      : normalizedStatus === "0"
        ? "Inactive"
        : status;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles}`}
    >
      {label}
    </span>
  );
}

export default function Subscriptions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] =
    useState<SubscriptionStudent | null>(null);

  const [subscriptionFilter, setSubscriptionFilter] =
    useState<SubscriptionFilter>("All");

  const [subscriptions, setSubscriptions] =
    useState<StudentSubscription[]>(subscriptionMockData);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [feedback, setFeedback] = useState("");

  const [newSubscription, setNewSubscription] = useState({
    planId: "",
    planSequenceNumber: "",
    subscriptionOrderId: "",
    couponCode: "",
    startDate: "",
    endDate: "",
    subjectIds: "",
    remarks: "",
  });
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setCurrentTime(Date.now());
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  const filteredStudents = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return [];

    return subscriptionStudents.filter((student) =>
      [student.studentId, student.name, student.email, student.mobile].some(
        (value) =>
          String(value ?? "")
            .toLowerCase()
            .includes(query),
      ),
    );
  }, [searchTerm]);

  const studentSubscriptions = useMemo(() => {
    if (!selectedStudent) return [];

    return subscriptions.filter(
      (subscription) => subscription.studentId === selectedStudent.studentId,
    );
  }, [selectedStudent, subscriptions]);

  const visibleSubscriptions = useMemo(() => {
    if (subscriptionFilter === "All") {
      return studentSubscriptions;
    }

    return studentSubscriptions.filter((subscription) => {
      const isActive =
        subscription.isActive === true || String(subscription.isActive) === "1";

      const isExpired =
        Boolean(subscription.endDate) &&
        new Date(subscription.endDate).getTime() < currentTime;

      if (subscriptionFilter === "Active") {
        return isActive && !isExpired;
      }

      if (subscriptionFilter === "Inactive") {
        return !isActive && !isExpired;
      }

      return isExpired;
    });
  }, [studentSubscriptions, subscriptionFilter, currentTime]);

  const activeCount = studentSubscriptions.filter(
    (subscription) =>
      subscription.isActive &&
      (!subscription.endDate ||
        new Date(subscription.endDate).getTime() >= currentTime),
  ).length;

  const totalPlanValue = studentSubscriptions.length;

  const studentOrders = selectedStudent
    ? subscriptionOrders.filter(
        (order) => order.studentId === selectedStudent.studentId,
      )
    : [];

  function selectStudent(student: SubscriptionStudent) {
    setSelectedStudent(student);
    setSearchTerm("");
    setSubscriptionFilter("All");
    setShowAddForm(false);
    setShowOrders(false);
    setFeedback("");
  }

  function toggleSubscription(subscriptionId: string) {
    setSubscriptions((current) =>
      current.map((subscription) => {
        if (subscription.id !== subscriptionId) {
          return subscription;
        }

        const nextStatus = !subscription.isActive;

        setFeedback(
          `Subscription ${subscription.sequenceNumber} marked ${
            nextStatus ? "active" : "inactive"
          }. This is a local demo action.`,
        );

        return {
          ...subscription,
          isActive: nextStatus,
        };
      }),
    );
  }

  function addSubscription(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedStudent) return;

    if (newSubscription.endDate < newSubscription.startDate) {
      setFeedback("End date must be on or after the start date.");
      return;
    }

    const nextSequenceNumber =
      Math.max(
        0,
        ...subscriptions.map(
          (subscription) => subscription.sequenceNumber || 0,
        ),
      ) + 1;

    const subscription: StudentSubscription = {
      id: `SUB${Date.now()}`,
      studentId: selectedStudent.studentId,
      sequenceNumber: nextSequenceNumber,
      subscriptionOrderId: newSubscription.subscriptionOrderId,
      planId: Number(newSubscription.planId),
      planSequenceNumber: Number(newSubscription.planSequenceNumber || 1),
      couponCode: newSubscription.couponCode.trim(),
      startDate: newSubscription.startDate,
      endDate: newSubscription.endDate,
      subjectIds: newSubscription.subjectIds
        .split(",")
        .map((subjectId) => subjectId.trim())
        .filter(Boolean),
      isActive: true,
      remarks: newSubscription.remarks.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setSubscriptions((current) => [subscription, ...current]);

    setNewSubscription({
      planId: "",
      planSequenceNumber: "",
      subscriptionOrderId: "",
      couponCode: "",
      startDate: "",
      endDate: "",
      subjectIds: "",
      remarks: "",
    });

    setShowAddForm(false);
    setSubscriptionFilter("All");
    setFeedback(
      "Subscription added to the demo data. Changes will reset when the page is reloaded.",
    );
  }

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
            Subscriptions
          </h1>

          <p className="mt-1 text-sm text-text-secondary">
            Manage student subscriptions, plans, and associated orders.
          </p>
        </div>

        {selectedStudent && (
          <Button
            onClick={() => {
              setShowAddForm((current) => !current);
              setShowOrders(false);
              setFeedback("");
            }}
          >
            <Plus size={17} className="mr-2" />
            Add Subscription
          </Button>
        )}
      </div>

      {/* Student search */}
      <Card
        title="Find Student"
        description="Search using student ID, name, email address, or mobile number."
      >
        <div className="relative">
          <Search
            size={18}
            aria-hidden="true"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
          />

          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Enter student ID, name, email, or mobile number..."
            aria-label="Search students"
            className={`${inputClassName} pl-10`}
          />

          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              aria-label="Clear student search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-text-muted hover:bg-secondary-light hover:text-text-primary"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {searchTerm.trim() && (
          <div className="mt-3 overflow-hidden rounded-lg border border-border">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <button
                  key={student.studentId}
                  type="button"
                  onClick={() => selectStudent(student)}
                  className="flex w-full items-center justify-between gap-4 border-b border-border px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-primary-light"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                      <UserRound size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-text-primary">
                        {student.name}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-text-secondary">
                        {student.studentId} · {student.email}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 text-xs font-medium text-primary">
                    {student.course}
                  </span>
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center">
                <p className="text-sm font-medium text-text-primary">
                  No students found
                </p>

                <p className="mt-1 text-xs text-text-secondary">
                  Try another student ID, name, email, or mobile number.
                </p>
              </div>
            )}
          </div>
        )}

        {!selectedStudent && !searchTerm.trim() && (
          <div className="mt-5 rounded-lg border border-dashed border-border bg-secondary-light/50 px-4 py-8 text-center">
            <Users
              size={26}
              className="mx-auto text-text-muted"
              aria-hidden="true"
            />

            <p className="mt-3 text-sm font-medium text-text-primary">
              Search for a student to get started
            </p>

            <p className="mt-1 text-xs text-text-secondary">
              Try student ID DT1001 to explore the demo.
            </p>
          </div>
        )}
      </Card>

      {selectedStudent && (
        <>
          {/* Student details */}
          <Card
            title="Student Details"
            description="Complete profile information associated with the selected student."
          >
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <UserRound size={23} />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-text-primary">
                    {selectedStudent.name}
                  </h2>

                  <p className="text-sm text-text-secondary">
                    Student ID: {selectedStudent.studentId}
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={() => {
                  setSelectedStudent(null);
                  setShowAddForm(false);
                  setShowOrders(false);
                  setFeedback("");
                }}
              >
                Change Student
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              <DetailItem
                label="Student ID"
                value={selectedStudent.studentId}
              />

              <DetailItem
                label="Name"
                value={selectedStudent.name}
                icon={<UserRound size={14} />}
              />

              <DetailItem
                label="Email ID"
                value={selectedStudent.email}
                icon={<Mail size={14} />}
              />

              <DetailItem
                label="Mobile Number"
                value={selectedStudent.mobile}
                icon={<Phone size={14} />}
              />

              <DetailItem label="ISD Code" value={selectedStudent.isdCode} />

              <DetailItem
                label="Address"
                value={selectedStudent.address}
                icon={<MapPin size={14} />}
              />

              <DetailItem
                label="Education"
                value={selectedStudent.education}
                icon={<GraduationCap size={14} />}
              />

              <DetailItem label="College" value={selectedStudent.college} />

              <DetailItem label="Course" value={selectedStudent.course} />

              <DetailItem
                label="Profile Status"
                value={selectedStudent.profileStatus}
              />

              <DetailItem
                label="Android"
                value={selectedStudent.android}
                icon={<Smartphone size={14} />}
              />

              <DetailItem
                label="iOS"
                value={selectedStudent.ios}
                icon={<Smartphone size={14} />}
              />

              <DetailItem
                label="Created At"
                value={formatDateTime(selectedStudent.createdAt)}
                icon={<CalendarDays size={14} />}
              />

              <DetailItem
                label="Updated At"
                value={formatDateTime(selectedStudent.updatedAt)}
                icon={<CalendarDays size={14} />}
              />
            </div>
          </Card>

          {/* Subscription summary */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">
                    Total Subscriptions
                  </p>

                  <p className="mt-2 text-2xl font-semibold text-text-primary">
                    {studentSubscriptions.length}
                  </p>
                </div>

                <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                  <CreditCard size={21} />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">
                    Active Subscriptions
                  </p>

                  <p className="mt-2 text-2xl font-semibold text-emerald-700">
                    {activeCount}
                  </p>
                </div>

                <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600">
                  <Users size={21} />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Plan Records</p>

                  <p className="mt-2 text-2xl font-semibold text-text-primary">
                    {totalPlanValue}
                  </p>
                </div>

                <div className="rounded-lg bg-violet-50 p-3 text-violet-600">
                  <IndianRupee size={21} />
                </div>
              </div>
            </Card>
          </div>

          {/* Add subscription form */}
          {showAddForm && (
            <Card
              title="Add Student Subscription"
              description={`Create a demo subscription for ${selectedStudent.name}.`}
            >
              <form onSubmit={addSubscription} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="subscription-order-id"
                      className="mb-2 block text-sm font-medium text-text-primary"
                    >
                      Subscription Order ID
                    </label>

                    <input
                      id="subscription-order-id"
                      value={newSubscription.subscriptionOrderId}
                      onChange={(event) =>
                        setNewSubscription((current) => ({
                          ...current,
                          subscriptionOrderId: event.target.value,
                        }))
                      }
                      placeholder="Enter subscription order ID"
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subscription-plan-id"
                      className="mb-2 block text-sm font-medium text-text-primary"
                    >
                      Plan ID
                    </label>

                    <input
                      id="subscription-plan-id"
                      type="number"
                      min="1"
                      required
                      value={newSubscription.planId}
                      onChange={(event) =>
                        setNewSubscription((current) => ({
                          ...current,
                          planId: event.target.value,
                        }))
                      }
                      placeholder="Enter plan ID"
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subscription-plan-sequence"
                      className="mb-2 block text-sm font-medium text-text-primary"
                    >
                      Plan Sequence Number
                    </label>

                    <input
                      id="subscription-plan-sequence"
                      type="number"
                      min="1"
                      required
                      value={newSubscription.planSequenceNumber}
                      onChange={(event) =>
                        setNewSubscription((current) => ({
                          ...current,
                          planSequenceNumber: event.target.value,
                        }))
                      }
                      placeholder="Enter plan sequence number"
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subscription-coupon"
                      className="mb-2 block text-sm font-medium text-text-primary"
                    >
                      Coupon Code
                    </label>

                    <input
                      id="subscription-coupon"
                      value={newSubscription.couponCode}
                      onChange={(event) =>
                        setNewSubscription((current) => ({
                          ...current,
                          couponCode: event.target.value,
                        }))
                      }
                      placeholder="Enter coupon code"
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subscription-start-date"
                      className="mb-2 block text-sm font-medium text-text-primary"
                    >
                      Start Date
                    </label>

                    <input
                      id="subscription-start-date"
                      type="date"
                      required
                      value={newSubscription.startDate}
                      onChange={(event) =>
                        setNewSubscription((current) => ({
                          ...current,
                          startDate: event.target.value,
                        }))
                      }
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subscription-end-date"
                      className="mb-2 block text-sm font-medium text-text-primary"
                    >
                      End Date
                    </label>

                    <input
                      id="subscription-end-date"
                      type="date"
                      min={newSubscription.startDate || undefined}
                      required
                      value={newSubscription.endDate}
                      onChange={(event) =>
                        setNewSubscription((current) => ({
                          ...current,
                          endDate: event.target.value,
                        }))
                      }
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subscription-subject-ids"
                      className="mb-2 block text-sm font-medium text-text-primary"
                    >
                      Subject IDs
                    </label>

                    <input
                      id="subscription-subject-ids"
                      value={newSubscription.subjectIds}
                      onChange={(event) =>
                        setNewSubscription((current) => ({
                          ...current,
                          subjectIds: event.target.value,
                        }))
                      }
                      placeholder="Comma-separated subject IDs"
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subscription-remarks"
                      className="mb-2 block text-sm font-medium text-text-primary"
                    >
                      Remarks
                    </label>

                    <input
                      id="subscription-remarks"
                      value={newSubscription.remarks}
                      onChange={(event) =>
                        setNewSubscription((current) => ({
                          ...current,
                          remarks: event.target.value,
                        }))
                      }
                      placeholder="Enter remarks"
                      className={inputClassName}
                    />
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </Button>

                  <Button type="submit">Save Subscription</Button>
                </div>
              </form>
            </Card>
          )}

          {/* Subscription records */}
          <Card
            title="Student Subscriptions"
            description="Review subscription records and their current status."
          >
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="w-full sm:w-52">
                <Select
                  label="Filter by Status"
                  value={subscriptionFilter}
                  options={subscriptionFilters.map((status) => ({
                    label: status === "All" ? "All Subscriptions" : status,
                    value: status,
                  }))}
                  onChange={(value) =>
                    setSubscriptionFilter(value as SubscriptionFilter)
                  }
                />
              </div>

              <p className="text-sm text-text-secondary">
                {visibleSubscriptions.length} record
                {visibleSubscriptions.length === 1 ? "" : "s"} found
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1500px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary-light/60 text-xs uppercase tracking-wide text-text-secondary">
                    <th className="px-4 py-3 font-semibold">Seq No</th>
                    <th className="px-4 py-3 font-semibold">Sub. Order ID</th>
                    <th className="px-4 py-3 font-semibold">Plan ID</th>
                    <th className="px-4 py-3 font-semibold">Plan Seq. No</th>
                    <th className="px-4 py-3 font-semibold">Coupon Code</th>
                    <th className="px-4 py-3 font-semibold">Start Date</th>
                    <th className="px-4 py-3 font-semibold">End Date</th>
                    <th className="px-4 py-3 font-semibold">Subject IDs</th>
                    <th className="px-4 py-3 font-semibold">Is Active</th>
                    <th className="px-4 py-3 font-semibold">Remarks</th>
                    <th className="px-4 py-3 font-semibold">Created At</th>
                    <th className="px-4 py-3 font-semibold">Updated At</th>
                    <th className="px-4 py-3 font-semibold">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {visibleSubscriptions.map((subscription) => (
                    <tr
                      key={subscription.id}
                      className="transition-colors hover:bg-secondary-light/40"
                    >
                      <td className="px-4 py-4 font-medium text-text-primary">
                        {subscription.sequenceNumber}
                      </td>

                      <td className="px-4 py-4 text-text-secondary">
                        {subscription.subscriptionOrderId || "—"}
                      </td>

                      <td className="px-4 py-4 text-text-secondary">
                        {subscription.planId}
                      </td>

                      <td className="px-4 py-4 text-text-secondary">
                        {subscription.planSequenceNumber}
                      </td>

                      <td className="px-4 py-4 text-text-secondary">
                        {subscription.couponCode || "—"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-text-secondary">
                        {formatDateTime(subscription.startDate)}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-text-secondary">
                        {formatDateTime(subscription.endDate)}
                      </td>

                      <td className="px-4 py-4 text-text-secondary">
                        {subscription.subjectIds.length > 0
                          ? subscription.subjectIds.join(", ")
                          : "—"}
                      </td>

                      <td className="px-4 py-4">
                        <StatusBadge
                          status={subscription.isActive ? "Active" : "Inactive"}
                        />
                      </td>

                      <td className="max-w-48 px-4 py-4 text-text-secondary">
                        {subscription.remarks || "—"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-text-secondary">
                        {formatDateTime(subscription.createdAt)}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-text-secondary">
                        {formatDateTime(subscription.updatedAt)}
                      </td>

                      <td className="px-4 py-4">
                        <button
                          type="button"
                          onClick={() => toggleSubscription(subscription.id)}
                          className={`whitespace-nowrap text-xs font-semibold transition-colors ${
                            subscription.isActive
                              ? "text-rose-600 hover:text-rose-700"
                              : "text-emerald-600 hover:text-emerald-700"
                          }`}
                        >
                          {subscription.isActive ? "Deactivate" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  ))}

                  {visibleSubscriptions.length === 0 && (
                    <tr>
                      <td
                        colSpan={13}
                        className="px-4 py-12 text-center text-sm text-text-secondary"
                      >
                        No subscription records match the selected filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs text-text-muted">
              Demo only: activating or deactivating a subscription changes local
              UI state, not actual subscription access.
            </p>
          </Card>

          {/* Order details */}
          <Card>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-text-primary">
                  Order Details
                </h2>

                <p className="mt-1 text-sm text-text-secondary">
                  Orders associated with the selected student.
                </p>
              </div>

              <Button
                variant="outline"
                onClick={() => setShowOrders((current) => !current)}
              >
                {showOrders ? "Hide Orders" : "View Orders"}
              </Button>
            </div>

            {showOrders && (
              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[850px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-border bg-secondary-light/60 text-xs uppercase tracking-wide text-text-secondary">
                      <th className="px-4 py-3 font-semibold">Order ID</th>
                      <th className="px-4 py-3 font-semibold">Student ID</th>
                      <th className="px-4 py-3 font-semibold">Plan</th>
                      <th className="px-4 py-3 font-semibold">Order Date</th>
                      <th className="px-4 py-3 font-semibold">
                        Payment Method
                      </th>
                      <th className="px-4 py-3 font-semibold">Amount</th>
                      <th className="px-4 py-3 font-semibold">
                        Payment Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-border">
                    {studentOrders.map((order) => (
                      <tr
                        key={order.orderId}
                        className="transition-colors hover:bg-secondary-light/40"
                      >
                        <td className="px-4 py-4 font-medium text-text-primary">
                          {order.orderId}
                        </td>

                        <td className="px-4 py-4 text-text-secondary">
                          {order.studentId}
                        </td>

                        <td className="px-4 py-4 text-text-secondary">
                          {order.planName}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-text-secondary">
                          <span className="inline-flex items-center gap-2">
                            <CalendarDays size={14} />
                            {formatDate(order.orderDate)}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-text-secondary">
                          {order.paymentMethod}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 font-medium text-text-primary">
                          {formatCurrency(order.amount)}
                        </td>

                        <td className="px-4 py-4">
                          <StatusBadge status={order.paymentStatus} />
                        </td>
                      </tr>
                    ))}

                    {studentOrders.length === 0 && (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-4 py-10 text-center text-sm text-text-secondary"
                        >
                          No orders are available for this student.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          {feedback && (
            <div
              role="status"
              className="rounded-lg border border-primary/20 bg-primary-light px-4 py-3 text-sm text-text-primary"
            >
              {feedback}
            </div>
          )}
        </>
      )}
    </div>
  );
}
