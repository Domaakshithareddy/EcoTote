import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingCart,
  LayoutDashboard,
  User,
} from "lucide-react";
import logo from "../assets/logo.png";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const location = useLocation();
  const { cart } = useContext(AppContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navLinks = [
    { name: "View Products", path: "/", icon: <LayoutDashboard size={18} /> },
    { name: "Cart", path: "/cart", icon: <ShoppingCart size={18} /> },
    { name: "Profile", path: "/consumer", icon: <User size={18} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-green-700 text-white shadow-md px-6 h-16 flex items-center justify-between">
      {/* Logo with image */}
      <div className="flex items-center gap-3 text-xl font-bold">
        <img
          src={logo}
          alt="EcoTote Logo"
          className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
        />
        <span>EcoTote</span>
      </div>

      {/* Nav Links */}
      <div className="flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`flex items-center gap-2 text-sm font-medium transition-all px-2 py-1 rounded-md ${
              location.pathname === link.path
                ? "bg-green-600"
                : "hover:bg-green-600"
            }`}
          >
            {link.icon}
            <span>{link.name}</span>

            {/* Cart count beside "Cart" */}
            {link.name === "Cart" && cart.reduce((sum, item) => sum + item.quantity, 0) > 0 && (
              <span className="ml-1 bg-white text-green-700 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </Link>
        ))}

        {/* Right-side Auth section */}
        {isLoggedIn ? (
          <button
            className="flex items-center gap-1 bg-green-600 hover:bg-green-500 transition px-3 py-1 rounded text-sm font-medium"
            onClick={() => setIsLoggedIn(false)} // Logout action
          >
            <User size={18} />
            Logout
          </button>
        ) : (
          <Link
            to="/auth"
            className="bg-white text-green-700 hover:bg-green-100 transition px-3 py-1 rounded text-sm font-semibold"
            onClick={() => setIsLoggedIn(true)} // simulate login after clicking
          >
            Login / Signup
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
