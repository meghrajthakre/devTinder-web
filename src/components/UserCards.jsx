import axios from "axios";
import { Heart, MapPin, Star, X } from "lucide-react";
import React, { memo } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCards = ({ feed }) => {
  const dispatch = useDispatch();

  if (!feed) {
    return <p className="text-center mt-10">Loading feed...</p>;
  }

  const {
    _id,
    firstName,
    lastName,
    age,
    about,
    skills,
    photourl,
    location
  } = feed;

  const avatar =
    photourl ||
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

  // SEND REQUEST ===============================================
  const handleSendingRequests = async (status) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeFeed(_id)); // FIXED
    } catch (error) {

      console.log("ERROR:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-8 no-select cursor-pointer">
      <div className="relative w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden bg-base-100">

        {/* IMAGE */}
        <div className="relative h-60 overflow-hidden rounded-t-3xl">
          <img
            src={avatar}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover"
          />

          <div className="absolute top-3 left-3">
            <span className="flex items-center gap-1 text-xs text-white backdrop-blur bg-black/30 px-3 py-1 rounded-full">
              <MapPin size={13} />
              {location || "India"} · 4km
            </span>
          </div>
        </div>

        {/* BODY */}
        <div className="relative px-5 pb-5">
          <div className="absolute -top-8 left-0 w-full h-8 bg-base-100 rounded-t-[2.5rem]" />

          <div className="flex justify-between items-center pt-2">
            <h2 className="text-xl font-bold text-primary">
              {firstName} {lastName}
            </h2>
            <span className="text-sm font-medium px-3 py-1 rounded-full bg-base-200">
              {age}
            </span>
          </div>

          <p className="text-sm text-base-content/70 mt-1 line-clamp-2">
            {about || "Building cool stuff & meeting devs 👨‍💻"}
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {skills?.slice(0, 5).map((skill, i) => (
              <span
                key={skill + i}
                className="text-xs px-3 py-1 rounded-full text-white font-semibold bg-secondary"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-between items-center mt-6 px-6">
            <button
              onClick={() => handleSendingRequests("ignored")}
              className="btn btn-circle btn-outline btn-error hover:scale-105"
            >
              <X size={20} />
            </button>

            <button
              onClick={() => handleSendingRequests("interested")}
              className="btn btn-circle bg-pink-500 text-white shadow-lg scale-105 hover:scale-110"
            >
              <Heart size={24} fill="currentColor" />
            </button>

            <button className="btn btn-circle btn-outline btn-secondary hover:scale-105">
              <Star size={20} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default memo(UserCards);
