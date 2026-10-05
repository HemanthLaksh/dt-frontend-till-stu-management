export interface QuestionBankAnalyticsRequest {
  studentid: string;
  fdate: string;
  tdate: string;
}

export interface QuestionBankAnalyticsItem {
  studentID: number;
  studentName: string;
  isdCode: string;
  mobileNo: string;
  email: string;
  education: string;
  college: string;
  addressState: string;
  subscribedYN: string;
  subsribedToPlan: string;
  subscribedDate: string;
  couponCodeUsed: string;
  subscriptionOrderID: string;
  amount: number | string;

  module: {
    moduleTrackingID: string;
    moduleAccessedAt: string;
    correctAnswers: number | string;
    incorrectAnswers: number | string;
    skippedAnswers: number | string;
    moduleName: string;
    topicName: string;
    subjectName: string;
  };
}

export interface QuestionBankAnalyticsResponse {
  analytics?: QuestionBankAnalyticsItem[] | null;
}