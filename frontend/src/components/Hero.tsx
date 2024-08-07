import { Link } from "react-router-dom";
import { HeroProps } from "../../types";
import { Link as ScrollLink } from "react-scroll";

const Hero = ({ user, games, bets, users }: HeroProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const loggedUser = users?.find((element) => element.username === user);

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

  let gamesCounter = 0;

  return (
    <div
      id="hero"
      className="min-h-screen relative flex flex-col justify-center items-center gap-20 max-sm:mt-20"
    >
      <div className="flex justify-between max-sm:flex-col mx-40 items-center gap-20">
        <div className="flex flex-col justify-center items-center">
          <h1 className="dela-font text-[40px] text-center">
            Welcome back{" "}
            <span className="text-red-600 dela-font">
              {user.toUpperCase()}!
            </span>
          </h1>
          <img
            src="/football.png"
            alt="football png"
            className="w-[150px] h-[150px] hover:opacity-70 transition-all ease-in-out duration-300"
          />
        </div>
        <div className="mt-56">
          <h1 className="font-bold text-[30px] text-left flex items-center justify-start gap-4 mb-5">
            <img
              src="/game.png"
              alt="games png"
              className="w-[30px] h-[30px]"
            />
            <span>Upcoming Games</span>
          </h1>
          <div className="flex flex-start align-left gap-2 flex-col max-sm:w-100">
            {games?.map((game, index) => {
              if (isBeforeGameTime(game.date, game.time) && gamesCounter <= 3) {
                const bet = bets?.find(
                  (bet) =>
                    bet.user_id === loggedUser?.id && bet.game_id == game.id
                );
                gamesCounter++;
                if (!game.goals_home && !game.goals_away && bet) {
                  return (
                    <p
                      key={index}
                      className="flex flex-col text-[16px] text-left items-start"
                    >
                      {game.home_team} vs. {game.away_team} on{" "}
                      {formatDate(game.date)} ({game.time.split(":")[0]}:
                      {game.time.split(":")[1]})
                      <Link
                        to={`/bets/${game.id}`}
                        className="bg-red-600 px-2 py-1 rounded-xl text-white ml-2 hover:brightness-95 transition-all ease-in-out duration-300"
                      >
                        You placed {bet.goals_home} - {bet.goals_away}
                      </Link>
                    </p>
                  );
                } else if (!game.goals_home && !game.goals_away) {
                  return (
                    <p
                      key={index}
                      className="flex flex-col text-[16px] text-left items-start"
                    >
                      {game.home_team} vs. {game.away_team} on{" "}
                      {formatDate(game.date)} ({game.time.split(":")[0]}:
                      {game.time.split(":")[1]})
                      <Link
                        to={`/bets/${game.id}`}
                        className="bg-blue-400 px-2 py-1 rounded-xl text-white ml-2 hover:brightness-95 transition-all ease-in-out duration-300"
                      >
                        Place a Bet
                      </Link>
                    </p>
                  );
                }
              }
            })}
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center items-center gap-4">
        <ScrollLink
          to="yourBetsSection"
          spy={true}
          smooth={true}
          duration={500}
          className="rounded-full  bg-black text-white p-5 hover:bg-red-600 transition-all duration-300 ease-in-out cursor-pointer scale-75"
        >
          <img src="/downArrow.png" alt="arrow" className="w-[50px] h-[50px]" />
        </ScrollLink>
        <Link
          to="/detailedView"
          className="bg-blue-400 text-white font-bold px-5 py-3 rounded-md hover:brightness-75 transition-all duration-300 ease-in-out"
        >
          Bets table
        </Link>
      </div>
    </div>
  );
};

export default Hero;
