import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const NewGame = () => {
  const [home, setHome] = useState<string>("");
  const [away, setAway] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [multiplier, setMultiplier] = useState<number>(1);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/games", {
        home_team: home,
        away_team: away,
        date: date.replace("T00", "T02"),
        time: time,
        multiplier: multiplier,
      });
      if (response) {
        alert("The game has been successfully added");
        window.location.reload();
      }
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
        <label className="font-bold">Points Multiplier:</label>
        <input
          className="ml-5 bg-transparent border-2 border-white rounded-lg"
          type="number"
          value={multiplier}
          onChange={(e) => setMultiplier(Number(e.target.value))}
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
      <div>
        <label className="font-bold">Time:</label>
        <input
          className="ml-5 bg-transparent border-2 border-white rounded-lg"
          type="time"
          step="900"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <button
        className="px-4 py-2 w-[15%] max-sm:w-[50%] max-sm:w-[50%] bg-red-600 rounded-lg text-white hover:brightness-90"
        type="submit"
      >
        Add Game
      </button>
      <button className="px-4 py-2 w-[15%] max-sm:w-[50%] max-sm:w-[50%] bg-blue-600 rounded-lg text-white hover:brightness-90">
        <Link to={"/admin"}>Back To Admin Panel</Link>
      </button>
    </form>
  );
};

export default NewGame;
