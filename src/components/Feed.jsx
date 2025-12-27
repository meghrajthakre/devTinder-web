import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import SwipeStack from "./SwipeStack";
import { setConnection } from "../utils/connectionSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const fetchFeed = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/feed",
        { withCredentials: true }
      );
      dispatch(addFeed(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  // Fetch connections
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

  // Swipe handler
  const handleSwipe = async (user, direction) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${direction}/${user._id}`,
        {},
        { withCredentials: true }
      );

      // Remove swiped user from feed
      dispatch(addFeed(feed.slice(1)));
    } catch (err) {
      console.error(err);
    }
  };

  if (!feed || feed.length === 0) {
    return <p className="text-center mt-[70px]">No more profiles 😴</p>;
  }

  return (
    <div className="flex items-center justify-center mt-20">
      <SwipeStack feed={feed} onSwipe={handleSwipe} />
    </div>
  );
};

export default Feed;
