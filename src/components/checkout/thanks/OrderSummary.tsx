"use client";

import { CurrencyType, Order } from "@/data/types";
import { shippingRates } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface OrderSummaryProps {
  order: Order;
  currency: CurrencyType;
}

export const OrderSummary = ({ order, currency }: OrderSummaryProps) => {
  const t = useTranslations("thanksPage");
  const shippingCost = shippingRates[currency][order.shippingMethod];

  return (
    <div className="flex flex-col gap-2 border-b py-4 text-sm font-medium">
      <div className="flex justify-between py-2">
        <h4 className="text-muted-foreground">{t("subtotal")}</h4>
        <h5>{formatPrice(order.subtotal, currency)}</h5>
      </div>
      <div className="flex justify-between py-2">
        <h4 className="text-muted-foreground">{t("shipping")}</h4>
        <h5>{formatPrice(shippingCost, currency)}</h5>
      </div>
      <div className="flex justify-between pt-2 pb-4">
        <h4 className="text-muted-foreground">{t("taxes")}</h4>
        <h5>{formatPrice(order.taxes, currency)}</h5>
      </div>
      <div className="flex justify-between pt-4 font-semibold">
        <h4>{t("total")}</h4>
        <h5>{formatPrice(order.total, currency)}</h5>
      </div>
    </div>
  );
};
