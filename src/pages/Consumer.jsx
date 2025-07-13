import React from "react";
import { Sparkles, Leaf, HandHeart, Award, MapPin } from "lucide-react";
import PageWrapper from "../components/PageWrapper";  

const Consumer = () => {
  return (
    <PageWrapper>
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white ml-60 mt-16 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-green-800 flex items-center gap-2 drop-shadow">
          <Sparkles className="text-green-500" />
          Consumer Sustainability Dashboard
        </h1>
        <p className="text-gray-600 mt-1 text-sm">
          Monitor your green contributions, badges, and community impact.
        </p>
      </div>

      {/* CO₂ Progress Card */}
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-8 max-w-2xl mx-auto border border-green-100">
        <div className="flex items-center gap-4">
          <div className="bg-green-100 rounded-full p-2">
            <Leaf className="text-green-700 w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-green-800">CO₂ Saved This Week</h3>
            <p className="text-sm text-gray-600">You've saved <strong>2.4 kg</strong> of CO₂!</p>

            {/* Progress bar */}
            <div className="w-full h-3 bg-gray-200 rounded-full mt-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-green-600 animate-pulse"
                style={{ width: "48%" }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Target: 5 kg</p>
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="group bg-white/60 backdrop-blur-lg border border-gray-100 shadow-md rounded-2xl p-6 text-center transition transform hover:-translate-y-1 hover:shadow-xl">
          <div className="flex justify-center mb-2">
            <Award className="text-yellow-500 group-hover:scale-110 transition" />
          </div>
          <p className="text-sm text-gray-600">Eco Badge</p>
          <p className="font-bold text-green-700 mt-1">🌿 Green Supporter</p>
        </div>

        {/* Rank */}
        <div className="group bg-white/60 backdrop-blur-lg border border-gray-100 shadow-md rounded-2xl p-6 text-center transition transform hover:-translate-y-1 hover:shadow-xl">
          <div className="flex justify-center mb-2">
            <MapPin className="text-blue-600 group-hover:scale-110 transition" />
          </div>
          <p className="text-sm text-gray-600">Region Rank</p>
          <p className="font-bold text-green-700 mt-1">#3 in Hyderabad</p>
        </div>

        {/* Donation */}
        <div className="group bg-white/60 backdrop-blur-lg border border-gray-100 shadow-md rounded-2xl p-6 text-center transition transform hover:-translate-y-1 hover:shadow-xl">
          <div className="flex justify-center mb-2">
            <HandHeart className="text-pink-500 group-hover:scale-110 transition" />
          </div>
          <p className="text-sm text-gray-600">Recent Donation</p>
          <p className="font-bold text-green-700 mt-1">Plastic Free India</p>
        </div>
      </div>
    </div>
    </PageWrapper>
  );
};

export default Consumer;
