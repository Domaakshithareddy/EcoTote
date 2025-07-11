// Folder: src/pages/Home.jsx

import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-green-700 mb-4">🌍 Welcome to GreenCartAI</h1>
      <p className="text-gray-700 text-lg mb-6">
        Empowering sustainable shopping through AI-driven impact insights.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/cart"
          className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
        >
          View My Cart
        </Link>
        <Link
          to="/leaderboard"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
        >
          Leaderboard
        </Link>
        <Link
          to="/rewards"
          className="bg-amber-500 text-white px-5 py-3 rounded-lg hover:bg-amber-600"
        >
          Rewards
        </Link>
      </div>
    </div>
  );
};

export default Home;
