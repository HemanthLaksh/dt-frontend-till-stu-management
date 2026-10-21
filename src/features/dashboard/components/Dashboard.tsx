"use client";

import { useState } from "react";

import NumbersDashboard from "./NumbersDashboard";
import ChartsDashboard from "./ChartsDashboard";
import DashboardViewToggle, { type DashboardView } from "./DashboardViewToggle";

export default function Dashboard() {
  const [activeView, setActiveView] = useState<DashboardView>("numbers");

  return (
    <div className="space-y-6 min-h-screen bg-slate-50 p-6">
      {/* Dashboard View Toggle */}
      <DashboardViewToggle activeView={activeView} onChange={setActiveView} />

      {/* Dashboard Content */}
      {activeView === "numbers" ? <NumbersDashboard /> : <ChartsDashboard />}
    </div>
  );
}
