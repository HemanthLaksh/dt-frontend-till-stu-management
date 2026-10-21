"use client";

import { useEffect, useState } from "react";

import {
  GraduationCap,
  Stethoscope,
  HeartPulse,
  BookOpen,
  UsersRound,
} from "lucide-react";

import {
  fetchFastApiDashboard,
  type FastApiDashboardResponse,
} from "../services/dashboardFastApiService";

import Select from "@/components/ui/Select/Select";
import Card from "@/components/ui/Card/Card";
import DashboardStatCard from "@/features/dashboard/components/DashboardStatCard";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import {
  fetchDashboardData,
  type OperationsDashboardData,
} from "../services/dashboardService";

// --------------------------------------------------
// Chart Colors
// --------------------------------------------------

const chartColors = [
  "#3B82F6",
  "#8B5CF6",
  "#14B8A6",
  "#F59E0B",
  "#F472B6",
  "#C98FF3",
];

// --------------------------------------------------
// Mock Data: Platform Sessions
// Retained until session-specific API data is available.
// --------------------------------------------------

const visibleCourses = [
  { id: 1, platform: "NEET PG" },
  { id: 2, platform: "NEET SS" },
  { id: 3, platform: "FMGE" },
  { id: 4, platform: "MBBS Curriculum" },
  { id: 5, platform: "PG Residency" },
];

// --------------------------------------------------
// Course Card Styles
// --------------------------------------------------

const courseColorStyles = {
  blue: {
    border: "border-blue-200",
    accent: "bg-blue-500",
    iconBg: "bg-blue-100",
    icon: "text-blue-600",
    value: "text-blue-700",
  },
  purple: {
    border: "border-purple-200",
    accent: "bg-purple-500",
    iconBg: "bg-purple-100",
    icon: "text-purple-600",
    value: "text-purple-700",
  },
  green: {
    border: "border-emerald-200",
    accent: "bg-emerald-500",
    iconBg: "bg-emerald-100",
    icon: "text-emerald-600",
    value: "text-emerald-700",
  },
  orange: {
    border: "border-orange-200",
    accent: "bg-orange-500",
    iconBg: "bg-orange-100",
    icon: "text-orange-600",
    value: "text-orange-700",
  },
  pink: {
    border: "border-pink-200",
    accent: "bg-pink-500",
    iconBg: "bg-pink-100",
    icon: "text-pink-600",
    value: "text-pink-700",
  },
} as const;

// --------------------------------------------------
// Custom Chart Tooltip
// --------------------------------------------------

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{
    name?: string;
    value?: number | string;
    color?: string;
  }>;
  label?: string | number;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-lg">
      {label !== undefined && (
        <p className="mb-2 text-sm font-medium text-slate-700">{label}</p>
      )}

      {payload.map((item, index) => (
        <p
          key={`${item.name ?? "value"}-${index}`}
          className="text-sm text-slate-600"
        >
          {item.name}:{" "}
          <span className="font-semibold text-slate-900">
            {Number(item.value).toLocaleString("en-IN")}
          </span>
        </p>
      ))}
    </div>
  );
}

// --------------------------------------------------
// Dashboard Charts
// --------------------------------------------------

