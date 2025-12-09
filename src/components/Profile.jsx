import React from "react";
import { Edit3, MapPin, Heart, Star } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const user = useSelector((store) => store.user);
    const navigate = useNavigate()
    if (!user) {
        return <p className="text-center mt-10">Loading profile...</p>;
    }



    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-120px)] px-4">
            {/* PROFILE CARD */}
            <div
                className="
          w-full
          max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl
          bg-base-100
          rounded-3xl
          shadow-xl
          overflow-hidden
        "
            >
                {/* Cover */}
                <div className="h-28 sm:h-32 md:h-36 lg:h-40 bg-gradient-to-r from-pink-400 via-rose-400 to-red-400" />

                {/* Avatar */}
                <div className="flex justify-center -mt-14 sm:-mt-16 md:-mt-20">
                    <div className="avatar">
                        <div className="w-28 sm:w-32 md:w-36 lg:w-40 rounded-full ring ring-pink-400 ring-offset-base-100 ring-offset-4">
                            <img
                                src={user.photourl}
                                alt="profile"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="px-4 sm:px-6 md:px-8 pt-3 pb-6 text-center space-y-3">
                    {/* Name */}
                    <h2 className="font-bold text-primary text-xl sm:text-2xl md:text-3xl lg:text-3xl">
                        {user.firstName} {user.lastName}
                    </h2>

                    {/* Location */}
                    <p className="text-sm sm:text-base md:text-lg text-base-content/60 flex justify-center gap-1 items-center">
                        <MapPin size={14} />
                        {user.location || "India"}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-1">
                        {user.skills?.slice(0, 7).map((skill, i) => (
                            <span
                                key={skill + i}
                                className="text-xs sm:text-sm md:text-base px-3 py-1 rounded-full text-white bg-secondary"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>

                    {/* Bio */}
                    <p className="text-sm sm:text-base md:text-base text-base-content/70 line-clamp-3 mt-1">
                        {user.about || "Frontend dev who loves clean UI 💻❤️"}
                    </p>

                    {/* Stats */}
                    {/* Stats */}
                    <div className="flex justify-around mt-3">
                        <div>
                            <p className="font-bold flex items-center justify-center gap-1 text-base sm:text-lg md:text-xl">
                                <Heart className="text-pink-500 w-5 sm:w-6 md:w-7" fill="currentColor" />
                                {user.likes || 0}
                            </p>
                            <p className="text-xs sm:text-sm md:text-base opacity-60">Likes</p>
                        </div>
                        <div>
                            <p className="font-bold flex items-center justify-center gap-1 text-base sm:text-lg md:text-xl">
                                <Star className="text-yellow-400 w-5 sm:w-6 md:w-7" fill="currentColor" />
                                {user.matches || 0}
                            </p>
                            <p className="text-xs sm:text-sm md:text-base opacity-60">Matches</p>
                        </div>
                    </div>


                    {/* Edit Button */}
                    <button
                        onClick={() => navigate('/profileEdit')}
                        className="btn btn-primary btn-md sm:btn-lg md:btn-lg rounded-full mt-3 flex items-center justify-center gap-2 mx-auto">
                        <Edit3 size={16} />

                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
