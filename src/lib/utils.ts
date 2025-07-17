import { COLOR_OPTIONS, ColorKey, CurrencyType } from "@/data/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const slugify = (str: string) =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");

export const unslugify = (slug: string): string => {
  const lowercaseWords = ["de", "do", "da", "dos", "das", "e"];
  return slug
    .split("-")
    .map((word, index) => {
      if (lowercaseWords.includes(word) && index !== 0) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

// Formata o preço com base na moeda selecionada (BRL ou USD)
export function formatPrice(value: number, currency: CurrencyType): string {
  const formatter = new Intl.NumberFormat(
    currency === "BRL" ? "pt-BR" : "en-US",
    {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }
  );

  return formatter.format(value);
}

export const getColorLabel = (
  key: ColorKey,
  locale: "ptBR" | "enUS"
): string => {
  return COLOR_OPTIONS.find((color) => color.key === key)?.[locale] ?? key;
};

export const getColorClass = (key: ColorKey): string => {
  return COLOR_OPTIONS.find((color) => color.key === key)?.className ?? "";
};

export function formatOrderDate(
  isoDateString: string,
  locale: "en-US" | "pt-BR" | string
): string {
  // Converte a string ISO em um objeto Date
  const date = new Date(isoDateString);

  // Define as opções de formatação
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric", // Ex: 2025
    month: "long", // Ex: June / junho
    day: "numeric", // Ex: 26
  };

  // Cria um formatador de data e formata a data
  return new Intl.DateTimeFormat(locale, options).format(date);
}
