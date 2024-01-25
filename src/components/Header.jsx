import React from "react";
import { useUserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = ({ onChangeComponent }) => {
  const { logOut } = useUserAuth();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logOut();
    navigate("/");
  };

  return (
    <div className="h-[10vh] bg-[#ffffff] flex justify-between items-center px-[20rem] font-semibold border shadow-xl">
      <h2 className="text-3xl font-semibold text-red-600">Tweet X</h2>
      <div className="flex justify-evenly items-center text-2xl text-[#E1E1E1] gap-10 ">
        <button
          className="hover:text-red-800 transition-all duration-3000"
          onClick={() => onChangeComponent("feed")}
        >
          Feed
        </button>
        <button
          className="hover:text-red-800 transition-all duration-3000"
          onClick={() => onChangeComponent("users")}
        >
          Users
        </button>
        <button
          className="hover:text-red-800 transition-all duration-3000"
          onClick={() => onChangeComponent("profile")}
        >
          Profile
        </button>
      </div>
      <div>
        <button
          onClick={logoutHandler}
          className="px-5 py-3 bg-[#FF748D] rounded-lg text-white"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Header;
