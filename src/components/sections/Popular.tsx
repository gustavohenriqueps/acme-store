// Next.js & Next-Intl
import { useLocale } from "next-intl";

// Produtos
import { AllProducts } from "@/data/products";

// Componentes
import PopularProductCard from "./PopularProductCard";

interface PopularProps {
  side: "left" | "right";
  isMain: boolean;
}

const Popular = ({ side = "left", isMain = true }: PopularProps) => {
  const rawLocale = useLocale();
  const locale = rawLocale.startsWith("pt") ? "ptBR" : "enUS";

  // Dados principais e invertidos
  const featured = AllProducts[0];
  const secondary = AllProducts.slice(1, 3);

  const featuredInverted = AllProducts[3];
  const secondaryInverted = AllProducts.slice(4, 6);

  // Escolher baseado na flag
  const mainProduct = isMain ? featured : featuredInverted;
  const otherProducts = isMain ? secondary : secondaryInverted;

  // Card principal
  const featureCard = mainProduct && (
    <PopularProductCard
      productId={mainProduct.id}
      imageUrl={mainProduct.imagesUrl[0]}
      altText={mainProduct.alt}
      locale={locale}
      imageSizes="(max-width: 1024px) 100vw, 672px"
      containerClasses="min-h-[420px] lg:min-h-[832px] lg:max-h-[832px] w-full lg:max-w-2xl"
    />
  );

  // Cards secundários
  const otherCards = (
    <div className="grid grid-cols-1 gap-8">
      {otherProducts.map((product, index) => (
        <PopularProductCard
          key={product.id || index}
          productId={product.id}
          imageUrl={product.imagesUrl[0]}
          altText={product.alt}
          locale={locale}
          imageSizes="(max-width: 1024) 25vw, 672px"
          containerClasses="min-h-[320px] lg:min-h-[400px] lg:max-h-[400px] w-full lg:max-w-2xl rounded-sm "
        />
      ))}
    </div>
  );

  return (
    <section className="container mx-auto max-w-screen-2xl px-4 md:px-[8%] my-24 space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {side === "left" ? (
          <>
            {featureCard}
            {otherCards}
          </>
        ) : (
          <>
            {otherCards}
            {featureCard}
          </>
        )}
      </div>
    </section>
  );
};

export default Popular;
