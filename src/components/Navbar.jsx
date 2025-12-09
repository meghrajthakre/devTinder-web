import React, { useState, useEffect, useRef } from "react";
import { Sun, Moon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/userSlice";
import { removeFeed } from "../utils/feedSlice";
import Theme from "./theme/Theme";
import { MapPin } from "lucide-react";


const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLocationLogin = location.pathname === '/login';

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const logOutUser = async () => {
    try {
      await axios.post(BASE_URL + "/logout", { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeed());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const avatar = user?.photourl
    ? user.photourl
    : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

  return (
    <div className="navbar bg-base-100 border-b border-base-300 px-4">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        <img
          src="src/assets/Logo/logo.png"
          className="w-10 h-10"
          alt="DevTinder Logo"
        />
      </div>

      {/* CENTER */}
      <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
        <Link to="/profile">
          <div className="flex flex-col items-center md:flex-row md:gap-2 leading-tight">

            {/* Brand */}
            <span
              className="text-[18px] font-semibold text-primary tracking-wide"
              style={{ fontFamily: "var(--font-brand)" }}
            >
              DevTinder
            </span>

            {/* Location */}
            <span className="flex items-center gap-1 text-xs md:text-sm text-base-content/60">
              <MapPin size={14} />
              India
            </span>
          </div>
        </Link>
      </div>

      {/* RIGHT */}
      <div className="ml-auto flex items-center gap-3 relative">

        {!isLocationLogin && <Theme />}

        {user && (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setOpenDropdown(!openDropdown)}
          >
            <p className="hidden md:block text-sm text-base-content/70">
              Hi, {user?.firstName || "Guest"}
            </p>

            <img
              className="w-9 h-9   
              transition-all duration-300 ease-in-out
              hover:scale-105
              hover:ring-2 hover:ring-primary rounded-full ring-2 ring-primary/30"
              src={avatar}
              alt="avatar"
            />
          </div>
        )}

        {user && openDropdown && (
          <div
            ref={dropdownRef}
            className="absolute top-12 right-0 w-52 bg-base-100 rounded-xl shadow-lg p-3 z-50"
          >
            <p className="font-medium">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-base-content/60 mb-2">
              {user?.email}
            </p>

            <hr className="my-2" />

            <ul className="space-y-1">
              <li
                className="px-3 py-2 rounded-lg hover:bg-base-200 cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                Profile
              </li>
              <li
                className="px-3 py-2 rounded-lg hover:bg-base-200 cursor-pointer text-error"
                onClick={logOutUser}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>

  );
};

export default Navbar;
