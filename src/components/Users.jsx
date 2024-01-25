import React, { useEffect, useState } from "react";
import { useUserAuth } from "../context/AuthContext";
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const { user } = useUserAuth();

  const fetchUsers = async () => {
    try {
      const userQuery = collection(db, 'users');
      const userSnapshot = await getDocs(userQuery);
      const userData = userSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setUsers(userData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleFollow = async (followedUserId) => {
    try {
      const currentUserQuery = query(collection(db, 'users'), where('email', '==', user.email));
      const currentUserSnapshot = await getDocs(currentUserQuery);

      if (!currentUserSnapshot.empty) {
        const currentUserDoc = currentUserSnapshot.docs[0];
        const currentUserData = currentUserDoc.data();
        setCurrentUser(currentUserData);

        const isFollowing = currentUserData.following.includes(followedUserId);

        if (isFollowing) {
          // If already following, unfollow by removing the entry
          currentUserData.following = currentUserData.following.filter(
            (id) => id !== followedUserId
          );
        } else {
          // If not following, add the followed user to the following array
          currentUserData.following.push(followedUserId);
        }

        await updateDoc(currentUserDoc.ref, { following: currentUserData.following });

        // Here adding otherUser Follower count

        const otherUserQuery = query(collection(db, "users"), where('email', "==", followedUserId));
        const otherUserSanpshot = await getDocs(otherUserQuery);

        const otherUserDoc = otherUserSanpshot.docs[0];
        const otherUserData = otherUserDoc.data();

        const follower = otherUserData.followers.includes(user.email);

        if (follower) {
          otherUserData.followers.filter((id) => id !== user.email);
        } else {
          otherUserData.followers.push(user.email)
        }

        await updateDoc(otherUserDoc.ref, otherUserData);

        // Fetch updated data
        fetchUsers();
        // fetchFollow();
      }
    } catch (error) {
      console.error("Error handling follow:", error);
    }
  };

  // const fetchFollow = () => {
  //   const followed = currentUser.following.includes("hehe@gmail.com");
  //   if (followed) {
  //     console.log("worked");
  //   }
  // }

  useEffect(() => {
    fetchUsers();
  }, []);


  return (
    <div className="p-5 h-[89vh] ">

      <div className="m-2 h-[85vh]">
        {users.length > 0 ? (
          users.map((otherUser) => (
            otherUser.email !== user.email && (
              <div key={otherUser.id} className="flex justify-between m-2 p-7 border-b-2">
                <div className="flex gap-2">
                  <div className="h-[50px] w-[50px] rounded-full border"></div>
                  <div>
                    <p className="font-semibold">{otherUser.email.split('@')[0]}</p>
                    <p className="text-sm">Followers: {otherUser.followers.length}</p>
                  </div>
                </div>
                {currentUser &&
                  currentUser.following.includes(otherUser.email)
                  ? (<button
                    className="px-5 py-2 bg-[#FF748D] text-white font-semibold rounded-md"
                    onClick={() => handleFollow(otherUser.email)}
                  >Following</button>)
                  : (<button
                    className="px-5 py-2 bg-[#FF748D] text-white font-semibold rounded-md"
                    onClick={() => handleFollow(otherUser.email)}
                  >Follow</button>)}
              </div>
            )
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>


    </div>
  );
};

export default Users;
