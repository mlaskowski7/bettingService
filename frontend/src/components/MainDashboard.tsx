import React, { useState, useEffect } from "react";
import { MainDashboardProps } from "../../types";
import "../app.css";

const MainDashboard = ({ onLogout }: MainDashboardProps) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const loggedUser = localStorage.getItem("user") || "";
    setUser(loggedUser);
  }, []);

  return (
    <div className="h-screen">
      <div className="z-0 h-12 bg-red-600 flex justify-between items-center">
        <button
          onClick={onLogout}
          className="ml-10 text-black bg-white rounded-lg py-1 px-5 text-sm hover:bg-transparent hover:text-white transition-all duration-300 ease-in-out"
        >
          Logout
        </button>
        <div className="madimi text-white text-[30px]">Betting Service</div>
        <div className="text-white text-[15px] font-semibold mr-10">
          {user.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
