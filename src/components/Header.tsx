"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/src/store";
import { setLanguage } from "@/src/store/languageSlice";
import { useTranslation } from "@/src/hooks/useTranslation";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const { t, currentLang } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    dispatch(setLanguage(newLang));
    console.log("Language changed to:", newLang);
  };

  const isActiveRoute = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-black text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center relative">
          <p className="text-sm text-center">
            {t("header.summerSale")}{" "}
            <a href="#" className="underline hover:text-gray-300">
              {t("header.shopNow")}
            </a>
          </p>
          <select
            className="bg-transparent text-white text-sm border-none outline-none cursor-pointer absolute right-8"
            suppressHydrationWarning
            value={currentLang}
            onChange={handleLanguageChange}
          >
            <option value="en" className="bg-black">
              English
            </option>
            <option value="es" className="bg-black">
              Español
            </option>
            <option value="fr" className="bg-black">
              Français
            </option>
          </select>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">{t("header.title")}</div>

            <nav className="hidden md:flex space-x-10">
              <Link
                href="/"
                className={`font-medium hover:text-gray-900 ${
                  isActiveRoute("/") ?
                    "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-700"
                }`}
              >
                {t("header.home")}
              </Link>
              <Link
                href="/contact"
                className={`font-medium hover:text-gray-900 ${
                  isActiveRoute("/contact") ?
                    "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-700"
                }`}
              >
                {t("header.contact")}
              </Link>
              <Link
                href="/about"
                className={`font-medium hover:text-gray-900 ${
                  isActiveRoute("/about") ?
                    "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-700"
                }`}
              >
                {t("header.about")}
              </Link>
              <Link
                href="/auth/signup"
                className={`font-medium hover:text-gray-900 ${
                  isActiveRoute("/auth/signup") ?
                    "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-700"
                }`}
              >
                {t("header.signUp")}
              </Link>
            </nav>

            <div className="relative">
              <input
                type="text"
                placeholder={t("header.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 w-64"
              />
              <button
                onClick={handleSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
