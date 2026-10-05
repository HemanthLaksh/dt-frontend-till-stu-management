"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, BookOpen, Loader2, Search, Users } from "lucide-react";

import Select from "@/components/ui/Select/Select";
import type {
  CourseId,
  NeetPGStudent,
  NeetSSStudent,
  StateCollegeStudent,
} from "../types/student.types";
import {
  COURSE_OPTIONS,
  SHORTCUTS,
} from "../constants/students.constants";
import { useStudents } from "../hooks/useStudents";
import type { StudentView } from "../types/student.types";

const MOCK_MODE = process.env.NEXT_PUBLIC_GET_STUDENTS_MOCK === "true";

function uniqueStates(mapping: Array<{ state: string; college: string }>) {
  return Array.from(new Set(mapping.map((item) => item.state))).map((state) => ({
    value: state,
    label: state,
  }));
}

function getColleges(
  mapping: Array<{ state: string; college: string }>,
  state: string,
) {
  return mapping
    .filter((item) => item.state === state)
    .map((item) => ({ value: item.college, label: item.college }));
}

function LoadingTable({ columns }: { columns: number }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-slate-50">
            {Array.from({ length: columns }).map((_, index) => (
              <th key={index} className="border border-slate-200 px-4 py-3">
                <div className="h-4 animate-pulse rounded bg-slate-200" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, row) => (
            <tr key={row}>
              {Array.from({ length: columns }).map((__, column) => (
                <td key={column} className="border border-slate-200 px-4 py-4">
                  <div className="h-4 animate-pulse rounded bg-slate-100" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EmptyTable({ columns, message = "No student records found." }: { columns: number; message?: string }) {
  return (
    <div className="border border-slate-200 bg-white px-6 py-14 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
        <Users className="h-6 w-6 text-slate-400" />
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-700">{message}</p>
      <p className="mt-1 text-sm text-slate-400">The old portal returned no records for this selection.</p>
      <div className="hidden">{columns}</div>
    </div>
  );
}

function StateCollegeTable({ students }: { students: StateCollegeStudent[] }) {
  const columns = [
    "Slno",
    "ID",
    "Name",
    "Mobile",
    "Email",
    "College",
    "Education",
    "Country Code",
    "Profile Status",
    "Created At",
  ];

  return (
    <div className="overflow-x-auto rounded-b-xl">
      <table className="min-w-[1200px] w-full border-collapse text-sm">
        <thead>
          <tr className="bg-slate-50">
            {columns.map((column) => (
              <th key={column} className="whitespace-nowrap border border-slate-200 px-4 py-3 text-left font-semibold text-slate-700">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={`${student.studentID}-${index}`} className="hover:bg-slate-50">
              <td className="border border-slate-200 px-4 py-3">{index + 1}</td>
              <td className="border border-slate-200 px-4 py-3">{student.studentID}</td>
              <td className="border border-slate-200 px-4 py-3 font-medium text-slate-800">{student.name || "—"}</td>
              <td className="border border-slate-200 px-4 py-3">{student.mobileNo || "—"}</td>
              <td className="border border-slate-200 px-4 py-3">{student.email || "—"}</td>
              <td className="border border-slate-200 px-4 py-3">{student.college || "—"}</td>
              <td className="border border-slate-200 px-4 py-3">{student.education || "—"}</td>
              <td className="border border-slate-200 px-4 py-3">{student.countryCode || "—"}</td>
              <td className="border border-slate-200 px-4 py-3">{student.profileStatus || "—"}</td>
              <td className="border border-slate-200 px-4 py-3">{student.createdAt || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NeetSSTable({ students }: { students: NeetSSStudent[] }) {
  const columns = [
    "Slno", "Name", "Email", "Mobile", "Code", "Speciality 1",
    "Speciality 2", "Designation", "Subscription Interested", "Platform",
    "State", "City", "College", "Created At",
  ];

  return (
    <div className="overflow-x-auto rounded-b-xl">
      <table className="min-w-[1700px] w-full border-collapse text-sm">
        <thead>
          <tr className="bg-slate-50">
            {columns.map((column) => (
              <th key={column} className="whitespace-nowrap border border-slate-200 px-4 py-3 text-left font-semibold text-slate-700">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={`${student.email}-${index}`} className="hover:bg-slate-50">
              <td className="border border-slate-200 px-4 py-3">{index + 1}</td>
              <td className="border border-slate-200 px-4 py-3 font-medium">{student.name || "—"}</td>
              <td className="border border-slate-200 px-4 py-3">{student.email || "—"}</td>
              <td className="border border-slate-200 px-4 py-3">{student.mobile || "—"}</td>
              <td className="border border-slate-200 px-4 py-3">{student.code || "—"}</td>
              <td className="border border-slate-200 px-4 py-3">{student.speciality1 || "—"}</td>
              <td className="border border-slate-200 px-4 py-3">{student.speciality2 || "—"}</td>
              <td className="border border-slate-200 px-4 py-3">{student.designation || "—"}</td>
              <td className="border border-slate-200 px-4 py-3">{student.subscriptionInterested || "—"}</td>
              <td className="border border-slate-200 px-4 py-3">{student.platform || "—"}</td>
              <td className="border border-slate-200 px-4 py-3">{student.state || "—"}</td>
              <td className="border border-slate-200 px-4 py-3">{student.city || "—"}</td>
              <td className="border border-slate-200 px-4 py-3">{student.college || "—"}</td>
              <td className="border border-slate-200 px-4 py-3">{student.createdAt || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NeetPGTable({ students }: { students: NeetPGStudent[] }) {
  const columns = ["Slno", "Name", "Email", "Mobile", "Education", "State", "College", "Created At"];

  return (
    <div className="overflow-x-auto rounded-b-xl">
      <table className="min-w-[1100px] w-full border-collapse text-sm">
        <thead>
          <tr className="bg-slate-50">
            {columns.map((column) => (
              <th key={column} className="whitespace-nowrap border border-slate-200 px-4 py-3 text-left font-semibold text-slate-700">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={`${student.email}-${index}`} className="hover:bg-slate-50">
              <td className="border border-slate-200 px-4 py-3">{index + 1}</td>
              <td className="border border-slate-200 px-4 py-3 font-medium">{student.name || "—"}</td>
              <td className="border border-slate-200 px-4 py-3">{student.email || "—"}</td>
              <td className="border border-slate-200 px-4 py-3">{student.mobile || "—"}</td>
              <td className="border border-slate-200 px-4 py-3">{student.education || "—"}</td>
              <td className="border border-slate-200 px-4 py-3">{student.state || "—"}</td>
              <td className="border border-slate-200 px-4 py-3">{student.college || "—"}</td>
              <td className="border border-slate-200 px-4 py-3">{student.createdAt || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function GetStudents() {
  const [view, setView] = useState<StudentView>("shortcuts");
  const [state, setState] = useState("");
  const [college, setCollege] = useState("");
  const [courseId, setCourseId] = useState<CourseId | "">("");
  const [mapping, setMapping] = useState<Array<{ state: string; college: string }>>([]);
  const [mappingError, setMappingError] = useState("");

  const {
    loading,
    error,
    stateCollegeStudents,
    neetSSStudents,
    neetPGStudents,
    fetchStateCollegeStudents,
    fetchNeetSSStudents,
    fetchNeetPGStudents,
    resetResults,
  } = useStudents({ mock: MOCK_MODE });

  useEffect(() => {
    let cancelled = false;

    fetch("/State_College_Mapping.json")
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load state and college mapping.");
        return response.json() as Promise<Array<{ state: string; college: string }>>;
      })
      .then((data) => {
        if (!cancelled) setMapping(data);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setMappingError(err instanceof Error ? err.message : "Unable to load state and college mapping.");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const stateOptions = useMemo(() => uniqueStates(mapping), [mapping]);
  const collegeOptions = useMemo(() => getColleges(mapping, state), [mapping, state]);

  const goHome = () => {
    resetResults();
    setView("shortcuts");
    setState("");
    setCollege("");
    setCourseId("");
  };

  const openStateCollege = () => {
    resetResults();
    setState("");
    setCollege("");
    setCourseId("");
    setView("stateCollege");
  };

  const openNeetSS = async () => {
    setView("neetSS");
    await fetchNeetSSStudents();
  };

  const openNeetPG = async () => {
    setView("neetPG");
    await fetchNeetPGStudents();
  };

  const submitStateCollege = async () => {
  if (!state || !college || !courseId) {
    return;
  }
  await fetchStateCollegeStudents({
    state,
    college,
    courseId,
  });

  setView("stateCollegeResults");
};

  const selectedCourseLabel =
    COURSE_OPTIONS.find((option) => option.value === courseId)?.label ?? "";

  if (view === "shortcuts") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Get Students</h1>
          <p className="mt-1 text-sm text-slate-500">Retrieve student enquiry details using the same options available in the legacy portal.</p>
        </div>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-200 bg-blue-50 px-6 py-4">
            <BookOpen className="h-5 w-5 text-slate-600" />
            <h2 className="text-base font-semibold text-slate-700">Student Enquiry Details Shortcuts</h2>
          </div>

          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-3">
            {SHORTCUTS.map((shortcut) => {
              const Icon = shortcut.icon;
              const onClick = shortcut.key === "stateCollege" ? openStateCollege : shortcut.key === "neetSS" ? openNeetSS : openNeetPG;

              return (
                <button
                  key={shortcut.key}
                  type="button"
                  onClick={onClick}
                  className="group flex min-h-32 flex-col items-center justify-center rounded-lg border border-slate-100 bg-slate-50 px-5 py-6 text-center transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:shadow-sm"
                >
                  <Icon className="h-9 w-9 text-slate-600 transition-colors group-hover:text-blue-600" />
                  <span className="mt-3 text-lg font-semibold text-blue-600">{shortcut.label}</span>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  if (view === "stateCollege") {
    return (
      <div className="flex min-h-[calc(100vh-10rem)] items-start justify-center pt-8">
        <section className="w-full max-w-xl rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-center text-2xl font-bold text-blue-600">Get Student Details</h1>

          <div className="mt-8 space-y-5">
            <Select
              label=""
              value={state}
              options={stateOptions}
              placeholder={mappingError ? "Unable to load states" : "-- Select State --"}
              onChange={(value) => {
                setState(value);
                setCollege("");
              }}
              disabled={loading || !!mappingError}
            />

            <Select
              label=""
              value={college}
              options={collegeOptions}
              placeholder="-- Select College --"
              onChange={setCollege}
              disabled={loading || !state}
            />

            <Select
              label=""
              value={courseId}
              options={COURSE_OPTIONS}
              placeholder="-- Select Course --"
              onChange={(value) => setCourseId(value as CourseId | "")}
              disabled={loading}
            />

            {mappingError && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{mappingError}</p>
            )}

            {error && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
            )}

            <div className="flex items-center justify-between gap-4 pt-3">
              <button
                type="button"
                disabled={loading}
                onClick={submitStateCollege}
                className="inline-flex h-10 min-w-28 items-center justify-center gap-2 rounded-md bg-blue-600 px-5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                Submit
              </button>

              <button
                type="button"
                onClick={goHome}
                className="h-10 min-w-28 rounded-md bg-red-600 px-5 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const isStateCollegeResults = view === "stateCollegeResults";
  const isSS = view === "neetSS";
  const isPG = view === "neetPG";

  const title = isStateCollegeResults
    ? `All Students Details${selectedCourseLabel ? ` ${selectedCourseLabel}` : ""}`
    : isSS
      ? "All NEET SS Students Details"
      : "All NEET PG Students Details";

  const columns = isStateCollegeResults ? 10 : isSS ? 14 : 8;
  const currentLoading = loading;
  const currentCount = isStateCollegeResults
    ? stateCollegeStudents.length
    : isSS
      ? neetSSStudents.length
      : neetPGStudents.length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Get Students</h1>
          <p className="mt-1 text-sm text-slate-500">Student details retrieved from the selected legacy portal flow.</p>
        </div>

        <button
          type="button"
          onClick={goHome}
          className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </div>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between bg-blue-600 px-5 py-4 text-white">
          <h2 className="flex-1 text-center text-lg font-semibold">{title}</h2>
          <span className="text-sm font-medium">{currentCount} records</span>
        </div>

        {currentLoading ? (
          <LoadingTable columns={columns} />
        ) : error ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm font-semibold text-red-700">Unable to load student details</p>
            <p className="mt-1 text-sm text-red-600">{error}</p>
          </div>
        ) : currentCount === 0 ? (
          <EmptyTable columns={columns} />
        ) : isStateCollegeResults ? (
          <StateCollegeTable students={stateCollegeStudents} />
        ) : isSS ? (
          <NeetSSTable students={neetSSStudents} />
        ) : (
          <NeetPGTable students={neetPGStudents} />
        )}
      </section>

      {isStateCollegeResults && (
        <div className="text-sm text-slate-500">
          Selected state: <span className="font-medium text-slate-700">{state}</span> · Selected college: <span className="font-medium text-slate-700">{college}</span> · Course: <span className="font-medium text-slate-700">{selectedCourseLabel}</span>
        </div>
      )}
    </div>
  );
}
