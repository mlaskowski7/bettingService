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
      <div className="flex justify-center items-center my-10">
        <div className=" rounded-md p-5">
          <h1 className="font-bold text-[25px] flex items-center gap-4 mb-5">
            <img
              className="w-[40px] h-[40px]"
              src="/podium.png"
              alt="leaderboard png"
            />
            <span>Leaderboard</span>
          </h1>
          {users.map((user, index) => (
            <p key={index} className="text-[19px]">
              {user.username} : {user.points} pts.
            </p>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-10">
        <div className="rounded-md p-5 bg-gray-300 mr-10 w-[30%] flex flex-col gap-2 justify-center mt-5">
          <h1 className="font-bold text-[25px] text-center flex items-center gap-4 mb-5">
            <img
              src="/game.png"
              alt="games png"
              className="w-[30px] h-[30px]"
            />
            <span>Upcoming Games</span>
          </h1>
          {games.map((game, index) => (
            <p key={index} className="text-[19px] text-left items-start">
              {game.home_team} vs. {game.away_team} on {formatDate(game.date)}
            </p>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center flex-col p-5">
        <Link
          to={"/admin"}
          className=" text-white bg-blue-600 rounded-lg py-5 px-10 text-md hover:bg-transparent hover:text-black transition-all duration-300 ease-in-out"
        >
          Click To Add Upcoming Games
        </Link>
      </div>
      <div className="flex justify-center items-center flex-col p-5">
        <Link
          to={"/scores"}
          className=" text-white bg-red-600 rounded-lg py-5 px-10 text-md hover:bg-transparent hover:text-black transition-all duration-300 ease-in-out"
        >
          Click To Update Scores
        </Link>
      </div>
    </div>
  );
};

export default MainDashboard;
