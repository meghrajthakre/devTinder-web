import React, { useState, useEffect, useRef } from "react";
import { Sun, Moon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/userSlice";
import { removeFeed } from "../utils/feedSlice";

const Navbar = () => {
  const [theme, setTheme] = useState("dark");
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logOutUser = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });

      dispatch(removeUser()); 
      dispatch(removeFeed())  // 🔥 Redux clear
      return navigate('/login')
    } catch (error) {
      console.log(error);
    }
  };


  const avatar = user?.photourl
    ? user.photourl
    : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

  return (
    <div className="navbar bg-base-300 shadow-sm px-6 sticky top-0 z-50">
      {/* LEFT */}
      <Link to='/profile' className="flex items-center gap-3">
        <span className="text-xl font-semibold tracking-wide">DevTinder</span>
      </Link>

      {/* RIGHT */}
      <div className="flex items-center gap-4 ml-auto relative">

        {/* THEME BUTTON */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl cursor-pointer bg-base-300 hover:bg-base-100 transition-all duration-200 shadow-sm"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* USER INFO + AVATAR */}
        {user && (
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setOpenDropdown(!openDropdown)}>
            Welcome <p className="font-semibold">
              {`${user?.firstName || ""}`.trim() || "Guest User"}
            </p>
            <img
              className="w-10 h-10 rounded-full ring-2 ring-primary/30"
              alt="User Avatar"
              src={avatar}
            />
          </div>
        )}

        {/* DROPDOWN */}
        {user && openDropdown && (
          <div
            ref={dropdownRef}
            className="absolute top-12 right-0 mt-2 w-48 bg-base-300 shadow-lg rounded-xl p-3 z-50"
          >
            <p className="font-semibold">
              {`${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Guest User"}
            </p>
            <p className="text-xs text-base-content/60 mb-2">
              {user?.email || "No Email"}
            </p>

            <hr className="my-2" />

            <ul className="flex flex-col gap-2 text-sm">
              <li
                className="hover:bg-base-200 p-2 rounded-lg cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                Profile
              </li>
              <Link
                className="hover:bg-base-200 p-2 rounded-lg cursor-pointer"
                onClick={logOutUser}
              >
                Logout
              </Link>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
