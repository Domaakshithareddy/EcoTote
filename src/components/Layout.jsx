import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import { AppContext } from "../context/AppContext";

const Layout = ({ children }) => {
  const { sidebarCollapsed } = useContext(AppContext);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <main
        className="pt-16 flex-1 flex justify-center transition-all duration-300"
        style={{
          marginLeft: sidebarCollapsed ? "4rem" : "15rem",
        }}
      >
        <div className="w-full max-w-7xl px-6">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
