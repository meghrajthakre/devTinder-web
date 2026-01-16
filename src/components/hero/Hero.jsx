import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center font-sans"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGV2ZWxvcGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60")`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Navbar */}
      <div className="relative z-20 navbar px-8 py-6 text-white">
        <div className="flex-1 text-2xl font-extrabold">
          🔥 DevTinder
        </div>

        <div className="hidden md:flex gap-8 text-sm font-semibold">
          <a className="hover:opacity-80">Products</a>
          <a className="hover:opacity-80">Learn</a>
          <a className="hover:opacity-80">Safety</a>
          <a className="hover:opacity-80">Support</a>
          <a className="hover:opacity-80">Download</a>
        </div>

        <Link
          to="/login"
          className="btn btn-sm bg-white text-black rounded-full px-6 font-semibold"
        >
          Log in
        </Link>
      </div>

      {/* Center Hero Text */}
      <div className="relative z-20 flex items-center justify-center min-h-[80vh] text-center px-6">
        <div>
          <h1 className="text-white font-extrabold leading-tight tracking-tight
            text-5xl md:text-7xl lg:text-8xl">
            Start something epic.
          </h1>

          <Link
            to="/signup"
            className="btn mt-10 rounded-full px-10 text-white font-bold
              bg-gradient-to-r from-pink-500 to-rose-500
              hover:scale-105 transition"
          >
            Create account
          </Link>
        </div>
      </div>

      {/* Bottom disclaimer */}
      <p className="absolute bottom-4 right-6 text-xs text-white/60 z-20">
        All photos are models and used for illustrative purposes
      </p>
    </div>
  );
};

export default Hero;
