export interface VideosViewAnalyticsRequest {
  studentid: string;
  fdate: string;
  tdate: string;
}

export interface VideoViewDetails {
  videoSeqNo: string | number;
  videoSubject: string;
  videoTopic: string;
  videoSubTopic: string;
  videoName: string;
  videoStatus: string;
  videoViewedAt: string;
  completed: string;
  paused: string;
  videoPlayTime: string;
}

export interface VideosViewAnalyticsItem {
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

  videosView: VideoViewDetails;
}

export interface VideosViewAnalyticsResponse {
  analytics?: VideosViewAnalyticsItem[] | null;
}