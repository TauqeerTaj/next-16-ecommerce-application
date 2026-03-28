import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslations from "../public/locales/en/common.json";
import esTranslations from "../public/locales/es/common.json";
import frTranslations from "../public/locales/fr/common.json";

const resources = {
  en: {
    translation: enTranslations,
  },
  es: {
    translation: esTranslations,
  },
  fr: {
    translation: frTranslations,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
