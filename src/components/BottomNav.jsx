import { NavLink } from "react-router-dom";
import { Layers, HeartHandshake, MessageCircle, User } from "lucide-react";
import React from "react";

const BottomNav = () => {
    const iconProps = (isActive) => ({
        size: 28,
        strokeWidth: 1.5,
        className: isActive
            ? "fill-base-content stroke-base-content"
            : "fill-base-content/40  stroke-base-content/40",
    });

    const itemClass = ({ isActive }) =>
        `tooltip tooltip-top transition-all
     ${isActive ? "scale-110" : "scale-100"}`;

    return (
        <div className="fixed bottom-0 left-0 right-0 h-16 
        bg-transparent
      flex justify-around items-center z-50 desktop-nav-center">

            <NavLink
                to="/feed"
                className={itemClass}
                data-tip="Feed"
            >
                {({ isActive }) => <Layers {...iconProps(isActive)} />}
            </NavLink>

            <NavLink
                to="/requests"
                className={itemClass}
                data-tip="Requests"
            >
                {({ isActive }) => <HeartHandshake {...iconProps(isActive)} />}
            </NavLink>

            <NavLink
                to="/chats"
                className={itemClass}
                data-tip="Chats"
            >
                {({ isActive }) => <MessageCircle {...iconProps(isActive)} />}
            </NavLink>

            <NavLink
                to="/profile"
                className={itemClass}
                data-tip="Profile"
            >
                {({ isActive }) => <User {...iconProps(isActive)} />}
            </NavLink>
        </div>
    );
};

export default BottomNav;
