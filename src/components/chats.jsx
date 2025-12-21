import { Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { socket } from "../utils/socket";

const Chats = () => {
  const messagesEndRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // 🔹 Auto scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 🔹 Send message
  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("sendMessage", {
      text: message,
    });

    setMessage("");
  };

  // 🔹 Receive message
  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [
        ...prev,
        {
          ...msg,
          sender: msg.isMe ? "me" : "other",
        },
      ]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  // 🔹 Scroll on new message
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      className="flex flex-col bg-base-100 mt-[63px]"
      style={{ height: "calc(100vh - 128px)" }}
    >
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow
                ${
                  msg.sender === "me"
                    ? "bg-primary text-primary-content rounded-br-none"
                    : "bg-base-200 rounded-bl-none"
                }`}
            >
              <p>{msg.text}</p>
              <span className="mt-1 block text-right text-[10px] opacity-60">
                {new Date(msg.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="sticky bottom-0 bg-base-100 px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-center gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            type="text"
            placeholder="Type a message…"
            className="input input-bordered flex-1 rounded-full"
          />
          <button onClick={sendMessage} className="btn btn-primary btn-circle">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chats;
