import React, { useEffect, useState, useContext } from "react";
import fetchJSON from "../utils/fetchJSON";
import EcoTokenTracker from "../components/EcoTokenTracker";
import { AppContext } from "../context/AppContext";
import PageWrapper from "../components/PageWrapper";
import { Gift, TicketPercent, Leaf, X } from "lucide-react";

const Rewards = () => {
  const {
    tokens,
    setTokens,
    couponHistory,
    setCouponHistory,
    donationHistory,
    setDonationHistory,
    sidebarCollapsed,
  } = useContext(AppContext);

  const [coupons, setCoupons] = useState([]);
  const [donations, setDonations] = useState([]);
  const [tab, setTab] = useState("coupons");
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [donationAmount, setDonationAmount] = useState("");

  useEffect(() => {
    fetchJSON("coupons.json").then(setCoupons);
    fetchJSON("donations.json").then(setDonations);
  }, []);

  const handleRedeem = (id) => {
    const selected = coupons.find((c) => c.id === id);
    if (selected && tokens >= selected.tokenCost) {
      setTokens(tokens - selected.tokenCost);
      const formattedDate = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      setCouponHistory((prev) => [
        {
          code: selected.code,
          discount: selected.description,
          usedOn: formattedDate,
        },
        ...prev,
      ]);

      alert(`🎉 You redeemed ${selected.tokenCost} tokens for ${selected.brand}'s coupon!`);
    }
  };

  const confirmDonation = () => {
    const amount = parseInt(donationAmount);
    if (isNaN(amount) || amount <= 0 || amount > tokens) {
      alert("❌ Enter a valid donation amount within your token balance.");
      return;
    }

    setTokens(tokens - amount);
    const formattedDate = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    setDonationHistory((prev) => [
      {
        org: selectedDonation.name,
        amount: `${amount} tokens`,
        date: formattedDate,
      },
      ...prev,
    ]);

    alert(`✅ Donated ${amount} tokens to ${selectedDonation.name}`);
    setSelectedDonation(null);
    setDonationAmount("");
  };

  return (
    <PageWrapper>
      <div 
        className="pt-24 p-6 transition-all duration-300"
        style={{
          marginLeft: sidebarCollapsed ? '4rem' : '15rem'
        }}
      >
        {/* Header */}
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2 text-green-800">
          <Gift className="w-6 h-6" />
          Coupons and Donations
        </h1>

        {/* EcoTokens */}
        <EcoTokenTracker tokens={tokens} />

        {/* Promo Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mt-6 mb-4">
          <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-4 rounded-lg shadow border">
            <p className="font-semibold text-blue-800">Make purchase above ₹999 to earn rewards</p>
            <span className="text-sm font-bold bg-blue-200 px-2 py-1 rounded inline-block mt-1">Earn: 50 tokens</span>
          </div>
          <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-4 rounded-lg shadow border">
            <p className="font-semibold text-blue-800">Refer EcoTote to a friend</p>
            <p className="text-sm text-gray-600 mt-1">Earn 20 tokens using referral code:</p>
            <span className="text-sm font-bold bg-blue-200 px-2 py-1 rounded inline-block mt-1">NEWTOTE</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mt-4 mb-6">
          <button
            onClick={() => setTab("coupons")}
            className={`px-4 py-2 rounded flex items-center gap-2 ${
              tab === "coupons" ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
          >
            <TicketPercent className="w-4 h-4" />
            Coupons
          </button>
          <button
            onClick={() => setTab("donations")}
            className={`px-4 py-2 rounded flex items-center gap-2 ${
              tab === "donations" ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
          >
            <Leaf className="w-4 h-4" />
            Donate
          </button>
        </div>

        {/* Active Tab - Coupons */}
        {tab === "coupons" && (
          <>
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

            {couponHistory.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <TicketPercent className="w-5 h-5 text-green-700" />
                  Coupon History
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {couponHistory.map((c, idx) => (
                    <div key={idx} className="bg-gray-50 border rounded-lg p-4 shadow-sm">
                      <p className="font-semibold text-green-700">{c.code}</p>
                      <p className="text-sm text-gray-600">{c.discount}</p>
                      <p className="text-xs text-gray-500 mt-1">Used on: {c.usedOn}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Active Tab - Donations */}
        {tab === "donations" && (
          <>
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

            {donationHistory.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-700" />
                  Donation History
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {donationHistory.map((d, idx) => (
                    <div key={idx} className="bg-emerald-50 border rounded-lg p-4 shadow-sm">
                      <p className="text-green-800 font-semibold">{d.amount} to {d.org}</p>
                      <p className="text-xs text-gray-500 mt-1">Donated on: {d.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Coupon Modal */}
        {selectedCoupon && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-black"
                onClick={() => setSelectedCoupon(null)}
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold mb-2">{selectedCoupon.brand} Coupon</h2>
              <p className="mb-2 text-sm text-gray-700">{selectedCoupon.description}</p>
              <p className="text-sm">
                <strong>Coupon Code:</strong>{" "}
                <span className="bg-gray-200 px-2 py-1 rounded text-green-800">
                  {selectedCoupon.code}
                </span>
              </p>
              <p className="text-sm mt-1"><strong>Expires on:</strong> {selectedCoupon.expiry}</p>
              <p className="text-sm mt-1"><strong>Token Cost:</strong> {selectedCoupon.tokenCost}</p>
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

        {/* Donation Modal */}
        {selectedDonation && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-black"
                onClick={() => setSelectedDonation(null)}
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold mb-2">Confirm Donation</h2>
              <p className="text-sm text-gray-700 mb-2">
                You're donating to: <strong>{selectedDonation.name}</strong>
              </p>
              <p className="text-sm mb-2">You currently have: <strong>{tokens} EcoTokens</strong></p>
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
      </div>
    </PageWrapper>
  );
};

export default Rewards;