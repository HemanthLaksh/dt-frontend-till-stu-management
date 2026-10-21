import type {
  AccountsReportCourse,
  AccountsReportOption,
} from "../types/accounts-report.types";

export interface AccountsReportCourseOption {
  id: number;
  label: AccountsReportCourse;
}

export const ACCOUNTS_REPORT_COURSES: AccountsReportCourseOption[] = [
  {
    id: 1,
    label: "NEET PG",
  },
  {
    id: 2,
    label: "NEET SS",
  },
  {
    id: 3,
    label: "FMGE",
  },
  {
    id: 4,
    label: "UG Curriculum",
  },
  {
    id: 5,
    label: "PG Residency",
  },
];

export const ACCOUNTS_REPORT_OPTIONS: AccountsReportOption[] = [
  {
    value: "getSalesPartnerCouponReportDownload",
    label: "Sales Partner Coupon",
  },
  {
    value: "getVideoWiseReportDownload",
    label: "Video Level",
  },
  {
    value: "getStudentWiseVideoReportDownload",
    label: "Student Level Video",
  },
  {
    value: "getGeneralReportDownload",
    label: "General",
  },
  {
    value: "getBooksReportDownload",
    label: "Books",
  },
];
