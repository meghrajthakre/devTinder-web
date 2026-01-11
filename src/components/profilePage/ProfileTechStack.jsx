import React from "react";

const ProfileTechStack = ({ user }) => {
  const stack = user.preferredTechStack?.length
    ? user.preferredTechStack
    : ["HTML", "CSS", "JavaScript"];

  return (
    <div className="bg-base-100 p-6 rounded-xl">
      <h3>Tech Stack</h3>
      <div className="flex gap-2 flex-wrap">
        {stack.map((t, i) => (
          <span key={i} className="px-3 py-1 bg-primary/10 rounded">{t}</span>
        ))}
      </div>
    </div>
  );
};

export default ProfileTechStack;
