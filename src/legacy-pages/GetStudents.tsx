// import { useEffect, useState } from "react";

// interface StudentFilters {
//   name: string;
//   email: string;
//   education: string;
//   profileStatus: string;
// }

// const educationOptions = [
//   {
//     value: "neet-pg",
//     label: "NEET PG",
//   },
//   {
//     value: "neet-ss",
//     label: "NEET SS",
//   },
//   {
//     value: "fmge",
//     label: "FMGE",
//   },
//   {
//     value: "mbbs-curriculum",
//     label: "MBBS Curriculum",
//   },
//   {
//     value: "pg-residency",
//     label: "PG Residency",
//   },
// ];

// const statusOptions = [
//   {
//     value: "active",
//     label: "Active",
//   },
//   {
//     value: "inactive",
//     label: "Inactive",
//   },
// ];

// function GetStudents() {
//   const [students, setStudents] = useState<Student[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [filters, setFilters] = useState<StudentFilters>({
//     name: "",
//     email: "",
//     education: "",
//     profileStatus: "",
//   });

//   const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);

//   const [openDropdown, setOpenDropdown] = useState<
//     "education" | "profileStatus" | null
//   >(null);

//   /*
//    * ============================================================
//    * FETCH STUDENTS
//    * ============================================================
//    */

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const data = await getStudents();

//         setStudents(data);
//         setFilteredStudents(data);
//       } catch (err) {
//         console.error("Failed to fetch students:", err);
//         setError("Failed to load students.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStudents();
//   }, []);

//   /*
//    * ============================================================
//    * LOADING STATE
//    * ============================================================
//    */

//   if (loading) {
//     return (
//       <div className="space-y-6">
//         <div>
//           <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
//             Get Students
//           </h1>

//           <p className="mt-1 text-sm text-slate-500">
//             View and manage student information.
//           </p>
//         </div>

//         <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
//           <div className="p-6">
//             <div className="animate-pulse space-y-4">
//               <div className="h-5 w-40 rounded bg-slate-200" />
//               <div className="h-4 w-64 rounded bg-slate-100" />

//               <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
//                 <div className="h-11 rounded-lg bg-slate-100" />
//                 <div className="h-11 rounded-lg bg-slate-100" />
//                 <div className="h-11 rounded-lg bg-slate-100" />
//                 <div className="h-11 rounded-lg bg-slate-100" />
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
//           <div className="p-6">
//             <div className="animate-pulse space-y-4">
//               <div className="h-5 w-40 rounded bg-slate-200" />

//               {Array.from({ length: 5 }).map((_, index) => (
//                 <div
//                   key={index}
//                   className="grid grid-cols-6 gap-4 border-b border-slate-100 py-4"
//                 >
//                   <div className="h-4 rounded bg-slate-100" />
//                   <div className="h-4 rounded bg-slate-100" />
//                   <div className="h-4 rounded bg-slate-100" />
//                   <div className="h-4 rounded bg-slate-100" />
//                   <div className="h-4 rounded bg-slate-100" />
//                   <div className="h-4 rounded bg-slate-100" />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </div>
//     );
//   }

//   /*
//    * ============================================================
//    * ERROR STATE
//    * ============================================================
//    */

//   if (error) {
//     return (
//       <div className="space-y-6">
//         <div>
//           <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
//             Get Students
//           </h1>

//           <p className="mt-1 text-sm text-slate-500">
//             View and manage student information.
//           </p>
//         </div>

//         <div className="rounded-xl border border-red-200 bg-red-50 p-6">
//           <div className="flex items-start gap-3">
//             <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100">
//               <svg
//                 className="h-4 w-4 text-red-600"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <circle cx="12" cy="12" r="9" />
//                 <path d="M12 8v4" />
//                 <path d="M12 16h.01" />
//               </svg>
//             </div>

//             <div>
//               <p className="text-sm font-semibold text-red-700">
//                 Unable to load students
//               </p>

//               <p className="mt-1 text-sm text-red-600">{error}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   /*
//    * ============================================================
//    * SEARCH
//    * ============================================================
//    */

//   const handleSearch = () => {
//     const results = students.filter((student) => {
//       const studentName = student.name?.toLowerCase() ?? "";
//       const studentEmail = student.email?.toLowerCase() ?? "";
//       const studentEducation = student.education?.toLowerCase() ?? "";
//       const studentStatus = student.profileStatus?.toLowerCase() ?? "";

//       const matchesName = studentName.includes(
//         filters.name.toLowerCase()
//       );

//       const matchesEmail = studentEmail.includes(
//         filters.email.toLowerCase()
//       );

//       const matchesEducation =
//         filters.education === "" ||
//         studentEducation.replace(/ /g, "-") === filters.education;

//       const matchesStatus =
//         filters.profileStatus === "" ||
//         studentStatus === filters.profileStatus;

//       return (
//         matchesName &&
//         matchesEmail &&
//         matchesEducation &&
//         matchesStatus
//       );
//     });

//     setFilteredStudents(results);
//     setOpenDropdown(null);
//   };

//   /*
//    * ============================================================
//    * CLEAR FILTERS
//    * ============================================================
//    */

