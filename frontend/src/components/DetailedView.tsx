import React from "react";
import { Bet, Game, User } from "../../types";
import { Link } from "react-router-dom";
import "./DetailedView.css"; // Import the CSS file

interface DetailedViewProps {
  bets: Bet[];
  games: Game[];
  users: User[];
}

const isBeforeGameTime = (gameDate: string, gameTime: string): boolean => {
  const date = gameDate.split("T");
  // Combine the date and time into a full ISO 8601 date-time string
  const combinedDateTime = `${date[0]}T${gameTime}`; // Adding seconds and milliseconds

  try {
    const gameDateTime = new Date(combinedDateTime);
    const now = new Date();

    // Check if the gameDateTime is valid
    if (isNaN(gameDateTime.getTime())) {
      throw new Error("Invalid game date or time");
    }

    return now < gameDateTime;
  } catch (error) {
    console.error(error);
    return false; // Return false if there was an error
  }
};

const DetailedView: React.FC<DetailedViewProps> = ({ bets, games, users }) => {
  return (
    <div className="w-screen min-h-screen flex flex-col gap-6 justify-center items-center">
      <div className="bg-red-600 text-white dela-font px-7 py-5 rounded-md">
        DETAILED LEADERBOARD
      </div>
      <div className="table-wrapper">
        <table className="fixed-table">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">
                <br />
              </th>
              <th className="px-4 py-2 font-bold text-red-600">
                <br />
              </th>
            </tr>
            <tr>
              <th className="px-4 py-2">USER</th>
              <th className="px-4 py-2 font-bold text-red-600">POINTS</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr className="h-5">
              <td colSpan={2} className="text-blue-600 text-center font-bold">
                Final Score
              </td>
            </tr>
            <tr className="h-5">
              <td colSpan={2} className="text-yellow-500 text-center font-bold">
                Points Multiplier
              </td>
            </tr>
            {users.map((user) => (
              <tr key={user.id} className="border-b h-5">
                <td className="px-4 py-2 font-medium text-center">
                  {user.username}
                </td>
                <td className="font-bold text-red-600 text-center">
                  {user.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="scrollable-wrapper">
          <table className="scrollable-table">
            <thead className="bg-gray-800 text-white">
              <tr className="h-5">
                {games.map((game) => (
                  <th key={game.id} className="px-4 py-2">
                    {game.home_team} vs {game.away_team}
                  </th>
                ))}
              </tr>
              <tr className="h-5">
                {games.map((game) => (
                  <th key={game.id} className="px-4 py-2">
                    {game.date.split("T")[0].split("2024")[1]}{" "}
                    {game.time.split(":")[0]}:{game.time.split(":")[1]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="text-blue-600 font-bold h-5">
                {games.map((game) => (
                  <td key={`final-${game.id}`} className="text-center">
                    {game.goals_home}-{game.goals_away}
                  </td>
                ))}
              </tr>
              <tr className="text-yellow-500 font-bold border-b h-5">
                {games.map((game) => (
                  <td key={`multiplier-${game.id}`} className="text-center">
                    X {game.multiplier ? game.multiplier : "1"}
                  </td>
                ))}
              </tr>
              {users.map((user) => (
                <tr key={user.id} className="border-b h-5">
                  {games.map((game) => {
                    const userBet = bets.find(
                      (bet) =>
                        bet.user_id === user.id && bet.game_id === game.id
                    );
                    return (
                      <td
                        key={`bet-${user.id}-${game.id}`}
                        className="px-4 py-2 text-center"
                      >
                        {isBeforeGameTime(game.date, game.time)
                          ? "?"
                          : userBet
                          ? `${userBet.goals_home}-${userBet.goals_away} (${
                              userBet.points_gained ? userBet.points_gained : 0
                            }p.)`
                          : "No Bet"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
