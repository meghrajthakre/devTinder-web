import { Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

const Chats = () => {
  const messagesEndRef = useRef(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const user = useSelector((store) => store.user);
  const chat = useSelector((store) => store.ChatUsers);
  const chatPartner = chat.users?.find(u => u._id !== user._id);


  /* 🔹 Load old messages (history) */
  useEffect(() => {
    if (!chat?._id) return;

    axios
      .get(`${BASE_URL}/message/${chat._id}`, { withCredentials: true })
      .then((res) => setMessages(res.data))
      .catch(console.error);
  }, [chat?._id]);

  /* ⭐ JOIN CHAT ROOM + RECEIVE MESSAGE */
  useEffect(() => {
    if (!chat?._id) return;

    // ⭐ join room
    socket.emit("join-chat", chat._id);


    // ⭐ receive realtime messages
    const handleReceiveMessage = (newMessage) => {
      // 🔴 Ignore own message (already added via optimistic UI)
      if (String(newMessage.sender?._id) === String(user._id)) return;

      if (String(newMessage.chat) === String(chat._id)) {
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.on("receive-message", handleReceiveMessage);

    return () => {
      socket.off("receive-message", handleReceiveMessage);
    };
  }, [chat?._id]);

  /* 🔹 Auto scroll */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* 🔹 Send message */
  const sendMessage = () => {
    if (!message.trim() || !chat?._id) return;

    // ⭐ Optimistic UI
    const tempMessage = {
      _id: Date.now(),
      content: message,
      sender: { _id: user._id },
      chat: chat._id,
    };

    setMessages((prev) => [...prev, tempMessage]);

    socket.emit("send-message", {
      chatId: chat._id,
      content: message,
    });

    setMessage("");
  };

  return (
    <div
      className="flex flex-col bg-base-100 mt-[63px]"
      style={{ height: "calc(100vh - 128px)" }}
    >
      {/* HEADER */}
      <div className="sticky top-0 flex items-center gap-3 border-b px-4 py-3 shadow bg-base-100 z-10">
        <img
          src={chatPartner?.photourl || "https://i.pravatar.cc/40"}
          className="h-9 w-9 rounded-full"
          alt="avatar"
        />
        <div className="font-semibold">
          {chatPartner?.firstName} {chatPartner?.lastName}
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg) => {
          const isMe = String(msg.sender?._id) === String(user._id);

          return (
            <div
              key={msg._id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl text-sm shadow max-w-[75%]
                ${isMe ? "bg-primary text-primary-content" : "bg-base-300"}`}
              >
                {msg.content}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div className="flex gap-2 p-3 border-t">
        <input
          autoFocus
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="input input-bordered flex-1 rounded-full"
        />
        <button onClick={sendMessage} className="btn btn-primary btn-circle">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default Chats;
