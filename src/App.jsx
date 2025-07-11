import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import Leaderboard from "./pages/Leaderboard";
import Rewards from "./pages/Rewards";
import Consumer from "./pages/Consumer";
import Recycle from "./pages/Recycle";
import Shop from "./pages/Shop";
import Navbar from "./components/Navbar";
import FunFactPopup from "./components/FunFactPopup";
import AppProvider from "./context/AppProvider";

const App = () => {
  return (
    <Router>
      <AppProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/consumer" element={<Consumer />} />
            <Route path="/recycle" element={<Recycle />} />
            <Route path="/shop" element={<Shop />} />
          </Routes>
          <FunFactPopup />
        </div>
      </AppProvider>
    </Router>
  );
};

export default App;