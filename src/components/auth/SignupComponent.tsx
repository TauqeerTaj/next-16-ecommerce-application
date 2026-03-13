"use client";

import React, { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignupComponent() {
  const [formData, setFormData] = useState({
    name: "",
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
        name: formData.name,
        emailOrPhone: formData.emailOrPhone,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        // Handle different error types
        if (result.error === "CredentialsSignin") {
          toast.error("User already exists");
        } else {
          toast.error(result.error as string);
        }
      } else {
        toast.success("Account created successfully!");
        setFormData({ name: "", emailOrPhone: "", password: "" });
        router.push("/"); // Redirect to home
      }
    } catch (error) {
      console.error("Signup error:", error);
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
              <h2 className="text-3xl font-bold mb-2">Create an account</h2>
              <p className="text-black-600 mb-6">Enter your details below</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full py-3 px-2 border-b border-gray-300 focus:outline-none focus:border-black focus:border-b-2"
                  required
                  disabled={isLoading}
                />

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

                <button
                  type="submit"
                  className="w-full bg-[#EA4335] text-white py-3 rounded-lg font-semibold cursor-pointer hover:bg-red-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </button>

                <button
                  type="button"
                  className="w-full bg-white border border-gray-300 py-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23c2.97 0 5.46-.98 7.28-2.66z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Sign up with Google</span>
                </button>
              </form>

              <p className="text-center mt-6 text-gray-600">
                Already have account?{" "}
                <a
                  href="/auth/login"
                  className="font-semibold text-gray-600 hover:text-red-500 border-b border-gray-600"
                >
                  Log in
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
