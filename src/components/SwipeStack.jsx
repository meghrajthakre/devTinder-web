import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

/* Stack Container */
const Stack = styled.div`
  position: relative;
  width: 320px;
  height: 440px;
`;

/* Card */
const Card = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const SwipeStack = ({ feed, onSwipe }) => {
  return (
    <Stack>
      {feed.slice(0, 3).map((user, index) => (
        <Card
          key={user._id}
          className="cursor-grab"
          drag={index === 0 ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.8}
          whileTap={{ scale: 1.05 }}
          onDragEnd={(e, info) => {
            if (info.offset.x > 120) {
              onSwipe(user, "ignored");     // 👉 RIGHT
            } else if (info.offset.x < -120) {
              onSwipe(user, "interested");  // 👉 LEFT
            }
          }}
          initial={{ scale: 1 - index * 0.05, y: index * 10 }}
          animate={{ scale: 1 - index * 0.05, y: index * 10 }}
          style={{ zIndex: feed.length - index }}
        >
          {/* 🔥 TINDER STYLE CARD CONTENT */}
          <div className="relative w-full h-full">
            {/* Image */}
            <img
              src={user.photourl}
              alt={user.firstName}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* User Info */}
            <div className="absolute bottom-0 w-full p-4 text-white">
              <h2 className="text-2xl font-bold">
                {user.firstName} {user.lastName}
                <span className="ml-2 text-xl font-normal">
                  {user.age}
                </span>
              </h2>

              <p className="text-sm mt-1 line-clamp-2 opacity-90">
                {user.bio}
              </p>

              {/* Interests */}
              <div className="flex gap-2 mt-3 flex-wrap">
                {user.interests?.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs bg-white/20 rounded-full backdrop-blur"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </Stack>
  );
};

export default SwipeStack;
