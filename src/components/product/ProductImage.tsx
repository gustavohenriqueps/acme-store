"use client";

// Next.js & Next-Intl
import Image from "next/image";
import { useLocale } from "next-intl";

// Tipos
import { Product } from "@/data/types";

// Componentes
import ProductHeaderInfo from "./productDetails/ProductHeaderInfo";

type ProductImageProps = {
  product: Product;
};

const ProductImage = ({ product }: ProductImageProps) => {
  const rawLocale = useLocale();
  const locale = rawLocale.startsWith("pt") ? "ptBR" : "enUS";

  return (
    <div className="space-y-4 w-full max-w-full mx-auto col-span-3 h-fit">
      {/* Informações do produto para telas pequenas (visível apenas em `lg:hidden`) */}
      <ProductHeaderInfo product={product} locale={locale} layout={"mobile"} />

      {/* Imagem principal do produto */}
      <div className="relative w-full min-h-[420px] lg:min-h-[700px] max-w-full lg:max-w-[1344px] bg-neutral-100 overflow-hidden rounded-sm">
        <Image
          src={product.imagesUrl[0]}
          alt={product.alt[locale]}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1344px"
          className="object-cover"
        />
      </div>

      {/* Imagens secundárias do produto */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative w-full min-h-[320px] lg:min-h-[500px] lg:max-h-[500px] max-w-full lg:max-w-[376px] bg-neutral-100 overflow-hidden rounded-sm">
          <Image
            src={product.imagesUrl[1]}
            alt={product.alt[locale]}
            fill
            sizes="(max-width: 1024px) 50vw, 376px"
            className="object-cover"
          />
        </div>
        <div className="relative w-full min-h-[320px] lg:min-h-[500px] lg:max-h-[500px] max-w-full lg:max-w-[376px] bg-neutral-100 overflow-hidden rounded-sm">
          <Image
            src={product.imagesUrl[2]}
            alt={product.alt[locale]}
            fill
            sizes="(max-width: 1024px) 50vw, 376px"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductImage;
