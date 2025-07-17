"use client";

import { CartContext } from "@/context/CartContext";
import { useContext } from "react";

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart precisa estar dentro do CartProvider");
  }
  return context;
};
