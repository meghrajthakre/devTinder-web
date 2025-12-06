import { Flame, Search } from "lucide-react";
import React from "react";
const users = [
  { name: "Kevin", msg: "New Match! Say Hello 👋", active: true },
  { name: "Jared", msg: "New Match! Say Hello 👋" },
  { name: "David", msg: "You have the cutest smile..." },
  { name: "Hank", msg: "What are you up to this weekend?" },
  { name: "Romel", msg: "Flying to Italy tonight..." },
];

const SideBar = () => {
  return (
    <aside
      className="
        hidden md:flex flex-col
        w-80 h-screen
        bg-base-100
        fixed left-0 top-0 mt-16
        
        z-40 bg-gradient-to-r from-base-300/80 via-base-200/60 to-base-300/80
      "
    >
      {/* TOP BAR */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h2 className="font-semibold">My Profile</h2>
        <Search size={18} className="opacity-60" />
      </div>

      {/* DISCOVER */}
      <div className="px-4 py-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-content">
            <Flame size={18} />
          </div>
          <div>
            <p className="font-medium">Discover New Matches</p>
            <p className="text-xs opacity-60">
              Start swiping to connect
            </p>
          </div>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto">
        {users.map((u, i) => (
          <div
            key={i}
            className={`
              flex items-center gap-3 px-4 py-3 cursor-pointer
              hover:bg-base-300
              ${u.active ? "bg-base-200" : ""}
            `}
          >
            <div className="w-10 h-10 rounded-full bg-base-300" />
            <div className="flex-1">
              <p className="text-sm font-medium">{u.name}</p>
              <p className="text-xs opacity-60 truncate">
                {u.msg}
              </p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SideBar;
