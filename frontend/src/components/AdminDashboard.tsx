import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



const AdminDashboard = () => {
  const [home, setHome] = useState<string>("");
  const [away, setAway] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/games", {
        home_team: home,
        away_team: away,
        description: description,
        date: date,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-screen h-screen bg-[#F5F5F5] flex justify-center items-center flex-col gap-6 text-black"
    >
      <h2 className="mb-5 text-[20px]">
        Fill out the form to add new upcoming game
      </h2>
      <div className="">
        <label className="font-bold">Home Team: </label>
        <input
          className="ml-5 bg-transparent border-2 border-white rounded-lg"
          type="text"
          value={home}
          onChange={(e) => setHome(e.target.value)}
        />
      </div>
      <div>
        <label className="font-bold">Away Team:</label>
        <input
          className="ml-5 bg-transparent border-2 border-white rounded-lg"
          type="text"
          value={away}
          onChange={(e) => setAway(e.target.value)}
        />
      </div>
      <div>
        <label className="font-bold">Description:</label>
        <input
          className="ml-5 bg-transparent border-2 border-white rounded-lg"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label className="font-bold">Date:</label>
        <input
          className="ml-5 bg-transparent border-2 border-white rounded-lg"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <button
        className="px-4 py-2 w-[15%] bg-red-600 rounded-lg text-white hover:brightness-90"
        type="submit"
      >
        Add Game
      </button>
      <button className="px-4 py-2 w-[15%] bg-blue-600 rounded-lg text-white hover:brightness-90">
        <Link to={"/"}>Back To Main Dashboard</Link>
      </button>
    </form>
  );
};

export default AdminDashboard;
