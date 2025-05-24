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
    <section className="py-10 bg-gray-100 rounded-2xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Featured Products
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
        className="w-full mx-auto !px-10"
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
            <div className="bg-white rounded-2xl center overflow-hidden shadow-md hover:shadow-xl transition duration-300">
              <FeaturesProjectCard key={product._id} product={product} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FeaturedProducts;
