"use client";

import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { Order, OrdersContextType } from "@/data/types";
import { AuthContext } from "./AuthContext";

export const OrdersContext = createContext<OrdersContextType>({
  lastOrder: null,
  orders: [],
  isLoadingOrders: true,
  createOrder: () => {},
});

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(AuthContext)!;
  const [orders, setOrders] = useState<Order[]>([]);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  const getOrdersKey = () => (user ? `orders:${user.email}` : null);

  // Carrega os pedidos do usuário atual
  useEffect(() => {
    if (!user) {
      setOrders([]);
      setLastOrder(null);
      setIsLoadingOrders(false);
      return;
    }

    try {
      const key = getOrdersKey();
      const saved = key ? localStorage.getItem(key) : null;
      const parsed = saved ? JSON.parse(saved) : [];
      setOrders(parsed);
      setLastOrder(parsed[parsed.length - 1] || null);
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
      setOrders([]);
    } finally {
      setIsLoadingOrders(false);
    }
  }, [user]);

  // Atualiza localStorage sempre que orders muda
  useEffect(() => {
    if (!user || isLoadingOrders) return;
    const key = getOrdersKey();
    if (key) localStorage.setItem(key, JSON.stringify(orders));
    setLastOrder(orders[orders.length - 1] || null);
  }, [orders, user, isLoadingOrders]);

  const createOrder = useCallback(
    (orderData: Omit<Order, "id" | "date">) => {
      if (!user) return;
      const newOrder: Order = {
        id: uuidv4(),
        date: new Date().toISOString(),
        ...orderData,
      };
      setOrders((prev) => [...prev, newOrder]);
    },
    [user]
  );

  return (
    <OrdersContext.Provider
      value={{ orders, lastOrder, isLoadingOrders, createOrder }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
