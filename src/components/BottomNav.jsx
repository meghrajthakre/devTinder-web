import { NavLink } from "react-router-dom";
import {
  Sparkles,
  Users,
  HeartHandshake,
  MessageCircleHeart,
  UserCircle2,
} from "lucide-react";
import React from "react";
import SideBar from '../components/SideBar';

const BottomNav = () => {

  const itemClass = ({ isActive }) =>
    `flex flex-col items-center justify-center gap-1
     px-3 py-2 rounded-2xl
     transition-all duration-200
     ${isActive
      ? " text-primary scale-110"
      : "text-base-content/60 hover:bg-base-200"}`

  const iconProps = (isActive) => ({
    size: 22,
    strokeWidth: isActive ? 2.2 : 1.8,
    className: isActive ? "text-primary" : "text-base-content/60",
  });

  const labelClass = (isActive) =>
    `text-[11px]
     ${isActive ? "font-semibold text-primary" : "font-medium text-base-content/60"}`;

  return (
    <div className="
      fixed bottom-0 left-0 right-0 h-16
      bg-base-100/80 backdrop-blur
      border-t border-base-300
      flex justify-around items-center
      z-50
    ">

      <NavLink to="/feed" className={itemClass}>
        {({ isActive }) => (
          <>
            <Sparkles {...iconProps(isActive)} />
            <span className={labelClass(isActive)}>Discover</span>
          </>
        )}
      </NavLink>
      
      <NavLink to="/chats" className={itemClass}>
        {({ isActive }) => (
          <>
            <MessageCircleHeart {...iconProps(isActive)} />
            <span className={labelClass(isActive)}>Chats</span>
          </>
        )}
      </NavLink>

      <NavLink to="/Requests" className={itemClass}>
        {({ isActive }) => (
          <>
            <Users {...iconProps(isActive)} />
            <span className={labelClass(isActive)}>Requests</span>
          </>
        )}
      </NavLink>

      {/* CENTER EMPHASIS */}
      <NavLink to="/connections" className={itemClass}>
        {({ isActive }) => (
          <>
            <HeartHandshake
              {...iconProps(isActive)}

            />
            <span className={labelClass(isActive)}>Matches</span>
          </>
        )}
      </NavLink>



      <NavLink to="/profile" className={itemClass}>
        {({ isActive }) => (
          <>
            <UserCircle2 {...iconProps(isActive)} />
            <span className={labelClass(isActive)}>Me</span>
          </>
        )}
      </NavLink>

    </div>
  );
};

export default BottomNav;
