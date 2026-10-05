import type {
  TrendDataItem,
  TrendReport,
  TrendReportSection,
} from "../types/trends.types";

/* -------------------------------------------------------------------------- */
/*                              Plan Orders                                   */
/* -------------------------------------------------------------------------- */

export const orderStateData: TrendDataItem[] = [
  { state: "Telangana", orders: 1840 },
  { state: "Karnataka", orders: 1620 },
  { state: "Maharashtra", orders: 1480 },
  { state: "Tamil Nadu", orders: 1260 },
  { state: "Kerala", orders: 980 },
  { state: "Andhra Pradesh", orders: 860 },
];

export const orderDateData: TrendDataItem[] = [
  { date: "Jan", orders: 820 },
  { date: "Feb", orders: 940 },
  { date: "Mar", orders: 1080 },
  { date: "Apr", orders: 1240 },
  { date: "May", orders: 1380 },
  { date: "Jun", orders: 1520 },
  { date: "Jul", orders: 1680 },
  { date: "Aug", orders: 1820 },
  { date: "Sep", orders: 1940 },
  { date: "Oct", orders: 2080 },
  { date: "Nov", orders: 2240 },
  { date: "Dec", orders: 2420 },
];

/* -------------------------------------------------------------------------- */
/*                                NEET PG                                     */
/* -------------------------------------------------------------------------- */

export const neetPgStateData: TrendDataItem[] = [
  { state: "Telangana", students: 2480 },
  { state: "Karnataka", students: 2240 },
  { state: "Maharashtra", students: 1980 },
  { state: "Tamil Nadu", students: 1740 },
  { state: "Kerala", students: 1480 },
  { state: "Andhra Pradesh", students: 1320 },
];

export const neetPgDateData: TrendDataItem[] = [
  { date: "Jan", students: 1240 },
  { date: "Feb", students: 1380 },
  { date: "Mar", students: 1520 },
  { date: "Apr", students: 1680 },
  { date: "May", students: 1840 },
  { date: "Jun", students: 2020 },
  { date: "Jul", students: 2180 },
  { date: "Aug", students: 2360 },
  { date: "Sep", students: 2540 },
  { date: "Oct", students: 2720 },
  { date: "Nov", students: 2910 },
  { date: "Dec", students: 3120 },
];

export const neetPgCollegeData: TrendDataItem[] = [
  { college: "Osmania", students: 840 },
  { college: "Gandhi Medical", students: 760 },
  { college: "KIMS", students: 680 },
  { college: "Apollo", students: 620 },
  { college: "Narayana", students: 540 },
];

export const neetPgPackageData: TrendDataItem[] = [
  { name: "Premium", value: 2840 },
  { name: "Standard", value: 1920 },
  { name: "Basic", value: 1240 },
];

/* -------------------------------------------------------------------------- */
/*                                NEET SS                                     */
/* -------------------------------------------------------------------------- */

export const neetSsStateData: TrendDataItem[] = [
  { state: "Telangana", students: 1640 },
  { state: "Karnataka", students: 1480 },
  { state: "Maharashtra", students: 1320 },
  { state: "Tamil Nadu", students: 1180 },
  { state: "Kerala", students: 960 },
  { state: "Andhra Pradesh", students: 820 },
];

export const neetSsDateData: TrendDataItem[] = [
  { date: "Jan", students: 820 },
  { date: "Feb", students: 910 },
  { date: "Mar", students: 1020 },
  { date: "Apr", students: 1140 },
  { date: "May", students: 1260 },
  { date: "Jun", students: 1380 },
  { date: "Jul", students: 1490 },
  { date: "Aug", students: 1620 },
  { date: "Sep", students: 1740 },
  { date: "Oct", students: 1880 },
  { date: "Nov", students: 2010 },
  { date: "Dec", students: 2180 },
];

export const neetSsCollegeData: TrendDataItem[] = [
  { college: "Osmania", students: 540 },
  { college: "Gandhi Medical", students: 490 },
  { college: "KIMS", students: 440 },
  { college: "Apollo", students: 390 },
  { college: "Narayana", students: 350 },
];

