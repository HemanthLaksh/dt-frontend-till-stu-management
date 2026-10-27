export type TrendChartType = "line" | "bar" | "pie";

export type TrendReportId =
  | "plan-orders-state"
  | "plan-orders-date"
  | "neet-pg-state"
  | "neet-pg-date"
  | "neet-pg-state-wise"
  | "neet-pg-college"
  | "neet-pg-package"
  | "neet-ss-state"
  | "neet-ss-date"
  | "neet-ss-state-wise"
  | "neet-ss-college"
  | "neet-ss-package"
  | "fmge-state"
  | "fmge-date"
  | "fmge-state-wise"
  | "fmge-college"
  | "fmge-package"
  | "mbbs-curriculum-state"
  | "mbbs-curriculum-date"
  | "mbbs-curriculum-state-wise"
  | "mbbs-curriculum-college"
  | "mbbs-curriculum-package"
  | "pg-residency-state"
  | "pg-residency-date"
  | "pg-residency-state-wise"
  | "pg-residency-college"
  | "pg-residency-package";

export interface TrendDataItem {
  [key: string]: string | number;
}

export interface TrendReport {
  id: TrendReportId;
  title: string;
  description: string;
  chartType: TrendChartType;
  data: TrendDataItem[];
  dataKey: string;
  xKey?: string;
}

export interface TrendReportSection {
  id: string;
  title: string;
  description: string;
  reports: TrendReport[];
}

export interface TrendDateRange {
  fromDate: string;
  toDate: string;
}

export interface GetTrendReportParams extends TrendDateRange {
  reportId: TrendReportId;
  state?: string;
}

export interface TrendReportCardProps {
  report: TrendReport;
  onClick: (report: TrendReport) => void;
}

export interface TrendChartProps {
  report: TrendReport;
}

export interface TrendDateFilterProps {
  fromDate: string;
  toDate: string;
  onFromDateChange: (date: string) => void;
  onToDateChange: (date: string) => void;
  onGenerateReport: () => void;
  error?: string;
  disabled?: boolean;
  state?: string;
  onStateChange?: (state: string) => void;
  showStateFilter?: boolean;
  onClear: () => void;
}
