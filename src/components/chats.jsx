import { ArrowLeft, Send } from "lucide-react";
import React, { useEffect, useRef } from "react";
const PersonalChat = () => {
  const messagesEndRef = useRef(null)

  const messages = [
    { id: 1, text: "Kal DSA revise karte hain Kal DSA revise karte hain Kal DSA revise karte hain 💻", sender: "other", time: "10:02 AM" },
    { id: 2, text: "Haan bilkul, trees & graphs 🔥", sender: "me", time: "10:03 AM" },
    { id: 3, text: "React hooks bhi clear ho gaye 😎", sender: "other", time: "10:05 AM" },
    { id: 4, text: "Kal fir milte hain 🚀", sender: "me", time: "10:06 AM" },
    { id: 5, text: "Done bro 👍", sender: "other", time: "10:07 AM" },
    { id: 6, text: "React hooks bhi clear ho gaye 😎", sender: "other", time: "10:05 AM" },
    { id: 7, text: "Kal fir milte hain 🚀", sender: "me", time: "10:06 AM" },
    { id: 8, text: "Done bro 👍", sender: "other", time: "10:07 AM" },
  ];


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div

      className="flex flex-col bg-base-100 mt-[63px]"
      style={{ height: "calc(100vh - 128px)" }}
    >

      {/* Messages */}
      <div className="relative flex-1 overflow-y-auto px-4 py-6 pb-18 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"
              }`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow
          ${msg.sender === "me"
                  ? "bg-primary text-primary-content rounded-br-none"
                  : "bg-base-200 rounded-bl-none"
                }`}
            >
              <p>{msg.text}</p>
              <span className="mt-1 block text-right text-[10px] opacity-60">
                {msg.time}
              </span>
            </div>
          </div>
        ))}

        {/* 👇 Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>


      {/* Input Bar (sticky, no overlap) */}
      <div className="sticky bottom-0 bg-base-100 px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-center gap-2">
          <input
            type="text"
            placeholder="Type a message…"
            className="input input-bordered flex-1 rounded-full"
          />
          <button className="btn btn-primary btn-circle">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalChat;
