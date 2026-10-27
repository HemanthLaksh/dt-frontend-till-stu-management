import type {
  CollegeOption,
  PlanOption,
  StudentOption,
  SubjectOption,
  SubscriptionOrderOption,
} from "../types/b2b-activation.types";

export const MOCK_SUBSCRIPTION_ORDERS: SubscriptionOrderOption[] = [
  { id: "1", label: "NEET PG — B2B Subscription" },
  { id: "2", label: "NEET SS — B2B Subscription" },
  { id: "3", label: "FMGE — B2B Subscription" },
  { id: "4", label: "MBBS Curriculum — B2B Subscription" },
  { id: "5", label: "PG Residency — B2B Subscription" },
  { id: "6", label: "Custom B2B Subscription" },
];

export const MOCK_PLANS: PlanOption[] = [
  {
    id: "101",
    name: "Standard Access",
    sequences: [
      { seqNo: 1, totalPrice: 4999, durationInMonths: 3 },
      { seqNo: 2, totalPrice: 8999, durationInMonths: 6 },
    ],
  },
  {
    id: "102",
    name: "Premium Access",
    sequences: [
      { seqNo: 1, totalPrice: 7999, durationInMonths: 3 },
      { seqNo: 2, totalPrice: 13999, durationInMonths: 12 },
    ],
  },
  {
    id: "103",
    name: "Complete Access",
    sequences: [{ seqNo: 1, totalPrice: 15999, durationInMonths: 12 }],
  },
];

export const MOCK_COLLEGES_BY_ORDER: Record<string, CollegeOption[]> = {
  "1": [
    { id: "COL-101", name: "Demo Medical College — Hyderabad" },
    { id: "COL-102", name: "Demo Medical College — Bengaluru" },
  ],
  "2": [{ id: "COL-201", name: "Demo Super Speciality College" }],
  "3": [{ id: "COL-301", name: "Demo FMGE Training Institute" }],
  "4": [{ id: "COL-401", name: "Demo MBBS College" }],
  "5": [{ id: "COL-501", name: "Demo Residency Institute" }],
  "6": [{ id: "COL-601", name: "Demo Partner Institution" }],
};

export const MOCK_STUDENTS_BY_COLLEGE: Record<string, StudentOption[]> = {
  "COL-101": [
    { id: "STU-1001", name: "Demo Student One", mobile: "9000000001" },
    { id: "STU-1002", name: "Demo Student Two", mobile: "9000000002" },
    { id: "STU-1003", name: "Demo Student Three", mobile: "9000000003" },
  ],
  "COL-102": [
    { id: "STU-2001", name: "Demo Student Four", mobile: "9000000004" },
    { id: "STU-2002", name: "Demo Student Five", mobile: "9000000005" },
  ],
  "COL-201": [
    { id: "STU-3001", name: "Demo Student Six", mobile: "9000000006" },
    { id: "STU-3002", name: "Demo Student Seven", mobile: "9000000007" },
  ],
  "COL-301": [
    { id: "STU-4001", name: "Demo Student Eight", mobile: "9000000008" },
  ],
  "COL-401": [
    { id: "STU-5001", name: "Demo Student Nine", mobile: "9000000009" },
  ],
  "COL-501": [
    { id: "STU-6001", name: "Demo Student Ten", mobile: "9000000010" },
  ],
  "COL-601": [
    { id: "STU-7001", name: "Demo Student Eleven", mobile: "9000000011" },
  ],
};

export const MOCK_SUBJECTS: SubjectOption[] = [
  { id: "1", name: "Anatomy" },
  { id: "2", name: "Physiology" },
  { id: "3", name: "Biochemistry" },
  { id: "4", name: "Pathology" },
  { id: "5", name: "Pharmacology" },
  { id: "6", name: "Microbiology" },
  { id: "7", name: "Medicine" },
  { id: "8", name: "Surgery" },
];
