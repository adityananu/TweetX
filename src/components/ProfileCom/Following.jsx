import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../context/AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const Following = () => {
  const [data, setData] = useState([]);
  const { user } = useUserAuth();

  const fetchFollowing = async () => {
    try {
      // Query Firestore to get user data based on email
      const userQuery = query(collection(db, 'users'), where('email', '==', user.email));
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        const userData = userSnapshot.docs[0].data();
        setData(userData.following || []);
      }
    } catch (error) {
      console.error("Error fetching following data:", error);
    }
  };

  useEffect(() => {
    fetchFollowing();
  }, [user.email]);

  return (
    <div>
      {
        data?.map((follow, i) => (
          <div key={i} className=" w-[45rem] flex py-8 p-5 mb-5 rounded-lg bg-[#FFFFFF] shadow-sm">

            <div className="flex items-center w-full">
              <div className="h-[50px] w-[50px]  rounded-full border "></div>
              <div className="flex px-2 justify-between items-center w-[90%]">
                <h1 className="font-semibold"> {follow}</h1>
                <button className="px-5 py-2 text-slate-500 font-semibold" > Following</button>
              </div>
            </div>
          </div>))
      }
    </div>
  );
};

export default Following;
