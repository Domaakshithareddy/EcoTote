// Folder: src/components/GuiltFreeToggle.jsx

import React from "react";

const GuiltFreeToggle = ({ enabled, onToggle }) => {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="guilt-toggle" className="text-gray-800 font-medium">
        Guilt-Free Mode
      </label>
      <input
        type="checkbox"
        id="guilt-toggle"
        checked={enabled}
        onChange={onToggle}
        className="w-5 h-5 text-green-600"
      />
    </div>
  );
};

export default GuiltFreeToggle;
