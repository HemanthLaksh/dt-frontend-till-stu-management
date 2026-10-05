import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* =========================================
   TYPES
========================================= */

interface ChartItem {
  title: string;
  description: string;
  type: "line" | "bar" | "pie";
  data: Record<string, string | number>[];
  dataKey: string;
  xKey?: string;
}

/* =========================================
   BLUE COLOR PALETTES
   Different order for each graph
========================================= */

const chartColorSets = [
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

  [
    "#3b82f6",
    "#bfdbfe",
    "#1d4ed8",
    "#60a5fa",
    "#93c5fd",
    "#2563eb",
  ],

  [
    "#2563eb",
    "#60a5fa",
    "#1d4ed8",
    "#bfdbfe",
    "#3b82f6",
    "#93c5fd",
  ],

  [
    "#bfdbfe",
    "#1d4ed8",
    "#93c5fd",
    "#2563eb",
    "#3b82f6",
    "#60a5fa",
  ],
];

/* =========================================
   PLAN ORDERS DATA
========================================= */

const orderStateData = [
  { state: "Telangana", orders: 1840 },
  { state: "Karnataka", orders: 1620 },
  { state: "Maharashtra", orders: 1480 },
  { state: "Tamil Nadu", orders: 1260 },
  { state: "Kerala", orders: 980 },
  { state: "Andhra Pradesh", orders: 860 },
];

