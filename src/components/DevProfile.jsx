import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { setChats } from "../utils/chatUsersSlice";
import { useDispatch } from "react-redux";
import ConfirmModal from "../components/ConfirmModal";
import Back from "./buttons/Back";

const DevProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);
    

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Fetch profile
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

    // Message handler
    const handleMessage = async () => {
        try {
            const res = await axios.post(
                `${BASE_URL}/chat/access/${id}`,
                {},
                { withCredentials: true }
            );

            dispatch(setChats(res.data));
            navigate(`/chat/access/${res.data._id}`);
        } catch (error) {
            console.log("Chat access failed", error);
        }
    };

    // Remove connection
    const handleRemove = async () => {
        try {
            await axios.delete(
                `${BASE_URL}/connection/remove/${id}`,
                { withCredentials: true }
            );
            navigate("/connections");
        } catch (error) {
            console.log("Remove connection failed", error);
        }
    };

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
        <>
            <div className="flex justify-center items-center min-h-[calc(100vh-50px)] mt-[50px] bg-base-200 px-4 py-6 pb-20">

                <div className="w-full max-w-5xl">
                    <div className="bg-base-100 rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

                        {/* IMAGE */}
                        <div className="relative">
                            <img
                                src={user.photourl}
                                alt={user.firstName}
                                className="w-full h-[420px] md:h-full object-cover"
                            />

                            <div className="absolute bottom-0 left-0 right-0 md:hidden bg-gradient-to-t from-black/70 to-transparent p-4">
                                <h2 className="text-white text-2xl font-semibold z-100">
                                    {user.firstName} {user.lastName}
                                </h2>
                                <p className="text-white/80 text-sm">
                                    {user.isOnline ? "🟢 Online" : "Offline"}
                                </p>
                            </div>
                        </div>

                        {/* DETAILS */}
                        <div className="p-5 md:p-8 flex flex-col gap-4">

                            <div className="hidden md:block">
                                <h2 className="text-2xl font-semibold">
                                    {user.firstName} {user.lastName}
                                </h2>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </div>

                            <div>
                                {user.isOnline ? (
                                    <span className="text-green-500"> Online</span>
                                ) : (
                                    <span className="badge badge-ghost">
                                        Last seen {new Date(user.lastSeen).toLocaleString()}
                                    </span>
                                )}
                            </div>

                            <div>
                                <h3 className="font-semibold text-sm text-gray-600 mb-1">
                                    About
                                </h3>
                                <p className="text-sm text-gray-400">
                                    {user.about || "No bio added yet"}
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-sm text-gray-600 mb-2">
                                    Skills
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {Array.isArray(user.skills) && user.skills.length > 0 ? (
                                        user.skills
                                            .flatMap(skillGroup =>
                                                skillGroup
                                                    .split(",")
                                                    .map(skill => skill.trim())
                                                    .filter(Boolean)
                                            )
                                            .map((skill, i) => (
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

                            <p className="text-xs text-gray-400 mt-auto">
                                Joined on {new Date(user.createdAt).toDateString()}
                            </p>

                            <div className="flex gap-3 pt-3">
                                <button
                                    className="btn btn-primary"
                                    onClick={handleMessage}
                                >
                                    💬 Message
                                </button>

                                <button
                                    className="btn btn-outline btn-error"
                                    onClick={() => setShowConfirm(true)}
                                >
                                    ✖ Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONFIRM MODAL */}
            <ConfirmModal
                isOpen={showConfirm}
                title="Remove Connection?"
                message="Are you sure you want to remove this connection? You won't be able to chat again."
                confirmText="Yes, Remove"
                cancelText="Cancel"
                onCancel={() => setShowConfirm(false)}
                onConfirm={() => {
                    handleRemove();
                    setShowConfirm(false);
                }}
            />
        </>
    );
};

export default DevProfile;
