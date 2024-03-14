import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// YOU HAVE TO ADD GAME ID FROM PARAMS THAT IS THE ONE THAT SHOULD BE UPDATED

type Game = {
  id: number;
  home_team: string;
  away_team: string;
  winner: string | null;
  description: string;
  score: string | null;
  date: string;
};

const BetForm = () => {
  const [winner, setWinner] = useState<string>("");
  const [score, setScore] = useState<string>("");
  const [user_id, setUser_id] = useState<number | null>(null);
  const [game, setGame] = useState<Game | null>(null);
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const game_id = id;

  useEffect(() => {
    const getGame = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/games");
        const foundGame = response.data.find(
          (game: Game) => game.id === Number(id)
        );
        if (foundGame) {
          setGame(foundGame);
        } else {
          alert("Game not found");
          console.log("Game not found");
        }
      } catch (error) {
        alert("Failed to fetch games - something is wrong");
        console.error(error);
      }
    };

    getGame();
    const loggedUser = localStorage.getItem("user") || "";
    setUser_id(Number(loggedUser));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/api/bets`, {
        user_id: user_id,
        game_id: game_id,
        winner: winner,
        score: score,
      });
      navigate("/");
    } catch (error) {
      alert("Something went wrong");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-screen h-screen bg-[#F5F5F5] flex justify-center items-center flex-col gap-6 text-black"
    >
      <h2 className="mb-5 text-[20px]">
        Place your bet on game - {game?.home_team} vs. {game?.away_team}
      </h2>
      <div className="">
        <label className="font-bold">Winner: </label>
        <input
          className="ml-5 bg-transparent border-2 border-white rounded-lg"
          type="text"
          value={winner}
          onChange={(e) => setWinner(e.target.value)}
          placeholder="same name as above..."
        />
      </div>
      <div>
        <label className="font-bold">Final Score:</label>
        <input
          className="ml-5 bg-transparent border-2 border-white rounded-lg"
          type="text"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          placeholder="score in format 1-0..."
        />
      </div>
      <button
        className="px-4 py-2 w-[15%] bg-red-600 rounded-lg text-white hover:brightness-90"
        type="submit"
      >
        Place Bet
      </button>
      <button className="px-4 py-2 w-[15%] bg-blue-600 rounded-lg text-white hover:brightness-90">
        <Link to={"/"}>Back To Main Dashboard</Link>
      </button>
    </form>
  );
};

export default BetForm;
