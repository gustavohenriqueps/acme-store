"use client";

import React from "react";
import { Plus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

import { FILTER_OPTIONS_DATA } from "@/data/filterOptions";
import { FilterSection } from "./FilterSection";
import { useFilters } from "@/hooks/useFilters";

const Filters = () => {
  const t = useTranslations("filters");
  const { clearAll } = useFilters();
  const rawLocale = useLocale();
  const locale = rawLocale.startsWith("pt") ? "ptBR" : "enUS";

  return (
    <div className="w-full">
      {/* Layout Mobile */}
      <div className="flex lg:hidden mt-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"ghost"} className="gap-2">
              {t("buttonText")}
              <Plus className="size-4 text-muted-foreground" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[80%] overflow-scroll">
            <SheetHeader>
              <SheetTitle>{t("sheetTitle")}</SheetTitle>
            </SheetHeader>
            <div className="px-4">
              {FILTER_OPTIONS_DATA.map((option) => (
                <Accordion
                  key={option.key}
                  type="single"
                  collapsible
                  className="w-full border-t py-2"
                >
                  <AccordionItem value={option.key}>
                    <AccordionTrigger>{t(option.titleKey)}</AccordionTrigger>
                    <AccordionContent>
                      <FilterSection
                        type={option.type}
                        items={option.items}
                        title={t(option.titleKey)}
                        locale={locale}
                        isMobile
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
            <Button variant="ghost" onClick={clearAll}>
              {t("clearFiltersButton")}
            </Button>
          </SheetContent>
        </Sheet>
      </div>

      {/* Layout Desktop */}
      <div className="hidden lg:block mt-8 ">
        <div className="flex flex-col items-start gap-2">
          {FILTER_OPTIONS_DATA.map((option) => (
            <FilterSection
              key={option.key}
              type={option.type}
              items={option.items}
              title={t(option.titleKey)}
              locale={locale}
              isMobile={false}
            />
          ))}
        </div>
        <Button className="w-full mt-8" onClick={clearAll}>
          {t("clearFiltersButton")}
        </Button>
      </div>
    </div>
  );
};

export default Filters;
