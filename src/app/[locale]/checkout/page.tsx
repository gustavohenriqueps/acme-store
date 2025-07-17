"use client";

// React
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form"; // React Hook Form

// Next.js & Next-Intl
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

// Hooks
import { useCart } from "@/hooks/useCart";
import { useCurrency } from "@/hooks/useStore";
import { useOrders } from "@/hooks/useOrders";

// Utils
import { shippingRates } from "@/lib/constants";

// Componentes
import ShippingInformationForm from "@/components/checkout/ShippingInformationForm";
import DeliveryMethodSelection from "@/components/checkout/DeliveryMethodSelection";
import PaymentMethodForm from "@/components/checkout/PaymentMethodForm";
import OrderSummary from "@/components/checkout/OrderSummary";

type ShippingType = "standard" | "express";

// Tipos do form
export type FormValues = {
  firstName: string;
  lastName: string;
  address: string;
  complement?: string;
  city: string;
  country: string;
  state: string;
  postalCode: string;
  phone: string;
  shippingMethod: ShippingType;
  paymentMethod: "creditCard";
  cardNumber: string;
  nameOnCard: string;
  expirationDate: string;
  cvc: string;
};

const Checkout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    totalPriceBRL,
    totalPriceUSD,
    clearCart,
  } = useCart();
  const { createOrder } = useOrders();
  const { currency } = useCurrency();
  const router = useRouter();
  const rawLocale = useLocale();
  const locale = rawLocale.startsWith("pt") ? "ptBR" : "enUS";

  const methods = useForm<FormValues>({
    mode: "onSubmit",
    defaultValues: {
      shippingMethod: "standard",
      paymentMethod: "creditCard",
      country: "brazil",
    },
  });

  const { watch, handleSubmit } = methods;

  const shippingCost = shippingRates[currency][watch("shippingMethod")];
  const subtotal = currency === "BRL" ? totalPriceBRL : totalPriceUSD;
  const taxes = Number((subtotal * 0.1).toFixed(2));
  const total = subtotal + shippingCost + taxes;

  const onSubmit = (data: FormValues) => {
    setIsLoading(true);

    setTimeout(() => {
      createOrder({
        items: cartItems,
        subtotal,
        taxes,
        total,
        currency,
        shippingMethod: data.shippingMethod,
        paymentInformation: {
          cardLast4: data.cardNumber.slice(-4),
          expirationDate: data.expirationDate,
        },
        shippingAddress: {
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          city: data.city,
          country: data.country,
          phone: data.phone,
          postalCode: data.postalCode,
          state: data.state,
          complement: data.complement,
        },
      });
      setIsLoading(false);

      router.push("/checkout/thanks");
      clearCart();
    }, 2000);
  };

  return (
    <section className="bg-zinc-100">
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-2 p-8 lg:px-[8%] max-w-full lg:max-w-screen-2xl mx-auto w-full">
        <FormProvider {...methods}>
          <form className="flex flex-col gap-8">
            <ShippingInformationForm />
            <span className="h-px w-full bg-zinc-200" />
            <DeliveryMethodSelection currency={currency} />
            <span className="h-px w-full bg-zinc-200" />
            <PaymentMethodForm />
          </form>

          {/* Order Summary -  */}
          <OrderSummary
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            subtotal={subtotal}
            taxes={taxes}
            total={total}
            currency={currency}
            locale={locale}
            isLoading={isLoading}
            onPlaceOrder={handleSubmit(onSubmit)}
            shippingRates={shippingRates}
          />
        </FormProvider>
      </div>
    </section>
  );
};

export default Checkout;
