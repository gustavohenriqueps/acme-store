import { AllProducts } from "@/data/products";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Link } from "@/i18n/navigation";

const TrendingProducts = () => {
  const rawLocale = useLocale();
  const locale = rawLocale.startsWith("pt") ? "ptBR" : "enUS";
  const t = useTranslations("TrendingProducts");
  return (
    <section className="container mx-auto p-6 lg:px-[8%] my-12 space-y-12">
      <div className="flex justify-between items-end">
        <h2 className="text-2xl lg:text-3xl font-bold">{t("title")}</h2>
        <Button variant={"link"} className="font-semibold">
          {t("browse")}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 ">
        {AllProducts.slice(0, 4).map((product, index) => (
          <Link
            href={`/products/${product.name[locale].replaceAll(" ", "-")}`}
            key={`${product.name[locale]}-${index}`}
            className="group"
          >
            <Image
              src={product.imagesUrl[0]}
              alt={product.alt[locale]}
              width={384}
              height={400}
              className="object-cover w-full lg:max-w-xs max-h-[40vh] lg:min-h-100 rounded-md cursor-pointer group-hover:brightness-115 transition-all duration-300"
            />
            <div className="flex justify-between mt-2 lg:max-w-xs text-sm">
              <div className="space-y-1">
                <h4 className="font-medium w-55 truncate ">
                  {product.name[locale]}
                </h4>
                <h5 className="text-muted-foreground capitalize">
                  {product.color}
                </h5>
              </div>
              <h6 className="font-medium">R$150,99</h6>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TrendingProducts;
