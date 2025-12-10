import React from "react";
import { Edit3, MapPin, Heart, Star } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();

    if (!user) {
        return <p className="text-center mt-10">Loading profile...</p>;
    }

    return (
        <div
            className="px-4 py-4 mt-15 pb-20 md:mt-0 md:pb-3 
  flex flex-col justify-center w-full   min-h-screen overflow-hidden
  "
        >

            <div className="w-full max-w-3xl bg-base-100 shadow-xl rounded-2xl overflow-hidden self-center">


                {/* COVER */}
                <div className="h-26 sm:h-26 bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 relative">
                    {/* EDIT BUTTON (TOP RIGHT) */}
                    <button
                        onClick={() => navigate("/profileEdit")}
                        className="absolute top-3 right-3 btn btn-sm btn-circle bg-base-100 shadow-md"
                    >
                        <Edit3 size={14} />
                    </button>
                </div>

                {/* AVATAR + BASIC INFO */}
                <div className="px-5 sm:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                        {/* Avatar */}
                        <div className="-mt-16">
                            <div className="avatar">
                                <div className="w-32 sm:w-36 rounded-full ring ring-pink-400 ring-offset-base-100 ring-offset-4">
                                    <img
                                        src={user.photourl}
                                        alt="profile"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Name + Location */}
                        <div className="flex-1 mt-2 sm:mt-0">
                            <h2 className="text-2xl sm:text-3xl font-bold text-primary">
                                {user.firstName} {user.lastName}
                            </h2>
                            <div className="flex items-center gap-1 text-base-content/70 mt-1">
                                <MapPin size={14} />
                                <span>{user.location || "India"}</span>
                            </div>
                        </div>
                    </div>

                    {/* ABOUT */}
                    <div className="mt-6">
                        <h3 className="font-semibold text-sm uppercase tracking-wide opacity-60 mb-2">
                            About
                        </h3>
                        <p className="text-base-content/80 leading-relaxed">
                            {user.about || "Frontend developer who loves clean UI & smooth UX 💻❤️"}
                        </p>
                    </div>

                    {/* SKILLS */}
                    <div className="mt-6">
                        <h3 className="font-semibold text-sm uppercase tracking-wide opacity-60 mb-2">
                            Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {user.skills?.slice(0, 10).map((skill, i) => (
                                <span
                                    key={skill + i}
                                    className="px-3 py-1 rounded-full text-sm bg-secondary text-white"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* STATS */}
                    <div className="mt-8 grid grid-cols-2 gap-4 text-center">
                        <div className="bg-base-200 rounded-xl py-4">
                            <p className="flex justify-center items-center gap-1 text-xl font-bold">
                                <Heart className="text-pink-500" fill="currentColor" />
                                {user.likes || 0}
                            </p>
                            <p className="text-xs uppercase opacity-60 mt-1">Likes</p>
                        </div>

                        <div className="bg-base-200 rounded-xl py-4">
                            <p className="flex justify-center items-center gap-1 text-xl font-bold">
                                <Star className="text-yellow-400" fill="currentColor" />
                                {user.matches || 0}
                            </p>
                            <p className="text-xs uppercase opacity-60 mt-1">Matches</p>
                        </div>
                    </div>

                    {/* EDIT BUTTON (BOTTOM) */}
                    <div className="mt-8 mb-6 flex justify-center">
                        <button
                            onClick={() => navigate("/profileEdit")}
                            className="btn btn-primary rounded-full px-8 flex gap-2"
                        >
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

