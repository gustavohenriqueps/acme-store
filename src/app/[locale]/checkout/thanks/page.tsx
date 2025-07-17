"use client";

// Icones
import { ArrowRight } from "lucide-react";

// Next & Next-Intl
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

// Hooks
import { useOrders } from "@/hooks/useOrders";

// Componentes
import { Button } from "@/components/ui/button";
import { OrderItem } from "@/components/checkout/thanks/OrderItem";
import { OrderSummary } from "@/components/checkout/thanks/OrderSummary";
import { ShippingDetails } from "@/components/checkout/thanks/ShippingDetails";
import NotFoundPage from "../../not-found";

const Thanks = () => {
  const { lastOrder } = useOrders();

  const t = useTranslations("thanksPage");
  const rawLocale = useLocale();
  const locale = rawLocale.startsWith("pt") ? "ptBR" : "enUS";

  if (!lastOrder) {
    <NotFoundPage type="page" locale={locale} />;
    return null;
  }

  return (
    <section className="container mx-auto grid  max-w-full lg:max-w-screen-2xl grid-cols-1 gap-8 p-6 lg:grid-cols-2 md:px-[8%]">
      <div className="relative max-lg:order-2 max-w-[600px] max-h-[900px]">
        <Image
          src={"/pexels-anne-cristine-2151523981-32085685.jpg"}
          alt={t("imageAlt")}
          fill
          sizes="600px"
          className="object-cover"
          priority
        />
      </div>

      <div className="mx-auto flex max-w-2xl flex-col gap-4 lg:max-w-full">
        {/* Cabeçalho */}
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-indigo-600">
            {t("paymentSuccessful")}
          </h2>
          <h3 className="text-4xl font-bold tracking-tight lg:text-5xl">
            {t("title")}
          </h3>
          <p className="font-medium text-muted-foreground">
            {t("description")}
          </p>
        </div>

        {/* Número de Rastreio */}
        <div className="mt-8 space-y-2 text-sm font-medium">
          <h4>{t("trackingNumber")}</h4>

          <p className="text-indigo-600">{lastOrder.id}</p>
        </div>

        {/* Lista de Itens */}
        <div className="flex flex-col gap-2 pb-4">
          {lastOrder.items.map((product) => (
            <OrderItem
              key={product.cartItemId}
              product={product}
              currency={lastOrder.currency}
              locale={locale}
            />
          ))}
        </div>

        {/* Resumo do Pedido */}
        <OrderSummary order={lastOrder} currency={lastOrder.currency} />

        {/* Detalhes de Entrega e Pagamento */}
        <ShippingDetails order={lastOrder} />

        {/* Botão para continuar comprando */}
        <Button variant={"link"} asChild className="self-end text-indigo-600">
          <Link href={"/collection"}>
            {t("continueShopping")} <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Thanks;
