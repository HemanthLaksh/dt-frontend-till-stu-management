"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";

import Card from "@/components/ui/Card/Card";
import DatePicker from "@/components/ui/DatePicker/DatePicker";
import Button from "@/components/ui/Button/Button";
import Select from "@/components/ui/Select/Select";
import {
  COURSE_OPTIONS,
  DEFAULT_STUDENT_COURSE,
} from "@/constants/courseOptions";

import {
  fetchFastApiStudentAccounts,
  type FastApiStudent,
  type FastApiStudentAccountsResponse,
} from "../services/dashboardFastApiService";

const VISIBLE_COURSES = COURSE_OPTIONS.map(({ id, label }) => ({
  id,
  name: label,
}));

const PAGE_SIZE = 10;

function formatNumber(value: string | number | undefined): string {
  if (value === undefined || value === null || value === "") {
    return "—";
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed.toLocaleString("en-IN") : "—";
}

function getTodayDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function StudentDetailsSection() {
  const [selectedCourse, setSelectedCourse] = useState(DEFAULT_STUDENT_COURSE);
  const [studentFromDate, setStudentFromDate] = useState("");
  const [studentToDate, setStudentToDate] = useState("");
  const [studentResponse, setStudentResponse] =
    useState<FastApiStudentAccountsResponse | null>(null);
  const [studentLoading, setStudentLoading] = useState(false);
  const [studentError, setStudentError] = useState<string | null>(null);
  const [studentPage, setStudentPage] = useState(1);

  async function handleGetStudentDetails(page = 1) {
    if (!studentFromDate || !studentToDate) {
      setStudentError("Please select both dates.");
      setStudentResponse(null);
      return;
    }

    if (studentFromDate > studentToDate) {
      setStudentError("From Date cannot be later than To Date.");
      setStudentResponse(null);
      return;
    }

    const course = VISIBLE_COURSES.find((item) => item.name === selectedCourse);

    if (!course) {
      setStudentError("Please select a valid course.");
      return;
    }

    try {
      setStudentLoading(true);
      setStudentError(null);

      const response = await fetchFastApiStudentAccounts({
        startDate: studentFromDate,
        endDate: studentToDate,
        courseId: course.id,
        page,
        pageSize: PAGE_SIZE,
      });

      setStudentResponse(response);
      setStudentPage(response.page);
    } catch (err: unknown) {
      setStudentError(
        err instanceof Error ? err.message : "Failed to fetch student details.",
      );
      setStudentResponse(null);
    } finally {
      setStudentLoading(false);
    }
  }

  function handleClearStudentDetails() {
    setSelectedCourse(DEFAULT_STUDENT_COURSE);
    setStudentFromDate("");
    setStudentToDate("");
    setStudentResponse(null);
    setStudentError(null);
    setStudentPage(1);
  }

  return (
    <Card
      title="Student Details"
      description="View student accounts created within a selected date range."
    >
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Select
            label="Course"
            value={selectedCourse}
            options={VISIBLE_COURSES.map((course) => ({
              label: course.name,
              value: course.name,
            }))}
            onChange={(value) => {
              setSelectedCourse(value);
              setStudentResponse(null);
              setStudentError(null);
              setStudentPage(1);
            }}
          />

          <div className="flex items-end gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <Users size={20} />
            </div>
            <div>
              <p className="text-xs font-medium text-blue-600">
                Selected Course
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {selectedCourse}
              </p>
            </div>
          </div>

          <DatePicker
            label="From Date"
            value={studentFromDate}
            maxDate={getTodayDate()}
            onChange={(value) => {
              setStudentFromDate(value);
              if (!value || (studentToDate && value > studentToDate)) {
                setStudentToDate("");
              }
              setStudentError(null);
              setStudentResponse(null);
            }}
          />

          <DatePicker
            label="To Date"
            value={studentToDate}
            minDate={studentFromDate || undefined}
            maxDate={getTodayDate()}
            disabled={!studentFromDate}
            onChange={(value) => {
              setStudentToDate(value);
              setStudentResponse(null);
              setStudentError(null);
            }}
          />
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Select a course and date range to fetch student records.
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              disabled={studentLoading}
              onClick={handleClearStudentDetails}
            >
              Clear
            </Button>

            <Button
              type="button"
              className="w-full sm:w-auto"
              disabled={studentLoading}
              onClick={() => void handleGetStudentDetails(1)}
            >
              <Users size={16} className="mr-2" />
              {studentLoading ? "Loading..." : "Get Student Details"}
            </Button>
          </div>
        </div>

        {studentError && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {studentError}
          </div>
        )}

        {studentResponse && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Student Accounts
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {selectedCourse} · {studentFromDate} to {studentToDate}
                </p>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-blue-700">
                  {formatNumber(studentResponse.total)}
                </p>
                <p className="text-xs text-slate-500">Total students</p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    {[
                      "Student ID",
                      "Name",
                      "Mobile",
                      "Email",
                      "Education",
                      "College",
                      "Status",
                      "Created At",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 bg-white">
                  {studentResponse.student.map((student: FastApiStudent) => (
                    <tr
                      key={student.studentID}
                      className="transition-colors hover:bg-blue-50/50"
                    >
                      <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-700">
                        {student.studentID}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                        {student.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                        {student.mobileNo}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {student.email}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                        {student.education}
                      </td>
                      <td className="min-w-48 px-4 py-3 text-slate-600">
                        {student.college}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            student.profileStatus === "ACTIVE"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {student.profileStatus}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                        {student.createdAt}
                      </td>
                    </tr>
                  ))}

                  {studentResponse.student.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-4 py-8 text-center text-slate-500"
                      >
                        No students found for the selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Page {studentResponse.page} of {studentResponse.totalPages}
                {" · "}
                {formatNumber(studentResponse.total)} students
              </p>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={studentLoading || studentPage <= 1}
                  onClick={() => void handleGetStudentDetails(studentPage - 1)}
                >
                  <ChevronLeft size={16} className="mr-1" />
                  Previous
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  disabled={
                    studentLoading || studentPage >= studentResponse.totalPages
                  }
                  onClick={() => void handleGetStudentDetails(studentPage + 1)}
                >
                  Next
                  <ChevronRight size={16} className="ml-1" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
