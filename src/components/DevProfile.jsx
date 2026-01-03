import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const DevProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchProfile = async () => {
        try {
            const res = await axios.get(
                `${BASE_URL}/profile/${id}`,
                { withCredentials: true }
            );
            setUser(res.data.user);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [id]);

    const handleMessage = () => {
        navigate(`/chat/access/${res.data._id}`);

    }

    if (loading) {
        return (
            <div className="mt-[100px] text-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!user) {
        return <p className="mt-[100px] text-center">User not found</p>;
    }

    return (
        <div className="mt-[80px]  bg-base-200 px-4  py-6 flex justify-center pb-20 md:pb-0">
            <div className="w-full max-w-4xl">
                <div className="bg-base-100 rounded-3xl shadow-xl overflow-hidden
                      grid grid-cols-1 md:grid-cols-2">

                    {/* IMAGE SECTION */}
                    <div className="relative">
                        <img
                            src={user.photourl}
                            alt={user.firstName}
                            className="w-full h-[420px] md:h-full object-cover"
                        />

                        {/* Mobile Name Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 md:hidden
                          bg-gradient-to-t from-black/70 to-transparent p-4">
                            <h2 className="text-white text-2xl font-semibold">
                                {user.firstName} {user.lastName}
                            </h2>
                            <p className="text-white/80 text-sm">
                                {user.isOnline ? "🟢 Online" : "Offline"}
                            </p>
                        </div>
                    </div>

                    {/* DETAILS SECTION */}
                    <div className="p-5 md:p-8 flex flex-col gap-4">

                        {/* Desktop Name */}
                        <div className="hidden md:block">
                            <h2 className="text-2xl font-semibold">
                                {user.firstName} {user.lastName}
                            </h2>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </div>

                        {/* Status */}
                        <div>
                            {user.isOnline ? (
                                <span className="badge badge-success">🟢 Online</span>
                            ) : (
                                <span className="badge badge-ghost">
                                    Last seen {new Date(user.lastSeen).toLocaleString()}
                                </span>
                            )}
                        </div>

                        {/* About */}
                        <div>
                            <h3 className="font-semibold text-sm text-gray-600 mb-1">
                                About
                            </h3>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                {user.about || "No bio added yet"}
                            </p>
                        </div>

                        {/* Skills */}
                        <div>
                            <h3 className="font-semibold text-sm text-gray-600 mb-2">
                                Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {user.skills?.length > 0 ? (
                                    user.skills.map((skill, i) => (
                                        <span key={i} className="badge badge-outline">
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-xs text-gray-400">
                                        No skills added
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Joined */}
                        <p className="text-xs text-gray-400 mt-auto">
                            Joined on {new Date(user.createdAt).toDateString()}
                        </p>

                        {/* Actions */}
                        <div className="flex gap-3 pt-3">
                            <button className="btn btn-primary flex-1" onClick={handleMessage}>
                                💬 Message
                            </button>
                            <button className="btn btn-outline btn-error">
                                ✖ Remove
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default DevProfile;
