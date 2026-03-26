"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/src/store";
import { setLanguage } from "@/src/store/languageSlice";
import { useTranslation } from "@/src/hooks/useTranslation";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { t, currentLang } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    dispatch(setLanguage(newLang));
    console.log("Language changed to:", newLang);
  };

  const handleUserIconClick = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
    setIsUserDropdownOpen(false);
  };

  const handleDropdownItemClick = (action: () => void) => {
    action();
    setIsUserDropdownOpen(false);
  };

  const isActiveRoute = (href: string) => {
    console.log("isActiveRoute:", href, pathname, pathname.startsWith(href));
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
              <button
                onClick={async () => {
                  await signOut({ callbackUrl: "/auth/signup" });
                }}
                className={`font-medium hover:text-gray-900 ${
                  isActiveRoute("/auth/signup") ?
                    "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-700"
                } bg-transparent border-none cursor-pointer`}
              >
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
              </button>
            </nav>

            <div className="flex items-center space-x-1">
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

              {session && (
                <>
                  {/* Wishlist Icon */}
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Image
                      src="/assets/heart.svg"
                      alt="Heart"
                      width={18}
                      height={18}
                      className="w-4.5 h-4.5"
                    />
                  </button>

                  {/* Cart Icon */}
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                    <Image
                      src="/assets/Cart.svg"
                      alt="Cart"
                      width={22}
                      height={20}
                      className="w-5.5 h-5"
                    />
                    <span className="absolute -top-1 -right-1 bg-[#EA4335] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      0
                    </span>
                  </button>

                  {/* User Icon with Dropdown */}
                  <div className="relative">
                    <button
                      onClick={handleUserIconClick}
                      className={`p-1 rounded-full transition-colors ${
                        isUserDropdownOpen ? "bg-[#EA4335]" : (
                          "hover:bg-gray-100"
                        )
                      }`}
                    >
                      {isUserDropdownOpen ?
                        <Image
                          src="/assets/user2.svg"
                          alt="User"
                          width={24}
                          height={24}
                          className="w-6 h-6"
                        />
                      : <Image
                          src="/assets/user.svg"
                          alt="User"
                          width={24}
                          height={22}
                          className="w-5.5 h-5.5"
                        />
                      }
                    </button>

                    {/* User Dropdown */}
                    {isUserDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-gradient-to-br from-red-200 to-gray-900 rounded-lg shadow-lg border border-gray-200 z-50">
                        <div className="py-2">
                          <button
                            onClick={() => handleDropdownItemClick(() => {})}
                            className="w-full text-left px-4 py-3 hover:bg-[#EA4335] transition-colors flex items-center space-x-3 cursor-pointer"
                          >
                            <svg
                              className="w-5 h-5 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            <span className="text-white">
                              {t("header.manageAccount")}
                            </span>
                          </button>
                          <button
                            onClick={() => handleDropdownItemClick(() => {})}
                            className="w-full text-left px-4 py-3 hover:bg-[#EA4335] transition-colors flex items-center space-x-3 cursor-pointer"
                          >
                            <svg
                              className="w-5 h-5 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                              />
                            </svg>
                            <span className="text-white">
                              {t("header.myOrders")}
                            </span>
                          </button>
                          <button
                            onClick={() => handleDropdownItemClick(() => {})}
                            className="w-full text-left px-4 py-3 hover:bg-[#EA4335] transition-colors flex items-center space-x-3 cursor-pointer"
                          >
                            <svg
                              className="w-5 h-5 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                            <span className="text-white">
                              {t("header.myCancellations")}
                            </span>
                          </button>
                          <button
                            onClick={() => handleDropdownItemClick(() => {})}
                            className="w-full text-left px-4 py-3 hover:bg-[#EA4335] transition-colors flex items-center space-x-3 cursor-pointer"
                          >
                            <svg
                              className="w-5 h-5 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                              />
                            </svg>
                            <span className="text-white">
                              {t("header.myReviews")}
                            </span>
                          </button>
                          <div className="border-t border-gray-200 mt-2 pt-2">
                            <button
                              onClick={() =>
                                handleDropdownItemClick(handleLogout)
                              }
                              className="w-full text-left px-4 py-3 hover:bg-[#EA4335] transition-colors flex items-center space-x-3 text-white"
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
                                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                              </svg>
                              <span>{t("header.logout")}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