//   const handleClear = () => {
//     const emptyFilters: StudentFilters = {
//       name: "",
//       email: "",
//       education: "",
//       profileStatus: "",
//     };

//     setFilters(emptyFilters);
//     setFilteredStudents(students);
//     setOpenDropdown(null);
//   };

//   /*
//    * ============================================================
//    * DROPDOWN LABELS
//    * ============================================================
//    */

//   const getEducationLabel = () => {
//     const selected = educationOptions.find(
//       (option) => option.value === filters.education
//     );

//     return selected?.label ?? "Select education";
//   };

//   const getStatusLabel = () => {
//     const selected = statusOptions.find(
//       (option) => option.value === filters.profileStatus
//     );

//     return selected?.label ?? "Select status";
//   };

//   /*
//    * ============================================================
//    * RENDER
//    * ============================================================
//    */

//   return (
//     <div className="space-y-6">
//       {/* =====================================================
//           PAGE HEADER
//       ====================================================== */}

//       <div>
//         <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
//           Get Students
//         </h1>

//         <p className="mt-1 text-sm text-slate-500">
//           View and manage student information.
//         </p>
//       </div>

//       {/* =====================================================
//           SEARCH & FILTERS
//       ====================================================== */}

//       <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
//         {/* Section Header */}

//         <div className="border-b border-slate-200 px-6 py-5">
//           <h2 className="text-lg font-semibold text-slate-900">
//             Search Students
//           </h2>

//           <p className="mt-1 text-sm text-slate-500">
//             Search and filter student records.
//           </p>
//         </div>

//         {/* Filter Content */}

//         <div className="p-6">
//           <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
//             {/* =================================================
//                 STUDENT NAME
//             ================================================== */}

//             <div>
//               <label
//                 htmlFor="student-name"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Student Name
//               </label>

//               <input
//                 id="student-name"
//                 type="text"
//                 placeholder="Enter student name"
//                 value={filters.name}
//                 onChange={(event) =>
//                   setFilters({
//                     ...filters,
//                     name: event.target.value,
//                   })
//                 }
//                 className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 hover:border-slate-300 hover:bg-white focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
//               />
//             </div>

//             {/* =================================================
//                 EMAIL
//             ================================================== */}

//             <div>
//               <label
//                 htmlFor="student-email"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Email
//               </label>

//               <input
//                 id="student-email"
//                 type="text"
//                 placeholder="Enter email"
//                 value={filters.email}
//                 onChange={(event) =>
//                   setFilters({
//                     ...filters,
//                     email: event.target.value,
//                   })
//                 }
//                 className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 hover:border-slate-300 hover:bg-white focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
//               />
//             </div>

//             {/* =================================================
//                 EDUCATION DROPDOWN
//             ================================================== */}

//             <div>
//               <label
//                 htmlFor="education-dropdown"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Education
//               </label>

//               <div className="relative">
//                 <button
//                   id="education-dropdown"
//                   type="button"
//                   onClick={() =>
//                     setOpenDropdown(
//                       openDropdown === "education"
//                         ? null
//                         : "education"
//                     )
//                   }
//                   className={`flex h-11 w-full items-center justify-between rounded-lg border bg-white px-3.5 text-left text-sm outline-none transition-all duration-200 ${
//                     openDropdown === "education"
//                       ? "border-blue-500 ring-4 ring-blue-50"
//                       : "border-slate-200 hover:border-slate-300"
//                   }`}
//                 >
//                   <span
//                     className={
//                       filters.education
//                         ? "text-slate-900"
//                         : "text-slate-400"
//                     }
//                   >
//                     {getEducationLabel()}
//                   </span>

//                   <svg
//                     className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
//                       openDropdown === "education"
//                         ? "rotate-180"
//                         : ""
//                     }`}
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04.75.75 0 01-1.08 1.04l-4.25 4.51a.75.75 0 01-1.08 0l-4.25-4.51a.75.75 0 01.02-1.06z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </button>

//                 {openDropdown === "education" && (
//                   <div className="absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg">
//                     {educationOptions.map((option) => (
//                       <button
//                         key={option.value}
//                         type="button"
//                         onClick={() => {
//                           setFilters({
//                             ...filters,
//                             education: option.value,
//                           });

//                           setOpenDropdown(null);
//                         }}
//                         className={`w-full rounded-md px-3 py-2.5 text-left text-base transition-colors ${
//                           filters.education === option.value
//                             ? "bg-blue-50 font-medium text-blue-700"
//                             : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
//                         }`}
//                       >
//                         {option.label}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* =================================================
//                 STATUS DROPDOWN
//             ================================================== */}

//             <div>
//               <label
//                 htmlFor="status-dropdown"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Status
//               </label>

//               <div className="relative">
//                 <button
//                   id="status-dropdown"
//                   type="button"
//                   onClick={() =>
//                     setOpenDropdown(
//                       openDropdown === "profileStatus"
//                         ? null
//                         : "profileStatus"
//                     )
//                   }
//                   className={`flex h-11 w-full items-center justify-between rounded-lg border bg-white px-3.5 text-left text-sm outline-none transition-all duration-200 ${
//                     openDropdown === "profileStatus"
//                       ? "border-blue-500 ring-4 ring-blue-50"
//                       : "border-slate-200 hover:border-slate-300"
//                   }`}
//                 >
//                   <span
//                     className={
//                       filters.profileStatus
//                         ? "text-slate-900"
//                         : "text-slate-400"
//                     }
//                   >
//                     {getStatusLabel()}
//                   </span>

