import React, { useContext, useState } from "react";
import {
  Sparkles,
  Leaf,
  MapPin,
  TrendingUp,
  ShoppingBag,
} from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import { AppContext } from "../context/AppContext";

const Consumer = () => {
  const { purchaseOrders } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState("purchase");

  const couponHistory = [
    { code: "ECO20", discount: "20%", usedOn: "05 July 2025" },
    { code: "GREEN15", discount: "15%", usedOn: "20 June 2025" },
  ];

  const donationHistory = [
    { org: "Plastic Free India", amount: "₹200", date: "02 July 2025" },
    { org: "Tree Plantation Drive", amount: "₹150", date: "12 June 2025" },
  ];

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white ml-60 mt-16 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-green-800 flex items-center gap-2 drop-shadow">
            <Sparkles className="text-green-500" />
            Consumer Sustainability Dashboard
          </h1>
          <p className="text-gray-600 mt-1 text-sm">
            Track your eco impact and achievements.
          </p>
        </div>

        {/* CO₂ + Badge */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 max-w-5xl mx-auto mb-8">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-green-100 flex items-center gap-4">
            <div className="bg-green-100 rounded-full p-2">
              <Leaf className="text-green-700 w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-green-800">
                CO₂ Saved This Week
              </h3>
              <p className="text-sm text-gray-600">
                You've saved <strong>2.4 kg</strong> of CO₂!
              </p>
              <div className="w-full h-3 bg-gray-200 rounded-full mt-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-green-600 animate-pulse"
                  style={{ width: "48%" }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Target: 5 kg</p>
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-4 border border-green-100 flex flex-col items-center justify-center">
            <h3 className="text-md font-semibold text-green-800 mb-2">
              Your Current Badge
            </h3>
            <img
              src="/images/green-supporter-badge.png"
              alt="Green Supporter Badge"
              className="w-24 h-24 object-contain"
            />
            <p className="text-green-700 font-bold mt-2 text-sm">
              🌿 Green Supporter
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
          <StatCard icon={<MapPin className="text-blue-600" />} title="Region Rank" value="#3 in Hyderabad" />
          <StatCard icon={<TrendingUp className="text-purple-600" />} title="Green Points" value="840 pts" />
          <StatCard icon={<ShoppingBag className="text-indigo-500" />} title="Eco Purchases" value="12 items" />
        </div>

        {/* History Tabs */}
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-6 border-b border-green-200 mb-4">
            {["purchase", "coupon", "donation"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 px-2 text-sm font-medium ${
                  activeTab === tab ? "text-green-700 border-b-2 border-green-600" : "text-gray-500"
                }`}
              >
                {tab === "purchase"
                  ? "Purchase History"
                  : tab === "coupon"
                  ? "Coupon History"
                  : "Donation History"}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === "purchase" &&
              purchaseOrders.map((order, index) => (
                <div key={index} className="bg-white border rounded-lg p-4 mb-4 shadow">
                  <h3 className="text-sm text-gray-500 mb-2">📦 Order on {order.date}</h3>
                  <ul className="pl-4 list-disc text-sm text-gray-700">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs mt-2 text-gray-500">
                    Delivery:{" "}
                    <span className={order.delivery === "fast" ? "text-red-600" : "text-green-600"}>
                      {order.delivery === "fast" ? "Fast (1–2 Days)" : "Slow (3–4 Days)"}
                    </span>
                  </p>
                </div>
              ))}

            {activeTab === "coupon" &&
              couponHistory.map((coupon, index) => (
                <div key={index} className="bg-white border rounded-lg p-4 mb-4 shadow">
                  <p className="text-sm">
                    🎟️ <strong>{coupon.code}</strong> — {coupon.discount} used on{" "}
                    <span className="text-gray-600">{coupon.usedOn}</span>
                  </p>
                </div>
              ))}

            {activeTab === "donation" &&
              donationHistory.map((donation, index) => (
                <div key={index} className="bg-white border rounded-lg p-4 mb-4 shadow">
                  <p className="text-sm">
                    💝 Donated <strong>{donation.amount}</strong> to{" "}
                    <span className="text-green-800 font-medium">{donation.org}</span> on{" "}
                    <span className="text-gray-600">{donation.date}</span>
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="group bg-white/60 backdrop-blur-lg border border-gray-100 shadow-md rounded-2xl p-6 text-center transition transform hover:-translate-y-1 hover:shadow-xl">
    <div className="flex justify-center mb-2">
      <div className="transform transition-transform group-hover:scale-110">{icon}</div>
    </div>
    <p className="text-sm text-gray-600">{title}</p>
    <p className="font-bold text-green-700 mt-1">{value}</p>
  </div>
);

export default Consumer;
