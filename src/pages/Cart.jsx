import React, { useEffect, useState, useContext } from "react";
import fetchJSON from "../utils/fetchJSON";
import EcoTreeAvatar from "../components/EcoTreeAvatar";
import ReverseWasteSim from "../components/ReverseWasteSim";
import QuickSwapSuggestions from "../components/QuickSwapSuggestions";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

const Cart = () => {
  const { cart } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [totalCarbon, setTotalCarbon] = useState(0);

  useEffect(() => {
    fetchJSON("products.json").then(setProducts);
  }, []);

  useEffect(() => {
    const total = cart.reduce((sum, item) => {
      const prod = products.find((p) => p.id === item.id);
      return sum + (prod?.carbonScore || 0) * item.quantity;
    }, 0);
    setTotalCarbon(total);
  }, [cart, products]);

  return (
    <PageWrapper>
      <div className="p-6 max-w-5xl mx-auto space-y-6 ml-60 mt-16">
        {/* Page Title */}
        <h1 className="text-3xl font-extrabold text-green-800">
          🛒 Your Cart's Eco Impact
        </h1>

        {/* Eco Avatar + Waste Simulation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border shadow p-4">
            <EcoTreeAvatar totalCarbon={totalCarbon} />
          </div>
          <ReverseWasteSim wasteKg={totalCarbon * 0.015} />
        </div>

        {/* Swap Suggestions */}
        <div className="bg-white rounded-xl border shadow p-4">
          <h2 className="text-xl font-semibold mb-2 text-green-700">
            ♻️ Eco-Friendly Swap Suggestions
          </h2>
          <QuickSwapSuggestions cart={cart} />
        </div>

        {/* Products in Cart */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🛍 Products in Your Cart</h2>

          {cart.length === 0 ? (
            <p className="text-sm text-gray-600">Your cart is empty.</p>
          ) : (
            <ul className="space-y-3">
              {cart.map((item, index) => (
                <li key={index}>
                  <Link
                    to={`/product/${item.id}`}
                    className="block p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          Carbon: {item.carbonScore} kg CO₂ × {item.quantity}
                        </p>
                      </div>
                      <div className="text-sm font-semibold text-green-700">
                        {item.carbonScore * item.quantity} kg CO₂
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Cart;
