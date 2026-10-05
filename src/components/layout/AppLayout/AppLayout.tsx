"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({
  children,
}: AppLayoutProps) {
  const pathname = usePathname();

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/login/verify-otp";

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <Header />

      <main className="ml-64 pt-20">
        <div className="min-h-[calc(100vh-5rem)] p-8">
          {children}
        </div>
      </main>
    </div>
  );
}