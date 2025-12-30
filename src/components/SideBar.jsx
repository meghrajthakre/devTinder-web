import axios from "axios";
import { Flame, Search } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { setChats } from "../utils/chatUsersSlice";

const SideBar = () => {
  const users = useSelector((store) => store.connection);
  const navigate = useNavigate();
  const disptach = useDispatch();

  const formattedUsers = users.map((u) => ({
    id: u._id,
    name: `${u.firstName} ${u.lastName}`,
    active: false,
    avatar: u.photourl,
  }));

  const handleChats = async (userId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/chat/access/${userId}`,
        {},
        { withCredentials: true } 
      );
    
      disptach( 
       setChats(res.data)
      )
      navigate(`/chat/access/${res.data._id}`);
    } catch (error) {
      console.error("Chat access error:", error.response?.data || error.message);
    }
  };

  return (
    <aside className="hidden md:flex flex-col w-80 h-[calc(100vh-120px)] fixed left-0 top-16 bg-base-100 border-r border-base-300">
      {/* Discover */}
      <div className="p-4 border-b border-base-300">
        <button className="w-full flex items-center gap-3 p-3 rounded-2xl bg-primary/10 hover:bg-primary/20 transition">
          <div className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
            <Flame size={18} />
          </div>
          <div>
            <p className="font-semibold text-sm">Discover new matches</p>
            <p className="text-xs text-base-content/60">
              Start swiping developers
            </p>
          </div>
        </button>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-base-300">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50"
          />
          <input
            type="text"
            placeholder="Search matches"
            className="input input-bordered w-full pl-9 rounded-xl"
          />
        </div>
      </div>

      {/* Chats */}
      <div className="flex-1 overflow-y-auto">
        {formattedUsers.map((u) => (
          <div
            key={u.id}
            onClick={() => handleChats(u.id)}
            className="flex items-center gap-3 px-4 py-3 cursor-pointer transition rounded-xl mx-2 my-1 hover:bg-base-200"
          >
            <img
              src={u.avatar}
              alt={u.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{u.name}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SideBar;
