import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestsSlice";

const RequestsPage = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const handleRequests = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/request/received",
        { withCredentials: true }
      );
      dispatch(addRequests(res.data.requests));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAction = async (requestId, status) => {
    try {
      await axios.post(
        BASE_URL + "/user/request/respond",
        { requestId, status },
        { withCredentials: true }
      );

      dispatch(
        addRequests(requests.filter((r) => r._id !== requestId))
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleRequests();
  }, []);

  if (!requests || requests.length === 0) {
    return (
      <div className="mt-[100px] text-center px-4">
        <h2 className="text-xl font-semibold">No Requests</h2>
        <p className="text-gray-400 mt-1">
          You don’t have any connection requests yet
        </p>
      </div>
    );
  }

  return (
    <div className="mt-[80px] px-4 bg-base-200 min-h-screen">
      <div className="max-w-6xl mx-auto py-2 cursor-pointer">
        {/* Header */}
        <h1 className="text-2xl font-semibold mb-6">
          Connection Requests
        </h1>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div
              key={req._id}
              className="
                bg-base-100
                border border-base-300
                rounded-2xl
                p-5
                shadow-sm
                hover:shadow-lg
                transition
                flex
                flex-col
                justify-between
              "
            >
              {/* User Info */}
              <div className="flex items-center gap-4">
                <img
                  src={req.fromUser.photourl || "/default-user.png"}
                  alt="user"
                  className="w-14 h-14 rounded-full object-cover border"
                />

                <div>
                  <h3 className="font-semibold leading-tight">
                    {req.fromUser.firstName}{" "}
                    {req.fromUser.lastName}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {req.fromUser.about || "No bio available"}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="divider my-4" />

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    handleAction(req._id, "accepted")
                  }
                  className="btn btn-success btn-sm flex-1"
                >
                  Accept
                </button>
                <button
                  onClick={() =>
                    handleAction(req._id, "rejected")
                  }
                  className="btn btn-outline btn-error btn-sm flex-1"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequestsPage;
