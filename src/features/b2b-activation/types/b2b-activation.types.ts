export interface SubscriptionOrderOption {
  id: string;
  label: string;
}

export interface PlanSequence {
  seqNo: number;
  totalPrice: number;
  durationInMonths: number;
}

export interface PlanOption {
  id: string;
  name: string;
  sequences: PlanSequence[];
}

export interface CollegeOption {
  id: string;
  name: string;
}

export interface StudentOption {
  id: string;
  name: string;
  mobile: string;
}

export interface SubjectOption {
  id: string;
  name: string;
}

export interface B2BActivationFormData {
  subscriptionOrderId: string;
  planId: string;
  planSeqNo: string;
  startDate: string;
  endDate: string;
  remarks: string;
  selectedCollegeId: string;
  selectedStudentIds: string[];
  selectedSubjectIds: string[];
}

export interface B2BActivationPreview {
  subscriptionOrder: string;
  plan: string;
  planSequence: string;
  startDate: string;
  endDate: string;
  college: string;
  students: StudentOption[];
  subjects: SubjectOption[];
  remarks: string;
}
