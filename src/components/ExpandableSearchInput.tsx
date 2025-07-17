"use client";

// React
import React, { useState, useRef } from "react";

// Componentes
import { Input } from "@/components/ui/input";

// Utilitários
import { cn } from "@/lib/utils";

// Next.js & Next-Intl
import { useTranslations } from "next-intl";

// Hooks
import { useFilters } from "@/hooks/useFilters";

// Ícones
import { Search } from "lucide-react";

interface ExpandableSearchInputProps {
  alwaysExpanded?: boolean;
}

export function ExpandableSearchInput({
  alwaysExpanded = false,
}: ExpandableSearchInputProps) {
  const [isExpanded, setIsExpanded] = useState(alwaysExpanded);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("expandableSearchInput");
  const { setSearchQuery } = useFilters();

  const handleIconClick = () => {
    if (!alwaysExpanded) {
      setIsExpanded(true);
      // Foca automaticamente no input ao expandir
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleInputBlur = () => {
    if (!alwaysExpanded && inputRef.current?.value === "") {
      setIsExpanded(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSearchQuery(value.trim());
    }
  };

  const widthClass = alwaysExpanded
    ? "w-full"
    : isExpanded
    ? "w-full max-w-48 xl:max-w-full  xl:w-62 "
    : "w-10";

  return (
    <div
      className={cn(
        "relative flex items-center transition-all duration-300 ease-in-out",
        widthClass
      )}
    >
      {!isExpanded && !alwaysExpanded && (
        <button
          type="button"
          onClick={handleIconClick}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Abrir campo de busca"
        >
          <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </button>
      )}

      {(isExpanded || alwaysExpanded) && (
        <>
          <Input
            ref={inputRef}
            type="text"
            placeholder={t("placeholder")}
            className="pl-3 pr-10 w-full focus:ring-0 focus:outline-none "
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleInputBlur}
          />
          <Search className="absolute right-3 h-5 w-5 text-gray-500 dark:text-gray-400 pointer-events-none" />
        </>
      )}
    </div>
  );
}
