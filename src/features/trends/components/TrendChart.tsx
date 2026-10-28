"use client";

import type { TrendChartProps } from "../types/trends.types";
import LineTrendChart from "./LineTrendChart";
import BarTrendChart from "./BarTrendChart";
import PieTrendChart from "./PieTrendChart";
import EmptyTrendState from "./EmptyTrendState";

type Props = TrendChartProps & {
  selectedState?: string | null;
};

export default function TrendChart({ report, selectedState }: Props) {
  if (!report.data || report.data.length === 0) {
    return <EmptyTrendState />;
  }

  switch (report.chartType) {
    case "line":
      return <LineTrendChart report={report} />;

    case "bar":
      return <BarTrendChart report={report} selectedState={selectedState} />;

    case "pie":
      return <PieTrendChart report={report} />;

    default:
      return null;
  }
}
