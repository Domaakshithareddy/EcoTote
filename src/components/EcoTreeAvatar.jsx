import React from "react";
import happyTree from "../assets/happy-tree.png";
import sadTree from "../assets/sad-tree.png";

const EcoTreeAvatar = ({ totalCarbon }) => {
    const treeImage = totalCarbon < 50 ? happyTree : sadTree;
    return (
        <div className="flex flex-col items-center">
            <img src={treeImage} alt="Eco Tree" className="w-40 h-40" />
            <p className="text-sm text-gray-700 mt-2">
                Your cart is generating <strong>{totalCarbon}kg CO₂</strong>
            </p>
        </div>
    );
};

export default EcoTreeAvatar;
