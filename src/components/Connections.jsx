import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setConnection } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const handleConnections = async () => {
    try {
      const res = await axios(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(setConnection(res.data.request || []));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleConnections();
  }, []);

  if (connections.length === 0) {
    return (
      <p className="text-center text-primary mt-[70px]">
        You don’t have any connections yet
      </p>
    );
  }

  return (
    <div className="mt-[70px] min-h-screen px-4">
      <h2 className="text-2xl font-semibold mb-6">Your Connections</h2>

      {/* tighter grid */}
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(260px,1fr))] pb-30 md:pb-0">
        {connections.map((user) => {
          const {
            _id,
            firstName,
            lastName,
            photoUrl,
            about,
            location,
            headline,
          } = user;

          return (
            <div
              key={_id}
              className="card bg-base-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="card-body p-4 text-center">
                {/* Avatar */}
                <div className="avatar mx-auto mb-3">
                  <div className="w-20 rounded-full ring ring-primary/30 ring-offset-base-100 ring-offset-2">
                    <img
                      src={photoUrl || `https://i.pravatar.cc/150?u=${_id}`}
                      alt={firstName}
                    />
                  </div>
                </div>

                {/* Name */}
                <h3 className="font-semibold text-base leading-tight">
                  {firstName} {lastName}
                </h3>

                {/* Headline */}
                {headline && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                    {headline}
                  </p>
                )}

                {/* About */}
                {about && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {about}
                  </p>
                )}

                {/* Location */}
                {location && (
                  <p className="text-xs text-gray-400 mt-1">
                    📍 {location}
                  </p>
                )}

                {/* Actions */}
                <div className="card-actions justify-center gap-2 mt-4">
                  <button className="btn btn-sm btn-primary btn-outline">
                    Profile
                  </button>
                  <button className="btn btn-sm btn-ghost text-error">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
