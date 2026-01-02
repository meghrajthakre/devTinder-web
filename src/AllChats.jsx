import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MessageCircleHeart } from "lucide-react";
import toast from "react-hot-toast";

import { BASE_URL } from "./utils/constant";
import { setChats } from "./utils/chatUsersSlice";
import { socket } from "./utils/socket";

const AllChats = () => {
  const users = useSelector((store) => store.connection);
  const currentUser = useSelector((store) => store.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* 🔍 Search state */
  const [search, setSearch] = useState("");

  /* 🔹 Format users */
  const formattedUsers = users.map((u) => ({
    id: u._id,
    name: `${u.firstName} ${u.lastName}`,
    avatar: u.photourl || "https://i.pravatar.cc/100",
  }));

  /* 🔹 Search filter */
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  /* 🔹 Open / Access chat */
  const handleChats = async (userId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/chat/access/${userId}`,
        {},
        { withCredentials: true }
      );

      dispatch(setChats(res.data));
      navigate(`/chat/access/${res.data._id}`);
    } catch (error) {
      console.error(
        "Chat access error:",
        error.response?.data || error.message
      );
    }
  };

  /* 🔔 SOCKET: New message notification */
  useEffect(() => {
    if (!currentUser?._id) return;

    const handleNotification = ({ chatId, message }) => {
      if (String(message.sender?._id) === String(currentUser._id)) return;

      toast.success(`${message.sender.firstName}: ${message.content}`, {
        icon: "💬",
        duration: 3000,
      });
    };

    socket.on("new-message-notification", handleNotification);

    return () => {
      socket.off("new-message-notification", handleNotification);
    };
  }, [currentUser?._id]);

  return (
    /* ❌ Desktop hide | ✅ Mobile only */
    <div className="md:hidden bg-base-100 mt-[62px] h-[calc(100vh-62px)] flex flex-col">

      {/* 🔹 Header */}
      <div className="sticky top-0 z-10 bg-base-100 border-b border-base-300 px-4 py-3">
        <div className="flex items-center gap-2 mb-2">
          <MessageCircleHeart className="text-primary" size={20} />
          <h2 className="text-base font-semibold">All Chats</h2>
        </div>

        {/* 🔍 Search Bar */}
        <input
          type="text"
          placeholder="Search chats..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full px-3 py-2 rounded-lg
            bg-base-200 text-sm
            focus:outline-none focus:ring-2 focus:ring-primary
          "
        />
      </div>

      {/* 🔹 Chat List */}
      <div className="flex-1 overflow-y-auto pb-20">
        {filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-base-content/60">
            <p className="font-medium">No chats found</p>
            <p className="text-sm">Try searching a different name 🔍</p>
          </div>
        ) : (
          filteredUsers.map((u) => (
            <button
              key={u.id}
              onClick={() => handleChats(u.id)}
              className="
                w-full flex items-center gap-3
                px-4 py-3
                hover:bg-base-200
                active:bg-base-300
                transition
                text-left
              "
            >
              {/* Avatar */}
              <img
                src={u.avatar}
                alt={u.name}
                className="w-11 h-11 rounded-full object-cover"
              />

              {/* Name */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{u.name}</p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default AllChats;
