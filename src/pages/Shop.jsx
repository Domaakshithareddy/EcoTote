// src/pages/Shop.jsx
import React, { useEffect, useState, useContext } from "react";
import fetchJSON from '../utils/fetchJSON';
import ProductImpact from "../components/ProductImpactCard";
import { AppContext } from "../context/AppContext";
import PageWrapper from "../components/PageWrapper"; 

const Shop = () => {
  const [products, setProducts] = useState([]);
  const { setCart } = useContext(AppContext);

  useEffect(() => {
    fetchJSON("products.json").then(setProducts);
  }, []);

  const addToCart = (product) => {
    setCart((prev) => [...prev, { ...product, quantity: 1 }]);
  };

  return (
    <PageWrapper>
    <div className="ml-60 mt-16 p-6">
      <h1 className="text-2xl font-bold mb-4">🛍 Shop</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="border p-4 rounded shadow">
            <ProductImpact product={p} />
            <button
              className="mt-2 bg-green-600 text-white px-4 py-1 rounded"
              onClick={() => addToCart(p)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
    </PageWrapper>
  );
};

export default Shop;
