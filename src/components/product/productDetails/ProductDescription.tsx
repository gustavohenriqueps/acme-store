// Next-Intl
import { useTranslations } from "next-intl";

// Tipos
import { LocalizedString } from "@/data/types";

type ProductDescriptionProps = {
  description: LocalizedString;
  shortDescription: LocalizedString;
  locale: "ptBR" | "enUS";
};

const ProductDescription = ({
  description,
  shortDescription,
  locale,
}: ProductDescriptionProps) => {
  const t = useTranslations("productDetails");

  return (
    <div className="border-b-1 flex flex-col gap-4 pb-12">
      <h4 className="font-medium">{t("descriptionLabel")}</h4>
      <p className="text-muted-foreground">{description[locale]}</p>
      <p className="text-muted-foreground">{shortDescription[locale]}</p>
    </div>
  );
};

export default ProductDescription;
