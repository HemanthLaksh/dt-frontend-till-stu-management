"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { hydrateAuth, setAuthHydrated } from "@/features/auth/slices/authSlice";

export default function AuthHydrator() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      const storedAuth = sessionStorage.getItem("dt-admin-auth");

      if (storedAuth) {
        const authState = JSON.parse(storedAuth);

        dispatch(hydrateAuth(authState));
      }
    } catch {
      sessionStorage.removeItem("dt-admin-auth");
    } finally {
      dispatch(setAuthHydrated());
    }
  }, [dispatch]);

  return null;
}
