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

          <ul className="text-sm text-gray-700 space-y-0.5 mb-2">
            <li>
              <span className="font-medium">Price:</span> ₹{product.price}
            </li>
            <li>
              <span className="font-medium">Seller:</span> {product.seller}
            </li>
          </ul>

          {/* Rating */}
          <div className="flex items-center text-sm text-yellow-500 mb-1">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i}>
                {i < Math.round(product.rating) ? "★" : "☆"}
              </span>
            ))}
            <span className="text-gray-600 ml-2">({product.reviews} reviews)</span>
          </div>
        </Link>

        {/* Quantity Button */}
        <div className="flex justify-end mt-2">
          <QuantityButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
