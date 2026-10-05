export type ActivationMethod =
  | "studentId"
  | "mobile"
  | "email";

export interface ActivateStudentRequest {
  studentID?: number;
  mobile?: string;
  email?: string;
}

export interface ActivateStudentResponse {
  status: "Y" | "N";
  message: string;
}

export interface ActivateStudentForm {
  studentId: string;
  mobile: string;
  email: string;
}