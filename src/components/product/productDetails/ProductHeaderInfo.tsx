import React from "react";
import { Product } from "@/data/types";
import { formatPrice } from "@/lib/utils";
import { useCurrency } from "@/hooks/useStore";
import { useTranslations } from "next-intl";
import StarRating from "../StarRating";

type ProductHeaderInfoProps = {
  product: Product;
  locale: "ptBR" | "enUS";
  layout: "mobile" | "desktop";
};

const ProductHeaderInfo = ({
  product,
  locale,
  layout,
}: ProductHeaderInfoProps) => {
  const { currency } = useCurrency();
  const t = useTranslations("productDetails");

  return (
    <div
      className={`flex-col gap-2 ${
        layout === "desktop" ? "hidden lg:flex" : "flex lg:hidden"
      }`}
    >
      <div className="flex justify-between font-medium text-lg lg:text-base xl:text-xl">
        <h2 className="">{product.name[locale]}</h2>
        <h3>
          {formatPrice(
            currency === "BRL" ? product.priceBRL : product.priceUSD,
            currency
          )}
        </h3>
      </div>
      <div className="flex items-center gap-2">
        <span>{product.rate}</span>
        <StarRating rate={product.rate} />
        <p className="text-indigo-600 font-medium text-sm ml-8 ">
          {t("seeAllReviews", { count: Math.floor(product.rate * 50) })}
        </p>
      </div>
    </div>
  );
};

export default ProductHeaderInfo;
