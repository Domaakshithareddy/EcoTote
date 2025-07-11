import React from "react";

const ProductImpact = ({ product }) => {
  return (
    <div className="p-4 bg-white border rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-1">{product.name}</h3>
      <p className="text-sm text-gray-600 mb-1">Carbon: {product.carbonScore}kg CO₂</p>
      <p className="text-sm text-gray-600 mb-1">Water Usage: {product.waterUse}L</p>
      <p className="text-sm text-gray-600">Land Impact: {product.landImpact}m²</p>
    </div>
  );
};

export default ProductImpact;