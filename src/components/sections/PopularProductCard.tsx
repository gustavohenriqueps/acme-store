// Next.js & Next-Intl
import Image from "next/image";
import Link from "next/link";

// Tipos
import { LocalizedString } from "@/data/types";

type PopularProductCardProps = {
  productId: string;
  imageUrl: string;
  altText: LocalizedString;
  locale: "ptBR" | "enUS";
  imageSizes: string;
  containerClasses: string;
  priority?: boolean;
};

const PopularProductCard = ({
  productId,
  imageUrl,
  altText,
  locale,
  imageSizes,
  containerClasses,
  priority = false,
}: PopularProductCardProps) => {
  return (
    <Link
      href={`/collection/${productId}`}
      className={`group relative overflow-hidden rounded-lg ${containerClasses}`}
    >
      <Image
        src={imageUrl}
        alt={altText[locale]}
        fill
        sizes={imageSizes}
        priority={priority}
        className={`object-cover transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-110 `}
      />
    </Link>
  );
};

export default PopularProductCard;
