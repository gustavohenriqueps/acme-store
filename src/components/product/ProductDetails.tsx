"use client";

// React
import { useState, useMemo } from "react";

// Next.js & Next-Intl
import { useLocale, useTranslations } from "next-intl";

// Hooks
import { useCart } from "@/hooks/useCart";

// Icones
import { Loader2, CircleDollarSign, Globe2 } from "lucide-react"; // Lucide Icons

// Tipos
import {
  Product,
  ShoeSize,
  ShoeSizeUS,
  SizeOption,
  SizeOptionEN,
} from "@/data/types";

// Componentes Locais
import ProductHeaderInfo from "./productDetails/ProductHeaderInfo";
import ProductColorSelector from "./productDetails/ProductColorSelector";
import ProductQuantitySelector from "./productDetails/ProductQuantitySelector";
import ProductSizeSelector from "./productDetails/ProductSizeSelector";
import ProductDescription from "./productDetails/ProductDescription";
import ProductCareInfo from "./productDetails/ProductCareInfo";
import FeatureCard from "./productDetails/ProductFeatureCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type ProductDetailsProps = {
  product: Product;
};

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const rawLocale = useLocale();
  const { addToCart } = useCart();
  const t = useTranslations("productDetails");

  const locale = useMemo(
    () => (rawLocale.startsWith("pt") ? "ptBR" : "enUS"),
    [rawLocale]
  );

  const [colorSelected, setColorSelected] = useState(
    product.colorsAvailables[0]
  );
  const [quantitySelected, setQuantitySelected] = useState(1);
  const [sizeSelected, setSizeSelected] = useState<
    SizeOption | SizeOptionEN | ShoeSize | ShoeSizeUS | undefined
  >(() => {
    if (product?.sizes) {
      const firstAvailable = product.sizes.find((size) => size.available);
      return firstAvailable ? firstAvailable[locale] : undefined;
    }
    return undefined;
  });
  const [isLoading, setIsLoading] = useState(false);

  const quantityOptions = [1, 2, 3, 4, 5];

  const handleAddToCart = () => {
    setIsLoading(true);
    setTimeout(() => {
      const itemToAdd = {
        ...product,
        color: colorSelected,
        size: sizeSelected,
      };
      addToCart(itemToAdd, quantitySelected);
      toast.success(t("addedToCart"));
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-6 lg:gap-12 w-full max-w-full mx-auto col-span-2 ">
      <ProductHeaderInfo product={product} locale={locale} layout="desktop" />

      <div className="flex items-start justify-between max-w-xs">
        <ProductColorSelector
          colorsAvailables={product.colorsAvailables}
          colorSelected={colorSelected}
          setColorSelected={setColorSelected}
          locale={locale}
        />

        <ProductQuantitySelector
          quantitySelected={quantitySelected}
          setQuantitySelected={setQuantitySelected}
          quantityOptions={quantityOptions}
        />
      </div>

      <ProductSizeSelector
        sizes={product.sizes}
        sizeSelected={sizeSelected}
        setSizeSelected={setSizeSelected}
        locale={locale}
      />

      <Button size={"lg"} onClick={handleAddToCart} disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="size-5 animate-spin" />
        ) : (
          t("addToCartButton")
        )}
      </Button>

      <ProductDescription
        description={product.description}
        shortDescription={product.shortDescription}
        locale={locale}
      />

      <ProductCareInfo locale={locale} />

      <div className="flex flex-col gap-4 text-center">
        <FeatureCard
          icon={Globe2}
          title={t("internationalDeliveryTitle")}
          description={t("internationalDeliveryText")}
        />
        <FeatureCard
          icon={CircleDollarSign}
          title={t("loyaltyRewardsTitle")}
          description={t("loyaltyRewardsText")}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
