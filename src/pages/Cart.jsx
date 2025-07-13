import React, { useEffect, useState, useContext } from "react";
import fetchJSON from "../utils/fetchJSON";
import EcoTreeAvatar from "../components/EcoTreeAvatar";
import ReverseWasteSim from "../components/ReverseWasteSim";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

const Cart = () => {
  const { cart, setCart } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [alternatives, setAlternatives] = useState({});
  const [totalCarbon, setTotalCarbon] = useState(0);
  const [swappedItems, setSwappedItems] = useState([]);

  useEffect(() => {
    fetchJSON("products.json").then(setProducts);
    fetchJSON("alternatives.json").then(setAlternatives);
  }, []);

  useEffect(() => {
    const total = cart.reduce((sum, item) => {
      const prod = products.find((p) => p.id === item.id);
      return sum + (prod?.carbonScore || 0) * item.quantity;
    }, 0);
    setTotalCarbon(total);
  }, [cart, products]);

  const getProductByName = (name) =>
    products.find((p) => p.name.toLowerCase() === name.toLowerCase());

  const handleSwapItem = (item) => {
    const altList = alternatives[item.name];
    if (!altList || altList.length === 0) return;

    const altName = altList[0];
    const newItem = getProductByName(altName);
    if (!newItem) return;

    if (window.confirm("🌱 You're making an eco-friendly choice! Confirm swap?")) {
      setCart((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...newItem, quantity: item.quantity } : i
        )
      );
      setSwappedItems((prev) => [...prev, item.name]);
    }
  };

  const handleSwapAll = () => {
    const newCart = cart.map((item) => {
      const altList = alternatives[item.name];
      if (!altList || altList.length === 0) return item;

      const altName = altList[0];
      const newItem = getProductByName(altName);
      return newItem ? { ...newItem, quantity: item.quantity } : item;
    });

    if (window.confirm("🌍 Great job! Confirm swapping all possible items?")) {
      setCart(newCart);
      setSwappedItems(cart.map((item) => item.name));
    }
  };

  return (
    <PageWrapper>
      <div className="p-6 max-w-5xl ml-60 mt-16 space-y-6">
        {/* Title & Swap All */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-green-800">
            🛒 Your Cart's Eco Impact
          </h1>
        </div>

        {/* Avatar + Waste */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border shadow p-4">
            <EcoTreeAvatar totalCarbon={totalCarbon} />
          </div>
          <ReverseWasteSim wasteKg={totalCarbon * 0.015} />
        </div>

        {/* 🛍 Cart Items */}
        <div className="bg-white rounded-xl border shadow p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            🛍 Products in Your Cart
          </h2>
          {cart.length === 0 ? (
            <p className="text-sm text-gray-600">Your cart is empty.</p>
          ) : (
            <ul className="space-y-3">
              {cart.map((item, index) => (
                <li key={index}>
                  <Link
                    to={`/product/${item.id}`}
                    className="block p-4 border rounded-xl hover:shadow transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          Carbon: {item.carbonScore} g CO₂ × {item.quantity}
                        </p>
                      </div>
                      <div className="text-sm font-semibold text-green-700">
                        {item.carbonScore * item.quantity} g CO₂
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ♻️ Swap Suggestions */}
        {cart.some((item) => alternatives[item.name]) && (
          <div className="border-2 border-green-400 bg-green-50 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
  <h2 className="text-xl font-semibold text-green-800">
    ♻️ Eco-Friendly Swaps Available
  </h2>
  {cart.length > 0 && (
    <button
      onClick={handleSwapAll}
      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
    >
      ♻️ Swap All
    </button>
  )}
</div>

            <ul className="space-y-3">
              {cart.map((item, index) => {
                const altList = alternatives[item.name];
                if (!altList || altList.length === 0) return null;

                const altName = altList[0];
                const altItem = getProductByName(altName);

                if (!altItem || swappedItems.includes(item.name)) return null;

                return (
                  <li key={index} className="bg-white p-4 rounded-xl shadow-sm border flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-800">{altItem.name}</h3>
                      <p className="text-sm text-gray-600">
                        Carbon: {altItem.carbonScore} g CO₂ × {item.quantity}
                      </p>
                    </div>
                    <button
                      onClick={() => handleSwapItem(item)}
                      className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-1.5 rounded-md"
                    >
                      Swap Item
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {/* ✅ Place Order Button */}
{cart.length > 0 && (
  <div className="flex justify-center">
    <Link
      to="/place-order"
      className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg shadow"
    >
      ✅ Place Order
    </Link>
  </div>
)}
      </div>
    </PageWrapper>
  );
};

export default Cart;
