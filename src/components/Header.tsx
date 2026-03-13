"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/src/contexts/LanguageContext";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const { currentLang, setLanguage } = useLanguage();
  const pathname = usePathname();

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    console.log("Language changed to:", newLang);
  };

  // Simple translation function
  const t = (key: string): string => {
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
          wishlist: "Wishlist",
          cart: "Cart",
          account: "Account",
        },
        footer: {
          subscribe: "Subscribe",
          discount: "Get 10% off your first order",
          support: "Support",
          contactInfo: "111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.",
          account: "Account",
          manageAccount: "Manage My Account",
          orders: "Orders",
          addresses: "Addresses",
          paymentMethods: "Payment Methods",
          wishlist: "Wishlist",
          cart: "Cart",
          logout: "Logout",
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
          wishlist: "Lista de Deseos",
          cart: "Carrito",
          account: "Cuenta",
        },
        footer: {
          subscribe: "Suscribirse",
          discount: "Obtén 10% de descuento en tu primer pedido",
          support: "Soporte",
          contactInfo: "111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.",
          account: "Cuenta",
          manageAccount: "Administrar Mi Cuenta",
          orders: "Pedidos",
          addresses: "Direcciones",
          paymentMethods: "Métodos de Pago",
          wishlist: "Lista de Deseos",
          cart: "Carrito",
          logout: "Cerrar Sesión",
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
          wishlist: "Liste de Souhaits",
          cart: "Panier",
          account: "Compte",
        },
        footer: {
          subscribe: "S'abonner",
          discount: "Obtenez 10% de réduction sur votre première commande",
          support: "Support",
          contactInfo: "111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.",
          account: "Compte",
          manageAccount: "Gérer Mon Compte",
          orders: "Commandes",
          addresses: "Adresses",
          paymentMethods: "Méthodes de Paiement",
          wishlist: "Liste de Souhaits",
          cart: "Panier",
          logout: "Déconnexion",
        },
      },
    };

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
