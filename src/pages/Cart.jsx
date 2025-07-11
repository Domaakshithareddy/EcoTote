import React, { useEffect, useState } from "react";
import { fetchJSON } from "../utils/fetchJSON";
import EcoTreeAvatar from "../components/EcoTreeAvatar";
import ReverseWasteSim from "../components/ReverseWasteSim";
import QuickSwapSuggestions from "../components/QuickSwapSuggestions";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalCarbon, setTotalCarbon] = useState(0);

  useEffect(() => {
    Promise.all([
      fetchJSON("userCart.json"),
      fetchJSON("products.json")
    ]).then(([cartData, productData]) => {
      setCart(cartData.cartItems);

      const total = cartData.cartItems.reduce((sum, item) => {
        const prod = productData.find(p => p.id === item.productId);
        return sum + (prod?.carbonScore || 0) * item.quantity;
      }, 0);
      setTotalCarbon(total);
    });
  }, []);

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