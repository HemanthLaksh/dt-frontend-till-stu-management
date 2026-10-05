"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bell,
  ChevronDown,
  KeyRound,
  LogOut,
  Search,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/features/auth/slices/authSlice";
import Link from "next/link";

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    setIsProfileOpen(false);
    dispatch(logout());
    router.replace("/login");
  };

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

  return (
    <header className="fixed left-64 right-0 top-0 z-30 flex h-20 items-center border-b border-slate-200 bg-white px-8">
      {/* =====================================================
          LEFT - PAGE TITLE
      ====================================================== */}

      <div className="min-w-[220px]">
        <h1 className="text-lg font-semibold text-slate-900">
          Dashboard
        </h1>

        <p className="text-sm text-slate-500">
          Welcome back, Hemanth
        </p>
      </div>

      {/* =====================================================
          SEARCH
      ====================================================== */}

      <div className="mx-8 flex max-w-xl flex-1">
        <div className="flex w-full items-center rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 transition-colors focus-within:border-blue-300 focus-within:bg-white">
          <Search
            size={18}
            className="shrink-0 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search anything..."
            className="ml-3 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />

          <span className="rounded border border-slate-200 bg-white px-2 py-1 text-xs text-slate-400">
            ⌘ K
          </span>
        </div>
      </div>

      {/* =====================================================
          RIGHT SIDE
      ====================================================== */}

      <div className="flex items-center gap-5">
        {/* =================================================
            NOTIFICATIONS
        ================================================== */}

        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
        >
          <Bell size={20} />

          <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-semibold text-white">
            3
          </span>
        </button>

        {/* Divider */}

        <div className="h-8 w-px bg-slate-200" />

        {/* =================================================
            PROFILE
        ================================================== */}

        <div
          ref={profileRef}
          className="relative"
        >
          {/* Profile Button */}

          <button
            type="button"
            onClick={() => setIsProfileOpen((prev) => !prev)}
            aria-expanded={isProfileOpen}
            aria-haspopup="menu"
            className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-slate-50"
          >
            {/* Avatar */}

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
              H
            </div>

            {/* User Details */}

            <div className="text-left">
              <p className="text-sm font-semibold text-slate-800">
                Hemanth
              </p>

              <p className="text-xs text-slate-500">
                Administrator
              </p>
            </div>

            {/* Arrow */}

            <ChevronDown
              size={17}
              className={`ml-1 text-slate-400 transition-transform duration-200 ${
                isProfileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* =================================================
              PROFILE DROPDOWN
          ================================================== */}

          {isProfileOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full mt-3 w-60 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60"
            >
              {/* Profile Header */}

              <div className="border-b border-slate-100 px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                    H
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Hemanth
                    </p>

                    <p className="text-xs text-slate-500">
                      Administrator
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}

              <div className="p-2">
                {/* Edit Profile */}

                <Link
                  href="/profile"
                  role="menuitem"
                  onClick={() => setIsProfileOpen(false)}
                  className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors group-hover:bg-blue-100 group-hover:text-blue-600">
                    <UserRound size={17} />
                  </span>

                  <span>
                    Edit Profile
                  </span>
                </Link>

                {/* Change Password */}

                <Link
                  href="/change-password"
                  role="menuitem"
                  onClick={() => setIsProfileOpen(false)}
                  className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors group-hover:bg-blue-100 group-hover:text-blue-600">
                    <KeyRound size={17} />
                  </span>

                  <span>
                    Change Password
                  </span>
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

                  <span>
                    Logout
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}