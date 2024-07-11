import { MainProps } from "../../types";
import { LeaderboardSection, Navbar, YourBets } from ".";
import Hero from "./Hero";
import BetSection from "./BetSection";

const Main = ({ onLogout, user, games, users, bets }: MainProps) => {
  return (
    <div>
      <Navbar onLogout={onLogout} user={user} users={users} />
      <Hero user={user} games={games} bets={bets} users={users} />
      <LeaderboardSection users={users} />
      <YourBets users={users} bets={bets} games={games} />
      <BetSection games={games} bets={bets} user={user} users={users} />
    </div>
  );
};

export default Main;
