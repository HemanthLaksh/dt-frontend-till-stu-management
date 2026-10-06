"use client";

import RegistrationOverview from "./RegistrationOverview";
import SessionOverview from "./SessionOverview";
import Card from "@/components/ui/Card/Card";
import DatePicker from "@/components/ui/DatePicker/DatePicker";
import Button from "@/components/ui/Button/Button";
// import { useDashboard } from "../hooks/useDashboard";
import { dummyDashboardData } from "../utils/dashboardData";
import { useState } from "react";
import Select from "@/components/ui/Select/Select";

const deviceData = [
  { name: "Android", value: "4,820" },
  { name: "iOS", value: "3,214" },
  { name: "Website", value: "2,486" },
];

function Dashboard() {

  {/* -------API Integration------- */}
  // const { data, loading, error, refetch } = useDashboard();
//   if (loading) {
//   return (
//     <div className="flex min-h-[400px] items-center justify-center">
//       <p className="text-sm text-text-secondary">
//         Loading dashboard...
//       </p>
//     </div>
//   );
// }

// if (error) {
//   return (
//     <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
//       <p className="text-sm text-error">
//         {error}
//       </p>

//       <Button onClick={refetch}>
//         Try Again
//       </Button>
//     </div>
//   );
// }

// if (!data) {
//   return null;
// }

// const dashboard = data.studentDetails;
  {/* -------Dummy Data------- */}

  const dashboard = dummyDashboardData.studentDetails;
  const [selectedCourse, setSelectedCourse] = useState("NEET PG");



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

      {/* Total Signups */}
      <Card
        title="Total Signups"
        description="Total student signups across courses."
      >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <div className="
        rounded-lg
        bg-secondary-light
        p-4
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:bg-primary-light
        hover:shadow-sm
      ">
          <p className="text-sm text-text-secondary">NEET PG</p>
          <p className="mt-2 text-2xl font-semibold text-text-primary">
            {dashboard.neetPGCount}
          </p>
        </div>

        <div className="
        rounded-lg
        bg-secondary-light
        p-4
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:bg-primary-light
        hover:shadow-sm
      ">
          <p className="text-sm text-text-secondary">NEET SS</p>
          <p className="mt-2 text-2xl font-semibold text-text-primary">
            {dashboard.neetSSCount}
          </p>
        </div>

        <div className="
        rounded-lg
        bg-secondary-light
        p-4
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:bg-primary-light
        hover:shadow-sm
      ">
          <p className="text-sm text-text-secondary">FMGE</p>
          <p className="mt-2 text-2xl font-semibold text-text-primary">
            {dashboard.fmgeTotalSignUps}
          </p>
        </div>

        <div className="
        rounded-lg
        bg-secondary-light
        p-4
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:bg-primary-light
        hover:shadow-sm
      ">
          <p className="text-sm text-text-secondary">PG Residency</p>
          <p className="mt-2 text-2xl font-semibold text-text-primary">
            {dashboard.pgResidencyCount}
          </p>
        </div>

        <div className="
        rounded-lg
        bg-secondary-light
        p-4
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:bg-primary-light
        hover:shadow-sm
      ">
          <p className="text-sm text-text-secondary">MBBS Curriculum</p>
          <p className="mt-2 text-2xl font-semibold text-text-primary">
            {dashboard.mbbsCurriculumCount}
          </p>
        </div>
      </div>
    </Card>

    {/* Student Details */}
      <Card
        title="Student Details"
        description="View student details based on course and selected date range."
      >
        <div className="space-y-5">
          <div className="max-w-sm">
            <Select
            label="Course"
            value={selectedCourse}
            options={[
              { label: "NEET PG", value: "NEET PG" },
              { label: "NEET SS", value: "NEET SS" },
              { label: "FMGE", value: "FMGE" },
              { label: "MBBS Curriculum", value: "MBBS Curriculum" },
              { label: "PG Residency", value: "PG Residency" },
            ]}
            onChange={setSelectedCourse}
          />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
          </div>

          <div className="flex flex-col gap-3 rounded-lg bg-secondary-light p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary">
                Selected Course
              </p>

              <p className="mt-1 text-xs text-text-secondary">
                {selectedCourse}
              </p>
            </div>

            <Button>
              Get Student Details
            </Button>
          </div>
        </div>
      </Card>

      {/* Course Registrations */}
      <RegistrationOverview />

      {/* Session Overview */}
      <SessionOverview />

      {/* Device Statistics */}
      <Card
        title="Device Statistics"
        description="Student activity by platform."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="
              rounded-lg
              bg-secondary-light
              p-4
              transition-all duration-300 ease-out
              hover:-translate-y-1
              hover:bg-primary-light
              hover:shadow-sm
            ">
            <p className="text-sm text-text-secondary">Android</p>
            <p className="mt-2 text-2xl font-semibold text-text-primary">
              {dashboard.android}
            </p>
          </div>

          <div className="
              rounded-lg
              bg-secondary-light
              p-4
              transition-all duration-300 ease-out
              hover:-translate-y-1
              hover:bg-primary-light
              hover:shadow-sm
            ">
            <p className="text-sm text-text-secondary">iOS</p>
            <p className="mt-2 text-2xl font-semibold text-text-primary">
              {dashboard.ios}
            </p>
          </div>

            <div className="
              rounded-lg
              bg-secondary-light
              p-4
              transition-all duration-300 ease-out
              hover:-translate-y-1
              hover:bg-primary-light
              hover:shadow-sm
            ">
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