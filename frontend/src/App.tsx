import React, { useState, useEffect } from "react";
import {
  LoginForm,
  RegistrationForm,
  MainDashboard,
  AdminDashboard,
  ScoresForm,
  Leaderboard,
  BetForm,
} from "./components";
import { User } from "../types";
import axios from "axios";
import "./app.css";
import { useNavigate, Route, Routes } from "react-router-dom";

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(localStorage.getItem("user"));
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      setUser({ username: loggedUser });
    }
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      await axios.post("http://localhost:3000/api/users/login", {
        username,
        password,
      });
      localStorage.setItem("user", username);
      setUser({ username });
      console.log(localStorage.getItem("user"));
      navigate("/");
    } catch (error) {
      alert(
        "Something went wrong - Make sure you are providing valid credentials"
      );
    }
  };

  const handleRegister = async (username: string, password: string) => {
    try {
      await axios.post("http://localhost:3000/api/users", {
        username,
        password,
      });
      localStorage.setItem("user", username);
      setUser({ username });
      navigate("/");
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
    <div>
      {user ? (
        <Routes>
          <Route path="/" element={<MainDashboard onLogout={handleLogOut} />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/scores/:id" element={<ScoresForm />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/bets/:id" element={<BetForm />} />
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
