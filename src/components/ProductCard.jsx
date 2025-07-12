import React from "react";
import { Link } from "react-router-dom";
import QuantityButton from "./QuantityButton";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white border rounded-xl shadow-md hover:shadow-lg transition-all p-4 flex flex-col sm:flex-row gap-4">
      {/* Left: Product Image */}
      <Link
        to={`/product/${product.id}`}
        className="w-full sm:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </Link>

      {/* Right: Details & Button */}
      <div className="flex flex-col justify-between flex-grow">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>

          <ul className="text-sm text-gray-600 space-y-0.5">
            <li>
              🌍 <span className="font-medium">Carbon:</span> {product.carbonScore} kg CO₂
            </li>
            <li>
              📦 <span className="font-medium">Packaging:</span> {product.packaging}
            </li>
            <li>
              📍 <span className="font-medium">Region:</span> {product.region}
            </li>
          </ul>
        </Link>

        {/* Quantity Button */}
        <div className="flex justify-end mt-4">
          <QuantityButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
