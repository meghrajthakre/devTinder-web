
import React from "react";

import { Code2 } from "lucide-react";

const ProfileSkills = ({ user }) => {
  const skills =
    Array.isArray(user.skills) && user.skills.length > 0
      ? user.skills
      : ["JavaScript", "React"];

  return (
    <div className="bg-base-100 border border-base-300 rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Skills</h3>
        <span className="text-xs opacity-60 flex items-center gap-1">
          <Code2 size={14} />
          {skills.length} skills
        </span>
      </div>

      {/* Skill Tags */}
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="px-3 py-1 text-xs font-medium rounded-full 
                       bg-primary/10 text-primary 
                       hover:bg-primary hover:text-gray-600 
                       transition cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProfileSkills;

