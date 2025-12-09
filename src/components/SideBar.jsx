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
        w-80 h-[calc(100vh-64px)]
        bg-base-100
        fixed left-0 top-16
        border-r border-base-300
      "
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-4 border-b">
        <div>
          <h2 className="font-semibold leading-none">
            Messages
          </h2>
          <p className="text-xs text-base-content/60">
            Matches & chats
          </p>
        </div>

        <button
          className="
            p-2 rounded-lg 
            hover:bg-base-200 
            transition
          "
        >
          <Search size={18} className="opacity-70" />
        </button>
      </div>

      {/* DISCOVER CTA */}
      <div className="px-4 py-4 border-b">
        <div
          className="
            flex items-center gap-3 
            p-3 rounded-xl 
            bg-primary/10 
            cursor-pointer
            hover:bg-primary/20
            transition
          "
        >
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-content">
            <Flame size={18} />
          </div>

          <div>
            <p className="font-medium text-sm">
              Discover new matches
            </p>
            <p className="text-xs text-base-content/60">
              Start swiping developers
            </p>
          </div>
        </div>
      </div>

      {/* CHAT LIST */}
      <div className="flex-1 overflow-y-auto">
        {users.map((u, i) => (
          <div
            key={i}
            className={`
              flex items-center gap-3 
              px-4 py-3 cursor-pointer
              transition
              ${
                u.active
                  ? "bg-base-200"
                  : "hover:bg-base-200"
              }
            `}
          >
            {/* Avatar */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-base-300" />
              {u.active && (
                <span className="
                  absolute bottom-0 right-0
                  w-3 h-3 rounded-full
                  bg-primary border-2 border-base-100
                " />
              )}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {u.name}
              </p>
              <p className="text-xs text-base-content/60 truncate">
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
