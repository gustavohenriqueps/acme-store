"use client";

import { AllProducts } from "@/data/products";
import React from "react";
import ProductCard from "../collection/ProductCard";
import { useCurrency } from "@/hooks/useStore";
import { useLocale, useTranslations } from "next-intl";

const MoreProducts = () => {
  const { currency } = useCurrency();
  const t = useTranslations("moreProducts");
  const rawLocale = useLocale();
  const locale = rawLocale.startsWith("pt") ? "ptBR" : "enUS";
  return (
    <section className="my-24">
      <h4 className="font-semibold text-lg mb-8">{t("title")}</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12">
        {AllProducts.slice(0, 4).map((product) => (
          <div key={product.id}>
            <ProductCard
              product={product}
              currency={currency}
              locale={locale}
              details={false}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MoreProducts;
