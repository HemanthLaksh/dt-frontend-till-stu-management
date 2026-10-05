// import { Link } from "react-router-dom";

// interface ProfileDetail {
//   label: string;
//   value: string;
// }

// interface NavigationItem {
//   title: string;
//   description: string;
//   path: string;
//   icon: React.ReactNode;
// }

// const profileDetails: ProfileDetail[] = [
//   {
//     label: "Admin ID",
//     value: "1002266",
//   },
//   {
//     label: "Name",
//     value: "Hemanth",
//   },
//   {
//     label: "Email ID",
//     value: "hemanth.l@doctutorials.com",
//   },
//   {
//     label: "Mobile No",
//     value: "6369409860",
//   },
//   {
//     label: "Status",
//     value: "Active",
//   },
//   {
//     label: "Role",
//     value: "Administrator",
//   },
//   {
//     label: "Last Sign In",
//     value: "20-Sep-2026 09:42 PM",
//   },
//   {
//     label: "First Time Login",
//     value: "Yes",
//   },
// ];

// const navigationItems: NavigationItem[] = [
//   {
//     title: "Dashboard",
//     description:
//       "View registrations, signups and session overview.",
//     path: "/dashboard",
//     icon: (
//       <svg
//         className="h-5 w-5"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <rect x="3" y="3" width="7" height="7" rx="1" />
//         <rect x="14" y="3" width="7" height="7" rx="1" />
//         <rect x="3" y="14" width="7" height="7" rx="1" />
//         <rect x="14" y="14" width="7" height="7" rx="1" />
//       </svg>
//     ),
//   },

//   {
//     title: "Trends",
//     description:
//       "Analyze orders, students and package trends.",
//     path: "/trends",
//     icon: (
//       <svg
//         className="h-5 w-5"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <path d="M4 19V5" />
//         <path d="M4 19h16" />
//         <path d="M8 15v-3" />
//         <path d="M12 15V9" />
//         <path d="M16 15V6" />
//       </svg>
//     ),
//   },

//   {
//     title: "Get Students",
//     description:
//       "Search and view registered student information.",
//     path: "/get-students",
//     icon: (
//       <svg
//         className="h-5 w-5"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
//         <circle cx="9" cy="7" r="4" />
//         <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
//         <path d="M16 3.13a4 4 0 0 1 0 7.75" />
//       </svg>
//     ),
//   },

//   {
//     title: "Student Details",
//     description:
//       "View detailed student information and records.",
//     path: "/student-details",
//     icon: (
//       <svg
//         className="h-5 w-5"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <circle cx="12" cy="8" r="4" />
//         <path d="M4 21a8 8 0 0 1 16 0" />
//       </svg>
//     ),
//   },

//   {
//     title: "Activate Student",
//     description:
//       "Manage and activate student accounts.",
//     path: "/activate-student",
//     icon: (
//       <svg
//         className="h-5 w-5"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <path d="M20 6 9 17l-5-5" />
//       </svg>
//     ),
//   },
// ];

// function Home() {
//   return (
//     <div className="space-y-6">

//       {/* =========================================
//           BREADCRUMB / PATH
//       ========================================= */}

//       <div className="flex items-center gap-2 text-sm">
//         <Link
//           to="/"
//           className="font-medium text-blue-600 hover:text-blue-700"
//         >
//           Home
//         </Link>

//         <svg
//           className="h-4 w-4 text-slate-400"
//           viewBox="0 0 20 20"
//           fill="currentColor"
//         >
//           <path
//             fillRule="evenodd"
//             d="M7.21 14.77a.75.75 0 010-1.06L10.92 10 7.21 6.29a.75.75 0 111.06-1.06l4.24 4.24a.75.75 0 010 1.06l-4.24 4.24a.75.75 0 01-1.06 0z"
//             clipRule="evenodd"
//           />
//         </svg>

//         <span className="text-slate-500">
//           Overview
//         </span>
//       </div>

//       {/* =========================================
//           WELCOME SECTION
//       ========================================= */}

//       <section className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-white p-6 shadow-sm">

//         <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

//           <div>
//             <div className="mb-2 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
//               Admin Portal
//             </div>

//             <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
//               Welcome back, Hemanth
//             </h2>

//             <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
//               Welcome to the DocTutorials Admin Portal. Manage
//               students, monitor platform activity, and access
//               important administrative information from one place.
//             </p>
//           </div>

