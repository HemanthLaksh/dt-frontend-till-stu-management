export interface ActivitySummaryPeriod {
  dailyTestsCount: number;
  miniTestsCount: number;
  subjectsTestsCount: number;
  grandTestsCount: number;
  questionBankModulesAttempted: number;
}

export interface ActivityStudent {
  studentID: number | string;
  name: string;
  mobileNo: string;
  college: string;
  education: string;
  testID: number | string;
  testName: string;
  testDate: string;
  dateTimeTestTaken: string;
}

export interface ActivitySummaryResponse {
  status: string;

  summarySelectedDate: ActivitySummaryPeriod & {
    dailyTestsStudents?: ActivityStudent[];
    miniTestsStudents?: ActivityStudent[];
    subjectsTestsStudents?: ActivityStudent[];
    grandTestsStudents?: ActivityStudent[];
    questionBankModuleAttemptedStudents?: ActivityStudent[];
  };

  summaryLastOneWeek: ActivitySummaryPeriod & {
    weekDailyTestsStudents?: ActivityStudent[];
    weekMiniTestsStudents?: ActivityStudent[];
    weekSubjectsTestsStudents?: ActivityStudent[];
    weekGrandTestsStudents?: ActivityStudent[];
    weekQuestionBankModuleAttemptedStudents?: ActivityStudent[];
  };

  summaryLastOneMonth: ActivitySummaryPeriod & {
    monthDailyTestsStudents?: ActivityStudent[];
    monthMiniTestsStudents?: ActivityStudent[];
    monthSubjectsTestsStudents?: ActivityStudent[];
    monthGrandTestsStudents?: ActivityStudent[];
    monthQuestionBankModuleAttemptedStudents?: ActivityStudent[];
  };
}

export type ActivityPeriod = "selectedDate" | "lastWeek" | "lastMonth";

export type ActivityCategory =
  | "dailyTests"
  | "miniTests"
  | "subjectsTests"
  | "grandTests"
  | "questionBankModules";

export interface ActivityStudentListRequest {
  date: string;
  period: ActivityPeriod;
  category: ActivityCategory;
}