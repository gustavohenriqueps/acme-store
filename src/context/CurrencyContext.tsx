"use client";
import { CurrencyContextProps, CurrencyType } from "@/data/types";
import { createContext, ReactNode, useEffect, useState } from "react";

export const CurrencyContext = createContext<CurrencyContextProps | undefined>(
  undefined
);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyType>("BRL");

  useEffect(() => {
    const stored = localStorage.getItem("store_currency");
    if (stored === "BRL" || stored === "USD") {
      setCurrencyState(stored);
    }
  }, []);

  const setCurrency = (currency: CurrencyType) => {
    localStorage.setItem("store_currency", currency);
    setCurrencyState(currency);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}
