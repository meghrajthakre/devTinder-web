import { Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import Back from "./buttons/Back";
import ChatHeader from "./ChatHeader";



const formatTime = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};


/* ----------------- Main Chats Component ----------------- */
const Chats = () => {
  const messagesEndRef = useRef(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatPartnerState, setChatPartnerState] = useState(null);

  const user = useSelector((store) => store.user);
  const chat = useSelector((store) => store.ChatUsers);
  const chatPartner = chat.users?.find((u) => u._id !== user._id);

  /* Sync chatPartner to local state */
  useEffect(() => {
    setChatPartnerState(chatPartner || null);
  }, [chatPartner]);

  /* Load old messages */
  useEffect(() => {
    if (!chat?._id) return;

    axios
      .get(`${BASE_URL}/message/${chat._id}`, { withCredentials: true })
      .then((res) => setMessages(res.data))
      .catch(console.error);
  }, [chat?._id]);

  /* Join chat room & receive real-time messages */
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

  /* Real-time partner status update */
  useEffect(() => {
    const handleStatusUpdate = (data) => {
      if (data.userId === chatPartner?._id) {
        setChatPartnerState((prev) => ({ ...prev, ...data }));
      }
    };

    socket.on("user-status-update", handleStatusUpdate);
    return () => socket.off("user-status-update", handleStatusUpdate);
  }, [chatPartner?._id]);

  /* Auto-scroll messages */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* Send message */
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

  return (
    <div
      className="flex flex-col bg-base-100 mt-[63px]"
      style={{ height: "calc(100vh - 128px)" }}
    >
      <ChatHeader partner={chatPartnerState} />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-base-200">
        {messages.map((msg) => {
          const isMe = String(msg.sender?._id) === String(user._id);

          return (
            <div
              key={msg._id}
              className={`flex items-end gap-2 ${
                isMe ? "justify-end" : "justify-start"
              }`}
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
                  className={`px-4 py-2 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    isMe
                      ? "bg-primary text-primary-content rounded-br-md"
                      : "bg-base-100 rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
                <span
                  className={`mt-1 text-[10px] text-gray-500 ${
                    isMe ? "text-right pr-1" : "text-left pl-1"
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

      {/* Input */}
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
