import React from "react";
import Hero from "../../components/hero/Hero";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PolicyFooter from "./PolicyFooter";

const Landing = () => {
  const user = useSelector((store) => store.user);

  if (user?._id) {
    return <Navigate to="/feed" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero fills remaining space, scrolls if needed */}
      <div className="flex-grow overflow-hidden">
        <Hero />
      </div>

      {/* Footer fixed at bottom */}
      <div className="mt-auto">
        <PolicyFooter />
      </div>
    </div>
  );
};

export default Landing;
