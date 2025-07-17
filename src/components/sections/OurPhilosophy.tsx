// Next.js & Next-Intl
import { useTranslations } from "next-intl";

const OurPhilosophy = () => {
  const t = useTranslations("ourPhilosophy");
  return (
    <section className="container mx-auto p-4 md:px-[8%] my-24 text-center max-w-screen-2xl">
      <span className="uppercase tracking-widest text-sm text-muted-foreground block mb-4">
        {t("subtitle")}
      </span>
      <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-snug">
        {t("headline")}
      </h2>
      <p className="text-muted-foreground text-lg leading-relaxed">
        {t("paragraph1")}
      </p>
      <p className="italic text-sm text-muted-foreground mt-6">
        {t("paragraph2")}
      </p>
    </section>
  );
};

export default OurPhilosophy;
