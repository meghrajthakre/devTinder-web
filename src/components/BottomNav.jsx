import { NavLink } from "react-router-dom";
import {
  Sparkles,
  Users,
  HeartHandshake,
  MessageCircleHeart,
  UserCircle2,
} from "lucide-react";
import React from "react";

const BottomNav = () => {
  const iconProps = (isActive) => ({
    size: 26,
    strokeWidth: isActive ? 2.2 : 1.7,
    className: isActive
      ? "text-primary"
      : "text-base-content/40",
  });

  const itemClass = ({ isActive }) =>
    `flex flex-col items-center gap-1 transition-all duration-200
     ${isActive ? "scale-110" : "scale-100"}`;

  const labelClass = (isActive) =>
    `text-xs font-medium transition-colors
     ${isActive ? "text-primary" : "text-base-content/40"}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 
      bg-base-100 border-t border-base-300
      flex justify-around items-center z-50">

      <NavLink to="/feed" className={itemClass}>
        {({ isActive }) => (
          <>
            <Sparkles {...iconProps(isActive)} />
            <span className={labelClass(isActive)}>Discover</span>
          </>
        )}
      </NavLink>

      <NavLink to="/connections" className={itemClass}>
        {({ isActive }) => (
          <>
            <Users {...iconProps(isActive)} />
            <span className={labelClass(isActive)}>Connections</span>
          </>
        )}
      </NavLink>

      <NavLink to="/matches" className={itemClass}>
        {({ isActive }) => (
          <>
            <HeartHandshake {...iconProps(isActive)} />
            <span className={labelClass(isActive)}>Matches</span>
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