export const neetSsPackageData: TrendDataItem[] = [
  { name: "Premium", value: 1840 },
  { name: "Standard", value: 1260 },
  { name: "Basic", value: 820 },
];

/* -------------------------------------------------------------------------- */
/*                                  FMGE                                      */
/* -------------------------------------------------------------------------- */

export const fmgeStateData: TrendDataItem[] = [
  { state: "Telangana", students: 1420 },
  { state: "Karnataka", students: 1280 },
  { state: "Maharashtra", students: 1160 },
  { state: "Tamil Nadu", students: 1020 },
  { state: "Kerala", students: 880 },
  { state: "Delhi", students: 760 },
];

export const fmgeDateData: TrendDataItem[] = [
  { date: "Jan", students: 620 },
  { date: "Feb", students: 700 },
  { date: "Mar", students: 780 },
  { date: "Apr", students: 860 },
  { date: "May", students: 940 },
  { date: "Jun", students: 1020 },
  { date: "Jul", students: 1100 },
  { date: "Aug", students: 1190 },
  { date: "Sep", students: 1280 },
  { date: "Oct", students: 1370 },
  { date: "Nov", students: 1460 },
  { date: "Dec", students: 1580 },
];

export const fmgeCollegeData: TrendDataItem[] = [
  { college: "Osmania", students: 460 },
  { college: "Gandhi Medical", students: 420 },
  { college: "KIMS", students: 380 },
  { college: "Apollo", students: 340 },
  { college: "Narayana", students: 300 },
];

export const fmgePackageData: TrendDataItem[] = [
  { name: "Premium", value: 1420 },
  { name: "Standard", value: 980 },
  { name: "Basic", value: 620 },
];

/* -------------------------------------------------------------------------- */
/*                              Chart Colors                                  */
/* -------------------------------------------------------------------------- */

export const chartColorSets = [
  [
    "#60a5fa",
    "#bfdbfe",
    "#2563eb",
    "#93c5fd",
    "#1d4ed8",
    "#3b82f6",
  ],
  [
    "#1d4ed8",
    "#93c5fd",
    "#60a5fa",
    "#bfdbfe",
    "#2563eb",
    "#3b82f6",
  ],
  [
    "#93c5fd",
    "#2563eb",
    "#bfdbfe",
    "#1d4ed8",
    "#60a5fa",
    "#3b82f6",
  ],
];

/* -------------------------------------------------------------------------- */
/*                              Report Definitions                            */
/* -------------------------------------------------------------------------- */

