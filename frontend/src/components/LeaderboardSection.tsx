import React from "react";
import { LeaderboardProps } from "../../types";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import { RefreshButton } from ".";

const LeaderboardSection = ({ users }: LeaderboardProps) => {
  return (
    <div
      id="leaderboard"
      className="relative h-screen flex flex-col items-center justify-center gap-10"
    >
      <h1 className="px-5 py-3 text-[36px] bg-blue-400 dela-font text-white rounded-md">
        Leaderboard
      </h1>
      <div className="flex gap-10 justify-between">
        <div className="flex flex-col justify-center items-center text-center">
          <h1 className="text-[24px] dela-font">Winners:</h1>
          {users?.map((user, index) => {
            if (index <= 2) {
              return (
                <div className="p-5" key={index}>
                  <span className="bg-blue-400 p-2 rounded-full text-white mx-2">
                    {index + 1}.
                  </span>
                  <span>
                    {user.username.toUpperCase()} with {user.points} points
                  </span>
                </div>
              );
            }
          })}
        </div>
        <div className="flex flex-col justify-center items-center text-center">
          <h1 className="text-[24px] dela-font">Runner Ups:</h1>
          {users?.map((user, index) => {
            if (index > 2) {
              return (
                <div className="p-5" key={index}>
                  <span className="bg-red-500 p-2 rounded-full text-white mx-2">
                    {index + 1}.
                  </span>
                  <span>
                    {user.username.toUpperCase()} with {user.points} points
                  </span>
                </div>
              );
            }
          })}
        </div>
      </div>
      <Link
        to={"/"}
        className="bg-red-600 px-6 py-4 rounded-md border-2 border-red-600 text-white hover:text-red-600 hover:bg-transparent transition-all ease-in-out duration-300"
      >
        Click To See Detailed Table
      </Link>

      <div className="flex justify-center items-center gap-4">
        <ScrollLink
          to="betSection"
          spy={true}
          smooth={true}
          duration={500}
          className="rounded-full  bg-black text-white p-5 hover:bg-red-600 transition-all duration-300 ease-in-out cursor-pointer"
        >
          <img src="/downArrow.png" alt="arrow" className="w-[50px] h-[50px]" />
        </ScrollLink>
        <RefreshButton />
      </div>
    </div>
  );
};

export default LeaderboardSection;