const orderDateData = [
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

/* =========================================
   NEET PG DATA
========================================= */

const neetPgStateData = [
  { state: "Telangana", students: 2480 },
  { state: "Karnataka", students: 2240 },
  { state: "Maharashtra", students: 1980 },
  { state: "Tamil Nadu", students: 1740 },
  { state: "Kerala", students: 1480 },
  { state: "Andhra Pradesh", students: 1320 },
];

const neetPgDateData = [
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

const neetPgCollegeData = [
  { college: "Osmania", students: 840 },
  { college: "Gandhi Medical", students: 760 },
  { college: "KIMS", students: 680 },
  { college: "Apollo", students: 620 },
  { college: "Narayana", students: 540 },
];

const neetPgPackageData = [
  { name: "Premium", value: 2840 },
  { name: "Standard", value: 1920 },
  { name: "Basic", value: 1240 },
];

/* =========================================
   NEET SS DATA
========================================= */

const neetSsStateData = [
  { state: "Telangana", students: 1640 },
  { state: "Karnataka", students: 1480 },
  { state: "Maharashtra", students: 1320 },
  { state: "Tamil Nadu", students: 1180 },
  { state: "Kerala", students: 960 },
  { state: "Andhra Pradesh", students: 820 },
];

const neetSsDateData = [
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

const neetSsCollegeData = [
  { college: "Osmania", students: 540 },
  { college: "Gandhi Medical", students: 490 },
  { college: "KIMS", students: 440 },
  { college: "Apollo", students: 390 },
  { college: "Narayana", students: 350 },
];

const neetSsPackageData = [
  { name: "Premium", value: 1840 },
  { name: "Standard", value: 1260 },
  { name: "Basic", value: 820 },
];

/* =========================================
   FMGE DATA
========================================= */

const fmgeStateData = [
  { state: "Telangana", students: 1420 },
  { state: "Karnataka", students: 1280 },
  { state: "Maharashtra", students: 1160 },
  { state: "Tamil Nadu", students: 1020 },
  { state: "Kerala", students: 880 },
  { state: "Delhi", students: 760 },
];

const fmgeDateData = [
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

const fmgeCollegeData = [
  { college: "Osmania", students: 460 },
  { college: "Gandhi Medical", students: 420 },
  { college: "KIMS", students: 380 },
  { college: "Apollo", students: 340 },
  { college: "Narayana", students: 300 },
];

const fmgePackageData = [
  { name: "Premium", value: 1420 },
  { name: "Standard", value: 980 },
  { name: "Basic", value: 620 },
];

/* =========================================
   GRAPH COMPONENT
========================================= */

function TrendChart({
  chart,
  colorSet,
}: {
  chart: ChartItem;
  colorSet: string[];
}) {
  /* =========================================
     LINE CHART
  ========================================= */

  if (chart.type === "line") {
    return (
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <LineChart
          data={chart.data}
          margin={{
            top: 15,
            right: 15,
            left: -10,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e2e8f0"
          />

          <XAxis
            dataKey={chart.xKey}
            tickLine={false}
            axisLine={false}
            tick={{
              fontSize: 11,
              fill: "#64748b",
            }}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{
              fontSize: 11,
              fill: "#64748b",
            }}
          />

          <Tooltip
            cursor={{
              stroke: "#bfdbfe",
              strokeWidth: 1,
            }}
            contentStyle={{
              borderRadius: "10px",
              border: "1px solid #e2e8f0",
              boxShadow:
                "0 6px 20px rgba(37, 99, 235, 0.12)",
              backgroundColor: "#ffffff",
              fontSize: "12px",
            }}
          />

          <Line
            type="monotone"
            dataKey={chart.dataKey}
            stroke={colorSet[4]}
            strokeWidth={3}
            className="chart-line-glow"
            dot={{
              r: 3.5,
              fill: colorSet[1],
              stroke: colorSet[4],
              strokeWidth: 2,
            }}
            activeDot={{
              r: 6,
              fill: colorSet[5],
              stroke: "#ffffff",
              strokeWidth: 2,
              className: "chart-dot-glow",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  /* =========================================
     BAR CHART
  ========================================= */

  if (chart.type === "bar") {
    return (
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <BarChart
          data={chart.data}
          margin={{
            top: 15,
            right: 15,
            left: -10,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e2e8f0"
          />

          <XAxis
            dataKey={chart.xKey}
            tickLine={false}
            axisLine={false}
            tick={{
              fontSize: 10,
              fill: "#64748b",
            }}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{
              fontSize: 11,
              fill: "#64748b",
            }}
          />

          <Tooltip
            cursor={{
              fill: "#eff6ff",
            }}
            contentStyle={{
              borderRadius: "10px",
              border: "1px solid #e2e8f0",
              boxShadow:
                "0 6px 20px rgba(37, 99, 235, 0.12)",
              backgroundColor: "#ffffff",
              fontSize: "12px",
            }}
          />

          <Bar
            dataKey={chart.dataKey}
            radius={[6, 6, 0, 0]}
            className="chart-bar-glow"
          >
            {chart.data.map((_, index) => (
              <Cell
                key={`bar-cell-${index}`}
                fill={
                  colorSet[index % colorSet.length]
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }

  /* =========================================
     PIE CHART
  ========================================= */

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <PieChart>
        <Pie
          data={chart.data}
          dataKey={chart.dataKey}
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={78}
          innerRadius={40}
          paddingAngle={3}
          className="chart-pie-glow"
        >
          {chart.data.map((_, index) => (
            <Cell
              key={`pie-cell-${index}`}
              fill={
                colorSet[index % colorSet.length]
              }
            />
          ))}
        </Pie>

        <Tooltip
          contentStyle={{
            borderRadius: "10px",
            border: "1px solid #e2e8f0",
            boxShadow:
              "0 6px 20px rgba(37, 99, 235, 0.12)",
            backgroundColor: "#ffffff",
            fontSize: "12px",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

/* =========================================
   CHART CARD
========================================= */

function ChartCard({
  chart,
  colorSet,
}: {
  chart: ChartItem;
  colorSet: string[];
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-blue-100 hover:shadow-md">

      {/* Chart Header */}
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900">
          {chart.title}
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          {chart.description}
        </p>
      </div>

      {/* Graph */}
      <div className="h-64 w-full">
        <TrendChart
          chart={chart}
          colorSet={colorSet}
        />
      </div>

    </div>
  );
}

/* =========================================
   TRENDS PAGE
========================================= */

function Trends() {
  const sections: {
    title: string;
    description: string;
    charts: ChartItem[];
  }[] = [
    /* =========================================
       PLAN ORDERS
    ========================================= */

    {
      title: "Plan Orders",
      description:
        "View order activity by location and date.",

      charts: [
        {
          title: "Get Order Details By State",
          description:
            "Orders received from different states.",
          type: "bar",
          data: orderStateData,
          dataKey: "orders",
          xKey: "state",
        },

        {
          title: "Get Order Details By Date",
          description:
            "Order activity across the year.",
          type: "line",
          data: orderDateData,
          dataKey: "orders",
          xKey: "date",
        },
      ],
    },

    /* =========================================
       NEET PG
    ========================================= */

    {
      title: "NEET PG",
      description:
        "Student and package trends for NEET PG.",

      charts: [
        {
          title: "Students All States",
          description:
            "Number of NEET PG students by state.",
          type: "bar",
          data: neetPgStateData,
          dataKey: "students",
          xKey: "state",
        },

        {
          title: "Students Date-Wise",
          description:
            "NEET PG student registrations over time.",
          type: "line",
          data: neetPgDateData,
          dataKey: "students",
          xKey: "date",
        },

        {
          title: "Students State-Wise",
          description:
            "State-wise distribution of students.",
          type: "bar",
          data: neetPgStateData,
          dataKey: "students",
          xKey: "state",
        },

        {
          title: "Students College-Wise",
          description:
            "Students grouped by college.",
          type: "bar",
          data: neetPgCollegeData,
          dataKey: "students",
          xKey: "college",
        },

        {
          title: "Packages/Plans",
          description:
            "Distribution of selected packages.",
          type: "pie",
          data: neetPgPackageData,
          dataKey: "value",
        },
      ],
    },

    /* =========================================
       NEET SS
    ========================================= */

    {
      title: "NEET SS",
      description:
        "Student and package trends for NEET SS.",

      charts: [
        {
          title: "Students All States",
          description:
            "Number of NEET SS students by state.",
          type: "bar",
          data: neetSsStateData,
          dataKey: "students",
          xKey: "state",
        },

        {
          title: "Students Date-Wise",
          description:
            "NEET SS student registrations over time.",
          type: "line",
          data: neetSsDateData,
          dataKey: "students",
          xKey: "date",
        },

        {
          title: "Students State-Wise",
          description:
            "State-wise distribution of students.",
          type: "bar",
          data: neetSsStateData,
          dataKey: "students",
          xKey: "state",
        },

        {
          title: "Students College-Wise",
          description:
            "Students grouped by college.",
          type: "bar",
          data: neetSsCollegeData,
          dataKey: "students",
          xKey: "college",
        },

        {
          title: "Package/Plans",
          description:
            "Distribution of selected packages.",
          type: "pie",
          data: neetSsPackageData,
          dataKey: "value",
        },
      ],
    },

    /* =========================================
       FMGE
    ========================================= */

    {
      title: "FMGE",
      description:
        "Student and package trends for FMGE.",

      charts: [
        {
          title: "Students All States",
          description:
            "Number of FMGE students by state.",
          type: "bar",
          data: fmgeStateData,
          dataKey: "students",
          xKey: "state",
        },

        {
          title: "Students Date-Wise",
          description:
            "FMGE student registrations over time.",
          type: "line",
          data: fmgeDateData,
          dataKey: "students",
          xKey: "date",
        },

        {
          title: "Students State-Wise",
          description:
            "State-wise distribution of students.",
          type: "bar",
          data: fmgeStateData,
          dataKey: "students",
          xKey: "state",
        },

        {
          title: "Students College-Wise",
          description:
            "Students grouped by college.",
          type: "bar",
          data: fmgeCollegeData,
          dataKey: "students",
          xKey: "college",
        },

        {
          title: "Package/Plans",
          description:
            "Distribution of selected packages.",
          type: "pie",
          data: fmgePackageData,
          dataKey: "value",
        },
      ],
    },
  ];

  return (
    <div className="space-y-8">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Trends
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Analyze student, order and package trends across the platform.
        </p>
      </div>

      {/* =========================================
          GRAPH SECTIONS
      ========================================= */}

      {sections.map((section) => (
        <section
          key={section.title}
          className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
        >

          {/* Section Header */}
          <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">

            <div className="flex items-center gap-3">

              {/* Graph Icon */}
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 19V5" />
                  <path d="M4 19h16" />
                  <path d="M8 15v-3" />
                  <path d="M12 15V9" />
                  <path d="M16 15V6" />
                </svg>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Graph Data — {section.title}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {section.description}
                </p>
              </div>

            </div>

          </div>

          {/* Graph Grid */}
          <div className="grid grid-cols-1 gap-5 p-6 lg:grid-cols-2">

            {section.charts.map((chart, index) => (
              <ChartCard
                key={chart.title}
                chart={chart}
                colorSet={
                  chartColorSets[
                    index % chartColorSets.length
                  ]
                }
              />
            ))}

          </div>

        </section>
      ))}

    </div>
  );
}

export default Trends;