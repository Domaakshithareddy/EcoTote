import React, { useEffect, useState, useContext } from "react";
import fetchJSON from "../utils/fetchJSON";
import EcoTokenTracker from "../components/EcoTokenTracker";
import { AppContext } from "../context/AppContext";

const Rewards = () => {
  const { tokens, setTokens } = useContext(AppContext);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetchJSON("donations.json").then(setDonations);
  }, []);

  const handleDonate = (id) => {
    const selected = donations.find((d) => d.id === id);
    if (selected && tokens >= selected.tokenCost) {
      setTokens(tokens - selected.tokenCost);
      alert(`✅ Donated ${selected.tokenCost} tokens to ${selected.name}`);
    }
  };

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
              onClick={() => handleDonate(d.id)}
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