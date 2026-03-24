"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/src/store";
import { translations } from "@/src/lib/translations";

export function useTranslation() {
  const currentLang = useSelector(
    (state: RootState) => state.language.currentLang
  );

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: unknown =
      translations[currentLang as keyof typeof translations] || {};

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }

    return typeof value === "string" ? value : key;
  };

  return { t, currentLang };
}
