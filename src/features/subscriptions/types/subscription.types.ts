export interface SubscriptionStudent {
  studentId: string;
  isdCode: string;
  name: string;
  mobile: string;
  email: string;
  address: string;
  education: string;
  college: string;
  course: string;
  profileStatus: string;
  android: string | number;
  ios: string | number;
  createdAt: string;
  updatedAt: string;
}

export interface StudentSubscription {
  id: string;
  studentId: string;
  sequenceNumber: number;
  subscriptionOrderId: string;
  planId: number;
  planSequenceNumber: number;
  couponCode: string;
  startDate: string;
  endDate: string;
  subjectIds: string[];
  isActive: boolean;
  remarks: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionOrder {
  orderId: string;
  studentId: string;
  planName: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  orderDate: string;
}
