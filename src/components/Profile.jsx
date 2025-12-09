import React from "react";
import { Edit3, MapPin, Heart, Star } from "lucide-react";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);

  if (!user) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-4">
      {/* Profile Card */}
      <div className="card bg-base-100 shadow-xl rounded-3xl overflow-hidden">
        
        {/* Cover */}
        <div className="h-28 bg-gradient-to-r from-pink-400 via-rose-400 to-red-400" />

        {/* Avatar */}
        <div className="flex justify-center -mt-16">
          <div className="avatar">
            <div className="w-32 rounded-full ring ring-pink-400 ring-offset-base-100 ring-offset-4">
              <img src={user.photourl} alt="profile" />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="card-body text-center">
          <h2 className="text-2xl font-bold">
            {user.firstName} {user.lastName}
          </h2>

          <p className="text-sm text-base-content/70 flex justify-center gap-1">
            <MapPin size={14} />
            {user.location || "India"}
          </p>

          <div className="flex justify-center gap-2 mt-2 flex-wrap">
            {user.skills?.map((skill, i) => (
              <span
                key={i}
                className="badge badge-outline badge-secondary"
              >
                {skill}
              </span>
            ))}
          </div>

          <p className="text-base-content/80 mt-4">
            {user.bio || "Frontend developer who loves clean UI & smart logic 💻❤️"}
          </p>

          {/* Stats */}
          <div className="flex justify-around mt-6">
            <div>
              <p className="text-xl font-bold flex justify-center gap-1">
                <Heart className="text-pink-500" />
                {user.likes || 0}
              </p>
              <p className="text-sm opacity-70">Likes</p>
            </div>
            <div>
              <p className="text-xl font-bold flex justify-center gap-1">
                <Star className="text-yellow-400" />
                {user.matches || 0}
              </p>
              <p className="text-sm opacity-70">Matches</p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6">
            <button className="btn btn-primary btn-wide gap-2 rounded-full">
              <Edit3 size={16} />
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
