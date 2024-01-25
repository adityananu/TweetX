import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Feed from "../components/Feed";
import Profile from "../components/Profile";
import Users from "../components/Users";

const Home = () => {
  const [activeComponent, setActiveComponent] = useState("feed");
  
  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="h-screen">
      <Header onChangeComponent={handleComponentChange} />
      <main className="bg-[#FFFFFF] w-full flex justify-center items-center">
        <section className="relative w-[50rem] h-[89vh] bg-[#FEFEFE] rounded-md">
          {activeComponent === "feed" && <Feed />}
          {activeComponent === "profile" && <Profile />}
          {activeComponent === "users" && <Users />}
        </section>
      </main>
    </div>
  );
};

export default Home;
