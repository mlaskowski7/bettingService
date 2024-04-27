import React from "react";
import { Bet, Game, User } from "../../types";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { RefreshButton } from ".";

interface YourBetsProps {
  bets: Bet[] | null;
  users: User[] | null;
  games: Game[] | null;
}

const YourBets = ({ bets, users, games }: YourBetsProps) => {
  const loggedUser = users?.find(
    (user) => user.username === localStorage.getItem("user")
  );
  const filteredBets = bets?.filter((bet) => bet.user_id === loggedUser?.id);
  return (
    <div
      id="yourBetsSection"
      className="relative h-screen w-full flex flex-col items-center justify-center gap-10"
    >
      <h1 className="px-5 py-3 text-[36px] bg-red-600 dela-font text-white rounded-md">
        Your Bets
      </h1>
      <p>Take a look on your bets, to change a bet click on it</p>
      <div className="flex gap-10 justify-center w-full ml-5">
        {filteredBets?.map((bet, index) => {
          const game = games?.find((game) => game.id === bet.game_id);
          return (
            <Link
              to={`/bets/${game?.id}`}
              key={index}
              className="dela-font  hover:text-blue-400 transition-all ease-in-out duration-300"
            >
              {game?.home_team} vs. {game?.away_team} - {bet.goals_home}:{" "}
              {bet.goals_away}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-4">
        <ScrollLink
          to="leaderboard"
          spy={true}
          smooth={true}
          duration={500}
          className="rounded-full  bg-black text-white p-5 hover:bg-red-600 transition-all duration-300 ease-in-out cursor-pointer scale-75"
        >
          <img src="/downArrow.png" alt="arrow" className="w-[50px] h-[50px]" />
        </ScrollLink>
        <RefreshButton />
      </div>
    </div>
  );
};

export default YourBets;
