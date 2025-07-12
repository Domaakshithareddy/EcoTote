import React, { useEffect, useState } from "react";
import fetchJSON from "../utils/fetchJSON";
import SupplierScoreCard from "../components/SupplierScoreCard";
import PageWrapper from "../components/PageWrapper"; 

const Dashboard = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchJSON("suppliers.json").then(setSuppliers);
  }, []);

  return (
    <PageWrapper>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📦 Supplier Sustainability Dashboard</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {suppliers.map((supplier) => (
          <SupplierScoreCard key={supplier.id} supplier={supplier} />
        ))}
      </div>
    </div>
    </PageWrapper>
  );
};

export default Dashboard;
