"use client";

import type { ReactNode } from "react";
import Card from "@/components/ui/Card/Card";

interface DashboardStatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  color?: "blue" | "green" | "orange" | "purple";
}

const colorStyles = {
  blue: {
    icon: "bg-blue-100 text-blue-600",
    accent: "bg-blue-500",
    glow: "hover:shadow-blue-100",
  },
  green: {
    icon: "bg-emerald-100 text-emerald-600",
    accent: "bg-emerald-500",
    glow: "hover:shadow-emerald-100",
  },
  orange: {
    icon: "bg-orange-100 text-orange-600",
    accent: "bg-orange-500",
    glow: "hover:shadow-orange-100",
  },
  purple: {
    icon: "bg-violet-100 text-violet-600",
    accent: "bg-violet-500",
    glow: "hover:shadow-violet-100",
  },
};

export default function DashboardStatCard({
  title,
  value,
  description,
  icon,
  color = "blue",
}: DashboardStatCardProps) {
  const formattedValue =
    typeof value === "number" ? value.toLocaleString("en-IN") : value;

  const styles = colorStyles[color] ?? colorStyles.blue;

  return (
    <Card
      className={`
        group relative h-full overflow-hidden
        border-slate-200/80
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-lg
        ${styles.glow}
      `}
    >
      {/* Colored accent */}
      <div className={`absolute inset-x-0 top-0 h-1 ${styles.accent}`} />

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {formattedValue}
          </p>

          {description && (
            <p className="mt-2 text-xs leading-5 text-slate-500">
              {description}
            </p>
          )}
        </div>

        {icon && (
          <div
            className={`
              flex h-12 w-12 shrink-0 items-center
              justify-center rounded-xl
              transition-transform duration-300
              group-hover:scale-110
              ${styles.icon}
            `}
          >
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
