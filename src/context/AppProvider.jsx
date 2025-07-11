// src/context/AppProvider.jsx
import React, { useState } from "react";
import { AppContext } from "./AppContext";

const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [tokens, setTokens] = useState(100);

  return (
    <AppContext.Provider value={{ cart, setCart, tokens, setTokens }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
