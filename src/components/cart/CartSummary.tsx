// Shadcn UI Imports
import { Button } from "@/components/ui/button";

// Lucide Icons Imports
import { Loader2 } from "lucide-react";

// Next-Intl Imports
import { useTranslations } from "next-intl";

// Utility Imports
import { formatPrice } from "@/lib/utils";

// Type Imports
import { CurrencyType, User } from "@/data/types";

type CartSummaryProps = {
  subtotal: number;
  shippingCost: number;
  total: number;
  currency: CurrencyType;
  isLoading: boolean;
  cartItemsCount: number;
  user: User | null;
  onProceedToCheckout: () => void;
};

const CartSummary = ({
  subtotal,
  shippingCost,
  total,
  currency,
  isLoading,
  cartItemsCount,
  user,
  onProceedToCheckout,
}: CartSummaryProps) => {
  const t = useTranslations("cart");

  return (
    <div className="col-span-3 rounded-lg ">
      <h2 className="text-2xl tracking-tight font-semibold mb-4 border-b pb-3">
        {t("orderSummary")}
      </h2>
      <div className="flex flex-col gap-8">
        <div className="border-b flex justify-between py-4 text-zinc-600 font-medium">
          <h3> {t("subtotal")}</h3>
          <h4 className="text-black">{formatPrice(subtotal, currency)}</h4>
        </div>
        <div className="border-b flex justify-between py-4 text-zinc-600 font-medium">
          <h3> {t("standardDeliveryFee")}</h3>
          <h4 className="text-black">{formatPrice(shippingCost, currency)}</h4>
        </div>
        <div className="border-b flex justify-between py-4 font-medium text-lg">
          <h3>{t("total")}</h3>
          <h4>{formatPrice(total, currency)}</h4>
        </div>

        <Button
          size={"lg"}
          disabled={isLoading || cartItemsCount === 0}
          onClick={onProceedToCheckout}
        >
          {isLoading ? (
            <Loader2 className="animate-spin size-5 mr-2" />
          ) : user ? (
            t("continueToPaymentButton")
          ) : (
            t("continueToLoginButton")
          )}
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
