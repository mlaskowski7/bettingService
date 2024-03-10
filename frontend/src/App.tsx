import React, { useState, useEffect } from "react";
import { LoginForm } from "../components";
import { User } from "../types";
import axios from "axios";

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
      console.error("Error while logging in: ", error);
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
        <div>
          <span>Welcome, {user.username}</span>
          <button onClick={handleLogOut}>Logout</button>
        </div>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
