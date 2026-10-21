"use client";

import { useEffect, useState } from "react";
import {
  GraduationCap,
  Stethoscope,
  HeartPulse,
  BookOpen,
  UserRound,
  CalendarDays,
  Users,
} from "lucide-react";

import Select from "@/components/ui/Select/Select";
import { fetchFastApiDashboard } from "../services/dashboardFastApiService";
import type { FastApiCourse } from "../services/dashboardFastApiService";

interface RegistrationCourse {
  name: string;
  registrations: string;
}

interface YearRegistration {
  year: number;
  courses: RegistrationCourse[];
}

const courseStyles = [
  {
    icon: GraduationCap,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    accent: "bg-blue-500",
    valueColor: "text-blue-700",
    hover: "hover:border-blue-200 hover:shadow-blue-100",
  },
  {
    icon: Stethoscope,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-100",
    accent: "bg-violet-500",
    valueColor: "text-violet-700",
    hover: "hover:border-violet-200 hover:shadow-violet-100",
  },
  {
    icon: HeartPulse,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
    accent: "bg-emerald-500",
    valueColor: "text-emerald-700",
    hover: "hover:border-emerald-200 hover:shadow-emerald-100",
  },
  {
    icon: BookOpen,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100",
    accent: "bg-orange-500",
    valueColor: "text-orange-700",
    hover: "hover:border-orange-200 hover:shadow-orange-100",
  },
  {
    icon: UserRound,
    iconColor: "text-pink-600",
    iconBg: "bg-pink-100",
    accent: "bg-pink-500",
    valueColor: "text-pink-700",
    hover: "hover:border-pink-200 hover:shadow-pink-100",
  },
];

function formatRegistrationCount(value: string): string {
  if (value === "—" || value.trim() === "") {
    return "—";
  }

  const count = Number(value.replace(/,/g, ""));

  if (!Number.isFinite(count)) {
    return "—";
  }

  return count.toLocaleString("en-IN");
}

function getRegistrationData(courses: FastApiCourse[]): YearRegistration[] {
  const visibleCourses = [
    { id: 1, name: "NEET PG" },
    { id: 2, name: "NEET SS" },
    { id: 3, name: "FMGE" },
    { id: 4, name: "MBBS Curriculum" },
    { id: 5, name: "PG Residency" },
  ];

  const years = Array.from({ length: 9 }, (_, index) => 2026 - index);

  return years.map((year) => ({
    year,
    courses: visibleCourses.map((visibleCourse) => {
      const course = courses.find((item) => item.courseId === visibleCourse.id);

      return {
        name: visibleCourse.name,
        registrations:
          course?.signUpsByYear[String(year)] !== undefined
            ? String(course.signUpsByYear[String(year)])
            : "—",
      };
    }),
  }));
}

function RegistrationOverview() {
  const [selectedYear, setSelectedYear] = useState("2025");

  const [dashboardData, setDashboardData] = useState<FastApiCourse[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadRegistrationData() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetchFastApiDashboard();

        if (isMounted) {
          setDashboardData(response.courses);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load registration data.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadRegistrationData();

    return () => {
      isMounted = false;
    };
  }, []);

  const registrationData = getRegistrationData(dashboardData);

  const selectedData =
    selectedYear === "All Registrations"
      ? registrationData.length > 0
        ? {
            year: "All Registrations",
            courses: registrationData[0].courses.map((course) => {
              const total = registrationData
                .flatMap((year) => year.courses)
                .filter((item) => item.name === course.name)
                .reduce((sum, item) => {
                  if (item.registrations === "—") {
                    return sum;
                  }

                  const count = Number(item.registrations.replace(/,/g, ""));

                  return Number.isFinite(count) ? sum + count : sum;
                }, 0);

              const hasAvailableValue = registrationData
                .flatMap((year) => year.courses)
                .some(
                  (item) =>
                    item.name === course.name &&
                    item.registrations !== "—" &&
                    Number.isFinite(
                      Number(item.registrations.replace(/,/g, "")),
                    ),
                );

              return {
                name: course.name,
                registrations: hasAvailableValue
                  ? total.toLocaleString("en-IN")
                  : "—",
              };
            }),
          }
        : null
      : registrationData.find((item) => item.year.toString() === selectedYear);

  const totalRegistrations =
    selectedData?.courses.reduce((total, course) => {
      if (course.registrations === "—") {
        return total;
      }

      const count = Number(course.registrations.replace(/,/g, ""));

      return Number.isFinite(count) ? total + count : total;
    }, 0) ?? 0;

  const hasAvailableRegistrations =
    selectedData?.courses.some((course) => course.registrations !== "—") ??
    false;

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <CalendarDays size={22} />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Course Registrations
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Registration overview by course and year.
            </p>
          </div>
        </div>

        <div className="w-full sm:w-56">
          <Select
            label="Select Year"
            value={selectedYear}
            options={[
              { label: "All Registrations", value: "All Registrations" },
              ...Array.from({ length: 9 }, (_, index) => {
                const year = 2026 - index;

                return {
                  label: String(year),
                  value: String(year),
                };
              }),
            ]}
            onChange={setSelectedYear}
          />
        </div>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center gap-3 py-10">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
            <p className="text-sm text-slate-500">
              Loading registration data...
            </p>
          </div>
        )}

        {/* Error state */}
        {!isLoading && error && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 p-4"
          >
            <p className="text-sm font-medium text-red-700">
              Failed to load registration data.
            </p>

            <p className="mt-1 text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && dashboardData.length === 0 && (
          <p className="py-8 text-center text-sm text-slate-500">
            No registration data available.
          </p>
        )}

        {/* Registration summary and course cards */}
        {!isLoading && !error && selectedData && (
          <>
            {/* Summary */}
            <div className="flex flex-col gap-3 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-violet-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <Users size={20} />
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-800">
                    {selectedYear === "All Registrations"
                      ? "All Years — Total Registrations"
                      : `${selectedYear} Registrations`}
                  </h4>

                  <p className="mt-1 text-xs text-slate-500">
                    Across all five courses
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">
                  Total Registrations
                </p>

                <p className="mt-1 text-2xl font-bold tracking-tight text-blue-700">
                  {hasAvailableRegistrations
                    ? totalRegistrations.toLocaleString("en-IN")
                    : "—"}
                </p>
              </div>
            </div>

            {/* Course cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {selectedData.courses.map((course, index) => {
                const style = courseStyles[index];
                const Icon = style.icon;

                return (
                  <div
                    key={course.name}
                    className={`
                      group relative overflow-hidden rounded-xl
                      border border-slate-200/80 bg-white p-4
                      transition-all duration-300 ease-out
                      hover:-translate-y-1 hover:shadow-lg
                      ${style.hover}
                    `}
                  >
                    {/* Top accent */}
                    <div
                      className={`absolute inset-x-0 top-0 h-1 ${style.accent}`}
                    />

                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-medium leading-5 text-slate-500">
                          {course.name}
                        </p>

                        <p
                          className={`mt-3 text-2xl font-bold tracking-tight ${style.valueColor}`}
                        >
                          {formatRegistrationCount(course.registrations)}
                        </p>
                      </div>

                      <div
                        className={`
                          flex h-10 w-10 shrink-0 items-center
                          justify-center rounded-xl
                          transition-transform duration-300
                          group-hover:scale-110
                          ${style.iconBg} ${style.iconColor}
                        `}
                      >
                        <Icon size={20} />
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3">
                      <span
                        className={`h-2 w-2 rounded-full ${style.accent}`}
                      />

                      <span className="text-xs text-slate-500">
                        Registrations
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default RegistrationOverview;
