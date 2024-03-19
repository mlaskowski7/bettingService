import React from "react";
import { MainProps } from "../../types";
import { LeaderboardSection, Navbar } from ".";
import Hero from "./Hero";

const Main = ({ onLogout, user, games, users }: MainProps) => {
  return (
    <div>
      <Navbar onLogout={onLogout} user={user} />
      <Hero user={user} games={games} />
      <LeaderboardSection users={users} />
    </div>
  );
};

export default Main;
