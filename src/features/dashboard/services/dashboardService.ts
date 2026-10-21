import authClient from "@/services/api/authClient";
import { mockDashboardData } from "../utils/dashboardMock";

export interface OperationsDashboardData {
  pendingStudents: string;
  activeStudentsCreatedThisMonth: string;
  activeStudentsCreatedSinceOneMonth: string;
  activeStudents: string;
  inactiveStudents: string;
  deletedStudents: string;
  ios: string;
  android: string;
  count2021: string;
  neetPGCount: string;
  neetSSCount: string;
  neetPG: string;
  neetSS: string;
  appActiveNeetPGCount: string;
  appActiveNeetSSCount: string;
  neetSS2020SignUps: string;
  neetSS2021SignUps: string;
  websiteCount: string;
  fmgeCount2021: string;
  fmgeTotalSignUps: string;
  fmgeLoggedIn: string;
  appActiveFMGECount: string;
  fmge2021SignUpCount: string;
  t2023NEETPG: string;
  t2023NEETSS: string;
  t2023FMGE: string;
  pgResidecncy2020SignUps: string;
  t2023PGResidency: string;
  c12024: string;
  c22024: string;
  c32024: string;
  c42024: string;
  c52024: string;
  mbbsCurriculumCount: string;
  pgResidencyCount: string;
  mbbsCurriculumLoggedIn: string;
  pgResidencyLoggedIn: string;
  mbbsCurriculum2025SignUps: string;
  mbbsCurriculum2024SignUps: string;
  mbbsCurriculum2023SignUps: string;
  pgResidency2025SignUps: string;
  pgResidency2024SignUps: string;
  pgResidency2023SignUps: string;
}

export interface OperationsDashboardResponse {
  studentDetails: OperationsDashboardData;
  status: string;
  message: string;
}

export async function fetchOperationsDashboard(): Promise<OperationsDashboardData> {
  const response = await authClient.post<OperationsDashboardResponse>(
    "/Operations/dashboard",
    {},
  );

  if (response.data.status !== "Y") {
    throw new Error(
      response.data.message || "Failed to fetch dashboard statistics.",
    );
  }

  return response.data.studentDetails;
}

export interface DailyStatsRequest {
  fromDate: string;
  toDate: string;
}

export interface DailyStatsResponse {
  status: string;
  message: string;
}

export async function fetchDailyStats(
  payload: DailyStatsRequest,
): Promise<DailyStatsResponse> {
  const response = await authClient.post<DailyStatsResponse>(
    "/Operations/sendEmailDailyStats",
    payload,
  );

  if (response.data.status !== "Y") {
    throw new Error(
      response.data.message || "Failed to fetch daily statistics.",
    );
  }

  return response.data;
}

export async function fetchDashboardData(): Promise<OperationsDashboardData> {
  const useMockData = process.env.NEXT_PUBLIC_USE_DASHBOARD_MOCK === "true";

  if (useMockData) {
    return mockDashboardData;
  }

  return fetchOperationsDashboard();
}
