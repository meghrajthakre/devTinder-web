import React from "react";
import { Link } from "react-router-dom";
import HeroImge from "../../assets/Logo/hero.webp";
import logo from "../../../public/assets/logo.png";

const Hero = () => {
  return (
    <section
      className="relative min-h-screen w-full bg-cover bg-center font-sans overflow-hidden"
      style={{ backgroundImage: `url(${HeroImge})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />

      {/* Navbar */}
      <header className="relative z-20 flex items-center justify-between px-6 md:px-12 py-5 text-white">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-extrabold tracking-wide">
           🔥 DevTinder
          </span>
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/80">
          <a className="hover:text-white transition">Products</a>
          <a className="hover:text-white transition">Learn</a>
          <a className="hover:text-white transition">Safety</a>
          <a className="hover:text-white transition">Support</a>
          <a className="hover:text-white transition">Download</a>
        </nav>

        <Link
          to="/login"
          className="rounded-full bg-white/90 px-6 py-2 text-sm font-semibold text-black
            hover:bg-white transition"
        >
          Log in
        </Link>
      </header>

      {/* Hero Content */}
      <main className="relative z-20 flex items-center justify-center min-h-[80vh] px-6">
        <div className="max-w-4xl text-center">
          <h1
            className="text-white font-extrabold leading-tight tracking-tight
              text-4xl sm:text-5xl md:text-7xl lg:text-7xl"
          >
            Start something
   
              epic.
          </h1>

          <p className="mt-6 text-white/90 text-sm md:text-base max-w-xl mx-auto">
            Connect with developers, build meaningful collaborations, and
            create products that matter.
          </p>

          <Link
            to="/signup"
            className="inline-block mt-10 rounded-full px-12 py-4 text-sm md:text-base
              font-bold text-white
              bg-gradient-to-r from-pink-500 to-rose-500
              hover:scale-105 hover:shadow-xl transition-transform duration-300"
          >
            Create account
          </Link>
        </div>
      </main>

      {/* Disclaimer */}
      <p className="absolute bottom-4 right-6 text-xs text-white/60 z-20">
        All photos are models and used for illustrative purposes
      </p>
    </section>
  );
};

export default Hero;
