export interface BDStatsRequest {
  fromDate: string;
  toDate: string;
  courseId: number | null;
}

export interface BDStatsItem {
  bdName: string;
  bdEmail: string;
  courseName: string;
  totalAccessGiven: number | string;
  totalConverted: number | string;
}

export interface BDStatsResponse {
  bdstats?: BDStatsItem[] | null;
  message?: string;
}
