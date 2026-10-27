"use client";

import { useMemo, useState } from "react";
import type { TrendChartProps } from "../types/trends.types";

type ViewMode = "top10" | "all" | "table";

type BarItem = {
  name: string;
  value: number;
  originalIndex: number;
};

const VISIBLE_ROWS = 10;

function getNumericValue(value: unknown): number {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value === "string") {
    const parsed = Number(value.replace(/,/g, "").trim());
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}

function formatValue(value: number): string {
  return value.toLocaleString("en-IN");
}

function getSummaryLabels(reportId: string) {
  if (reportId === "plan-orders-state") {
    return {
      first: "Total orders",
      second: "Total states",
    };
  }

  if (reportId.endsWith("-college")) {
    return {
      first: "Total students",
      second: "Total colleges",
    };
  }

  if (reportId.endsWith("-state-wise")) {
    return {
      first: "Total students",
      second: "Selected state",
    };
  }

  if (reportId.endsWith("-state")) {
    return {
      first: "Total students",
      second: "Total states",
    };
  }

  return {
    first: "Total value",
    second: "Categories reported",
  };
}

export default function BarTrendChart({ report }: TrendChartProps) {
  const [view, setView] = useState<ViewMode>("top10");
  const [search, setSearch] = useState("");

  const items = useMemo<BarItem[]>(() => {
    return report.data
      .map((row, index) => {
        const rawName = report.xKey ? row[report.xKey] : undefined;

        const name =
          rawName == null || String(rawName).trim() === ""
            ? `Category ${index + 1}`
            : String(rawName);

        return {
          name,
          value: Math.max(0, getNumericValue(row[report.dataKey])),
          originalIndex: index,
        };
      })
      .sort((a, b) => b.value - a.value || a.originalIndex - b.originalIndex);
  }, [report.data, report.dataKey, report.xKey]);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return items;

    return items.filter((item) => item.name.toLowerCase().includes(query));
  }, [items, search]);

  const displayedItems =
    view === "top10" ? filteredItems.slice(0, VISIBLE_ROWS) : filteredItems;

  const maxValue = Math.max(0, ...displayedItems.map((item) => item.value));

  const totalValue = items.reduce((sum, item) => sum + item.value, 0);

  const summaryLabels = getSummaryLabels(report.id);

  const secondMetric = report.id.endsWith("-college")
    ? items.length
    : new Set(items.map((item) => item.name)).size;

  const selectedState = report.id.endsWith("-state-wise")
    ? (report.description.match(/by\s+(.+?)\.?$/i)?.[1] ?? null)
    : null;

  const secondMetricValue = report.id.endsWith("-state-wise")
    ? selectedState || "See state filter"
    : formatValue(secondMetric);

  const secondMetricDescription = report.id.endsWith("-college")
    ? "Colleges matching the report"
    : report.id.endsWith("-state-wise")
      ? "State selected in the report filter"
      : report.id.endsWith("-state")
        ? "States with registered students"
        : "Categories returned by the API";

  const renderViewButton = (mode: ViewMode, label: string) => (
    <button
      key={mode}
      type="button"
      onClick={() => setView(mode)}
      aria-pressed={view === mode}
      className={`flex-1 rounded-full px-3 py-2.5 text-sm font-medium transition-colors ${
        view === mode
          ? "bg-blue-600 text-white shadow-sm"
          : "text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
      }`}
    >
      {label}
    </button>
  );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#171717] sm:p-6">
      {/* Report heading */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          {report.title}
        </h3>

        {report.description && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {report.description}
          </p>
        )}
      </div>

      {/* Summary cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-slate-50 p-4 dark:bg-[#202020]">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {summaryLabels.first}
          </p>

          <p className="mt-2 break-words text-2xl font-semibold text-slate-900 dark:text-white">
            {formatValue(totalValue)}
          </p>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {report.id.endsWith("-state-wise")
              ? "Daily student registrations for the selected state"
              : report.id.endsWith("-college")
                ? "Students across the returned colleges"
                : report.id.endsWith("-state")
                  ? "Students registered during the selected date range"
                  : "Total for the selected report"}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-4 dark:bg-[#202020]">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {summaryLabels.second}
          </p>

          <p className="mt-2 break-words text-2xl font-semibold text-slate-900 dark:text-white">
            {secondMetricValue}
          </p>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {secondMetricDescription}
          </p>
        </div>
      </div>

      {/* Top 10 / All data / Table */}
      <div className="mb-6 flex gap-1 rounded-full bg-slate-100 p-1 dark:bg-[#202020]">
        {renderViewButton("top10", "Top 10")}
        {renderViewButton("all", "All data")}
        {renderViewButton("table", "Table")}
      </div>

      {/* List heading */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-white">
            {view === "table" ? "All categories" : "Top contributors"}
          </h4>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Ranked by {report.dataKey}
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-[#292929] dark:text-slate-300">
          Ranked
        </span>
      </div>

      {/* Search categories */}
      <div className="mb-4">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search categories..."
          aria-label="Search categories"
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-[#202020] dark:text-white dark:focus:ring-blue-900"
        />
      </div>

      {/* Table view */}
      {view === "table" ? (
        <div className="max-h-[440px] overflow-auto overscroll-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full min-w-[420px] text-left text-sm">
            <thead className="sticky top-0 z-10 bg-slate-50 dark:bg-[#242424]">
              <tr>
                <th className="px-4 py-3 font-medium text-slate-500 dark:text-slate-300">
                  Rank
                </th>
                <th className="px-4 py-3 font-medium text-slate-500 dark:text-slate-300">
                  Category
                </th>
                <th className="px-4 py-3 text-right font-medium text-slate-500 dark:text-slate-300">
                  Value
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredItems.map((item, index) => (
                <tr
                  key={`${item.name}-${item.originalIndex}`}
                  className="hover:bg-slate-50 dark:hover:bg-[#202020]"
                >
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                    {index + 1}
                  </td>

                  <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-100">
                    {item.name}
                  </td>

                  <td className="px-4 py-3 text-right tabular-nums text-slate-700 dark:text-slate-200">
                    {formatValue(item.value)}
                  </td>
                </tr>
              ))}

              {filteredItems.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-8 text-center text-slate-500"
                  >
                    No matching categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* Ranked bars */
        <div className="max-h-[440px] space-y-5 overflow-y-auto overscroll-auto pr-2">
          {displayedItems.map((item) => {
            const rank =
              items.findIndex(
                (candidate) => candidate.originalIndex === item.originalIndex,
              ) + 1;

            const percentage = maxValue > 0 ? (item.value / maxValue) * 100 : 0;

            return (
              <div key={`${item.name}-${item.originalIndex}`} className="group">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <p className="min-w-0 truncate text-sm font-medium text-slate-800 dark:text-slate-100">
                    <span className="mr-2 text-slate-400">{rank}.</span>
                    {item.name}
                  </p>

                  <span className="shrink-0 text-sm tabular-nums text-slate-500 dark:text-slate-400">
                    {formatValue(item.value)}
                  </span>
                </div>

                <div
                  className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-[#303030]"
                  role="progressbar"
                  aria-label={`${item.name}: ${formatValue(item.value)}`}
                  aria-valuemin={0}
                  aria-valuemax={maxValue}
                  aria-valuenow={item.value}
                >
                  <div
                    className="h-full rounded-full bg-blue-500 transition-[width] duration-300 group-hover:bg-blue-600"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}

          {displayedItems.length === 0 && (
            <p className="py-8 text-center text-sm text-slate-500">
              No matching categories found.
            </p>
          )}
        </div>
      )}

      {/* Footer */}
      <p className="mt-5 text-xs text-slate-500 dark:text-slate-400">
        {view === "top10"
          ? `Showing ${displayedItems.length} of ${filteredItems.length} matching categories.`
          : `Showing ${filteredItems.length} of ${items.length} categories.`}
      </p>
    </section>
  );
}
