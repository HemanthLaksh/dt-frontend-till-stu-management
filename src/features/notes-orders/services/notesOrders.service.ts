import apiClient from "@/services/api/client";

import type {
  NotesOrder,
  NotesOrderStatus,
} from "../types/notesOrders.types";

interface GetNotesOrdersResponse {
  gatewayResponse?: {
    status?: {
      isSuccess?: boolean;
      message?: string;
    };
    response?: {
      order?: NotesOrder[];
    };
  };
}

interface UpdateNotesOrderResponse {
  gatewayResponse?: {
    status?: {
      isSuccess?: boolean;
      message?: string;
    };
  };
}

export async function getNotesOrders(
  courseId: number,
  status: NotesOrderStatus,
): Promise<NotesOrder[]> {
  const response =
    await apiClient.post<GetNotesOrdersResponse>(
      "/api/admin/get-hard-notes-orders/",
      {
        gatewayRequest: {
          request: {
            courseId,
            status,
          },
        },
      },
    );

  const gatewayResponse = response.data.gatewayResponse;

  if (!gatewayResponse?.status?.isSuccess) {
    throw new Error(
      gatewayResponse?.status?.message ?? "Failed to fetch notes orders",
    );
  }

  return gatewayResponse.response?.order ?? [];
}

export async function updateNotesOrderStatus(
  notesOrderId: number,
  status: NotesOrderStatus,
  courierTrackingNo: string = "",
): Promise<string> {
  const response =
    await apiClient.post<UpdateNotesOrderResponse>(
      "/api/admin/update-hard-notes-status/",
      {
        gatewayRequest: {
          request: {
            notesOrderId,
            status,
            courierTrackingNo,
          },
        },
      },
    );

  const gatewayResponse = response.data.gatewayResponse;

  if (!gatewayResponse?.status?.isSuccess) {
    throw new Error(
      gatewayResponse?.status?.message ?? "Failed to update order status",
    );
  }

  return gatewayResponse.status.message ?? "Order status updated successfully";
}