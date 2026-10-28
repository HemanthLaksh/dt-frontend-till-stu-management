import { CREATE_ORDER_MESSAGES } from "../constants/createOrder";
import type {
  CreateOrderFormValues,
  OrderType,
  PaymentDetails,
} from "../types/createOrder.types";

export function isPositiveNumber(value: string): boolean {
  const parsed = Number(value);
  return value.trim() !== "" && Number.isFinite(parsed) && parsed > 0;
}

export function getPaymentAmountInRupees(amountInPaise: number): number {
  return amountInPaise / 100;
}

export function formatCurrency(amount: number, currency = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function validateOrderForm(
  values: CreateOrderFormValues,
  orderType: OrderType,
  payment: PaymentDetails | null,
): string | null {
  if (!payment) {
    return CREATE_ORDER_MESSAGES.PAYMENT_ID_REQUIRED;
  }

  if (!payment.captured) {
    return CREATE_ORDER_MESSAGES.PAYMENT_NOT_CAPTURED;
  }

  if (!isPositiveNumber(values.studentId)) {
    return CREATE_ORDER_MESSAGES.STUDENT_REQUIRED;
  }

  if (!isPositiveNumber(values.planId) || !isPositiveNumber(values.planSeqNo)) {
    return CREATE_ORDER_MESSAGES.PLAN_REQUIRED;
  }

  if (
    !isPositiveNumber(values.amount) ||
    !isPositiveNumber(values.amountApproved)
  ) {
    return CREATE_ORDER_MESSAGES.AMOUNT_INVALID;
  }

  if (orderType === "notes") {
    const requiredAddressFields = [
      values.address1,
      values.city,
      values.state,
      values.pincode,
    ];

    if (requiredAddressFields.some((field) => !field.trim())) {
      return CREATE_ORDER_MESSAGES.ADDRESS_REQUIRED;
    }

    if (!values.addressConfirmed) {
      return CREATE_ORDER_MESSAGES.ADDRESS_CONFIRMATION_REQUIRED;
    }
  }

  return null;
}
