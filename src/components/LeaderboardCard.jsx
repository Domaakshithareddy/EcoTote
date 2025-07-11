import React from "react";

const LeaderboardCard = ({ user, highlight = false }) => {
  return (
    <div
      className={`p-4 rounded-md shadow border ${
        highlight ? "bg-green-100 font-semibold" : "bg-white"
      }`}
    >
      <p className="text-lg">
        #{user.rank} - {user.username}
      </p>
      <p className="text-sm text-gray-600">{user.score} EcoPoints</p>
    </div>
  );
};

export default LeaderboardCard;