import { trendReports } from "../constants/trends";

import type {
  GetTrendReportParams,
  TrendReport,
} from "../types/trends.types";

export const getTrendReport = async ({
  reportId,
  fromDate,
  toDate,
}: GetTrendReportParams): Promise<TrendReport | null> => {
  /*
   * Temporary dummy implementation.
   *
   * API integration will be added here later.
   *
   * Example:
   *
   * const response = await apiClient.get("/trends/report", {
   *   params: {
   *     reportId,
   *     fromDate,
   *     toDate,
   *   },
   * });
   *
   * return response.data;
   */

  // Prevent unused parameter warnings until API integration.
  void fromDate;
  void toDate;

  const report = trendReports.find(
    (item) => item.id === reportId,
  );

  return report ?? null;
};