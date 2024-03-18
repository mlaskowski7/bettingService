import React, { useState, useEffect } from "react";
import { MainDashboardProps } from "../../types";
import "../app.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navbar } from ".";

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
  goals_home: number | null;
  goals_away: number | null;
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
    <div className="">
      <Navbar onLogout={onLogout} user={user} />
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
              if (!game.goals_home && !game.goals_away) {
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
            className=" text-white bg-red-600 rounded-lg py-4 px-5 text-md border-2 border-red-600 hover:bg-transparent hover:text-red-600 transition-all duration-300 ease-in-out my-3"
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
              if (!game.goals_home && !game.goals_away) {
                return (
                  <Link
                    to={`/bets/${game.id}`}
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
