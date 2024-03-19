import React, { useState, useEffect } from "react";
import {
  LoginForm,
  RegistrationForm,
  AdminDashboard,
  ScoresForm,
  Leaderboard,
  BetForm,
  Main,
} from "./components";
import axios from "axios";
import "./app.css";
import { useNavigate, Route, Routes } from "react-router-dom";
import { User, Game } from "../types";

const App = () => {
  const [user, setUser] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      setUser(loggedUser);
    }

    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        setUsers(response.data);
      } catch (error) {
        alert("Failed to fetch users - something is wrong");
        console.error(error);
      }
    };

    const getGames = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/games");
        setGames(response.data);
      } catch (error) {
        alert("Failed to fetch games - something is wrong");
        console.error(error);
      }
    };

    getUsers();
    getGames();
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      await axios.post("http://localhost:3000/api/users/login", {
        username,
        password,
      });
      localStorage.setItem("user", username);
      setUser(username);
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
      setUser(username);
      navigate("/");
    } catch (error) {
      alert(
        "Something went wrong - Make sure you are providing valid credentials"
      );
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("user");
    setUser("");
    location.reload();
  };

  return (
    <div>
      {user ? (
        <Routes>
          <Route
            path="/"
            element={
              <Main
                onLogout={handleLogOut}
                user={user}
                games={games}
                users={users}
              />
            }
          />
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
