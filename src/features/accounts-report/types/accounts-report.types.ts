export type AccountsReportCourse =
  "NEET PG" | "NEET SS" | "FMGE" | "UG Curriculum" | "PG Residency";

export type AccountsReportType =
  | "getSalesPartnerCouponReportDownload"
  | "getVideoWiseReportDownload"
  | "getStudentWiseVideoReportDownload"
  | "getGeneralReportDownload"
  | "getBooksReportDownload";

export interface AccountsReportRequest {
  courseId: number;
  fromDate: string;
  toDate: string;
  reportType: AccountsReportType;
}

export interface AccountsReportOption {
  value: AccountsReportType;
  label: string;
}

export interface AccountsReportResponse {
  status: string;
  message: string;
  reportPath?: string;
}
