import {React, useContext} from "react";
import PageWrapper from "../components/PageWrapper";
import {
  Leaf,
  HandHeart,
  Home,
  HeartHandshake,
  TreePine,
} from "lucide-react";
import sustainImg from "../assets/sustanability.jpg"; // ensure correct path
import { AppContext } from "../context/AppContext";

const WhySustainability = () => {
  const { sidebarCollapsed } = useContext(AppContext);

  return (
    <PageWrapper>
      <div 
        className="pt-16 px-8 py-10 max-w-6xl text-gray-800 space-y-12 transition-all duration-300"
        style={{
          marginLeft: sidebarCollapsed ? '4rem' : '15rem'
        }}
      >
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-green-800 flex items-center justify-center gap-2">
            <Leaf className="text-green-600" size={32} />
            Why Sustainability Matters
          </h1>
          <p className="text-md text-gray-600 max-w-3xl mx-auto">
            Embracing sustainability means taking action today for a better, cleaner tomorrow.
            It's about choices — how we live, shop, and take care of our environment.
          </p>
        </div>

        {/* EcoTote Initiative */}
        <section className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-green-700 flex items-center gap-2 mb-4">
            <TreePine size={22} className="text-green-600" />
            The EcoTote Mission
          </h2>
          <p className="text-sm leading-relaxed text-gray-700">
            EcoTote is built on a promise — to simplify sustainable living. Here's how we help:
          </p>
          <ul className="list-disc list-inside mt-3 space-y-1 text-sm text-gray-700">
            <li>Offer products made from eco-friendly and recycled materials</li>
            <li>Track the carbon footprint of every item you purchase</li>
            <li>Reward you with EcoTokens for green decisions</li>
            <li>Provide recycling center maps and waste simulations</li>
          </ul>
        </section>

        {/* Dual Section with Image */}
        <section className="flex flex-col lg:flex-row items-start gap-10">
          {/* Left Text Sections */}
          <div className="flex-1 space-y-10">
            {/* Individual */}
            <div>
              <h2 className="text-2xl font-bold text-green-700 flex items-center gap-2 mb-3">
                <HandHeart size={22} className="text-green-600" />
                What You Can Do as an Individual
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                Every small choice adds up. Here's how you can make a daily impact:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1 text-sm text-gray-700">
                <li>Say no to single-use plastics</li>
                <li>Compost your kitchen waste</li>
                <li>Buy from brands that prioritize the planet</li>
                <li>Inspire others by leading with your actions</li>
              </ul>
            </div>

            {/* Household */}
            <div>
              <h2 className="text-2xl font-bold text-green-700 flex items-center gap-2 mb-3">
                <Home size={22} className="text-green-600" />
                Sustainability Starts at Home
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                A green home fosters a sustainable future. Families can take steps like:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1 text-sm text-gray-700">
                <li>Switching to energy-efficient appliances and LED bulbs</li>
                <li>Harvesting rainwater or installing solar panels</li>
                <li>Reducing food and water waste</li>
                <li>Separating recyclables from daily garbage</li>
              </ul>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center items-center">
            <img
              src={sustainImg}
              alt="Sustainability"
              className="w-[380px] h-auto rounded-xl shadow-md"
            />
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-6 rounded-xl border bg-white shadow mt-10">
          <h3 className="text-2xl font-bold text-green-800 flex items-center justify-center gap-2">
            <HeartHandshake size={24} className="text-green-600" />
            Be Part of the Change
          </h3>
          <p className="mt-2 text-sm text-gray-600 max-w-xl mx-auto">
            Join EcoTote in driving a global shift. Choose sustainable products, track your
            impact, and empower your community to do the same. Together, we make a difference.
          </p>
        </section>
      </div>
    </PageWrapper>
  );
};

export default WhySustainability;