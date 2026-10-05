export type CourseId = "1" | "2" | "3";

export interface Student {
  studentID: number | string;
  name: string;
  email: string;
  education: string;
  profileStatus: string;
}

export interface StateCollegeStudent {
  studentID: number | string;
  name: string;
  mobileNo: string;
  email: string;
  college: string;
  education: string;
  countryCode: string;
  profileStatus: string;
  createdAt: string;
}

export interface NeetSSStudent {
  name: string;
  email: string;
  mobile: string;
  code: string;
  speciality1: string;
  speciality2: string;
  designation: string;
  subscriptionInterested: string;
  platform: string;
  state: string;
  city: string;
  college: string;
  createdAt: string;
}

export interface NeetPGStudent {
  name: string;
  email: string;
  mobile: string;
  education: string;
  state: string;
  college: string;
  createdAt: string;
}

export type StudentView =
  | "shortcuts"
  | "stateCollege"
  | "stateCollegeResults"
  | "neetSS"
  | "neetPG";

export interface StateCollegeRequest {
  state: string;
  college: string;
  courseId: CourseId;
}
