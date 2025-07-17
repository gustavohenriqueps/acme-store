"use client";

import { Order } from "@/data/types";
import { useTranslations } from "next-intl";

type ShippingDetailsProps = {
  order: Order;
};

export const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  const t = useTranslations("thanksPage");
  const { shippingAddress, paymentInformation } = order;

  return (
    <div className="grid grid-cols-1 gap-4 border-b pb-8 sm:grid-cols-2">
      {/* Endereço */}
      <div className="space-y-1 text-sm font-medium text-muted-foreground ">
        <h4 className="mb-2 font-semibold text-foreground">
          {t("shippingAddress")}
        </h4>
        {shippingAddress && (
          <>
            <h5>
              {shippingAddress.firstName} {shippingAddress.lastName}
            </h5>
            <h5>{shippingAddress.address}</h5>
            <h5>
              {shippingAddress.postalCode}, {shippingAddress.state},{" "}
              {t(`countries.${shippingAddress.country}`)}
            </h5>
          </>
        )}
      </div>

      {/* Pagamento */}
      <div className="space-y-1 text-sm font-medium text-muted-foreground">
        <h4 className="mb-2 font-semibold text-foreground">
          {t("paymentInformation")}
        </h4>
        {paymentInformation && (
          <>
            <h5>{t("endingWith", { last4: paymentInformation.cardLast4 })}</h5>
            <h5>{t("expires", { date: paymentInformation.expirationDate })}</h5>
          </>
        )}
      </div>
    </div>
  );
};
