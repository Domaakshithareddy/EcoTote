import React, { useState } from "react";
import PageWrapper from "../components/PageWrapper";

const SupplierRegister = () => {
  const [formData, setFormData] = useState({
    brandName: "",
    ownerName: "",
    phone: "",
    email: "",
    products: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle submission (API call, email, etc)
    console.log("Submitted:", formData);
    alert("Thank you for your interest! We'll be in touch soon.");
    setFormData({
      brandName: "",
      ownerName: "",
      phone: "",
      email: "",
      products: "",
      reason: "",
    });
  };

  return (
    <PageWrapper>
      <div className="ml-60 mt-16 p-8 min-h-screen bg-green-50">
        {/* Intro Section */}
        <div className="max-w-4xl mx-auto mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-green-800 mb-4">
            Join as an Eco-Friendly Supplier
          </h1>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            At EcoTote, we're committed to sustainability and supporting ethical suppliers.
            By joining our eco supplier network, you contribute to a cleaner planet, reach
            conscious consumers, and grow your brand the right way. Let's build a greener future, together.
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto border border-green-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Brand Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Brand Name</label>
              <input
                type="text"
                name="brandName"
                value={formData.brandName}
                onChange={handleChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Owner Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Owner Name</label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Product Details */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Products & Details</label>
              <textarea
                name="products"
                rows="4"
                value={formData.products}
                onChange={handleChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="List your product names and their eco features..."
              ></textarea>
            </div>

            {/* Why partner */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Why do you want to partner with EcoTote?
              </label>
              <textarea
                name="reason"
                rows="3"
                value={formData.reason}
                onChange={handleChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>

            {/* Submit */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md shadow"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};

export default SupplierRegister;
