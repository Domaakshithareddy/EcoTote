import React, { useEffect, useState } from "react";
import { fetchJSON } from "../utils/fetchJSON";
import EcoTokenTracker from "../components/EcoTokenTracker";

const Rewards = () => {
  const tokens = 65; // Static for demo
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetchJSON("donations.json").then(setDonations);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎁 Rewards & Karma</h1>
      <EcoTokenTracker tokens={tokens} />
      <h2 className="mt-6 text-xl font-semibold">💚 Donate Tokens</h2>
      <div className="grid md:grid-cols-2 gap-4 mt-2">
        {donations.map((d) => (
          <div key={d.id} className="bg-white p-4 shadow rounded-md border">
            <h3 className="font-bold">{d.name}</h3>
            <p className="text-sm text-gray-600">{d.description}</p>
            <button
              className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
              disabled={tokens < d.tokenCost}
            >
              {tokens >= d.tokenCost ? `Donate ${d.tokenCost} Tokens` : "Not enough tokens"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rewards;