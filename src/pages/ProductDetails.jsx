import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import fetchJSON from "../utils/fetchJSON";
import QuantityButton from "../components/QuantityButton";
import PageWrapper from "../components/PageWrapper";
import { AppContext } from "../context/AppContext";

const ProductDetails = () => {
  const { productId } = useParams();
  const { sidebarCollapsed } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [altMap, setAltMap] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, reviewsData, altData] = await Promise.all([
          fetchJSON("products.json"),
          fetchJSON("reviews.json").catch(() => []),
          fetchJSON("alternatives.json").catch(() => ({})),
        ]);

        setAllProducts(productsData);
        setReviews(reviewsData);
        setAltMap(altData);

        const currentProduct = productsData.find((prod) => prod.id === productId);
        setProduct(currentProduct);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, [productId]);

  if (!product) return <p className="p-6 text-gray-500">Loading product details...</p>;

  const shuffled = [...reviews].sort(() => 0.5 - Math.random());
  const productReviews = shuffled.slice(0, 2);

  return (
    <PageWrapper>
      <div 
        className="pt-24 p-6 min-h-screen transition-all duration-300"
        style={{
          marginLeft: sidebarCollapsed ? '4rem' : '15rem'
        }}
      >
        {/* Product Layout */}
        <div className="flex flex-col md:flex-row gap-8 mb-10 items-start max-w-7xl mx-auto">
          {/* Left: Product Image */}
          <div className="w-full md:w-[400px] flex-shrink-0">
            <img
              src={product.image || "/placeholder.jpg"}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-md object-cover"
            />
          </div>

          {/* Right: Product Info */}
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-green-700">{product.name}</h1>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">Sold by:</span> {product.seller}
              </p>
              <p className="text-2xl font-bold text-gray-800 mt-2">
                ₹{product.price.toLocaleString()}
              </p>

              <div className="flex items-center gap-2 text-sm mt-1">
                <div className="text-yellow-500 text-lg">
                  {"★".repeat(Math.floor(product.rating)) +
                    "☆".repeat(5 - Math.floor(product.rating))}
                </div>
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Region:</strong> {product.region}</p>
              <p><strong>Packaging:</strong> {product.packaging}</p>
            </div>

            <div className="bg-green-50 border border-green-200 p-4 rounded-lg shadow-sm">
              <h3 className="text-md font-semibold text-green-800 mb-2">Sustainability Details</h3>
              <ul className="list-disc ml-5 text-sm text-gray-800 space-y-1">
                <li>Carbon Score: {product.carbonScore} kg CO₂</li>
                <li>Packaging Type: {product.packaging}</li>
              </ul>
            </div>

            <div className="pt-2">
              <QuantityButton product={product} />
            </div>
          </div>
        </div>

        {/* Greener Alternatives */}
        {product && altMap[product.name] && (
          <div className="mt-10 max-w-7xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-green-800">Greener Alternatives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {altMap[product.name]
                .map((altName) => allProducts.find((p) => p.name === altName))
                .filter(Boolean)
                .map((alt) => (
                  <div
                    key={alt.id}
                    className="bg-green-50 border border-green-500 rounded-xl shadow-sm hover:shadow-md transition-all p-4 flex flex-col sm:flex-row gap-4"
                  >
                    {/* Left: Product Image */}
                    <Link
                      to={`/product/${alt.id}`}
                      className="w-full sm:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden"
                    >
                      <img
                        src={alt.image}
                        alt={alt.name}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </Link>
              
                    {/* Right: Details & Button */}
                    <div className="flex flex-col justify-between flex-grow">
                      <Link to={`/product/${alt.id}`}>
                        <h3 className="text-lg font-semibold text-black mb-1">
                          ♻️ {alt.name}
                        </h3>

                        <ul className="text-sm text-green-900 space-y-0.5 mb-2">
                          <li>
                            <span className="font-medium">Price:</span> ₹{alt.price}
                          </li>
                          <li>
                            <span className="font-medium">Seller:</span> {alt.seller}
                          </li>
                        </ul>
              
                        {/* Rating */}
                        <div className="flex items-center text-sm text-yellow-500 mb-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <span key={i}>
                              {i < Math.round(alt.rating) ? "★" : "☆"}
                            </span>
                          ))}
                          <span className="text-green-800 ml-2">({alt.reviews} reviews)</span>
                        </div>
                      </Link>
              
                      {/* Quantity Button */}
                      <div className="flex justify-end mt-2">
                        <QuantityButton product={alt} />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div className="mt-16 max-w-7xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Reviews</h2>

          {productReviews.length === 0 ? (
            <p className="text-sm text-gray-600 mb-4">No reviews yet for this product.</p>
          ) : (
            <ul className="space-y-3 mb-4">
              {productReviews.map((r, idx) => (
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
            Add Review
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