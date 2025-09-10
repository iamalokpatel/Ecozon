import React, { Suspense } from "react";
import ProductsPage from "./productsPage";
export default function ProductsPageWithSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsPage />
    </Suspense>
  );
}
