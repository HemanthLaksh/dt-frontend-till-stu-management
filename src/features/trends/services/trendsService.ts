import fastApiClient from "@/services/api/fastApiClient";

import { trendReports } from "../constants/trends";
import type {
  GetTrendReportParams,
  TrendDataItem,
  TrendReport,
} from "../types/trends.types";

interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

interface DateSignupResponse {
  course_id: number;
  from_date: string;
  to_date: string;
  total_students: number;
  days: Array<{
    date: string;
    students: number;
  }>;
}

interface StateSignupResponse {
  course_id: number;
  from_date: string;
  to_date: string;
  total_students: number;
  states: Array<{
    state: string | null;
    students: number;
  }>;
}

interface StateDailySignupResponse {
  course_id: number;
  from_date: string;
  to_date: string;
  total_students: number;
  state: string;
  days: Array<{
    date: string;
    students: number;
  }>;
}

interface CollegeResponse {
  course_id: number;
  items: Array<{
    college: string;
    students: number;
  }>;
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
}

interface OrdersByStateResponse {
  from_date: string;
  to_date: string;
  total_orders: number;
  states: Array<{
    state: string | null;
    orders: number;
  }>;
}

interface OrdersByDateResponse {
  from_date: string;
  to_date: string;
  total_orders: number;
  days: Array<{
    date: string;
    orders: number;
  }>;
}

interface OrdersByPlanResponse {
  course_id: number;
  from_date: string;
  to_date: string;
  total_orders: number;
  plans: Array<{
    plan_id: number;
    plan_name: string;
    orders: number;
  }>;
}

const COURSE_IDS: Partial<Record<string, number>> = {
  "neet-pg": 1,
  "neet-ss": 2,
  fmge: 3,
  "mbbs-curriculum": 4,
  "pg-residency": 5,
};

function normalizeState(state: string | null): string {
  if (!state || state === "null-null") {
    return "Unknown";
  }

  // Example API value: INDIA-Telangana
  const separatorIndex = state.indexOf("-");

  return separatorIndex >= 0
    ? state.slice(separatorIndex + 1).trim() || "Unknown"
    : state.trim();
}

function getCourseId(reportId: string): number | undefined {
  if (reportId.startsWith("neet-pg-")) {
    return COURSE_IDS["neet-pg"];
  }

  if (reportId.startsWith("neet-ss-")) {
    return COURSE_IDS["neet-ss"];
  }

  if (reportId.startsWith("fmge-")) {
    return COURSE_IDS.fmge;
  }

  if (reportId.startsWith("mbbs-curriculum-")) {
    return COURSE_IDS["mbbs-curriculum"];
  }

  if (reportId.startsWith("pg-residency-")) {
    return COURSE_IDS["pg-residency"];
  }

  return undefined;
}

function getReportTemplate(
  reportId: GetTrendReportParams["reportId"],
): TrendReport | null {
  return trendReports.find((report) => report.id === reportId) ?? null;
}

function withData(
  template: TrendReport,
  data: TrendDataItem[],
  dataKey = template.dataKey,
  xKey = template.xKey,
): TrendReport {
  return {
    ...template,
    data,
    dataKey,
    ...(xKey ? { xKey } : {}),
  };
}

export async function getTrendReport({
  reportId,
  fromDate,
  toDate,
  state,
}: GetTrendReportParams): Promise<TrendReport | null> {
  const template = getReportTemplate(reportId);

  if (!template) {
    return null;
  }

  const courseId = getCourseId(reportId);

  switch (reportId) {
    // Orders by State
    case "plan-orders-state": {
      const response = await fastApiClient.get<
        ApiEnvelope<OrdersByStateResponse>
      >("/v1/trends/orders/by-state", {
        params: {
          from_date: fromDate,
          to_date: toDate,
        },
      });

      return withData(
        template,
        response.data.data.states.map(({ state, orders }) => ({
          state: normalizeState(state),
          orders,
        })),
        "orders",
        "state",
      );
    }

    // Orders by Signup Date
    case "plan-orders-date": {
      const response = await fastApiClient.get<
        ApiEnvelope<OrdersByDateResponse>
      >("/v1/trends/orders/by-signup-date", {
        params: {
          from_date: fromDate,
          to_date: toDate,
        },
      });

      return withData(
        template,
        response.data.data.days.map(({ date, orders }) => ({
          date,
          orders,
        })),
        "orders",
        "date",
      );
    }

    // Student Signups by State
    case "neet-pg-state":
    case "neet-ss-state":
    case "fmge-state":
    case "mbbs-curriculum-state":
    case "pg-residency-state": {
      const response = await fastApiClient.get<
        ApiEnvelope<StateSignupResponse>
      >("/v1/trends/signups/by-state", {
        params: {
          course_id: courseId,
          from_date: fromDate,
          to_date: toDate,
        },
      });

      return withData(
        template,
        response.data.data.states.map(({ state, students }) => ({
          state: normalizeState(state),
          students,
        })),
        "students",
        "state",
      );
    }

    // Student Signups by Date
    case "neet-pg-date":
    case "neet-ss-date":
    case "fmge-date":
    case "mbbs-curriculum-date":
    case "pg-residency-date": {
      const response = await fastApiClient.get<ApiEnvelope<DateSignupResponse>>(
        "/v1/trends/signups/by-date",
        {
          params: {
            course_id: courseId,
            from_date: fromDate,
            to_date: toDate,
          },
        },
      );

      return withData(
        template,
        response.data.data.days.map(({ date, students }) => ({
          date,
          students,
        })),
        "students",
        "date",
      );
    }

    // State-wise Daily Student Signups
    case "neet-pg-state-wise":
    case "neet-ss-state-wise":
    case "fmge-state-wise":
    case "mbbs-curriculum-state-wise":
    case "pg-residency-state-wise": {
      if (!state?.trim()) {
        throw new Error("Please enter a state.");
      }

      const response = await fastApiClient.get<
        ApiEnvelope<StateDailySignupResponse>
      >("/v1/trends/signups/state-daily", {
        params: {
          course_id: courseId,
          state: state.trim(),
          from_date: fromDate,
          to_date: toDate,
        },
      });

      return withData(
        template,
        response.data.data.days.map(({ date, students }) => ({
          date,
          students,
        })),
        "students",
        "date",
      );
    }

    // Students by College
    case "neet-pg-college":
    case "neet-ss-college":
    case "fmge-college":
    case "mbbs-curriculum-college":
    case "pg-residency-college": {
      const response = await fastApiClient.get<ApiEnvelope<CollegeResponse>>(
        "/v1/trends/students/by-college",
        {
          params: {
            course_id: courseId,
            page: 1,
            page_size: 20,
          },
        },
      );

      return withData(
        template,
        response.data.data.items.map(({ college, students }) => ({
          college,
          students,
        })),
        "students",
        "college",
      );
    }

    // Orders by Plan
    case "neet-pg-package":
    case "neet-ss-package":
    case "fmge-package":
    case "mbbs-curriculum-package":
    case "pg-residency-package": {
      const response = await fastApiClient.get<
        ApiEnvelope<OrdersByPlanResponse>
      >("/v1/trends/orders/by-plan", {
        params: {
          course_id: courseId,
          from_date: fromDate,
          to_date: toDate,
        },
      });

      return withData(
        template,
        response.data.data.plans.map(({ plan_name, orders }) => ({
          name: plan_name,
          orders,
        })),
        "orders",
        "name",
      );
    }

    default: {
      throw new Error(
        `API integration is not configured for report: ${reportId}`,
      );
    }
  }
}
