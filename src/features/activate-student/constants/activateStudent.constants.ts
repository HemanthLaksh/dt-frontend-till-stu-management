export const ACTIVATE_STUDENT_TITLE = "Activate Student";

export const ACTIVATE_STUDENT_DESCRIPTION =
  "Activate a student account using Student ID, Mobile Number, or Email ID.";

export const ACTIVATION_METHODS = [
  {
    value: "studentId",
    label: "Student ID",
  },
  {
    value: "mobile",
    label: "Mobile Number",
  },
  {
    value: "email",
    label: "Email ID",
  },
] as const;