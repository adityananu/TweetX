import React, { useEffect, useState } from "react";
import { useUserAuth } from "../context/AuthContext";
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import Loading from "./Loading";

const Feed = () => {
  const { user } = useUserAuth();
  const [writingModal, setWritingModal] = useState(false);
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const userRef = query(collection(db, 'users'), where('email', '==', user.email));
      const userSnapshot = await getDocs(userRef);
      const newPost = {
        email: user.email,
        text: message,
        timestamp: new Date().toISOString(),
      };


      if (!userSnapshot.empty) {
        let currentUser = userSnapshot.docs[0];
        const userData = currentUser.data();
        // Update the existing user document by adding the new post
        userData.posts.push(newPost);

        await updateDoc(currentUser.ref, userData);
      } else {
        // If the user doesn't exist, create a new user entry
        await addDoc(collection(db, 'users'), {
          email: user.email,
          uid: user.uid,
          posts: [newPost],
          followers: [],
          following: [],
        });
      }

      // Add the post to the 'posts' collection
      await addDoc(collection(db, 'posts'), newPost);

      setMessage("");
      setWritingModal(false);
      fetchData(); // Fetch the updated data
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleDateString(); // Customize the format as needed
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="z-2 p-3 h-full bg-[#FEFEFE]">
      <div className="flex px-5 items-center ">
        {writingModal ? (
          <div className="w-full h-[13vh] flex justify-center items-center transition-all duration-100">
            <div className="bg-[#ff748e54] px-10 py-3 rounded-md">
              <div className="flex justify-between px-3">
                <h1 className="text-lg mb-5">{user.email}</h1>
                <span
                  className="text-white text-xl h-[10px] cursor-pointer"
                  onClick={() => setWritingModal(!writingModal)}
                >
                  X
                </span>
              </div>
              <form onSubmit={handlePost}>
                <input
                  autoFocus={writingModal}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="text"
                  className="px-5 py-3 rounded-lg outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#FF748D] px-5 py-3 ml-6 rounded-lg"
                >
                  Post
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="h-[13vh] transition-all duration-150">

            <button
              className="bg-[#FF748D] text-white px-10 py-4 font-medium rounded-lg  "
              onClick={() => setWritingModal(!writingModal)}
            >
              Write
            </button>
          </div>
        )}
      </div>

      <div className="h-[70vh] p-3 overflow-y-scroll your-div">
        {loading ? (
          <>
            <Loading />
            <Loading />
            <Loading />
            <Loading />
          </>
        ) :
          posts.length >= 1 ? (
            posts.map((post, i) => (
              <div key={i} className=" w-[45rem] flex py-8 p-5 mb-5 rounded-lg bg-[#FFFFFF] shadow-sm relative overflow-hidden">

                <div className="h-[50px] w-[50px]  rounded-full border "></div>

                <div className="px-5 w-[90%]">
                  <div className="flex justify-between w-full">
                    <h2 className="font-semibold text-lg">{post.email.split('@')[0]}</h2>
                    <h3>{formatTimestamp(post.timestamp)}</h3>
                  </div>
                  <h3>{post.text}</h3>
                </div>
                <div className="h-[70px] w-[70px] rounded-full absolute border border-[#FF748D] right-[-45px] flex justify-center items-center">
                  <div className="h-[55px] w-[55px] rounded-full bg-[#FF748D] right-[-45px]"></div>
                </div>
              </div>
            ))
          ) : (
            <h1>Add new Posts</h1>
          )}

      </div>
    </div>
  );
};

export default Feed;
