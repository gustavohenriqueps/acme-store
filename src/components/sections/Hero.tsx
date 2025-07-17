// Next.js & Next-Intl
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// Componentes
import { Button } from "../ui/button";

const Hero = () => {
  const t = useTranslations("hero");

  return (
    <section className="container max-w-screen-2xl mx-auto p-6 md:px-[8%] grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="flex items-start justify-center flex-col gap-6 max-w-xl">
        <span className="uppercase tracking-wide text-sm text-muted-foreground ">
          {t("newCollection")}
        </span>
        <h1 className="font-bold text-4xl xl:text-5xl leading-tight">
          {t("headline")}
        </h1>
        <p className="text-lg text-muted-foreground">{t("paragraph1")}</p>
        <p className="italic text-sm text-muted-foreground">
          {t("paragraph2")}
        </p>
        <Button size="lg" asChild>
          <Link href="/collection">{t("exploreProductsButton")}</Link>
        </Button>
      </div>

      {/* Imagem */}

      <div className="relative min-h-[420px] max-h-[420px] lg:min-h-[700px] lg:max-h-[700px] min-w-2xs max-w-[1344px] bg-neutral-100">
        <Image
          src="/pexels-musa-yilmaz-2148837900-30304811.jpg"
          alt={t("heroImageAlt")}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1344px"
          className="object-cover object-top w-full h-full rounded-sm"
        />
      </div>
    </section>
  );
};

export default Hero;
