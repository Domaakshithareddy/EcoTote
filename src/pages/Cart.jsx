import React, { useEffect, useState, useContext } from "react";
import fetchJSON from "../utils/fetchJSON";
import EcoTreeAvatar from "../components/EcoTreeAvatar";
import ReverseWasteSim from "../components/ReverseWasteSim";
import QuickSwapSuggestions from "../components/QuickSwapSuggestions";
import { AppContext } from "../context/AppContext";

const Cart = () => {
  const { cart } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [totalCarbon, setTotalCarbon] = useState(0);

  useEffect(() => {
    fetchJSON("products.json").then(setProducts);
  }, []);

  useEffect(() => {
    const total = cart.reduce((sum, item) => {
      const prod = products.find((p) => p.id === item.productId);
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
    </div>
  );
};

export default Cart;