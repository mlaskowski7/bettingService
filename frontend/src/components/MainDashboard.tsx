import React, { useState, useEffect } from "react";
import { MainDashboardProps } from "../../types";
import "../app.css";
import axios from "axios";
import { Link } from "react-router-dom";

type User = {
  username: string;
  password: string;
  points: number;
  id: number;
};

type Game = {
  id: number;
  home_team: string;
  away_team: string;
  winner: string | null;
  description: string;
  score: string | null;
  date: string;
};

const MainDashboard = ({ onLogout }: MainDashboardProps) => {
  const [user, setUser] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        setUsers(response.data);
      } catch (error) {
        alert("Failed to fetch users - something is wrong");
        console.error(error);
      }
    };

    const getGames = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/games");
        setGames(response.data);
      } catch (error) {
        alert("Failed to fetch games - something is wrong");
        console.error(error);
      }
    };

    getUsers();
    getGames();

    const loggedUser = localStorage.getItem("user") || "";
    setUser(loggedUser);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="h-screen bg-[#F5F5F5]">
      <div className="z-0 h-12 bg-red-600 flex justify-between items-center">
        <div>
          <button
            onClick={onLogout}
            className="ml-10 text-black bg-white rounded-lg py-1 px-5 text-sm hover:bg-transparent hover:text-white transition-all duration-300 ease-in-out"
          >
            Logout
          </button>
        </div>
        <div className="flex-grow flex justify-center items-center">
          <div className="madimi text-white text-[30px]">Betting Service</div>
        </div>
        <div className="text-white text-[15px] font-semibold mr-10 cursor-default">
          {user.toUpperCase()}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className=" rounded-md p-5">
          <Link
            to={"/leaderboard"}
            className="font-bold text-[25px] flex items-center gap-4 mb-5 hover:text-blue-600 transition-all ease-in-out duration-300"
          >
            <img
              className="w-[40px] h-[40px]"
              src="/podium.png"
              alt="leaderboard png"
            />
            <span>Leaderboard</span>
          </Link>
          {users.map((user, index) => {
            if (index <= 3) {
              return (
                <p key={index} className="text-[19px] text-center">
                  {user.username} : {user.points} pts.
                </p>
              );
            }
          })}
        </div>
      </div>
      <div className="flex justify-between gap-1 mx-10">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1>Click on particular Game to update its score</h1>
          <div className="rounded-md p-5 bg-gray-300 w-[100%] flex flex-col gap-2 justify-center mt-5">
            <h1 className="font-bold text-[25px] text-center flex items-center gap-4 mb-5">
              <img
                src="/game.png"
                alt="games png"
                className="w-[30px] h-[30px]"
              />
              <span>Upcoming Games</span>
            </h1>
            {games.map((game, index) => {
              if (!game.winner) {
                return (
                  <Link
                    to={`/scores/${game.id}`}
                    key={index}
                    className="text-[19px] text-left items-start hover:text-blue-500 transition-all ease-in-out duration-300"
                  >
                    {game.home_team} vs. {game.away_team} on{" "}
                    {formatDate(game.date)}
                  </Link>
                );
              }
            })}
          </div>
          <Link
            to={"/admin"}
            className=" text-white bg-red-600 rounded-lg py-4 px-5 text-md hover:bg-transparent hover:bg-blue-600 transition-all duration-300 ease-in-out"
          >
            Add Upcoming Games
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center">
          <h1>Click on particular Game to place a bet on it</h1>
          <div className="rounded-md p-5 bg-gray-300 w-[100%] flex flex-col gap-2 justify-center mt-5">
            <h1 className="font-bold text-[25px] text-center flex items-center gap-4 mb-5">
              <img
                src="/bet.png"
                alt="bets png"
                className="w-[30px] h-[30px]"
              />
              <span>Place Your Bets</span>
            </h1>
            {games.map((game, index) => {
              if (!game.winner) {
                return (
                  <Link
                    to={`/scores/${game.id}`}
                    key={index}
                    className="text-[19px] text-left items-start hover:text-blue-500 transition-all ease-in-out duration-300"
                  >
                    {game.home_team} vs. {game.away_team}
                  </Link>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
