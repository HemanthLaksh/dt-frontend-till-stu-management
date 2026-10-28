export type OrderType = "student" | "notes";

export interface PaymentSearchParams {
  payment_id: string;
}

export interface PaymentDetails {
  id: string;
  amount: number;
  currency: string;
  status: string;
  order_id: string;
  method: string;
  captured: boolean;
  bank?: string | null;
  email?: string | null;
  contact?: string | null;
  amount_refunded?: number;
  acquirer_data?: {
    bank_transaction_id?: string;
  };
}

export interface PaymentOrderDetails {
  id: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  status: string;
}

export interface FetchPaymentDetailsResponse {
  success: boolean;
  data: {
    type: string;
    payment: PaymentDetails;
    order: PaymentOrderDetails;
    count: number;
  };
}

export interface NotesPlanRequest {
  plan_id: number;
  seq_no: number;
}

export interface NotesPlanResponse {
  gatewayResponse: {
    response: {
      count: number;
      hard_notes_price_including_gst: number;
      free_notes_eligible: boolean | null;
    };
    status: {
      isSuccess: boolean;
      message: string;
      statusCode: string;
    };
  };
}

export interface CreateStudentOrderRequest {
  planId: number;
  planSeqNo: number;
  studentId: number;
  bankRefNo: string;
  trackingId: string;
  amount: number;
  amountApproved: number;
  paymentMode: string;
  orderStatus: string;
  statusMessage: string;
  currency: string;
  couponCode: string;
  remarks: string;
  addSubjectIds: string;
}

export interface CreateStudentOrderResponse {
  gatewayResponse: {
    status: {
      isSuccess: boolean;
      message: string;
    };
  };
  subscription_order_id: number;
}

export interface CreateNotesOrderRequest {
  studentId: number;
  planId: number;
  planSeqNo: number;
  amount: number;
  amountApproved: number;
  bankRefNo: string;
  trackingId: string;
  paymentMode: string;
  currency: string;
  couponCode: string;
  remarks: string;
  addSubjectIds: string;
  addressConfirmed: boolean;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
}

export interface CreateNotesOrderResponse {
  message: string;
  subscription_order_id: number;
  delivery_address_id: number;
}

export interface CreateOrderFormValues {
  studentId: string;
  planId: string;
  planSeqNo: string;
  amount: string;
  amountApproved: string;
  bankRefNo: string;
  trackingId: string;
  paymentMode: string;
  currency: string;
  couponCode: string;
  remarks: string;
  addSubjectIds: string;
  addressConfirmed: boolean;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
}

export interface CreateOrderResult {
  message: string;
  subscriptionOrderId: number;
  deliveryAddressId?: number;
}
