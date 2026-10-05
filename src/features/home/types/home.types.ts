import type { ReactNode } from "react";

export interface ProfileDetail {
  label: string;
  value: string;
}

export interface NavigationItem {
  title: string;
  description: string;
  path: string;
  icon: ReactNode;
}