"use client";

import React, { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginComponent() {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        emailOrPhone: formData.emailOrPhone,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        // Handle different error types
        if (result.error === "CredentialsSignin") {
          toast.error("Invalid email or password");
        } else {
          toast.error(result.error as string);
        }
      } else {
        toast.success("Logged in successfully!");
        setFormData({ emailOrPhone: "", password: "" });
        router.push("/"); // Redirect to home
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Main Content */}
      <main className="max-w-full mx-auto pr-4 pl-0 sm:pr-6 lg:pr-36 py-16">
        <div className="flex flex-col lg:flex-row gap-38 items-center">
          {/* Left side - Hero Image */}
          <div className="flex-2 order-2 lg:order-1">
            <div className="relative">
              <div className=" rounded-r  flex items-center justify-center">
                <Image
                  src="/assets/signup-img.svg"
                  alt="Shopping illustration"
                  width={805}
                  height={781}
                  className="rounded-r max-w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Right side - Signup Form */}
          <div className="flex-1 order-1 lg:order-2">
            <div className=" p-8 px-0 max-w-md mx-auto lg:mx-0">
              <h2 className="text-3xl font-bold mb-2">Log in to Exclusive</h2>
              <p className="text-black-600 mb-6">Enter your details below</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="emailOrPhone"
                  placeholder="Email or Phone Number"
                  value={formData.emailOrPhone}
                  onChange={handleInputChange}
                  className="w-full py-3 px-2 border-b border-gray-300 focus:outline-none focus:border-black focus:border-b-2"
                  required
                  disabled={isLoading}
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full py-3 px-2 border-b border-gray-300 focus:outline-none focus:border-black focus:border-b-2"
                  required
                  disabled={isLoading}
                />

                <div className="flex justify-between items-center">
                  <button
                    type="submit"
                    className="w-32 bg-[#EA4335] text-white py-3 rounded-sm font-semibold cursor-pointer hover:bg-red-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging In..." : "Log In"}
                  </button>
                  <a
                    href="#"
                    className="text-red-500 text-sm text-right block mt-2"
                  >
                    Forget Password?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
