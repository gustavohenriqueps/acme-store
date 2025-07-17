"use client";

// React
import { useMemo } from "react";

// Next.js & Next-Intl
import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

// Componentes Locais (UI da Shadcn, etc.)
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// Hooks
import { useCurrency } from "@/hooks/useStore";

// Tipos
import { CurrencyType } from "@/data/types";

// Opções de idioma/moeda equivalentes
const localeCurrencyMap = {
  "pt-BR": "BRL",
  "en-US": "USD",
};

const options = [
  {
    value: "pt-BR",
    label: "BRL (Português)",
    flag: "/brazil-flag.jpg",
    currency: "BRL",
  },
  {
    value: "en-US",
    label: "USD (English)",
    flag: "/usa-flag.jpg",
    currency: "USD",
  },
];

function LanguageCurrencySwitcher() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { setCurrency } = useCurrency();
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();

  const currentOption = useMemo(() => {
    return options.find((opt) => opt.value === locale);
  }, [locale]);

  const handleSwitch = (newLocale: "en-US" | "pt-BR") => {
    const newCurrency = localeCurrencyMap[newLocale];

    const query: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      query[key] = value;
    });

    router.push(
      {
        pathname,
        query, // preserva os filtros ou parâmetros ativos
      },
      { locale: newLocale }
    );

    setCurrency(newCurrency as CurrencyType);
  };

  return (
    <Select value={locale} onValueChange={handleSwitch}>
      <SelectTrigger className="w-[100px] p-0 border-none shadow-none">
        <SelectValue className="flex items-center gap-2">
          {currentOption && (
            <>
              <div className="relative w-full min-w-7 max-w-7 min-h-4 max-h-4">
                <Image
                  src={currentOption.flag}
                  alt={currentOption.label}
                  fill
                  sizes="(28px)"
                  className="object-cover"
                />
              </div>
              <span className="font-medium text-neutral-600 text-sm">
                {currentOption.currency}
              </span>
            </>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="flex items-center gap-2"
          >
            <div className="relative w-full min-w-7 max-w-7 min-h-4 max-h-4">
              <Image
                src={option.flag}
                alt={option.label}
                fill
                sizes="(28px)"
                className="object-cover"
              />
            </div>

            <span>{option.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default LanguageCurrencySwitcher;
