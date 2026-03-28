"use client";

import { Suspense } from "react";
import LoginComponent from "./LoginComponent";

export default function LoginWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginComponent />
    </Suspense>
  );
}
