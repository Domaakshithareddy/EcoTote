// Folder: src/components/Navbar.jsx

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-green-700 text-white shadow-md">
      <h1 className="text-xl font-bold">🌱 GreenCartAI</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Dashboard</Link>
        <Link to="/cart" className="hover:underline">Cart</Link>
        <Link to="/leaderboard" className="hover:underline">Leaderboard</Link>
        <Link to="/rewards" className="hover:underline">Rewards</Link>
        <Link to="/consumer" className="hover:underline">Consumer</Link>
        <Link to="/recycle" className="hover:underline">Recycle</Link>
      </div>
    </nav>
  );
};

export default Navbar;
