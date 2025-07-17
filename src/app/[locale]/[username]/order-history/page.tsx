"use client";

// React
import React from "react";

// Next.js & Next-Intl
import Image from "next/image";
import Link from "next/link";

// Hooks
import { useLocale, useTranslations } from "next-intl";
import { useOrders } from "@/hooks/useOrders";

// Componentes
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Libs
import { formatOrderDate, formatPrice, getColorLabel } from "@/lib/utils";

interface OrderHistoryPageProps {
  params: {
    username: string;
  };
}

const OrderHistoryPage: React.FC<OrderHistoryPageProps> = ({ params }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { username } = params; // uso somente visual

  const { orders, isLoadingOrders } = useOrders();
  const rawLocale = useLocale();
  const t = useTranslations("orderHistoryPage");

  const locale = rawLocale.startsWith("pt") ? "ptBR" : "enUS";

  // --- Lógica de Renderização Condicional ---
  if (isLoadingOrders) {
    return (
      <section className="container mx-auto flex items-center justify-center min-h-[calc(100vh-200px)]">
        <p>{t("loadingOrders")}</p>
      </section>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <section className="container mx-auto max-w-full p-6 px-[8%] text-center py-40">
        <h2 className="text-2xl font-semibold mb-4">{t("noOrdersTitle")}</h2>
        <p className="text-muted-foreground mb-8">{t("noOrdersDescription")}</p>
        <Button asChild>
          <Link href="/collection">{t("continueShopping")}</Link>
        </Button>
      </section>
    );
  }
  // --- Fim da Lógica de Renderização Condicional ---

  const sortedOrders = [...orders].reverse(); // Cria uma cópia e inverte para ter os mais recentes primeiro

  return (
    <section className="container mx-auto max-w-full p-6 px-[8%]">
      {/* Cabeçalho da página */}
      <div className="space-y-4 pb-8">
        <h2 className="text-2xl lg:text-3xl font-bold">{t("title")}</h2>
        <p className="text-muted-foreground font-medium">{t("description")}</p>
      </div>

      <div className="space-y-12 lg:space-y-24">
        {sortedOrders.map((order) => (
          <div key={order.id} className="border rounded-md shadow-sm">
            {/* Seção de Resumo do Pedido (Data, Nº Pedido, Total, Botão) */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 font-medium bg-zinc-100/50 py-4 px-6 justify-between lg:justify-start text-sm">
              {/* Grupo dos 3 primeiros itens */}
              <div className="flex flex-col md:flex-row gap-4 md:gap-12 flex-wrap">
                {/* Item: Data */}
                <div className="flex md:flex-col justify-between py-2 md:py-0 border-b md:border-none md:w-auto">
                  <h3 className="font-semibold text-zinc-700">{t("date")}</h3>
                  <p className="text-muted-foreground">
                    {formatOrderDate(order.date, rawLocale)}
                  </p>
                </div>
                {/* Item: Número do Pedido */}
                <div className="flex md:flex-col justify-between py-2 md:py-0 border-b md:border-none">
                  <h3 className="font-semibold text-zinc-700">
                    {t("orderNumber")}
                  </h3>

                  <p className="text-muted-foreground">
                    {order.id.slice(0, 12).toLocaleUpperCase()}
                  </p>
                </div>
                {/* Item: Total */}
                <div className="flex md:flex-col justify-between py-2 md:py-0">
                  <h3 className="font-semibold text-zinc-700">{t("total")}</h3>

                  <p>{formatPrice(order.total, order.currency)}</p>
                </div>
              </div>
              {/* Botão de Fatura */}
              <Button
                variant={"outline"}
                className="w-full md:w-fit lg:ml-auto"
              >
                {t("viewInvoice")}
              </Button>
            </div>
            {/* Tabela de Itens do Pedido */}
            <Table className="bg-white rounded-b-md">
              <TableHeader className="hidden md:table-header-group">
                <TableRow className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center text-left pt-4 px-4 border-b">
                  <TableHead className="text-muted-foreground">
                    {t("product")}
                  </TableHead>
                  <TableHead className="text-muted-foreground text-right mr-8">
                    {t("price")}
                  </TableHead>
                  <TableHead className="text-muted-foreground text-right mr-8">
                    {t("status")}
                  </TableHead>
                  <TableHead className="text-muted-foreground text-right mr-8">
                    {t("actions")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow
                    key={item.cartItemId}
                    className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_1fr] sm:gap-4 items-center justify-between p-4 border-b last:border-b-0"
                  >
                    {/* Coluna do Produto (Imagem e Nome) */}
                    <TableCell className="flex items-center gap-4 col-span-full sm:col-span-1">
                      <Link
                        href={`/collection/${item.id}`}
                        className="relative h-20 w-20 rounded overflow-hidden flex-shrink-0"
                      >
                        <Image
                          src={item.imagesUrl[0]}
                          alt={item.alt[locale]}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </Link>
                      <div className="flex flex-col gap-1 overflow-hidden">
                        <Button
                          variant={"link"}
                          asChild
                          className="p-0 m-0 h-auto self-start whitespace-normal "
                        >
                          <Link
                            href={`/collection/${item.id}`}
                            className="text-wrap font-medium text-left "
                          >
                            {item.name[locale]}
                          </Link>
                        </Button>
                        {/* Cor do produto */}
                        <p className="text-muted-foreground text-sm">
                          {getColorLabel(item.color, locale)}
                        </p>
                        {/* Preço visível apenas em mobile */}
                        <p className="text-muted-foreground block sm:hidden text-sm">
                          {formatPrice(
                            order.currency === "BRL"
                              ? item.priceBRL
                              : item.priceUSD,
                            order.currency
                          )}
                        </p>
                      </div>
                    </TableCell>

                    {/* Coluna do Preço (visível em desktop) */}
                    <TableCell className="hidden sm:block text-right text-muted-foreground font-medium">
                      {formatPrice(
                        order.currency === "BRL"
                          ? item.priceBRL
                          : item.priceUSD,
                        order.currency
                      )}
                    </TableCell>

                    {/* Coluna do Status */}
                    <TableCell className="hidden sm:block text-right text-muted-foreground font-medium">
                      <p>{t("statusPreparing")}</p>
                    </TableCell>

                    {/* Coluna de Ações (Link Ver Produto) */}
                    <TableCell className="text-right col-span-full sm:col-span-1">
                      <Button
                        variant={"link"}
                        asChild
                        className="text-indigo-600 h-auto"
                      >
                        <Link href={`/collection/${item.id}`}>
                          {t("viewProduct")}
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrderHistoryPage;
