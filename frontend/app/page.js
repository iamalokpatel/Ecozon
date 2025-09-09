import React from "react";
import FeaturedProducts from "@/components/FeturersProduct";
import AllProductsList from "@/components/AllProductsList";

const HomePage = () => {
  return (
    <div className="min-h-screen pt-2 pb-16  px-4 sm:px-8  lg:px-4">
      <section className="mb-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
          <div className="border border-gray-200 bg-[#FFFFFF]  shadow-sm text-center text-gray-500 z-10">
            <FeaturedProducts />
          </div>
        </div>
      </section>
      <section>
        <AllProductsList />
      </section>
    </div>
  );
};

export default HomePage;
