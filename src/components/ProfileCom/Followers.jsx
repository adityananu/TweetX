import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../context/AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const Followers = () => {
  const [data, setData] = useState();
  const { user } = useUserAuth();


  const fetchFollowing = async () => {
    try {
      const currentUser = query(collection(db, "users"), where('email', '==', user.email));
      const userSnapshot = await getDocs(currentUser);
      if (!userSnapshot.empty) {
        const otherFollowers = userSnapshot.docs[0].data();
        setData(otherFollowers.followers || []);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchFollowing();
  }, []);

  return (
    <div>
      {data?.map((follower, i) => (
        <div key={i} className=" w-[45rem] flex py-8 p-5 mb-5 rounded-lg bg-[#FFFFFF] shadow-sm">

          <div className="flex items-center w-full">
            <div className="h-[50px] w-[50px]  rounded-full border "></div>
            <div className="flex px-2 justify-between items-center w-[90%]">
              <h1 className="font-semibold"> {follower}</h1>
              {/* <button className="px-5 py-2 text-slate-500 font-semibold" > Following</button> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Followers;
