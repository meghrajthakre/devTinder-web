import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";

import Body from "./components/Body";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Feed from "./components/Feed";
import EditePage from "./components/EditePage";
import Connections from "./components/Connections";
import RequestsPage from "./components/RequestsPage";
import SignUpPage from "./components/SignUpPage";
import Chats from "./components/chats";

import { socket } from "./utils/socket";
import SideBar from "./components/SideBar";
import AllChats from "./AllChats";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "./utils/constant";
import { setConnection } from "./utils/connectionSlice";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

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

  return (
    <>
      <Toaster position="top-center" />

      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="feed" element={<Feed />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profileEdit" element={<EditePage />} />
          <Route path="connections" element={<Connections />} />
          <Route path="requests" element={<RequestsPage />} />
          <Route path="chat/access/:chatId" element={<Chats />} />
          <Route path="chats" element={<AllChats />} />

        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </>
  );
};

export default App;
