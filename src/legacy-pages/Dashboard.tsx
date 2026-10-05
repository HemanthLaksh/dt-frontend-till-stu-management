// import { useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// import RegistrationOverview from "../components/dashboard/RegistrationOverview";
// import SessionOverview from "../components/dashboard/SessionOverview";

// type Metric =
//   | "registrations"
//   | "signups"
//   | "appSessions"
//   | "websiteSessions";

// type Course =
//   | "all"
//   | "NEET PG"
//   | "NEET SS"
//   | "FMGE"
//   | "MBBS Curriculum"
//   | "PG Residency";

// interface ChartData {
//   year: string;
//   value: number;
// }

// const overviewStats = [
//   {
//     title: "Total Registrations",
//     value: "12,482",
//     change: "+12.4%",
//     description: "vs. previous period",
//   },
//   {
//     title: "Total Signups",
//     value: "8,921",
//     change: "+8.2%",
//     description: "vs. previous period",
//   },
//   {
//     title: "App Sessions",
//     value: "6,284",
//     change: "+5.1%",
//     description: "vs. previous period",
//   },
//   {
//     title: "Website Sessions",
//     value: "4,832",
//     change: "+7.3%",
//     description: "vs. previous period",
//   },
// ];

// /* =========================================
//    GRAPH DATA
// ========================================= */

// const registrationData: Record<Course, ChartData[]> = {
//   all: [
//     { year: "2022", value: 6466 },
//     { year: "2023", value: 7474 },
//     { year: "2024", value: 8544 },
//     { year: "2025", value: 9581 },
//   ],

//   "NEET PG": [
//     { year: "2022", value: 1724 },
//     { year: "2023", value: 1942 },
//     { year: "2024", value: 2184 },
//     { year: "2025", value: 2482 },
//   ],

//   "NEET SS": [
//     { year: "2022", value: 1284 },
//     { year: "2023", value: 1482 },
//     { year: "2024", value: 1624 },
//     { year: "2025", value: 1842 },
//   ],

//   FMGE: [
//     { year: "2022", value: 812 },
//     { year: "2023", value: 942 },
//     { year: "2024", value: 1108 },
//     { year: "2025", value: 1234 },
//   ],

//   "MBBS Curriculum": [
//     { year: "2022", value: 1942 },
//     { year: "2023", value: 2284 },
//     { year: "2024", value: 2642 },
//     { year: "2025", value: 2921 },
//   ],

//   "PG Residency": [
//     { year: "2022", value: 704 },
//     { year: "2023", value: 824 },
//     { year: "2024", value: 986 },
//     { year: "2025", value: 1102 },
//   ],
// };

// const signupData: ChartData[] = [
//   { year: "2022", value: 5824 },
//   { year: "2023", value: 6412 },
//   { year: "2024", value: 7528 },
//   { year: "2025", value: 8921 },
// ];

// const appSessionData: ChartData[] = [
//   { year: "2022", value: 4210 },
//   { year: "2023", value: 4872 },
//   { year: "2024", value: 5564 },
//   { year: "2025", value: 6284 },
// ];

// const websiteSessionData: ChartData[] = [
//   { year: "2022", value: 3218 },
//   { year: "2023", value: 3684 },
//   { year: "2024", value: 4216 },
//   { year: "2025", value: 4832 },
// ];

// /* =========================================
//    LABELS
// ========================================= */

// const metricLabels: Record<Metric, string> = {
//   registrations: "Total Registrations",
//   signups: "Total Signups",
//   appSessions: "App Sessions",
//   websiteSessions: "Website Sessions",
// };

// const courseOptions: Course[] = [
//   "all",
//   "NEET PG",
//   "NEET SS",
//   "FMGE",
//   "MBBS Curriculum",
//   "PG Residency",
// ];

// /* =========================================
//    DASHBOARD
// ========================================= */

// function Dashboard() {
//   const [selectedMetric, setSelectedMetric] =
//     useState<Metric>("registrations");

//   const [selectedCourse, setSelectedCourse] =
//     useState<Course>("all");

