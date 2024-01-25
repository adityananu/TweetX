import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../context/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Loading from "../Loading";

const Posts = () => {
  const [data, setData] = useState([]);
  const { user } = useUserAuth();

  const fetchPosts = async () => {
    try {
      const userQuery = query(collection(db, 'users'), where('email', '==', user.email));
      const userSnapshot = await getDocs(userQuery);
      
      if (!userSnapshot.empty) {
        const userPosts = userSnapshot.docs[0].data().posts || [];
        setData(userPosts);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };


  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleDateString(); 
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="p-5 overflow-x-hidden your-div">
      {data?.length >= 1 ? (
        data?.map((post, i) => (
          <div key={i} className=" w-[45rem] flex py-8 p-5 mb-5 rounded-lg bg-[#FFFFFF] shadow-sm">

            <div className="h-[50px] w-[50px]  rounded-full border "></div>

            <div className="px-5 w-[90%]">
              <div className="flex justify-between w-full">
                <h2 className="font-semibold text-lg">{post.email.split('@')[0]}</h2>
                <h3>{formatTimestamp(post.timestamp)}</h3>
              </div>
              <h3>{post.text}</h3>
            </div>
          </div>
        ))
      ) : (
       <Loading />
      )}
    </div>
  );
};

export default Posts;
