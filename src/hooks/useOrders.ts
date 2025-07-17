"use client";

import { OrdersContext } from "@/context/OrdersContext";
import { useContext } from "react";

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) throw new Error("useOrders must be used within OrdersProvider");
  return context;
};
