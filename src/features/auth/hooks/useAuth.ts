"use client";

import { encryptData } from "@/utils/crypto";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/store/hooks";

import { loginAdmin, verifyAdminOtp } from "../services/authService";

import {
  setAuthenticated,
  setOtpPending,
  setOtpVerified,
  clearOtpPending,
} from "../slices/authSlice";

import type { AdminUser, LoginCredentials } from "../types/auth.types";

// Shared in-memory credentials across useAuth() instances.
// These are NOT stored in Session Storage before OTP succeeds.
let pendingCredentials: LoginCredentials | null = null;

export function useAuth() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        setLoading(true);
        setError(null);

        // Clear any previous authentication data.
        sessionStorage.removeItem("dt-admin-encrypted-credentials");
        sessionStorage.removeItem("dt-admin-auth");

        pendingCredentials = null;

        const response = await loginAdmin(credentials);

        if (
          response.status !== "Y" ||
          !response.admin ||
          response.admin.length === 0
        ) {
          setError(response.message || "Invalid username or password.");
          return false;
        }

        const admin = response.admin[0];
        const allowedRoles = ["AD", "ZZ", "PR"];

        if (!allowedRoles.includes(admin.adminRole)) {
          setError(
            "Access denied. You do not have permission to access Admin Services.",
          );
          return false;
        }

        // Keep credentials in memory until OTP succeeds.
        pendingCredentials = credentials;

        dispatch(setOtpPending(admin));

        router.push("/login/verify-otp");

        return true;
      } catch (err) {
        pendingCredentials = null;

        setError("Invalid username or password. Please try again.");

        return false;
      } finally {
        setLoading(false);
      }
    },
    [dispatch, router],
  );

  const verifyOtp = useCallback(
    async (adminEmail: string, otp: string) => {
      try {
        setLoading(true);
        setError(null);

        const response = await verifyAdminOtp(adminEmail, otp);

        if (response.status !== "Y") {
          setError("Invalid OTP. Please check the code and try again.");
          return false;
        }

        dispatch(setOtpVerified());

        return true;
      } catch {
        setError("Invalid OTP. Please check the code and try again.");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [dispatch],
  );

  const backToLogin = useCallback(() => {
    pendingCredentials = null;

    dispatch(clearOtpPending());

    setError(null);
    router.replace("/login");
  }, [dispatch, router]);

  const completeAuthentication = useCallback(
    async (admin: AdminUser, verified: boolean) => {
      if (!verified) {
        setError("Please verify your OTP before completing authentication.");
        return false;
      }

      const credentials = pendingCredentials;

      if (!credentials) {
        setError("Your login session has expired. Please log in again.");
        return false;
      }

      try {
        setLoading(true);
        setError(null);

        // Store credentials only after successful OTP verification.
        const encryptedCredentials = await encryptData(
          JSON.stringify(credentials),
        );

        sessionStorage.setItem(
          "dt-admin-encrypted-credentials",
          encryptedCredentials,
        );

        sessionStorage.setItem(
          "dt-admin-auth",
          JSON.stringify({
            admin,
            isAuthenticated: true,
            otpPending: false,
          }),
        );

        dispatch(setAuthenticated(admin));

        // Clear the temporary in-memory credentials.
        pendingCredentials = null;

        router.replace("/dashboard");

        return true;
      } catch (err) {
        sessionStorage.removeItem("dt-admin-encrypted-credentials");
        sessionStorage.removeItem("dt-admin-auth");

        setError(
          err instanceof Error
            ? err.message
            : "Unable to complete authentication. Please try again.",
        );

        return false;
      } finally {
        setLoading(false);
      }
    },
    [dispatch, router],
  );

  return {
    login,
    verifyOtp,
    completeAuthentication,
    loading,
    backToLogin,
    error,
    setError,
  };
}
