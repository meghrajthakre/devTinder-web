import { Heart, MapPin, Star, X } from "lucide-react";
import React, { memo } from "react";

const UserCards = ({ feed }) => {
  if (!feed || feed.length === 0) {
    return <p className="text-center mt-10">Loading feed...</p>;
  }

  // ✅ safer than hardcoding [7]
  const user = feed[Math.min(7, feed.length - 1)];

  const avatar =
    user.photourl ||
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

  return (
    <div className="flex    
              hover:scale-[1.01]  transition-transform duration-700 justify-center items-center px-4 mt-8">
      <div
        className="
          relative w-full max-w-sm
          rounded-3xl shadow-2xl
          overflow-hidden cursor-pointer
          bg-base-100 
        "
      >
        {/* ================= IMAGE ================= */}
        <div className="relative h-60 overflow-hidden rounded-t-3xl">
          <img
            src={avatar}
            alt={`${user.firstName} ${user.lastName}`}
            loading="lazy"
            decoding="async"
            className="
              w-full h-full object-cover
          
            "
          />

          {/* Location */}
          <div className="absolute top-3 left-3">
            <span className="
              flex items-center gap-1
              text-xs text-white font-medium
              backdrop-blur bg-black/30
              px-3 py-1 rounded-full
            ">
              <MapPin size={13} />
              {user.location || "Indore"} · 4km
            </span>
          </div>
        </div>

        {/* ================= BODY ================= */}
        <div className="relative px-5 pb-5">
          {/* Curve */}
          <div className="absolute -top-8 left-0 w-full h-8 bg-base-100 rounded-t-[2.5rem]" />

          {/* Name */}
          <div className="flex justify-between items-center pt-2">
            <h2 className="text-xl font-bold text-primary">
              {user.firstName} {user.lastName}
            </h2>
            <span className="text-sm font-medium px-3 py-1 rounded-full bg-base-200">
              {user.age}
            </span>
          </div>

          {/* Bio */}
          <p className="text-sm text-base-content/70 mt-1 line-clamp-2">
            {user.about || "Building cool stuff & meeting devs 👨‍💻"}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {user.skills?.slice(0, 5).map((skill, i) => (
              <span
                key={skill + i}
                className="
                  text-xs px-3 py-1 rounded-full
                  text-white font-semibold
                  bg-secondary
                  transition-transform duration-300
                  hover:scale-105
                "
              >
                {skill}
              </span>
            ))}
          </div>

          {/* ================= ACTIONS ================= */}
          <div className="flex justify-between items-center mt-6 px-6">
            <button
              aria-label="Reject"
              className="btn btn-circle btn-outline btn-error hover:scale-105 transition"
            >
              <X size={20} />
            </button>

            <button
              aria-label="Like"
              className="
                btn btn-circle
                bg-pink-500 text-white shadow-lg
                scale-105 hover:scale-110 transition
              "
            >
              <Heart size={24} fill="currentColor" />
            </button>

            <button
              aria-label="Super Like"
              className="btn btn-circle btn-outline btn-secondary hover:scale-105 transition"
            >
              <Star size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ prevents unnecessary re-renders
export default memo(UserCards);
