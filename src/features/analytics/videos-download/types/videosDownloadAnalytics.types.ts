export interface VideosDownloadAnalyticsRequest {
  studentid: string;
  fdate: string;
  tdate: string;
}

export interface VideoDownloadDetails {
  videoSeqNo: string | number;
  videoSubject: string;
  videoTopic: string;
  videoSubTopic: string;
  videoName: string;
  videoStatus: string;
  videoDownloadedAt: string;
}

export interface VideosDownloadAnalyticsItem {
  studentID: string | number;
  studentName: string;
  isdCode: string;
  mobileNo: string;
  email: string;
  education: string;
  college: string;
  addressState: string;
  subscribedYN: string;
  subsribedToPlan: string;
  subscribedDate: string;
  couponCodeUsed: string;
  subscriptionOrderID: string;
  amount: string | number;

  videoDownload: VideoDownloadDetails;
}

export interface VideosDownloadAnalyticsResponse {
  analytics?: VideosDownloadAnalyticsItem[] | null;
}