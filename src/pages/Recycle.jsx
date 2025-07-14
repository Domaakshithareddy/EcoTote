import React, { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import ProductCard from "../components/ProductCard";
import fetchJSON from "../utils/fetchJSON";
import { MapPin } from "lucide-react";

const centerData = {
  Bangalore: [
    "Indiranagar - Green Collection Center",
    "Koramangala - Plastic Drop-Off",
    "Whitefield - EcoReturn Spot",
    "MG Road - Bottle & Paper Return",
    "Jayanagar - E-Waste & Packaging Point",
  ],
  Hyderabad: [
    "Banjara Hills - Eco Collection Center",
    "Madhapur - Plastic Recycle Zone",
    "Gachibowli - EcoDepot",
    "Kukatpally - RePack Return Center",
    "Begumpet - Sustainable Drop Point",
  ],
  Chennai: [
    "Adyar - Eco Collection Center",
    "T Nagar - Plastic Recycle Zone",
    "Guindy - EcoDepot",
    "Velachery - RePack Return Center",
    "Anna Nagar - Sustainable Drop Point",
  ],
  Mumbai: [
    "Andheri - Eco Collection Center",
    "Bandra - Plastic Recycle Zone",
    "Powai - EcoDepot",
    "Dadar - RePack Return Center",
    "Colaba - Sustainable Drop Point",
  ],
  Delhi: [
    "Connaught Place - Eco Collection Center",
    "Saket - Plastic Recycle Zone",
    "Dwarka - EcoDepot",
    "Karol Bagh - RePack Return Center",
    "Lajpat Nagar - Sustainable Drop Point",
  ],
};

const Recycle = () => {
  const [products, setProducts] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Bangalore");

  useEffect(() => {
    fetchJSON("products.json").then((data) => {
      const recycled = data.filter((p) =>
        [
          "Recycled Paper Notebook (A5)",
          "Recycled Paper Gift Wrap",
          "Recycled Plastic Yoga Mat",
        ].includes(p.name)
      );
      setProducts(recycled);
    });
  }, []);

  return (
    <PageWrapper>
      <div className="ml-60 mt-16 p-6 space-y-6">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-xl font-bold text-green-800">
            Join Our Recycling Initiative
          </h1>
          <p className="text-gray-800 text-sm">
            At Walmart, we're committed to a greener tomorrow. By returning used eco-products like packaging, bottles, and electronics to nearby recycling centers, you help reduce landfill waste and carbon emissions. Every item you return contributes to a more sustainable community—and earns you EcoTokens as a thank you. Let’s close the loop and build a cleaner future together!
          </p>
        </div>

        {/* Recycled Products */}
        <div className="mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Products Made From Recycled Materials
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Nearby Centers */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Nearby Recycling Centers
          </h2>

          {/* Dropdown */}
          <div className="mb-4 flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">Select City:</label>
            <div className="relative w-48">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="appearance-none w-full px-4 py-2 pr-10 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              >
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Chennai">Chennai</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
              </select>
              {/* Custom arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Styled Card for Center List */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-5 shadow max-w-xl">
            <h3 className="text-md font-semibold text-green-800 mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-700" />
              Recycling Centers in {selectedCity}
            </h3>
            <ul className="list-disc ml-6 space-y-2 text-sm text-gray-800">
              {centerData[selectedCity].map((center, index) => (
                <li key={index}>{center}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Recycle;
