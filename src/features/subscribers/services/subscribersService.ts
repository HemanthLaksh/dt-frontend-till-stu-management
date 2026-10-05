import apiClient from "@/services/api/client";

import {
  SUBSCRIBER_REPORT_ENDPOINTS,
} from "../constants/subscribers.constants";

import type {
  SubscriberReportRequest,
  SubscriberReportResponse,
  SubscriberReportType,
} from "../types/subscribers.types";

export const getSubscribersReport = async (
  reportType: SubscriberReportType,
  request: SubscriberReportRequest,
): Promise<SubscriberReportResponse> => {
  const endpoint =
    SUBSCRIBER_REPORT_ENDPOINTS[reportType];

  const response = await apiClient.post<SubscriberReportResponse>(
    endpoint,
    request,
  );

  return response.data;
};