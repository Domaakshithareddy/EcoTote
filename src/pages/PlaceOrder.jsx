import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

const PlaceOrder = () => {
  const { cart, setCart, setPurchaseOrders } = useContext(AppContext);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
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
    alert("✅ Order placed successfully!");
    navigate("/consumer");
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
            <label>
              <input
                type="radio"
                name="delivery"
                value="fast"
                onChange={() => setSelectedDelivery("fast")}
                className="mr-2"
              />
              <div className="bg-white p-4 rounded-lg border shadow hover:shadow-lg cursor-pointer">
                <p className="font-semibold">Fast Delivery (1–2 Days)</p>
                <p className="text-sm text-gray-600">🚨 Higher carbon emissions</p>
              </div>
            </label>

            <label>
              <input
                type="radio"
                name="delivery"
                value="slow"
                onChange={() => setSelectedDelivery("slow")}
                className="mr-2"
              />
              <div className="bg-white p-4 rounded-lg border shadow hover:shadow-lg cursor-pointer">
                <p className="font-semibold">Slow Delivery (3–4 Days)</p>
                <p className="text-sm text-green-600">🌱 Lower carbon footprint</p>
              </div>
            </label>
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
    </PageWrapper>
  );
};

export default PlaceOrder;
