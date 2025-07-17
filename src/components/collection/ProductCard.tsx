import { CurrencyType, Product } from "@/data/types";
import { formatPrice, getColorLabel } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductCardProps {
  product: Product;
  locale: "ptBR" | "enUS";
  currency: CurrencyType;
  details?: boolean;
}

const ProductCard = ({
  product,
  locale,
  currency,
  details = true,
}: ProductCardProps) => {
  return (
    <Link
      key={product.id}
      className="flex flex-col gap-4 min-w-3xs w-full max-w-sm rounded overflow-hidden border border-neutral-100 group"
      href={`/collection/${product.id}`}
    >
      <div className="relative w-full h-full min-w-3xs max-w-sm min-h-[400px] max-h-[400px] ">
        <Image
          src={product.imagesUrl[0]}
          alt={product.alt[locale]}
          fill
          sizes="(max-width: 1024px) 384px, 25vw"
          className="object-cover group-hover:brightness-110 transition-all duration-300"
        />
      </div>

      <div className="space-y-2 font-medium p-4">
        <h3>{product.name[locale]}</h3>
        {details && (
          <h4 className="text-muted-foreground text-sm">
            {product.shortDescription[locale]}
          </h4>
        )}
        <h5 className="text-muted-foreground text-sm">
          {getColorLabel(product.color, locale)}
        </h5>
        <h6>
          {formatPrice(
            locale === "ptBR" ? product.priceBRL : product.priceUSD,
            currency
          )}
        </h6>
      </div>
    </Link>
  );
};

export default ProductCard;
