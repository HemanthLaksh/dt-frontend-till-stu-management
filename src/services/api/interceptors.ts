import axios, { AxiosError } from "axios";
import apiClient from "./client";
import type { AppError } from "@/types/api";

const getAppError = (error: AxiosError): AppError => {
  const status = error.response?.status;

  switch (status) {
    case 400:
      return {
        code: "BAD_REQUEST",
        message: "The request could not be processed.",
        status,
      };

    case 401:
      return {
        code: "UNAUTHORIZED",
        message: "Your session has expired. Please log in again.",
        status,
      };

    case 403:
      return {
        code: "FORBIDDEN",
        message: "You do not have permission to perform this action.",
        status,
      };

    case 404:
      return {
        code: "NOT_FOUND",
        message: "The requested resource was not found.",
        status,
      };

    case 409:
      return {
        code: "CONFLICT",
        message: "The request conflicts with the current data.",
        status,
      };

    case 422:
      return {
        code: "VALIDATION_ERROR",
        message: "Please check the submitted information.",
        status,
      };

    case 429:
      return {
        code: "TOO_MANY_REQUESTS",
        message: "Too many requests. Please try again later.",
        status,
      };

    default:
      if (status && status >= 500) {
        return {
          code: "SERVER_ERROR",
          message: "Something went wrong on the server.",
          status,
        };
      }

      if (error.code === "ECONNABORTED") {
        return {
          code: "TIMEOUT",
          message: "The request timed out. Please try again.",
        };
      }

      if (!error.response) {
        return {
          code: "NETWORK_ERROR",
          message: "Unable to connect to the server.",
        };
      }

      return {
        code: "UNKNOWN_ERROR",
        message: "Something went wrong. Please try again.",
        status,
      };
  }
};

apiClient.interceptors.response.use(
  (response) => response,

  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const appError = getAppError(error);

      return Promise.reject(appError);
    }

    const unknownError: AppError = {
      code: "UNKNOWN_ERROR",
      message: "Something went wrong. Please try again.",
    };

    return Promise.reject(unknownError);
  },
);