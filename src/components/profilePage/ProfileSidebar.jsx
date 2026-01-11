import React from "react";
import ProfileSkills from "./ProfileSkills";
import {
  MapPin,
  Github,
  Linkedin,
  Link as LinkIcon,
  Edit3,
  Loader2,
  Camera,
  Briefcase,
} from "lucide-react";

const ProfileSidebar = ({
  user,
  photo,
  uploading,
  fileRef,
  navigate,
  handlePhotoChange,
}) => {
  const location =
    user.location?.city || user.location?.country
      ? `${user.location?.city || ""}${user.location?.city && user.location?.country ? ", " : ""
      }${user.location?.country || ""}`
      : "India";

  return (
    <div className="bg-base-100 rounded-xl border border-base-300 shadow-sm p-5 space-y-5 max-h-[520px] overflow-y-auto scrollbar-thin scrollbar-thumb-base-300">

      {/* Avatar + Name + Edit Icon */}
      <div className="flex items-center gap-4 justify-between">
        <div className="flex items-center gap-4">
          <div
            onClick={() => !uploading && fileRef.current.click()}
            className="relative w-20 h-20 rounded-full overflow-hidden border border-base-300 cursor-pointer group"
          >
            <img src={photo} className="w-full h-full object-cover" />

            {!uploading && (
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
                <Camera size={18} />
              </div>
            )}

            {uploading && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs">
                <Loader2 className="animate-spin mr-1" /> Uploading
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <h2 className="font-semibold text-lg leading-tight text-primary flex items-center gap-2">
              {user.firstName} {user.lastName}


              {/* Inline Edit Icon with Tooltip */}
              <button
                onClick={() => navigate("/profileEdit")}
                className="p-1 cursor-pointer rounded hover:bg-base-200 transition relative group"
              >
                <Edit3
                  size={18}
                  className="text-primary/80 hover:text-primary transition"
                />
                {/* Tooltip */}
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded bg-black text-white opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">
                  Edit Profile
                </span>
              </button>

            </h2>
            <p className="text-xs text-primary/70 tracking-wide uppercase">
              {user.currentRole || "Software Developer"}
            </p>
          </div>
        </div>
      </div>

      {/* Meta Info */}
      <div className="space-y-2 text-sm opacity-80">
        <div className="flex items-center gap-2">
          <MapPin size={14} />
          <span>{location}</span>
        </div>

        <div className="flex items-center gap-2">
          <Briefcase size={14} />
          <span>{user.experienceLevel || "Experience not specified"}</span>
        </div>
      </div>

      {/* About */}
      <div className="bg-base-200 rounded-lg p-3 text-sm leading-relaxed">
        {user.about ||
          "Focused on improving problem-solving skills and building scalable applications."}
      </div>

      {/* Tech Stack */}
      {user.preferredTechStack?.length > 0 && (
        <div>
          <p className="text-xs font-semibold mb-2 text-primary tracking-wide">
            Tech Stack
          </p>

          <div className="flex flex-wrap gap-2">
            {user.preferredTechStack.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs font-semibold rounded-full 
                           bg-base-200 text-primary 
                           border border-base-300
                           hover:bg-primary hover:text-white
                           hover:border-primary
                           transition"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      <ProfileSkills user={user} />

      {/* Links */}
      <div className="space-y-2 pt-2 border-t border-base-300">
        {user.githubProfileUrl && (
          <a
            href={user.githubProfileUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100"
          >
            <Github size={16} /> GitHub
          </a>
        )}
        {user.linkedinProfileUrl && (
          <a
            href={user.linkedinProfileUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100"
          >
            <Linkedin size={16} /> LinkedIn
          </a>
        )}
        {user.portfolioUrl && (
          <a
            href={user.portfolioUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100"
          >
            <LinkIcon size={16} /> Portfolio
          </a>
        )}
      </div>
    </div>
  );
};

export default ProfileSidebar;
