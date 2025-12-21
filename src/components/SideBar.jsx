import axios from "axios";
import { Flame, Search } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const users = useSelector((store) => store.connection)
  const navigate = useNavigate()
  const formattedUsers = users.map((u) => ({
    id: u._id,
    name: `${u.firstName} ${u.lastName}`,
    msg: "New Match! Say Hello 👋", // temp / last message later
    active: false, // socket se later
    avatar: u.photourl,
  }));


  const handleChats = async (userId) => {
    try {
      // 1️⃣ hit chat create / fetch API
      const res = await axios.post(
        `/chat/${userId}`,
        {},
        // {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("token")}`,
        //   },
        // }
      );

      const chatId = res.data._id; // 🔥 most important

      // 2️⃣ open that chat
      navigate(`/chats/${chatId}`);
    } catch (error) {
      console.error("Chat create error", error);
    }
  };

  return (
    <aside
      className="hidden md:flex flex-col w-80 h-[calc(100vh-64px)] fixed left-0 top-16 bg-base-100 border-r border-base-300"
    >
      {/* Discover CTA – primary action */}
      <div className="p-4 border-b border-base-300">
        <button
          className="w-full flex items-center gap-3 p-3 rounded-2xl bg-primary/10 hover:bg-primary/20 transition"
        >
          <div className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
            <Flame size={18} />
          </div>
          <div className="text-left">
            <p className="font-semibold text-sm">Discover new matches</p>
            <p className="text-xs text-base-content/60">
              Start swiping developers
            </p>
          </div>
        </button>
      </div>

      {/* Search – discoverability */}
      <div className="p-4 border-b border-base-300">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50"
          />
          <input
            type="text"
            placeholder="Search matches"
            className="input input-bordered w-full pl-9 rounded-xl focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>

      {/* Chats – scannability & hierarchy */}
      <div className="flex-1 overflow-y-auto">
        {formattedUsers.map((u) => (
          <div
            key={u.id}
            onClick={() => handleChats(u.id)} // ✅ CLICK
            className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition rounded-xl mx-2 my-1 ${u.active ? "bg-primary/10" : "hover:bg-base-200"
              }`}
          >
            {/* Avatar */}
            <div className="relative">
              <img
                src={u.avatar}
                alt={u.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {u.active && (
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-primary border-2 border-base-100" />
              )}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{u.name}</p>
              <p className="text-xs text-base-content/60 truncate">{u.msg}</p>
            </div>
          </div>
        ))}
      </div>

    </aside>
  );
};

export default SideBar;
