import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import Body from "./components/Body";
import Profile from "./components/profilePage/Profile";
import Login from "./components/Login";
import Feed from "./components/Feed";
import EditePage from "./components/profilePage/EditePage";
import Connections from "./components/Connections";
import RequestsPage from "./components/RequestsPage";
import SignUpPage from "./components/singupForm/SignUpPage";
import Chats from "./components/chats";

import { socket } from "./utils/socket";
import AllChats from "./AllChats";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "./utils/constant";
import { setConnection } from "./utils/connectionSlice";
import DevProfile from "./components/DevProfile";
import FeedProfile from "./components/FeedProfile";
import Membership from "./components/pages/Membership";
import Landing from "./components/landing/Landing";
import Accessibility from './components/legal/Accessibility';
import CookiePolicy from './components/legal/CookiePolicy';
import PrivacyPolicy from './components/legal/PrivacyPolicy';
import Terms from './components/legal/Terms';


const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const currentUser = useSelector((store) => store.user);

  const handleConnections = async () => {
    try {
      const res = await axios(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(setConnection(res.data.request || []));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleConnections();
  }, []);


  // ✅ Socket connect on app load
  useEffect(() => {
    if (!user?._id) return;

    const token = document.cookie
      .split("; ")
      .find(row => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      socket.auth = { token };
      socket.connect();
      console.log("✅ Socket connected");
    }

    return () => {
      socket.disconnect();
      socket.off();
      console.log("❌ Socket disconnected");
    };
  }, [user?._id]);

  /* 🔔 SOCKET: New message notification */
  useEffect(() => {
    if (!currentUser?._id) return;

    const handleNotification = ({ chatId, message }) => {
      if (String(message.sender?._id) === String(currentUser._id)) return;

      // 🔥 SHUFFLE CHAT TO TOP

      toast.custom((t) => (
        <div
          className={`
      bg-base-100 border border-base-300
      rounded-2xl shadow-xl
      p-4 flex gap-3 items-start
      max-w-sm
      ${t.visible ? "animate-enter" : "animate-leave"}
    `}
        >
          {/* Avatar */}
          <div className="relative">
            <img
              src={message.sender.photourl || "https://i.pravatar.cc/40"}
              alt={message.sender.firstName}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-primary/40"
            />
          </div>

          {/* Content */}
          <div className="flex-1 max-w-[70%]">
            <p className="font-semibold text-sm text-base-content">
              {message.sender.firstName}
            </p>
            <p className="text-sm text-base-content/70 line-clamp-2">
              {message.content}
            </p>
          </div>

          {/* Accent */}
          <span className="text-primary text-lg leading-none">❤</span>
        </div>
      ), {
        duration: 4500,
      });

    };

    socket.on("new-message-notification", handleNotification);

    return () => {
      socket.off("new-message-notification", handleNotification);
    };
  }, [currentUser?._id]);


  return (
    <>
      <Toaster position="top-center" />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/accessibility" element={<Accessibility />} />

        {/* Private routes */}
        <Route element={<Body />}>
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profileEdit" element={<EditePage />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/requests" element={<RequestsPage />} />
          <Route path="/chat/access/:chatId" element={<Chats />} />
          <Route path="/chats" element={<AllChats />} />
          <Route path="/profile/:id" element={<DevProfile />} />
          <Route path="/feed/profile/:id" element={<FeedProfile />} />
          <Route path="/membership" element={<Membership />} />

        </Route>

        <Route path="*" element={<p className="text-center mt-20">404 Not Found</p>} />
      </Routes>

    </>
  );
};

export default App;
