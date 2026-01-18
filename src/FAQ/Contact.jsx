import React from "react";
import Back from "../components/buttons/Back";
import { Mail } from "lucide-react";

const Contact = () => {
  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      {/* Back Button */}
      <div className="absolute top-6 left-6">
        <Back />
      </div>

      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-2 text-center">
          Contact DevStinder
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Have a question or feedback? We’d love to hear from you.
        </p>

        {/* Support Email */}
        <div className="flex items-center justify-center gap-2 mb-6 text-gray-300">
          <Mail size={18} />
          <a
            href="mailto:meghrajthakre444@gmail.com"
            className="hover:underline"
          >
            meghrajthakre444@gmail.com
          </a>
        </div>

        {/* Contact Form */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your name"
            className="w-full p-3 rounded-xl bg-black border border-zinc-700 focus:outline-none focus:border-white"
          />

          <input
            type="email"
            placeholder="Your email"
            className="w-full p-3 rounded-xl bg-black border border-zinc-700 focus:outline-none focus:border-white"
          />

          <textarea
            placeholder="Write your message..."
            className="w-full p-3 rounded-xl bg-black border border-zinc-700 h-32 resize-none focus:outline-none focus:border-white"
          />

          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-200 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
