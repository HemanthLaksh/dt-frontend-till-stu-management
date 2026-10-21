import type { AccountsReportType } from "../types/accounts-report.types";

interface ValidateAccountsReportParams {
  fromDate: string;
  toDate: string;
  reportType: AccountsReportType | "";
}

export function validateAccountsReport({
  fromDate,
  toDate,
  reportType,
}: ValidateAccountsReportParams): string | null {
  if (!fromDate || !toDate || !reportType) {
    return "Please select the From Date, To Date, and Report Type.";
  }

  if (fromDate > toDate) {
    return "From Date cannot be later than To Date.";
  }

  return null;
}
