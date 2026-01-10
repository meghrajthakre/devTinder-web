import React from "react";
import {
    MapPin,
    Github,
    Linkedin,
    Link as LinkIcon,
    Edit3,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();

    if (!user) return <p className="text-center mt-20">Loading...</p>;

    const locationText =
        user.location?.city || user.location?.country
            ? `${user.location?.city || ""}${user.location?.city && user.location?.country ? ", " : ""}${user.location?.country || ""}`
            : "India";

    const photos =
        user.photos?.length > 0 ? user.photos : [user.photourl];

    return (
        <div className="min-h-screen bg-base-200 mt-[75px] pb-28">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* LEFT SIDEBAR */}
                <div className="bg-base-100 rounded-xl shadow p-6 space-y-4 h-fit">
                    <div className="flex items-center gap-4">
                        <div className="avatar">
                            <div className="w-20 rounded-full">
                                <img src={user.photourl} alt="profile" />
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold">
                                {user.firstName} {user.lastName}
                            </h2>
                            <p className="text-sm opacity-70">{user.currentRole}</p>
                        </div>
                    </div>

                    <div className="text-sm space-y-1 opacity-80">
                        <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            {locationText}
                        </div>
                        <div className="mt-2">
                            <h3 className="font-semibold mb-2">experience</h3>
                            <p className="text-sm opacity-80 leading-relaxed">
                                <p>{user.experienceLevel}</p>

                            </p>
                        </div>

                        <div className="mt-2">
                            <h3 className="font-semibold mb-2">About</h3>
                            <p className="text-sm opacity-80 leading-relaxed">
                                {user.about ||
                                    "Focused on improving problem-solving skills and building scalable applications."}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate("/profileEdit")}
                        className="btn btn-outline btn-sm w-full gap-2"
                    >
                        <Edit3 size={14} /> Edit Profile
                    </button>

                    {/* LINKS */}
                    <div className="pt-2 space-y-2">
                        {user.githubProfileUrl && (
                            <a
                                href={user.githubProfileUrl}
                                target="_blank"
                                className="flex items-center gap-2 text-sm hover:underline"
                            >
                                <Github size={16} /> GitHub
                            </a>
                        )}
                        {user.linkedinProfileUrl && (
                            <a
                                href={user.linkedinProfileUrl}
                                target="_blank"
                                className="flex items-center gap-2 text-sm hover:underline"
                            >
                                <Linkedin size={16} /> LinkedIn
                            </a>
                        )}
                        {user.portfolioUrl && (
                            <a
                                href={user.portfolioUrl}
                                target="_blank"
                                className="flex items-center gap-2 text-sm hover:underline"
                            >
                                <LinkIcon size={16} /> Portfolio
                            </a>
                        )}
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div className="md:col-span-2 space-y-6">

                    {/* PHOTOS */}
                    <div className="bg-base-100 rounded-xl shadow p-6">
                        <h3 className="font-semibold mb-3">Photos</h3>
                        <div className="flex gap-3 overflow-x-auto">
                            {photos.map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    className="h-32 w-32 rounded-lg object-cover"
                                    alt="user"
                                />
                            ))}
                        </div>
                    </div>

                    {/* SKILLS */}
                    {user.skills?.length > 0 && (
                        <div className="bg-base-100 rounded-xl shadow p-6">
                            <h3 className="font-semibold mb-3">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {user.skills.map((skill, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 text-xs rounded-md bg-base-200"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* TECH STACK */}
                    {user.preferredTechStack?.length > 0 && (
                        <div className="bg-base-100 rounded-xl shadow p-6">
                            <h3 className="font-semibold mb-3">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {user.preferredTechStack.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 text-xs rounded-md bg-primary/10 text-primary"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
