"use client";

import { useState } from "react";
import axios from "axios";

import {
  CREATE_ORDER_MESSAGES,
  DEFAULT_ORDER_VALUES,
} from "../constants/createOrder";

import {
  checkNotesPlan,
  createNotesOrder,
  createStudentOrder,
  fetchPaymentDetails,
} from "../services/createOrderService";

import {
  getPaymentAmountInRupees,
  validateOrderForm,
} from "../utils/createOrder.utils";

import type {
  CreateNotesOrderRequest,
  CreateOrderFormValues,
  CreateOrderResult,
  CreateStudentOrderRequest,
  OrderType,
  PaymentDetails,
} from "../types/createOrder.types";

function getErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data as
      { message?: string; detail?: string } | undefined;

    return responseData?.message ?? responseData?.detail ?? fallback;
  }

  return error instanceof Error ? error.message : fallback;
}

export function useCreateOrder() {
  const [orderType, setOrderType] = useState<OrderType>("student");
  const [formValues, setFormValues] =
    useState<CreateOrderFormValues>(DEFAULT_ORDER_VALUES);

  const [paymentId, setPaymentId] = useState("");
  const [payment, setPayment] = useState<PaymentDetails | null>(null);

  const [isFetchingPayment, setIsFetchingPayment] = useState(false);
  const [isCheckingPlan, setIsCheckingPlan] = useState(false);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  const [paymentError, setPaymentError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function updateField<K extends keyof CreateOrderFormValues>(
    field: K,
    value: CreateOrderFormValues[K],
  ) {
    setFormValues((previous) => ({ ...previous, [field]: value }));
    setError("");
    setSuccess("");
  }

  function changeOrderType(value: OrderType) {
    setOrderType(value);
    setError("");
    setSuccess("");
  }

  async function searchPayment() {
    const id = paymentId.trim();

    setPaymentError("");
    setError("");
    setSuccess("");
    setPayment(null);

    if (!id) {
      setPaymentError(CREATE_ORDER_MESSAGES.PAYMENT_ID_REQUIRED);
      return;
    }

    setIsFetchingPayment(true);

    try {
      const response = await fetchPaymentDetails({ payment_id: id });

      if (!response.success || !response.data?.payment) {
        setPaymentError(CREATE_ORDER_MESSAGES.PAYMENT_FETCH_ERROR);
        return;
      }

      const paymentDetails = response.data.payment;
      setPayment(paymentDetails);

      // The payment API returns amount in the smallest currency unit (paise).
      // The order-create examples use rupee amounts.
      const amountInRupees = getPaymentAmountInRupees(paymentDetails.amount);

      setFormValues((previous) => ({
        ...previous,
        bankRefNo: paymentDetails.id,
        trackingId: response.data.order.id || "",
        amount: amountInRupees.toFixed(2),
        amountApproved: amountInRupees.toFixed(2),
        paymentMode: paymentDetails.method || previous.paymentMode,
        currency: paymentDetails.currency || "INR",
      }));
    } catch (fetchError) {
      setPaymentError(
        getErrorMessage(fetchError, CREATE_ORDER_MESSAGES.PAYMENT_FETCH_ERROR),
      );
    } finally {
      setIsFetchingPayment(false);
    }
  }

  async function loadNotesPlanPrice(): Promise<boolean> {
    const planId = Number(formValues.planId);
    const sequenceNumber = Number(formValues.planSeqNo);

    if (
      !Number.isInteger(planId) ||
      planId <= 0 ||
      !Number.isInteger(sequenceNumber) ||
      sequenceNumber <= 0
    ) {
      setError(CREATE_ORDER_MESSAGES.PLAN_REQUIRED);
      return false;
    }

    setIsCheckingPlan(true);
    setError("");

    try {
      const response = await checkNotesPlan({
        plan_id: planId,
        seq_no: sequenceNumber,
      });

      const status = response.gatewayResponse?.status;
      const price =
        response.gatewayResponse?.response?.hard_notes_price_including_gst;

      if (!status?.isSuccess || typeof price !== "number") {
        setError(status?.message || "Unable to retrieve notes plan pricing.");
        return false;
      }

      setFormValues((previous) => ({
        ...previous,
        amount: price.toFixed(2),
        amountApproved: price.toFixed(2),
      }));

      return true;
    } catch (planError) {
      setError(
        getErrorMessage(planError, "Unable to retrieve notes plan pricing."),
      );
      return false;
    } finally {
      setIsCheckingPlan(false);
    }
  }

  async function submitOrder() {
    setError("");
    setSuccess("");

    const validationError = validateOrderForm(formValues, orderType, payment);

    if (validationError) {
      setError(validationError);
      return;
    }

    if (!payment) return;

    setIsCreatingOrder(true);

    try {
      const commonValues = {
        studentId: Number(formValues.studentId),
        planId: Number(formValues.planId),
        planSeqNo: Number(formValues.planSeqNo),
        bankRefNo: formValues.bankRefNo.trim() || payment.id,
        trackingId: formValues.trackingId.trim() || payment.order_id,
        amount: Number(formValues.amount),
        amountApproved: Number(formValues.amountApproved),
        paymentMode: formValues.paymentMode,
        currency: formValues.currency,
        couponCode: formValues.couponCode.trim(),
        remarks: formValues.remarks.trim(),
        addSubjectIds: formValues.addSubjectIds.trim(),
      };

      let result: CreateOrderResult;

      if (orderType === "student") {
        const payload: CreateStudentOrderRequest = {
          ...commonValues,
          orderStatus: "1",
          statusMessage: "Manual Payment Admin Portal",
        };

        const response = await createStudentOrder(payload);
        const status = response.gatewayResponse?.status;

        if (!status?.isSuccess) {
          throw new Error(
            status?.message || CREATE_ORDER_MESSAGES.ORDER_CREATE_ERROR,
          );
        }

        result = {
          message: status.message || "Order created successfully",
          subscriptionOrderId: response.subscription_order_id,
        };
      } else {
        const payload: CreateNotesOrderRequest = {
          ...commonValues,
          addressConfirmed: formValues.addressConfirmed,
          address1: formValues.address1.trim(),
          address2: formValues.address2.trim(),
          city: formValues.city.trim(),
          state: formValues.state.trim(),
          pincode: formValues.pincode.trim(),
        };

        const response = await createNotesOrder(payload);

        result = {
          message: response.message || "Notes order created successfully",
          subscriptionOrderId: response.subscription_order_id,
          deliveryAddressId: response.delivery_address_id,
        };
      }

      const deliveryMessage = result.deliveryAddressId
        ? ` Delivery address ID: ${result.deliveryAddressId}.`
        : "";

      setSuccess(
        `${result.message}. Subscription order ID: ${result.subscriptionOrderId}.${deliveryMessage}`,
      );
    } catch (submitError) {
      setError(
        getErrorMessage(submitError, CREATE_ORDER_MESSAGES.ORDER_CREATE_ERROR),
      );
    } finally {
      setIsCreatingOrder(false);
    }
  }

  function resetForm() {
    setFormValues(DEFAULT_ORDER_VALUES);
    setPaymentId("");
    setPayment(null);
    setPaymentError("");
    setError("");
    setSuccess("");
  }

  return {
    orderType,
    changeOrderType,
    formValues,
    updateField,
    paymentId,
    setPaymentId,
    payment,
    isFetchingPayment,
    isCheckingPlan,
    isCreatingOrder,
    paymentError,
    error,
    success,
    searchPayment,
    loadNotesPlanPrice,
    submitOrder,
    resetForm,
  };
}
