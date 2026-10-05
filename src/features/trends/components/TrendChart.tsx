"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { chartColorSets } from "../constants/trends";

import type {
  TrendChartProps,
} from "../types/trends.types";

const colors = chartColorSets[0];

/* -------------------------------------------------------------------------- */
/*                              Custom Tooltip                                */
/* -------------------------------------------------------------------------- */

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value?: string | number;
    name?: string;
    payload?: Record<string, string | number>;
  }>;
  label?: string | number;
}

function CustomTooltip({
  active,
  payload,
  label,
}: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const item = payload[0];

  return (
    <div className="min-w-[160px] rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg">
      {label !== undefined && (
        <p className="mb-1 text-xs font-medium text-slate-500">
          {label}
        </p>
      )}

      <p className="text-sm font-semibold text-slate-800">
        {item.name && (
          <span className="mr-1">
            {item.name}:
          </span>
        )}

        {item.value?.toLocaleString()}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Trend Chart                                   */
/* -------------------------------------------------------------------------- */

export default function TrendChart({
  report,
}: TrendChartProps) {
  const xKey = report.xKey ?? "name";

  /* ------------------------------------------------------------------------ */
  /*                                Line Chart                               */
  /* ------------------------------------------------------------------------ */

  if (report.chartType === "line") {
    return (
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
          <h2 className="text-base font-semibold text-slate-800">
            {report.title}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {report.description}
          </p>
        </div>

        {/* Chart */}
        <div className="h-80 w-full p-5">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart
              data={report.data}
              margin={{
                top: 10,
                right: 15,
                left: 5,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
                vertical={false}
              />

              <XAxis
                dataKey={xKey}
                tick={{
                  fill: "#64748b",
                  fontSize: 12,
                }}
                axisLine={{
                  stroke: "#cbd5e1",
                }}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fill: "#64748b",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "#cbd5e1",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
              />

              <Line
                type="monotone"
                dataKey={report.dataKey}
                stroke="#2563eb"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: "#2563eb",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                  fill: "#2563eb",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------------ */
  /*                                Bar Chart                                 */
  /* ------------------------------------------------------------------------ */

  if (report.chartType === "bar") {
    return (
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
          <h2 className="text-base font-semibold text-slate-800">
            {report.title}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {report.description}
          </p>
        </div>

        {/* Chart */}
        <div className="h-80 w-full p-5">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={report.data}
              margin={{
                top: 10,
                right: 15,
                left: 5,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
                vertical={false}
              />

              <XAxis
                dataKey={xKey}
                tick={{
                  fill: "#64748b",
                  fontSize: 12,
                }}
                axisLine={{
                  stroke: "#cbd5e1",
                }}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fill: "#64748b",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  fill: "transparent",
                }}
              />

              <Bar
                dataKey={report.dataKey}
                radius={[7, 7, 0, 0]}
                maxBarSize={56}
              >
                {report.data.map((_, index) => (
                  <Cell
                    key={`bar-${index}`}
                    fill={
                      colors[index % colors.length]
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------------ */
  /*                                Pie Chart                                 */
  /* ------------------------------------------------------------------------ */

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
        <h2 className="text-base font-semibold text-slate-800">
          {report.title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {report.description}
        </p>
      </div>

      {/* Chart */}
      <div className="h-80 w-full p-5">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={report.data}
              dataKey={report.dataKey}
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={105}
              innerRadius={45}
              paddingAngle={2}
            >
              {report.data.map((_, index) => (
                <Cell
                  key={`pie-${index}`}
                  fill={
                    colors[index % colors.length]
                  }
                />
              ))}
            </Pie>

            <Tooltip
              content={<CustomTooltip />}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}