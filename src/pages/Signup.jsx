import React, { useState } from "react";
import { useUserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import people from '../assets/more.webp'

const Signup = () => {
  const { signUp } = useUserAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlesignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate("/");
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="h-screen  bg-[#FFFFFF] flex">
      <div className="h-full p-7 flex flex-col gap-10 shadow-xl md:w-[30%] md:pt-[3rem] lg:w-[40%] lg:pt-[5rem] lg:pl-[7rem]">
        <div className="flex flex-col gap-10">
          <h2 className="text-3xl font-semibold text-red-600">Tweet X</h2>
          <Link
            to="/"
            className=" text-xl py-5 bg-transparent rounded-md flex justify-center items-center border border-[#FF748D] lg:px-10 lg:m-auto"
          >
            Login
          </Link>
        </div>
        <div className="flex flex-col gap-9">
          <h1 className="text-2xl font-semibold">Create Account</h1>
          <form onSubmit={handlesignUp} className="flex flex-col">
            <input
              className=" w-[20rem] p-3 outline-none rounded-md mb-5 bg-[#F9F9F9]"
              type="text"
              // value={name}
              placeholder="Name"
              // onChange={(e) => setName(e.target.value)}
              required
            />
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
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              className=" w-[20rem] p-3 outline-none rounded-md mb-5 bg-[#F9F9F9]"
              type="password"
              placeholder="Confirm Password"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <h1>{error}</h1>}
            <div className="flex p-3">
              <button
                type="submit"
                className="h-[3rem] w-[7rem] rounded-md text-white font-semibold shadow-lg bg-[#FF748D] outline-none"
              >
                signup
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full hidden relative lg:block">
        <img src={people} alt="people" className="h-[40rem] absolute right-[10rem] bottom-1 md:hidden lg:block" />
      </div>
    </div>
  );
};

export default Signup;
