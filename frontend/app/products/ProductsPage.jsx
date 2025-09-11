"use client";
import api from "@/utils/api";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function ProductsPage() {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // ✅ get cat param dynamically
  const initialCategory = searchParams.get("cat");

  // ✅ update state whenever URL param changes (refresh ke bina)
  useEffect(() => {
    if (initialCategory) {
      setSelected(initialCategory.toLowerCase());
    } else {
      setSelected("");
    }
  }, [initialCategory]); // 👈 dependency fix

  // ✅ Fetch categories once
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

  // ✅ Fetch products whenever selected category changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let res;
        if (!selected) {
          res = await api.get("/products");
        } else {
          res = await api.get("/products/categories", {
            params: { category: selected },
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

  // ✅ category click handler (update URL)
  const handleCategoryChange = (cat) => {
    if (cat) {
      router.push(`${pathname}?cat=${cat.toLowerCase()}`);
    } else {
      router.push(pathname); // reset
    }
  };

  return (
    <div className="w-full mx-auto px-6 pt-8">
      <div className="flex flex-wrap gap-3 mb-8 mt-2">
        <button
          onClick={() => handleCategoryChange("")}
          className={`px-4 h-8 text-sm rounded border ${
            selected === ""
              ? "border border-green-600 rounded-md text-green-600"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          All Data
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-1 h-8 text-sm rounded border capitalize ${
              selected === cat.toLowerCase()
                ? "border border-green-600 rounded-md text-green-600"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-10 h-10 border-4 border-gray-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : products.length === 0 ? (
        <p className="text-gray-500 text-center col-span-full">
          No products found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
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
                className="rounded transition flex justify-center"
              >
                <ProductCard product={product} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
