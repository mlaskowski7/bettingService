import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type User = {
  username: string;
  password: string;
  points: number;
  id: number;
};

const Leaderboard = () => {
  const [users, setUsers] = useState<User[]>([]);
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

    getUsers();
  }, []);
  return (
    <div className="w-screen h-screen bg-[#F5F5F5] flex justify-center items-center flex-col gap-6 text-black">
      <h2 className="mb-5 text-[20px] font-bold">Leaderboard</h2>
      {users.map((user, index) => (
        <p key={index} className="text-[19px]">
          {index + 1}. {user.username} : {user.points} pts.
        </p>
      ))}
      <button className="px-4 py-2 w-[15%] bg-blue-600 rounded-lg text-white hover:brightness-90">
        <Link to={"/"}>Back To Main Dashboard</Link>
      </button>
    </div>
  );
};

export default Leaderboard;
