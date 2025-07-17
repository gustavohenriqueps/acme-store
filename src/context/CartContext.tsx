"use client";

import { CartItem, Product } from "@/data/types";
import {
  createContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

// Constante da chave do localStorage
const CART_KEY = "cart";

// Interface pública do contexto
interface CartContextData {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPriceBRL: number;
  totalPriceUSD: number;
}

export const CartContext = createContext<CartContextData | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Carrega o carrinho do localStorage no client
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_KEY);
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Erro ao carregar carrinho do localStorage:", error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Salva o carrinho sempre que ele mudar
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
      } catch (error) {
        console.error("Erro ao salvar carrinho no localStorage:", error);
      }
    }
  }, [cartItems, isInitialized]);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    const cartItemId = `${product.id}-${product.color}`;

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.cartItemId === cartItemId);
      if (existingItem) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          ...product,
          cartItemId,
          quantity,
        };
        return [...prev, newItem];
      }
    });
  }, []);

  const removeFromCart = useCallback((cartItemId: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.cartItemId !== cartItemId)
    );
  }, []);

  const updateQuantity = useCallback(
    (cartItemId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(cartItemId);
      } else {
        setCartItems((prev) =>
          prev.map((item) =>
            item.cartItemId === cartItemId ? { ...item, quantity } : item
          )
        );
      }
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPriceBRL = cartItems.reduce(
    (acc, item) => acc + item.priceBRL * item.quantity,
    0
  );
  const totalPriceUSD = cartItems.reduce(
    (acc, item) => acc + item.priceUSD * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPriceBRL,
        totalPriceUSD,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
