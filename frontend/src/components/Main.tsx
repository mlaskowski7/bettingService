import { MainProps } from "../../types";
import { LeaderboardSection, Navbar, YourBets } from ".";
import Hero from "./Hero";
import BetSection from "./BetSection";

const Main = ({ onLogout, user, games, users, bets }: MainProps) => {
  return (
    <div>
      <Navbar onLogout={onLogout} user={user} users={users} />
      <Hero user={user} games={games} bets={bets} users={users} />
      <YourBets users={users} bets={bets} games={games} />
      <LeaderboardSection users={users} />
      <BetSection games={games} />
    </div>
  );
};

export default Main;
