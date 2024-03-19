import React from "react";
import { MainProps } from "../../types";
import { LeaderboardSection, Navbar } from ".";
import Hero from "./Hero";
import BetSection from "./BetSection";

const Main = ({ onLogout, user, games, users }: MainProps) => {
  return (
    <div>
      <Navbar onLogout={onLogout} user={user} />
      <Hero user={user} games={games} />
      <LeaderboardSection users={users} />
      <BetSection games={games} />
    </div>
  );
};

export default Main;
