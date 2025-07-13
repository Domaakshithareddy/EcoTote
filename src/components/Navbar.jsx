import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, LayoutDashboard, User } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  // Mock login state (replace with real auth later)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navLinks = [
    { name: "View Products", path: "/", icon: <LayoutDashboard size={18} /> },
    { name: "Cart", path: "/cart", icon: <ShoppingCart size={18} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-green-700 text-white shadow-md px-6 h-16 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2 text-xl font-bold">
        <span role="img" aria-label="logo">🌱</span>
        <span>EcoTote</span>
      </div>

      {/* Nav Links */}
      <div className="flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`flex items-center gap-2 text-sm font-medium transition-all px-2 py-1 rounded-md
              ${location.pathname === link.path ? "bg-green-600" : "hover:bg-green-600"}
            `}
          >
            {link.icon}
            {link.name}
          </Link>
        ))}

        {/* Right-side Auth section */}
        {isLoggedIn ? (
          <button
            className="flex items-center gap-1 bg-green-600 hover:bg-green-500 transition px-3 py-1 rounded text-sm font-medium"
            onClick={() => setIsLoggedIn(false)} // Logout action
          >
            <User size={18} />
            Profile
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
