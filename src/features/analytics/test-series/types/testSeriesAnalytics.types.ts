export interface TestSeriesAnalyticsRequest {
  studentid: string;
  fdate: string;
  tdate: string;
}

export interface TestSeriesAnalyticsTest {
  testPaperID: string | number;
  testPaperName: string;
  testPaperType: string;
  finished: string;
  testTakenAt: string;
  testDuration: string;
  maxMarks: string | number;
  scoredMarks: string | number;
  correctAnswers: string | number;
  incorrectAnswers: string | number;
  guessedScore: string | number;
  guessedCorrect: string | number;
  guessedIncorrect: string | number;
  testStatus: string;
}

export interface TestSeriesAnalyticsItem {
  studentID: number | string;
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
  amount: number | string;
  videoDownload: string;
  videosView: string;
  couponReport: string;
  test: TestSeriesAnalyticsTest;
}

export interface TestSeriesAnalyticsResponse {
  analytics?: TestSeriesAnalyticsItem[] | null;
}