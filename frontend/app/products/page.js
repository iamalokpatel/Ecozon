"use client";
import api from "@/utils/api";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 Loading state added

  // Fetch categories on first load
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/products/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products when category changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let res;
        if (!selected) {
          res = await api.get("/products");
        } else {
          res = await api.get("/products/categories", {
            params: { category: selected.toLowerCase() },
          });
        }
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selected]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setSelected("")}
          className={`px-4 h-8 text-sm rounded-full border ${
            selected === ""
              ? "border border-green-600 rounded-xl text-green-600"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          All Data
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-4 py-1 h-8 text-sm rounded-full border capitalize ${
              selected === cat
                ? "border border-green-600 rounded-xl text-green-600"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-12 h-12 border-4 border-gray-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : products.length === 0 ? (
        <p className="text-gray-500 text-center col-span-full">
          No products found in this category.
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
