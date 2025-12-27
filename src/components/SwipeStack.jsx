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

/* Swipe thresholds */
const swipeConfidenceThreshold = 12000;

const SwipeStack = ({ feed, onSwipe }) => {
  return (
    <Stack>
      {feed.slice(0, 3).map((user, index) => (
        <Card
          key={user._id}
          drag={index === 0 ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.8}
          whileTap={{ scale: 1.05 }}
          onDragEnd={(e, info) => {
            const swipe = info.offset.x * info.velocity.x;

            if (swipe > swipeConfidenceThreshold) {
              onSwipe(user, "interested");
            } else if (swipe < -swipeConfidenceThreshold) {
              onSwipe(user, "ignored");
            }
          }}
          initial={{ scale: 1 - index * 0.05, y: index * 10 }}
          animate={{ scale: 1 - index * 0.05, y: index * 10 }}
          style={{ zIndex: feed.length - index }}
        >
          {/* Card Content */}
          <img
            src={user.photourl}
            alt={user.firstName}
            className="w-full h-[70%] object-cover"
          />

          <div className="p-4">
            <h2 className="text-xl font-semibold">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-gray-500">{user.bio}</p>
          </div>
        </Card>
      ))}
    </Stack>
  );
};

export default SwipeStack;
