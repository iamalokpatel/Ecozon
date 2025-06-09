"use client";
import api from "@/utils/api";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function AllProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="max-w-7xl mx-auto p-6">
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-12 h-12 border-4 border-gray-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : products.length === 0 ? (
        <p className="text-gray-500 text-center col-span-full">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {products
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
                className="rounded p-4 transition center flex justify-center"
              >
                <ProductCard key={product._id} product={product} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
