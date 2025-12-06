import React from "react";

const UserCards = ({ feed }) => {
  if (!feed || feed.length === 0) {
    return <p className="text-center mt-10">Loading feed...</p>;
  }

  const user = feed[1];

  return (
    <div className="flex justify-center items-center px-6 mt-10">
      <div className="relative card bg-base-100 w-full max-w-sm 
    shadow-2xl rounded-3xl border border-base-200">

        {/* IMAGE */}
        <figure className="px-4 pt-4">
          <div className="overflow-hidden rounded-2xl h-64 w-full">
            <img
              src={
                user.photourl ||
                "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              }
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
        </figure>

        {/* CONTENT */}
        <div className="card-body p-5 text-center">

          {/* NAME */}
          <h2 className="text-lg font-semibold text-base-content">
            {user.firstName} {user.lastName},{" "}
            <span className="text-base-content/60">{user.age}</span>
          </h2>

          {/* ABOUT */}
          <p className="text-sm text-base-content/70 mt-2 px-2">
            {user.about || "No bio added yet."}
          </p>

          {/* SKILLS */}
          <div className="flex justify-center flex-wrap gap-2 mt-3">
            {user.skills?.map((skill, i) => (
              <span
                key={i}
                className="badge badge-outline badge-sm text-base-content/70"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-between items-center mt-5 px-6">
            <button className="btn btn-circle btn-outline btn-error">
              ✕
            </button>

            <button className="btn btn-circle btn-primary shadow-lg">
              ❤
            </button>

            <button className="btn btn-circle btn-outline btn-secondary">
              ★
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default UserCards;
