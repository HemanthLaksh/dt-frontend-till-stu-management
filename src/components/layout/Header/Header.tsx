"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  KeyRound,
  LogOut,
  Search,
  UserRound,
  Menu,
  X,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/features/auth/slices/authSlice";
import Link from "next/link";
import { clearStoredToken } from "@/services/api/tokenStorage";

interface HeaderProps {
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

const searchableModules = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Trends", path: "/trends" },
  { label: "Plan Accessed", path: "/plan-accessed" },
  { label: "Coupon Attempts", path: "/coupon-attempts" },
  { label: "Orders", path: "/orders" },
  { label: "Notes Orders", path: "/notes-orders" },
  { label: "Analytics", path: "/analytics" },
  { label: "BD Stats", path: "/bd-stats" },
  { label: "Activity Summary", path: "/activity-summary" },
  { label: "Get Students", path: "/get-students" },
  { label: "Student Activation", path: "/student-activation" },
  { label: "Subscribers", path: "/subscribers" },
  { label: "Student Reports", path: "/student-reports" },
  { label: "Accounts Reports", path: "/accounts-reports" },
  { label: "Subscription Order Reports", path: "/subscription-order-reports" },
  { label: "Coupon Attempt Reports", path: "/coupon-attempts-reports" },
];

const moduleTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/trends": "Trends",
  "/plan-accessed": "Plan Accessed",
  "/coupon-attempts": "Coupon Attempts",
  "/orders": "Orders",
  "/notes-orders": "Notes Orders",
  "/analytics": "Analytics",
  "/bd-stats": "BD Stats",
  "/activity-summary": "Activity Summary",
  "/get-students": "Get Students",
  "/student-activation": "Student Activation",
  "/subscribers": "Subscribers",
  "/student-reports": "Student Reports",
  "/accounts-reports": "Accounts Reports",
  "/subscription-order-reports": "Subscription Order Reports",
  "/coupon-attempts-reports": "Coupon Attempt Reports",
};

export default function Header({
  isSidebarCollapsed,
  onToggleSidebar,
}: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const admin = useAppSelector((state) => state.auth.admin);

  const handleLogout = () => {
    setIsProfileOpen(false);

    sessionStorage.removeItem("dt-admin-encrypted-credentials");
    sessionStorage.removeItem("dt-admin-auth");

    clearStoredToken();

    dispatch(logout());

    router.replace("/login");
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const currentModuleTitle =
    moduleTitles[pathname] ?? "DocTutorials Admin Portal";

  const filteredModules = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return [];

    return searchableModules.filter((module) =>
      module.label.toLowerCase().startsWith(query),
    );
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleModuleNavigation(path: string) {
    setSearchQuery("");
    setIsSearchOpen(false);
    router.push(path);
  }

  return (
    <header
      className={`fixed right-0 top-0 z-30 flex h-20 items-center gap-5 border-b border-slate-200 bg-white px-6 transition-[left] duration-300 sm:px-8 ${
        isSidebarCollapsed ? "left-0" : "left-64"
      }`}
    >
      {/* Sidebar Toggle */}
      <button
        type="button"
        onClick={onToggleSidebar}
        aria-label={isSidebarCollapsed ? "Open sidebar" : "Close sidebar"}
        title={isSidebarCollapsed ? "Open sidebar" : "Close sidebar"}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-700 transition-colors duration-200 hover:bg-slate-100"
      >
        <Menu size={26} strokeWidth={2} />
      </button>

      {/* Page Title */}
      <div className="w-[240px] min-w-0 shrink-0">
        <h1
          className="truncate text-lg font-semibold text-slate-900"
          title={currentModuleTitle}
        >
          {currentModuleTitle}
        </h1>

        <p
          className="truncate text-sm text-slate-500"
          title={`Welcome back, ${admin?.name ?? "Administrator"}`}
        >
          Welcome back, {admin?.name ?? "Administrator"}
        </p>
      </div>

      {/* Module Navigation Search */}
      <div
        ref={searchRef}
        className="relative flex min-w-0 flex-1 justify-center"
      >
        <div className="flex w-full max-w-2xl items-center rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 transition-colors focus-within:border-blue-300 focus-within:bg-white">
          <Search size={18} className="shrink-0 text-slate-400" />

          <input
            type="text"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setIsSearchOpen(false);
              }

              if (event.key === "Enter" && filteredModules.length > 0) {
                event.preventDefault();
                handleModuleNavigation(filteredModules[0].path);
              }
            }}
            placeholder="Search modules..."
            aria-label="Search modules"
            // aria-expanded={isSearchOpen && searchQuery.trim().length > 0}
            aria-autocomplete="list"
            className="ml-3 min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setIsSearchOpen(false);
              }}
              aria-label="Clear search"
              className="ml-2 rounded p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={16} />
            </button>
          )}

          <span className="ml-3 shrink-0 rounded border border-slate-200 bg-white px-2 py-1 text-xs text-slate-400">
            ⌘ K
          </span>
        </div>

        {isSearchOpen && searchQuery.trim() && (
          <div
            role="listbox"
            className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/60"
          >
            {filteredModules.length > 0 ? (
              filteredModules.map((module) => (
                <button
                  key={module.path}
                  type="button"
                  role="option"
                  aria-selected={pathname === module.path}
                  onClick={() => handleModuleNavigation(module.path)}
                  className="flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                >
                  <Search size={16} className="mr-3 shrink-0 text-slate-400" />
                  {module.label}
                </button>
              ))
            ) : (
              <p className="px-3 py-4 text-sm text-slate-500">
                No matching modules found.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className="flex shrink-0 items-center gap-5">
        {/* Divider */}
        <div className="h-8 w-px bg-slate-200" />

        {/* Profile */}
        <div ref={profileRef} className="relative">
          <button
            type="button"
            onClick={() => setIsProfileOpen((prev) => !prev)}
            aria-expanded={isProfileOpen}
            aria-haspopup="menu"
            className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-slate-50"
          >
            {/* Avatar */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
              {admin?.name?.charAt(0).toUpperCase() ?? "A"}
            </div>

            {/* User Details */}
            <div className="text-left">
              <p className="text-sm font-semibold text-slate-800">
                {admin?.name ?? "Administrator"}
              </p>

              <p className="text-xs text-slate-500">Administrator</p>
            </div>

            {/* Arrow */}
            <ChevronDown
              size={17}
              className={`ml-1 text-slate-400 transition-transform duration-200 ${
                isProfileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full mt-3 w-60 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60"
            >
              {/* Profile Header */}
              <div className="border-b border-slate-100 px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                    {admin?.name?.charAt(0).toUpperCase() ?? "A"}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {admin?.name ?? "Administrator"}
                    </p>

                    <p className="text-xs text-slate-500">Administrator</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                <Link
                  href="/profile"
                  role="menuitem"
                  onClick={() => setIsProfileOpen(false)}
                  className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors group-hover:bg-blue-100 group-hover:text-blue-600">
                    <UserRound size={17} />
                  </span>

                  <span>Edit Profile</span>
                </Link>

                <Link
                  href="/change-password"
                  role="menuitem"
                  onClick={() => setIsProfileOpen(false)}
                  className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors group-hover:bg-blue-100 group-hover:text-blue-600">
                    <KeyRound size={17} />
                  </span>

                  <span>Change Password</span>
                </Link>
              </div>

              {/* Logout */}
              <div className="border-t border-slate-100 p-2">
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogout}
                  className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500 transition-colors group-hover:bg-red-100">
                    <LogOut size={17} />
                  </span>

                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
