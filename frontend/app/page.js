import React from "react";
import Link from "next/link";
import ProductsPage from "./products/page";
import FeaturedProducts from "@/components/FeturersProduct";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 py-12 px-4 sm:px-8 lg:px-16">
      <section className="text-center mb-16">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-600 mb-4">
          Find Your Dream Home
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
          Browse through our collection of stunning products available for buy
        </p>
        <Link href="/products">
          <button className="inline-block cursor-pointer bg-blue-400 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300">
            Browse All Products
          </button>
        </Link>
      </section>

      <section className="mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
          <div className="border border-gray-200 p-6 rounded-2xl shadow-sm text-center text-gray-500">
            <FeaturedProducts />
          </div>
        </div>
      </section>
      <section>
        <ProductsPage />
      </section>
    </div>
  );
};

export default HomePage;
