import React from "react";

const SupplierScoreCard=({supplier})=>{
    return (
        <div className="p-4 border rounded-xl shadow-md bg-white hover:bg-green-50">
            <h3 className="font-bold text-lg">{supplier.name}</h3>
            <p>Sustainability Score: <span className="font-semibold text-green-600">{supplier.score}/100</span></p>
            <p>Emission: {supplier.emissions}</p>
            <p>Labor: {supplier.labor}</p>
            <p>Materials: {supplier.materials}</p>
            <p>Packaging: {supplier.packaging}</p>
        </div>
    );
};

export default SupplierScoreCard;