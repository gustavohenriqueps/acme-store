"use client";

// Next.js & Next-Intl
import { useLocale, useTranslations } from "next-intl";

// Componentes
import Filters from "@/components/collection/Filters";
import NoResultsFound from "@/components/collection/NoResultsFound";
import ProductCard from "@/components/collection/ProductCard";

// Produtos
import { AllProducts } from "@/data/products";

// Tipos
import { ColorKey, SizeOption, SizeOptionEN } from "@/data/types";
import { getColorLabel } from "@/lib/utils";

// Hooks
import { useFilters } from "@/hooks/useFilters";
import { useCurrency } from "@/hooks/useStore";

const CollectionPage = () => {
  const rawLocale = useLocale();
  const { activeFilters, clearAll } = useFilters();
  const { currency } = useCurrency();
  const t = useTranslations("collectionPage");
  const locale = rawLocale.startsWith("pt") ? "ptBR" : "enUS";

  const filteredProducts = AllProducts.filter((product) => {
    const { colors, categories, sizes, query } = activeFilters;

    const matchColor =
      colors.length === 0 ||
      colors.some((filterColor) =>
        product.colorsAvailables.includes(filterColor as ColorKey)
      );
    const matchCategory =
      categories.length === 0 || categories.includes(product.category);

    const productSizes = product.sizes
      .filter((s) => s.available)
      .map((s) => (locale === "ptBR" ? s.ptBR : s.enUS));

    const matchSize =
      sizes.length === 0 ||
      sizes.some((filterSize) =>
        productSizes.includes(filterSize as SizeOption | SizeOptionEN)
      );

    const lowerCaseQuery = query ? query.toLowerCase() : "";

    const matchQuery =
      !query || // Se não há query, o produto corresponde
      product.name[locale].toLowerCase().includes(lowerCaseQuery) || // Compara com o nome do produto
      product.shortDescription[locale].toLowerCase().includes(lowerCaseQuery) || // Compara com a descrição curta
      // Nova condição: compara com as cores disponíveis
      product.colorsAvailables.some((availableColor) =>
        getColorLabel(availableColor, locale)
          .toLowerCase()
          .includes(lowerCaseQuery)
      );
    // --- Fim da mudança ---

    return matchColor && matchCategory && matchSize && matchQuery;
  });

  return (
    <section className="container mx-auto max-w-full lg:max-w-screen-2xl p-6 px-[8%] ">
      <div className="space-y-4 border-b pb-8">
        <h2 className="text-2xl lg:text-3xl font-bold">{t("title")}</h2>
        <p className="text-muted-foreground font-medium">{t("description")}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filtros */}
        <div className="col-span-1 w-full">
          <Filters />
        </div>

        {/* Produtos */}
        <div className=" grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 col-span-3 gap-8 mt-8 ">
          {filteredProducts.length === 0 ? (
            <NoResultsFound onClearFilters={clearAll} />
          ) : (
            filteredProducts.map((product) => (
              <ProductCard
                product={product}
                locale={locale}
                currency={currency}
                key={product.id}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default CollectionPage;
