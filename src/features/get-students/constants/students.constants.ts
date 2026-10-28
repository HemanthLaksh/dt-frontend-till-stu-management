import { Building2, GraduationCap, List, type LucideIcon } from "lucide-react";
import type { CourseId } from "../types/student.types";

export const COURSE_OPTIONS: Array<{ value: CourseId; label: string }> = [
  { value: "1", label: "NEET PG" },
  { value: "2", label: "NEET SS" },
  { value: "3", label: "FMGE" },
];

export const EMPTY_STATE_OPTION = {
  value: "",
  label: "-- Select State --",
};

export type ShortcutKey = "stateCollege" | "neetSS" | "neetPG";

export interface StudentShortcut {
  key: ShortcutKey;
  label: string;
  icon: LucideIcon;
}

export const SHORTCUTS: StudentShortcut[] = [
  {
    key: "stateCollege",
    label: "Get Students by State and College",
    icon: List,
  },
  {
    key: "neetSS",
    label: "Get Students by NEET SS",
    icon: GraduationCap,
  },
  {
    key: "neetPG",
    label: "Get Students by NEET PG",
    icon: Building2,
  },
];
