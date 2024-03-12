import React, { useState } from "react";
import { Link } from "react-router-dom";

// YOU HAVE TO ADD GAME ID FROM PARAMS THAT IS THE ONE THAT SHOULD BE UPDATED

const ScoresForm = () => {
  const [winner, setWinner] = useState("");
  const [score, setScore] = useState("");

  const handleSubmit = () => {};

  return (
    <form
      onSubmit={handleSubmit}
      className="w-screen h-screen bg-[#F5F5F5] flex justify-center items-center flex-col gap-6 text-black"
    >
      <h2 className="mb-5 text-[20px]">
        Please provide data about the final score and winner of the game
      </h2>
      <div className="">
        <label className="font-bold">Winner: </label>
        <input
          className="ml-5 bg-transparent border-2 border-white rounded-lg"
          type="text"
          value={winner}
          onChange={(e) => setWinner(e.target.value)}
        />
      </div>
      <div>
        <label className="font-bold">Final Score:</label>
        <input
          className="ml-5 bg-transparent border-2 border-white rounded-lg"
          type="text"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
      </div>
      <button
        className="px-4 py-2 w-[15%] bg-red-600 rounded-lg text-white hover:brightness-90"
        type="submit"
      >
        Update Score
      </button>
      <button className="px-4 py-2 w-[15%] bg-blue-600 rounded-lg text-white hover:brightness-90">
        <Link to={"/"}>Back To Main Dashboard</Link>
      </button>
    </form>
  );
};

export default ScoresForm;
