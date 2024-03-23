import React, { useState, useEffect } from "react";
import { Game } from "../../types";
import "../app.css";
import axios from "axios";
import { Link } from "react-router-dom";

const MainDashboard = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const getGames = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/games");
        setGames(response.data);
      } catch (error) {
        alert("Failed to fetch games - something is wrong");
        console.error(error);
      }
    };

    getGames();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="flex flex-col justify-center items-center my-40">
      <h1>Click on particular Game to update its score</h1>
      <div className="rounded-md p-5 bg-gray-300 w-[50%] flex flex-col gap-2 justify-center mt-5">
        <h1 className="font-bold text-[25px] text-center flex items-center gap-4 mb-5">
          <img src="/game.png" alt="games png" className="w-[30px] h-[30px]" />
          <span>Upcoming Games</span>
        </h1>
        {games.map((game, index) => {
          if (!game.goals_home && !game.goals_away) {
            return (
              <Link
                to={`/scores/${game.id}`}
                key={index}
                className="text-[19px] text-left items-start hover:text-blue-500 transition-all ease-in-out duration-300"
              >
                {game.home_team} vs. {game.away_team} on {formatDate(game.date)}
                ({game.time})
              </Link>
            );
          }
        })}
      </div>
      <Link
        to={"/admin/newGame"}
        className=" text-white bg-red-600 rounded-lg py-4 px-5 text-md border-2 border-red-600 hover:bg-transparent hover:text-red-600 transition-all duration-300 ease-in-out my-3"
      >
        Add Upcoming Games
      </Link>
      <Link
        to={"/"}
        className=" text-white bg-blue-400 rounded-lg py-4 px-5 text-md border-2 border-blue-400 hover:bg-transparent hover:text-blue-400 transition-all duration-300 ease-in-out my-3"
      >
        Back To Regular User View
      </Link>
    </div>
  );
};

export default MainDashboard;
