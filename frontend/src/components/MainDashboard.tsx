import React, { useState, useEffect } from "react";
import { MainDashboardProps } from "../../types";
import "../app.css";
import axios from "axios";

type User = {
  username: string;
  password: string;
  points: number;
  id: number;
};

const MainDashboard = ({ onLogout }: MainDashboardProps) => {
  const [user, setUser] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setUsers(response.data);
      } catch (error) {
        alert("Failed to fetch users - something is wrong");
        console.error(error);
      }
    };

    getUsers();

    const loggedUser = localStorage.getItem("user") || "";
    setUser(loggedUser);
  }, []);

  return (
    <div className="h-screen bg-[#F5F5F5]">
      <div className="z-0 h-12 bg-red-600 flex justify-between items-center">
        <button
          onClick={onLogout}
          className="ml-10 text-black bg-white rounded-lg py-1 px-5 text-sm hover:bg-transparent hover:text-white transition-all duration-300 ease-in-out"
        >
          Logout
        </button>
        <div className="madimi text-white text-[30px]">Betting Service</div>
        <div className="text-white text-[15px] font-semibold mr-10 cursor-default">
          {user.toUpperCase()}
        </div>
      </div>
      <div className="flex justify-between items-center m-10">
        <div className=" w-[30%] rounded-md p-5">
          <h1 className="font-bold text-[19px]">Leaderboard</h1>
          {users.map((user, index) => (
            <p key={index}>
              {user.username} : {user.points}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
