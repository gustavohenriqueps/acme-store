import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";

interface NoResultsFoundProps {
  onClearFilters: () => void; // Função para limpar os filtros
}

const NoResultsFound: React.FC<NoResultsFoundProps> = ({ onClearFilters }) => {
  const t = useTranslations("noResultsFound"); // Namespace para as traduções

  return (
    <div className="col-span-full flex flex-col items-center justify-start p-8 text-center">
      <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
        {t("title")}
      </h3>
      <p className="text-base text-gray-600 dark:text-gray-300 mb-6 max-w-md">
        {t("description")}
      </p>
      <Button onClick={onClearFilters}>{t("clearFiltersButton")}</Button>
    </div>
  );
};

export default NoResultsFound;
