import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAdd }) => {
  return (
    <div className="border rounded-lg shadow p-4 bg-white w-full">
      <div className="flex flex-row gap-4 items-start hover:bg-gray-50 transition">
        {/* Left Side: Image */}
        <Link
          to={`/product/${product.id}`}
          className="w-32 h-32 flex-shrink-0 flex items-center justify-center"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded"
          />
        </Link>

        {/* Right Side: Content + Button */}
        <div className="flex flex-col justify-between flex-grow">
          {/* Content links to details */}
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-sm text-gray-600">
              🌍 Carbon: {product.carbonScore}kg CO₂
            </p>
            <p className="text-sm text-gray-600">
              📦 Packaging: {product.packaging}
            </p>
            <p className="text-sm text-gray-600">
              📍 Region: {product.region}
            </p>
            {product.greenAlt && (
              <p className="text-xs text-green-600 mt-1">
                ✅ Green Alt: {product.greenAlt}
              </p>
            )}
          </Link>

          {/* Button aligned right */}
          <div className="flex justify-end mt-3">
            <button
              onClick={() => onAdd(product)}
              className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
