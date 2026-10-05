"use client";

import { useCallback, useState } from "react";

import {
  getNotesOrders,
  updateNotesOrderStatus,
} from "../services/notesOrders.service";

import type {
  NotesOrder,
  NotesOrderStatus,
} from "../types/notesOrders.types";

export function useNotesOrders() {
  const [orders, setOrders] = useState<NotesOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(
    async (courseId: number, status: NotesOrderStatus) => {
      try {
        setLoading(true);
        setError(null);

        const data = await getNotesOrders(courseId, status);

        setOrders(data);
      } catch (err) {
        setOrders([]);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to fetch notes orders",
        );
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const updateStatus = useCallback(
    async (
      notesOrderId: number,
      status: NotesOrderStatus,
      courierTrackingNo = "",
    ) => {
      try {
        setUpdating(true);
        setError(null);

        const message = await updateNotesOrderStatus(
          notesOrderId,
          status,
          courierTrackingNo,
        );

        return {
          success: true,
          message,
        };
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Unable to update order status";

        setError(message);

        return {
          success: false,
          message,
        };
      } finally {
        setUpdating(false);
      }
    },
    [],
  );

  const clearOrders = useCallback(() => {
    setOrders([]);
    setError(null);
  }, []);

  return {
    orders,
    loading,
    updating,
    error,
    fetchOrders,
    updateStatus,
    clearOrders,
  };
}