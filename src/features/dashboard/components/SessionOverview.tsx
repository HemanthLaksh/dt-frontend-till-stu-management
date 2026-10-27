"use client";

import { useEffect, useState } from "react";

import {
  Globe,
  Smartphone,
  GraduationCap,
  Stethoscope,
  HeartPulse,
  BookOpen,
  Users,
  ArrowUpRight,
  Activity,
} from "lucide-react";

import Card from "@/components/ui/Card/Card";
import { fetchFastApiDashboard } from "../services/dashboardFastApiService";
import type {
  FastApiCourse,
  FastApiDashboardResponse,
} from "../services/dashboardFastApiService";

const VISIBLE_COURSES = [
  { id: 1, name: "NEET PG" },
  { id: 2, name: "NEET SS" },
  { id: 3, name: "FMGE" },
  { id: 4, name: "MBBS Curriculum" },
  { id: 5, name: "PG Residency" },
] as const;

const courseStyles = {
  blue: {
    icon: "bg-blue-100 text-blue-600",
    accent: "bg-blue-500",
    value: "text-blue-700",
    hover: "hover:border-blue-200 hover:shadow-blue-100",
  },
  violet: {
    icon: "bg-violet-100 text-violet-600",
    accent: "bg-violet-500",
    value: "text-violet-700",
    hover: "hover:border-violet-200 hover:shadow-violet-100",
  },
  emerald: {
    icon: "bg-emerald-100 text-emerald-600",
    accent: "bg-emerald-500",
    value: "text-emerald-700",
    hover: "hover:border-emerald-200 hover:shadow-emerald-100",
  },
  orange: {
    icon: "bg-orange-100 text-orange-600",
    accent: "bg-orange-500",
    value: "text-orange-700",
    hover: "hover:border-orange-200 hover:shadow-orange-100",
  },
  pink: {
    icon: "bg-pink-100 text-pink-600",
    accent: "bg-pink-500",
    value: "text-pink-700",
    hover: "hover:border-pink-200 hover:shadow-pink-100",
  },
} as const;

const courseIcons = [GraduationCap, Stethoscope, HeartPulse, BookOpen, Users];

const courseColors = ["blue", "violet", "emerald", "orange", "pink"] as const;

function formatNumber(value: string | number | undefined): string {
  if (value === undefined || value === null || value === "") {
    return "—";
  }

  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed.toLocaleString("en-IN") : "—";
}

function SessionOverview() {
  const [dashboardData, setDashboardData] =
    useState<FastApiDashboardResponse | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetchFastApiDashboard();

        if (!isMounted) {
          return;
        }

        setDashboardData(response);
      } catch (err: unknown) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load session overview.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  const courses: (FastApiCourse & { displayName: string })[] =
    VISIBLE_COURSES.map((visibleCourse) => {
      const course = dashboardData?.courses.find(
        (item) => item.courseId === visibleCourse.id,
      );

      return course
        ? { ...course, displayName: visibleCourse.name }
        : {
            courseId: visibleCourse.id,
            courseName: visibleCourse.name,
            displayName: visibleCourse.name,
            totalStudents: 0,
            loggedIn: 0,
            signUpsByYear: {},
          };
    });

  const websiteCount = dashboardData?.studentDetails.websiteCount;

  return (
    <div className="grid grid-cols-1 gap-6">
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {/* Course Login Overview */}
      <Card
        title="Course Login Overview"
        description="Logged-in user counts across the five courses."
      >
        {isLoading ? (
          <div
            role="status"
            className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-6 text-center text-sm text-blue-700"
          >
            Loading course login data...
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {courses.map((course, index) => {
              const Icon = courseIcons[index];
              const style = courseStyles[courseColors[index]];

              return (
                <div
                  key={course.courseId}
                  className={`
                    group relative overflow-hidden rounded-xl
                    border border-slate-200/80 bg-white p-4
                    transition-all duration-300 ease-out
                    hover:-translate-y-1 hover:shadow-lg
                    ${style.hover}
                  `}
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-1 ${style.accent}`}
                  />

                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-500">
                        {course.displayName}
                      </p>

                      <p
                        className={`mt-3 text-2xl font-bold tracking-tight ${style.value}`}
                      >
                        {formatNumber(course.loggedIn)}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Logged-in Users
                      </p>
                    </div>

                    <div
                      className={`
                        flex h-10 w-10 shrink-0 items-center
                        justify-center rounded-xl
                        transition-transform duration-300
                        group-hover:scale-110
                        ${style.icon}
                      `}
                    >
                      <Icon size={20} />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      <span
                        className={`h-2 w-2 rounded-full ${style.accent}`}
                      />
                      Logged-in count
                    </span>

                    <ArrowUpRight
                      size={16}
                      className="text-slate-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}

export default SessionOverview;
