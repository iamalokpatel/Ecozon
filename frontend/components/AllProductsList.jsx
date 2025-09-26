"use client";
import api from "@/utils/api";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useRouter } from "next/navigation";

export default function AllProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ✅ Limit products to show on homepage
  const LIMIT = 18; // kitne products dikhane hain (change as per need)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full mx-auto">
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className="w-60 bg-white overflow-hidden rounded shadow-4xl transition-transform duration-500 hover:scale-[1.04] hover:shadow-2xl"
            >
              {/* Image placeholder */}
              <div className="w-full h-50 p-2 animate-pulse"></div>

              {/* Text / Price placeholder */}
              <div className="p-4 space-y-1">
                {/* Title */}
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                {/* Price */}
                <div className="flex gap-4 justify-center mt-2">
                  <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-10 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-gray-500 text-center col-span-full">
          No products found.
        </p>
      ) : (
        <>
          {/* Limited Products */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {products
              .slice(0, LIMIT) // ✅ show only first LIMIT products
              .filter(
                (product) =>
                  product && (product._id || (product.title && product.price))
              )
              .map((product, index) => (
                <div
                  key={
                    product._id ||
                    `${product.title}-${product.price}` ||
                    `fallback-${index}`
                  }
                  className="rounded transition flex justify-center"
                >
                  <ProductCard product={product} />
                </div>
              ))}
          </div>

          {/* Show All Button */}
          {products.length > LIMIT && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => router.push("/products")}
                className="px-6 py-2 text-sm font-medium bg-gray-100 shadow-[0_0_4px_0_rgba(0,0,0,0.1)] text-gray-400 rounded-md cursor-pointer transition"
              >
                See Collections
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
