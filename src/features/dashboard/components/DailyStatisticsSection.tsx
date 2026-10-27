"use client";

import { useMemo, useRef, useState } from "react";
import { ChartNoAxesCombined } from "lucide-react";

import Card from "@/components/ui/Card/Card";
import DatePicker from "@/components/ui/DatePicker/DatePicker";
import Button from "@/components/ui/Button/Button";

import { sendFastApiDailyStats } from "../services/dashboardFastApiService";
import "../utils/DailyStatisticsSection.css";

function getTodayDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/**
 * Allow only basic formatting and table elements from the API response.
 * Attributes and event handlers from the response are not copied.
 */
function sanitizeStatisticsHtml(html: string): string {
  if (typeof window === "undefined") {
    return "";
  }

  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(html, "text/html");

  const allowedTags = new Set([
    "H5",
    "B",
    "BR",
    "TABLE",
    "THEAD",
    "TBODY",
    "TR",
    "TH",
    "TD",
  ]);

  function cleanNode(node: Node): Node | null {
    if (node.nodeType === Node.TEXT_NODE) {
      return document.createTextNode(node.textContent ?? "");
    }

    if (!(node instanceof Element)) {
      return null;
    }

    if (!allowedTags.has(node.tagName)) {
      const fragment = document.createDocumentFragment();

      node.childNodes.forEach((child) => {
        const cleaned = cleanNode(child);

        if (cleaned) {
          fragment.appendChild(cleaned);
        }
      });

      return fragment;
    }

    const safeElement = document.createElement(node.tagName.toLowerCase());

    if (node.tagName === "TABLE") {
      safeElement.className = "daily-stats-table";
    }

    node.childNodes.forEach((child) => {
      const cleaned = cleanNode(child);

      if (cleaned) {
        safeElement.appendChild(cleaned);
      }
    });

    return safeElement;
  }

  const sanitized = document.createElement("div");

  parsedDocument.body.childNodes.forEach((node) => {
    const cleaned = cleanNode(node);

    if (cleaned) {
      sanitized.appendChild(cleaned);
    }
  });

  return sanitized.innerHTML;
}

export default function DailyStatisticsSection() {
  const [dailyDate, setDailyDate] = useState("");
  const [dailyStatsHtml, setDailyStatsHtml] = useState("");
  const [dailyStatsLoading, setDailyStatsLoading] = useState(false);
  const [dailyStatsError, setDailyStatsError] = useState<string | null>(null);

  const sanitizedStatisticsHtml = useMemo(
    () => sanitizeStatisticsHtml(dailyStatsHtml),
    [dailyStatsHtml],
  );
  const latestRequestId = useRef(0);

  async function handleGetDailyStats() {
    if (!dailyDate) {
      setDailyStatsError("Please select a date.");
      setDailyStatsHtml("");
      return;
    }

    const requestId = ++latestRequestId.current;

    try {
      setDailyStatsLoading(true);
      setDailyStatsError(null);
      setDailyStatsHtml("");

      const response = await sendFastApiDailyStats({
        fromDate: dailyDate,
        toDate: dailyDate,
      });

      // Ignore responses from older requests.
      if (requestId !== latestRequestId.current) return;

      if (typeof response?.message !== "string") {
        throw new Error("Invalid response received from daily statistics API.");
      }

      setDailyStatsHtml(response.message);
    } catch (err: unknown) {
      if (requestId !== latestRequestId.current) return;

      setDailyStatsError(
        err instanceof Error
          ? err.message
          : "Failed to fetch daily statistics.",
      );
    } finally {
      if (requestId === latestRequestId.current) {
        setDailyStatsLoading(false);
      }
    }
  }

  function handleClearDailyStats() {
    latestRequestId.current += 1;
    setDailyDate("");
    setDailyStatsHtml("");
    setDailyStatsError(null);
    setDailyStatsLoading(false);
  }

  return (
    <Card
      title="Daily Statistics"
      description="View signup, plan access, and subscription statistics for a selected date range."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <DatePicker
          label="Select Date"
          value={dailyDate}
          maxDate={getTodayDate()}
          onChange={(value) => {
            latestRequestId.current += 1;
            setDailyDate(value);
            setDailyStatsHtml("");
            setDailyStatsError(null);
            setDailyStatsLoading(false);
          }}
        />

        <div className="flex flex-col justify-end gap-2">
          <label className="invisible text-sm font-medium" aria-hidden="true">
            Actions
          </label>

          <Button
            type="button"
            className="h-[52px] w-full"
            disabled={dailyStatsLoading || !dailyDate}
            onClick={() => void handleGetDailyStats()}
          >
            <ChartNoAxesCombined size={17} className="mr-2" />
            {dailyStatsLoading ? "Loading..." : "Get Daily Statistics"}
          </Button>
        </div>

        <div className="flex items-end">
          <Button
            type="button"
            variant="outline"
            className="h-[52px] w-full"
            disabled={
              dailyStatsLoading ||
              (!dailyDate && !dailyStatsHtml && !dailyStatsError)
            }
            onClick={handleClearDailyStats}
          >
            Clear
          </Button>
        </div>
      </div>

      {dailyStatsError && (
        <div
          role="alert"
          className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {dailyStatsError}
        </div>
      )}

      {dailyStatsLoading && (
        <div
          role="status"
          className="mt-5 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700"
        >
          Fetching daily statistics...
        </div>
      )}

      {dailyStatsHtml && (
        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
          <div
            className="space-y-4 text-sm leading-6 text-slate-700"
            dangerouslySetInnerHTML={{
              __html: sanitizedStatisticsHtml,
            }}
          />
        </div>
      )}
    </Card>
  );
}
