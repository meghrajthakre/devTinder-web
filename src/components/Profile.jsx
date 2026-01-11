import React, { useState, useRef, useEffect, use } from "react";
import {
  MapPin,
  Github,
  Linkedin,
  Link as LinkIcon,
  Edit3,
  Loader2,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { addUser } from "../utils/userSlice";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState("/avatar.png");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.photourl) {
      setPhoto(user.photourl);
    }
  }, [user]);

  if (!user) return <p className="text-center mt-20">Loading...</p>;

  // ================= SAFE FALLBACKS =================
  const firstName = user.firstName || "Developer";
  const lastName = user.lastName || "";
  const currentRole = user.currentRole || "Software Developer";
  const about =
    user.about ||
    "Focused on improving problem-solving skills and building scalable applications.";

  const skills =
    Array.isArray(user.skills) && user.skills.length > 0
      ? user.skills
      : ["JavaScript", "React"];

  const preferredTechStack =
    Array.isArray(user.preferredTechStack) && user.preferredTechStack.length > 0
      ? user.preferredTechStack
      : ["HTML", "CSS", "JavaScript"];

  const photos =
    user.photos && user.photos.length > 0
      ? user.photos
      : user.photourl
        ? [user.photourl]
        : ["https://via.placeholder.com/150"];

  const locationText =
    user.location?.city || user.location?.country
      ? `${user.location?.city || ""}${user.location?.city && user.location?.country ? ", " : ""
      }${user.location?.country || ""}`
      : "India";

  // ================= HANDLER =================
  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      toast.error("Only JPG and PNG files are allowed");
      return;
    }

    setUploading(true);
    const form = new FormData();
    form.append("photo", file);

    try {
      const res = await fetch(
        "http://localhost:3001/profile/profilePicture",
        {
          method: "POST",
          credentials: "include",
          body: form,
        }
      );

      const data = await res.json();
      if (!data.success) throw new Error("Upload failed");

      const cloudinaryUrl = data.photourl;
      setPhoto(cloudinaryUrl);
      dispatch(addUser({ ...user, photourl: cloudinaryUrl }));
      toast.success("Profile photo updated");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };



  // ================= UI =================   

  return (
    <div className="min-h-screen bg-base-200 mt-[72px] py-6 pb-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT SIDEBAR */}
        <div className="bg-base-100 rounded-xl shadow p-6 space-y-4 h-fit">
          <div className="flex items-center gap-4">
            <div className="avatar">
              <div className="w-28 h-28 mx-auto p-2 relative">
                <div
                  className="w-full h-full rounded-full ring-primary/30 ring-1 shadow-md cursor-pointer overflow-hidden group relative"
                  onClick={() => !uploading && fileRef.current.click()}
                >
                  <img
                    src={photo || "/avatar.png"}
                    alt="profile"
                    className="w-full h-full rounded-full object-cover object-center p-1"
                  />

                  {/* Overlay on hover */}
                  {!uploading && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition">
                      Change
                    </div>
                  )}

                  {/* Spinner overlay */}
                  {uploading && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm">
                      <Loader2 className="animate-spin mr-2" size={18} /> Uploading
                    </div>
                  )}
                </div>

                <input
                  ref={fileRef}
                  type="file"
                  hidden
                  accept="image/png, image/jpeg"
                  onChange={handlePhotoChange}
                />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-primary">
                {firstName} {lastName}
              </h2>
              <p className="text-sm opacity-70">{currentRole}</p>
            </div>
          </div>

          <div className="text-sm space-y-1 opacity-80">
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              {locationText}
            </div>

            <div className="mt-2">
              <h3 className="font-semibold mb-2 text-primary">Experience</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                {user.experienceLevel || "Not specified"}
              </p>
            </div>

            <div className="mt-2">
              <h3 className="font-semibold mb-2 text-primary">About</h3>
              <p className="text-sm opacity-80 leading-relaxed">{about}</p>
            </div>
          </div>

          <button
            onClick={() => navigate("/profileEdit")}
            className="btn btn-outline btn-sm w-full gap-2"
          >
            <Edit3 size={14} /> Edit Profile
          </button>

          {/* LINKS */}
          <div className="pt-2 space-y-2 text-primary">
            {user.githubProfileUrl?.trim() && (
              <a
                href={user.githubProfileUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm hover:underline"
              >
                <Github size={16} /> GitHub
              </a>
            )}
            {user.linkedinProfileUrl?.trim() && (
              <a
                href={user.linkedinProfileUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm hover:underline"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            )}
            {user.portfolioUrl?.trim() && (
              <a
                href={user.portfolioUrl}
                target="_blank"
                rel="noreferrer"
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
            <h3 className="font-semibold text-primary mb-3">Photos</h3>
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
          <div className="bg-base-100 rounded-xl shadow p-6">
            <h3 className="font-semibold text-primary mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-md bg-base-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* TECH STACK */}
          <div className="bg-base-100 rounded-xl shadow p-6">
            <h3 className="font-semibold mb-3 text-primary">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {preferredTechStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-md bg-primary/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
