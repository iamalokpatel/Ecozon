"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
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
      category: "laptop",
    },
    {
      _id: 2,
      title: "Product Two",
      description: "This is the second product description",
      price: 1499,
      image: "/images/features2.webp",
      category: "mobiles",
    },
    {
      _id: 3,
      title: "Product Three",
      description: "This is the third product description",
      price: 1999,
      image: "/images/features3.webp",
      category: "camera",
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
            {/*  Category lowercase in query param */}
            <Link href={`/products?cat=${product.category.toLowerCase()}`}>
              <div className="bg-black overflow-hidden mb-6 cursor-pointer relative">
                <div className="w-full h-60">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                  />
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
