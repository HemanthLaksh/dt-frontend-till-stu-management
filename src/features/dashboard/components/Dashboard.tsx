"use client";

import RegistrationOverview from "./RegistrationOverview";
import SessionOverview from "./SessionOverview";
import Card from "@/components/ui/Card/Card";
import DatePicker from "@/components/ui/DatePicker/DatePicker";
import Button from "@/components/ui/Button/Button";
import { useDashboard } from "../hooks/useDashboard";

const deviceData = [
  { name: "Android", value: "4,820" },
  { name: "iOS", value: "3,214" },
  { name: "Website", value: "2,486" },
];

function Dashboard() {
  const { data, loading, error, refetch } = useDashboard();
  if (loading) {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <p className="text-sm text-text-secondary">
        Loading dashboard...
      </p>
    </div>
  );
}

if (error) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <p className="text-sm text-error">
        {error}
      </p>

      <Button onClick={refetch}>
        Try Again
      </Button>
    </div>
  );
}

if (!data) {
  return null;
}

const dashboard = data.studentDetails;
  return (
    
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-text-secondary">
          Overview of registrations, sessions, signups and platform activity.
        </p>
      </div>

      {/* Course Registrations */}
      <RegistrationOverview />

      {/* Session Overview */}
      <SessionOverview />

      {/* Student Details */}
      <Card
        title="Student Details"
        description="View student details based on course and selected date range."
      >
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {["NEET PG", "NEET SS", "FMGE"].map((course) => (
            <div
              key={course}
              className="
                group
                rounded-xl
                border border-border
                bg-secondary-light
                p-5
                transition-all duration-300 ease-out
                hover:-translate-y-0.5
                hover:bg-primary-light
              "
            >
              <h3 className="text-base font-semibold text-text-primary transition-colors duration-300 group-hover:text-primary">
                {course}
              </h3>

              <p className="mt-1 text-xs text-text-muted transition-colors duration-300 group-hover:text-primary">
                Select a date range to view student details.
              </p>

              <div className="mt-5 space-y-4">
                <DatePicker
                  label="From Date"
                  value=""
                  onChange={() => {}}
                />

                <DatePicker
                  label="To Date"
                  value=""
                  onChange={() => {}}
                />

                <Button className="w-full">
                  Get Student Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Total Signups */}
      <Card
        title="Total Signups"
        description="Total student signups across courses."
      >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-xl border border-border bg-secondary-light p-4">
          <p className="text-sm text-text-secondary">NEET PG</p>
          <p className="mt-2 text-2xl font-semibold text-text-primary">
            {dashboard.neetPGCount}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-secondary-light p-4">
          <p className="text-sm text-text-secondary">NEET SS</p>
          <p className="mt-2 text-2xl font-semibold text-text-primary">
            {dashboard.neetSSCount}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-secondary-light p-4">
          <p className="text-sm text-text-secondary">FMGE</p>
          <p className="mt-2 text-2xl font-semibold text-text-primary">
            {dashboard.fmgeTotalSignUps}
          </p>
        </div>
      </div>
    </Card>
      {/* Device Statistics */}
      <Card
        title="Device Statistics"
        description="Student activity by platform."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-secondary-light p-4">
            <p className="text-sm text-text-secondary">Android</p>
            <p className="mt-2 text-2xl font-semibold text-text-primary">
              {dashboard.android}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-secondary-light p-4">
            <p className="text-sm text-text-secondary">iOS</p>
            <p className="mt-2 text-2xl font-semibold text-text-primary">
              {dashboard.ios}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-secondary-light p-4">
            <p className="text-sm text-text-secondary">Website</p>
            <p className="mt-2 text-2xl font-semibold text-text-primary">
              {dashboard.websiteCount}
            </p>
          </div>
        </div>
      </Card>

      {/* Daily Statistics */}
      <Card
        title="Daily Statistics"
        description="View platform statistics for a selected date range."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-end">
          <DatePicker
            label="From Date"
            value=""
            onChange={() => {}}
          />

          <DatePicker
            label="To Date"
            value=""
            onChange={() => {}}
          />

          <Button className="w-full">
            Get Daily Statistics
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;