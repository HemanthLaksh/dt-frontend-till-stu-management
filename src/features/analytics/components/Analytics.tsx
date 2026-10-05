"use client";

import Link from "next/link";
import {
  BarChart3,
  ChevronRight,
  Download,
  FileQuestion,
  PlayCircle,
  TestTube2,
} from "lucide-react";

interface AnalyticsModule {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

const analyticsModules: AnalyticsModule[] = [
  {
    title: "Question Bank",
    description:
      "View analytics related to question bank usage and student activity.",
    href: "/analytics/question-bank",
    icon: <FileQuestion size={24} />,
  },
  {
    title: "Test Series",
    description:
      "View test series analytics and student performance activity.",
    href: "/analytics/test-series",
    icon: <TestTube2 size={24} />,
  },
  {
    title: "Videos Download",
    description:
      "View analytics for videos downloaded by students.",
    href: "/analytics/videos-download",
    icon: <Download size={24} />,
  },
  {
    title: "Videos View",
    description:
      "View analytics for videos watched and viewed by students.",
    href: "/analytics/videos-view",
    icon: <PlayCircle size={24} />,
  },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
            <BarChart3
              size={22}
              className="text-blue-600"
            />
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Analytics
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              View and analyze activity across the platform.
            </p>
          </div>
        </div>
      </div>

      {/* Analytics Modules */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-base font-semibold text-slate-900">
            Analytics Modules
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Select an analytics module to continue.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {analyticsModules.map((module) => (
            <Link
              key={module.title}
              href={module.href}
              className="group rounded-xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/30 hover:shadow-md"
            >
              {/* Icon */}
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
                  {module.icon}
                </div>

                <ChevronRight
                  size={18}
                  className="text-slate-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-blue-600"
                />
              </div>

              {/* Content */}
              <h3 className="mt-5 text-base font-semibold text-slate-900">
                {module.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {module.description}
              </p>

              {/* Action */}
              <div className="mt-5 text-sm font-medium text-blue-600">
                View Analytics
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}