import authClient from "@/services/api/client";

import { CREATE_ORDER_ENDPOINTS } from "../constants/createOrder";

import type {
  CreateNotesOrderRequest,
  CreateNotesOrderResponse,
  CreateStudentOrderRequest,
  CreateStudentOrderResponse,
  FetchPaymentDetailsResponse,
  NotesPlanRequest,
  NotesPlanResponse,
  PaymentSearchParams,
} from "../types/createOrder.types";

export async function fetchPaymentDetails(
  params: PaymentSearchParams,
): Promise<FetchPaymentDetailsResponse> {
  const response = await authClient.get<FetchPaymentDetailsResponse>(
    CREATE_ORDER_ENDPOINTS.FETCH_PAYMENT_DETAILS,
    { params },
  );

  return response.data;
}

export async function checkNotesPlan(
  payload: NotesPlanRequest,
): Promise<NotesPlanResponse> {
  const response = await authClient.post<NotesPlanResponse>(
    CREATE_ORDER_ENDPOINTS.NOTES_PLAN,
    payload,
  );

  return response.data;
}

export async function createStudentOrder(
  payload: CreateStudentOrderRequest,
): Promise<CreateStudentOrderResponse> {
  const response = await authClient.post<CreateStudentOrderResponse>(
    CREATE_ORDER_ENDPOINTS.CREATE_STUDENT_ORDER,
    payload,
  );

  return response.data;
}

export async function createNotesOrder(
  payload: CreateNotesOrderRequest,
): Promise<CreateNotesOrderResponse> {
  const response = await authClient.post<CreateNotesOrderResponse>(
    CREATE_ORDER_ENDPOINTS.CREATE_NOTES_ORDER,
    payload,
  );

  return response.data;
}
