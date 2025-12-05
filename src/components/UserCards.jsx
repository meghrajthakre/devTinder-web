import React from "react";

const UserCards = ({ feed }) => {
  if (!feed || feed.length === 0) {
    return <p className="text-center mt-10">Loading feed...</p>;
  }

  const user = feed[7];

  return (
    <div className="flex justify-center px-3 mt-5">
      <div className="card bg-base-200 w-full max-w-sm shadow-xl rounded-xl border border-base-300">

        {/* PROFILE IMAGE */}
        <figure className="h-56 w-full overflow-hidden bg-base-300">
          <img
            className="object-cover object-center w-full h-full"
            src={
              user.photourl ||
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            }
            alt="profile"
          />
        </figure>

        {/* BODY */}
        <div className="card-body p-4">

          {/* NAME + AGE */}
          <h2 className="text-xl flex justify-between font-semibold text-base-content">
            {user.firstName} {user.lastName}
            <div className="text-sm text-base-content/60">
              <p>Age: {user.age}</p>
            </div>
          </h2>

          {/* ABOUT */}
          <p className="mt-3 text-base-content/70 p-3 rounded-lg text-sm bg-base-300">
            {user.about || "No bio added yet."}
          </p>

          {/* SKILLS */}
          <div className="mt-3">
            <h3 className="font-medium text-sm mb-2 text-base-content/80">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.skills?.map((skill, i) => (
                <span
                  key={i}
                  className="badge border-base-300 text-xs px-3 py-2 text-base-content/80"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <button className="btn btn-outline btn-error rounded-full">
              Ignore
            </button>

            <button className="btn btn-primary rounded-full">
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCards;
