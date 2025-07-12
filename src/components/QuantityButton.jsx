// src/components/QuantityButton.jsx
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const QuantityButton = ({ product }) => {
  const { cart, setCart } = useContext(AppContext);
  const item = cart.find((item) => item.id === product.id);

  const increment = () => {
    if (item) {
      setCart(
        cart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const decrement = () => {
    if (item && item.quantity === 1) {
      setCart(cart.filter((p) => p.id !== product.id));
    } else {
      setCart(
        cart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
        )
      );
    }
  };

  return !item ? (
    <button
      onClick={increment}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition"
    >
      ➕ Add to Cart
    </button>
  ) : (
    <div className="flex items-center space-x-2 border rounded px-3 py-1 bg-gray-100">
      <button
        onClick={decrement}
        className="text-green-600 font-bold px-2 text-lg hover:text-green-800"
      >
        −
      </button>
      <span className="text-sm font-semibold">{item.quantity}</span>
      <button
        onClick={increment}
        className="text-green-600 font-bold px-2 text-lg hover:text-green-800"
      >
        +
      </button>
    </div>
  );
};

export default QuantityButton;
