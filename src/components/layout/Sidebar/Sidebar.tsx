"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SidebarScroll from "@/components/common/SidebarScroll";
import {
  Activity,
  BarChart3,
  FileBarChart,
  History,
  LayoutDashboard,
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
  ChevronDown,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

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
        label: "Accounts Reports",
        icon: Wallet,
        path: "/accounts-reports",
      },
      {
        label: "Subscription Order Report",
        icon: Receipt,
        path: "/subscription-order-reports",
      },
      {
        label: "Coupon Attempt Reports",
        icon: TicketPercent,
        path: "/coupon-attempts-reports",
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
    ],
  },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const navigationRef = useRef<HTMLElement>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const isItemActive = useCallback(
    (path: string) => {
      if (path === "/") {
        return pathname === "/";
      }

      return pathname === path || pathname.startsWith(`${path}/`);
    },
    [pathname],
  );
  useEffect(() => {
    const activeSection = navigationItems.find((section) =>
      section.items.some((item) => isItemActive(item.path)),
    );

    if (!activeSection) return;

    const frameId = window.requestAnimationFrame(() => {
      setExpandedSections((previous) => {
        if (previous.includes(activeSection.section)) {
          return previous;
        }

        return [...previous, activeSection.section];
      });
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [pathname, isItemActive]);
  const [activePill, setActivePill] = useState({
    top: 0,
    height: 0,
    visible: false,
  });

  useLayoutEffect(() => {
    const updateActivePill = () => {
      const navigation = navigationRef.current;

      if (!navigation) return;

      const activeLink = navigation.querySelector<HTMLElement>(
        '[data-active="true"]',
      );

      if (!activeLink) {
        setActivePill((previous) => ({
          ...previous,
          visible: false,
        }));
        return;
      }

      const navigationRect = navigation.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();

      setActivePill({
        top: linkRect.top - navigationRect.top,
        height: linkRect.height,
        visible: true,
      });
    };

    updateActivePill();

    window.addEventListener("resize", updateActivePill);

    const observer = new MutationObserver(updateActivePill);

    if (navigationRef.current) {
      observer.observe(navigationRef.current, {
        attributes: true,
        subtree: true,
        attributeFilter: ["data-active"],
      });
    }

    return () => {
      window.removeEventListener("resize", updateActivePill);
      observer.disconnect();
    };
  }, [pathname, isCollapsed]);

  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900 transition-all duration-300 ${
        isCollapsed ? "-translate-x-full" : "translate-x-0"
      }`}
    >
      {/* =====================================================
          LOGO
      ====================================================== */}

      <div className="flex h-20 shrink-0 items-center border-b border-white/10 bg-slate-950 px-6">
        <Link
          href="/"
          aria-label="Go to Home"
          className="flex items-center gap-3"
        >
          {/* Logo */}

          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md">
            <Image
              src="/DTlogo.png"
              alt="DocTutorials"
              width={40}
              height={40}
              className="h-full w-full object-contain"
            />
          </div>

          {/* Brand */}

          <div>
            <p className="text-sm font-semibold text-white">DT Admin</p>

            <p className="text-xs text-slate-400">Admin Portal</p>
          </div>
        </Link>
      </div>

      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      {/* Navigation */}
      <SidebarScroll>
        <div className="space-y-1">
          {/* Dashboard - standalone item */}
          {(() => {
            const isActive = isItemActive("/dashboard");

            return (
              <Link
                href="/dashboard"
                data-active={isActive}
                className={`group relative flex w-full items-center gap-3 rounded-full px-3 py-2.5 text-left text-[15px] font-medium transition-all duration-300 ease-in-out ${
                  isActive
                    ? "bg-slate-100 !text-slate-900 shadow-sm shadow-black/10"
                    : "!text-white/90 hover:bg-white/80 hover:!text-slate-900"
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center transition-colors ${
                    isActive
                      ? "text-blue-600"
                      : "text-slate-400 group-hover:text-blue-600"
                  }`}
                >
                  <LayoutDashboard size={19} strokeWidth={2} />
                </span>

                <span className="truncate">Dashboard</span>
              </Link>
            );
          })()}

          {/* Collapsible navigation sections */}
          {navigationItems.map((section) => {
            const isExpanded = expandedSections.includes(section.section);

            const hasActiveItem = section.items.some((item) =>
              isItemActive(item.path),
            );

            return (
              <div key={section.section} className="pt-5">
                {/* Section heading */}
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  onClick={() => {
                    setExpandedSections((previous) =>
                      previous.includes(section.section)
                        ? previous.filter((name) => name !== section.section)
                        : [...previous, section.section],
                    );
                  }}
                  className="group mb-2.5 flex w-full items-center justify-between px-3 text-left text-[11px] font-semibold tracking-wider text-slate-300"
                >
                  <span
                    className={
                      hasActiveItem ? "text-slate-200" : "text-slate-300"
                    }
                  >
                    {section.section}
                  </span>

                  <ChevronDown
                    size={14}
                    className={`shrink-0 transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Section items - smooth expand/collapse */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                    isExpanded
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                  aria-hidden={!isExpanded}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="space-y-1">
                      {section.items.map((item) => {
                        const isActive = isItemActive(item.path);
                        const Icon = item.icon;

                        return (
                          <Link
                            key={item.label}
                            href={item.path}
                            data-active={isActive}
                            tabIndex={isExpanded ? 0 : -1}
                            className={`group relative flex w-full items-center gap-3 rounded-full px-3 py-2.5 text-left text-[15px] font-medium transition-all duration-300 ease-in-out ${
                              isActive
                                ? "bg-slate-100 !text-slate-900 shadow-sm shadow-black/10"
                                : "!text-white/90 hover:bg-white/80 hover:!text-slate-900"
                            }`}
                          >
                            <span
                              className={`flex h-5 w-5 shrink-0 items-center justify-center transition-colors ${
                                isActive
                                  ? "text-blue-600"
                                  : "text-slate-400 group-hover:text-blue-600"
                              }`}
                            >
                              <Icon size={19} strokeWidth={2} />
                            </span>

                            <span className="truncate">{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SidebarScroll>

      {/* =====================================================
          SETTINGS
      ====================================================== */}

      <div className="shrink-0 border-t border-white/10 bg-transparent p-3">
        <Link
          href="/settings"
          className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[15px] font-medium transition-all duration-200 ${
            isItemActive("/settings")
              ? "bg-blue-600 text-white shadow-sm shadow-blue-950/30"
              : "text-slate-200 hover:bg-white/10 hover:text-white"
          }`}
        >
          <span
            className={`flex h-5 w-5 shrink-0 items-center justify-center transition-colors ${
              isItemActive("/settings")
                ? "text-white"
                : "text-slate-300 group-hover:text-blue-300"
            }`}
          >
            <Settings size={19} strokeWidth={2} />
          </span>

          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
