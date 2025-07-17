"use client";

// React
import React, { useState } from "react";

// Next.js & Next-Intl
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

// Hooks
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useCurrency } from "@/hooks/useStore";

// Utils
import { shippingRates } from "@/lib/constants";

// Componentes
import ProductCart from "@/components/cart/ProductCart";
import CartSummary from "@/components/cart/CartSummary";
import { toast } from "sonner";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const { cartItems, totalPriceBRL, totalPriceUSD } = useCart();
  const { currency } = useCurrency();
  const { user } = useAuth();
  const router = useRouter();
  const t = useTranslations("cart");

  const [isLoading, setIsLoading] = useState(false);

  const shippingStandardCost = shippingRates[currency]["standard"];
  const subtotal = currency === "BRL" ? totalPriceBRL : totalPriceUSD;
  const total = subtotal + shippingStandardCost;

  const handleProceedToCheckout = async () => {
    if (!user) {
      router.push("/auth/sign-in");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push(`/checkout`);
    } catch (error) {
      console.error("Erro ao iniciar o checkout:", error);
      toast.error(t("checkoutErrorMessage"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container mx-auto p-6 md:px-[8%] max-w-full lg:max-w-screen-2xl space-y-6 mb-36">
      <h2 className="font-bold text-2xl">{t("title")}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-y-8 lg:gap-8">
        {/* Cart items */}
        <div className="flex flex-col gap-4 col-span-5">
          {cartItems.length === 0 ? (
            <Button
              variant={"link"}
              className="text-zinc-500 italic whitespace-normal block p-0 mb-40"
              asChild
            >
              <Link href={"/collection"}>{t("emptyCart")}</Link>
            </Button>
          ) : (
            cartItems.map((product) => (
              <ProductCart product={product} key={product.cartItemId} />
            ))
          )}
        </div>
        {/* Cart Summary */}
        <CartSummary
          subtotal={subtotal}
          shippingCost={shippingStandardCost}
          total={total}
          currency={currency}
          isLoading={isLoading}
          cartItemsCount={cartItems.length}
          user={user}
          onProceedToCheckout={handleProceedToCheckout}
        />
      </div>
    </section>
  );
};

export default Cart;
