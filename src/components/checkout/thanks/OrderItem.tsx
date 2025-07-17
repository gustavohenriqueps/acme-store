// Em um novo arquivo, ex: components/order/OrderItem.js
"use client";

import { CartItem, CurrencyType } from "@/data/types";

import { formatPrice, getColorLabel } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";

// Supondo que você tenha uma interface para o produto
// interface Product { ... }
interface OrderItemProps {
  product: CartItem;
  currency: CurrencyType;
  locale: "ptBR" | "enUS";
}

export const OrderItem = ({ product, currency, locale }: OrderItemProps) => {
  const t = useTranslations("thanksPage");

  return (
    <div className="flex justify-between gap-2.5 border-t py-6 last:border-b">
      <div className="flex w-full gap-4">
        <Image
          src={product.imagesUrl[0]}
          alt={product.alt[locale]}
          width={96}
          height={96}
          className="h-24 w-24 min-h-24 max-h-24 min-w-24 max-w-24 rounded object-cover"
        />
        <div className="space-y-2 text-sm font-medium">
          <h5>{product.name[locale]}</h5>
          <div className="flex items-center gap-2.5">
            <h5 className="text-muted-foreground">
              {getColorLabel(product.color, locale)}
            </h5>
            <span className="block h-4 w-px bg-neutral-400"></span>
            <h5 className="text-muted-foreground">{product.size}</h5>
          </div>
          <h5 className="font-normal text-muted-foreground">
            {t("quantity", { qty: product.quantity })}
          </h5>
        </div>
      </div>
      <h5 className="text-sm font-medium">
        {formatPrice(
          currency === "BRL" ? product.priceBRL : product.priceUSD,
          currency
        )}
      </h5>
    </div>
  );
};
