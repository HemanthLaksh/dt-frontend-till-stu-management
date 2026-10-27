import type {
  ReportLocationOption,
  StudentReportOption,
} from "../types/student-report.types";

import { COURSE_OPTIONS } from "@/constants/courseOptions";

/**
 * Courses available in the legacy Student Reports module.
 * Course IDs match the existing PHP implementation.
 */
export const STUDENT_REPORT_COURSES = COURSE_OPTIONS.map(({ id, label }) => ({
  id,
  label,
}));

/**
 * Report options displayed for each course.
 */
export const STUDENT_REPORT_OPTIONS: StudentReportOption[] = [
  {
    id: "students",
    title: "Students",
    description: "Generate a student account report for the selected dates.",
  },
  {
    id: "state-wise",
    title: "State Wise Students",
    description:
      "Generate a student account report for a selected state and date range.",
  },
  {
    id: "country-wise",
    title: "Country Wise Students",
    description:
      "Generate a student account report for a selected country and date range.",
  },
];

/**
 * State options available in the legacy PHP page.
 */
export const STUDENT_REPORT_STATES: ReportLocationOption[] = [
  {
    label: "Andaman and Nicobar Islands",
    value: "Andaman and Nicobar Islands",
  },
  { label: "Andaman Nicobar Islands", value: "Andaman Nicobar Islands" },
  { label: "Andhra Pradesh", value: "Andhra Pradesh" },
  { label: "Arunachal Pradesh", value: "Arunachal Pradesh" },
  { label: "Assam", value: "Assam" },
  { label: "Bihar", value: "Bihar" },
  { label: "Chandigarh", value: "Chandigarh" },
  { label: "Chhattisgarh", value: "Chhattisgarh" },
  { label: "Delhi", value: "Delhi" },
  { label: "Goa", value: "Goa" },
  { label: "Gujarat", value: "Gujarat" },
  { label: "Haryana", value: "Haryana" },
  { label: "Himachal Pradesh", value: "Himachal Pradesh" },
  { label: "Jammu & Kashmir", value: "Jammu & Kashmir" },
  { label: "Jharkhand", value: "Jharkhand" },
  { label: "Karnataka", value: "Karnataka" },
  { label: "Kerala", value: "Kerala" },
  { label: "Madhya Pradesh", value: "Madhya Pradesh" },
  { label: "Maharashtra", value: "Maharashtra" },
  { label: "Manipur", value: "Manipur" },
  { label: "Meghalaya", value: "Meghalaya" },
  { label: "Mizoram", value: "Mizoram" },
  { label: "Orissa", value: "Orissa" },
  { label: "Pondicherry", value: "Pondicherry" },
  { label: "Punjab", value: "Punjab" },
  { label: "Rajasthan", value: "Rajasthan" },
  { label: "Sikkim", value: "Sikkim" },
  { label: "Tamil Nadu", value: "Tamil Nadu" },
  { label: "Telangana", value: "Telangana" },
  { label: "Tripura", value: "Tripura" },
  { label: "Uttar Pradesh", value: "Uttar Pradesh" },
  { label: "Uttarakhand", value: "Uttarakhand" },
  { label: "West Bengal", value: "West Bengal" },
];

/**
 * Country options available in the legacy PHP page.
 * Values represent country dialing codes used by that page.
 */
export const STUDENT_REPORT_COUNTRIES: ReportLocationOption[] = [
  { label: "Philippines", value: "63" },
  { label: "Singapore", value: "65" },
  { label: "China", value: "86" },
  { label: "Turkey", value: "90" },
  { label: "India", value: "91" },
  { label: "Pakistan", value: "92" },
  { label: "Afghanistan", value: "93" },
  { label: "Sri Lanka", value: "94" },
  { label: "Iran", value: "98" },
  { label: "Mauritius", value: "230" },
  { label: "Ghana", value: "233" },
  { label: "Nigeria", value: "234" },
  { label: "Ethiopia", value: "251" },
  { label: "Kenya", value: "254" },
  { label: "Uganda", value: "256" },
  { label: "Albania", value: "355" },
  { label: "Bulgaria", value: "359" },
  { label: "Malaysia", value: "60" },
  { label: "Armenia", value: "374" },
  { label: "Ukraine", value: "380" },
  { label: "Belize", value: "501" },
  { label: "Russia", value: "790" },
  { label: "Cambodia", value: "855" },
  { label: "Bangladesh", value: "880" },
  { label: "Taiwan", value: "886" },
  { label: "Maldives Republic", value: "960" },
  { label: "Jordan", value: "962" },
  { label: "Iraq", value: "964" },
  { label: "Oman", value: "968" },
  { label: "United Arab Emirates", value: "971" },
  { label: "Qatar", value: "974" },
  { label: "Nepal", value: "977" },
  { label: "Tajikistan", value: "992" },
  { label: "Georgia", value: "995" },
  { label: "Kyrgyzstan", value: "996" },
];
