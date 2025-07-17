export interface Product {
  id: string;
  name: LocalizedString;
  shortDescription: LocalizedString;
  description: LocalizedString;
  alt: LocalizedString;
  category: ProductCategoryType;
  priceBRL: number;
  priceUSD: number;
  imagesUrl: string[];
  rate: number;
  color: ColorKey;
  colorsAvailables: ColorKey[];
  sizes: SizeAvailability[];
  size?: SizeOption | SizeOptionEN | ShoeSize | ShoeSizeUS;
}

export type ProductCategoryType = "clothes" | "shoes" | "accessories";

export type LocalizedString = {
  ptBR: string;
  enUS: string;
};

export type ColorKey =
  | "black"
  | "matte-black"
  | "gray"
  | "heather-gray"
  | "light-yellow"
  | "brown"
  | "natural"
  | "olive-green"
  | "walnut";

export interface ColorOption {
  key: ColorKey;
  className: string;
  ptBR: string;
  enUS: string;
}

export const COLOR_OPTIONS: ColorOption[] = [
  {
    key: "black",
    className: "bg-black",
    ptBR: "Preto",
    enUS: "Black",
  },
  {
    key: "matte-black",
    className: "bg-zinc-900",
    ptBR: "Preto Fosco",
    enUS: "Matte Black",
  },
  {
    key: "gray",
    className: "bg-zinc-400",
    ptBR: "Cinza",
    enUS: "Gray",
  },
  {
    key: "heather-gray",
    className: "bg-gray-300",
    ptBR: "Cinza Mesclado",
    enUS: "Heather Gray",
  },
  {
    key: "light-yellow",
    className: "bg-yellow-200",
    ptBR: "Amarelo Claro",
    enUS: "Light Yellow",
  },
  {
    key: "brown",
    className: "bg-amber-900",
    ptBR: "Marrom",
    enUS: "Brown",
  },
  {
    key: "natural",
    className: "bg-orange-100",
    ptBR: "Natural",
    enUS: "Natural",
  },
  {
    key: "olive-green",
    className: "bg-green-700",
    ptBR: "Verde Oliva",
    enUS: "Olive Green",
  },
  {
    key: "walnut",
    className: "bg-amber-800",
    ptBR: "Nogueira",
    enUS: "Walnut",
  },
];

export type SizeOption = "PP" | "P" | "M" | "G" | "GG";
export type SizeOptionEN = "XS" | "S" | "M" | "L" | "XL";

export type ShoeSize =
  | "36"
  | "37"
  | "38"
  | "39"
  | "40"
  | "41"
  | "42"
  | "43"
  | "44";
export type ShoeSizeUS = "6" | "6.5" | "7" | "8" | "9" | "10" | "11" | "11.5";

export interface SizeAvailability {
  ptBR: SizeOption | ShoeSize;
  enUS: SizeOptionEN | ShoeSizeUS;
  available: boolean;
}

// Nova interface para uma opção de filtro genérica
export interface FilterOptionBase {
  key: string; // Uma chave única para o filtro (ex: "colors", "categories", "sizes", "price", "rating")
  type: "colors" | "categories" | "sizes" | "price" | "rating"; // Tipo do filtro para renderização condicional
  titleKey: string; // Chave para tradução do título do filtro (ex: "filters.colors.title")
}

export interface FilterColorsOptions extends FilterOptionBase {
  type: "colors";
  items: ColorKey[]; // As chaves das cores disponíveis
}

export interface FilterCategoryOptions extends FilterOptionBase {
  type: "categories";
  items: ProductCategoryType[];
}

export interface FilterSizesOption extends FilterOptionBase {
  type: "sizes";
  items: {
    ptBR: SizeOption[];
    enUS: SizeOptionEN[];
  };
}

export interface FilterRatingOptions extends FilterOptionBase {
  type: "rating";
  minRatings: number[]; // Ex: [4, 3, 2, 1]
}

// Tipo unificado para o array de opções de filtro
export type AllFilterOptions =
  | FilterColorsOptions
  | FilterCategoryOptions
  | FilterSizesOption;

// Tipagem da store context/currency
export type CurrencyType = "BRL" | "USD";

export interface CurrencyContextProps {
  currency: CurrencyType;
  setCurrency: (currency: CurrencyType) => void;
}

export interface CartItem extends Product {
  cartItemId: string;
  quantity: number;
}

// Tipagem do usuário
export interface User {
  sessionId: string;
  username: string;
  email: string;
  passwordHash: string;
}

// Interface do contexto de autenticação
export interface AuthContextProps {
  user: User | null;
  signup: (newUser: {
    username: string;
    email: string;
    password: string;
  }) => boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export interface Order {
  id: string;
  date: string;
  subtotal: number;
  taxes: number;
  total: number;
  items: CartItem[];
  currency: CurrencyType;
  shippingAddress?: {
    firstName: string;
    lastName: string;
    address: string;
    complement?: string;
    city: string;
    country: string;
    state: string;
    postalCode: string;
    phone: string;
  };
  paymentInformation?: {
    cardLast4: string;
    expirationDate: string;
  };
  shippingMethod: "standard" | "express";
}

export type OrdersContextType = {
  lastOrder: Order | null;
  orders: Order[];
  createOrder: (order: Omit<Order, "id" | "date">) => void;
  isLoadingOrders: boolean;
};
export type FooterSection = {
  title: string;
  links: string[];
};
export type ReviewType = {
  name: string;
  date: string;
  rate: number;
  title: string;
  description1: string;
  description2?: string;
};
