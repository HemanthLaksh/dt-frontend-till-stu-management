import type { SelectOption } from "@/components/ui/Select/Select";

export const SUBSCRIBER_REPORT_TYPES = {
  ACTIVE: "A",
  INACTIVE: "IA",
} as const;

export const BUSINESS_TYPE_OPTIONS: SelectOption[] = [
  {
    value: "All",
    label: "All",
  },
  {
    value: "B2C",
    label: "B2C",
  },
  {
    value: "Master",
    label: "Master Class",
  },
  {
    value: "DTLC",
    label: "DTLC",
  },
  {
    value: "Free",
    label: "Sales Partner Free Access",
  },
  {
    value: "B2B",
    label: "B2B",
  },
];

export const SUBSCRIBER_COURSE_OPTIONS: SelectOption[] = [
  {
    value: "1",
    label: "NEET PG",
  },
  {
    value: "2",
    label: "NEET SS",
  },
  {
    value: "3",
    label: "FMGE",
  },
];

export const SUBSCRIBER_REPORT_ENDPOINTS = {
  A: "Plan/getActiveSubscribersWithFtilers",
  IA: "Plan/getInactiveSubscribersWithFtilers",
} as const;