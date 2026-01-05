import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  User,
  CheckCircle,
  MapPin,
} from "lucide-react";

/* Stack */
const Stack = styled.div`
  position: relative;
  width: 340px;
  height: 520px;
`;

/* Card */
const Card = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background: black;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
`;

const SwipeStack = ({ feed, onSwipe }) => {
  return (
    <Stack>
      {feed.slice(0, 3).map((user, index) => (
        <Card
          key={user._id}
          drag={index === 0 ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.8}
          whileTap={{ scale: 1.03 }}
          onDragEnd={(e, info) => {
            if (info.offset.x > 120) onSwipe(user, "ignored");
            else if (info.offset.x < -120) onSwipe(user, "interested");
          }}
          initial={{ scale: 1 - index * 0.05, y: index * 10 }}
          animate={{ scale: 1 - index * 0.05, y: index * 10 }}
          style={{ zIndex: feed.length - index }}
        >
          {/* Image */}
          <img
            src={user.photourl}
            alt={user.firstName}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* 🔝 Top Bar */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
            <button className="">
              {/* <ArrowLeft size={18} /> */}
            </button>

            <div className="flex items-center gap-1 px-3 py-1 text-sm bg-white rounded-full">
              <MapPin size={14} />
              <span>{user.location || "Los Angeles, CA"}</span>
            </div>
          </div>

          {/* ❤️ Right Icons */}
          {/* ❤️ Right Icons */}
          <div className="absolute right-3 bottom-32 flex flex-col gap-4">
            {/* LIKE */}
            <IconWrap
              color="#ff4458"
              onClick={() => onSwipe(user, "interested")}
            >
              <Heart fill="currentColor" />
            </IconWrap>

            {/* VIEW PROFILE */}
            <IconWrap onClick={() => console.log("View profile", user._id)}>
              <User />
            </IconWrap>

            {/* MESSAGE */}
            <IconWrap onClick={() => console.log("Message user", user._id)}>
              <MessageCircle />
            </IconWrap>
          </div>


          {/* 🔽 Bottom Info */}
          <div className="absolute bottom-0 w-full p-4 text-white">
            <p className="text-xs opacity-80 mb-1">
              {user.distance || "3.5 Km Away"}
            </p>

            <h2 className="flex items-center gap-2 text-2xl font-semibold">
              {user.firstName} {user.lastName}, {user.age}
              {user.verified && (
                <CheckCircle className="text-blue-400" size={18} />
              )}
            </h2>

            <p className="text-sm mt-1 opacity-90 line-clamp-2">
              {user.bio ||
                "Book lover, coffee enthusiast, and part-time traveler."}
            </p>
          </div>
        </Card>
      ))}
    </Stack>
  );
};

/* Icon Button */
const IconWrap = ({ children, onClick, color = "white" }) => (
  <motion.div
    whileHover={{
      scale: 1.15,
      boxShadow: "0 0 18px rgba(255,255,255,0.4)",
    }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className="w-10 h-10 rounded-full bg-black/50
               flex items-center justify-center
               cursor-pointer"
    style={{ color }}
  >
    {children}
  </motion.div>
);
export default SwipeStack;
