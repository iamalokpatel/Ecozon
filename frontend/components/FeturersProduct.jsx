"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Link from "next/link"; // 👈 Next.js Link use karenge
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const FeaturedProducts = () => {
  const products = [
    {
      _id: 1,
      title: "Product One",
      description: "This is the first product description",
      price: 999,
      image: "/images/features1.webp",
      category: "laptop", // 👈 category set
    },
    {
      _id: 2,
      title: "Product Two",
      description: "This is the second product description",
      price: 1499,
      image: "/images/features2.webp",
      category: "mobiles", // 👈 category set
    },
    {
      _id: 3,
      title: "Product Three",
      description: "This is the third product description",
      price: 1999,
      image: "/images/features3.webp",
      category: "camera", // 👈 category set
    },
  ];

  return (
    <section className="rounded-2xl">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
        className="w-full mx-auto custom-swiper"
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 1 }, // always 1 like Flipkart
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            {/* 👇 Link lagaya hai category page ke liye */}
            <Link href={`/products?cat=${product.category}`}>
              <div className="bg-black overflow-hidden mb-6 cursor-pointer">
                <div className="w-full overflow-hidden">
                  <div className="w-full h-60">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FeaturedProducts;
