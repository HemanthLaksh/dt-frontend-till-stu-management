"use client";

import { useMemo, useState } from "react";

import {
  DUMMY_ORDERS,
} from "../constants/orders.constants";

import type {
  Order,
  OrderFilters,
} from "../types/orders.types";

export default function useOrders() {
  const [filters, setFilters] = useState<OrderFilters>({
    fromDate: "",
    toDate: "",
    course: "All Courses",
    status: "All Status",
    search: "",
  });

  const [loading, setLoading] = useState(false);

  const [orders, setOrders] = useState<Order[]>(
    [...DUMMY_ORDERS] as Order[],
  );

  const filteredOrders = useMemo(() => {
    const searchValue = filters.search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesSearch =
        !searchValue ||
        String(order.orderID).includes(searchValue) ||
        String(order.studentID).includes(searchValue) ||
        order.studentName.toLowerCase().includes(searchValue) ||
        order.mobileNo.includes(searchValue) ||
        order.email.toLowerCase().includes(searchValue);

      const matchesCourse =
        filters.course === "All Courses" ||
        order.course === filters.course;

      const matchesStatus =
        filters.status === "All Status" ||
        order.status === filters.status;

      const matchesFromDate =
        !filters.fromDate ||
        order.orderDate >= filters.fromDate;

      const matchesToDate =
        !filters.toDate ||
        order.orderDate <= filters.toDate;

      return (
        matchesSearch &&
        matchesCourse &&
        matchesStatus &&
        matchesFromDate &&
        matchesToDate
      );
    });
  }, [orders, filters]);

  const searchOrders = async () => {
    setLoading(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 400),
    );

    setLoading(false);
  };

  const clearFilters = () => {
    setFilters({
      fromDate: "",
      toDate: "",
      course: "All Courses",
      status: "All Status",
      search: "",
    });

    setOrders([...DUMMY_ORDERS] as Order[]);
  };

  return {
    filters,
    setFilters,
    orders,
    setOrders,
    filteredOrders,
    loading,
    searchOrders,
    clearFilters,
  };
}