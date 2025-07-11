import React from "react";

const DonationPanel = ({ donations, onDonate, tokens }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">💚 Donate Your EcoTokens</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {donations.map((d) => (
          <div key={d.id} className="bg-white p-4 shadow rounded-md border">
            <h3 className="font-bold text-lg">{d.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{d.description}</p>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
              disabled={tokens < d.tokenCost}
              onClick={() => onDonate(d.id)}
            >
              {tokens >= d.tokenCost ? `Donate ${d.tokenCost} Tokens` : "Insufficient Tokens"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationPanel;