import React, { useState } from "react";
import { RegistrationFormProps } from "../../types";
import { Link } from "react-router-dom";

const RegistrationForm = ({ onRegister }: RegistrationFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [masterPassword, setMasterPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (masterPassword === "#!ghjqwe!") {
      onRegister(username, password);
    } else {
      alert("Provided master password was incorrect");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-screen h-screen bg-[#F5F5F5] flex justify-center items-center flex-col gap-6 text-black"
    >
      <h2 className="mb-5 text-[20px]">
        Fill out the form to register new account in the system
      </h2>
      <div className="">
        <label className="font-bold">Username: </label>
        <input
          className="ml-5 bg-transparent border-2 border-white rounded-lg"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label className="font-bold">Password:</label>
        <input
          className="ml-5 bg-transparent border-2 border-white rounded-lg"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label className="font-bold">Master Password:</label>
        <input
          className="ml-5 bg-transparent border-2 border-white rounded-lg"
          type="password"
          value={masterPassword}
          onChange={(e) => setMasterPassword(e.target.value)}
        />
      </div>
      <button
        className="px-4 py-2 w-[15%] max-sm:w-[50%] bg-blue-600 rounded-lg text-white hover:brightness-90"
        type="submit"
      >
        Register
      </button>
      <button
        className="px-4 py-2 w-[15%] max-sm:w-[50%]  bg-red-600 rounded-lg text-white hover:brightness-90"
        type="submit"
      >
        <Link to={"/"}>Login to an existing account</Link>
      </button>
    </form>
  );
};

export default RegistrationForm;
