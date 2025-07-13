// Folder: src/pages/Recycle.jsx

import React from "react";
import PageWrapper from "../components/PageWrapper"; 

const Recycle = () => {
  return (
    <PageWrapper>
    <div className="ml-60 mt-16 p-6">
      <h1 className="text-2xl font-bold mb-4">♻️ Closed-Loop Recycling</h1>
      <p className="text-gray-700 mb-4">
        Earn EcoTokens for returning used packaging to partnered centers.
      </p>

      <ul className="list-disc ml-6 text-gray-600 text-sm mb-4">
        <li>Drop off your used items at the nearest collection center.</li>
        <li>Earn rewards for bottles, electronics, packaging, etc.</li>
        <li>Track your recycling history and impact.</li>
      </ul>

      <div className="bg-emerald-100 border-l-4 border-emerald-500 p-4 rounded-md shadow-md">
        <p className="font-semibold">
          📍 Tip: Enable location to find nearby recycling points!
        </p>
      </div>
    </div>
    </PageWrapper>
  );
};

export default Recycle;
