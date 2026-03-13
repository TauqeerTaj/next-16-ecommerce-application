"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface SimpleLanguageContextType {
  currentLang: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const SimpleLanguageContext = createContext<
  SimpleLanguageContextType | undefined
>(undefined);

// Simple translation object
const translations = {
  en: {
    header: {
      title: "Exclusive",
      summerSale:
        "Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%",
      shopNow: "ShopNow",
      home: "Home",
      contact: "Contact",
      about: "About",
      signUp: "Sign Up",
      searchPlaceholder: "What are you looking for?",
    },
  },
  es: {
    header: {
      title: "Exclusivo",
      summerSale:
        "Venta de Verano Para Todos los Trajes de Baño y Envío Express Gratis - 50% DESC",
      shopNow: "CompraAhora",
      home: "Inicio",
      contact: "Contacto",
      about: "Acerca de",
      signUp: "Registrarse",
      searchPlaceholder: "¿Qué estás buscando?",
    },
  },
  fr: {
    header: {
      title: "Exclusif",
      summerSale:
        "Vente d'Été Pour Tous les Maillots de Bain et Livraison Express Gratuite - 50% DE RÉDUCTION",
      shopNow: "AchetezMaintenant",
      home: "Accueil",
      contact: "Contact",
      about: "À Propos",
      signUp: "S'inscrire",
      searchPlaceholder: "Que cherchez-vous?",
    },
  },
};

export function SimpleLanguageProvider({ children }: { children: ReactNode }) {
  const [currentLang, setCurrentLang] = useState("en");

  const setLanguage = (lang: string) => {
    setCurrentLang(lang);
    localStorage.setItem("preferred-language", lang);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: Record<string, string> =
      translations[currentLang as keyof typeof translations] || {};

    for (const k of keys) {
      if (value && typeof value === "object") {
        value = value[k as keyof typeof value];
      } else {
        return key;
      }
    }

    return typeof value === "string" ? value : key;
  };

  return (
    <SimpleLanguageContext.Provider value={{ currentLang, setLanguage, t }}>
      {children}
    </SimpleLanguageContext.Provider>
  );
}

export function useSimpleLanguage() {
  const context = useContext(SimpleLanguageContext);
  if (!context) {
    throw new Error(
      "useSimpleLanguage must be used within a SimpleLanguageProvider",
    );
  }
  return context;
}
