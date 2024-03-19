import { HeroProps } from "../../types";
import { Link as ScrollLink } from "react-scroll";

const Hero = ({ user, games }: HeroProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <div
      id="hero"
      className="h-screen relative flex flex-col justify-center items-center gap-20"
    >
      <div className="flex justify-between mx-40 items-center gap-20">
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
        <div>
          <h1 className="font-bold text-[30px] text-left flex items-center justify-start gap-4 mb-5">
            <img
              src="/game.png"
              alt="games png"
              className="w-[30px] h-[30px]"
            />
            <span>Upcoming Games</span>
          </h1>
          {games?.map((game, index) => {
            if (!game.goals_home && !game.goals_away) {
              return (
                <p key={index} className="text-[16px] text-left items-start">
                  {game.home_team} vs. {game.away_team} on{" "}
                  {formatDate(game.date)}
                </p>
              );
            }
          })}
        </div>
      </div>
      <ScrollLink
        to="leaderboard"
        spy={true}
        smooth={true}
        duration={500}
        className="rounded-full  bg-black text-white p-7 hover:bg-red-600 transition-all duration-300 ease-in-out cursor-pointer"
      >
        <img src="/downArrow.png" alt="arrow" className="w-[50px] h-[50px]" />
      </ScrollLink>
    </div>
  );
};

export default Hero;
