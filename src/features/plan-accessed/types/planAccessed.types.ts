export interface PlanAccessedCourse {
  id: number;
  name: string;
}

export interface PlanAccessedRequest {
  adminId: number;
  courseId: number;
  fromDate: string;
  toDate: string;
}

export interface PlanAccessedResponse {
  status: string;
  reportPath?: string;
  message?: string;
}