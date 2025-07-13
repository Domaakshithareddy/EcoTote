import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Leaderboard from "./pages/Leaderboard";
import Rewards from "./pages/Rewards";
import Consumer from "./pages/Consumer";
import Recycle from "./pages/Recycle";
import Shop from "./pages/Shop";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar"; // 👈 Add this
import FunFactPopup from "./components/FunFactPopup";
import AppProvider from "./context/AppProvider";
import AllProducts from "./pages/AllProducts";
import ProductDetails from "./pages/ProductDetails";
import AuthPage from "./pages/AuthPage";

const App = () => {
  return (
    <Router>
      <AppProvider>
        <div className="flex min-h-screen bg-gray-50">
          {/* Sidebar on the left */}
          <Sidebar />

          {/* Main content area */}
          <div className="flex-1 flex flex-col">
            {/* Top navigation bar */}
            <Navbar />

            {/* Page content */}
            <main className="p-4 flex-1 overflow-auto">
              <Routes>
                <Route path="/" element={<AllProducts />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/product/:productId" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/consumer" element={<Consumer />} />
                <Route path="/recycle" element={<Recycle />} />
                <Route path="/shop" element={<Shop />} />
              </Routes>
            </main>

            {/* Fun Fact Popup always visible */}
            <FunFactPopup />
          </div>
        </div>
      </AppProvider>
    </Router>
  );
};

export default App;