//   const [courseDropdownOpen, setCourseDropdownOpen] =
//     useState(false);

//   /* =========================================
//      GET GRAPH DATA
//   ========================================= */

//   const getChartData = (): ChartData[] => {
//     switch (selectedMetric) {
//       case "registrations":
//         return registrationData[selectedCourse];

//       case "signups":
//         return signupData;

//       case "appSessions":
//         return appSessionData;

//       case "websiteSessions":
//         return websiteSessionData;

//       default:
//         return [];
//     }
//   };

//   const chartData = getChartData();

//   /* =========================================
//      CURRENT METRIC LABEL
//   ========================================= */

//   const getMetricLabel = () => {
//     return metricLabels[selectedMetric];
//   };

//   return (
//     <div className="space-y-6">

//       {/* =========================================
//           PAGE HEADER
//       ========================================= */}

//       <div>
//         <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
//           Dashboard
//         </h2>

//         <p className="mt-1 text-sm text-slate-500">
//           Overview of your platform activity and statistics.
//         </p>
//       </div>

//       {/* =========================================
//           OVERVIEW STATS
//       ========================================= */}

//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//         {overviewStats.map((stat) => (
//           <div
//             key={stat.title}
//             className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
//           >
//             <p className="text-sm font-medium text-slate-500">
//               {stat.title}
//             </p>

//             <div className="mt-3 flex items-end justify-between gap-3">
//               <p className="text-2xl font-semibold tracking-tight text-slate-900">
//                 {stat.value}
//               </p>

//               <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-600">
//                 {stat.change}
//               </span>
//             </div>

//             <p className="mt-2 text-xs text-slate-400">
//               {stat.description}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* =========================================
//           ACTIVITY GRAPH
//       ========================================= */}

//       <section className="rounded-xl border border-slate-200 bg-white shadow-sm">

//         {/* Graph Header */}
//         <div className="border-b border-slate-200 px-6 py-5">

//           <div className="flex flex-col gap-5">

//             {/* Title */}
//             <div>
//               <h2 className="text-lg font-semibold text-slate-900">
//                 Activity Overview
//               </h2>

//               <p className="mt-1 text-sm text-slate-500">
//                 Track platform activity across different sections.
//               </p>
//             </div>

//             {/* Metric Buttons */}
//             <div className="flex flex-wrap gap-2">

//               {(Object.keys(metricLabels) as Metric[]).map(
//                 (metric) => (
//                   <button
//                     key={metric}
//                     type="button"
//                     onClick={() => {
//                       setSelectedMetric(metric);

//                       if (metric !== "registrations") {
//                         setSelectedCourse("all");
//                         setCourseDropdownOpen(false);
//                       }
//                     }}
//                     className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
//                       selectedMetric === metric
//                         ? "bg-blue-600 text-white shadow-sm"
//                         : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
//                     }`}
//                   >
//                     {metricLabels[metric]}
//                   </button>
//                 )
//               )}

//             </div>

//           </div>
//         </div>

//         {/* =========================================
//             GRAPH FILTERS
//         ========================================= */}

//         <div className="border-b border-slate-100 px-6 py-4">

//           <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

//             {/* Current Metric */}
//             <div>
//               <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
//                 Showing
//               </p>

//               <p className="mt-1 text-sm font-semibold text-slate-800">
//                 {getMetricLabel()}
//               </p>
//             </div>

//             {/* Course Selector */}
//             {selectedMetric === "registrations" && (
//               <div className="flex items-center gap-3">

//                 <label
//                   htmlFor="course-filter"
//                   className="text-sm font-medium text-slate-600"
//                 >
//                   Course
//                 </label>

//                 {/* Custom Dropdown */}
//                 <div className="relative">

