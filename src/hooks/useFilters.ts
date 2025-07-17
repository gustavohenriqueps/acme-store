"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

export function useFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const getActiveFilters = useCallback(() => {
    const colors = searchParams.getAll("color");
    const categories = searchParams.getAll("category");
    const sizes = searchParams.getAll("size");
    const query = searchParams.get("q") || "";
    return { colors, categories, sizes, query };
  }, [searchParams]);

  const toggleFilter = useCallback(
    (type: "color" | "category" | "size", value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const values = params.getAll(type);

      if (values.includes(value)) {
        const newValues = values.filter((v) => v !== value);
        params.delete(type);
        newValues.forEach((v) => params.append(type, v));
      } else {
        params.append(type, value);
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const setSearchQuery = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }

      const newUrl = `${
        pathname.includes("/collection") ? pathname : "/collection"
      }?${params.toString()}`;

      router.replace(newUrl, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const clearAll = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [pathname, router]);

  return {
    activeFilters: getActiveFilters(),
    toggleFilter,
    setSearchQuery,
    clearAll,
  };
}
