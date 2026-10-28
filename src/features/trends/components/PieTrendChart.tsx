"use client";

import { useMemo, useState } from "react";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { chartColorSets } from "../constants/trends";
import type { TrendChartProps } from "../types/trends.types";

const colors = chartColorSets[0];

type PlanView = "chart" | "table";
type PlanSort = "highest" | "lowest" | "name";

const formatNumber = (value: number) => value.toLocaleString("en-IN");

export default function PieTrendChart({ report }: TrendChartProps) {
  const xKey = report.xKey ?? "name";

  const [view, setView] = useState<PlanView>("chart");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<PlanSort>("highest");

  const plans = useMemo(() => {
    return report.data.map((item, index) => {
      const rawValue = Number(item[report.dataKey]);

      return {
        name: String(item[xKey] ?? "Unknown"),
        value: Number.isFinite(rawValue) ? rawValue : 0,
        originalIndex: index,
      };
    });
  }, [report.data, report.dataKey, xKey]);

  const totalOrders = useMemo(
    () => plans.reduce((total, plan) => total + plan.value, 0),
    [plans],
  );

  const sortedPlans = useMemo(
    () =>
      [...plans].sort((a, b) => {
        if (sort === "name") {
          return a.name.localeCompare(b.name);
        }

        if (sort === "lowest") {
          return a.value - b.value;
        }

        return b.value - a.value;
      }),
    [plans, sort],
  );

  const filteredPlans = useMemo(
    () =>
      sortedPlans.filter((plan) =>
        plan.name.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [sortedPlans, search],
  );

  // Keep the donut readable by grouping smaller plans into Other Plans.
  const topPlans = useMemo(
    () => [...plans].sort((a, b) => b.value - a.value).slice(0, 5),
    [plans],
  );

  const otherOrders = useMemo(
    () =>
      plans
        .filter(
          (plan) =>
            !topPlans.some(
              (topPlan) => topPlan.originalIndex === plan.originalIndex,
            ),
        )
        .reduce((total, plan) => total + plan.value, 0),
    [plans, topPlans],
  );

  const donutData = [
    ...topPlans.map((plan) => ({
      name: plan.name,
      value: plan.value,
    })),
    ...(otherOrders > 0 ? [{ name: "Other Plans", value: otherOrders }] : []),
  ];

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <header className="border-b border-slate-200 bg-slate-50 px-5 py-4">
        <h2 className="text-base font-semibold text-slate-800">
          {report.title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">{report.description}</p>
      </header>

      <div className="p-5">
        {/* Summary and view switcher */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-800">
              Plan distribution
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              {plans.length} plans · {formatNumber(totalOrders)} total orders
            </p>
          </div>

          <div
            className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1"
            role="group"
            aria-label="Chart display mode"
          >
            <button
              type="button"
              onClick={() => setView("chart")}
              aria-pressed={view === "chart"}
              className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                view === "chart"
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Chart
            </button>

            <button
              type="button"
              onClick={() => setView("table")}
              aria-pressed={view === "table"}
              className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                view === "table"
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Table
            </button>
          </div>
        </div>

        {view === "chart" ? (
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[minmax(260px,0.9fr)_minmax(0,1.1fr)]">
            {/* Donut chart with center total */}
            <div className="relative mx-auto h-[290px] w-full max-w-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={76}
                    outerRadius={112}
                    paddingAngle={2}
                    stroke="#ffffff"
                    strokeWidth={2}
                  >
                    {donutData.map((_, index) => (
                      <Cell
                        key={`donut-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value, name) => [
                      typeof value === "number" ? formatNumber(value) : value,
                      name,
                    ]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs font-medium text-slate-500">
                  Total orders
                </span>

                <span className="mt-1 max-w-[150px] truncate text-2xl font-bold tracking-tight text-slate-900">
                  {formatNumber(totalOrders)}
                </span>

                <span className="mt-1 text-xs text-slate-400">
                  Across all plans
                </span>
              </div>
            </div>

            {/* Ranked legend with scrollbar spacing */}
            <div className="min-w-0">
              <div className="mb-4 flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-slate-800">
                  Plan breakdown
                </h3>

                <span className="shrink-0 text-xs text-slate-400">
                  Order share
                </span>
              </div>

              <div
                className="max-h-[300px] space-y-4 overflow-y-auto overscroll-contain pr-4 [scrollbar-gutter:stable]"
                role="region"
                aria-label="Ranked plan breakdown"
                tabIndex={0}
              >
                {sortedPlans.map((plan) => {
                  const percentage =
                    totalOrders > 0 ? (plan.value / totalOrders) * 100 : 0;

                  return (
                    <div
                      key={`${plan.name}-${plan.originalIndex}`}
                      className="min-w-0"
                    >
                      <div className="mb-1.5 flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-start gap-2">
                          <span
                            className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-sm"
                            style={{
                              backgroundColor:
                                colors[plan.originalIndex % colors.length],
                            }}
                          />

                          <div className="min-w-0 flex-1">
                            <p
                              className="break-words text-sm font-medium text-slate-700"
                              title={plan.name}
                            >
                              {plan.name}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              {formatNumber(plan.value)} orders
                            </p>
                          </div>
                        </div>

                        <span className="shrink-0 pt-0.5 text-sm font-semibold tabular-nums text-slate-700">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>

                      <div className="ml-[18px] h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${Math.min(100, percentage)}%`,
                            backgroundColor:
                              colors[plan.originalIndex % colors.length],
                          }}
                        />
                      </div>
                    </div>
                  );
                })}

                {sortedPlans.length === 0 && (
                  <p className="py-8 text-center text-sm text-slate-500">
                    No plan data available.
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Searchable and sortable table */
          <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search plans..."
                aria-label="Search plans"
                className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              />

              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as PlanSort)}
                aria-label="Sort plans"
                className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              >
                <option value="highest">Highest orders</option>
                <option value="lowest">Lowest orders</option>
                <option value="name">Plan name A–Z</option>
              </select>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Rank</th>
                    <th className="px-4 py-3 font-semibold">Plan</th>
                    <th className="px-4 py-3 text-right font-semibold">
                      Orders
                    </th>
                    <th className="px-4 py-3 text-right font-semibold">
                      Share
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredPlans.map((plan, index) => {
                    const percentage =
                      totalOrders > 0 ? (plan.value / totalOrders) * 100 : 0;

                    return (
                      <tr
                        key={`${plan.name}-${plan.originalIndex}`}
                        className="transition hover:bg-blue-50/50"
                      >
                        <td className="px-4 py-3 text-slate-400">
                          {index + 1}
                        </td>

                        <td className="px-4 py-3 font-medium text-slate-700">
                          {plan.name}
                        </td>

                        <td className="px-4 py-3 text-right font-semibold tabular-nums text-slate-800">
                          {formatNumber(plan.value)}
                        </td>

                        <td className="px-4 py-3 text-right tabular-nums text-slate-500">
                          {percentage.toFixed(1)}%
                        </td>
                      </tr>
                    );
                  })}

                  {filteredPlans.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-10 text-center text-slate-500"
                      >
                        No plans match your search.
                      </td>
                    </tr>
                  )}
                </tbody>

                <tfoot className="border-t border-slate-200 bg-slate-50">
                  <tr>
                    <td
                      colSpan={2}
                      className="px-4 py-3 font-semibold text-slate-700"
                    >
                      Total orders
                    </td>

                    <td className="px-4 py-3 text-right font-bold tabular-nums text-slate-900">
                      {formatNumber(totalOrders)}
                    </td>

                    <td className="px-4 py-3 text-right font-semibold text-slate-700">
                      {totalOrders > 0 ? "100%" : "0%"}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <p className="text-xs text-slate-400">
              Showing {filteredPlans.length} of {plans.length} plans.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
