import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import confetti from "canvas-confetti";

const PlaceOrder = () => {
  const { cart, setCart, setPurchaseOrders } = useContext(AppContext);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    if (!selectedDelivery) return;

    const newOrder = {
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      items: cart,
      delivery: selectedDelivery,
    };

    setPurchaseOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    confetti({
  particleCount: 150,
  spread: 100,
  origin: { y: 0.6 }
});
setShowPopup(true);
setTimeout(() => {
  setShowPopup(false);
  navigate("/consumer");
}, 3000);

  };

  return (
    <PageWrapper>
      <div className="min-h-screen ml-60 mt-16 p-6 grid grid-cols-1 md:grid-cols-[2fr_1px_2fr] gap-6 max-w-6xl mx-auto">
        {/* Left - Cart Summary */}
        <div>
          <h2 className="text-xl font-bold text-green-800 mb-4">🛒 Final Items</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">No items in cart.</p>
          ) : (
            <ul className="space-y-3">
              {cart.map((item, index) => (
                <li key={index} className="bg-white p-4 rounded-xl shadow border">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity} | Carbon: {item.carbonScore} g
                      </p>
                    </div>
                    <p className="text-green-700 font-semibold">
                      {item.carbonScore * item.quantity} g CO₂
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Center - Divider */}
        <div className="bg-green-300 w-full h-full"></div>

        {/* Right - Delivery Options */}
        <div>
          <h2 className="text-xl font-bold text-green-800 mb-4">🚚 Choose Delivery</h2>
          <div className="space-y-4">
  {[
    {
      type: "fast",
      label: "Fast Delivery (1–2 Days)",
      desc: "🚨 Higher carbon emissions",
      textColor: "text-gray-600",
    },
    {
      type: "slow",
      label: "Slow Delivery (3–4 Days)",
      desc: "🌱 Lower carbon footprint",
      textColor: "text-green-600",
    },
  ].map((option) => (
    <div
      key={option.type}
      onClick={() => setSelectedDelivery(option.type)}
      className={`cursor-pointer p-4 rounded-lg border shadow hover:shadow-lg transition-all ${
        selectedDelivery === option.type
          ? "border-2 border-green-600 bg-green-50"
          : "border-gray-200"
      }`}
    >
      <p className="font-semibold text-gray-800">{option.label}</p>
      <p className={`text-sm ${option.textColor}`}>{option.desc}</p>
    </div>
  ))}
</div>


          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            disabled={!selectedDelivery}
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 w-full"
          >
            ✅ Place Order
          </button>
        </div>
      </div>
      {showPopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-white rounded-xl shadow-2xl p-8 text-center w-80 border-4 border-green-600 animate-bounce">
      <h2 className="text-2xl font-extrabold text-green-700 mb-2">🎉 Order Placed!</h2>
      <p className="text-gray-700 text-sm">Thanks for making an eco-conscious choice!</p>
    </div>
  </div>
)}

    </PageWrapper>
  );
};

export default PlaceOrder;
