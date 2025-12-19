import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
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

import { BASE_URL } from "./utils/constant";
import { setConnection } from "./utils/connectionSlice";
import { socket } from "./utils/socket";

const App = () => {
  const dispatch = useDispatch();

  // ✅ App load par connections fetch
  useEffect(() => {
    const handleConnections = async () => {
      try {
        const res = await axios.get(
          BASE_URL + "/user/connections",
          { withCredentials: true }
        );
        dispatch(setConnection(res.data.request || []));
      } catch (err) {
        console.log(err);
      }
    };

    handleConnections();
  }, [dispatch]);

  // ✅ Socket connect on app load
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find(row => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      socket.auth = { token };
      socket.connect();
      console.log("Socket connected from App.jsx");
    }

    return () => {
      socket.disconnect();
      console.log("Socket disconnected from App.jsx");
    };
  }, []);

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
          <Route path="chats" element={<Chats />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </>
  );
};

export default App;
