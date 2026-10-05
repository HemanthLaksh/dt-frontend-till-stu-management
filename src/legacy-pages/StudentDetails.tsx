import { useState } from "react";

const courses = [
  "NEET PG",
  "NEET SS",
  "FMGE",
  "MBBS Curriculum",
  "PG Residency",
];

function StudentDetails() {
  const [selectedCourse, setSelectedCourse] = useState("NEET PG");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const selectedIndex = courses.indexOf(selectedCourse);

  const handleGetStudentDetails = () => {
    console.log("Course:", selectedCourse);
    console.log("From Date:", fromDate);
    console.log("To Date:", toDate);
  };

  return (
    <div className="space-y-6">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Student Details
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Retrieve student details using a selected course and date range.
        </p>
      </div>

      {/* =====================================================
          COURSE TABS
      ====================================================== */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="relative flex">

          {/* =================================================
              COURSE BUTTONS
          ================================================== */}

          {courses.map((course) => {
            const isActive = selectedCourse === course;

            return (
              <button
                key={course}
                type="button"
                onClick={() => setSelectedCourse(course)}
                className={`relative min-w-0 flex-1 px-5 py-5 text-center text-lg font-semibold transition-colors duration-200 ${
                  isActive
                    ? "text-slate-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                }`}
              >
                {course}
              </button>
            );
          })}

          {/* =================================================
              SINGLE MOVING BLUE UNDERLINE
          ================================================== */}

          <span
            className="pointer-events-none absolute bottom-0 left-0 h-1 bg-blue-600 transition-transform duration-300 ease-in-out"
            style={{
              width: `${100 / courses.length}%`,
              transform: `translateX(${selectedIndex * 100}%)`,
            }}
          />

        </div>

      </div>

      {/* =====================================================
          GET STUDENT DETAILS
      ====================================================== */}

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">

        {/* Header */}

        <div className="border-b border-slate-200 px-6 py-5">

          <div className="flex items-center gap-3">

            {/* Icon */}

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">

              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle
                  cx="9"
                  cy="7"
                  r="4"
                />

                <path d="M3 21a6 6 0 0 1 12 0" />

                <path d="M16 11a4 4 0 0 1 0 8" />

                <path d="M19 21a5 5 0 0 0-3-4.58" />
              </svg>

            </div>

            {/* Heading */}

            <div>

              <h2 className="text-lg font-semibold text-slate-900">
                Get Student Details
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Select a date range to retrieve student details for{" "}
                <span className="font-medium text-blue-600">
                  {selectedCourse}
                </span>
                .
              </p>

            </div>

          </div>

        </div>

        {/* =================================================
            FORM
        ================================================== */}

        <div className="p-6">

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

            {/* =============================================
                FROM DATE
            ============================================== */}

            <div>

              <label
                htmlFor="from-date"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                From Date
              </label>

              <input
                id="from-date"
                type="date"
                value={fromDate}
                onChange={(event) =>
                  setFromDate(event.target.value)
                }
                className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3.5 text-sm text-slate-700 outline-none transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              />

            </div>

            {/* =============================================
                TO DATE
            ============================================== */}

            <div>

              <label
                htmlFor="to-date"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                To Date
              </label>

              <input
                id="to-date"
                type="date"
                value={toDate}
                onChange={(event) =>
                  setToDate(event.target.value)
                }
                className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3.5 text-sm text-slate-700 outline-none transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              />

            </div>

          </div>

          {/* =================================================
              ACTION
          ================================================== */}

          <div className="mt-6 flex items-center">

            <button
              type="button"
              onClick={handleGetStudentDetails}
              className="h-10 rounded-lg bg-blue-600 px-5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              Get Student Details
            </button>

          </div>

        </div>

      </section>

      {/* =====================================================
          SELECTED COURSE SUMMARY
      ====================================================== */}

      <section className="rounded-xl border border-slate-200 bg-slate-50 p-6">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Selected Course
            </p>

            <p className="mt-1 text-lg font-semibold text-slate-900">
              {selectedCourse}
            </p>

          </div>

          <div className="rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            Student Details
          </div>

        </div>

      </section>

    </div>
  );
}

export default StudentDetails;