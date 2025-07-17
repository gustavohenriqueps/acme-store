import React from "react";
import TextContentBlock from "./TextContentBlock";

const Moda = () => {
  return (
    <TextContentBlock
      sectionKey="modaSection" // Chave de tradução específica para Moda
      blankSpacePosition="left" // A coluna vazia (para imagem) fica à esquerda
      textAlign="right" // Texto alinhado à direita
    />
  );
};

export default Moda;
