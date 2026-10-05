export type SubscriberReportType = "A" | "IA";

export interface SubscriberFilters {
  courseId: string;
  businessType: string;
  fromDate: string;
  toDate: string;
}

export interface SubscriberReportRequest {
  courseId: number;
  businessType: string;
  fromDate: string;
  toDate: string;
}

export interface SubscriberReportResponse {
  status: "Y" | "N";
  message: string;
  reportPath?: string;
}

export interface SubscriberReportResult {
  success: boolean;
  message: string;
  reportPath?: string;
}