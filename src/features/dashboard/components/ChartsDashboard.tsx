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

import Select from "@/components/ui/Select/Select";
import Card from "@/components/ui/Card/Card";
import {
  fetchFastApiDashboard,
  type FastApiDashboardResponse,
} from "../services/dashboardFastApiService";

const chartColors = [
  "#3B82F6",
  "#8B5CF6",
  "#14B8A6",
  "#F59E0B",
  "#F472B6",
  "#C98FF3",
];

const visibleCourses = [
  { id: 1, platform: "NEET PG", color: "blue", icon: GraduationCap },
  { id: 2, platform: "NEET SS", color: "purple", icon: Stethoscope },
  { id: 3, platform: "FMGE", color: "green", icon: HeartPulse },
  { id: 4, platform: "MBBS Curriculum", color: "orange", icon: UsersRound },
  { id: 5, platform: "PG Residency", color: "pink", icon: BookOpen },
] as const;

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
  if (!active || !payload?.length) return null;

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

export default function ChartsDashboard() {
  const [selectedYear, setSelectedYear] = useState("All Registrations");
  const [dashboard, setDashboard] = useState<FastApiDashboardResponse | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetchFastApiDashboard();

        if (isMounted) {
          setDashboard(response);
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

  const apiCourses = visibleCourses.map((item) => {
    const course = dashboard?.courses.find(
      (entry) => entry.courseId === item.id,
    );

    return {
      ...item,
      totalStudents: course?.totalStudents ?? 0,
      loggedIn: course?.loggedIn ?? 0,
      signUpsByYear: course?.signUpsByYear ?? {},
    };
  });

  const courseCards = apiCourses.map((course) => ({
    title: course.platform,
    value: course.totalStudents,
    color: course.color,
    icon: course.icon,
  }));

  const signupData = courseCards.map((course) => ({
    name: course.title,
    value: course.value,
  }));

  const deviceData = [
    {
      name: "Android",
      value: Number(dashboard?.studentDetails.android ?? 0),
    },
    {
      name: "iOS",
      value: Number(dashboard?.studentDetails.ios ?? 0),
    },
    {
      name: "Website",
      value: Number(dashboard?.studentDetails.websiteCount ?? 0),
    },
  ];

  const years = [
    ...new Set(
      apiCourses.flatMap((course) =>
        Object.keys(course.signUpsByYear).map(Number).filter(Number.isFinite),
      ),
    ),
  ].sort((a, b) => b - a);

  // Keep the selected year valid when the API data changes.
  const availableYearValues = years.map(String);

  const effectiveSelectedYear =
    selectedYear === "All Registrations" ||
    availableYearValues.includes(selectedYear)
      ? selectedYear
      : "All Registrations";

  const yearlyRegistrationData = years.map((year) => ({
    year,
    courses: apiCourses.map((course) => ({
      course: course.platform,
      registrations: Number(course.signUpsByYear[String(year)] ?? 0),
    })),
  }));

  const registrationData =
    effectiveSelectedYear === "All Registrations"
      ? apiCourses.map((course) => ({
          course: course.platform,
          registrations: years.reduce(
            (total, year) =>
              total + Number(course.signUpsByYear[String(year)] ?? 0),
            0,
          ),
        }))
      : (yearlyRegistrationData.find(
          (item) => String(item.year) === effectiveSelectedYear,
        )?.courses ?? []);

  const platformData = [
    {
      platform: "Android",
      count: Number(dashboard?.studentDetails.android ?? 0),
      countLabel: "Platform Count",
    },
    {
      platform: "iOS",
      count: Number(dashboard?.studentDetails.ios ?? 0),
      countLabel: "Platform Count",
    },
    {
      platform: "Website",
      count: Number(dashboard?.studentDetails.websiteCount ?? 0),
      countLabel: "Website Count",
    },
  ];

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

      {!isLoading && !error && dashboard && (
        <>
          {/* Signup Distribution and Device Statistics */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <Card
              title="Student Signup Distribution"
              description="Distribution of registered students across courses."
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
              description="Counts reported for Android, iOS and Website."
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

          {/* Course Registrations by Year */}
          <Card
            title="Course Registrations"
            description={
              effectiveSelectedYear === "All Registrations"
                ? years.length > 0
                  ? `Combined registrations across all available years (${Math.min(...years)}–${Math.max(...years)}).`
                  : "Combined registrations across all available years."
                : `Course registrations for ${effectiveSelectedYear}.`
            }

            headerAction={
              <div className="w-full sm:w-48">
                <Select
                  label="Select Year"
                  value={effectiveSelectedYear}
                  options={[
                    {
                      label: "All Registrations",
                      value: "All Registrations",
                    },
                    ...years.map((year) => ({
                      label: String(year),
                      value: String(year),
                    })),
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
                  margin={{ top: 16, right: 12, left: 0, bottom: 12 }}
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
                    tickFormatter={(value: number) =>
                      value.toLocaleString("en-IN")
                    }
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

          {/* Platform Overview */}
          <Card
            title="Platform Overview"
            description="Logged-in users by course and counts reported for Android, iOS and Website. These figures are not session counts."
          >
            <div className="h-[360px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={platformData}
                  layout="vertical"
                  margin={{ top: 8, right: 24, left: 12, bottom: 8 }}
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
                    tickFormatter={(value: number) =>
                      value.toLocaleString("en-IN")
                    }
                  />
                  <YAxis
                    type="category"
                    dataKey="platform"
                    width={100}
                    tick={{ fontSize: 12, fill: "#64748b" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload?.length) return null;

                      const item = payload[0].payload as {
                        countLabel: string;
                      };

                      return (
                        <ChartTooltip
                          active={active}
                          label={label}
                          payload={payload.map((entry) => ({
                            name: item.countLabel,
                            value: entry.value as number,
                            color: entry.color as string,
                          }))}
                        />
                      );
                    }}
                    cursor={false}
                  />
                  <Bar
                    dataKey="count"
                    name="Count"
                    radius={[0, 6, 6, 0]}
                    maxBarSize={60}
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
        </>
      )}
    </div>
  );
}
