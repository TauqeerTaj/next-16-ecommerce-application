"use client";

import { useEffect, useState } from "react";

export default function LoadingSpinner() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Listen for navigation events
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);
    const handleError = () => setIsLoading(false);

    // Add event listeners for navigation
    window.addEventListener("beforeunload", handleStart);

    // Listen for popstate (back/forward buttons)
    const handlePopState = () => {
      handleStart();
      setTimeout(handleComplete, 500); // Simulate route change
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleStart);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-gray-50 bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
