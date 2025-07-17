// Next-Intl
import { useTranslations } from "next-intl";

// Utilitários
import { getColorClass, getColorLabel } from "@/lib/utils";

// Tipos
import { ColorKey } from "@/data/types";

type ProductColorSelectorProps = {
  colorsAvailables: ColorKey[];
  colorSelected: ColorKey;
  setColorSelected: (color: ColorKey) => void;
  locale: "ptBR" | "enUS";
};

const ProductColorSelector = ({
  colorsAvailables,
  colorSelected,
  setColorSelected,
  locale,
}: ProductColorSelectorProps) => {
  const t = useTranslations("productDetails");

  return (
    <div className="space-y-4">
      <h2 className="font-medium">{t("colorLabel")}</h2>
      <div className="flex gap-4">
        {colorsAvailables.map((colorKey) => (
          <button
            key={colorKey}
            type="button"
            onClick={() => setColorSelected(colorKey)}
            title={getColorLabel(colorKey, locale)}
            className={`
              grid place-content-center size-10 rounded-full 
              border-2 
              ${
                colorKey === colorSelected
                  ? "border-black"
                  : "border-transparent"
              } 
             
              bg-transparent p-0 
              cursor-pointer
              transition-all duration-200 ease-in-out 
               
            `}
          >
            <span
              className={`
                rounded-full size-8 
                ${getColorClass(colorKey)} 
                hover:opacity-80 transition-opacity duration-200 
              `}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductColorSelector;
