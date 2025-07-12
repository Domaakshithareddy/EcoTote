import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, LayoutDashboard } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Cart", path: "/cart", icon: <ShoppingCart size={18} /> },
  ];

  return (
    <nav className="bg-green-700 text-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2 text-xl font-bold">
        <span role="img" aria-label="logo">🌱</span>
        <span>GreenCartAI</span>
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
      </div>
    </nav>
  );
};

export default Navbar;
