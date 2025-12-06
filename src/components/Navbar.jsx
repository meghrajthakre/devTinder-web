import React, { useState, useEffect, useRef } from "react";
import { Sun, Moon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/userSlice";
import { removeFeed } from "../utils/feedSlice";
import Theme from "./theme/Theme";

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
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
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
    <div className="navbar bg-base-100  px-4 sticky top-0 z-50">

    {/* LEFT — Logo (always left) */}
<div className="flex items-center gap-2">
  <img
    src="src/assets/Logo/logo.png"
    className="w-12 h-12"
    alt="DevTinder Logo"
  />
</div>

{/* CENTER — DevTinder text (mobile only) */}
<div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:ml-2">
  <Link
    to="/profile"
    className="text-xl font-semibold tracking-wide"
  >
    DevTinder
  </Link>
</div>



      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4 ml-auto relative">

        {/* THEME TOGGLE */}
        {!isLocationLogin && <Theme />}

        {/* USER DETAILS */}
        {user && (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setOpenDropdown(!openDropdown)}
          >
            {/* Name hidden on mobile */}
            <p className="font-semibold hidden md:block">
              welcome {user?.firstName || "Guest"}
            </p>

            <img
              className="hidden md:block w-10 h-10 rounded-full ring-2 ring-primary/30"
              alt="User Avatar"
              src={avatar}
            />
          </div>
        )}

        {/* DROPDOWN */}
        {user && openDropdown && (
          <div
            ref={dropdownRef}
            className="absolute bg-base-100 top-12 right-0 mt-2 w-48 shadow-lg rounded-xl p-3 z-50"
          >
            <p className="font-semibold">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-base-content/60 mb-2">{user?.email}</p>

            <hr className="my-2" />

            <ul className="flex flex-col gap-2 text-sm font-medium">
              <li
                className="hover:bg-base-200 p-2 rounded-lg cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                Profile
              </li>

              <li
                className="hover:bg-base-200 p-2 rounded-lg cursor-pointer"
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
