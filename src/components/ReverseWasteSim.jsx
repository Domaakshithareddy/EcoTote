import React from "react";

const ReverseWasteSim=({wasteKg})=>{
    const bagCount=Math.ceil(wasteKg/0.4);

    return (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md shadow-sm">
            <h2 className="text-lg font-bold text-red-600">Waste Simulation</h2>
            <p>This cart will produce approximately <strong>{wasteKg}kg</strong> of waste.</p>
            <p>That's about <strong>{bagCount} grocery bags</strong> worth of trash!</p>
        </div>
    );
};

export default ReverseWasteSim;