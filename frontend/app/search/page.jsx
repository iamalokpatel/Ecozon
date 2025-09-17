"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/utils/api";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Query params
  const query = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "";
  const minPriceParam = searchParams.get("minPrice") || "";
  const maxPriceParam = searchParams.get("maxPrice") || "";

  // State
  const [keyword, setKeyword] = useState(query);
  const [category, setCategory] = useState(categoryParam);
  const [minPrice, setMinPrice] = useState(minPriceParam);
  const [maxPrice, setMaxPrice] = useState(maxPriceParam);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Categories list (fixed same as backend enum)
  const categories = [
    "mobiles",
    "laptop",
    "earbuds",
    "earphone",
    "watch",
    "camera",
    "projector",
    "speaker",
    "electronic",
    "fashion",
    "others",
  ];

  // Fetch results
  useEffect(() => {
    const fetchResults = async () => {
      let queryString = `/products/search?`;
      if (query) queryString += `q=${query}&`;
      if (categoryParam) queryString += `category=${categoryParam}&`;
      if (minPriceParam) queryString += `minPrice=${minPriceParam}&`;
      if (maxPriceParam) queryString += `maxPrice=${maxPriceParam}`;

      setLoading(true);
      try {
        const res = await api.get(queryString);
        setResults(res.data || []);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, categoryParam, minPriceParam, maxPriceParam]);

  // Handle filter submit
  const handleSearch = (e) => {
    e.preventDefault();
    let url = `/search?q=${encodeURIComponent(keyword)}`;
    if (category) url += `&category=${encodeURIComponent(category)}`;
    if (minPrice) url += `&minPrice=${minPrice}`;
    if (maxPrice) url += `&maxPrice=${maxPrice}`;
    router.push(url);
  };

  return (
    <div className="min-h-screen max-w-6xl mx-auto p-4">
      {/* Filters */}
      <form
        onSubmit={handleSearch}
        className="flex flex-row gap-2 mb-6 rounded"
      >
        <input
          type="text"
          placeholder="Search keyword..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border px-3 py-1 rounded w-full text-xs md:w-30"
        />

        <div className="relative w-full md:w-30">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="appearance-none border pl-2 py-1 rounded w-full text-xs pr-8" // pr-8 for arrow space
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          {/* Custom Arrow */}
          <span className="pointer-events-none text-xs absolute right-2 top-4/7 -translate-y-1/2 text-gray-500">
            ▼
          </span>
        </div>

        <input
          type="number"
          placeholder="Min Price"
          min={0}
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border px-3 py-1 rounded text-xs w-1/2 md:w-24"
        />

        <input
          type="number"
          placeholder="Max Price"
          min={0}
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border px-3 py-1 rounded text-xs w-1/2 md:w-24"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-5 py-1 rounded text-xs hover:bg-green-700 transition"
        >
          Apply
        </button>
      </form>

      {/* Results */}
      {loading && <p>Loading...</p>}

      {!loading && results.length === 0 && (
        <p className="text-gray-500">No products found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {results.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 shadow hover:shadow-md transition"
          >
            <img
              src={product.image || "/images/placeholder.png"}
              alt={product.title}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-600">{product.subtitle}</p>
            <p className="font-bold mt-2">₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
