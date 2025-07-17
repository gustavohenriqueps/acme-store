"use client";

// React
import React from "react";
import { useFormContext } from "react-hook-form";

// Icones
import { Check } from "lucide-react";

// Next-Intl
import { useTranslations } from "next-intl";

// Utils
import { formatPrice } from "@/lib/utils";
import { shippingRates } from "@/lib/constants";

// Tipos
import { CurrencyType } from "@/data/types";

type ShippingType = "standard" | "express";

type FormValues = {
  shippingMethod: ShippingType;
};

interface DeliveryMethodSelectionProps {
  currency: CurrencyType;
}

const DeliveryMethodSelection: React.FC<DeliveryMethodSelectionProps> = ({
  currency,
}) => {
  const t = useTranslations("checkoutForm");
  const { watch, setValue } = useFormContext<FormValues>();

  return (
    <div className="space-y-4">
      <h2 className="text-lg lg:text-2xl font-semibold">
        {t("deliveryMethod.title")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(["standard", "express"] as ShippingType[]).map((method) => (
          <div
            key={method}
            role="button"
            title={t(`deliveryMethod.${method}.title`)}
            className={`flex flex-col gap-1 border-2 rounded-md p-4 bg-white cursor-pointer ${
              watch("shippingMethod") === method ? "border-indigo-600" : ""
            }`}
            onClick={() => setValue("shippingMethod", method)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium">
                {t(`deliveryMethod.${method}.title`)}
              </h3>
              {watch("shippingMethod") === method && (
                <Check className="size-4 text-white bg-indigo-500 rounded-full p-px" />
              )}
            </div>
            <h4 className="text-zinc-600">
              {t(`deliveryMethod.${method}.description`)}
            </h4>
            <h5 className="mt-2 font-medium">
              {formatPrice(shippingRates[currency][method], currency)}
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryMethodSelection;
