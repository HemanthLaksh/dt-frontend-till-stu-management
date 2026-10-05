"use client";

import { useState } from "react";

import { activateStudent } from "../services/activateStudentService";

import type {
  ActivateStudentForm,
  ActivateStudentResponse,
} from "../types/activateStudent.types";

export default function useActivateStudent() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] =
    useState<ActivateStudentResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submitActivation = async (
    form: ActivateStudentForm,
  ) => {
    setIsLoading(true);
    setResponse(null);
    setError(null);

    try {
      const studentId = form.studentId.trim();
      const mobile = form.mobile.trim();
      const email = form.email.trim();

      const result = await activateStudent({
        studentID: studentId
          ? Number(studentId)
          : undefined,
        mobile: mobile || undefined,
        email: email || undefined,
      });

      setResponse(result);

      return result;
    } catch {
      const message =
        "Unable to activate student. Please try again.";

      setError(message);

      return {
        status: "N" as const,
        message,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitActivation,
    isLoading,
    response,
    error,
  };
}