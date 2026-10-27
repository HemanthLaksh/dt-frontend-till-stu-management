"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { TrendChartProps } from "../types/trends.types";

const CHART_HEIGHT = 320;
const MIN_CHART_WIDTH = 800;
const WIDTH_PER_DATA_POINT = 160;

export default function LineTrendChart({ report }: TrendChartProps) {
  const xKey = report.xKey ?? "name";

  const chartWidth = Math.max(
    MIN_CHART_WIDTH,
    report.data.length * WIDTH_PER_DATA_POINT,
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Chart Header */}
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
        <h2 className="text-base font-semibold text-slate-800">
          {report.title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">{report.description}</p>
      </div>

      {/* Chart Content */}
      <div className="p-5">
        <div
          className="h-80 w-full overflow-x-auto overflow-y-hidden"
          role="region"
          aria-label="Scrollable line chart"
          tabIndex={0}
        >
          <div
            style={{
              width: `${chartWidth}px`,
              minWidth: "100%",
              height: `${CHART_HEIGHT}px`,
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={report.data}
                margin={{
                  top: 10,
                  right: 20,
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
                  interval={0}
                  height={85}
                  angle={-35}
                  textAnchor="end"
                  tickMargin={12}
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
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
                  }}
                  labelStyle={{
                    color: "#64748b",
                    fontSize: 12,
                  }}
                  itemStyle={{
                    color: "#1e293b",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                  formatter={(value) => [
                    typeof value === "number"
                      ? value.toLocaleString("en-IN")
                      : value,
                    report.dataKey,
                  ]}
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

        {chartWidth > MIN_CHART_WIDTH && (
          <p className="mt-2 text-center text-xs text-slate-400">
            Scroll horizontally to view all data
          </p>
        )}
      </div>
    </div>
  );
}
