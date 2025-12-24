import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "./utils/constant";
import { setChats } from "./utils/chatUsersSlice";
import { MessageCircleHeart } from "lucide-react";

const AllChats = () => {
  const users = useSelector((store) => store.connection);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formattedUsers = users.map((u) => ({
    id: u._id,
    name: `${u.firstName} ${u.lastName}`,
    msg: "New Match! Say Hello 👋",
    avatar: u.photourl,
  }));

  const handleChats = async (userId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/chat/access/${userId}`,
        {},
        { withCredentials: true }
      );

      dispatch(setChats(res.data));
      navigate(`/chat/${res.data._id}`);
    } catch (error) {
      console.error(
        "Chat access error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    /* ❌ Desktop hide | ✅ Mobile only */
    <div className="md:hidden h-screen bg-base-100 mt-[62px]">
      
      {/* 🔹 Header */}
      <div className="sticky top-0 z-10 bg-base-100 border-b border-base-300 px-4 py-3 flex items-center gap-2">
        <MessageCircleHeart className="text-primary" size={20} />
        <h2 className="text-base font-semibold">All Chats</h2>
      </div>

      {/* 🔹 Chat List */}
      <div className="overflow-y-auto pb-20">
        {formattedUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center text-base-content/60">
            <p className="font-medium">No chats yet</p>
            <p className="text-sm">Start matching to begin chatting 💬</p>
          </div>
        ) : (
          formattedUsers.map((u) => (
            <button
              key={u.id}
              onClick={() => handleChats(u.id)}
              className="
                w-full flex items-center gap-3
                px-4 py-3
                active:bg-base-200
                transition
                text-left
              "
            >
              <img
                src={u.avatar}
                alt={u.name}
                className="w-11 h-11 rounded-full object-cover"
              />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{u.name}</p>
                <p className="text-xs text-base-content/60 truncate">
                  {u.msg}
                </p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default AllChats;
