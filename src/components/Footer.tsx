"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/src/hooks/useTranslation";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const { t } = useTranslation();

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription:", newsletterEmail);
  };

  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Exclusive Column */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{t("header.title")}</h3>
            <p className="mb-2">{t("footer.subscribe")}</p>
            <p className="text-gray-400 text-sm mb-4">{t("footer.discount")}</p>
            <form
              onSubmit={handleNewsletter}
              className="relative flex items-center"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full px-4 py-2 pr-10 bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:border-white text-white placeholder-gray-400"
              />
              <button
                type="submit"
                className="absolute right-2 text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-4 h-4 rotate-90"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </form>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {t("footer.support")}
            </h3>
            <p className="text-gray-400 text-sm mb-2">
              {t("footer.contactInfo")}
            </p>
            <p className="text-gray-400 text-sm mb-2">exclusive@gmail.com</p>
            <p className="text-gray-400 text-sm">+88015-88888-9999</p>
          </div>

          {/* Account Column */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {t("footer.account")}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  {t("footer.manageAccount")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  {t("footer.orders")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  {t("footer.addresses")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  {t("footer.paymentMethods")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  {t("footer.wishlist")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  {t("footer.cart")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  {t("footer.logout")}
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Link Column */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Link</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Terms Of Use
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Download App Column */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Download App</h3>
            <p className="text-gray-400 text-sm mb-4">
              Save $3 with App New User Only
            </p>
            <div className="flex items-center space-x-4 mb-4">
              <div>
                <Image
                  src="/assets/Qr Code.svg"
                  alt="QR Code"
                  width={80}
                  height={80}
                  className="w-20 h-20"
                />
              </div>
              <div className="space-y-2">
                <a href="#">
                  <Image
                    src="/assets/googlePlay.svg"
                    alt="Google Play"
                    width={110}
                    height={36}
                    className="w-27.5 h-9 mb-2 rounded"
                  />
                </a>
                <a href="#">
                  <Image
                    src="/assets/appstore.svg"
                    alt="App Store"
                    width={111}
                    height={36}
                  />
                </a>
              </div>
            </div>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#EA4335] transition-colors"
              >
                <Image
                  src="/assets/facebook-icon.svg"
                  alt="facebook"
                  width={10.5}
                  height={18}
                />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#EA4335] transition-colors"
              >
                <Image
                  src="/assets/x-icon.svg"
                  alt="x"
                  width={20.6}
                  height={16.65}
                />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#EA4335] transition-colors"
              >
                <Image
                  src="/assets/insta-icon.svg"
                  alt="instagram"
                  width={18}
                  height={18}
                />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#EA4335] transition-colors"
              >
                <Image
                  src="/assets/linkedin-icon.svg"
                  alt="Linkedin"
                  width={17.5}
                  height={17.5}
                />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; Copyright Rimel 2022. All right reserved</p>
        </div>
      </div>
    </footer>
  );
}
