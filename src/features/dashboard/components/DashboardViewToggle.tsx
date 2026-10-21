"use client";

import Button from "@/components/ui/Button/Button";

export type DashboardView = "numbers" | "charts";

interface DashboardViewToggleProps {
  activeView: DashboardView;
  onChange: (view: DashboardView) => void;
}

export default function DashboardViewToggle({
  activeView,
  onChange,
}: DashboardViewToggleProps) {
  return (
    <div
      className="inline-flex flex-wrap items-center gap-2"
      role="group"
      aria-label="Dashboard display mode"
    >
      <Button
        variant={activeView === "numbers" ? "primary" : "outline"}
        aria-pressed={activeView === "numbers"}
        onClick={() => onChange("numbers")}
      >
        Data as Numbers
      </Button>

      <Button
        variant={activeView === "charts" ? "primary" : "outline"}
        aria-pressed={activeView === "charts"}
        onClick={() => onChange("charts")}
      >
        Data as Charts
      </Button>
    </div>
  );
}
