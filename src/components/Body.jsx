import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import Sidebar from "./SideBar";
import BackgroundPattern from "./background/BackgroundPattern";
import BottomNav from "./BottomNav";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((store) => store.user);

  const isLoginPage = location.pathname === "/login";
  const shouldShowFooter = user && !isLoginPage;

  const fetchData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/login");
      }
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLoginPage) return;
    if (!user) fetchData();
  }, [location.pathname]);

  return (
    <div className="">
      <Navbar />
     
      {shouldShowFooter &&  <Sidebar />}
      <div className=" bg-base-200 items-center 
                md:pl-80
                ">
      <Outlet />
      </div>
      {shouldShowFooter && <BottomNav />}
    </div>
  );

};

export default Body;
