import React from "react";
import { LeaderboardProps } from "../../types";

const LeaderboardSection = ({ users }: LeaderboardProps) => {
  return (
    <div id="leaderboard" className="relative h-screen">
      <div className="flex gap-10 justify-between">
        <h1>Winners:</h1>
        {users?.map((user, index) => {
          if (index <= 2) {
            return (
              <div>
                <div className="bg-blue-400 p-2">{index + 1}. </div>
                <span>
                  {user.username} with {user.points} points
                </span>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default LeaderboardSection;
