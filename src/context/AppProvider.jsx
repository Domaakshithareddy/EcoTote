// src/context/AppProvider.jsx
import React, { useState } from "react";
import { AppContext } from "./AppContext";

const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [tokens, setTokens] = useState(100);

  const [couponHistory, setCouponHistory] = useState([
    { code: "ECO20", discount: "20%", usedOn: "05 July 2025" },
    { code: "GREEN15", discount: "15%", usedOn: "20 June 2025" },
  ]);

  const [donationHistory, setDonationHistory] = useState([
    { org: "Plastic Free India", amount: "₹200", date: "02 July 2025" },
    { org: "Tree Plantation Drive", amount: "₹150", date: "12 June 2025" },
  ]);

  const [purchaseOrders, setPurchaseOrders] = useState([
    {
      date: "12 July 2025",
      delivery: "fast",
      items: [
        { name: "Bamboo Toothbrush", quantity: 2 },
        { name: "Reusable Cotton Bags", quantity: 1 },
        { name: "Organic Soap Bar", quantity: 3 },
      ],
    },
    {
      date: "07 July 2025",
      delivery: "slow",
      items: [
        { name: "Organic Shampoo", quantity: 1 },
        { name: "Natural Lotion", quantity: 2 },
        { name: "Compost Bin", quantity: 1 },
      ],
    },
    {
      date: "03 July 2025",
      delivery: "fast",
      items: [
        { name: "Neem Face Wash", quantity: 2 },
        { name: "Biodegradable Razor", quantity: 1 },
        { name: "Eco Dish Sponge", quantity: 4 },
      ],
    },
  ]);

  return (
    <AppContext.Provider
      value={{
        cart,
        setCart,
        tokens,
        setTokens,
        purchaseOrders,
        setPurchaseOrders,
        couponHistory,
        setCouponHistory,
        donationHistory,
        setDonationHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
