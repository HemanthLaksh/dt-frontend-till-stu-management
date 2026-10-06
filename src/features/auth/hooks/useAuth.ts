"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/store/hooks";

import {
  loginAdmin,
  verifyAdminOtp,
} from "../services/authService";

import {
  setAuthenticated,
  setOtpPending,
} from "../slices/authSlice";

import type {
  AdminUser,
  LoginCredentials,
} from "../types/auth.types";

export function useAuth() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    null,
  );

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        setLoading(true);
        setError(null);

        const response =
          await loginAdmin(credentials);

        if (
          response.status !== "Y" ||
          !response.admin ||
          response.admin.length === 0
        ) {
          setError(
            response.message ||
              "Invalid username or password.",
          );

          return false;
        }

        const admin = response.admin[0];

        const allowedRoles = [
          "AD",
          "ZZ",
          "PR",
        ];

        if (
          !allowedRoles.includes(admin.adminRole)
        ) {
          setError(
            "Access denied. You do not have permission to access Admin Services.",
          );

          return false;
        }

        dispatch(setOtpPending(admin));

        router.push("/login/verify-otp");

        return true;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to sign in. Please try again.",
        );

        return false;
      } finally {
        setLoading(false);
      }
    },
    [dispatch, router],
  );

  const verifyOtp = useCallback(
  async (
    adminEmail: string,
    otp: string,
  ) => {
      try {
        setLoading(true);
        setError(null);

        const response =
        await verifyAdminOtp(
          adminEmail,
          otp,
        );

        if (response.status !== "Y") {
          setError(
            response.message ||
              "Invalid OTP. Please try again.",
          );

          return false;
        }

        return true;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to verify OTP.",
        );

        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

 const completeAuthentication = useCallback(
  (admin: AdminUser) => {
    console.log("🔥 COMPLETE AUTH CALLED");

    dispatch(setAuthenticated(admin));

    sessionStorage.setItem(
      "dt-admin-auth",
      JSON.stringify({
        admin,
        isAuthenticated: true,
        otpPending: false,
      }),
    );

    console.log(
      "🔥 STORAGE:",
      sessionStorage.getItem("dt-admin-auth"),
    );

    router.replace("/home");
  },
  [dispatch, router],
);

  return {
    login,
    verifyOtp,
    completeAuthentication,
    loading,
    error,
    setError,
  };
}