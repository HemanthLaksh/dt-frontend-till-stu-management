export const ACTIVITY_SUMMARY_TITLE = "Get Activity Summary";

export const ACTIVITY_SUMMARY_PERIODS = {
  selectedDate: "Summary of Selected Date",
  lastWeek: "Summary of Last One Week",
  lastMonth: "Summary of Last One Month",
} as const;

export const ACTIVITY_SUMMARY_CATEGORIES = {
  dailyTests: "Daily Tests Count",
  miniTests: "Mini Tests Count",
  subjectsTests: "Subjects Tests Count",
  grandTests: "Grand Tests Count",
  questionBankModules: "Question Bank Modules Attempted",
} as const;

export const ACTIVITY_CATEGORY_CODES = {
  dailyTests: "dtc",
  miniTests: "mtc",
  subjectsTests: "stc",
  grandTests: "gtc",
  questionBankModules: "qtc",
} as const;

export const ACTIVITY_PERIOD_CODES = {
  selectedDate: "ssd",
  lastWeek: "slw",
  lastMonth: "slm",
} as const;