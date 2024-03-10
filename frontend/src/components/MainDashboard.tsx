import React from "react";
import { MainDashboardProps } from "../../types";

const MainDashboard = ({ onLogout }: MainDashboardProps) => {
  return (
    <div className="h-screen">
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default MainDashboard;
