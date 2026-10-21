import authClient from "@/services/api/authClient";

export interface StudentReportRecord {
  student_id: number;
  name: string;
  country_code: number;
  mobile_no: string;
  student_email_id: string;
  education: string;
  course: string;
  specialization_subject: string;
  college: string;
  address: string;
  profile_status: string;
  created_at: string;
  updated_at: string;
}

/* Request types */

export interface StudentAnalysisReportRequest {
  academic_year: string;
  start_date: string;
  end_date: string;
  course_id: number;
  send_mail: "Y";
}

export interface StateWiseStudentReportRequest {
  course_id: number;
  start_date: string;
  end_date: string;
  state_name: string;
  send_mail: "Y";
}

export interface CountryWiseStudentReportRequest {
  course_id: number;
  start_date: string;
  end_date: string;
  country_code: string;
  send_mail: "Y";
}

/* Response types */

export interface StudentReportResponseData {
  count?: number;
  start_date?: string;
  end_date?: string;
  results?: StudentReportRecord[];

  recipient_email?: string;
  file_name?: string;
  row_count?: number;
}

export interface StudentAnalysisReportResponse {
  success: boolean;
  message: string;
  data?: StudentReportResponseData;
}

/* Student analysis report */

export async function fetchStudentAnalysisReport(
  payload: StudentAnalysisReportRequest,
): Promise<StudentAnalysisReportResponse> {
  const response = await authClient.post<StudentAnalysisReportResponse>(
    "/adminrevamp/reportsstudentanalysis/",
    payload,
  );

  return response.data;
}

/* State-wise student report */

export async function fetchStateWiseStudentReport(
  payload: StateWiseStudentReportRequest,
): Promise<StudentAnalysisReportResponse> {
  const response = await authClient.post<StudentAnalysisReportResponse>(
    "/adminrevamp/reportsstudentanalysis/",
    payload,
  );

  return response.data;
}

/* Country-wise student report */

export async function fetchCountryWiseStudentReport(
  payload: CountryWiseStudentReportRequest,
): Promise<StudentAnalysisReportResponse> {
  const response = await authClient.post<StudentAnalysisReportResponse>(
    "/adminrevamp/reportsstudentanalysis/",
    payload,
  );

  return response.data;
}
