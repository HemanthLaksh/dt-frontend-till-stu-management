import type { CourseName } from "@/constants/courseOptions";

export type StudentReportCourse = CourseName;

export type StudentReportType = "students" | "state-wise" | "country-wise";

export interface StudentReportOption {
  id: StudentReportType;
  title: string;
  description: string;
}

export interface StudentReportRequest {
  courseId: number;
  courseName: StudentReportCourse;
  reportType: StudentReportType;
  fromDate: string;
  toDate: string;
  stateName?: string;
  countryCode?: string;
}

export interface StudentReportResponse {
  status: "Y" | "N";
  message: string;
  reportPath?: string;
}

export interface ReportLocationOption {
  label: string;
  value: string;
}

// Real API response types for Student  Report

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

export interface StudentAnalysisReportResponse {
  success: boolean;
  message: string;
  data: {
    count: number;
    start_date: string;
    end_date: string;
    results: StudentReportRecord[];
  };
}

export interface StudentAnalysisReportRequest {
  academic_year: string;
  start_date: string;
  end_date: string;
  course_id: number;
  send_mail: "Y" | "N";
}
