export const COURSE_OPTIONS = [
  { id: 1, label: "NEET PG", value: "1" },
  { id: 2, label: "NEET SS", value: "2" },
  { id: 3, label: "FMGE", value: "3" },
  { id: 4, label: "MBBS Curriculum", value: "4" },
  { id: 5, label: "PG Residency", value: "5" },
] as const;

export type CourseId = (typeof COURSE_OPTIONS)[number]["id"];

export type CourseName = (typeof COURSE_OPTIONS)[number]["label"];

export const DEFAULT_STUDENT_COURSE = "NEET PG";
