import React, { useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import fetchJSON from "../utils/fetchJSON";
import { AppContext } from "../context/AppContext";
import ProductImpact from "../components/ProductImpactCard";
import QuantityButton from "../components/QuantityButton";
import PageWrapper from "../components/PageWrapper";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    fetchJSON("products.json").then((data) => {
      setAllProducts(data);
      const p = data.find((prod) => prod.id === productId);
      setProduct(p);
    });

    fetchJSON("reviews.json").then(setReviews).catch(() => setReviews([]));
  }, [productId]);

  if (!product) return <p className="p-6 text-gray-500">Loading product details...</p>;

  const productReviews = reviews.filter((r) => r.productId === productId);

  const recommendations = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <PageWrapper>
      <div className="p-6">
        {/* Layout */}
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          {/* Left: Image */}
          <div className="w-full md:w-[400px]">
            <img
              src={product.image || "/placeholder.jpg"}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-md object-cover"
            />
          </div>

          {/* Right: Product Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-green-700 mb-3">{product.name}</h1>
            <ProductImpact product={product} />

            <div className="mt-4 space-y-1 text-sm text-gray-700">
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Region:</strong> {product.region}</p>
              <p><strong>Packaging:</strong> {product.packaging}</p>
              {product.greenAlt && (
                <p><strong>Green Alternative:</strong> {product.greenAlt}</p>
              )}
            </div>

            {/* Sustainability */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2 text-green-700">🌿 Sustainability Details</h2>
              <ul className="list-disc ml-6 text-sm text-gray-700">
                <li>Carbon Score: {product.carbonScore} kg CO₂</li>
                <li>Packaging Type: {product.packaging}</li>
                {product.greenAlt && <li>Better Alternative: {product.greenAlt}</li>}
              </ul>
            </div>

            {/* Add to Cart */}
            <div className="mt-6 flex justify-start">
              <div className="w-fit">
                <QuantityButton product={product} />
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">🛍 You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((p) => (
              <Link
                to={`/product/${p.id}`}
                key={p.id}
                className="block p-4 bg-white rounded-lg shadow-md hover:bg-green-50 transition"
              >
                <h3 className="font-bold text-lg mb-1">{p.name}</h3>
                <p className="text-sm text-gray-600">Carbon Score: {p.carbonScore} kg CO₂</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-14">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">🗣 Reviews</h2>

          {productReviews.length === 0 ? (
            <p className="text-sm text-gray-600 mb-4">No reviews yet for this product.</p>
          ) : (
            <ul className="space-y-3 mb-4">
              {productReviews.slice(0, 3).map((r, idx) => (
                <li key={idx} className="bg-gray-100 p-3 rounded shadow text-sm">
                  <div className="text-yellow-400 mb-1 text-lg">
                    {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                  </div>
                  <p>{r.text}</p>
                </li>
              ))}
            </ul>
          )}

          <button
            onClick={() => setShowReviewModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            ➕ Add Review
          </button>
        </div>

        {/* Review Modal */}
        {showReviewModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
              <h3 className="text-lg font-semibold mb-3">Add a Review</h3>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Rating</label>
                <div className="flex space-x-1 text-yellow-400 text-2xl">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      {star <= rating ? "★" : "☆"}
                    </button>
                  ))}
                </div>
              </div>

              <label className="block text-sm font-medium mb-1">Review</label>
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                className="w-full border px-3 py-2 rounded text-sm mb-4"
                rows="4"
                placeholder="Write your review..."
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="px-3 py-1 bg-gray-300 rounded text-sm hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (newReview.trim()) {
                      setReviews((prev) => [
                        { productId, rating, text: newReview },
                        ...prev,
                      ]);
                      setNewReview("");
                      setRating(5);
                      setShowReviewModal(false);
                    }
                  }}
                  className="px-4 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default ProductDetails;
