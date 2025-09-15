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
        <div className="flex justify-center py-10">
          <div className="w-12 h-12 border-4 border-gray-500 border-dashed rounded-full animate-spin"></div>
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
                className="px-6 py-2 text-sm font-medium bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Show All Products
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
