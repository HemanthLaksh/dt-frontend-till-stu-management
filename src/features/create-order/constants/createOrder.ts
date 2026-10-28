import type { CreateOrderFormValues } from "../types/createOrder.types";

export const CREATE_ORDER_ENDPOINTS = {
  FETCH_PAYMENT_DETAILS: "/dailyops/fetch-payment-details/",
  NOTES_PLAN: "/admin/notesplan/",
  CREATE_STUDENT_ORDER: "/dailyops/create-student-order/",
  CREATE_NOTES_ORDER: "/dailyops/create-notes-order/",
} as const;

export const DEFAULT_ORDER_VALUES: CreateOrderFormValues = {
  studentId: "",
  planId: "",
  planSeqNo: "",
  amount: "",
  amountApproved: "",
  bankRefNo: "",
  trackingId: "",
  paymentMode: "upi",
  currency: "INR",
  couponCode: "",
  remarks: "",
  addSubjectIds: "",
  addressConfirmed: false,
  address1: "",
  address2: "",
  city: "",
  state: "",
  pincode: "",
};

export const PAYMENT_MODE_OPTIONS = [
  { value: "upi", label: "UPI" },
  { value: "netbanking", label: "Net Banking" },
  { value: "card", label: "Card" },
  { value: "wallet", label: "Wallet" },
  { value: "cash", label: "Cash" },
  { value: "other", label: "Other" },
];

export const CREATE_ORDER_MESSAGES = {
  PAYMENT_ID_REQUIRED: "Enter a payment ID.",
  PAYMENT_FETCH_ERROR: "Unable to fetch payment details. Please try again.",
  STUDENT_REQUIRED: "Student ID is required.",
  PLAN_REQUIRED: "Plan ID and sequence number are required.",
  AMOUNT_INVALID: "Enter a valid amount greater than zero.",
  PAYMENT_NOT_CAPTURED:
    "The payment must be captured before creating an order.",
  ADDRESS_REQUIRED: "Complete the required delivery address fields.",
  ADDRESS_CONFIRMATION_REQUIRED: "Please confirm the delivery address.",
  ORDER_CREATE_ERROR: "Unable to create the order. Please try again.",
} as const;
