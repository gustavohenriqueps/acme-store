import { AllFilterOptions } from "@/data/types";

export const FILTER_OPTIONS_DATA: AllFilterOptions[] = [
  {
    key: "colors",
    type: "colors",
    titleKey: "colors.title",
    items: [
      "black",
      "brown",
      "gray",
      "heather-gray",
      "light-yellow",
      "natural",
      "olive-green",
      "walnut",
      "matte-black",
    ],
  },
  {
    key: "categories",
    type: "categories",
    titleKey: "categories.title",
    items: ["clothes", "shoes", "accessories"],
  },
  {
    key: "sizes",
    type: "sizes",
    titleKey: "sizes.title",
    items: {
      ptBR: ["PP", "P", "M", "G", "GG"],
      enUS: ["XS", "S", "M", "L", "XL"],
    },
  },
];
