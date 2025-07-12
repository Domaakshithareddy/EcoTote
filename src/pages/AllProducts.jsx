import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import fetchJSON from "../utils/fetchJSON";
import ProductCard from "../components/ProductCard"; // ✅ Use your custom card

const AllProducts = () => {
  const { setCart } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // 🔄 Fetch products and show 20 random ones initially
  useEffect(() => {
    fetchJSON("products.json").then((data) => {
      setProducts(data);
      const randomProducts = getRandomProducts(data, 18);
      setFiltered(randomProducts);
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
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFiltered(filteredData);
  };

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, { ...product, quantity: 1 }]);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">🌿 Explore Products</h1>

      {/* 🔎 Search and Category Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-md w-full md:w-1/2"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
        <button
          onClick={handleSearchOrFilter}
          className="bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </div>

      {/* Product Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {filtered.map((p) => (
    <ProductCard key={p.id} product={p} onAdd={handleAddToCart} />
  ))}
</div>

    </div>
  );
};

export default AllProducts;
