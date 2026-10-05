"use client";

import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./index";
import AuthHydrator from "@/components/common/AuthHydrator";

export default function StoreProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthHydrator />
      {children}
    </Provider>
  );
}