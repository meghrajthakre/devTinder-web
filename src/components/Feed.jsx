import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCards";
import BottomNav from "./BottomNav";
import UserCards from "./UserCards";
import { setConnection } from "../utils/connectionSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const fetchFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", { withCredentials: true });
      dispatch(addFeed(res.data.data));
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);


  // ✅ App load par connections fetch
  useEffect(() => {
    const handleConnections = async () => {
      try {
        const res = await axios.get(
          BASE_URL + "/user/connections",
          { withCredentials: true }
        );
        dispatch(setConnection(res.data.request || []));
      } catch (err) {
        console.log(err);
      }
    };

    handleConnections();
  }, [dispatch]);


  // 🔥 FIX: Prevents null / empty error
  if (!feed || feed.length === 0) {
    return <p className="text-center mt-[70px]">Loading feed...</p>;
  }

  return (
    <>

      <div className="flex items-center justify-center no-select">
        <UserCards feed={feed[0]} />
      </div>


    </>
  );
};

export default Feed;
