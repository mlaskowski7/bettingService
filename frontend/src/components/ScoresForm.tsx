import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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

type Bet = {
  id: number;
  user_id: number;
  game_id: number;
  final_score: string;
  winner: string;
};

const ScoresForm = () => {
  const [winner, setWinner] = useState<string>("");
  const [score, setScore] = useState<string>("");
  const [game, setGame] = useState<Game | null>(null);
  const [bets, setBets] = useState<Bet[]>([]);

  const { id } = useParams<{ id: string }>();

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

    const getBets = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/bets");
        setBets(response.data);
      } catch (error) {
        alert("Something went wrong with getting bets data");
        console.error(error);
      }
    };
    getBets();

    getGame();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/scores/${id}`, {
        winner,
        score,
      });
    } catch (error) {
      alert("Something went wrong");
      console.error(error);
    }

    const loggedUser = localStorage.getItem("user") || "";

    if (game != null && loggedUser != "") {
      const betsFiltered = bets.filter((bet) => bet.game_id == game.id);

      for (const bet of betsFiltered) {
        console.log(`score:${score}, bet:${bet.final_score}`);
        console.log(`score:${winner}, bet:${bet.winner}`);
        try {
          if (score === bet.final_score) {
            console.log("score");
            await axios.put("http://localhost:3000/api/pointsScore", {
              username: loggedUser,
            });
            await axios.delete(`http://localhost:3000/api/bet/${bet.id}`);
          } else if (winner === bet.winner) {
            console.log("winner");
            await axios.put("http://localhost:3000/api/pointsWin", {
              username: loggedUser,
            });
            await axios.delete(`http://localhost:3000/api/bet/${bet.id}`);
          }
        } catch (error) {
          alert("Error while updating or deleting bet");
          console.error(error);
        }
      }
    }
    alert("Scores have been updated. Now you can go back to main dashboard");
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="w-screen h-screen bg-[#F5F5F5] flex justify-center items-center flex-col gap-6 text-black"
    >
      <h2 className="mb-5 text-[20px]">
        Please provide data about the final score and winner of the game -{" "}
        {game?.home_team} vs. {game?.away_team}
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
        Update Score
      </button>
      <button className="px-4 py-2 w-[15%] bg-blue-600 rounded-lg text-white hover:brightness-90">
        <Link to={"/"}>Back To Main Dashboard</Link>
      </button>
    </form>
  );
};

export default ScoresForm;
