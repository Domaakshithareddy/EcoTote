import React, { useEffect, useState } from "react";
import fetchJSON from "../utils/fetchJSON";
import PageWrapper from "../components/PageWrapper"; 

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    fetchJSON("leaderboard.json").then(setLeaders);
  }, []);

  return (
    <PageWrapper>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🏆 Eco Leaderboard - Bengaluru</h1>
      <ul className="space-y-2">
        {leaders.map((user) => (
          <li
            key={user.rank}
            className={`p-3 rounded-md border ${
              user.username === "you" ? "bg-green-100 font-semibold" : "bg-white"
            }`}
          >
            #{user.rank} — {user.username} ({user.score} points)
          </li>
        ))}
      </ul>
    </div>
    </PageWrapper>
  );
};

export default Leaderboard;