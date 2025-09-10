import React from "react";
import FeaturedProducts from "@/components/FeturersProduct";
import AllProductsList from "@/components/AllProductsList";

const HomePage = () => {
  return (
    <div className="pt-2 px-4 sm:px-8 lg:px-4">
      <section className="mb-3">
        <div className="border border-gray-200 bg-white shadow-sm text-center text-gray-500">
          <FeaturedProducts />
        </div>
      </section>

      <section>
        <AllProductsList />
      </section>
    </div>
  );
};

export default HomePage;
