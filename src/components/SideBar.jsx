import React, { useState } from "react";
import { User, Users, MessageCircle, HeartHandshake, Settings, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  // Navbar height = 64px
  const NAVBAR_HEIGHT = 64;
  const FOOTER_HEIGHT = 56; // adjust if your footer is different

  return (
    <>
      {/* MOBILE TOGGLE BUTTON */}
      <button
        className="md:hidden btn btn-ghost absolute top-3 left-3 z-50"
        onClick={() => setOpen(!open)}
      >
        <Menu size={22} />
      </button>

      {/* SIDEBAR */}
      <div
        className={`
          fixed left-0 w-64 bg-base-300 border-r border-base-300 shadow-xl
          transition-transform duration-300 z-40 flex flex-col
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        style={{
          top: NAVBAR_HEIGHT,                             // BELOW NAVBAR
          height: `calc(100vh - ${NAVBAR_HEIGHT + FOOTER_HEIGHT}px)` // ABOVE FOOTER
        }}
      >
        {/* MENU ITEMS */}
        <ul className="menu p-4 flex flex-col gap-4 text-base-content">
          <li>
            <Link to="/profile">
              <User size={20} />
              Profile
            </Link>
          </li>

          <li>
            <Link to="/friends">
              <Users size={20} />
              Friends
            </Link>
          </li>

          <li>
            <Link to="/chats">
              <MessageCircle size={20} />
              Chats
            </Link>
          </li>
          <li>
            <Link to="/feed">
              <MessageCircle size={20} />
              Feed
            </Link>
          </li>

          <li>
            <Link to="/requests">
              <HeartHandshake size={20} />
              Requests
            </Link>
          </li>

          <li>
            <Link to="/settings">
              <Settings size={20} />
              Settings
            </Link>
          </li>
        </ul>
      </div>

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
