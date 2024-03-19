import React from "react";
import { MainProps } from "../../types";
import { Navbar } from ".";
import Hero from "./Hero";

const Main = ({ onLogout, user, games }: MainProps) => {
  return (
    <div>
      <Navbar onLogout={onLogout} user={user} />
      <Hero user={user} games={games} />
    </div>
  );
};

export default Main;
