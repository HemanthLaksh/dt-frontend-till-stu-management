import type {
  NotesOrderCourse,
  NotesOrderStatus,
} from "../types/notesOrders.types";

export const NOTES_ORDER_COURSES: NotesOrderCourse[] = [
  {
    id: 1,
    name: "NEET PG",
    shortName: "NEET PG",
  },
  {
    id: 2,
    name: "NEET SS",
    shortName: "NEET SS",
  },
  {
    id: 3,
    name: "FMGE",
    shortName: "FMGE",
  },
  {
    id: 4,
    name: "MBBS Curriculum",
    shortName: "MBBS Curriculum",
  },
  {
    id: 5,
    name: "PG Residency",
    shortName: "PG Residency",
  },
];

export const NOTES_ORDER_STATUSES: NotesOrderStatus[] = [
  "New",
  "Couriered",
  "Delivered",
];

export const getCourseName = (courseId: number): string => {
  return (
    NOTES_ORDER_COURSES.find((course) => course.id === courseId)?.name ??
    "Unknown Course"
  );
};