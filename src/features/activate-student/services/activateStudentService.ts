import apiClient from "@/services/api/client";

import type {
  ActivateStudentRequest,
  ActivateStudentResponse,
} from "../types/activateStudent.types";

const INTERNAL_ACTIVATE_ENDPOINT =
  "/Operations/activateStudentAccount";

const EXTERNAL_ACTIVATE_ENDPOINT =
  "/api/dailyops/activate-student/";

export async function activateStudent(
  request: ActivateStudentRequest,
): Promise<ActivateStudentResponse> {
  if (request.mobile) {
    const response =
      await apiClient.post<ActivateStudentResponse>(
        EXTERNAL_ACTIVATE_ENDPOINT,
        {
          mobile: request.mobile,
        },
      );

    return response.data;
  }

  if (request.studentID !== undefined) {
    const response =
      await apiClient.post<ActivateStudentResponse>(
        INTERNAL_ACTIVATE_ENDPOINT,
        {
          studentID: request.studentID,
        },
      );

    return response.data;
  }

  if (request.email) {
    const response =
      await apiClient.post<ActivateStudentResponse>(
        INTERNAL_ACTIVATE_ENDPOINT,
        {
          email: request.email,
        },
      );

    return response.data;
  }

  return {
    status: "N",
    message:
      "Please provide Student ID, Mobile Number, or Email ID.",
  };
}