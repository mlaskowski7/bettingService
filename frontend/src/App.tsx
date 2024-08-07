import { useState, useEffect } from "react";
import {
  LoginForm,
  RegistrationForm,
  ScoresForm,
  Main,
  NewGame,
  MainDashboard,
  BetForm,
  DetailedView,
} from "./components";
import axios from "axios";
import "./app.css";
import { useNavigate, Route, Routes } from "react-router-dom";
import { User, Game, Bet } from "../types";

const App = () => {
  const [user, setUser] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [bets, setBets] = useState<Bet[]>([]);
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

    const getBets = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/bets");
        setBets(response.data);
      } catch (error) {
        alert("Failed to fetch games - something is wrong");
        console.error(error);
      }
    };

    getUsers();
    getBets();
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
                bets={bets}
              />
            }
          />
          <Route
            path="/detailedView"
            element={<DetailedView bets={bets} games={games} users={users} />}
          />
          {users.find((elem) => elem.username === user)?.isadmin && (
            <Route path="/admin" element={<MainDashboard />} />
          )}
          {users.find((elem) => elem.username === user)?.isadmin && (
            <Route path="/admin/newGame" element={<NewGame />} />
          )}
          {users.find((elem) => elem.username === user)?.isadmin && (
            <Route path="/scores/:id" element={<ScoresForm />} />
          )}
          <Route
            path="/bets/:id"
            element={<BetForm users={users} bets={bets} />}
          />
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