//                   {/* Dropdown Button */}
//                   <button
//                     id="course-filter"
//                     type="button"
//                     onClick={() =>
//                       setCourseDropdownOpen(
//                         !courseDropdownOpen
//                       )
//                     }
//                     className={`flex h-11 min-w-48 items-center justify-between rounded-lg border bg-white px-3.5 text-left text-sm outline-none transition-all duration-200 ${
//                       courseDropdownOpen
//                         ? "border-blue-500 ring-4 ring-blue-50"
//                         : "border-slate-200 hover:border-slate-300"
//                     }`}
//                   >
//                     <span className="text-slate-700">
//                       {selectedCourse === "all"
//                         ? "All Courses"
//                         : selectedCourse}
//                     </span>

//                     <svg
//                       className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
//                         courseDropdownOpen
//                           ? "rotate-180"
//                           : ""
//                       }`}
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.51a.75.75 0 01.02-1.06z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </button>

//                   {/* Dropdown Menu */}
//                   {courseDropdownOpen && (
//                     <div className="absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg">

//                       {/* All Courses */}
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setSelectedCourse("all");
//                           setCourseDropdownOpen(false);
//                         }}
//                         className={`w-full rounded-md px-3 py-2.5 text-left text-base transition-colors ${
//                           selectedCourse === "all"
//                             ? "bg-blue-50 font-medium text-blue-700"
//                             : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
//                         }`}
//                       >
//                         All Courses
//                       </button>

//                       {/* Course Options */}
//                       {courseOptions
//                         .filter(
//                           (course) => course !== "all"
//                         )
//                         .map((course) => (
//                           <button
//                             key={course}
//                             type="button"
//                             onClick={() => {
//                               setSelectedCourse(course);
//                               setCourseDropdownOpen(false);
//                             }}
//                             className={`w-full rounded-md px-3 py-2.5 text-left text-base transition-colors ${
//                               selectedCourse === course
//                                 ? "bg-blue-50 font-medium text-blue-700"
//                                 : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
//                             }`}
//                           >
//                             {course}
//                           </button>
//                         ))}
//                     </div>
//                   )}

//                 </div>

//               </div>
//             )}

//           </div>

//         </div>

//         {/* =========================================
//             GRAPH
//         ========================================= */}

//         <div className="p-6">

//           <div className="h-80 w-full">

//             <ResponsiveContainer
//               width="100%"
//               height="100%"
//             >
//               <LineChart
//                 data={chartData}
//                 margin={{
//                   top: 10,
//                   right: 10,
//                   left: 0,
//                   bottom: 10,
//                 }}
//               >

//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   vertical={false}
//                   stroke="#e2e8f0"
//                 />

//                 <XAxis
//                   dataKey="year"
//                   tickLine={false}
//                   axisLine={false}
//                   tick={{
//                     fontSize: 12,
//                     fill: "#64748b",
//                   }}
//                 />

//                 <YAxis
//                   tickLine={false}
//                   axisLine={false}
//                   tick={{
//                     fontSize: 12,
//                     fill: "#64748b",
//                   }}
//                 />

//                 <Tooltip
//                   formatter={(value) => [
//                     Number(value).toLocaleString(),
//                     getMetricLabel(),
//                   ]}
//                   labelFormatter={(label) =>
//                     `Year: ${label}`
//                   }
//                   contentStyle={{
//                     borderRadius: "8px",
//                     border: "1px solid #e2e8f0",
//                     boxShadow:
//                       "0 4px 12px rgba(0,0,0,0.08)",
//                     backgroundColor: "#ffffff",
//                   }}
//                 />

//                 <Line
//                   type="monotone"
//                   dataKey="value"
//                   stroke="#2563eb"
//                   strokeWidth={3}
//                   dot={{
//                     r: 4,
//                     fill: "#2563eb",
//                   }}
//                   activeDot={{
//                     r: 6,
//                     fill: "#2563eb",
//                   }}
//                 />

//               </LineChart>
//             </ResponsiveContainer>

//           </div>

//         </div>

//       </section>

//       {/* =========================================
//           COURSE REGISTRATIONS
//       ========================================= */}

//       <RegistrationOverview />

//       {/* =========================================
//           SESSION OVERVIEW
//       ========================================= */}

//       <SessionOverview />

//     </div>
//   );
// }

// export default Dashboard;