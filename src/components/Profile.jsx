import React, { useEffect, useState } from "react";
import { useUserAuth } from "../context/AuthContext";
import Posts from "./ProfileCom/Posts";
import Following from "./ProfileCom/Following";
import Followers from "./ProfileCom/Followers";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

const Profile = () => {
  const { user } = useUserAuth();
  const [activeComponent, setActiveComponent] = useState("following");
  const [postsLength,setPostsLength] = useState(0);
  const [followers,setFollowers] = useState(0);
  const [following,setFollowing] = useState(0);

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  const addDetails = async() => {
    try {
      const userQuery = query(collection(db, 'users'), where('email', '==', user.email));
      const userSnapshot = await getDocs(userQuery);

      setPostsLength(userSnapshot.docs[0].data().posts.length);
      setFollowing(userSnapshot.docs[0].data().following.length);
      setFollowers(userSnapshot.docs[0].data().followers.length);


    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    // so here i want to get the values of posts followeres and following
    addDetails();
  },[])

  return (
    <div className="h-[89vh] bg-[#FEFEFE]">
      <div className="flex h-[15vh] py-5 px-10 items-center gap-10 ">
        <div className="h-[110px] w-[140px] rounded-full border"></div>
        <div className=" w-full">
          <h1 className="text-xl font-bold">{user.email.split('@')[0]}</h1>
          <div className="flex gap-3 text-md mt-3">
            <p>Posts : {postsLength}</p>
            <p>Following : {following}</p>
            <p>Followers : {followers}</p>
          </div>
        </div>
      </div>
      <div className="h-[72vh]">
        <div className="flex py-5 flex-col justify-center">
          <div className="flex gap-14 font-semibold py-5 text-xl w-full justify-center items-center border-t-2">
            <button
              className={`${activeComponent === "posts" ? "text-[#FF748D] border-b-2 border-[#FF748D] transition-colors duration-100" : "text-[#beb9b9]"}`}
              onClick={() => handleComponentChange("posts")}
            >
              Posts
            </button>
            <button
              className={` ${activeComponent === "following" ? "text-[#FF748D] border-b-2 border-[#FF748D] transition-colors duration-100" : "text-[#beb9b9]"}`}
              onClick={() => handleComponentChange("following")}
            >
              Following
            </button>
            <button
              className={`${activeComponent === "followers" ? "text-[#FF748D] border-b-2 border-[#FF748D] transition-colors duration-100" : "text-[#beb9b9]"}`}
              onClick={() => handleComponentChange("followers")}
            >
              Followers
            </button>
          </div>
          <section className="relative h-[60vh] overflow-y-scroll px-5 py-5 flex rounded-md ">
            {activeComponent === "posts" && <Posts />}
            {activeComponent === "followers" && <Followers />}
            {activeComponent === "following" && <Following />}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
