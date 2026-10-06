"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarScroll from "@/components/common/SidebarScroll";
import {
  Activity,
  BarChart3,
  BookOpen,
  ClipboardList,
  FileBarChart,
  FileText,
  GraduationCap,
  History,
  Home,
  LayoutDashboard,
  LifeBuoy,
  Megaphone,
  MessageSquare,
  NotebookPen,
  Package,
  Percent,
  PieChart,
  PlaySquare,
  Receipt,
  RefreshCcw,
  Settings,
  ShoppingCart,
  Smartphone,
  TicketPercent,
  TrendingUp,
  UserCheck,
  UserCog,
  UserPlus,
  Users,
  Wallet,
  Wrench,
  XCircle,
} from "lucide-react";

interface NavigationItem {
  label: string;
  icon: React.ElementType;
  path: string;
}

interface NavigationSection {
  section: string;
  items: NavigationItem[];
}

const navigationItems: NavigationSection[] = [
  // ============================================================
  // MAIN
  // ============================================================
  {
    section: "MAIN",
    items: [
      {
        label: "Home",
        icon: Home,
        path: "/home",
      },
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
      },
    ],
  },

  // ============================================================
  // ANALYTICS & REPORTS
  // ============================================================
  {
    section: "ANALYTICS & REPORTS",
    items: [
      {
        label: "Trends",
        icon: TrendingUp,
        path: "/trends",
      },
      {
        label: "Plan Accessed",
        icon: PlaySquare,
        path: "/plan-accessed",
      },
      {
        label: "Coupon Attempts",
        icon: TicketPercent,
        path: "/coupon-attempts",
      },
      {
        label: "Orders",
        icon: ShoppingCart,
        path: "/orders",
      },
      {
        label: "Notes Orders",
        icon: NotebookPen,
        path: "/notes-orders",
      },
      {
        label: "Analytics",
        icon: BarChart3,
        path: "/analytics",
      },
      {
        label: "BD Stats",
        icon: PieChart,
        path: "/bd-stats",
      },
      {
        label: "Activity Summary",
        icon: History,
        path: "/activity-summary",
      },
    ],
  },

  // ============================================================
  // STUDENT MANAGEMENT
  // ============================================================
  {
    section: "STUDENT MANAGEMENT",
    items: [
      {
        label: "Get Students",
        icon: Users,
        path: "/get-students",
      },
      {
        label: "Activate Student",
        icon: UserCheck,
        path: "/activate-student",
      },
      {
        label: "Student Activation",
        icon: UserCheck,
        path: "/student-activation",
      },
      {
        label: "Subscribers",
        icon: Users,
        path: "/subscribers",
      },
      {
        label: "Leads",
        icon: UserPlus,
        path: "/leads",
      },
      {
        label: "Quick Contacts",
        icon: Smartphone,
        path: "/quick-contacts",
      },
      {
        label: "Partners",
        icon: UserPlus,
        path: "/partners",
      },
    ],
  },

  // ============================================================
  // CONTENT & LEARNING
  // ============================================================
  {
    section: "CONTENT & LEARNING",
    items: [
      {
        label: "Question Bank",
        icon: BookOpen,
        path: "/question-bank",
      },
      {
        label: "Test Series",
        icon: ClipboardList,
        path: "/test-series",
      },
      {
        label: "Prod Quiz",
        icon: GraduationCap,
        path: "/prod-quiz",
      },
      {
        label: "Dev Quiz",
        icon: FileText,
        path: "/dev-quiz",
      },
      {
        label: "Live Classes",
        icon: PlaySquare,
        path: "/live-classes",
      },
      {
        label: "Videos",
        icon: PlaySquare,
        path: "/videos",
      },
      {
        label: "MCQ of the Day",
        icon: FileText,
        path: "/mcq-of-the-day",
      },
    ],
  },

  // ============================================================
  // SALES & ORDERS
  // ============================================================
  {
    section: "SALES & ORDERS",
    items: [
      {
        label: "Subscriptions",
        icon: Package,
        path: "/subscriptions",
      },
      {
        label: "Plan Accessed Reports",
        icon: FileBarChart,
        path: "/plan-accessed-reports",
      },
      {
        label: "Coupon Attempt Reports",
        icon: TicketPercent,
        path: "/coupon-attempt-reports",
      },
      {
        label: "Coupons Report",
        icon: Percent,
        path: "/coupons-report",
      },
      {
        label: "Faculty Sales Tracker",
        icon: TrendingUp,
        path: "/faculty-sales-tracker",
      },
    ],
  },

  // ============================================================
  // SUPPORT & FEEDBACK
  // ============================================================
  {
    section: "SUPPORT & FEEDBACK",
    items: [
      {
        label: "AnswerDesk",
        icon: LifeBuoy,
        path: "/answerdesk",
      },
      {
        label: "Feedback",
        icon: MessageSquare,
        path: "/feedback",
      },
      {
        label: "All Feedback",
        icon: MessageSquare,
        path: "/all-feedback",
      },
      {
        label: "Rate APP",
        icon: Smartphone,
        path: "/rate-app",
      },
    ],
  },

  // ============================================================
  // OPERATIONS
  // ============================================================
  {
    section: "OPERATIONS",
    items: [
      {
        label: "Maintenance",
        icon: Wrench,
        path: "/maintenance",
      },
      {
        label: "App Contact Us",
        icon: MessageSquare,
        path: "/app-contact-us",
      },
    ],
  },

  // ============================================================
  // REPORTS
  // ============================================================
  {
    section: "REPORTS",
    items: [
      {
        label: "Student Reports",
        icon: FileBarChart,
        path: "/student-reports",
      },
      {
        label: "Order Reports",
        icon: FileBarChart,
        path: "/order-reports",
      },
      {
        label: "Accounts Reports",
        icon: Wallet,
        path: "/accounts-reports",
      },
      {
        label: "Leaderboard Report",
        icon: BarChart3,
        path: "/leaderboard-report",
      },
      {
        label: "Test Series Accessed",
        icon: ClipboardList,
        path: "/test-series-accessed",
      },
    ],
  },

  // ============================================================
  // SPECIAL
  // ============================================================
  {
    section: "SPECIAL",
    items: [
      {
        label: "Doc Desk PG",
        icon: GraduationCap,
        path: "/doc-desk/pg",
      },
      {
        label: "Doc Desk SS",
        icon: GraduationCap,
        path: "/doc-desk/ss",
      },
      {
        label: "Doc Desk FMGE",
        icon: GraduationCap,
        path: "/doc-desk/fmge",
      },
      {
        label: "Privacy Bug Report",
        icon: XCircle,
        path: "/privacy-bug-report",
      },
      {
        label: "Get Student OTP",
        icon: Smartphone,
        path: "/get-student-otp",
      },
      {
        label: "Create Order",
        icon: ShoppingCart,
        path: "/create-order",
      },
      {
        label: "Profile Change",
        icon: UserCog,
        path: "/profile-change",
      },
      {
        label: "Get Signup OTP",
        icon: Smartphone,
        path: "/get-signup-otp",
      },
      {
        label: "Operations",
        icon: Activity,
        path: "/operations",
      },
      {
        label: "Refund Amount",
        icon: RefreshCcw,
        path: "/refund-amount",
      },
      {
        label: "B2B Activation",
        icon: UserCheck,
        path: "/b2b-activation",
      },
      {
        label: "Banner Creation",
        icon: Megaphone,
        path: "/banner-creation",
      },
      {
        label: "Payment Link Generation",
        icon: Wallet,
        path: "/payment-link-generation",
      },
      {
        label: "Notes Addon",
        icon: NotebookPen,
        path: "/notes-addon",
      },
      {
        label: "Subscription Order Report",
        icon: Receipt,
        path: "/subscription-order-report",
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isItemActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }

    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-200 bg-slate-50">
      {/* =====================================================
          LOGO
      ====================================================== */}

      <div className="flex h-20 shrink-0 items-center border-b border-slate-200 bg-white px-6">
        <Link
          href="/"
          aria-label="Go to Home"
          className="flex items-center gap-3"
        >
          {/* Logo */}

          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md">
            <img
              src="/DTlogo.png"
              alt="DocTutorials"
              className="h-full w-full object-contain"
            />
          </div>

          {/* Brand */}

          <div>
            <p className="text-sm font-semibold text-slate-900">
              DT Admin
            </p>

            <p className="text-xs text-slate-500">
              Admin Portal
            </p>
          </div>
        </Link>
      </div>

      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      <SidebarScroll>
        {navigationItems.map((section) => (
          <div
            key={section.section}
            className="mb-8"
          >
            {/* Section Title */}

            <p className="mb-2.5 px-3 text-[11px] font-semibold tracking-wider text-slate-400">
              {section.section}
            </p>

            {/* Navigation Items */}

            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = isItemActive(item.path);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    href={item.path}
                    className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[15px] font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-blue-100 text-blue-700 shadow-sm"
                        : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                    }`}
                  >
                    {/* Icon */}

                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center transition-colors ${
                        isActive
                          ? "text-blue-600"
                          : "text-slate-400 group-hover:text-blue-600"
                      }`}
                    >
                      <Icon
                        size={19}
                        strokeWidth={2}
                      />
                    </span>

                    {/* Label */}

                    <span className="truncate">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </SidebarScroll>

      {/* =====================================================
          SETTINGS
      ====================================================== */}

      <div className="shrink-0 border-t border-slate-200 bg-slate-50 p-3">
        <Link
          href="/settings"
          className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-medium transition-all duration-200 ${
            isItemActive("/settings")
              ? "bg-blue-100 text-blue-700 shadow-sm"
              : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
          }`}
        >
          <span
            className={`flex h-5 w-5 items-center justify-center transition-colors ${
              isItemActive("/settings")
                ? "text-blue-600"
                : "text-slate-400 group-hover:text-blue-600"
            }`}
          >
            <Settings
              size={19}
              strokeWidth={2}
            />
          </span>

          <span>
            Settings
          </span>
        </Link>
      </div>
    </aside>
  );
}