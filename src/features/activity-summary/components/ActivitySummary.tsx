"use client";

import { useMemo, useState } from "react";
import { AlertCircle, ArrowLeft, Search, X } from "lucide-react";

import DatePicker from "@/components/ui/DatePicker/DatePicker";

import { useActivitySummary } from "../hooks/useActivitySummary";

import type {
  ActivityCategory,
  ActivityPeriod,
  ActivityStudent,
} from "../types/activitySummary.types";

interface StudentListModalProps {
  open: boolean;
  title: string;
  students: ActivityStudent[];
  loading: boolean;
  onClose: () => void;
}

function StudentListModal({
  open,
  title,
  students,
  loading,
  onClose,
}: StudentListModalProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) {
      return students;
    }

    return students.filter((student) =>
      [
        student.studentID,
        student.name,
        student.mobileNo,
        student.college,
        student.education,
        student.testID,
        student.testName,
        student.testDate,
        student.dateTimeTestTaken,
      ].some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(search),
      ),
    );
  }, [students, searchTerm]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-7xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {title}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {students.length} student
              {students.length === 1 ? "" : "s"} found
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search */}
        <div className="border-b border-slate-200 px-6 py-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search students..."
              className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Modal Content */}
        <div className="min-h-0 flex-1 overflow-auto">
          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

                <p className="text-sm text-slate-500">
                  Loading student details...
                </p>
              </div>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
              <div className="mb-3 rounded-full bg-slate-100 p-3">
                <Search className="h-5 w-5 text-slate-400" />
              </div>

              <p className="font-medium text-slate-700">
                No students found
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search.
              </p>
            </div>
          ) : (
            <div className="min-w-[1100px]">
              <table className="w-full border-collapse">
                <thead className="sticky top-0 z-10 bg-slate-100">
                  <tr className="border-b border-slate-200">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Sl No.
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Student ID
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Name
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Mobile No.
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                      College
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Education
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Test Paper ID
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Test Paper Name
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Test Date-Time
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Date Time Test Taken
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredStudents.map((student, index) => (
                    <tr
                      key={`${student.studentID}-${student.testID}-${index}`}
                      className="border-b border-slate-100 transition hover:bg-slate-50"
                    >
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {index + 1}
                      </td>

                      <td className="px-4 py-3 text-sm font-medium text-slate-800">
                        {student.studentID}
                      </td>

                      <td className="px-4 py-3 text-sm text-slate-700">
                        {student.name}
                      </td>

                      <td className="px-4 py-3 text-sm text-slate-600">
                        {student.mobileNo}
                      </td>

                      <td className="px-4 py-3 text-sm text-slate-600">
                        {student.college}
                      </td>

                      <td className="px-4 py-3 text-sm text-slate-600">
                        {student.education}
                      </td>

                      <td className="px-4 py-3 text-sm text-slate-600">
                        {student.testID}
                      </td>

                      <td className="max-w-[240px] px-4 py-3 text-sm text-slate-600">
                        <span title={student.testName}>
                          {student.testName}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-sm text-slate-600">
                        {student.testDate}
                      </td>

                      <td className="px-4 py-3 text-sm text-slate-600">
                        {student.dateTimeTestTaken}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end border-t border-slate-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

interface ActivityCountCardProps {
  label: string;
  count: number;
  onClick: () => void;
}

function ActivityCountCard({
  label,
  count,
  onClick,
}: ActivityCountCardProps) {
  const clickable = count > 0;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm">
      <p className="text-sm font-medium text-slate-600">{label}</p>

      <div className="mt-3">
        {clickable ? (
          <button
            type="button"
            onClick={onClick}
            className="text-3xl font-semibold text-blue-600 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-800 hover:decoration-blue-500"
          >
            {count}
          </button>
        ) : (
          <span className="text-3xl font-semibold text-slate-400">
            {count}
          </span>
        )}
      </div>

      {clickable && (
        <p className="mt-2 text-xs text-slate-400">
          Click to view students
        </p>
      )}
    </div>
  );
}

interface ActivitySectionProps {
  title: string;
  period: ActivityPeriod;
  summary: {
    dailyTestsCount: number;
    miniTestsCount: number;
    subjectsTestsCount: number;
    grandTestsCount: number;
    questionBankModulesAttempted: number;
  };
  onCountClick: (
    period: ActivityPeriod,
    category: ActivityCategory,
  ) => void;
}

function ActivitySection({
  title,
  period,
  summary,
  onCountClick,
}: ActivitySectionProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
        <h2 className="text-base font-semibold text-slate-900">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 xl:grid-cols-5">
        <ActivityCountCard
          label="Daily Tests Count"
          count={summary.dailyTestsCount}
          onClick={() => onCountClick(period, "dailyTests")}
        />

        <ActivityCountCard
          label="Mini Tests Count"
          count={summary.miniTestsCount}
          onClick={() => onCountClick(period, "miniTests")}
        />

        <ActivityCountCard
          label="Subjects Tests Count"
          count={summary.subjectsTestsCount}
          onClick={() => onCountClick(period, "subjectsTests")}
        />

        <ActivityCountCard
          label="Grand Tests Count"
          count={summary.grandTestsCount}
          onClick={() => onCountClick(period, "grandTests")}
        />

        <ActivityCountCard
          label="Question Bank Modules Attempted"
          count={summary.questionBankModulesAttempted}
          onClick={() => onCountClick(period, "questionBankModules")}
        />
      </div>
    </section>
  );
}

export default function ActivitySummary() {
  const [selectedDate, setSelectedDate] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [validationError, setValidationError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalStudents, setModalStudents] = useState<ActivityStudent[]>([]);
  const [modalLoading, setModalLoading] = useState(false);

  const {
    data,
    loading,
    error,
    fetchActivitySummary,
    clearActivitySummary,
  } = useActivitySummary();

  const handleSubmit = async () => {
    if (!selectedDate) {
      setValidationError("Please select a date.");
      return;
    }

    setValidationError("");
    setShowResults(true);

    await fetchActivitySummary(selectedDate);
  };

  const handleBack = () => {
    setShowResults(false);
    setSelectedDate("");
    setValidationError("");
    clearActivitySummary();
  };

  const getStudentList = (
    period: ActivityPeriod,
    category: ActivityCategory,
  ): ActivityStudent[] => {
    if (!data) {
      return [];
    }

    if (period === "selectedDate") {
      switch (category) {
        case "dailyTests":
          return data.summarySelectedDate?.dailyTestsStudents ?? [];

        case "miniTests":
          return data.summarySelectedDate?.miniTestsStudents ?? [];

        case "subjectsTests":
          return data.summarySelectedDate?.subjectsTestsStudents ?? [];

        case "grandTests":
          return data.summarySelectedDate?.grandTestsStudents ?? [];

        case "questionBankModules":
          return (
            data.summarySelectedDate
              ?.questionBankModuleAttemptedStudents ?? []
          );
      }
    }

    if (period === "lastWeek") {
      switch (category) {
        case "dailyTests":
          return data.summaryLastOneWeek?.weekDailyTestsStudents ?? [];

        case "miniTests":
          return data.summaryLastOneWeek?.weekMiniTestsStudents ?? [];

        case "subjectsTests":
          return data.summaryLastOneWeek?.weekSubjectsTestsStudents ?? [];

        case "grandTests":
          return data.summaryLastOneWeek?.weekGrandTestsStudents ?? [];

        case "questionBankModules":
          return (
            data.summaryLastOneWeek
              ?.weekQuestionBankModuleAttemptedStudents ?? []
          );
      }
    }

    switch (category) {
      case "dailyTests":
        return data.summaryLastOneMonth?.monthDailyTestsStudents ?? [];

      case "miniTests":
        return data.summaryLastOneMonth?.monthMiniTestsStudents ?? [];

      case "subjectsTests":
        return data.summaryLastOneMonth?.monthSubjectsTestsStudents ?? [];

      case "grandTests":
        return data.summaryLastOneMonth?.monthGrandTestsStudents ?? [];

      case "questionBankModules":
        return (
          data.summaryLastOneMonth
            ?.monthQuestionBankModuleAttemptedStudents ?? []
        );
    }
  };

  const getPeriodTitle = (period: ActivityPeriod): string => {
    if (period === "selectedDate") {
      return `Summary of Daily Activity for ${selectedDate}`;
    }

    if (period === "lastWeek") {
      return "Last Week Summary";
    }

    return "Last Month Summary";
  };

  const getCategoryTitle = (category: ActivityCategory): string => {
    switch (category) {
      case "dailyTests":
        return "Daily Tests Students";

      case "miniTests":
        return "Mini Tests Students";

      case "subjectsTests":
        return "Subject Tests Students";

      case "grandTests":
        return "Grand Tests Students";

      case "questionBankModules":
        return "Question Bank Module Attempted Students";
    }
  };

  const handleCountClick = (
    period: ActivityPeriod,
    category: ActivityCategory,
  ) => {
    const students = getStudentList(period, category);

    setModalTitle(`${getPeriodTitle(period)} - ${getCategoryTitle(category)}`);
    setModalStudents(students);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalTitle("");
    setModalStudents([]);
    setModalLoading(false);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Activity Summary
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View student activity statistics for a selected date.
          </p>
        </div>

        {/* Filter Card */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-slate-900">
              Get Activity Summary
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Select a date to view activity across tests and question bank
              modules.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="w-full sm:max-w-xs">
              <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={(value) => {
                  setSelectedDate(value);
                  setValidationError("");
                }}
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="h-10 rounded-lg bg-blue-600 px-6 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>

          {validationError && (
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}
        </section>

        {/* Results */}
        {showResults && (
          <section className="space-y-5">
            {/* Results Header */}
            <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Activity Summary
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Selected Date:{" "}
                  <span className="font-medium text-slate-700">
                    {selectedDate}
                  </span>
                </p>
              </div>

              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            </div>

            {/* Loading */}
            {loading && (
              <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

                  <p className="text-sm text-slate-500">
                    Loading activity summary...
                  </p>
                </div>
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

                  <div>
                    <h3 className="font-medium text-red-800">
                      Unable to load Activity Summary
                    </h3>

                    <p className="mt-1 text-sm text-red-700">
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Empty */}
            {!loading && !error && !data && (
              <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
                <p className="font-medium text-slate-700">
                  No activity summary available.
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Try selecting another date.
                </p>
              </div>
            )}

            {/* Data */}
            {!loading && !error && data && (
              <div className="space-y-5">
                <ActivitySection
                  title={`Summary of Selected Date - ${selectedDate}`}
                  period="selectedDate"
                  summary={data.summarySelectedDate}
                  onCountClick={handleCountClick}
                />

                <ActivitySection
                  title="Summary of Last One Week"
                  period="lastWeek"
                  summary={data.summaryLastOneWeek}
                  onCountClick={handleCountClick}
                />

                <ActivitySection
                  title="Summary of Last One Month"
                  period="lastMonth"
                  summary={data.summaryLastOneMonth}
                  onCountClick={handleCountClick}
                />
              </div>
            )}
          </section>
        )}
      </div>

      {/* Student List Modal */}
      <StudentListModal
        open={modalOpen}
        title={modalTitle}
        students={modalStudents}
        loading={modalLoading}
        onClose={handleCloseModal}
      />
    </>
  );
}