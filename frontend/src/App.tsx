import React, { useState, useEffect } from "react";
import { LoginForm, RegistrationForm, MainDashboard } from "./components";
import { User } from "../types";
import axios from "axios";
import "./app.css";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    console.log(localStorage.getItem("user"));
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      setUser({ username: loggedUser });
    }
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        username,
        password,
      });
      localStorage.setItem("user", username);
      setUser({ username });
      console.log(localStorage.getItem("user"));
    } catch (error) {
      alert(
        "Something went wrong - Make sure you are providing valid credentials"
      );
    }
  };

  const handleRegister = async (username: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:3000/users", {
        username,
        password,
      });
      localStorage.setItem("user", username);
      setUser({ username });
    } catch (error) {
      alert(
        "Something went wrong - Make sure you are providing valid credentials"
      );
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    location.reload();
  };

  return (
    <div className="bg-[#F5F5F5]">
      {user ? (
        <Routes>
          <Route path="/" element={<MainDashboard onLogout={handleLogOut} />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
          <Route
            path="/register"
            element={<RegistrationForm onRegister={handleRegister} />}
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