export const trendReports: TrendReport[] = [
  {
    id: "plan-orders-state",
    title: "Get Order Details By State",
    description: "View plan orders based on state.",
    chartType: "bar",
    data: orderStateData,
    dataKey: "orders",
    xKey: "state",
  },
  {
    id: "plan-orders-date",
    title: "Get Order Details By Date",
    description: "View plan orders based on date.",
    chartType: "line",
    data: orderDateData,
    dataKey: "orders",
    xKey: "date",
  },

  {
    id: "neet-pg-state",
    title: "Students All States",
    description: "View NEET PG students across all states.",
    chartType: "bar",
    data: neetPgStateData,
    dataKey: "students",
    xKey: "state",
  },
  {
    id: "neet-pg-date",
    title: "Students Date-Wise",
    description: "View NEET PG student trends by date.",
    chartType: "line",
    data: neetPgDateData,
    dataKey: "students",
    xKey: "date",
  },
  {
    id: "neet-pg-state-wise",
    title: "Students State-Wise",
    description: "View NEET PG students by state.",
    chartType: "bar",
    data: neetPgStateData,
    dataKey: "students",
    xKey: "state",
  },
  {
    id: "neet-pg-college",
    title: "Students College-Wise",
    description: "View NEET PG students by college.",
    chartType: "bar",
    data: neetPgCollegeData,
    dataKey: "students",
    xKey: "college",
  },
  {
    id: "neet-pg-package",
    title: "Packages/Plans",
    description: "View NEET PG package distribution.",
    chartType: "pie",
    data: neetPgPackageData,
    dataKey: "value",
  },

  {
    id: "neet-ss-state",
    title: "Students All States",
    description: "View NEET SS students across all states.",
    chartType: "bar",
    data: neetSsStateData,
    dataKey: "students",
    xKey: "state",
  },
  {
    id: "neet-ss-date",
    title: "Students Date-Wise",
    description: "View NEET SS student trends by date.",
    chartType: "line",
    data: neetSsDateData,
    dataKey: "students",
    xKey: "date",
  },
  {
    id: "neet-ss-state-wise",
    title: "Students State-Wise",
    description: "View NEET SS students by state.",
    chartType: "bar",
    data: neetSsStateData,
    dataKey: "students",
    xKey: "state",
  },
  {
    id: "neet-ss-college",
    title: "Students College-Wise",
    description: "View NEET SS students by college.",
    chartType: "bar",
    data: neetSsCollegeData,
    dataKey: "students",
    xKey: "college",
  },
  {
    id: "neet-ss-package",
    title: "Package/Plans",
    description: "View NEET SS package distribution.",
    chartType: "pie",
    data: neetSsPackageData,
    dataKey: "value",
  },

  {
    id: "fmge-state",
    title: "Students All States",
    description: "View FMGE students across all states.",
    chartType: "bar",
    data: fmgeStateData,
    dataKey: "students",
    xKey: "state",
  },
  {
    id: "fmge-date",
    title: "Students Date-Wise",
    description: "View FMGE student trends by date.",
    chartType: "line",
    data: fmgeDateData,
    dataKey: "students",
    xKey: "date",
  },
  {
    id: "fmge-state-wise",
    title: "Students State-Wise",
    description: "View FMGE students by state.",
    chartType: "bar",
    data: fmgeStateData,
    dataKey: "students",
    xKey: "state",
  },
  {
    id: "fmge-college",
    title: "Students College-Wise",
    description: "View FMGE students by college.",
    chartType: "bar",
    data: fmgeCollegeData,
    dataKey: "students",
    xKey: "college",
  },
  {
    id: "fmge-package",
    title: "Package/Plans",
    description: "View FMGE package distribution.",
    chartType: "pie",
    data: fmgePackageData,
    dataKey: "value",
  },
];

/* -------------------------------------------------------------------------- */
/*                              Report Sections                               */
/* -------------------------------------------------------------------------- */

const getReport = (id: TrendReport["id"]) =>
  trendReports.find((report) => report.id === id)!;

export const trendReportSections: TrendReportSection[] = [
  {
    id: "plan-orders",
    title: "Plan Orders",
    description: "View plan order trends and order details.",
    reports: [
      getReport("plan-orders-state"),
      getReport("plan-orders-date"),
    ],
  },
  {
    id: "neet-pg",
    title: "NEET PG",
    description: "View NEET PG student trends and statistics.",
    reports: [
      getReport("neet-pg-state"),
      getReport("neet-pg-date"),
      getReport("neet-pg-state-wise"),
      getReport("neet-pg-college"),
      getReport("neet-pg-package"),
    ],
  },
  {
    id: "neet-ss",
    title: "NEET SS",
    description: "View NEET SS student trends and statistics.",
    reports: [
      getReport("neet-ss-state"),
      getReport("neet-ss-date"),
      getReport("neet-ss-state-wise"),
      getReport("neet-ss-college"),
      getReport("neet-ss-package"),
    ],
  },
  {
    id: "fmge",
    title: "FMGE",
    description: "View FMGE student trends and statistics.",
    reports: [
      getReport("fmge-state"),
      getReport("fmge-date"),
      getReport("fmge-state-wise"),
      getReport("fmge-college"),
      getReport("fmge-package"),
    ],
  },
];