"use client";

// Next.js & Next-Intl
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

// Componentes
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Hooks
import { useCart } from "@/hooks/useCart";
import { useCurrency } from "@/hooks/useStore";

// Utils
import { formatPrice, getColorLabel } from "@/lib/utils";
import { quantityOptions } from "@/lib/constants";

// Icones
import { Check, X } from "lucide-react";

// Tipos
import { CartItem } from "@/data/types";

type ProductCartProps = {
  product: CartItem;
};

const ProductCart = ({ product }: ProductCartProps) => {
  const { currency } = useCurrency();
  const { removeFromCart, updateQuantity } = useCart();
  const t = useTranslations("cart");
  const rawLocale = useLocale();
  const locale = rawLocale.startsWith("pt") ? "ptBR" : "enUS";
  return (
    <div className="py-6 border-t last:border-b flex gap-4">
      <Link href={`/collection/${product.id}`}>
        <Image
          src={product.imagesUrl[0]}
          alt={product.alt[locale]}
          width={176}
          height={176}
          sizes="(max-width:640px) 112px, 176px"
          className="object-cover min-w-28 size-28 max-w-28 sm:min-w-44 sm:size-44 sm:max-w-44 rounded"
        />
      </Link>

      <div className="flex flex-col md:flex-row md:justify-between w-full gap-4">
        <div className="flex flex-col gap-2 flex-1 text-sm sm:text-base">
          <Link href={`/collection/${product.id}`} className="font-medium">
            {product.name[locale]}
          </Link>
          <div className="flex items-center gap-4 text-muted-foreground">
            <h4>{getColorLabel(product.color, locale)}</h4>
            <span className="h-5 w-px bg-neutral-200 block"></span>
            <h4>{product.size}</h4>
          </div>
          <h5 className="font-medium">
            {" "}
            {formatPrice(
              currency === "BRL" ? product.priceBRL : product.priceUSD,
              currency
            )}
          </h5>
          <p className="hidden md:flex items-end gap-1 flex-1  text-sm">
            <Check className="size-4 text-green-500" />
            {t("availableStatus")}
          </p>
        </div>
        <div className="flex-1">
          <Select
            value={product.quantity.toString()}
            onValueChange={(value) =>
              updateQuantity(product.cartItemId, Number(value))
            }
          >
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {quantityOptions.map((qty) => (
                  <SelectItem key={qty} value={qty.toString()}>
                    {qty}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <p className="flex md:hidden items-center gap-1 mt-4 text-sm">
            <Check className="size-4 text-green-500" />
            {t("availableStatus")}
          </p>
        </div>
      </div>
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={() => removeFromCart(product.cartItemId)}
      >
        <X className="size-4 min-h-4 min-w-4 flex-1" />
      </Button>
    </div>
  );
};

export default ProductCart;
