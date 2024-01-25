import React, { useState } from "react";
import { useUserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import people from "../assets/tweetx.webp"

function Login() {
  const { login, user } = useUserAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/home");
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="h-screen  bg-[#FFFFFF] flex">
      <div className="h-full p-7 flex flex-col gap-10 shadow-xl md:w-[30%] md:pt-[3rem] lg:w-[40%] lg:pt-[5rem] lg:pl-[7rem]">
        <div className="flex flex-col gap-10">
          <h2 className="text-3xl font-semibold text-red-600">Tweet X</h2>
          <Link
            to="/signup"
            className=" text-xl py-5 bg-transparent rounded-md flex justify-center items-center border border-[#FF748D] lg:px-10 lg:m-auto"
          >
            Create Account
          </Link>
        </div>
        <div className="flex flex-col gap-9">
          <h1 className="text-2xl font-semibold">Login</h1>
          <form onSubmit={handleLogin} className="flex flex-col">
            <input
              className=" w-[20rem] p-3 outline-none rounded-md mb-5 bg-[#F9F9F9]"
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className=" w-[20rem] p-3 outline-none rounded-md mb-5 bg-[#F9F9F9]"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <h3 className="text-red-500 text-sm">{error}</h3>}
            <div className="flex justify-between p-3">
              <p>Forgot Password ?</p>
              <button
                type="submit"
                className="h-[3rem] w-[7rem] rounded-md text-white font-semibold shadow-lg bg-[#FF748D] outline-none"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full hidden relative lg:block">
        <img src={people} alt="people" className="h-[40rem] absolute right-[15rem] bottom-1 md:hidden lg:block" />
      </div>
    </div>
  );
}

export default Login;
