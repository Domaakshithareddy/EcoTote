import React, { useEffect, useState } from "react";
import fetchJSON from "../utils/fetchJSON";

const QuickSwapSuggestions = ({ cart }) => {
  const [swaps, setSwaps] = useState([]);

  useEffect(() => {
    fetchJSON("wasteSwapSuggestions.json").then((data) => {
      const matching = cart
        .map((item) => data.find((swap) => swap.productId === item.productId))
        .filter(Boolean);
      setSwaps(matching);
    });
  }, [cart]);

  return (
    <div className="space-y-3">
      {swaps.length === 0 ? (
        <p className="text-gray-500 text-sm">No swap suggestions available.</p>
      ) : (
        swaps.map((swap, idx) => (
          <div
            key={idx}
            className="p-3 bg-green-50 border border-green-200 rounded-md hover:bg-green-100 transition"
          >
            <p className="text-sm">
              <strong className="text-green-800">Try:</strong>{" "}
              {swap.alternative}
            </p>
            <p className="text-xs text-gray-600">{swap.benefit}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default QuickSwapSuggestions;
