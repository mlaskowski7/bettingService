import React from "react";
import { Bet, Game, User } from "../../types";
import { Link } from "react-router-dom";

interface DetailedViewProps {
  bets: Bet[];
  games: Game[];
  users: User[];
}

const DetailedView: React.FC<DetailedViewProps> = ({ bets, games, users }) => {
  return (
    <div className="w-screen h-screen flex flex-col gap-6 justify-center items-center">
      <div className="bg-red-600 text-white dela-font px-7 py-5 rounded-md">
        DETAILED LEADERBOARD
      </div>
      <div className="overflow-x-auto w-[90%]">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">User / Game</th>
              {games.map((game) => (
                <th key={game.id} className="px-4 py-2">
                  {game.home_team} vs {game.away_team}
                </th>
              ))}
              <th className="px-4 py-2 font-bold text-red-600">POINTS</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="px-4 py-2 font-medium text-center">
                  {user.username}
                </td>
                {games.map((game) => {
                  const userBet = bets.find(
                    (bet) => bet.user_id === user.id && bet.game_id === game.id
                  );
                  return (
                    <td key={game.id} className="px-4 py-2 text-center">
                      {userBet
                        ? `${userBet.goals_home}-${userBet.goals_away}`
                        : "No Bet"}
                    </td>
                  );
                })}
                <td className="font-bold text-red-600 text-center">
                  {user.points}
                </td>
              </tr>
            ))}
            <tr className="text-blue-600 font-bold">
              <td className="text-center">SCORE</td>
              {games.map((game) => (
                <td className="text-center">
                  {game.goals_home}-{game.goals_away}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <Link
        to="/"
        className="bg-blue-600 text-white dela-font px-7 py-5 rounded-md hover:brightness-75"
      >
        BACK
      </Link>
    </div>
  );
};

export default DetailedView;
