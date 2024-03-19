import React from "react";
import { LogoutFormProps } from "../../types";

const Navbar = ({ onLogout, user }: LogoutFormProps) => {
  return (
    <div className="z-0 h-[10vh] bg-red-600 flex justify-end items-center">
      <div className="flex mr-5 items-center gap-2">
        <div className="text-white text-[15px] font-semibold mr-10 cursor-default">
          {user.toUpperCase()}
        </div>
        <button
          onClick={onLogout}
          className=" text-black bg-white rounded-lg py-1 px-5 text-sm hover:bg-transparent hover:text-white transition-all duration-300 ease-in-out"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
