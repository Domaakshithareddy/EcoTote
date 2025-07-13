import React, { useEffect, useState } from "react";
import fetchJSON from "../utils/fetchJSON";
import { FaLeaf } from "react-icons/fa";

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const FunFactPopup = () => {
  const [facts, setFacts] = useState([]);
  const [factIndex, setFactIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchJSON("funFacts.json").then((data) => {
      const shuffled = shuffleArray(data);
      setFacts(shuffled);
      setVisible(true); // Slide in first
    });
  }, []);

  useEffect(() => {
    if (facts.length === 0) return;

    const interval = setInterval(() => {
      setVisible(false); // Slide out
      setTimeout(() => {
        setFactIndex((prev) => (prev + 1) % facts.length);
        setVisible(true); // Slide in new
      }, 600); // Delay matches animation duration
    }, 30000); // Change every 30 seconds

    return () => clearInterval(interval);
  }, [facts]);

  useEffect(() => {
    const hideTimeout = setTimeout(() => {
      setVisible(false); // Hide completely after 2 minutes
    }, 120000);
    return () => clearTimeout(hideTimeout);
  }, []);

  const currentFact = facts[factIndex] || "";

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 max-w-xs w-[280px] bg-amber-50 border-l-4 border-green-500 rounded-lg p-4 shadow-lg transition-all duration-700 ease-in-out transform ${
        visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className="flex items-start gap-3">
        <FaLeaf className="text-green-600 text-2xl" />
        <div>
          <p className="text-sm font-semibold text-green-800">Did you know?</p>
          <p className="text-xs text-gray-700 mt-1 leading-snug">{currentFact}</p>
        </div>
      </div>
    </div>
  );
};

export default FunFactPopup;
