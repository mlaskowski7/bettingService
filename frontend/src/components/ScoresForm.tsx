import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Bet, Game } from "../../types";

// YOU HAVE TO ADD GAME ID FROM PARAMS THAT IS THE ONE THAT SHOULD BE UPDATED

const ScoresForm = () => {
  const [goals_home, setGoals_home] = useState<number>(0);
  const [goals_away, setGoals_away] = useState<number>(0);
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

    if (game?.goals_home == null && game?.goals_away == null) {
      try {
        await axios.put(`http://localhost:3000/api/scores/${id}`, {
          goals_home,
          goals_away,
        });
      } catch (error) {
        alert("Something went wrong");
        console.error(error);
      }

      const loggedUser = localStorage.getItem("user") || "";

      if (game != null && loggedUser != "") {
        const betsFiltered = bets.filter((bet) => bet.game_id == game.id);

        for (const bet of betsFiltered) {
          try {
            if (goals_home == bet.goals_home && goals_away == bet.goals_away) {
              await axios.put("http://localhost:3000/api/pointsScore", {
                userId: bet.user_id,
                gameId: game.id,
                multiplier: game.multiplier,
              });
            } else if (
              (goals_home > goals_away && bet.goals_home > bet.goals_away) ||
              (goals_home < goals_away && bet.goals_home < bet.goals_away) ||
              (goals_home == goals_away && bet.goals_home == bet.goals_away)
            ) {
              await axios.put("http://localhost:3000/api/pointsWin", {
                userId: bet.user_id,
                gameId: game.id,
                multiplier: game.multiplier,
              });
            }
          } catch (error) {
            alert("Error while updating or deleting bet");
            console.error(error);
          }
        }
      }
      alert("Scores have been updated. Now you can go back to main dashboard");
      window.location.href = "/admin";
    } else {
      alert("This game has already been settled");
      window.location.href = "/admin";
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="w-screen h-screen bg-[#F5F5F5] flex justify-center items-center flex-col gap-6 text-black"
    >
      <h2 className="mb-5 text-[20px]">
        Please provide data about the final score of the game -{" "}
        {game?.home_team} vs. {game?.away_team}
      </h2>
      <div className="">
        <label className="font-bold">{game?.home_team}: </label>
        <input
          className="ml-5 bg-transparent border-2 border-white rounded-lg"
          type="text"
          value={goals_home}
          onChange={(e) => setGoals_home(Number(e.target.value))}
        />
      </div>
      <div>
        <label className="font-bold">{game?.away_team}: </label>
        <input
          className="ml-5 bg-transparent border-2 border-white rounded-lg"
          type="text"
          value={goals_away}
          onChange={(e) => setGoals_away(Number(e.target.value))}
        />
      </div>
      <button
        className="px-4 py-2 w-[15%] max-sm:w-[50%] bg-red-600 rounded-lg text-white hover:brightness-90"
        type="submit"
      >
        Update Score
      </button>
      <button className="px-4 py-2 w-[15%] max-sm:w-[50%] bg-blue-600 rounded-lg text-white hover:brightness-90">
        <Link to={"/admin"}>Back To Admin Panel</Link>
      </button>
    </form>
  );
};

export default ScoresForm;
