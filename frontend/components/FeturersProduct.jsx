"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import FeaturesProjectCard from "./FeaturesProductsCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import api from "@/utils/api"; // Your axios instance

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get("/products/featured");
        setProducts(res.data.products);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-10">
        Loading featured products...
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center text-gray-400 py-10">
        No featured products found.
      </div>
    );
  }

  return (
    <section className="rounded-2xl">
      <h2 className="text-2xl font-bold tracking-wide text-center text-gray-800 mb-10 uppercase relative after:content-[''] after:block after:w-30 after:h-1 after:bg-black after:mx-auto after:mt-2">
        Featured Products
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
        className="w-full mx-auto "
        breakpoints={{
          0: {
            slidesPerView: 1, // For mobile
          },
          768: {
            slidesPerView: 3, // For tablets and up
          },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <div className="bg-white rounded-2xl center overflow-hidden hover:shadow-xl transition duration-300 transition-shadow duration-400 cursor-pointer  shadow-4xl transition-transform duration-500 hover:scale-[1.04] hover:shadow-2xl z-100 mx-10 my-12">
              <FeaturesProjectCard key={product._id} product={product} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FeaturedProducts;
