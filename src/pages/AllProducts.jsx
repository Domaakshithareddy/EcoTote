import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import fetchJSON from "../utils/fetchJSON";
import ProductCard from "../components/ProductCard";
import PageWrapper from "../components/PageWrapper";

const AllProducts = () => {
  const { setCart } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchJSON("products.json").then((data) => {
      setProducts(data);
      setFiltered(getRandomProducts(data, 18));
    });
  }, []);

  const getRandomProducts = (arr, count) => {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const handleSearchOrFilter = () => {
    const filteredData = products.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const query = search.toLowerCase();
      const matchesSearch =
        p.name.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query) ||
        p.subcategory?.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
    setFiltered(filteredData);
  };

  useEffect(() => {
    handleSearchOrFilter();
  }, [search, category]);

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, { ...product, quantity: 1 }]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchOrFilter();
    }
  };

  return (
    <PageWrapper>
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-green-800 mb-6">🌿 Explore Products</h1>

        {/* 🔍 Search & Filter */}
        <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-4 mb-8">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Search by name, category, or subcategory..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
  
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                &#x2715;
              </button>
            )}
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>

          <button
            onClick={handleSearchOrFilter}
            className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-all"
          >
            🔍 Search
          </button>
        </div>

        {/* 🛍 Products Grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 text-sm">No products found for your search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={handleAddToCart} />
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default AllProducts;
