import React, { useEffect, useState } from "react";
import fetchJSON from "../utils/fetchJSON";
import PageWrapper from "../components/PageWrapper";
import { Crown } from "lucide-react";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    fetchJSON("leaderboard.json").then(setLeaders);
  }, []);

  const podium = leaders.slice(0, 3);
  const rest = leaders.slice(3, 13); // next 10

  const rankColor = {
    1: "#FFD700", // Gold
    2: "#C0C0C0", // Silver
    3: "#CD7F32", // Bronze
  };

  return (
    <PageWrapper>
      <div className="ml-60 mt-16 p-6 max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-green-700 mb-14 tracking-tight flex justify-center items-center gap-3">
          <Crown className="w-8 h-8 text-green-700" />
          Eco Leaderboard
        </h1>

        {/* Podium */}
        <div className="flex justify-center items-end gap-8 mb-20">
          {/* 2nd Place */}
          {podium[1] && (
            <div className="flex flex-col items-center transform hover:scale-105 transition">
              <div
                className="w-20 rounded-t-2xl shadow-md text-white text-center font-semibold text-lg flex items-end justify-center pb-2"
                style={{
                  height: "130px",
                  backgroundColor: rankColor[2],
                }}
              >
                2
              </div>
              <div className="mt-2 text-sm font-medium text-gray-800">{podium[1].username}</div>
              <div className="text-xs text-gray-500">{podium[1].score} pts</div>
            </div>
          )}

          {/* 1st Place */}
          {podium[0] && (
            <div className="flex flex-col items-center transform hover:scale-110 transition">
              <div
                className="w-24 rounded-t-2xl shadow-lg text-white text-center font-bold text-xl flex items-end justify-center pb-2"
                style={{
                  height: "170px",
                  backgroundColor: rankColor[1],
                }}
              >
                1
              </div>
              <div className="mt-2 text-base font-semibold text-gray-900">{podium[0].username}</div>
              <div className="text-sm text-gray-500">{podium[0].score} pts</div>
            </div>
          )}

          {/* 3rd Place */}
          {podium[2] && (
            <div className="flex flex-col items-center transform hover:scale-105 transition">
              <div
                className="w-20 rounded-t-2xl shadow-md text-white text-center font-semibold text-lg flex items-end justify-center pb-2"
                style={{
                  height: "110px",
                  backgroundColor: rankColor[3],
                }}
              >
                3
              </div>
              <div className="mt-2 text-sm font-medium text-gray-800">{podium[2].username}</div>
              <div className="text-xs text-gray-500">{podium[2].score} pts</div>
            </div>
          )}
        </div>

        {/* Leaderboard Rows */}
        <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden">
          <div className="grid grid-cols-4 px-6 py-3 font-semibold text-sm text-gray-600 bg-gray-100 border-b">
            <div>Rank</div>
            <div>User</div>
            <div>Points</div>
            <div>City</div>
          </div>
          {rest.map((user) => (
            <div
              key={user.rank}
              className={`grid grid-cols-4 items-center px-6 py-4 text-sm border-b hover:bg-green-50 transition ${
                user.username === "you"
                  ? "bg-green-100 font-semibold text-green-800 rounded"
                  : "text-gray-800"
              }`}
            >
              <div className="font-bold text-green-600">#{user.rank}</div>
              <div>{user.username}</div>
              <div>{user.score}</div>
              <div>{user.city}</div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Leaderboard;
