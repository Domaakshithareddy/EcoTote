import React, { useEffect, useState, useContext } from "react";
import fetchJSON from "../utils/fetchJSON";
import EcoTreeAvatar from "../components/EcoTreeAvatar";
import ReverseWasteSim from "../components/ReverseWasteSim";
import QuickSwapSuggestions from "../components/QuickSwapSuggestions";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart's Eco Impact</h1>
      <EcoTreeAvatar totalCarbon={totalCarbon} />
      <div className="my-4">
        <ReverseWasteSim wasteKg={totalCarbon * 0.015} />
      </div>
      <QuickSwapSuggestions cart={cart} />
      <div className="mt-6">
  <h2 className="text-xl font-semibold mb-2">🛍 Products in Your Cart</h2>
  {cart.length === 0 ? (
    <p className="text-sm text-gray-600">Your cart is empty.</p>
  ) : (
    <ul className="space-y-3">
      {cart.map((item, index) => (
        <li key={index}>
          <Link
            to={`/product/${item.id}`}
            className="block p-3 border rounded bg-white shadow-sm hover:bg-green-50 transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  Carbon: {item.carbonScore} kg CO₂ × {item.quantity}
                </p>
              </div>
              <div className="text-sm font-semibold">
                Total: {item.carbonScore * item.quantity} kg CO₂
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )}
</div>
    </div>
  );
};

export default Cart;