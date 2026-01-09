import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const FeedProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/profile/${id}`,
        { withCredentials: true }
      );
      setUser(res.data.user);
    } catch (error) {
      console.log("Profile fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  /* ================= LOADING STATE ================= */
  if (loading) {
    return (
      <div className="mt-[100px] text-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  /* ================= NOT FOUND ================= */
  if (!user) {
    return (
      <p className="mt-[100px] text-center text-gray-400">
        User not found
      </p>
    );
  }

  return (
  <div
  className="flex justify-center items-center bg-base-200 px-4"
  style={{
    minHeight: "calc(100vh - 120px)",
    marginTop: "50px",
  }}
>
  <div className="w-full max-w-6xl">
    <div className="bg-base-100 rounded-[28px] shadow-xl overflow-hidden flex flex-col md:flex-row ">

      {/* ===== LEFT IMAGE PANEL ===== */}
      <div className="relative md:w-[45%] h-[320px] md:h-[520px]">
        <img
          src={user.photourl}
          alt={user.firstName}
          className="absolute inset-0 w-full h-full object-cover
            object-center   
          " 
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 to-transparent" />

        {/* name */}
        <div className="absolute bottom-4 left-4 text-white">
          <h2 className="text-2xl font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-sm opacity-80">
            {user.isOnline ? "🟢 Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* ===== RIGHT CONTENT ===== */}
      <div className="flex-1 p-6 md:p-8 flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Profile</h3>
            <p className="text-sm text-gray-500">User information</p>
          </div>

          <span className="px-3 py-1 rounded-full text-xs bg-base-200 text-gray-600">
            Active
          </span>
        </div>

        {/* About */}
        <section>
          <h4 className="text-xs uppercase tracking-wide text-gray-500 mb-1">
            About
          </h4>
          <p className="text-sm text-gray-400 leading-relaxed">
            {user.about || "This user hasn’t added a bio yet."}
          </p>
        </section>

        {/* Skills */}
        <section>
          <h4 className="text-xs uppercase tracking-wide text-gray-500 mb-2">
            Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(user.skills) && user.skills.length > 0 ? (
              user.skills
                .flatMap(s =>
                  s.split(",").map(skill => skill.trim()).filter(Boolean)
                )
                .map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg text-xs
                               bg-base-200 text-primary"
                  >
                    {skill}
                  </span>
                ))
            ) : (
              <span className="text-xs text-gray-500">
                No skills added
              </span>
            )}
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-base-300" />

        {/* Meta info */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
          <div>
            <p className="text-xs text-gray-500">Email</p>
            <p className="truncate">{user.email}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Joined</p>
            <p>{new Date(user.createdAt).toDateString()}</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>


  );
};

export default FeedProfile;
