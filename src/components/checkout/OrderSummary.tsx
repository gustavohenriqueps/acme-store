"use client";

// React Imports
import Image from "next/image";
import { useFormContext } from "react-hook-form";

// Icones
import { Trash, Loader2 } from "lucide-react";

// Componentes
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Next & Next-Intl Imports
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// Utils
import { formatPrice, getColorLabel } from "@/lib/utils";

import { quantityOptions } from "@/lib/constants";

// Tipos
import { CartItem, CurrencyType } from "@/data/types";
import { FormValues } from "@/app/[locale]/checkout/page";

interface OrderSummaryProps {
  cartItems: CartItem[];
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  subtotal: number;
  taxes: number;
  total: number;
  currency: CurrencyType;
  locale: "ptBR" | "enUS";
  isLoading: boolean;
  onPlaceOrder: () => void; // A função que dispara o handleSubmit
  shippingRates: Record<
    "BRL" | "USD",
    {
      standard: number;
      express: number;
    }
  >;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartItems,
  removeFromCart,
  updateQuantity,
  subtotal,
  taxes,
  total,
  currency,
  locale,
  isLoading,
  onPlaceOrder,
  shippingRates,
}) => {
  const t = useTranslations("orderSummary");
  // O FormValues aqui será o tipo completo importado do checkout/page.tsx
  const { watch } = useFormContext<FormValues>();

  const shippingMethod = watch("shippingMethod");
  // Use um fallback caso shippingMethod seja undefined no início
  const shippingCost = shippingRates[currency][shippingMethod || "standard"]; // Assume 'standard' como default se não houver seleção inicial

  return (
    <div className="space-y-8">
      <h2 className="text-lg lg:text-2xl tracking-tight font-semibold">
        {t("title")}
      </h2>

      <div className="border rounded-md bg-white ">
        <div className="grid grid-cols-1">
          {cartItems.map((item) => (
            <div
              key={item.cartItemId}
              className="flex gap-2 sm:gap-4 px-4 py-6 border-b"
            >
              <Link
                href={`/collection/${item.id}`}
                className="relative min-h-[80px] min-w-[80px] sm:size-30 sm:min-h-30"
              >
                <Image
                  src={item.imagesUrl[0]}
                  alt={
                    item.alt?.[locale] ?? item.name?.[locale] ?? "Product image"
                  }
                  fill
                  sizes="(max-width:640px) 96px, 120px"
                  className="object-cover rounded-sm "
                />
              </Link>

              <div className="text-xs sm:text-base flex flex-col justify-between">
                <div className="md:space-y-2">
                  <h3 className="font-medium">{item.name?.[locale]}</h3>
                  <h4 className="text-zinc-500">
                    {getColorLabel(item.color, locale)}
                  </h4>
                </div>
                <h5 className="font-medium">
                  {formatPrice(
                    currency === "BRL" ? item.priceBRL : item.priceUSD,
                    currency
                  )}
                </h5>
              </div>

              <div className="flex flex-col justify-between items-end flex-1">
                <Trash
                  className="size-4 min-w-4 cursor-pointer hover:fill-red-300 transition"
                  onClick={() => removeFromCart(item.cartItemId)}
                  aria-label={t("removeItem", {
                    itemName: item.name?.[locale] ?? "this item",
                  })}
                />
                <Select
                  value={item.quantity.toString()}
                  onValueChange={(value) =>
                    updateQuantity(item.cartItemId, Number(value))
                  }
                >
                  <SelectTrigger
                    className="w-16"
                    aria-label={t("selectQuantity")}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {quantityOptions.map((qty) => (
                        <SelectItem key={qty} value={qty.toString()}>
                          {qty}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
        </div>

        <div className="font-medium flex flex-col ">
          <div className="flex justify-between items-center p-4">
            <h5>{t("subtotal")}</h5>
            <h6>{formatPrice(subtotal, currency)}</h6>
          </div>
          <div className="flex justify-between items-center p-4">
            <h5>{t("shipping")}</h5>
            <h6>{formatPrice(shippingCost, currency)}</h6>
          </div>
          <div className="flex justify-between items-center p-4">
            <h5>{t("taxes")}</h5>
            <h6>{formatPrice(taxes, currency)}</h6>
          </div>
          <div className="flex justify-between items-center p-4 border-b">
            <h5 className="font-semibold">{t("total")}</h5>
            <h6>{formatPrice(total, currency)}</h6>
          </div>

          <Button
            size="lg"
            className="font-semibold m-4"
            disabled={isLoading || cartItems.length === 0}
            onClick={onPlaceOrder} // Chamará o handleSubmit do pai
            type="button"
            aria-label={t("confirmOrderButton")}
          >
            {isLoading ? (
              <Loader2 className="animate-spin size-5 mr-2" />
            ) : (
              t("confirmOrderButton")
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
