"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAppSelector } from "@/store/hooks";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const { isAuthenticated, otpPending, isHydrated } = useAppSelector(
    (state) => state.auth,
  );

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const isAuthPage = pathname === "/login" || pathname === "/login/verify-otp";

  useEffect(() => {
    if (!isHydrated) return;

    // Fully authenticated users cannot access authentication pages.
    if (isAuthenticated && !otpPending) {
      if (isAuthPage) {
        router.replace("/dashboard");
      }

      return;
    }

    // Users who have not completed OTP verification must verify it.
    if (otpPending) {
      if (pathname !== "/login/verify-otp") {
        router.replace("/login/verify-otp");
      }

      return;
    }

    // Unauthenticated users cannot access protected pages.
    if (!isAuthPage) {
      router.replace("/login");
    }
  }, [isHydrated, isAuthenticated, otpPending, isAuthPage, pathname, router]);

  // Wait until authentication restoration has completed.
  if (!isHydrated) {
    return null;
  }

  // Prevent protected content from rendering while redirecting.
  if (isAuthenticated && !otpPending && isAuthPage) {
    return null;
  }

  if (otpPending && pathname !== "/login/verify-otp") {
    return null;
  }

  if (!isAuthenticated && !otpPending && !isAuthPage) {
    return null;
  }

  // Render login and OTP pages without the application layout.
  if (isAuthPage) {
    return <>{children}</>;
  }

  const toggleSidebar = () => {
    setIsSidebarCollapsed((previous) => !previous);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />

      <Header
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={toggleSidebar}
      />

      <main
        className={`pt-20 transition-[margin] duration-300 ${
          isSidebarCollapsed ? "ml-0" : "ml-64"
        }`}
      >
        <div className="min-h-[calc(100vh-5rem)] p-8">{children}</div>
      </main>
    </div>
  );
}
