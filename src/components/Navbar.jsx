import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate()
  const [theme, setTheme] = useState("light");
  const [openDropdown, setOpenDropdown] = useState(false);
  const data = useSelector((state) => state.user);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const avatar = data?.data?.photourl
    ? data.data.photourl
    : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

  return (
    <div className="navbar bg-base-200/60 shadow-sm px-6 sticky top-0 z-50">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <span className="text-xl font-semibold tracking-wide">DevTinder</span>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 ml-auto relative">

        {/* THEME BUTTON */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-base-300 hover:bg-base-100 transition-all duration-200 shadow-sm"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* USER INFO + AVATAR */}
        {data && (
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setOpenDropdown(!openDropdown)}>
            <p className="font-semibold">
              Welcome {`${data?.data?.firstName || ""} ${data?.data?.lastName || ""}`.trim() || "Guest User"}
            </p>
            <img
              className="w-10 h-10 rounded-full ring-2 ring-primary/30"
              alt="User Avatar"
              src={avatar}
            />
          </div>
        )}

        {/* DROPDOWN */}
        {data && openDropdown && (
          <div className="absolute top-12 right-0 mt-2 w-48 bg-base-100 shadow-lg rounded-xl p-3 z-50">
            <p className="font-semibold">
              {`${data?.data?.firstName || ""} ${data?.data?.lastName || ""}`.trim() || "Guest User"}
            </p>
            <p className="text-xs text-base-content/60 mb-2">
              {data?.data?.email || "No Email"}
            </p>

            <hr className="my-2" />

            <ul className="flex flex-col gap-2 text-sm">
              <li
                className="hover:bg-base-200 p-2 rounded-lg cursor-pointer"
                onClick={() => navigate("/settings")}
              >
                Settings
              </li>
              <a
              href='/login'
                className="hover:bg-base-200 p-2 rounded-lg cursor-pointer"
              >
                Logout
              </a>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
