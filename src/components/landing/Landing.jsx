import React, { useRef, useEffect } from "react";
import Hero from "../../components/hero/Hero";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PolicyFooter from "./PolicyFooter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  const heroRef = useRef(null);
  const footerRef = useRef(null);
  const user = useSelector((store) => store.user);

  if (user?._id) {
    return <Navigate to="/feed" replace />;
  }

 useEffect(() => {

  /* ================= HERO PIN ================= */
  ScrollTrigger.create({
    trigger: heroRef.current,
    start: "top top",
    end: "+=100%",
    pin: true,
    pinSpacing: false,
  });

  /* ================= HERO ANIMATION (ON LOAD) ================= */
  gsap.fromTo(
    heroRef.current.querySelectorAll(
      ".hero-nav, .hero-title, .hero-text, .hero-btn"
    ),
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    }
  );

  /* ================= FOOTER WRAPPER ================= */
  gsap.fromTo(
    footerRef.current,
    { y: 150, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 80%",
      },
    }
  );

  /* ================= FOOTER TEXT ================= */
  gsap.fromTo(
    footerRef.current.querySelectorAll(".fade-text"),
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.12,
      ease: "power2.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 75%",
      },
    }
  );

  return () => ScrollTrigger.getAll().forEach(t => t.kill());
}, []);


  return (
    <div className="landing overflow-y-hidden">
      <section ref={heroRef} className="hero-section">
        <Hero />
      </section>

      <section ref={footerRef} className="footer-section">
        <PolicyFooter />
      </section>
    </div>
  );
};

export default Landing;
