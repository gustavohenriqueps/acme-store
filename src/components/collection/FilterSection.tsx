"use client";
// Next.js & Next-Intl
import { useTranslations } from "next-intl";

// Componentes
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

// Utils
import { getColorLabel } from "@/lib/utils";

// Tipos
import { ColorKey, ProductCategoryType } from "@/data/types";

// Hooks
import { useFilters } from "@/hooks/useFilters";

type FilterSectionProps = {
  type: "colors" | "categories" | "sizes";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any;
  title: string;
  locale: "ptBR" | "enUS";
  isMobile?: boolean;
};

// Mapeamento dos tipos de filtro para os tipos de parâmetro da URL
const filterTypeToParamMap = {
  colors: "color",
  categories: "category",
  sizes: "size",
} as const;

export const FilterSection = ({
  type,
  items,
  title,
  locale,
  isMobile = false,
}: FilterSectionProps) => {
  const t = useTranslations("filters");
  const { activeFilters, toggleFilter } = useFilters();

  const paramType = filterTypeToParamMap[type];
  const activeItems = activeFilters[type];

  // Para o tipo 'sizes', precisamos primeiro obter a lista de tamanhos localizada
  const renderableItems =
    type === "sizes" ? items[locale as keyof typeof items] || [] : items;

  return (
    <div
      className={`flex flex-col items-start gap-0 w-full ${
        !isMobile ? "border-b py-4 first:pt-0" : " py-2"
      }`}
    >
      {!isMobile && <h3 className="font-medium mb-2">{title}</h3>}

      {/* Lógica de renderização unificada */}
      {renderableItems.map((item: string | ColorKey | ProductCategoryType) => {
        const id = `${paramType}-${item}-${isMobile ? "mobile" : "desktop"}`;

        // Determina o label a ser exibido com base no tipo
        let labelContent: string;
        if (type === "colors") {
          labelContent = getColorLabel(item as ColorKey, locale);
        } else if (type === "categories") {
          labelContent = t(`categories.items.${item}`);
        } else {
          // sizes
          labelContent = item;
        }

        return (
          <div key={item} className="py-2 flex items-center gap-2">
            <Checkbox
              id={id}
              checked={activeItems.includes(item)}
              onCheckedChange={() => toggleFilter(paramType, item)}
            />
            <Label htmlFor={id} className="text-muted-foreground text-sm">
              {labelContent}
            </Label>
          </div>
        );
      })}
    </div>
  );
};
