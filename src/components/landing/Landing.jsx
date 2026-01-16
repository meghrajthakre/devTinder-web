import React from 'react'

import Hero from "../../components/hero/Hero";
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PolicyFooter from "./PolicyFooter";

const Landing = () => {
     const user = useSelector(store => store.user);

  if (user?._id) {
    return <Navigate to="/feed" replace />;
  }


  return (
    <>
      <Hero />
      
      <PolicyFooter />
    </>
  );
};

export default Landing;