//                   <svg
//                     className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
//                       openDropdown === "profileStatus"
//                         ? "rotate-180"
//                         : ""
//                     }`}
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04.75.75 0 111.08 1.04.75.75 0 01-1.08 1.04l-4.25-4.51a.75.75 0 01-1.08 0l-4.25-4.51a.75.75 0 01.02-1.06z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </button>

//                 {openDropdown === "profileStatus" && (
//                   <div className="absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg">
//                     {statusOptions.map((option) => (
//                       <button
//                         key={option.value}
//                         type="button"
//                         onClick={() => {
//                           setFilters({
//                             ...filters,
//                             profileStatus: option.value,
//                           });

//                           setOpenDropdown(null);
//                         }}
//                         className={`w-full rounded-md px-3 py-2.5 text-left text-base transition-colors ${
//                           filters.profileStatus === option.value
//                             ? "bg-blue-50 font-medium text-blue-700"
//                             : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
//                         }`}
//                       >
//                         {option.label}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* =================================================
//               ACTION BUTTONS
//           ================================================== */}

//           <div className="mt-6 flex items-center gap-3">
//             <button
//               type="button"
//               onClick={handleSearch}
//               className="h-10 rounded-lg bg-blue-600 px-5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-100"
//             >
//               Search
//             </button>

//             <button
//               type="button"
//               onClick={handleClear}
//               className="h-10 rounded-lg border border-slate-200 bg-white px-5 text-sm font-medium text-slate-600 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-100"
//             >
//               Clear
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* =====================================================
//           STUDENT TABLE
//       ====================================================== */}

//       <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
//         {/* Table Header */}

//         <div className="border-b border-slate-200 px-6 py-5">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-lg font-semibold text-slate-900">
//                 Student Records
//               </h2>

//               <p className="mt-1 text-sm text-slate-500">
//                 Showing {filteredStudents.length} student records.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Responsive Table */}

//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-slate-200">
//             {/* =================================================
//                 TABLE HEADER
//             ================================================== */}

//             <thead className="bg-slate-50">
//               <tr>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
//                 >
//                   Student ID
//                 </th>

//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
//                 >
//                   Student Name
//                 </th>

//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
//                 >
//                   Email
//                 </th>

//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
//                 >
//                   Education
//                 </th>

//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
//                 >
//                   Status
//                 </th>

//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500"
//                 >
//                   Action
//                 </th>
//               </tr>
//             </thead>

//             {/* =================================================
//                 TABLE BODY
//             ================================================== */}

//             <tbody className="divide-y divide-slate-200 bg-white">
//               {filteredStudents.map((student) => {
//                 const isActive =
//                   student.profileStatus?.toLowerCase() === "active";

//                 return (
//                   <tr
//                     key={student.studentID}
//                     className="transition-colors hover:bg-slate-50"
//                   >
//                     {/* Student ID */}

//                     <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
//                       #{student.studentID}
//                     </td>

//                     {/* Student Name */}

//                     <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-700">
//                       {student.name || "—"}
//                     </td>

//                     {/* Email */}

//                     <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
//                       {student.email || "—"}
//                     </td>

//                     {/* Education */}

//                     <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
//                       {student.education || "—"}
//                     </td>

//                     {/* Status */}

//                     <td className="whitespace-nowrap px-6 py-4">
//                       <span
//                         className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
//                           isActive
//                             ? "bg-emerald-50 text-emerald-700"
//                             : "bg-slate-100 text-slate-600"
//                         }`}
//                       >
//                         <span
//                           className={`h-1.5 w-1.5 rounded-full ${
//                             isActive
//                               ? "bg-emerald-500"
//                               : "bg-slate-400"
//                           }`}
//                         />

//                         {student.profileStatus || "Unknown"}
//                       </span>
//                     </td>

//                     {/* Action */}

//                     <td className="whitespace-nowrap px-6 py-4 text-right">
//                       <button
//                         type="button"
//                         className="rounded-md px-2 py-1 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
//                       >
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}

//               {/* =================================================
//                   NO RESULTS
//               ================================================== */}

//               {filteredStudents.length === 0 && (
//                 <tr>
//                   <td
//                     colSpan={6}
//                     className="px-6 py-12 text-center"
//                   >
//                     <div className="flex flex-col items-center">
//                       <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
//                         <svg
//                           className="h-5 w-5 text-slate-400"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="1.8"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         >
//                           <circle cx="11" cy="11" r="7" />
//                           <path d="m20 20-4-4" />
//                         </svg>
//                       </div>

//                       <p className="mt-3 text-sm font-medium text-slate-700">
//                         No students found
//                       </p>

//                       <p className="mt-1 text-sm text-slate-400">
//                         Try adjusting your search filters.
//                       </p>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default GetStudents;