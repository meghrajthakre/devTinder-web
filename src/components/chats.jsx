import { Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import Back from "./buttons/Back";

const Chats = () => {
  const messagesEndRef = useRef(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatPartnerState, setChatPartnerState] = useState(null);

  const user = useSelector((store) => store.user);
  const chat = useSelector((store) => store.ChatUsers);
  const chatPartner = chat.users?.find((u) => u._id !== user._id);

  console.log("Chat component chat:", chat);
  /* 🔹 Sync chatPartner to local state */
  useEffect(() => {
    setChatPartnerState(chatPartner || null);
  }, [chatPartner]);

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

    socket.emit("join-chat", chat._id);

    const handleReceiveMessage = (newMessage) => {
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



  /* 🔹 Real-time partner status update */
  useEffect(() => {
    const handleStatusUpdate = (data) => {
      if (data.userId === chatPartner?._id) {
        setChatPartnerState((prev) => ({ ...prev, ...data }));
      }
    };

    socket.on("user-status-update", handleStatusUpdate);

    return () => {
      socket.off("user-status-update", handleStatusUpdate);
    };
  }, [chatPartner?._id]);

  /* 🔹 Auto scroll */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* 🔹 Send message */
  const sendMessage = () => {
    if (!message.trim() || !chat?._id) return;

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

  const formatLastSeen = (date) => {
    if (!date) return "";

    const lastSeen = new Date(date);
    const now = new Date();

    const isToday =
      lastSeen.getDate() === now.getDate() &&
      lastSeen.getMonth() === now.getMonth() &&
      lastSeen.getFullYear() === now.getFullYear();

    const isYesterday =
      lastSeen.getDate() === now.getDate() - 1 &&
      lastSeen.getMonth() === now.getMonth() &&
      lastSeen.getFullYear() === now.getFullYear();

    const time = lastSeen.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (isToday) return `Last seen today at ${time}`;
    if (isYesterday) return `Last seen yesterday at ${time}`;

    const dateStr = lastSeen.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    return `Last seen ${dateStr} at ${time}`;
  };


  const formatTime = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className="flex flex-col bg-base-100 mt-[63px]"
      style={{ height: "calc(100vh - 128px)" }}
    >
      {/* HEADER */}
      <div className="flex items-center gap-2 px-4 py-2 border-b bg-base-100 shadow sticky top-0 z-10">
        <img
          src={chatPartnerState?.photourl || "https://i.pravatar.cc/40"}
          className="h-9 w-9 rounded-full"
          alt="avatar"
        />
        <div className="flex flex-col">
          <div className="font-semibold">
            {chatPartnerState?.firstName} {chatPartnerState?.lastName}
          </div>
          <div className={`text-xs ${chatPartnerState?.isOnline ? "text-green-500" : "text-gray-500"
            }`}>
            {chatPartnerState?.isOnline
              ? "Online"
              : chatPartnerState?.lastSeen
                ? formatLastSeen(chatPartnerState.lastSeen)
                : ""}
          </div>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-base-200">
        {messages.map((msg) => {
          const isMe = String(msg.sender?._id) === String(user._id);

          return (
            <div
              key={msg._id}
              className={`flex items-end gap-2 ${isMe ? "justify-end" : "justify-start"}`}
            >
              {!isMe && (
                <img
                  src={msg.sender?.photourl || "https://i.pravatar.cc/40"}
                  alt="avatar"
                  className="h-6 w-6 rounded-full object-cover"
                />
              )}

              <div className="flex flex-col max-w-[70%]">
                <div
                  className={`px-4 py-2 rounded-2xl text-sm leading-relaxed shadow-sm ${isMe
                    ? "bg-primary text-primary-content rounded-br-md"
                    : "bg-base-100 rounded-bl-md"
                    }`}
                >
                  {msg.content}
                </div>
                <span
                  className={`mt-1 text-[10px] text-gray-500 ${isMe ? "text-right pr-1" : "text-left pl-1"
                    }`}
                >
                  {formatTime(msg.createdAt)}
                </span>
              </div>

              {isMe && (
                <img
                  src={user.photourl || "https://i.pravatar.cc/40"}
                  alt="avatar"
                  className="h-6 w-6 rounded-full object-cover"
                />
              )}
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
