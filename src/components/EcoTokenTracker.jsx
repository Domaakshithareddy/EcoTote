import React from "react";

const EcoTokenTracker=({tokens})=>{
    const level=tokens>=100 ? "Eco Champion" : tokens>=50 ? "Green Supporter" : "Newbie";
    return (
        <div className="p-4 bg-emerald-100 rounded-lg shadow-inner">
            <p className="font-bold text-xl text-green-800">EcoTokens: {tokens}</p>
            <p className="text-sm text-gray-600">Badge: <strong>{level}</strong></p>
        </div>
    );
};

export default EcoTokenTracker;