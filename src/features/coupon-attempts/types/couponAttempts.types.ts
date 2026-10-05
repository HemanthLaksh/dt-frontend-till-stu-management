export interface CouponAnalyticsRequest {
  couponcode?: string;
  studentid?: string;
  fdate: string;
  tdate: string;
  cid?: number;
}

export interface CouponAttemptStudent {
  studentID: number;
  studentName: string;
  mobileNo: string;
  email?: string;
  education?: string;
  college?: string;
  subscribedYN?: string;

  isdCode?: string;
  addressState?: string;
  subsribedToPlan?: string;
  subscribedDate?: string;
  couponCodeUsed?: string;
  subscriptionOrderID?: string;
  amount?: string | number;

  couponReport?: CouponReport;
}

export interface CouponReport {
  couponCode?: string;
  planName?: string;
  planSeqNo?: string | number;
  subscriptionDateTime?: string;
  couponAllowAllPlansYN?: string;
  couponDiscountPCT?: string | number;
  subscriptionOrderID?: string;
  success?: string;
  amount?: string | number;
  crname?: string;
}

export interface CouponAnalyticsResponse {
  analytics?: CouponAttemptStudent[];
  message?: string;
}