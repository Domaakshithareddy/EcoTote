import React, { useEffect, useState, useContext } from "react";
import fetchJSON from "../utils/fetchJSON";
import EcoTokenTracker from "../components/EcoTokenTracker";
import { AppContext } from "../context/AppContext";

const Rewards = () => {
  const { tokens, setTokens } = useContext(AppContext);
  const [coupons, setCoupons] = useState([]);
  const [donations, setDonations] = useState([]);
  const [tab, setTab] = useState("coupons");
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [donationAmount, setDonationAmount] = useState("");
  const [redeemedCoupons, setRedeemedCoupons] = useState([]);
  const [donationHistory, setDonationHistory] = useState([]);


  useEffect(() => {
    fetchJSON("coupons.json").then(setCoupons);
    fetchJSON("donations.json").then(setDonations);
  }, []);

  const handleRedeem = (id) => {
    const selected = coupons.find((c) => c.id === id);
    if (selected && tokens >= selected.tokenCost) {
      setTokens(tokens - selected.tokenCost);
      alert(`🎉 You redeemed ${selected.tokenCost} tokens for ${selected.brand}'s coupon!`);
      setRedeemedCoupons((prev) => [...prev, selected]);
    }
  };

  const confirmDonation = () => {
    const amount = parseInt(donationAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("❌ Please enter a valid donation amount.");
      return;
    }
    if (amount > tokens) {
      alert("❌ You don't have enough tokens.");
      return;
    }
    setTokens(tokens - amount);
    setDonationHistory((prev) => [
      ...prev,
      { ...selectedDonation, donated: donationAmount, date: new Date().toISOString() },
    ]);
    alert(`✅ Donated ${amount} tokens to ${selectedDonation.name}`);
    setSelectedDonation(null);
    setDonationAmount("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎁 Rewards & Karma</h1>
      <EcoTokenTracker tokens={tokens} />

      {/* Tabs */}
      <div className="flex gap-4 mt-6 mb-4">
        <button
          onClick={() => setTab("coupons")}
          className={`px-4 py-2 rounded ${tab === "coupons" ? "bg-green-600 text-white" : "bg-gray-200"}`}
        >
          🎟️ Coupons
        </button>
        <button
          onClick={() => setTab("donations")}
          className={`px-4 py-2 rounded ${tab === "donations" ? "bg-green-600 text-white" : "bg-gray-200"}`}
        >
          🌱 Donate
        </button>
      </div>

      {/* Coupons */}
      {tab === "coupons" && (
        <div className="grid md:grid-cols-2 gap-4">
          {coupons.map((c) => (
            <div key={c.id} className="bg-white p-4 shadow rounded-md border">
              <h3 className="font-bold">{c.brand}</h3>
              <p className="text-sm text-gray-600">{c.description}</p>
              <button
                className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
                disabled={tokens < c.tokenCost}
                onClick={() => setSelectedCoupon(c)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Donations */}
      {tab === "donations" && (
        <div className="grid md:grid-cols-2 gap-4">
          {donations.map((d) => (
            <div key={d.id} className="bg-white p-4 shadow rounded-md border">
              <h3 className="font-bold">{d.name}</h3>
              <p className="text-sm text-gray-600">{d.description}</p>
              <div className="flex justify-between items-center mt-2">
                <button
                  className="px-3 py-1 bg-green-500 text-white rounded"
                  onClick={() => {
                    setSelectedDonation(d);
                    setDonationAmount("");
                  }}
                >
                  Donate
                </button>
                <a
                  href={d.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm underline text-blue-600 ml-2 mt-1"
                >
                  Know More →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Coupon Modal */}
      {selectedCoupon && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => setSelectedCoupon(null)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-2">{selectedCoupon.brand} Coupon</h2>
            <p className="mb-2 text-sm text-gray-700">{selectedCoupon.description}</p>
            <p className="text-sm">
              <strong>Coupon Code:</strong>{" "}
              <span className="bg-gray-200 px-2 py-1 rounded text-green-800">
                {selectedCoupon.code}
              </span>
            </p>
            <p className="text-sm mt-1">
              <strong>Expires on:</strong> {selectedCoupon.expiry}
            </p>
            <p className="text-sm mt-1">
              <strong>Token Cost:</strong> {selectedCoupon.tokenCost}
            </p>
            <button
              onClick={() => {
                handleRedeem(selectedCoupon.id);
                setSelectedCoupon(null);
              }}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Redeem Coupon
            </button>
          </div>
        </div>
      )}

      {/* Donation Confirmation Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => setSelectedDonation(null)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-2">Confirm Donation</h2>
            <p className="text-sm text-gray-700 mb-2">
              You're donating to: <strong>{selectedDonation.name}</strong>
            </p>
            <p className="text-sm mb-2">
              You currently have: <strong>{tokens} EcoTokens</strong>
            </p>
            <input
              type="number"
              min="1"
              max={tokens}
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              placeholder="Enter tokens to donate"
              className="w-full border rounded px-3 py-2 text-sm"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setSelectedDonation(null)}
                className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDonation}
                className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Confirm Donation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Redeemed Coupons Section */}
{redeemedCoupons.length > 0 && (
  <div className="mt-10">
    <h2 className="text-xl font-semibold mb-2">🎟️ Redeemed Coupons</h2>
    <ul className="space-y-2 text-sm">
      {redeemedCoupons.map((c, idx) => (
        <li key={idx} className="bg-gray-100 p-3 rounded shadow-sm">
          <strong>{c.brand}</strong> – <span>{c.description}</span> – 
          <span className="ml-1 text-green-700">{c.tokenCost} tokens</span>
        </li>
      ))}
    </ul>
  </div>
)}

{/* Donation History Section */}
{donationHistory.length > 0 && (
  <div className="mt-8">
    <h2 className="text-xl font-semibold mb-2">🌱 Donation History</h2>
    <ul className="space-y-2 text-sm">
      {donationHistory.map((d, idx) => (
        <li key={idx} className="bg-emerald-50 p-3 rounded shadow-sm">
          Donated <strong className="text-green-800">{d.donated}</strong> tokens to <strong>{d.name}</strong>{" "}
          on <span className="text-gray-600">{new Date(d.date).toLocaleString()}</span>
        </li>
      ))}
    </ul>
  </div>
)}

    </div>
  );
};

export default Rewards;
