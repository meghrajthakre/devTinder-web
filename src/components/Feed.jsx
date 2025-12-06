import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCards";
import BottomNav from "./BottomNav";
import UserCards from "./UserCards";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const fetchFeed = async () => {
    const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
    dispatch(addFeed(res.data));
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <>

      <div className="flex items-center justify-center">
        <UserCards feed={feed} />
      </div>

      
    </>
  );
};

export default Feed;
