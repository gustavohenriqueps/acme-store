// Next.js & Next-Intl
import { useTranslations } from "next-intl";

type TextContentBlockProps = {
  sectionKey: string; // Chave para o namespace das traduções
  blankSpacePosition: "left" | "right"; // Controla onde a coluna vazia se posiciona
  textAlign?: "left" | "right"; // Opcional: alinhamento do texto na coluna
};

const TextContentBlock = ({
  sectionKey,
  blankSpacePosition,
  textAlign = "left",
}: TextContentBlockProps) => {
  const t = useTranslations(sectionKey); // Usa a chave da seção como namespace

  const emptyColumnClasses =
    blankSpacePosition === "right" ? "lg:col-span-2 order-1 " : "lg:col-span-2";

  // Ajusta o alinhamento do texto
  const textAlignmentClass = textAlign === "right" ? "text-right" : "text-left";

  return (
    <section className="container mx-auto max-w-screen-2xl p-6 md:px-[8%] my-12">
      <div className="grid lg:grid-cols-5 items-center gap-8">
        {/* Coluna vazia para espaçamento de layout */}
        <div className={emptyColumnClasses} />

        {/* Coluna de conteúdo textual */}
        <div className={`lg:col-span-3 space-y-6 ${textAlignmentClass}`}>
          <span className="uppercase tracking-widest text-sm text-muted-foreground block">
            {t("subtitle")}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold leading-snug">
            {t("headline")}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t("paragraph1")}
          </p>
          <p className="italic text-sm text-muted-foreground">
            {t("paragraph2")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TextContentBlock;
