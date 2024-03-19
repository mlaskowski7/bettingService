import React from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { BetSectionProps } from "../../types";

const BetSection = ({ games }: BetSectionProps) => {
  return (
    <div
      id="betSection"
      className="relative h-screen w-full flex flex-col items-center justify-center gap-10"
    >
      <h1 className="px-5 py-3 text-[36px] bg-red-600 dela-font text-white rounded-md">
        Place Your Bets
      </h1>
      <p>Click on particular game to predict its score</p>
      <div className="flex gap-10 justify-center w-full ml-5">
        {games?.map((game, index) => {
          if (!game.goals_home) {
            return (
              <Link
                to={`/bets/${game.id}`}
                key={index}
                className="dela-font hover:text-blue-400 transition-all ease-in-out duration-300"
              >
                {game.home_team} vs. {game.away_team}
              </Link>
            );
          }
        })}
      </div>

      <ScrollLink
        to="hero"
        spy={true}
        smooth={true}
        duration={500}
        className="rounded-full  bg-black text-white p-7 border-2 border-black hover:bg-transparent transition-all duration-300 ease-in-out cursor-pointer"
      >
        <img src="/up-arrow.png" alt="arrow" className="w-[50px] h-[50px]" />
      </ScrollLink>
    </div>
  );
};

export default BetSection;