//           <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white shadow-sm">
//             H
//           </div>

//         </div>

//       </section>

//       {/* =========================================
//           MAIN CONTENT GRID
//       ========================================= */}

//       <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

//         {/* =========================================
//             PROFILE DETAILS
//         ========================================= */}

//         <section className="xl:col-span-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

//           <div className="border-b border-slate-200 px-6 py-5">

//             <div className="flex items-center gap-3">

//               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
//                 <svg
//                   className="h-5 w-5"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <circle cx="12" cy="8" r="4" />
//                   <path d="M4 21a8 8 0 0 1 16 0" />
//                 </svg>
//               </div>

//               <div>
//                 <h3 className="text-lg font-semibold text-slate-900">
//                   Profile Details
//                 </h3>

//                 <p className="text-sm text-slate-500">
//                   Your administrator account information
//                 </p>
//               </div>

//             </div>

//           </div>

//           <div className="divide-y divide-slate-100">

//             {profileDetails.map((detail) => (
//               <div
//                 key={detail.label}
//                 className="grid grid-cols-1 gap-1 px-6 py-4 sm:grid-cols-2 sm:gap-4"
//               >
//                 <p className="text-sm font-medium text-slate-500">
//                   {detail.label}
//                 </p>

//                 <p className="text-sm font-semibold text-slate-900">
//                   {detail.value}
//                 </p>
//               </div>
//             ))}

//           </div>

//         </section>

//         {/* =========================================
//             ACCOUNT STATUS
//         ========================================= */}

//         <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

//           <h3 className="text-lg font-semibold text-slate-900">
//             Account Status
//           </h3>

//           <p className="mt-1 text-sm text-slate-500">
//             Current administrator account status
//           </p>

//           <div className="mt-6 flex items-center gap-4 rounded-xl bg-green-50 p-4">

//             <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-green-600">
//               <svg
//                 className="h-5 w-5"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M20 6 9 17l-5-5" />
//               </svg>
//             </div>

//             <div>
//               <p className="text-sm font-semibold text-green-800">
//                 Active
//               </p>

//               <p className="mt-0.5 text-xs text-green-700">
//                 Account is currently active
//               </p>
//             </div>

//           </div>

//           <div className="mt-6 space-y-4">

//             <div>
//               <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
//                 Role
//               </p>

//               <p className="mt-1 text-sm font-semibold text-slate-800">
//                 Administrator
//               </p>
//             </div>

//             <div>
//               <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
//                 First Login
//               </p>

//               <p className="mt-1 text-sm font-semibold text-slate-800">
//                 Completed
//               </p>
//             </div>

//           </div>

//         </section>

//       </div>

//       {/* =========================================
//           PORTAL CONTENT
//       ========================================= */}

//       <section className="rounded-xl border border-slate-200 bg-white shadow-sm">

//         <div className="border-b border-slate-200 px-6 py-5">

//           <div>
//             <h3 className="text-lg font-semibold text-slate-900">
//               Portal Content
//             </h3>

//             <p className="mt-1 text-sm text-slate-500">
//               Navigate to the different sections of the admin portal.
//             </p>
//           </div>

//         </div>

//         <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 xl:grid-cols-3">

//           {navigationItems.map((item) => (
//             <Link
//               key={item.path}
//               to={item.path}
//               className="group rounded-xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/40 hover:shadow-md"
//             >

//               <div className="flex items-start justify-between">

//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
//                   {item.icon}
//                 </div>

//                 <svg
//                   className="h-5 w-5 text-slate-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-blue-500"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M7.21 14.77a.75.75 0 010-1.06L10.92 10 7.21 6.29a.75.75 0 111.06-1.06l4.24 4.24a.75.75 0 010 1.06l-4.24 4.24a.75.75 0 01-1.06 0z"
//                     clipRule="evenodd"
//                   />
//                 </svg>

//               </div>

//               <h4 className="mt-4 text-base font-semibold text-slate-900">
//                 {item.title}
//               </h4>

//               <p className="mt-1 text-sm leading-5 text-slate-500">
//                 {item.description}
//               </p>

//               <div className="mt-4 text-xs font-semibold text-blue-600">
//                 Open {item.title}
//               </div>

//             </Link>
//           ))}

//         </div>

//       </section>

//     </div>
//   );
// }

// export default Home;