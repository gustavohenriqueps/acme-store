// Next-Intl
import { useTranslations } from "next-intl";

// Tipos
import {
  Product,
  ShoeSize,
  ShoeSizeUS,
  SizeOption,
  SizeOptionEN,
} from "@/data/types";

// Comnponentes Locais
import { Button } from "@/components/ui/button";

type ProductSizeSelectorProps = {
  sizes: Product["sizes"];
  sizeSelected: SizeOption | SizeOptionEN | ShoeSize | ShoeSizeUS | undefined;
  setSizeSelected: (
    size: SizeOption | SizeOptionEN | ShoeSize | ShoeSizeUS
  ) => void;
  locale: "ptBR" | "enUS";
};

const ProductSizeSelector = ({
  sizes,
  sizeSelected,
  setSizeSelected,
  locale,
}: ProductSizeSelectorProps) => {
  const t = useTranslations("productDetails");

  return (
    <div className="space-y-4">
      <h4 className="font-medium">{t("sizeLabel")}</h4>
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
        {sizes.map((size) => {
          const label = size[locale];
          const isSelected = label === sizeSelected;
          const isAvailable = size.available;

          return (
            <Button
              key={label}
              variant={"ghost"}
              onClick={() => {
                if (isAvailable) setSizeSelected(label);
              }}
              className={`
                border rounded h-10 
                ${
                  isSelected
                    ? "bg-neutral-900 text-white border-white hover:bg-neutral-800 hover:text-white"
                    : "border-zinc-600"
                }
                ${
                  !isAvailable
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }
              `}
            >
              {label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSizeSelector;
