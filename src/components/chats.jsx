import { Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Chats = () => {
  const dummyMessages = [
  {
    id: 1,
    text: "Hey 👋 How are you?",
    senderId: "friend",
    time: "10:01 AM",
  },
  {
    id: 2,
    text: "I'm good! Working on chat UI 😄",
    senderId: "me",
    time: "10:02 AM",
  },
  {
    id: 3,
    text: "Nice! Facebook style ban raha hai 🔥",
    senderId: "friend",
    time: "10:03 AM",
  },
  {
    id: 4,
    text: "Haan, UX pe focus kar raha hoon 💯",
    senderId: "me",
    time: "10:04 AM",
  },
  {
    id: 4,
    text: "Haan, UX pe focus kar raha hoon 💯",
    senderId: "me",
    time: "10:04 AM",
  },
  {
    id: 4,
    text: "Haan, UX pe focus kar raha hoon 💯",
    senderId: "friend",
    time: "10:04 AM",
  },
  {
    id: 4,
    text: "Haan, UX pe focus kar raha hoon 💯",
    senderId: "me",
    time: "10:04 AM",
  },
  {
    id: 4,
    text: "Haan, UX pe focus kar raha hoon 💯",
    senderId: "me",
    time: "10:04 AM",
  },
  {
    id: 4,
    text: "Haan, UX pe focus kar raha hoon 💯",
    senderId: "friend",
    time: "10:04 AM",
  },
  {
    id: 4,
    text: "Haan, UX pe focus kar raha hoon 💯",
    senderId: "me",
    time: "10:04 AM",
  },
  {
    id: 4,
    text: "Haan, UX pe focus kar raha hoon 💯",
    senderId: "friend",
    time: "10:04 AM",
  },
  {
    id: 4,
    text: "Haan, UX pe focus kar raha hoon 💯",
    senderId: "me",
    time: "10:04 AM",
  },
  {
    id: 4,
    text: "Haan, UX pe focus kar raha hoon 💯",
    senderId: "me",
    time: "10:04 AM",
  },
  {
    id: 4,
    text: "Haan, UX pe focus kar raha hoon 💯",
    senderId: "me",
    time: "10:04 AM",
  },
  {
    id: 4,
    text: "Haan, UX pe focus kar raha hoon 💯",
    senderId: "friend",
    time: "10:04 AM",
  },
  {
    id: 4,
    text: "Haan, UX pe focus kar raha hoon 💯",
    senderId: "friend",
    time: "10:04 AM",
  },
];

  const messagesEndRef = useRef(null);
  const [message, setMessage] = useState("");

  // 👇 Dummy messages
  const [messages, setMessages] = useState(dummyMessages);

  // 👇 Selected chat user (from redux)
  const userNames = useSelector((store) => store.ChatUsers);

  // 🔹 Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔹 Send message (dummy)
  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: message,
        senderId: "me",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    setMessage("");
  };

  return (
    <div
      className="flex flex-col bg-base-100 mt-[63px]"
      style={{ height: "calc(100vh - 128px)" }}
    >
      {/* 🔹 CHAT HEADER (Sticky like Facebook) */}
      <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-base-300 bg-base-100 px-4 py-3 shadow">
        <img
          src={userNames?.photourl || "https://i.pravatar.cc/40"}
          alt="profile"
          className="h-9 w-9 rounded-full"
        />
        <div className="font-semibold text-md">
          {userNames?.firstName} {userNames?.lastName}
        </div>
      </div>

      {/* 🔹 MESSAGES */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg) => {
          const isMe = msg.senderId === "me";

          return (
            <div
              key={msg.id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div className="flex items-end gap-2 max-w-[80%]">
                {!isMe && (
                  <img
                    src="https://i.pravatar.cc/32"
                    className="h-7 w-7 rounded-full"
                  />
                )}

                <div
                  className={`rounded-2xl px-4 py-2 text-sm shadow
                    ${
                      isMe
                        ? "bg-primary text-primary-content rounded-br-none"
                        : "bg-primary text-primary-content rounded-bl-none"
                    }`}
                >
                  <p>{msg.text}</p>
                  <span className="mt-1 block text-right text-[10px] opacity-60">
                    {msg.time}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* 🔹 INPUT BAR */}
       <div className="sticky bottom-0 bg-base-100 px-4 py-3 ">
        <div className="mx-auto flex max-w-2xl items-center gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            type="text"
            placeholder="Type a message…"
            className="input input-bordered flex-1 text-primary rounded-full"
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
