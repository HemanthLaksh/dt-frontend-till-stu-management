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
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Section Header */}
      <div className="border-b border-slate-200 px-6 py-5">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Course Registrations
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Registration overview by course and year.
          </p>
        </div>
      </div>

      {/* Registration Years */}
      <div className="space-y-6 p-6">
        {registrationData.map((yearData) => (
          <div key={yearData.year}>
            {/* Year */}
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-600" />

              <h4 className="text-sm font-semibold text-slate-800">
                {yearData.year} Registrations
              </h4>
            </div>

            {/* Courses */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {yearData.courses.map((course) => (
                <div
                  key={course.name}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition-all hover:border-blue-200 hover:bg-blue-50"
                >
                  <p className="text-sm font-medium text-slate-600">
                    {course.name}
                  </p>

                  <p className="mt-2 text-xl font-semibold text-slate-900">
                    {course.registrations}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    registrations
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RegistrationOverview;