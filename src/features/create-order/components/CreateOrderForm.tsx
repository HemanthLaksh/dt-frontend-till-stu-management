"use client";

import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import Select from "@/components/ui/Select/Select";

import { PAYMENT_MODE_OPTIONS } from "../constants/createOrder";

import type {
  CreateOrderFormValues,
  OrderType,
} from "../types/createOrder.types";

interface CreateOrderFormProps {
  orderType: OrderType;
  onOrderTypeChange: (value: OrderType) => void;
  values: CreateOrderFormValues;
  onChange: <K extends keyof CreateOrderFormValues>(
    field: K,
    value: CreateOrderFormValues[K],
  ) => void;
  onLoadNotesPrice: () => void;
  onSubmit: () => void;
  onReset: () => void;
  isCheckingPlan: boolean;
  isCreatingOrder: boolean;
  disabled: boolean;
  error: string;
  success: string;
}

export default function CreateOrderForm({
  orderType,
  onOrderTypeChange,
  values,
  onChange,
  onLoadNotesPrice,
  onSubmit,
  onReset,
  isCheckingPlan,
  isCreatingOrder,
  disabled,
  error,
  success,
}: CreateOrderFormProps) {
  const inputDisabled = disabled || isCreatingOrder;

  return (
    <section className="rounded-xl border border-border bg-surface p-5 shadow-sm sm:p-6">
      <div className="mb-6">
        <h2 className="text-base font-semibold text-text-primary">
          Create Order
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          Enter the student and plan details, verify the amount, and submit the
          order.
        </p>
      </div>

      <div className="mb-6">
        <p className="mb-2 text-sm font-medium text-text-primary">Order Type</p>

        <div className="inline-flex rounded-lg border border-border bg-secondary-light p-1">
          {(["student", "notes"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onOrderTypeChange(type)}
              className={`rounded-md px-4 py-2 text-sm font-medium capitalize transition ${
                orderType === type
                  ? "bg-surface text-primary shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {type === "student" ? "Student Order" : "Notes Order"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Input
          label="Student ID"
          type="number"
          min="1"
          value={values.studentId}
          onChange={(event) => onChange("studentId", event.target.value)}
          placeholder="Enter student ID"
          required
          disabled={inputDisabled}
        />

        <Input
          label="Plan ID"
          type="number"
          min="1"
          value={values.planId}
          onChange={(event) => onChange("planId", event.target.value)}
          placeholder="Enter plan ID"
          required
          disabled={inputDisabled}
        />

        <div className="flex items-end gap-2">
          <div className="flex-1">
            <Input
              label="Plan Sequence Number"
              type="number"
              min="1"
              value={values.planSeqNo}
              onChange={(event) => onChange("planSeqNo", event.target.value)}
              placeholder="Enter sequence number"
              required
              disabled={inputDisabled}
            />
          </div>

          {orderType === "notes" && (
            <Button
              type="button"
              variant="outline"
              loading={isCheckingPlan}
              disabled={inputDisabled || isCheckingPlan}
              onClick={onLoadNotesPrice}
            >
              Get Price
            </Button>
          )}
        </div>

        <Input
          label="Amount (₹)"
          type="number"
          min="0.01"
          step="0.01"
          value={values.amount}
          onChange={(event) => onChange("amount", event.target.value)}
          required
          disabled={inputDisabled}
        />

        <Input
          label="Approved Amount (₹)"
          type="number"
          min="0.01"
          step="0.01"
          value={values.amountApproved}
          onChange={(event) => onChange("amountApproved", event.target.value)}
          required
          disabled={inputDisabled}
        />

        <Input
          label="Bank Reference Number"
          value={values.bankRefNo}
          onChange={(event) => onChange("bankRefNo", event.target.value)}
          placeholder="Payment reference"
          disabled={inputDisabled}
        />

        <Input
          label="Tracking ID"
          value={values.trackingId}
          onChange={(event) => onChange("trackingId", event.target.value)}
          placeholder="Gateway order ID"
          disabled={inputDisabled}
        />

        <div>
          <Select
            label="Payment Mode"
            value={values.paymentMode}
            options={PAYMENT_MODE_OPTIONS}
            onChange={(value) => onChange("paymentMode", value)}
            disabled={inputDisabled}
          />
        </div>

        <Input
          label="Currency"
          value={values.currency}
          onChange={(event) => onChange("currency", event.target.value)}
          required
          disabled={inputDisabled}
        />

        <Input
          label="Coupon Code"
          value={values.couponCode}
          onChange={(event) => onChange("couponCode", event.target.value)}
          placeholder="Optional"
          disabled={inputDisabled}
        />

        <Input
          label="Subject IDs"
          value={values.addSubjectIds}
          onChange={(event) => onChange("addSubjectIds", event.target.value)}
          placeholder="Optional"
          disabled={inputDisabled}
        />

        <div className="sm:col-span-2 lg:col-span-3">
          <label
            htmlFor="create-order-remarks"
            className="mb-1.5 block text-sm font-medium text-text-primary"
          >
            Remarks
          </label>
          <textarea
            id="create-order-remarks"
            rows={3}
            value={values.remarks}
            onChange={(event) => onChange("remarks", event.target.value)}
            placeholder="Enter order remarks"
            disabled={inputDisabled}
            className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-text-primary outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-4 focus:ring-primary-light disabled:cursor-not-allowed disabled:bg-secondary-light"
          />
        </div>
      </div>

      {orderType === "notes" && (
        <div className="mt-8 border-t border-border pt-6">
          <h3 className="mb-4 text-sm font-semibold text-text-primary">
            Delivery Address
          </h3>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Input
              label="Address Line 1"
              value={values.address1}
              onChange={(event) => onChange("address1", event.target.value)}
              required
              disabled={inputDisabled}
            />

            <Input
              label="Address Line 2"
              value={values.address2}
              onChange={(event) => onChange("address2", event.target.value)}
              disabled={inputDisabled}
            />

            <Input
              label="City"
              value={values.city}
              onChange={(event) => onChange("city", event.target.value)}
              required
              disabled={inputDisabled}
            />

            <Input
              label="State"
              value={values.state}
              onChange={(event) => onChange("state", event.target.value)}
              required
              disabled={inputDisabled}
            />

            <Input
              label="Pincode"
              value={values.pincode}
              onChange={(event) => onChange("pincode", event.target.value)}
              inputMode="numeric"
              required
              disabled={inputDisabled}
            />
          </div>

          <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm text-text-secondary">
            <input
              type="checkbox"
              checked={values.addressConfirmed}
              onChange={(event) =>
                onChange("addressConfirmed", event.target.checked)
              }
              disabled={inputDisabled}
              className="mt-0.5 size-4 rounded border-border accent-primary"
            />
            <span>I confirm that the delivery address is correct.</span>
          </label>
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {success && (
        <div
          role="status"
          className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
        >
          {success}
        </div>
      )}

      <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-border pt-5">
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          disabled={isCreatingOrder}
        >
          Reset
        </Button>

        <Button
          type="button"
          onClick={onSubmit}
          loading={isCreatingOrder}
          disabled={disabled || isCreatingOrder}
        >
          Create Order
        </Button>
      </div>
    </section>
  );
}
