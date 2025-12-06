import { Heart, MapPin, Star, X } from "lucide-react";
import React from "react";

const UserCards = ({ feed }) => {
  if (!feed || feed.length === 0) {
    return <p className="text-center mt-10">Loading feed...</p>;
  }

  const user = feed[7];

  return (
    <div className="flex justify-center items-center px-6 mt-10">
      <div className="relative card bg-base-300 w-full max-w-sm 
    shadow-2xl rounded-3xl overflow-hidden cursor-pointer">

        {/* IMAGE */}
        {/* IMAGE */}
        <div className="relative overflow-hidden rounded-2xl h-64 w-full">
          <img
            src={
              user.photourl ||
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            }
            alt="profile"
            className="w-full h-full object-cover"
          />

          {/* LOCATION — TOP */}
          <div className="absolute top-3 left-3 z-10">
            <span className="flex items-center gap-1 
      text-xs md:text-sm 
      text-white 
      bg-black/40 backdrop-blur-sm 
      px-2 py-1 rounded-full">
              <MapPin size={14} strokeWidth={2} />
              India 34km away
            </span>
          </div>

          {/* NAME + ABOUT — BOTTOM */}
          <div
            className="absolute bottom-0 left-0 right-0 p-4 
    bg-gradient-to-t from-black/70 to-transparent 
    text-white text-left"
          >
            <h2 className="text-lg font-semibold">
              {user.firstName} {user.lastName},{" "}
              <span className="opacity-80">{user.age}</span>
            </h2>

            <p className="text-sm opacity-80 line-clamp-2">
              {user.about || "No bio added yet."}
            </p>
          </div>
        </div>



        {/* CONTENT */}
        <div className="card-body p-5 text-center">



          {/* SKILLS */}
          <div className="flex justify-center flex-wrap gap-2 mt-3">
            {user.skills?.map((skill, i) => (
              <span
                key={i}
                className="badge badge-outline badge-sm text-base-content/70"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* ACTION BUTTONS */}
          {/* ACTION BUTTONS */}
          <div className="flex justify-between items-center mt-5 px-6">
            <button className="btn btn-circle btn-outline btn-error">
              <X size={20} strokeWidth={2} />
            </button>

            <button className="btn btn-circle btn-primary shadow-lg">
              <Heart size={22} fill="currentColor" />
            </button>

            <button className="btn btn-circle btn-outline btn-secondary">
              <Star size={20} strokeWidth={2} />
            </button>
          </div>

        </div>
      </div>
    </div>

  );
};

export default UserCards;
