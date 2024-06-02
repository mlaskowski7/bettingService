import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { BetSectionProps } from "../../types";
import { RefreshButton } from ".";

const BetSection = ({ games }: BetSectionProps) => {
  const isBeforeGameTime = (gameDate: string, gameTime: string): boolean => {
    const date = gameDate.split("T");
    // Combine the date and time into a full ISO 8601 date-time string
    const combinedDateTime = `${date[0]}T${gameTime}`; // Adding seconds and milliseconds

    try {
      const gameDateTime = new Date(combinedDateTime);
      const now = new Date();

      // Check if the gameDateTime is valid
      if (isNaN(gameDateTime.getTime())) {
        throw new Error("Invalid game date or time");
      }

      return now < gameDateTime;
    } catch (error) {
      console.error(error);
      return false; // Return false if there was an error
    }
  };
  return (
    <div
      id="betSection"
      className="relative min-h-screen w-full flex flex-col items-center justify-center gap-10"
    >
      <h1 className="px-5 py-3 text-[36px] bg-red-600 dela-font text-white rounded-md">
        Place Your Bets
      </h1>
      <p>Click on particular game to predict its score</p>
      <div className="flex flex-wrap gap-10 justify-center w-full ml-5">
        {games?.map((game, index) => {
          if (isBeforeGameTime(game.date, game.time)) {
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

      <div className="flex items-center justify-center gap-4">
        <ScrollLink
          to="hero"
          spy={true}
          smooth={true}
          duration={500}
          className="rounded-full  bg-black text-white p-4 border-4 border-black hover:bg-transparent transition-all duration-300 ease-in-out cursor-pointer scale-75"
        >
          <img src="/up-arrow.png" alt="arrow" className="w-[50px] h-[50px]" />
        </ScrollLink>
        <RefreshButton />
      </div>
    </div>
  );
};

export default BetSection;
