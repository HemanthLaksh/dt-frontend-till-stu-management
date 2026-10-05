"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { hydrateAuth } from "@/features/auth/slices/authSlice";

export default function AuthHydrator() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedAuth = sessionStorage.getItem("dt-admin-auth");

    if (!storedAuth) {
      return;
    }

    try {
      const authState = JSON.parse(storedAuth);

      dispatch(hydrateAuth(authState));
    } catch {
      sessionStorage.removeItem("dt-admin-auth");
    }
  }, [dispatch]);

  return null;
}