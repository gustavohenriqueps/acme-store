import React from "react";

const care = {
  title: {
    ptBR: "Tecido e Cuidados",
    enUS: "Fabric & Care",
  },
  items: [
    { ptBR: "Apenas os melhores materiais", enUS: "Only the best materials" },
    {
      ptBR: "Produzido localmente e de forma ética",
      enUS: "Ethically and locally made",
    },
    {
      ptBR: "Pré-lavado e pré-encolhido para ajuste ideal",
      enUS: "Pre-washed and pre-shrunk for ideal fit",
    },
    {
      ptBR: "Lavar à máquina com cores semelhantes em água fria",
      enUS: "Machine wash cold with similar colors",
    },
  ],
};

type ProductCareInfoProps = {
  locale: "ptBR" | "enUS";
};

const ProductCareInfo = ({ locale }: ProductCareInfoProps) => {
  return (
    <div>
      <h4 className="font-medium text-lg">{care.title[locale]}</h4>
      <ul className="text-zinc-500 list-disc space-y-1 ml-10 mt-4">
        {care.items.map((item, index) => (
          <li key={item[locale] || index}>{item[locale]}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductCareInfo;
