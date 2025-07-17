export const shippingRates: Record<
  "BRL" | "USD",
  { standard: number; express: number }
> = {
  BRL: { standard: 15.0, express: 35.0 },
  USD: { standard: 3.0, express: 7.0 },
};

export const TAXES = 5.52;

export const quantityOptions = [1, 2, 3, 4, 5];

export const COUNTRIES_OPTIONS = [
  { value: "brazil", labelKey: "countries.brazil" },
  { value: "usa", labelKey: "countries.usa" },
  { value: "canada", labelKey: "countries.canada" },
];