export default function ChartsDashboard() {
  const [selectedYear, setSelectedYear] = useState("All Registrations");

  const [dashboard, setDashboard] = useState<OperationsDashboardData | null>(
    null,
  );

  const [isLoading, setIsLoading] = useState(true);
  const [fastApiDashboard, setFastApiDashboard] =
    useState<FastApiDashboardResponse | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPlatformData() {
      try {
        const response = await fetchFastApiDashboard();

        if (isMounted) {
          setFastApiDashboard(response);
        }
      } catch (error) {
        console.error("Failed to load platform login data:", error);
      }
    }

    void loadPlatformData();

    return () => {
      isMounted = false;
    };
  }, []);

  const platformData = [
    ...visibleCourses.map(({ id, platform }) => ({
      platform,
      sessions:
        fastApiDashboard?.courses.find((course) => course.courseId === id)
          ?.loggedIn ?? 0,
    })),
    {
      platform: "Android",
      sessions: Number(fastApiDashboard?.studentDetails.android ?? 0),
    },
    {
      platform: "iOS",
      sessions: Number(fastApiDashboard?.studentDetails.ios ?? 0),
    },
    {
      platform: "Website",
      sessions: Number(fastApiDashboard?.studentDetails.websiteCount ?? 0),
    },
  ];

  const [error, setError] = useState<string | null>(null);

  // --------------------------------------------------
  // Fetch Dashboard Data
  // --------------------------------------------------

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchDashboardData();

        if (isMounted) {
          setDashboard(data);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load dashboard charts.",
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

  // --------------------------------------------------
  // Course Signup Summary
  // --------------------------------------------------

  {
    /* Course Signup Summary */
  }

  const courseCards = dashboard
    ? ([
        {
          title: "NEET PG",
          value: Number(dashboard.neetPGCount),
          color: "blue",
          icon: GraduationCap,
        },
        {
          title: "NEET SS",
          value: Number(dashboard.neetSSCount),
          color: "purple",
          icon: Stethoscope,
        },
        {
          title: "FMGE",
          value: Number(dashboard.fmgeTotalSignUps),
          color: "green",
          icon: HeartPulse,
        },
        {
          title: "PG Residency",
          value: Number(dashboard.pgResidencyCount),
          color: "orange",
          icon: BookOpen,
        },
        {
          title: "MBBS Curriculum",
          value: Number(dashboard.mbbsCurriculumCount),
          color: "blue",
          icon: UsersRound,
        },
      ] as const)
    : [];
  <Card
    title="Total Signups"
    description="Total student signups across courses."
  >
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {courseCards.map((course) => {
        const Icon = course.icon;

        return (
          <DashboardStatCard
            key={course.title}
            title={course.title}
            value={course.value}
            description="Total registrations"
            color={course.color}
            icon={<Icon className="h-6 w-6" />}
          />
        );
      })}
    </div>
  </Card>;

  // --------------------------------------------------
  // Student Signup Distribution
  // --------------------------------------------------

  const signupData = courseCards.map((course) => ({
    name: course.title,
    value: course.value,
  }));

  // --------------------------------------------------
  // Device Statistics
  // --------------------------------------------------

  const deviceData = dashboard
    ? [
        {
          name: "Android",
          value: Number(dashboard.android),
        },
        {
          name: "iOS",
          value: Number(dashboard.ios),
        },
        {
          name: "Website",
          value: Number(dashboard.websiteCount),
        },
      ]
    : [];

  // --------------------------------------------------
  // Course Registrations by Year
  // --------------------------------------------------

  const yearlyRegistrationData = dashboard
    ? [
        {
          year: 2025,
          courses: [
            {
              course: "NEET PG",
              registrations: Number(dashboard.c12024),
            },
            {
              course: "NEET SS",
              registrations: Number(dashboard.c22024),
            },
            {
              course: "FMGE",
              registrations: Number(dashboard.c32024),
            },
            {
              course: "MBBS Curriculum",
              registrations: Number(dashboard.mbbsCurriculum2025SignUps),
            },
            {
              course: "PG Residency",
              registrations: Number(dashboard.pgResidency2025SignUps),
            },
          ],
        },
        {
          year: 2024,
          courses: [
            {
              course: "NEET PG",
              registrations: Number(dashboard.activeStudents),
            },
            {
              course: "NEET SS",
              registrations: Number(dashboard.neetSS2020SignUps),
            },
            {
              course: "FMGE",
              registrations: Number(dashboard.fmge2021SignUpCount),
            },
            {
              course: "MBBS Curriculum",
              registrations: Number(dashboard.mbbsCurriculum2024SignUps),
            },
            {
              course: "PG Residency",
              registrations: Number(dashboard.pgResidency2024SignUps),
            },
          ],
        },
        {
          year: 2023,
          courses: [
            {
              course: "NEET PG",
              registrations: Number(dashboard.t2023NEETPG),
            },
            {
              course: "NEET SS",
              registrations: Number(dashboard.t2023NEETSS),
            },
            {
              course: "FMGE",
              registrations: Number(dashboard.t2023FMGE),
            },
            {
              course: "MBBS Curriculum",
              registrations: Number(dashboard.mbbsCurriculum2023SignUps),
            },
            {
              course: "PG Residency",
              registrations: Number(dashboard.pgResidency2023SignUps),
            },
          ],
        },
        {
          year: 2022,
          courses: [
            {
              course: "NEET PG",
              registrations: Number(dashboard.count2021),
            },
            {
              course: "NEET SS",
              registrations: Number(dashboard.neetSS2021SignUps),
            },
            {
              course: "FMGE",
              registrations: Number(dashboard.fmgeCount2021),
            },
            {
              course: "MBBS Curriculum",
              registrations: null,
            },
            {
              course: "PG Residency",
              registrations: null,
            },
          ],
        },
      ]
    : [];

  const registrationData =
    selectedYear === "All Registrations"
      ? yearlyRegistrationData.length > 0
        ? yearlyRegistrationData[0].courses.map((course) => {
            const matchingValues = yearlyRegistrationData
              .flatMap((year) => year.courses)
              .filter((item) => item.course === course.course);

            const availableValues = matchingValues
              .map((item) => item.registrations)
              .filter(
                (value): value is number =>
                  value !== null && Number.isFinite(value),
              );

            return {
              course: course.course,
              registrations:
                availableValues.length > 0
                  ? availableValues.reduce((total, value) => total + value, 0)
                  : 0,
            };
          })
        : []
      : (yearlyRegistrationData
          .find((item) => item.year.toString() === selectedYear)
          ?.courses.filter(
            (
              course,
            ): course is typeof course & {
              registrations: number;
            } => course.registrations !== null,
          ) ?? []);

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <div className="space-y-6">
      {isLoading && (
        <div
          role="status"
          className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700"
        >
          Loading dashboard charts...
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {/* Signup Distribution and Device Statistics */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card
          title="Student Signup Distribution"
          description="Distribution of signups across courses."
        >
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={signupData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  outerRadius="72%"
                  paddingAngle={3}
                  stroke="#ffffff"
                  strokeWidth={3}
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                  }
                >
                  {signupData.map((item, index) => (
                    <Cell
                      key={item.name}
                      fill={chartColors[index % chartColors.length]}
                    />
                  ))}
                </Pie>

                <Tooltip content={<ChartTooltip />} cursor={false} />

                <Legend
                  verticalAlign="bottom"
                  wrapperStyle={{ fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card
          title="Device Statistics"
          description="Activity distribution across devices and platforms."
        >
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  innerRadius="45%"
                  outerRadius="72%"
                  paddingAngle={4}
                  stroke="#ffffff"
                  strokeWidth={3}
                >
                  {deviceData.map((item, index) => (
                    <Cell key={item.name} fill={chartColors[index]} />
                  ))}
                </Pie>

                <Tooltip content={<ChartTooltip />} cursor={false} />

                <Legend
                  verticalAlign="bottom"
                  wrapperStyle={{ fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Course Registration Bar Chart */}

      <Card
        title="Course Registrations"
        description={
          selectedYear === "All Registrations"
            ? "Combined registrations across all available years."
            : `Course registrations for ${selectedYear}.`
        }
        headerAction={
          <div className="w-full sm:w-48">
            <Select
              label="Select Year"
              value={selectedYear}
              options={[
                {
                  label: "All Registrations",
                  value: "All Registrations",
                },
                { label: "2025", value: "2025" },
                { label: "2024", value: "2024" },
                { label: "2023", value: "2023" },
                { label: "2022", value: "2022" },
              ]}
              onChange={setSelectedYear}
            />
          </div>
        }
      >
        <div className="h-[340px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={registrationData}
              margin={{
                top: 16,
                right: 12,
                left: 0,
                bottom: 12,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />

              <XAxis
                dataKey="course"
                tick={{ fontSize: 11, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
                interval={0}
                angle={-15}
                textAnchor="end"
                height={60}
              />

              <YAxis
                domain={[0, "auto"]}
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value: number) => value.toLocaleString("en-IN")}
              />

              <Tooltip content={<ChartTooltip />} cursor={false} />

              <Bar
                dataKey="registrations"
                name="Registrations"
                radius={[6, 6, 0, 0]}
                maxBarSize={85}
                isAnimationActive
              >
                {registrationData.map((item, index) => (
                  <Cell
                    key={item.course}
                    fill={chartColors[index % chartColors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Platform Sessions — Mock Data */}

      <Card
        title="Platform Login Overview"
        description="Logged-in user counts by course and platform counts reported by the dashboard API."
      >
        <div className="h-[360px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={platformData}
              layout="vertical"
              margin={{
                top: 8,
                right: 24,
                left: 12,
                bottom: 8,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="#e2e8f0"
              />

              <XAxis
                type="number"
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                type="category"
                dataKey="platform"
                width={105}
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip content={<ChartTooltip />} cursor={false} />

              <Bar
                dataKey="sessions"
                name="Count"
                radius={[0, 6, 6, 0]}
                maxBarSize={36}
                isAnimationActive
              >
                {platformData.map((item, index) => (
                  <Cell
                    key={item.platform}
                    fill={chartColors[index % chartColors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
