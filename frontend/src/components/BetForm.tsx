import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Bet, User } from "../../types";

// YOU HAVE TO ADD GAME ID FROM PARAMS THAT IS THE ONE THAT SHOULD BE UPDATED

type Game = {
  id: number;
  home_team: string;
  away_team: string;
  goals_home: number | null;
  goals_away: number | null;
  date: string;
};

interface BetFormProps {
  users: User[];
  bets: Bet[];
}

const BetForm: React.FC<BetFormProps> = ({ users, bets }) => {
  const [goals_home, setGoals_home] = useState<number | string>("");
  const [goals_away, setGoals_away] = useState<number | string>("");
  const [user_id, setUser_id] = useState<number | null>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [currentHome, setCurrentHome] = useState<number | string | undefined>(
    ""
  );
  const [currentAway, setCurrentAway] = useState<number | string | undefined>(
    ""
  );

  const { id } = useParams<{ id: string }>();
  const game_id = Number(id);

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
    const loggedUser = users.find(
      (user) => user.username === localStorage.getItem("user")
    );

    const currentBet = bets.find(
      (bet) => bet.user_id === user_id && bet.game_id === game_id
    );

    if (currentBet) {
      setCurrentHome(currentBet?.goals_home);
      setCurrentAway(currentBet?.goals_away);
    } else {
      setCurrentHome("?");
      setCurrentAway("?");
    }

    if (loggedUser) setUser_id(loggedUser.id);
  }, [users, id, bets, user_id, game_id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentBet = bets.find(
      (bet) => bet.user_id === user_id && bet.game_id === game_id
    );
    try {
      if (currentBet) {
        await axios.delete(`http://localhost:3000/api/bet/${currentBet?.id}`);
      }
      await axios.post(`http://localhost:3000/api/bets`, {
        user_id: user_id,
        game_id: game_id,
        goals_home: goals_home,
        goals_away: goals_away,
      });
      window.location.href = "/";
    } catch (error) {
      alert("Something went wrong (Make sure to fill are the fields)");
      console.error(error);
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (dateString != undefined) {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-screen h-screen bg-[#F5F5F5] flex justify-center items-center flex-col gap-6 text-black"
    >
      <h2 className="mb-5 text-[20px]">
        Place your bet on game - {game?.home_team} vs. {game?.away_team} on{" "}
        {formatDate(game?.date)}
      </h2>
      <h4 className="mt-3 text-[16px] text-blue-600">
        Your current bet: {currentHome} - {currentAway}
      </h4>
      <div className="">
        <label className="font-bold">{game?.home_team} : </label>
        <input
          className="ml-5 bg-transparent border-2 border-white rounded-lg"
          type="text"
          value={goals_home}
          onChange={(e) => {
            if (!isNaN(Number(e.target.value))) {
              setGoals_home(Number(e.target.value));
            }
          }}
        />
      </div>
      <div>
        <label className="font-bold">{game?.away_team} : </label>
        <input
          className="ml-5 bg-transparent border-2 border-white rounded-lg"
          type="text"
          value={goals_away}
          onChange={(e) => {
            if (!isNaN(Number(e.target.value))) {
              setGoals_away(Number(e.target.value));
            }
          }}
        />
      </div>
      <button
        className="px-4 py-2 w-[15%] max-sm:w-[50%] bg-red-600 rounded-lg text-white hover:brightness-90"
        type="submit"
      >
        Place Bet
      </button>
      <button className="px-4 py-2 w-[15%] max-sm:w-[50%] bg-blue-600 rounded-lg text-white hover:brightness-90">
        <Link to={"/"}>Back To Main Dashboard</Link>
      </button>
    </form>
  );
};

export default BetForm;
