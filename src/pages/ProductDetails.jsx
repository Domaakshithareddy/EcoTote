// src/pages/ProductDetails.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import fetchJSON from "../utils/fetchJSON";
import { AppContext } from "../context/AppContext";
import ProductImpact from "../components/ProductImpactCard";
import { Link } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();
  const { cart, setCart } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    fetchJSON("products.json").then((data) => {
      setAllProducts(data);
      const p = data.find((prod) => prod.id === productId);
      setProduct(p);
    });
    fetchJSON("reviews.json").then(setReviews).catch(() => setReviews([]));
  }, [productId]);

  const addToCart = () => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
        setCart(cart.map((item) =>
        item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
        } else {
        setCart([...cart, { ...product, quantity: 1 }]);
    }
};

  const handleReviewSubmit = () => {
    if (newReview.trim()) {
      setReviews((prev) => [...prev, { productId, text: newReview }]);
      setNewReview("");
    }
  };

  if (!product) return <p className="p-6">Loading...</p>;

  const recommendations = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const productReviews = reviews.filter((r) => r.productId === productId);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-700 mb-4">{product.name}</h1>
      <ProductImpact product={product} />

      <div className="mt-4">
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Region:</strong> {product.region}</p>
        <p><strong>Packaging:</strong> {product.packaging}</p>
        {product.greenAlt && (
          <p><strong>Green Alternative:</strong> {product.greenAlt}</p>
        )}
      </div>

      <button
        onClick={addToCart}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Add to Cart
      </button>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">🌿 Sustainability Details</h2>
        <ul className="list-disc ml-6 text-sm text-gray-700">
          <li>Carbon Score: {product.carbonScore} kg CO₂</li>
          <li>Packaging Type: {product.packaging}</li>
          {product.greenAlt && <li>Better Alternative: {product.greenAlt}</li>}
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">🛍 You Might Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((p) => (
            <Link
                to={`/product/${p.id}`}
                key={p.id}
                className="block border p-4 rounded shadow hover:bg-green-50 transition"
            >
                <h3 className="font-bold text-lg">{p.name}</h3>
                <p className="text-sm">Carbon Score: {p.carbonScore}kg</p>
            </Link>
            ))}
        </div>
    </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">🗣 Reviews</h2>
        <ul className="space-y-2 mb-4">
          {productReviews.length > 0 ? (
            productReviews.map((r, idx) => (
              <li key={idx} className="bg-gray-100 p-2 rounded text-sm">
                {r.text}
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-600">No reviews yet.</p>
          )}
        </ul>

        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          className="w-full p-2 border rounded mb-2 text-sm"
          placeholder="Write your review here..."
        />
        <button
          onClick={handleReviewSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
