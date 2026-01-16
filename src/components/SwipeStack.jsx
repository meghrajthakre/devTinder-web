import React from "react";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  User,
  CheckCircle,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";



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
  const navigate = useNavigate();

  const handleMessagePremium = () => {
    console.log("Navigate to membership page");
    navigate('/membership');
  }

  const handleProfile = (id) => {
    navigate(`/Feed/profile/${id}`);
  }

  return (
    <Stack>
      {feed.slice(0, 10).map((user, index) => (
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
            <button />
            <div className="flex items-center gap-1 px-3 py-1 text-sm bg-white/90 rounded-full backdrop-blur">
              <MapPin size={14} />
              <span>
                {user.location?.city
                  ? `${user.location.city}, ${user.location.country}`
                  : "Location not available"}
              </span>
            </div>
          </div>

          {/* ❤️ Right Icons */}
          <div className="absolute right-3 bottom-32 flex flex-col gap-4">
            <IconWrap
              tooltip="Like"
              onClick={() => onSwipe(user, "interested")}
            >
              <Heart fill="" />
            </IconWrap>

            <IconWrap tooltip="View Profile" onClick={() => handleProfile(user._id)}>
              <User />
            </IconWrap>

            <IconWrap tooltip="Send Message" onClick={handleMessagePremium}>
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
                <CheckCircle className="text-rose-400" size={18} />
              )}
            </h2>

            <p className="text-sm mt-1 opacity-90 line-clamp-2">
              {user.about ||
                "Book lover, coffee enthusiast, and part-time traveler."}
            </p>
          </div>
        </Card>
      ))}
    </Stack>
  );
};

/* 💎 Luxury Valentine Tooltip Icon */
const IconWrap = ({
  children,
  tooltip,
  onClick,
  glow = "#ffffff",
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div className="relative flex justify-center">
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{
          scale: 1.15,
          boxShadow: `0 0 22px ${glow}`,
        }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        className="w-10 h-10 rounded-full bg-black/50 backdrop-blur
                   flex items-center justify-center cursor-pointer"
        style={{ color: glow }}
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            className="absolute right-12 px-3 py-1 rounded-full
                       text-xs text-white whitespace-nowrap
                       bg-gradient-to-r from-pink-500 to-rose-500
                       shadow-lg"
          >
            {tooltip}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SwipeStack;
