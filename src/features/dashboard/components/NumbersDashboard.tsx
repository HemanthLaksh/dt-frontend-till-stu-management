"use client";

import { useEffect, useState } from "react";
import {
  GraduationCap,
  Stethoscope,
  HeartPulse,
  BookOpen,
  Smartphone,
  Globe,
  Users,
} from "lucide-react";

import Card from "@/components/ui/Card/Card";
import { COURSE_OPTIONS } from "@/constants/courseOptions";

import StudentDetailsSection from "./StudentDetailsSection";
import DailyStatisticsSection from "./DailyStatisticsSection";
import RegistrationOverview from "./RegistrationOverview";
import SessionOverview from "./SessionOverview";

import {
  fetchFastApiDashboard,
  type FastApiCourse,
} from "../services/dashboardFastApiService";

const VISIBLE_COURSES = COURSE_OPTIONS.map(({ id, label }) => ({
  id,
  name: label,
}));

const courseStyles = [
  {
    icon: GraduationCap,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    accent: "bg-blue-500",
    hover: "hover:border-blue-200 hover:shadow-blue-100",
    valueColor: "text-blue-700",
  },
  {
    icon: Stethoscope,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-100",
    accent: "bg-violet-500",
    hover: "hover:border-violet-200 hover:shadow-violet-100",
    valueColor: "text-violet-700",
  },
  {
    icon: HeartPulse,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
    accent: "bg-emerald-500",
    hover: "hover:border-emerald-200 hover:shadow-emerald-100",
    valueColor: "text-emerald-700",
  },
  {
    icon: BookOpen,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100",
    accent: "bg-orange-500",
    hover: "hover:border-orange-200 hover:shadow-orange-100",
    valueColor: "text-orange-700",
  },
  {
    icon: GraduationCap,
    iconColor: "text-pink-600",
    iconBg: "bg-pink-100",
    accent: "bg-pink-500",
    hover: "hover:border-pink-200 hover:shadow-pink-100",
    valueColor: "text-pink-700",
  },
] as const;

const deviceStyles = [
  {
    name: "Android",
    icon: Smartphone,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
    accent: "bg-emerald-500",
    hover: "hover:border-emerald-200 hover:shadow-emerald-100",
    valueColor: "text-emerald-700",
  },
  {
    name: "iOS",
    icon: Smartphone,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-100",
    accent: "bg-violet-500",
    hover: "hover:border-violet-200 hover:shadow-violet-100",
    valueColor: "text-violet-700",
  },
  {
    name: "Website",
    icon: Globe,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    accent: "bg-blue-500",
    hover: "hover:border-blue-200 hover:shadow-blue-100",
    valueColor: "text-blue-700",
  },
] as const;

function formatNumber(value: string | number | undefined): string {
  if (value === undefined || value === null || value === "") {
    return "—";
  }

  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed.toLocaleString("en-IN") : "—";
}

export default function NumbersDashboard() {
  const [courses, setCourses] = useState<FastApiCourse[]>([]);

  const [deviceStats, setDeviceStats] = useState({
    android: "0",
    ios: "0",
    websiteCount: "0",
    activeStudentsCreatedThisMonth: "0",
    deletedStudents: "0",
  });

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

        // Display only the five configured courses.
        const visibleCourses = VISIBLE_COURSES.map((visibleCourse) =>
          response.courses.find(
            (course) => course.courseId === visibleCourse.id,
          ),
        ).filter((course): course is FastApiCourse => Boolean(course));

        setCourses(visibleCourses);

        setDeviceStats({
          android: response.studentDetails.android,
          ios: response.studentDetails.ios,
          websiteCount: response.studentDetails.websiteCount,
          activeStudentsCreatedThisMonth:
            response.studentDetails.activeStudentsCreatedThisMonth,
          deletedStudents: response.studentDetails.deletedStudents,
        });
      } catch (err: unknown) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load Dashboard statistics.",
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

  return (
    <div className="min-h-screen space-y-6 bg-slate-50">
      {/* Dashboard Loading */}
      {isLoading && (
        <div
          role="status"
          className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700"
        >
          Loading Dashboard statistics...
        </div>
      )}

      {/* Dashboard Error */}
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {/* Total Signups */}
      <Card
        title="Total Signups"
        description="Total student registrations across five courses."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {VISIBLE_COURSES.map((visibleCourse, index) => {
            const course = courses.find(
              (item) => item.courseId === visibleCourse.id,
            );

            const style = courseStyles[index];
            const Icon = style.icon;

            return (
              <div
                key={visibleCourse.id}
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
                      {visibleCourse.name}
                    </p>

                    <p
                      className={`mt-3 text-2xl font-bold tracking-tight ${style.valueColor}`}
                    >
                      {isLoading ? "—" : formatNumber(course?.totalStudents)}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Total registrations
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
              </div>
            );
          })}
        </div>
      </Card>

      {/* Student Details */}
      <StudentDetailsSection />

      {/* Registration Overview */}
      <RegistrationOverview />

      {/* Additional Student Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card
          title="Students Created This Month"
          description="Student accounts created during the current month."
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <Users size={23} />
            </div>

            <p className="text-3xl font-bold tracking-tight text-slate-900">
              {isLoading
                ? "—"
                : formatNumber(deviceStats.activeStudentsCreatedThisMonth)}
            </p>
          </div>
        </Card>

        <Card
          title="Deleted Students"
          description="Total deleted student accounts."
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <Users size={23} />
            </div>

            <p className="text-3xl font-bold tracking-tight text-slate-900">
              {isLoading ? "—" : formatNumber(deviceStats.deletedStudents)}
            </p>
          </div>
        </Card>
      </div>

      {/* Session Overview */}
      <SessionOverview />

      {/* Daily Statistics */}
      <DailyStatisticsSection />

      {/* Device Statistics */}
      <Card
        title="Device Statistics"
        description="Student activity by platform."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {deviceStyles.map((device) => {
            const Icon = device.icon;

            const value =
              device.name === "Android"
                ? deviceStats.android
                : device.name === "iOS"
                  ? deviceStats.ios
                  : deviceStats.websiteCount;

            return (
              <div
                key={device.name}
                className={`
                  group relative overflow-hidden rounded-xl
                  border border-slate-200/80 bg-white p-5
                  transition-all duration-300 ease-out
                  hover:-translate-y-1 hover:shadow-lg
                  ${device.hover}
                `}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 ${device.accent}`}
                />

                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {device.name}
                    </p>

                    <p
                      className={`mt-3 text-2xl font-bold tracking-tight ${device.valueColor}`}
                    >
                      {isLoading ? "—" : formatNumber(value)}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Platform activity
                    </p>
                  </div>

                  <div
                    className={`
                      flex h-12 w-12 items-center justify-center
                      rounded-xl transition-transform duration-300
                      group-hover:scale-110
                      ${device.iconBg} ${device.iconColor}
                    `}
                  >
                    <Icon size={22} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
