import { Heart, MapPin, Star, X } from "lucide-react";
import React from "react";

const UserCards = ({ feed }) => {
  if (!feed || feed.length === 0) {
    return <p className="text-center mt-10">Loading feed...</p>;
  }

  const user = feed[7];

  return (
    <div className="flex justify-center items-center px-4 mt-8">
      <div className="relative w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden cursor-pointer">
        {/* IMAGE */}
        <div className="relative h-60 group overflow-hidden rounded-t-3xl">
          <img
            src={user.photourl || "..."}
            className="w-full h-full object-cover transition-transform duration-700 "
          />
          <div className="absolute top-3 left-3">
            <span className="flex items-center gap-1 text-xs text-white backdrop-blur px-3 py-1 rounded-full font-medium">
              <MapPin size={13} /> {user.location || "Indore"} · 4km
            </span>
          </div>
        </div>

        {/* BODY */}
        <div className="relative bg-base-100 pb-5 px-5">
          <div className="absolute -top-8 left-0 w-full h-8 bg-base-100 rounded-t-[2.5rem]" />
          <div className="flex justify-between items-center pt-2">
            <h2 className="text-xl font-bold text-primary">
              {user.firstName} {user.lastName}
            </h2>
            <span className="text-sm font-medium px-3 py-1 rounded-full">
              {user.age}
            </span>
          </div>

          <p className="text-sm text-base-content/70 mt-1 line-clamp-2">
            {user.about || "Building cool stuff & meeting devs 👨‍💻"}
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {user.skills?.slice(0, 5).map((skill, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 rounded-full text-white font-semibold bg-gradient-to-r  bg-secondary transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6 px-6">
            <button className="btn btn-circle btn-outline btn-error transition-transform duration-300 hover:scale-105">
              <X size={20} />
            </button>
            <button className="btn btn-circle bg-pink-500 text-white shadow-lg scale-105 hover:scale-110 transition-all">
              <Heart size={24} fill="currentColor" />
            </button>
            <button className="btn btn-circle btn-outline btn-secondary transition-transform duration-300 hover:scale-105">
              <Star size={20} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default UserCards;
