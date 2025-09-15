"use client";
import React, { Suspense } from "react";
import ProductsPage from "./ProductsPage";

export default function ProductsPageWithSuspense() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-10">
          <div className="w-10 h-10 border-4 border-gray-500 border-dashed rounded-full animate-spin"></div>
        </div>
      }
    >
      <ProductsPage />
    </Suspense>
  );
}
