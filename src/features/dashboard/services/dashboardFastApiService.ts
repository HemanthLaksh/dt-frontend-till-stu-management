import fastApiClient from "@/services/api/fastApiClient";

// ============================================================
// Dashboard API Types
// ============================================================

export interface FastApiStudentDetails {
  activeStudentsCreatedThisMonth: string;
  deletedStudents: string;
  ios: string;
  android: string;
  websiteCount: string;
}

export interface FastApiCourse {
  courseId: number;
  courseName: string;
  totalStudents: number;
  loggedIn: number;
  signUpsByYear: Record<string, number>;
}

export interface FastApiDashboardResponse {
  studentDetails: FastApiStudentDetails;
  courses: FastApiCourse[];
  status: string;
  message: string;
}

// ============================================================
// Daily Statistics API Types
// ============================================================

export interface FastApiDailyStatsRequest {
  fromDate: string;
  toDate: string;
}

export interface FastApiDailyStatsResponse {
  status: string;
  message: string;
}

// ============================================================
// Student Accounts API Types
// ============================================================

export interface FastApiStudent {
  studentID: string;
  name: string;
  mobileNo: string;
  email: string;
  mailVerified: string;
  education: string;
  college: string;
  profileStatus: string;
  deleted: string;
  createdAt: string;
  updatedAt: string;
}

export interface FastApiStudentAccountsRequest {
  startDate: string;
  endDate: string;
  courseId: number;
  page?: number;
  pageSize?: number;
}

export interface FastApiStudentAccountsResponse {
  student: FastApiStudent[];
  status: string;
  message: string;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

// ============================================================
// Fetch Dashboard Statistics
// POST /api/Operations/dashboard
// ============================================================

export async function fetchFastApiDashboard(): Promise<FastApiDashboardResponse> {
  const response = await fastApiClient.post<FastApiDashboardResponse>(
    "/Operations/dashboard",
    {},
  );

  if (response.data.status !== "Y") {
    throw new Error(
      response.data.message || "Failed to fetch Dashboard statistics.",
    );
  }

  return response.data;
}

// ============================================================
// Fetch Daily Statistics
// POST /api/Operations/sendEmailDailyStats
// ============================================================

export async function sendFastApiDailyStats(
  payload: FastApiDailyStatsRequest,
): Promise<FastApiDailyStatsResponse> {
  const response = await fastApiClient.post<FastApiDailyStatsResponse>(
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

// ============================================================
// Fetch Student Accounts
// POST /api/MCQ/getAllStudentAccountsCreatedBetweenDates
// ============================================================

export async function fetchFastApiStudentAccounts(
  payload: FastApiStudentAccountsRequest,
): Promise<FastApiStudentAccountsResponse> {
  const response = await fastApiClient.post<FastApiStudentAccountsResponse>(
    "/MCQ/getAllStudentAccountsCreatedBetweenDates",
    payload,
  );

  if (response.data.status !== "Y") {
    throw new Error(
      response.data.message || "Failed to fetch student accounts.",
    );
  }

  return response.data;
}
