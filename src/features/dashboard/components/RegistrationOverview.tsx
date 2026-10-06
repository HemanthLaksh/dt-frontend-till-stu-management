"use client";

import { useState } from "react";
import Select from "@/components/ui/Select/Select";

const registrationData = [
  {
    year: 2025,
    courses: [
      { name: "NEET PG", registrations: "2,482" },
      { name: "NEET SS", registrations: "1,842" },
      { name: "FMGE", registrations: "1,234" },
      { name: "MBBS Curriculum", registrations: "2,921" },
      { name: "PG Residency", registrations: "1,102" },
    ],
  },
  {
    year: 2024,
    courses: [
      { name: "NEET PG", registrations: "2,184" },
      { name: "NEET SS", registrations: "1,624" },
      { name: "FMGE", registrations: "1,108" },
      { name: "MBBS Curriculum", registrations: "2,642" },
      { name: "PG Residency", registrations: "986" },
    ],
  },
  {
    year: 2023,
    courses: [
      { name: "NEET PG", registrations: "1,942" },
      { name: "NEET SS", registrations: "1,482" },
      { name: "FMGE", registrations: "942" },
      { name: "MBBS Curriculum", registrations: "2,284" },
      { name: "PG Residency", registrations: "824" },
    ],
  },
  {
    year: 2022,
    courses: [
      { name: "NEET PG", registrations: "1,724" },
      { name: "NEET SS", registrations: "1,284" },
      { name: "FMGE", registrations: "812" },
      { name: "MBBS Curriculum", registrations: "1,942" },
      { name: "PG Residency", registrations: "704" },
    ],
  },
];

function RegistrationOverview() {
  const [selectedYear, setSelectedYear] = useState("2025");

  const selectedData = registrationData.find(
    (item) => item.year.toString() === selectedYear,
  );

  return (
    <section className="rounded-xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-col gap-4 border-b border-border px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">
            Course Registrations
          </h3>

          <p className="mt-1 text-sm text-text-secondary">
            Registration overview by course and year.
          </p>
        </div>

        <div className="w-full sm:w-40">
          <Select
            label="Select Year"
            value={selectedYear}
            options={[
              { label: "2025", value: "2025" },
              { label: "2024", value: "2024" },
              { label: "2023", value: "2023" },
              { label: "2022", value: "2022" },
            ]}
            onChange={setSelectedYear}
          />
        </div>
      </div>

      <div className="p-6">
        {selectedData && (
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />

              <h4 className="text-sm font-semibold text-text-primary">
                {selectedData.year} Registrations
              </h4>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {selectedData.courses.map((course) => (
                <div
                  key={course.name}
                  className="
                    rounded-lg
                    bg-secondary-light
                    p-4
                    transition-all duration-300 ease-out
                    hover:-translate-y-1
                    hover:bg-primary-light
                    hover:shadow-sm
                  "
                >
                  <p className="text-sm font-medium text-text-secondary">
                    {course.name}
                  </p>

                  <p className="mt-2 text-xl font-semibold text-text-primary">
                    {course.registrations}
                  </p>

                  <p className="mt-1 text-xs text-text-muted">
                    registrations
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default RegistrationOverview;