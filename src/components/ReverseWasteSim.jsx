import React from "react";

const ReverseWasteSim = ({ wasteKg }) => {
  const bagCount = Math.ceil(wasteKg / 0.4);

  return (
    <div className="bg-red-50 border-l-4 border-red-400 rounded-xl p-4 shadow flex flex-col justify-center">
      <h2 className="text-lg font-bold text-red-600">Waste Simulation</h2>
      <p className="text-gray-700 mt-1">
        This cart will produce approximately{" "}
        <strong className="text-red-700">{wasteKg.toFixed(2)} kg</strong> of waste.
      </p>
      <p className="text-sm text-gray-600">
        That’s around <strong>{bagCount} grocery bags</strong> worth of trash!
      </p>
    </div>
  );
};

export default ReverseWasteSim;
